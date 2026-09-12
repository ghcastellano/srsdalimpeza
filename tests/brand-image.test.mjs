import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

for (const ext of ['png', 'webp']) test(`logo ${ext}: transparência real e proporção preservada`, async () => {
  const source = `public/assets/brand/logo-enviado-transparente.${ext}`;
  const meta = await sharp(source).metadata();
  assert.equal(meta.hasAlpha, true);
  assert.equal(meta.width, 2360);
  assert.equal(meta.height, 1190);
  const { data, info } = await sharp(source).raw().toBuffer({ resolveWithObject: true });
  let transparent = 0, opaque = 0;
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] === 0) transparent++;
    if (data[i + 3] === 255) opaque++;
    const x = (i / 4) % info.width, y = Math.floor(i / 4 / info.width);
    if (x < 16 || y < 16 || x >= info.width - 16 || y >= info.height - 16) assert.equal(data[i + 3], 0);
  }
  assert.ok(transparent > info.width * info.height * .6);
  assert.ok(opaque > info.width * info.height * .2);
});

test('marca não usa fundo branco, mistura de cores nem recorte do logo antigo', async () => {
  const component = await readFile('components/Brand.tsx', 'utf8');
  assert.match(component, /logo-enviado-transparente.webp/);
  assert.match(component, /object-contain/);
  assert.doesNotMatch(component, /logo-site-original|bg-white|mix-blend|left-\[|top-\[/);
});
