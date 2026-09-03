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
  await page.goto(`${base}/?bolhas=1`, { waitUntil: 'networkidle' });
  check((await page.title()).includes('Srs da Limpeza'), 'title contains brand');
  check(await page.locator('link[rel="icon"]').count() > 0, 'favicon declared');
  check(await page.locator('script[type="application/ld+json"]').count() === 2, 'JSON-LD LocalBusiness + FAQ');
  check((await page.locator('footer').textContent()).includes('© 2026'), 'footer year 2026');
  check(await page.locator('a[href^="https://wa.me/5513974076009"]').count() > 3, 'WhatsApp estofados links');
  check(await page.locator('a[href^="https://wa.me/5513997187827"]').count() > 1, 'WhatsApp pós-obra links');
  check(await page.locator('a[href*="instagram.com/reel/DV1wBAzEWu8"]').count() === 1, 'Instagram reel 1');
  check(await page.locator('a[href*="instagram.com/reel/DUrNh81kccg"]').count() === 1, 'Instagram reel 2');
  check(await page.locator('a[href*="share.google"]').count() >= 1, 'Google reviews link');
  await page.waitForTimeout(1500);
  check(await page.locator('[data-bubbles="on"] canvas').count() === 1, '3D bubbles mounted on desktop');
  const fab = page.getByRole('link', { name: 'Pedir orçamento no WhatsApp', exact: true });
  await page.waitForTimeout(1500);
  check(await fab.isVisible(), 'WhatsApp FAB visible');
  // nav anchors
  for (const id of ['servicos', 'como-funciona', 'resultados', 'avaliacoes', 'pos-obra', 'faq', 'contato']) {
    await page.click(`header a[href="#${id}"]`);
    await page.waitForTimeout(1400);
    const top = await page.locator(`#${id}`).evaluate((el) => el.getBoundingClientRect().top);
    check(top > -120 && top < 140, `anchor #${id} scrolls into view (top=${Math.round(top)})`);
  }
  // FAQ
  await page.click('#faq button[aria-expanded]');
  check(await page.locator('#faq [role="region"]').count() >= 1, 'FAQ accordion toggles');
  // Gallery buttons
  const before = await page.locator('#resultados ul').evaluate((el) => el.scrollLeft);
  await page.getByRole('button', { name: 'Próximo' }).click();
  await page.waitForTimeout(700);
  const after = await page.locator('#resultados ul').evaluate((el) => el.scrollLeft);
  check(after > before, 'gallery next button scrolls');
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
  check(await page.locator('[data-bubbles] canvas').count() === 0, 'no 3D canvas on mobile');
  check(!(await page.evaluate(() => document.documentElement.classList.contains('cc-cursor'))), 'no custom cursor on touch');
  await page.getByRole('button', { name: 'Abrir menu' }).click();
  await page.waitForTimeout(500);
  check(await page.getByRole('dialog').isVisible(), 'mobile menu opens');
  await page.getByRole('dialog').locator('a[href="#faq"]').click();
  await page.waitForTimeout(1200);
  check(await page.getByRole('dialog').count() === 0, 'mobile menu closes on navigation');
  const top = await page.locator('#faq').evaluate((el) => el.getBoundingClientRect().top);
  check(top > -120 && top < 140, `mobile anchor scrolls to #faq (top=${Math.round(top)})`);
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
  const og = await page.goto(`${base}/opengraph-image`);
  check(og.status() === 200 && og.headers()['content-type'].includes('image/png'), 'OG image renders');
  await page.close();
}
await browser.close();
if (failures.length) { console.log(`\n${failures.length} failure(s)`); process.exit(1); }
console.log('\nQA OK');
