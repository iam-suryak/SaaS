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

console.log('Customer List screenshot decoded: width =', width, 'height =', height);

// Let's find avatar centers along x ~ 200-210
// Scan y from 120 to 640
// Find circular photos
for (let y = 120; y < 630; y++) {
  // Check if there is an avatar around x=205
  const p = getPixel(205, y);
  // Avatars are not white and not transparent
}

// Find rows by scanning column x = 205 for skin tone or non-white
const rowHits = [];
for (let y = 120; y < 640; y++) {
  const p = getPixel(205, y);
  const isWhite = p[0] > 250 && p[1] > 250 && p[2] > 250;
  if (!isWhite) rowHits.push(y);
}

// Group into rows
const avatarRows = [];
let grp = [];
rowHits.forEach(y => {
  if (grp.length === 0 || y === grp[grp.length - 1] + 1) grp.push(y);
  else {
    avatarRows.push({ minY: grp[0], maxY: grp[grp.length - 1], midY: Math.round((grp[0] + grp[grp.length - 1]) / 2), size: grp.length });
    grp = [y];
  }
});
if (grp.length) avatarRows.push({ minY: grp[0], maxY: grp[grp.length - 1], midY: Math.round((grp[0] + grp[grp.length - 1]) / 2), size: grp.length });
console.log('Detected avatar Y clusters:', avatarRows);

// Also find large John Deo avatar on the right (x ~ 880, y ~ 100)
let lgMinX = 999, lgMaxX = -1, lgMinY = 999, lgMaxY = -1;
for (let y = 50; y < 150; y++) {
  for (let x = 840; x < 940; x++) {
    const p = getPixel(x, y);
    if (p[0] < 252 || p[1] < 252 || p[2] < 252) {
      if (x < lgMinX) lgMinX = x;
      if (x > lgMaxX) lgMaxX = x;
      if (y < lgMinY) lgMinY = y;
      if (y > lgMaxY) lgMaxY = y;
    }
  }
}
console.log('Large John Deo avatar bbox:', { lgMinX, lgMaxX, lgMinY, lgMaxY, w: lgMaxX - lgMinX + 1, h: lgMaxY - lgMinY + 1 });
