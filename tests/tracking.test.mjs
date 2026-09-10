import test from 'node:test';
import assert from 'node:assert/strict';
import { CONSENT_KEY, contactFromUrl, contactEvent, isProductionHost, startTracking, trackContact } from '../lib/tracking.ts';

test('somente os dois domínios próprios podem carregar o GTM real', () => {
  assert.equal(isProductionHost('srsdalimpeza.com.br'), true);
  assert.equal(isProductionHost('www.srsdalimpeza.com.br'), true);
  for (const host of ['localhost', 'srsdalimpeza.vercel.app', 'srsdalimpeza.com.br.example.org']) assert.equal(isProductionHost(host), false);
});

test('reconhece somente os contatos da empresa, sem copiar mensagens', () => {
  assert.deepEqual(contactFromUrl('https://wa.me/5513974076009?text=Nome%3A%20Visitante'), { method: 'whatsapp', line: 'upholstery' });
  assert.deepEqual(contactFromUrl('https://wa.me/5513997187827'), { method: 'whatsapp', line: 'postWork' });
  assert.deepEqual(contactFromUrl('tel:+5513997187827'), { method: 'telephone', line: 'postWork' });
  for (const url of ['https://example.org/5513974076009', 'https://wa.me/1234', 'mailto:srsdalimpeza@gmail.com', 'invalid']) assert.equal(contactFromUrl(url), null);
});

test('evento não leva dados pessoais nem parâmetros', () => {
  assert.deepEqual(contactEvent('whatsapp', 'postWork', 'contact_form', '/contato?name=Visitante#gclid'), {
    event: 'whatsapp_click', contact_method: 'whatsapp', service_line: 'postWork', contact_placement: 'contact_form', page_path: '/contato',
  });
});

test('consentimento, prévia sem transmissão e carregamento único em produção', () => {
  let choice = null;
  const scripts = [];
  globalThis.localStorage = { getItem: (key) => key === CONSENT_KEY ? choice : null };
  globalThis.window = { location: { hostname: 'srsdalimpeza.vercel.app', pathname: '/' } };
  globalThis.document = { getElementById: (id) => scripts.find((s) => s.id === id), createElement: () => ({}), head: { appendChild: (s) => scripts.push(s) } };
  startTracking(); trackContact('whatsapp', 'upholstery', 'inicio');
  assert.equal(scripts.length, 0); assert.equal(window.dataLayer, undefined);
  choice = 'granted';
  startTracking(); trackContact('whatsapp', 'upholstery', 'inicio');
  assert.equal(scripts.length, 0); assert.equal(window.dataLayer.length, 1);
  window.location.hostname = 'srsdalimpeza.com.br';
  startTracking(); startTracking();
  assert.equal(scripts.length, 1);
  assert.equal(scripts[0].src, 'https://www.googletagmanager.com/gtm.js?id=GTM-KJWZ3WT');
  const before = window.dataLayer.length;
  choice = 'denied'; trackContact('whatsapp', 'postWork', 'contact_form');
  assert.equal(window.dataLayer.length, before);
  delete globalThis.window; delete globalThis.document; delete globalThis.localStorage;
});
