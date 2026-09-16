import { chromium } from 'playwright';
const launchOpts = { ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}), ...(process.env.PW_PROXY ? { proxy: { server: process.env.PW_PROXY } } : {}) };

const base = process.env.BASE_URL || 'http://localhost:3300';
const browser = await chromium.launch(launchOpts);
const failures = [];
const check = (ok, msg) => { console.log(`${ok ? '✓' : '✗'} ${msg}`); if (!ok) failures.push(msg); };

// Desktop
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, ignoreHTTPSErrors: true });
  await context.route('**/wa.me/**', (route) => route.fulfill({ status: 200, contentType: 'text/html', body: 'ok' }));
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(`${base}/?fx=1`, { waitUntil: 'networkidle' });
  check((await page.title()).includes('Srs da Limpeza'), 'title contains brand');
  check(await page.locator('link[rel="icon"]').count() > 0, 'favicon declared');
  check(await page.locator('script[type="application/ld+json"]').count() === 2, 'JSON-LD LocalBusiness + FAQ');
  check((await page.locator('footer').textContent()).includes('© 2026'), 'footer year 2026');
  check(await page.locator('a[href^="https://wa.me/5513974076009"]').count() > 3, 'WhatsApp estofados links');
  check(await page.locator('a[href^="https://wa.me/5513997187827"]').count() > 1, 'WhatsApp pós-obra links');
  check(await page.locator('#videos [data-rail] [data-index]').count() >= 4, 'media rail has items');
  check(await page.locator('a[href*="share.google"]').count() >= 1, 'Google reviews link');
  await page.waitForTimeout(1500);
  check(await page.locator('[data-fx="on"] canvas').count() === 1, 'WebGL water light mounted on desktop');
  const fab = page.getByRole('link', { name: 'Pedir orçamento no WhatsApp', exact: true });
  await page.waitForTimeout(1500);
  check(await fab.isVisible(), 'WhatsApp FAB visible');
  // nav anchors
  for (const id of ['servicos', 'como-funciona', 'resultados', 'videos', 'avaliacoes', 'pos-obra', 'faq', 'contato']) {
    await page.click(`header a[href="#${id}"]`);
    await page.waitForTimeout(1400);
    const top = await page.locator(`#${id}`).evaluate((el) => el.getBoundingClientRect().top);
    check(top > -120 && top < 140, `anchor #${id} scrolls into view (top=${Math.round(top)})`);
  }
  // FAQ
  await page.click('#faq button[aria-expanded]');
  check(await page.locator('#faq [role="region"]').count() >= 1, 'FAQ accordion toggles');
  // Painel fechado precisa ter altura ZERO: já vazou uma linha da resposta
  // porque o padding do filho não era recortado pela linha de 0fr.
  // O clique acima fechou o primeiro (que abre por padrão); abre outro.
  await page.locator('#faq button[aria-expanded]').nth(1).click();
  await page.waitForTimeout(500);
  const panels = await page.locator('#faq [role="region"]').evaluateAll((els) =>
    els.map((el) => ({ open: el.previousElementSibling.getAttribute('aria-expanded') === 'true', h: el.getBoundingClientRect().height })));
  const leaking = panels.filter((p) => !p.open && p.h > 1);
  check(leaking.length === 0, `FAQ fechado com altura 0 (${leaking.length} vazando de ${panels.filter((p) => !p.open).length})`);
  check(panels.some((p) => p.open && p.h > 20), 'FAQ aberto mostra a resposta');
  // Gallery buttons
  const railSel = '#resultados [data-rail]';
  const before = await page.locator(railSel).evaluate((el) => el.scrollLeft);
  await page.getByRole('button', { name: 'Rolar para frente' }).first().click();
  await page.waitForTimeout(700);
  const after = await page.locator(railSel).evaluate((el) => el.scrollLeft);
  check(after > before, 'gallery next button scrolls');
  // drag with mouse
  const box = await page.locator(railSel).boundingBox();
  await page.mouse.move(box.x + box.width * .6, box.y + box.height * .4);
  await page.mouse.down();
  for (let i = 1; i <= 10; i++) await page.mouse.move(box.x + box.width * .6 - i * 40, box.y + box.height * .4);
  await page.mouse.up();
  await page.waitForTimeout(300);
  const dragged = await page.locator(railSel).evaluate((el) => el.scrollLeft);
  check(dragged > after + 100, `gallery drags with mouse (${Math.round(after)} → ${Math.round(dragged)})`);
  check(await page.getByRole('dialog').count() === 0, 'drag does not open lightbox');
  // click opens lightbox
  await page.locator(`${railSel} [data-index="0"]`).click();
  await page.waitForTimeout(500);
  const dialog = page.getByRole('dialog');
  check(await dialog.isVisible(), 'lightbox opens on click');
  const firstTitle = await dialog.locator('h2').textContent();
  await page.keyboard.press('ArrowRight');
  await page.waitForTimeout(500);
  check((await dialog.locator('h2').textContent()) !== firstTitle, 'lightbox arrow key advances');
  await dialog.getByRole('button', { name: 'Próximo' }).click();
  await page.waitForTimeout(400);
  check((await dialog.locator('h2').textContent()).length > 0, 'lightbox next button works');
  // Espera a imagem carregar e a animação de entrada assentar antes de medir.
  const img = dialog.locator('img').first();
  await img.waitFor({ state: 'visible', timeout: 5000 });
  await img.evaluate((el) => el.complete || new Promise((r) => el.addEventListener('load', r, { once: true }))).catch(() => {});
  let imgBox = null;
  for (let i = 0; i < 20; i++) {
    imgBox = await img.boundingBox();
    if (imgBox && imgBox.height > 500) break;
    await page.waitForTimeout(150);
  }
  check(imgBox && imgBox.height > 500, `lightbox image sized to viewport (${Math.round(imgBox?.height ?? 0)}px)`);
  await page.keyboard.press('Escape');
  await page.getByRole('dialog').waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});
  check(await page.getByRole('dialog').count() === 0, 'lightbox closes with Escape');
  // Form → WhatsApp
  await page.fill('#f-name', 'Teste QA');
  await page.fill('#f-phone', '13999999999');
  await page.selectOption('#f-service', 'Limpeza pós-obra');
  const [popup] = await Promise.all([page.waitForEvent('popup'), page.click('button[type="submit"]')]);
  await popup.waitForLoadState();
  check(popup.url().includes('wa.me/5513997187827'), 'form routes pós-obra to second WhatsApp line');
  check(decodeURIComponent(popup.url()).includes('Teste QA'), 'form message contains name');
  await popup.close();
  check(await page.getByRole('status').isVisible(), 'form success state');
  // custom cursor
  check(await page.evaluate(() => document.documentElement.classList.contains('cc-cursor')), 'custom cursor enabled on fine pointer');
  check(errors.length === 0, `no page errors (${errors.join(' | ')})`);
  await page.close();
}
// Mobile
{
  const context = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, ignoreHTTPSErrors: true });
  const page = await context.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  check(await page.locator('[data-fx] canvas').count() === 0, 'no WebGL canvas on mobile');
  check(!(await page.evaluate(() => document.documentElement.classList.contains('cc-cursor'))), 'no custom cursor on touch');
  await page.getByRole('button', { name: 'Abrir menu' }).click();
  await page.waitForTimeout(500);
  check(await page.getByRole('dialog').isVisible(), 'mobile menu opens');
  await page.getByRole('dialog').locator('a[href="#faq"]').click();
  await page.waitForTimeout(1200);
  check(await page.getByRole('dialog').count() === 0, 'mobile menu closes on navigation');
  const top = await page.locator('#faq').evaluate((el) => el.getBoundingClientRect().top);
  check(top > -120 && top < 140, `mobile anchor scrolls to #faq (top=${Math.round(top)})`);
  await page.locator('#resultados [data-rail] [data-index="1"]').tap();
  await page.waitForTimeout(500);
  check(await page.getByRole('dialog').isVisible(), 'mobile tap opens lightbox');
  await page.getByRole('button', { name: 'Fechar' }).tap();
  await page.waitForTimeout(400);
  // tap targets ≥ 44px for primary CTAs
  const small = await page.evaluate(() => Array.from(document.querySelectorAll('a[href^="https://wa.me"], button')).filter((el) => { const r = el.getBoundingClientRect(); const cs = getComputedStyle(el); return cs.display !== 'none' && r.width > 0 && (r.height < 40); }).map((el) => el.textContent.trim().slice(0, 30)));
  check(small.length === 0, `tap targets ≥ 40px (${small.join(', ')})`);
  await context.close();
}
// 404
{
  const page = await browser.newPage({ ignoreHTTPSErrors: true });
  const res = await page.goto(`${base}/pagina-inexistente`);
  check(res.status() === 404 && (await page.locator('h1').textContent()).length > 0, 'custom 404');
  const og = await page.goto(`${base}/assets/brand/compartilhamento-whatsapp.jpg`);
  check(og.status() === 200 && og.headers()['content-type'].includes('image/jpeg'), 'OG image renders');
  await page.close();
}

