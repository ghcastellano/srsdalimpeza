import { chromium, webkit } from 'playwright';
const launchOpts = { ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}), ...(process.env.PW_PROXY ? { proxy: { server: process.env.PW_PROXY } } : {}) };
import fs from 'node:fs/promises';

const base = process.env.BASE_URL || 'http://localhost:3300';
const out = process.env.OUT_DIR || '/tmp/srs-matrix';
const engine = process.env.ENGINE === 'webkit' ? webkit : chromium;
await fs.mkdir(out, { recursive: true });

const viewports = [
  ['iphone-se', 320, 568, true], ['iphone-13', 390, 844, true], ['pixel-7', 412, 915, true], ['iphone-15-max', 430, 932, true],
  ['iphone-land', 844, 390, true], ['ipad-mini', 768, 1024, true], ['ipad-pro', 1024, 1366, true], ['ipad-land', 1180, 820, true],
  ['laptop', 1280, 720, false], ['desktop', 1440, 900, false], ['desktop-fhd', 1920, 1080, false], ['ultrawide', 2560, 1080, false],
];

const browser = await engine.launch(engine === chromium ? launchOpts : {});
let failures = 0;
for (const [name, width, height, mobile] of viewports) {
  for (const path of ['/', '/politica-de-privacidade']) {
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: 1, isMobile: mobile && engine === chromium, hasTouch: mobile, ignoreHTTPSErrors: true });
    const page = await context.newPage();
    const errors = [];
    page.on('console', (m) => { if (m.type() === 'error') errors.push(m.text()); });
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('requestfailed', (r) => { const t = r.failure()?.errorText ?? ''; if (!t.includes('ERR_ABORTED') && !/google\.com\/maps|gstatic|googleapis/.test(r.url())) errors.push(`${r.url()} :: ${t}`); });
    await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(900);
    const layout = await page.evaluate(() => ({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth, h1: document.querySelector('h1')?.textContent?.trim() }));
    if (layout.sw > layout.cw + 1) errors.push(`horizontal overflow ${layout.sw} > ${layout.cw}`);
    if (!layout.h1) errors.push('missing h1');
    // Overlap check: hero copy vs. hero visual card (3D bubbles must not cover text)
    if (path === '/') {
      const overlap = await page.evaluate(() => {
        const h1 = document.querySelector('h1')?.getBoundingClientRect();
        const card = document.querySelector('[data-hero-card]')?.getBoundingClientRect();
        if (!h1 || !card) return null;
        return !(h1.right <= card.left || h1.left >= card.right || h1.bottom <= card.top || h1.top >= card.bottom);
      });
      if (overlap === true && width >= 1024) errors.push('hero H1 overlaps 3D visual card');
      // tiny-text check: no visible text below 12px
      const tiny = await page.evaluate(() => {
        const bad = [];
        for (const el of document.querySelectorAll('main p, main a, main span, main li, main h3, footer a, footer p')) {
          const cs = getComputedStyle(el);
          if (cs.display === 'none' || cs.visibility === 'hidden' || el.getAttribute('aria-hidden') === 'true') continue;
          if (parseFloat(cs.fontSize) < 12 && el.textContent.trim()) bad.push(`${parseFloat(cs.fontSize)}px: ${el.textContent.trim().slice(0, 30)}`);
        }
        return bad.slice(0, 5);
      });
      if (tiny.length) errors.push(`tiny text: ${tiny.join(' | ')}`);
      await page.screenshot({ path: `${out}/${name}-hero.png` });
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
      await page.waitForTimeout(700);
      await page.screenshot({ path: `${out}/${name}-full.png`, fullPage: true });
    }
    if (errors.length) { failures++; console.log(`✗ ${name} ${width}x${height} ${path}\n   ${errors.join('\n   ')}`); }
    else console.log(`✓ ${name} ${width}x${height} ${path}`);
    await context.close();
  }
}
await browser.close();
if (failures) { console.log(`\n${failures} failing viewport(s)`); process.exit(1); }
console.log('\nMatrix OK');
