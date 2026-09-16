import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('cabeçalho usa o azul-ciano de referência quando o menu está fechado', async () => {
  const [header, hero, servicePage, styles] = await Promise.all([
    readFile('components/Header.tsx', 'utf8'),
    readFile('components/Hero.tsx', 'utf8'),
    readFile('components/ServicePage.tsx', 'utf8'),
    readFile('app/globals.css', 'utf8'),
  ]);
  assert.match(header, /scrolled \? 'hero-menu-bg border-b border-ink\/10 shadow/);
  assert.match(header, /: 'hero-menu-bg'/);
  assert.match(styles, /--hero-menu-cyan: #b8f2f9;/);
  assert.match(styles, /\.hero-menu-bg\s*\{\s*background-color: var\(--hero-menu-cyan\);/);
  assert.match(hero, /<section id="inicio" className="hero-menu-bg/);
  assert.match(servicePage, /<section className="hero-menu-bg/);
  assert.doesNotMatch(hero, /WaterLight|className="dots/);
  assert.match(header, /open \? 'bg-transparent'/);
});
