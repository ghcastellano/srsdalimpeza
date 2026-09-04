'use client';

import { useEffect } from 'react';

/**
 * Um único observer para todos os `.reveal` da página, montado uma vez no
 * layout; cada elemento sai da lista assim que aparece.
 *
 * O MutationObserver não é luxo: na navegação client-side do App Router o
 * layout NÃO remonta, então os `.reveal` da página seguinte nunca entrariam
 * na conta. Era o que deixava a home em branco ao voltar de uma landing —
 * 88 blocos parados em opacity 0, sem erro nenhum no console.
 */
export default function RevealObserver() {
  useEffect(() => {
    const animates = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    const show = (el: Element) => el.classList.add('is-in');

    const observer: IntersectionObserver | null = animates
      ? new IntersectionObserver(
          (entries, self) => {
            for (const entry of entries) {
              if (!entry.isIntersecting) continue;
              show(entry.target);
              self.unobserve(entry.target);
            }
          },
          { threshold: .08, rootMargin: '0px 0px -6% 0px' },
        )
      : null;

    const track = (el: Element) => (observer ? observer.observe(el) : show(el));
    const trackTree = (root: Element | Document) => {
      root.querySelectorAll('.reveal:not(.is-in)').forEach(track);
    };

    trackTree(document);

    const mutations = new MutationObserver((records) => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (!(node instanceof Element)) continue;
          if (node.classList.contains('reveal') && !node.classList.contains('is-in')) track(node);
          trackTree(node);
        }
      }
    });
    mutations.observe(document.body, { childList: true, subtree: true });

    return () => {
      mutations.disconnect();
      observer?.disconnect();
    };
  }, []);

  return null;
}
