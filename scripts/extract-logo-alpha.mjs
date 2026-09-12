import sharp from 'sharp';
import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';

// This supplied JPEG has blue lettering on an achromatic, baked-in checkerboard.
// Keep the source RGB pixels; only derive alpha from their blue/cyan separation.
// This is not a general-purpose background remover and performs no generation.
const source = process.argv[2];
if (!source) throw new Error('Pass the supplied logo JPEG path.');
const input = await readFile(source);
const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
const rgba = Buffer.alloc(info.width * info.height * 4);
let left = info.width, top = info.height, right = 0, bottom = 0;
for (let i = 0; i < info.width * info.height; i++) {
  const [r, g, b] = data.subarray(i * 3, i * 3 + 3);
  const separation = Math.min(g - r, b - r);
  const alpha = Math.round(255 * Math.max(0, Math.min(1, (separation - 12) / 24)));
  rgba.set(alpha ? [r, g, b, alpha] : [0, 0, 0, 0], i * 4);
  if (alpha) {
    const x = i % info.width, y = Math.floor(i / info.width);
    left = Math.min(left, x); top = Math.min(top, y);
    right = Math.max(right, x); bottom = Math.max(bottom, y);
  }
}
if (right <= left || bottom <= top) throw new Error('No blue logo detected.');
const crop = { left, top, width: right - left + 1, height: bottom - top + 1 };
const padding = 16;
const logo = sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
  .extract(crop).extend({ top: padding, bottom: padding, left: padding, right: padding, background: '#00000000' });
await logo.clone().png().toFile('public/assets/brand/logo-enviado-transparente.png');
await logo.clone().webp({ lossless: true, effort: 6 }).toFile('public/assets/brand/logo-enviado-transparente.webp');
console.log(JSON.stringify({ sourceSha256: createHash('sha256').update(input).digest('hex'), crop, padding,
  width: crop.width + padding * 2, height: crop.height + padding * 2 }));
