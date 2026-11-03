import fs from 'fs';
import zlib from 'zlib';

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
      if ((crc ^ byte) & 1) crc = (crc >>> 1) ^ 0xEDB88320;
      else crc = crc >>> 1;
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
    rawData[y * (1 + width * 4)] = 0;
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

const buf = fs.readFileSync('C:/Users/POORNIMA/.gemini/antigravity/brain/05174b81-5e3c-46c9-a859-e2b02b956772/.user_uploaded/media_1793615451090_e2e79b97.png');

let offset = 8;
let width, height;
const idatChunks = [];

while (offset < buf.length) {
  const len = buf.readUInt32BE(offset);
  const type = buf.toString('ascii', offset + 4, offset + 8);
  if (type === 'IHDR') {
    width = buf.readUInt32BE(offset + 8);
    height = buf.readUInt32BE(offset + 12);
  } else if (type === 'IDAT') {
    idatChunks.push(buf.subarray(offset + 8, offset + 8 + len));
  }
  offset += 12 + len;
}

const decompressed = zlib.inflateSync(Buffer.concat(idatChunks));
const bytesPerPixel = 4;
const stride = 1 + width * bytesPerPixel;
const rgba = Buffer.alloc(width * height * 4);

for (let y = 0; y < height; y++) {
  const filter = decompressed[y * stride];
  const scanline = decompressed.subarray(y * stride + 1, (y + 1) * stride);
  const prevScanline = y > 0 ? rgba.subarray((y - 1) * width * 4, y * width * 4) : null;
  const currScanline = rgba.subarray(y * width * 4, (y + 1) * width * 4);

  for (let x = 0; x < width * bytesPerPixel; x++) {
    const raw = scanline[x];
    const a = x >= bytesPerPixel ? currScanline[x - bytesPerPixel] : 0;
    const b = prevScanline ? prevScanline[x] : 0;
    const c = (prevScanline && x >= bytesPerPixel) ? prevScanline[x - bytesPerPixel] : 0;

    let val = 0;
    if (filter === 0) val = raw;
    else if (filter === 1) val = (raw + a) & 0xff;
    else if (filter === 2) val = (raw + b) & 0xff;
    else if (filter === 3) val = (raw + Math.floor((a + b) / 2)) & 0xff;
    else if (filter === 4) {
      const p = a + b - c;
      const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - c);
      const pr = (pa <= pb && pa <= pc) ? a : (pb <= pc ? b : c);
      val = (raw + pr) & 0xff;
    }

    currScanline[x] = val;
  }
}

function getPixel(x, y) {
  if (x < 0 || x >= width || y < 0 || y >= height) return [255, 255, 255, 0];
  const idx = (y * width + x) * 4;
  return [rgba[idx], rgba[idx + 1], rgba[idx + 2], rgba[idx + 3]];
}

fs.mkdirSync('src/Images/customers', { recursive: true });

// 11 Customers along Y with cx = 205
const customerY = [132, 180, 228, 276, 325, 373, 421, 469, 518, 566, 614];
const size = 32;
const r = 13.5;
const half = size / 2;

customerY.forEach((cy, idx) => {
  const cx = 204.5;
  const cropBuf = Buffer.alloc(size * size * 4);

  for (let py = 0; py < size; py++) {
    for (let px = 0; px < size; px++) {
      const dx = px - half + 0.5;
      const dy = py - half + 0.5;
      const dist = Math.hypot(dx, dy);

      const sx = Math.round(cx + dx);
      const sy = Math.round(cy + dy);
      const sp = getPixel(sx, sy);

      const dIdx = (py * size + px) * 4;
      cropBuf[dIdx] = sp[0];
      cropBuf[dIdx + 1] = sp[1];
      cropBuf[dIdx + 2] = sp[2];

      if (dist <= r - 0.75) {
        cropBuf[dIdx + 3] = 255;
      } else if (dist >= r + 0.75) {
        cropBuf[dIdx + 3] = 0;
      } else {
        const factor = (r + 0.75 - dist) / 1.5;
        cropBuf[dIdx + 3] = Math.round(factor * 255);
      }
    }
  }

  const out = `src/Images/customers/cust-${idx + 1}.png`;
  savePng(size, size, cropBuf, out);
  console.log(`Saved ${out}`);
});

// Large John Deo avatar on the right:
// Around x = 880, y = 142
// Let's find exact center of the large circular avatar
let minX = 999, maxX = -1, minY = 999, maxY = -1;
for (let y = 100; y < 185; y++) {
  for (let x = 850; x < 915; x++) {
    const p = getPixel(x, y);
    if (p[0] < 252 || p[1] < 252 || p[2] < 252) {
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    }
  }
}

const lgW = maxX - minX + 1;
const lgH = maxY - minY + 1;
const lgCx = (minX + maxX) / 2;
const lgCy = (minY + maxY) / 2;
const lgR = Math.min(lgW, lgH) / 2;
const lgSize = 56;
const lgHalf = lgSize / 2;

console.log(`Large John Deo avatar: center=(${lgCx}, ${lgCy}), r=${lgR}`);

const lgCrop = Buffer.alloc(lgSize * lgSize * 4);
for (let py = 0; py < lgSize; py++) {
  for (let px = 0; px < lgSize; px++) {
    const dx = px - lgHalf + 0.5;
    const dy = py - lgHalf + 0.5;
    const dist = Math.hypot(dx, dy);

    const sx = Math.round(lgCx + dx);
    const sy = Math.round(lgCy + dy);
    const sp = getPixel(sx, sy);

    const dIdx = (py * lgSize + px) * 4;
    lgCrop[dIdx] = sp[0];
    lgCrop[dIdx + 1] = sp[1];
    lgCrop[dIdx + 2] = sp[2];

    if (dist <= lgR - 0.75) {
      lgCrop[dIdx + 3] = 255;
    } else if (dist >= lgR + 0.75) {
      lgCrop[dIdx + 3] = 0;
    } else {
      const factor = (lgR + 0.75 - dist) / 1.5;
      lgCrop[dIdx + 3] = Math.round(factor * 255);
    }
  }
}

savePng(lgSize, lgSize, lgCrop, 'src/Images/customers/cust-john-lg.png');
console.log('Saved src/Images/customers/cust-john-lg.png');
