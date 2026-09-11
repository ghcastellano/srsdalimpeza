import test from 'node:test';
import assert from 'node:assert/strict';
import { get } from 'node:http';

const base = process.env.BASE_URL || 'http://localhost:3300';
const domain = 'https://srsdalimpeza.com.br';
const pages = ['/', '/higienizacao-de-sofa-guaruja', '/limpeza-pos-obra-santos', '/politica-de-privacidade'];

for (const path of pages) test(`página e canonical: ${path}`, async () => {
  const response = await fetch(`${base}${path}`);
  assert.equal(response.status, 200);
  const html = await response.text();
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.equal(canonical?.replace(/\/$/, ''), `${domain}${path}`.replace(/\/$/, ''));
});

test('rotas antigas preservam campanha em todos os redirecionamentos', async () => {
  const query = '?gclid=TESTE_MIGRACAO&utm_source=google&utm_medium=cpc';
  for (const [path, destination] of [
    ['/higienizacao-de-estofados-na-baixada-santista/', '/higienizacao-de-sofa-guaruja'],
    ['/limpeza-pos-obra-santos/', '/limpeza-pos-obra-santos'],
    ['/politica-de-privacidade/', '/politica-de-privacidade'],
  ]) {
    const response = await fetch(`${base}${path}${query}`);
    assert.equal(response.status, 200);
    const url = new URL(response.url);
    assert.equal(url.pathname, destination);
    assert.equal(url.search, query);
  }
});

test('sitemap e robots referenciam o domínio próprio', async () => {
  const sitemap = await (await fetch(`${base}/sitemap.xml`)).text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
  assert.equal(urls.length, 4);
  assert.ok(urls.every((url) => url.startsWith(domain)));
  assert.match(await (await fetch(`${base}/robots.txt`)).text(), /Sitemap: https:\/\/srsdalimpeza\.com\.br\/sitemap\.xml/);
});

test('marca original, foto das gotas e favicon são servidos', async () => {
  for (const path of ['/assets/brand/logo-site-original.webp', '/assets/brand/favicon-original-96.png', '/assets/photos/irmas-enviada-4k.webp', '/assets/photos/impermeabilizacao-gotas.jpeg']) {
    const response = await fetch(`${base}${path}`);
    assert.equal(response.status, 200);
    assert.match(response.headers.get('content-type'), /^image\//);
  }
});

test('destaque preserva a imagem escolhida e usa entrega responsiva otimizada', async () => {
  const html = await (await fetch(base)).text();
  assert.doesNotMatch(html, /original-quemsomos|quemsomos-4k|equipe-srs/);
  assert.match(html, /irmas-enviada-4k/);
  assert.match(html, /irmas-enviada-4k[^"<>]*q=90/);
  assert.match(html, /object-contain p-3/);
});

test('prévia pública tem noindex, sem alterar canonical', async () => {
  if (new URL(base).hostname.endsWith('.vercel.app')) {
    assert.match((await fetch(base)).headers.get('x-robots-tag') || '', /noindex/);
  } else {
    // Node fetch não preserva a substituição de Host; testar o roteamento
    // com uma requisição HTTP explícita, como a borda da hospedagem faz.
    const headersFor = (host) => new Promise((resolve, reject) => {
      get(base, { headers: { host } }, (response) => {
        response.resume(); resolve(response.headers);
      }).on('error', reject);
    });
    const preview = await headersFor('srsdalimpeza.vercel.app');
    const production = await headersFor('srsdalimpeza.com.br');
    assert.match(preview['x-robots-tag'] || '', /noindex/);
    assert.equal(production['x-robots-tag'], undefined);
  }
});
