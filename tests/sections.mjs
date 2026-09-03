import { chromium } from 'playwright';
const launchOpts = process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {};
const base = process.env.BASE_URL || 'http://localhost:3300';
const out = process.env.OUT_DIR || '/tmp/srs-sections';
import fs from 'node:fs/promises'; await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch(launchOpts);
for (const [name, w, h, mobile] of [['desktop', 1440, 900, false], ['mobile', 390, 844, true], ['tablet', 1024, 1366, true]]) {
  const ctx = await browser.newContext({ viewport: { width: w, height: h }, isMobile: mobile, hasTouch: mobile, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(base, { waitUntil: 'networkidle' });
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); } });
  await page.waitForTimeout(800);
  const ids = await page.evaluate(() => Array.from(document.querySelectorAll('main > section, footer')).map((s, i) => { s.dataset.shot = s.id || `sec-${i}`; return s.dataset.shot; }));
  for (const id of ids) await page.locator(`[data-shot="${id}"]`).screenshot({ path: `${out}/${name}-${id}.png` });
  await ctx.close();
}
await browser.close();
console.log('sections done');
