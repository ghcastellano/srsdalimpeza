import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

test('cabeçalho usa o mesmo fundo água do hero quando o menu está fechado', async () => {
  const header = await readFile('components/Header.tsx', 'utf8');
  assert.match(header, /scrolled \? 'water-bg border-b border-ink\/10 shadow/);
  assert.match(header, /: 'water-bg'/);
  assert.match(header, /open \? 'bg-transparent'/);
});
