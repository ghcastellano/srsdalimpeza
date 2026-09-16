import test from 'node:test';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import { stat, readFile } from 'node:fs/promises';

const supplied = 'public/assets/photos/irmas-enviada-alta-qualidade.jpeg';

test('imagem institucional fornecida tem resolução suficiente e tamanho controlado', async () => {
  const meta = await sharp(supplied).metadata();
  assert.equal(meta.width, 1024);
  assert.equal(meta.height, 1024);
  assert.equal(meta.format, 'jpeg');
  assert.ok((await stat(supplied)).size < 600_000);
});

test('destaque usa a foto inteira, sem o recorte diagonal, e preserva a proporção', async () => {
  const hero = await readFile('components/Hero.tsx', 'utf8');
  assert.match(hero, /irmas-enviada-alta-qualidade\.jpeg/);
  assert.doesNotMatch(hero, /original-quemsomos|quemsomos-4k\.webp|irmas-enviada-4k|equipe-srs/);
  assert.match(hero, /aspect-square/);
  assert.match(hero, /quality=\{90\}/);
  assert.match(hero, /object-cover object-top/);
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

test('foto do sofá de canto usa recorte 4:3 sem as faixas do arquivo legado', async () => {
  const meta = await sharp('public/assets/photos/sofa-3-sem-faixas.webp').metadata();
  assert.equal(meta.width, 900);
  assert.equal(meta.height, 675);

  const [gallery, pages] = await Promise.all([
    readFile('lib/content.ts', 'utf8'),
    readFile('lib/service-pages.ts', 'utf8'),
  ]);
  assert.match(gallery, /sofa-3-sem-faixas\.webp/);
  assert.match(pages, /sofa-3-sem-faixas\.webp/);
  assert.doesNotMatch(gallery, /src: '\/assets\/photos\/sofa-3\.webp'/);
});
