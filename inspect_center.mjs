import fs from 'fs';
import zlib from 'zlib';

const buf = fs.readFileSync('C:/Users/POORNIMA/.gemini/antigravity/brain/05174b81-5e3c-46c9-a859-e2b02b956772/.user_uploaded/media_1793621849080_e1dbff76.png');
let offset = 8, width, height, idat = [];
while (offset < buf.length) {
  const len = buf.readUInt32BE(offset), type = buf.toString('ascii', offset+4, offset+8);
  if (type === 'IHDR') { width = buf.readUInt32BE(offset+8); height = buf.readUInt32BE(offset+12); }
  else if (type === 'IDAT') idat.push(buf.subarray(offset+8, offset+8+len));
  offset += 12 + len;
}
const decomp = zlib.inflateSync(Buffer.concat(idat));
const stride = 1 + width * 4;

console.log('Center pixels (x=20..38, y=20..38):');
for (let y = 20; y <= 38; y++) {
  const line = [];
  const scanline = decomp.subarray(y * stride + 1, (y + 1) * stride);
  for (let x = 20; x <= 38; x++) {
    const r = scanline[x * 4];
    const g = scanline[x * 4 + 1];
    const b = scanline[x * 4 + 2];
    const a = scanline[x * 4 + 3];
    line.push(`(${r},${g},${b},${a})`);
  }
  console.log(`y=${y}: ${line.slice(0, 5).join(' ')}`);
}
