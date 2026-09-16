import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('cabeçalho usa o azul-ciano de referência quando o menu está fechado', async () => {
  const [header, styles] = await Promise.all([
    readFile('components/Header.tsx', 'utf8'),
    readFile('app/globals.css', 'utf8'),
  ]);
  assert.match(header, /scrolled \? 'hero-menu-bg border-b border-ink\/10 shadow/);
  assert.match(header, /: 'hero-menu-bg'/);
  assert.match(styles, /\.hero-menu-bg[\s\S]*#b8f2f9[\s\S]*#aaf0f7/);
  assert.match(header, /open \? 'bg-transparent'/);
});
