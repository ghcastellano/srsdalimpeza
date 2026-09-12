import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import sharp from 'sharp';

test('oito serviços usam fotos sem os arcos das miniaturas antigas', async () => {
  const source = await readFile('lib/content.ts', 'utf8');
  const services = source.split('export const services: Service[] = [')[1].split('\n];')[0];
  const paths = [...services.matchAll(/image: '([^']+)'/g)].map((match) => match[1]);
  assert.equal(paths.length, 8);
  assert.doesNotMatch(services, /original-serv-/);
  for (const path of paths) {
    const meta = await sharp(`public${path}`).metadata();
    assert.ok(meta.width >= 450 && meta.height >= 450, `${path}: não usar miniaturas de 300 px`);
  }
  assert.ok(paths.includes('/assets/photos/impermeabilizacao-gotas.jpeg'));
  assert.ok(paths.includes('/assets/photos/cadeira-infantil.webp'));
});

test('cards mantêm enquadramento retangular comum e imagens responsivas de qualidade alta', async () => {
  const source = await readFile('components/Services.tsx', 'utf8');
  assert.match(source, /aspect-\[4\/3\]/);
  assert.match(source, /quality=\{90\}/);
  assert.match(source, /object-cover/);
  assert.match(source, /max-width: 479px/);
});
