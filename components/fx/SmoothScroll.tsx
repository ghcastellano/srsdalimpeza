'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import type Lenis from 'lenis';

/**
 * Smooth scrolling (Lenis) apenas para ponteiros precisos e sem
 * prefers-reduced-motion; em touch o scroll nativo é mantido.
 */
export default function SmoothScroll() {
  const pathname = usePathname();
  const lenisRef = useRef<Lenis | null>(null);

  // Troca de rota: garante a página no topo (o Lenis pode "segurar" a posição
  // anterior e engolir o scroll-to-top padrão do App Router).
  useEffect(() => {
    if (window.location.hash) return;
    lenisRef.current?.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;

    let lenis: Lenis | null = null;
    let frame = 0;
    let disposed = false;
    let observer: MutationObserver | null = null;

    const onClick = (event: MouseEvent) => {
      if (!lenis || event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      // Menu/lightbox abertos travam o body; deixa o fluxo padrão agir.
      if (document.body.style.overflow === 'hidden') return;
      const anchor = (event.target as HTMLElement).closest?.('a[href*="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.pathname !== window.location.pathname || !url.hash) return;
      const target = document.querySelector<HTMLElement>(url.hash);
      if (!target) return;
      event.preventDefault();
      const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
      const padding = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      // Alvo numérico absoluto: evita o desconto de scroll-padding que o
      // próprio Lenis aplica ao receber um elemento (aplicaria em dobro).
      const destination = window.scrollY + target.getBoundingClientRect().top - margin - padding;
      lenis.scrollTo(Math.max(0, destination), { duration: 1.15 });
      history.pushState(null, '', url.hash);
    };

    import('lenis').then(({ default: LenisCtor }) => {
      if (disposed) return;
      lenis = new LenisCtor({ duration: 1.08 });
      lenisRef.current = lenis;
      const loop = (time: number) => {
        lenis?.raf(time);
        frame = requestAnimationFrame(loop);
      };
      frame = requestAnimationFrame(loop);

      // Pausa o smooth scroll enquanto menu/lightbox travam o body.
      observer = new MutationObserver(() => {
        if (document.body.style.overflow === 'hidden') lenis?.stop();
        else lenis?.start();
      });
      observer.observe(document.body, { attributes: true, attributeFilter: ['style'] });
      // Captura: intercepta antes do handler interno do next/link.
      document.addEventListener('click', onClick, true);
    });

    return () => {
      disposed = true;
      cancelAnimationFrame(frame);
      observer?.disconnect();
      document.removeEventListener('click', onClick, true);
      lenis?.destroy();
      lenisRef.current = null;
    };
  }, []);

  return null;
}