// ---------- SEO ----------
{
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  const pages = ['/', '/higienizacao-de-sofa-guaruja', '/limpeza-pos-obra-santos'];
  const titles = new Set(), descs = new Set(), h1s = new Set();
  for (const path of pages) {
    await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
    const seo = await page.evaluate(() => {
      const g = (s, a = 'content') => document.querySelector(s)?.getAttribute(a) ?? '';
      const hs = [...document.querySelectorAll('h1')].map((h) => h.textContent.replace(/\s+/g, ' ').trim());
      const imgs = [...document.querySelectorAll('main img:not([data-decorative])')];
      return {
        title: document.title,
        desc: g('meta[name="description"]'),
        canonical: g('link[rel="canonical"]', 'href'),
        h1count: hs.length,
        h1: hs[0] ?? '',
        og: g('meta[property="og:title"]'),
        ogImage: g('meta[property="og:image"]'),
        imgs: imgs.length,
        emptyAlt: imgs.filter((i) => !i.getAttribute('alt')).length,
        ld: [...document.querySelectorAll('script[type="application/ld+json"]')].map((s) => s.textContent),
      };
    });
    check(seo.title.length > 20 && seo.title.length <= 65, `${path} title ${seo.title.length} chars`);
    check(seo.desc.length > 80 && seo.desc.length <= 300, `${path} description ${seo.desc.length} chars`);
    check(seo.canonical.startsWith('http'), `${path} canonical ${seo.canonical}`);
    check(seo.h1count === 1, `${path} exactly one h1 (${seo.h1count})`);
    check(seo.og.length > 0, `${path} og:title present`);
    const expectedImage = path === '/limpeza-pos-obra-santos' ? 'compartilhamento-pos-obra.jpg' : 'compartilhamento-whatsapp.jpg';
    check(seo.ogImage === `https://srsdalimpeza.vercel.app/assets/brand/${expectedImage}`, `${path} OG image is accessible on the new site`);
    check(seo.emptyAlt === 0, `${path} all ${seo.imgs} content images have alt (${seo.emptyAlt} empty)`);
    let parsed = true;
    for (const raw of seo.ld) { try { JSON.parse(raw); } catch { parsed = false; } }
    check(parsed && seo.ld.length > 0, `${path} JSON-LD parses (${seo.ld.length} blocks)`);
    titles.add(seo.title); descs.add(seo.desc); h1s.add(seo.h1);
  }
  check(titles.size === pages.length, 'titles are unique across pages');
  check(descs.size === pages.length, 'descriptions are unique across pages');
  check(h1s.size === pages.length, 'h1s are unique across pages');
  // keyword coverage no h1 da home
  await page.goto(base, { waitUntil: 'domcontentloaded' });
  const h1 = (await page.locator('h1').textContent()).toLowerCase();
  check(h1.includes('higieniza') && h1.includes('guarujá'), 'home h1 carries service + city keywords');
  // dados estruturados corretos
  const ld = JSON.parse(await page.locator('script[type="application/ld+json"]').first().textContent());
  const biz = ld['@graph'].find((n) => String(n['@type']).includes('LocalBusiness'));
  check(biz.address.streetAddress.length > 5, `LocalBusiness has streetAddress`);
  check(biz.aggregateRating.ratingValue === '4.9' && biz.aggregateRating.reviewCount === '82', `aggregateRating ${biz.aggregateRating.ratingValue}/${biz.aggregateRating.reviewCount}`);
  check(!!biz.geo?.latitude, 'LocalBusiness has geo coordinates');
  // links internos para as landings
  await page.goto(base, { waitUntil: 'networkidle' });
  for (const slug of ['higienizacao-de-sofa-guaruja', 'limpeza-pos-obra-santos']) {
    check(await page.locator(`a[href="/${slug}"]`).count() > 0, `home links internally to /${slug}`);
  }
  // 301 do WordPress antigo: sem isso o Google perde o ranking das URLs antigas
  for (const [from, to] of [
    ['/higienizacao-de-estofados-na-baixada-santista', '/higienizacao-de-sofa-guaruja'],
    ['/wp-admin/edit.php', '/'],
    ['/wp-login.php', '/'],
    ['/feed', '/'],
  ]) {
    const r = await page.request.get(`${base}${from}`, { maxRedirects: 0 });
    const loc = r.headers()['location'] || '';
    check([301, 308].includes(r.status()) && loc.endsWith(to), `${from} → ${r.status()} ${loc || '(sem location)'}`);
  }
  // sitemap e robots
  const sm = await page.goto(`${base}/sitemap.xml`);
  const smText = await sm.text();
  check(sm.status() === 200 && pages.every((p) => smText.includes(p === '/' ? 'vercel.app<' : p.slice(1))), 'sitemap lists all pages');
  const rb = await page.goto(`${base}/robots.txt`);
  check((await rb.text()).includes('Sitemap:'), 'robots.txt points to sitemap');
  await page.close();
}

