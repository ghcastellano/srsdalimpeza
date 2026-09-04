'use client';

import { useEffect, useRef } from 'react';

/**
 * Contador que sobe ao entrar na tela. rAF direto no textContent: sem
 * re-render do React e sem biblioteca de animação.
 */
export default function Counter({ value, className = '', duration = 1600 }: { value: number; className?: string; duration?: number }) {
  const node = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = node.current;
    if (!el) return;
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      el.textContent = String(value);
      return;
    }
    let frame = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      observer.disconnect();
      const start = performance.now();
      const step = (now: number) => {
        const t = Math.min(1, (now - start) / duration);
        // easeOutQuint: rápido no começo, assenta no fim
        const eased = 1 - Math.pow(1 - t, 5);
        el.textContent = String(Math.round(value * eased));
        if (t < 1) frame = requestAnimationFrame(step);
      };
      frame = requestAnimationFrame(step);
    }, { rootMargin: '-10% 0px' });
    observer.observe(el);
    return () => { observer.disconnect(); cancelAnimationFrame(frame); };
  }, [value, duration]);

  return <span ref={node} className={`tabular-nums ${className}`}>0</span>;
}
