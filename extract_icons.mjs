import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

function paeth(a, b, c) {
  const p = a + b - c;
  const pa = Math.abs(p - a);
  const pb = Math.abs(p - b);
  const pc = Math.abs(p - c);
  if (pa <= pb && pa <= pc) return a;
  if (pb <= pc) return b;
  return c;
}

function crc32(buf) {
  let crc = -1;
  for (let i = 0; i < buf.length; i++) {
    let byte = buf[i];
    for (let j = 0; j < 8; j++) {
      if ((crc ^ byte) & 1) {
        crc = (crc >>> 1) ^ 0xEDB88320;
      } else {
        crc = crc >>> 1;
      }
      byte = byte >>> 1;
    }
  }
  return (crc ^ -1) >>> 0;
}

function makeChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = chunk.subarray(4, 8 + len);
  const crc = crc32(typeAndData);
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

function savePng(width, height, rgbaBuffer, filePath) {
  const rawData = Buffer.alloc(height * (1 + width * 4));
  for (let y = 0; y < height; y++) {
    rawData[y * (1 + width * 4)] = 0; // Filter 0
    for (let x = 0; x < width; x++) {
      const srcIdx = (y * width + x) * 4;
      const destIdx = y * (1 + width * 4) + 1 + x * 4;
      rawData[destIdx] = rgbaBuffer[srcIdx];
      rawData[destIdx + 1] = rgbaBuffer[srcIdx + 1];
      rawData[destIdx + 2] = rgbaBuffer[srcIdx + 2];
      rawData[destIdx + 3] = rgbaBuffer[srcIdx + 3];
    }
  }

  const sig = Buffer.from([0x89, 0x50, 0x4E, 0x47, 0x0D, 0x0A, 0x1A, 0x0A]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;
  ihdr[10] = 0;
  ihdr[11] = 0;
  ihdr[12] = 0;

  const ihdrChunk = makeChunk('IHDR', ihdr);
  const idatChunk = makeChunk('IDAT', zlib.deflateSync(rawData));
  const iendChunk = makeChunk('IEND', Buffer.alloc(0));

  const png = Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
  fs.writeFileSync(filePath, png);
}

function extractAll() {
  const buf = fs.readFileSync('src/Images/Menu.png');
  const width = buf.readUInt32BE(16);
  const height = buf.readUInt32BE(20);
  const colorType = buf[25];
  const bpp = colorType === 6 ? 4 : 3;

  let offset = 8;
  const idats = [];
  while (offset < buf.length) {
    const len = buf.readUInt32BE(offset);
    const type = buf.toString('ascii', offset + 4, offset + 8);
    if (type === 'IDAT') idats.push(buf.subarray(offset + 8, offset + 8 + len));
    offset += 12 + len;
  }
  const decompressed = zlib.inflateSync(Buffer.concat(idats));

  const stride = 1 + width * bpp;
  let priorLine = Buffer.alloc(width * bpp);
  const fullPixels = Buffer.alloc(width * height * 4);

  for (let y = 0; y < height; y++) {
    const filter = decompressed[y * stride];
    const rawLine = decompressed.subarray(y * stride + 1, (y + 1) * stride);
    const unfiltLine = Buffer.alloc(width * bpp);

    for (let x = 0; x < width * bpp; x++) {
      const left = x >= bpp ? unfiltLine[x - bpp] : 0;
      const up = priorLine[x];
      const upLeft = x >= bpp ? priorLine[x - bpp] : 0;
      let val = rawLine[x];
      if (filter === 0) unfiltLine[x] = val;
      else if (filter === 1) unfiltLine[x] = (val + left) & 0xff;
      else if (filter === 2) unfiltLine[x] = (val + up) & 0xff;
      else if (filter === 3) unfiltLine[x] = (val + Math.floor((left + up) / 2)) & 0xff;
      else if (filter === 4) unfiltLine[x] = (val + paeth(left, up, upLeft)) & 0xff;
    }
    priorLine = unfiltLine;

    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      fullPixels[idx] = unfiltLine[x * bpp];
      fullPixels[idx + 1] = unfiltLine[x * bpp + 1];
      fullPixels[idx + 2] = unfiltLine[x * bpp + 2];
      fullPixels[idx + 3] = bpp === 4 ? unfiltLine[x * 4 + 3] : 255;
    }
  }

  const outDir = 'src/Images/icons';
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  // Crop definition for each icon (centered at x=40, width=28, height=28)
  const icons = [
    { name: 'dashboard', centerY: 174, hasActiveBg: true },
    { name: 'analytics', centerY: 228 },
    { name: 'board', centerY: 282 },
    { name: 'invoice', centerY: 336 },
    { name: 'calendar', centerY: 390 },
    { name: 'activity', centerY: 444, hasRedDot: true },
    { name: 'bell', centerY: 498 },
    { name: 'settings', centerY: 552 },
    { name: 'logout', centerY: 947 },
  ];

  for (const ic of icons) {
    const cropSize = 28;
    const startX = Math.round(40 - cropSize / 2);
    const startY = Math.round(ic.centerY - cropSize / 2);

    const normalBuf = Buffer.alloc(cropSize * cropSize * 4);
    const activeBuf = Buffer.alloc(cropSize * cropSize * 4);

    for (let cy = 0; cy < cropSize; cy++) {
      for (let cx = 0; cx < cropSize; cx++) {
        const srcX = startX + cx;
        const srcY = startY + cy;
        const srcIdx = (srcY * width + srcX) * 4;
        const destIdx = (cy * cropSize + cx) * 4;

        const r = fullPixels[srcIdx];
        const g = fullPixels[srcIdx + 1];
        const b = fullPixels[srcIdx + 2];

        // Is this pixel background (near white or light purple)
        const isWhite = (r > 240 && g > 240 && b > 240);
        const isLightPurpleBg = (r > 235 && g > 230 && b > 245);
        const isBg = isWhite || (ic.hasActiveBg && isLightPurpleBg && !(r < 180 || b > 250));

        if (isBg) {
          // Transparent
          normalBuf[destIdx + 3] = 0;
          activeBuf[destIdx + 3] = 0;
        } else {
          // Keep original in normalBuf
          normalBuf[destIdx] = r;
          normalBuf[destIdx + 1] = g;
          normalBuf[destIdx + 2] = b;
          normalBuf[destIdx + 3] = 255;

          // For activeBuf:
          // If red dot on activity icon (reddish pixel), keep it red!
          if (ic.hasRedDot && (r > 160 && g < 120 && b < 130)) {
            activeBuf[destIdx] = r;
            activeBuf[destIdx + 1] = g;
            activeBuf[destIdx + 2] = b;
            activeBuf[destIdx + 3] = 255;
          } else {
            // Tint to brand purple #635FFF (99, 95, 255)
            // Preserve brightness modulation
            const luminance = (r * 0.299 + g * 0.587 + b * 0.114) / 255;
            activeBuf[destIdx] = Math.round(99 * (1 - luminance * 0.2));
            activeBuf[destIdx + 1] = Math.round(95 * (1 - luminance * 0.2));
            activeBuf[destIdx + 2] = Math.round(255 * (1 - luminance * 0.1));
            activeBuf[destIdx + 3] = 255;
          }
        }
      }
    }

    savePng(cropSize, cropSize, normalBuf, path.join(outDir, `${ic.name}.png`));
    savePng(cropSize, cropSize, activeBuf, path.join(outDir, `${ic.name}-active.png`));
    console.log(`Saved icon ${ic.name}.png and ${ic.name}-active.png`);
  }

  // Also extract the exact full-width Active Dashboard Band (width 80, height 48, y=150..198)
  const bandW = 80;
  const bandH = 48;
  const bandBuf = Buffer.alloc(bandW * bandH * 4);
  for (let y = 0; y < bandH; y++) {
    for (let x = 0; x < bandW; x++) {
      const srcIdx = ((150 + y) * width + x) * 4;
      const destIdx = (y * bandW + x) * 4;
      bandBuf[destIdx] = fullPixels[srcIdx];
      bandBuf[destIdx + 1] = fullPixels[srcIdx + 1];
      bandBuf[destIdx + 2] = fullPixels[srcIdx + 2];
      bandBuf[destIdx + 3] = fullPixels[srcIdx + 3];
    }
  }
  savePng(bandW, bandH, bandBuf, path.join(outDir, 'active-band.png'));
  console.log('Saved active-band.png');
}

extractAll();
