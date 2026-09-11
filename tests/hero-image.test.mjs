import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { stat, readFile } from 'node:fs/promises';

const supplied = 'public/assets/photos/irmas-enviada-4k.webp';

test('master tem 3840 px, proporção original e tamanho limitado', async () => {
  const meta = await sharp(supplied).metadata();
  assert.equal(meta.width, 3840);
  assert.equal(meta.height, 3840);
  assert.equal(meta.format, 'webp');
  assert.ok((await stat(supplied)).size < 600_000);
});

test('destaque usa o novo arquivo, qualidade alta e proporção preservada', async () => {
  const hero = await readFile('components/Hero.tsx', 'utf8');
  assert.match(hero, /irmas-enviada-4k\.webp/);
  assert.doesNotMatch(hero, /original-quemsomos|quemsomos-4k\.webp/);
  assert.match(hero, /quality=\{90\}/);
  assert.match(hero, /object-contain/);
});