// ---------- vídeo embutido + arraste do trilho de mídia ----------
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(base, { waitUntil: 'networkidle' });
  const rail = '#videos [data-rail]';
  await page.locator(rail).scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  // Lenis não pode engolir o gesto horizontal do trilho
  check(await page.locator(`${rail}[data-lenis-prevent-horizontal]`).count() === 1, 'media rail opts out of Lenis horizontal');
  check(await page.locator('#resultados [data-rail][data-lenis-prevent-horizontal]').count() === 1, 'gallery rail opts out of Lenis horizontal');
  // arraste com o mouse
  const box = await page.locator(rail).boundingBox();
  const before = await page.locator(rail).evaluate((el) => el.scrollLeft);
  await page.mouse.move(box.x + box.width - 80, box.y + box.height / 2);
  await page.mouse.down();
  for (let i = 1; i <= 12; i++) await page.mouse.move(box.x + box.width - 80 - i * 24, box.y + box.height / 2);
  await page.mouse.up();
  await page.waitForTimeout(400);
  const after = await page.locator(rail).evaluate((el) => el.scrollLeft);
  check(after > before, `media rail drags with mouse (${Math.round(before)} → ${Math.round(after)})`);
  check(await page.getByRole('dialog').count() === 0, 'media drag does not open lightbox');
  // o primeiro item é vídeo do YouTube: abre e toca embutido
  await page.locator(`${rail} [data-index="0"]`).click();
  await page.waitForTimeout(800);
  const dialog = page.getByRole('dialog');
  check(await dialog.isVisible(), 'video opens in lightbox');
  const frame = dialog.locator('iframe');
  check(await frame.count() === 1, 'lightbox renders an embedded player');
  const src = await frame.getAttribute('src');
  check(/youtube-nocookie\.com\/embed\/[\w-]{6,}/.test(src) && src.includes('autoplay=1'), `player is an embedded YouTube (${(src || '').slice(0, 58)}…)`);
  await page.keyboard.press('Escape');
  await page.getByRole('dialog').waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});
  check(await page.getByRole('dialog').count() === 0, 'video lightbox closes and stops playback');

  // Os reels são arquivos nossos em <video> nativo, não iframe de terceiro
  const nativeIndex = await page.evaluate(() => {
    const cards = [...document.querySelectorAll('#videos [data-rail] [data-index]')];
    return cards.findIndex((c) => c.textContent.includes('colchão'));
  });
  check(nativeIndex >= 0, `native video card found at index ${nativeIndex}`);
  await page.locator(`${rail} [data-index="${nativeIndex}"]`).click();
  await page.waitForTimeout(900);
  const video = page.getByRole('dialog').locator('video');
  check(await video.count() === 1, 'reel plays in a native <video>');
  check(await page.getByRole('dialog').locator('iframe').count() === 0, 'reel does not use a third-party iframe');
  const vsrc = await video.evaluate((el) => el.currentSrc || el.querySelector('source')?.src || '');
  check(/\/assets\/video\/[\w-]+\.(mp4|webm)$/.test(vsrc), `video is served by us (${vsrc.split('/').pop()})`);
  check(await video.locator('source[type="video/mp4"]').count() === 1, 'has an H.264 fallback source');
  const played = await video.evaluate((el) => new Promise((resolve) => {
    if (el.readyState >= 2 && !el.paused) return resolve({ ok: true, t: el.currentTime, d: el.duration });
    const done = () => resolve({ ok: !el.paused, t: el.currentTime, d: el.duration });
    el.addEventListener('timeupdate', done, { once: true });
    setTimeout(() => resolve({ ok: !el.paused, t: el.currentTime, d: el.duration }), 4000);
  }));
  check(played.ok && played.d > 1, `video actually plays (t=${played.t?.toFixed(2)}s de ${played.d?.toFixed(1)}s)`);
  await page.keyboard.press('Escape');
  await page.getByRole('dialog').waitFor({ state: 'detached', timeout: 5000 }).catch(() => {});

  // arquivos entregues com o content-type certo
  for (const f of ['/assets/video/reel-estofados.mp4', '/assets/video/reel-pos-obra.mp4', '/assets/video/reel-estofados.webm', '/assets/video/reel-pos-obra.webm']) {
    const r = await page.request.get(`${base}${f}`);
    const ct = r.headers()['content-type'] || '';
    check(r.status() === 200 && /video\/(mp4|webm)/.test(ct), `${f.split('/').pop()} → ${r.status()} ${ct}`);
  }
  await page.close();
}

