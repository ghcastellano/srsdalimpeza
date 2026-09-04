'use client';

import { useEffect, useRef } from 'react';

type Entry = { el: HTMLElement; apply: (progress: number) => void; from: number; to: number };

const entries = new Set<Entry>();
let frame = 0;
let running = false;

/** Um único rAF para todos os efeitos ligados ao scroll, em vez de um por componente. */
function loop() {
  frame = 0;
  const viewport = window.innerHeight;
  // Lê todos os rects ANTES de escrever qualquer estilo. Intercalar leitura e
  // escrita obriga o navegador a refazer o layout a cada elemento, em todo
  // frame do scroll — era isso que dava a sensação de travada ao descer.
  const pending: [Entry, number][] = [];
  for (const entry of entries) {
    const top = entry.el.getBoundingClientRect().top;
    // 0 quando o topo do elemento está em `from` da viewport, 1 quando em `to`.
    const start = viewport * entry.from;
    const span = start - viewport * entry.to;
    const raw = span === 0 ? 1 : (start - top) / span;
    pending.push([entry, Math.min(1, Math.max(0, raw))]);
  }
  for (const [entry, progress] of pending) entry.apply(progress);
  running = false;
}

function schedule() {
  if (frame) return;
  running = true;
  frame = requestAnimationFrame(loop);
}

function onScroll() {
  if (!running) schedule();
}

/**
 * Progresso do elemento em relação à viewport, escrito direto no DOM.
 *
 * Existe para substituir o useScroll/useTransform do framer-motion: aqui não
 * há re-render do React por frame e todos os componentes dividem um único
 * requestAnimationFrame.
 */
export function useScrollProgress(apply: (progress: number) => void, from = .9, to = .35) {
  const ref = useRef<HTMLElement>(null);
  const applyRef = useRef(apply);
  applyRef.current = apply;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      applyRef.current(1);
      return;
    }
    const entry: Entry = { el, apply: (p) => applyRef.current(p), from, to };
    entries.add(entry);
    if (entries.size === 1) {
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
    }
    schedule();
    return () => {
      entries.delete(entry);
      if (entries.size === 0) {
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onScroll);
        if (frame) { cancelAnimationFrame(frame); frame = 0; running = false; }
      }
    };
  }, [from, to]);

  return ref;
}
