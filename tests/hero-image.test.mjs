import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { stat } from 'node:fs/promises';

const original = 'public/assets/photos/original-quemsomos.webp';
const enlarged = 'public/assets/photos/quemsomos-4k.webp';

test('master tem 3840 px, proporção original e tamanho limitado', async () => {
  const meta = await sharp(enlarged).metadata();
  assert.equal(meta.width, 3840);
  assert.equal(meta.height, 3840);
  assert.equal(meta.format, 'webp');
  assert.ok((await stat(enlarged)).size < 250_000);
});

test('ampliação conserva os pixels de referência, sem regenerar a cena', async () => {
  const a = await sharp(original).removeAlpha().raw().toBuffer();
  const b = await sharp(enlarged).resize(600, 600).removeAlpha().raw().toBuffer();
  assert.equal(a.length, b.length);
  const averageError = a.reduce((sum, value, index) => sum + Math.abs(value - b[index]), 0) / a.length;
  assert.ok(averageError < 4, `Erro médio ${averageError} excede 4 níveis de 255`);
});
