'use client';

import { useEffect } from 'react';

/**
 * Um único observer para todos os `.reveal` da página. Montado uma vez no
 * layout; cada elemento sai da lista assim que aparece.
 */
export default function RevealObserver() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('.reveal:not(.is-in)');
    if (!nodes.length) return;
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      nodes.forEach((n) => n.classList.add('is-in'));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.classList.add('is-in');
          observer.unobserve(entry.target);
        }
      },
      { threshold: .08, rootMargin: '0px 0px -6% 0px' },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, []);

  return null;
}
