import { chromium } from 'playwright';
const launchOpts = { ...(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {}), ...(process.env.PW_PROXY ? { proxy: { server: process.env.PW_PROXY } } : {}) };
import AxeBuilder from '@axe-core/playwright';

const base = process.env.BASE_URL || 'http://localhost:3300';
const browser = await chromium.launch(launchOpts);
let total = 0;
for (const [w, h] of [[390, 844], [1440, 900]]) {
  for (const path of ['/', '/politica-de-privacidade']) {
    const context = await browser.newContext({ viewport: { width: w, height: h } });
    const page = await context.newPage();
    await page.goto(`${base}${path}`, { waitUntil: 'networkidle' });
    await page.waitForTimeout(800);
    // Reveal-in-view animations: força tudo visível antes da auditoria
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } window.scrollTo(0, 0); });
    await page.waitForTimeout(600);
    const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'best-practice']).exclude('iframe').analyze();
    const serious = results.violations.filter((v) => ['serious', 'critical'].includes(v.impact));
    total += serious.length;
    console.log(`${serious.length ? '✗' : '✓'} ${w}x${h} ${path}: ${results.violations.length} violations (${serious.length} serious/critical)`);
    for (const v of results.violations) console.log(`   [${v.impact}] ${v.id}: ${v.help} — ${v.nodes.slice(0, 3).map((n) => n.target.join(' ')).join(', ')}`);
    await context.close();
  }
}
await browser.close();
process.exit(total ? 1 : 0);
