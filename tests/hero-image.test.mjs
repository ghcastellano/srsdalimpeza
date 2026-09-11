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

test('contagem, imagem e avaliações têm faixas próprias no fluxo da página', async () => {
  const hero = await readFile('components/Hero.tsx', 'utf8');
  const count = hero.indexOf('data-hero-count');
  const photo = hero.indexOf('data-hero-image');
  const reviews = hero.indexOf('data-hero-reviews');
  assert.ok(count > 0 && photo > count && reviews > photo);
  for (const name of ['count', 'reviews']) {
    const element = hero.match(new RegExp(`data-hero-${name} className="([^"]+)"`));
    assert.ok(element);
    assert.doesNotMatch(element[1], /absolute|fixed|translate|inset/);
  }
});