// Navegação client-side: o layout NÃO remonta ao trocar de página, então um
// observer montado uma vez só para de enxergar o conteúdo novo. Foi assim que
// a home voltou em branco — 88 blocos parados em opacity 0, sem erro nenhum no
// console — depois de visitar uma landing e apertar "voltar".
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, ignoreHTTPSErrors: true });
  const page = await context.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push(e.message));
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.locator('a[href="/higienizacao-de-sofa-guaruja"]').first().click();
  await page.waitForURL('**/higienizacao-de-sofa-guaruja', { timeout: 20000 });
  await page.waitForTimeout(600);

  // Só os blocos INTEIROS na viewport: o observer usa rootMargin -6%, então
  // quem está espiando pela borda de baixo ainda não deve ter aparecido.
  const inside = "[...document.querySelectorAll('.reveal')].filter(el=>{const r=el.getBoundingClientRect();return r.top>=0&&r.bottom<=innerHeight;})";
  for (const [label, go] of [['voltar', () => page.goBack()], ['avançar', () => page.goForward()], ['voltar de novo', () => page.goBack()]]) {
    await go();
    await page.waitForTimeout(400);
    // Posição fixa: sem isto o navegador restaura o scroll quando quer e a
    // medição pode pegar a viewport vazia, deixando a asserção passar à toa.
    await page.evaluate(() => window.scrollTo(0, 900));
    await page.waitForTimeout(250);
    await page.evaluate(() => window.scrollTo(0, 1600));
    await page.waitForFunction(`${inside}.every(el=>getComputedStyle(el).opacity==='1')`, null, { timeout: 8000 }).catch(() => {});
    const state = await page.evaluate(`(() => { const n = ${inside}; return { path: location.pathname, total: n.length, shown: n.filter(el=>getComputedStyle(el).opacity==='1').length }; })()`);
    check(state.total > 0 && state.shown === state.total,
      `${label} (${state.path}): ${state.shown}/${state.total} blocos da viewport renderizam`);
  }
  check(errors.length === 0, `navegação sem erros de JS${errors.length ? ': ' + errors[0].slice(0, 90) : ''}`);
  await page.close();
}

await browser.close();
if (failures.length) { console.log(`\n${failures.length} failure(s)`); process.exit(1); }
console.log('\nQA OK');
