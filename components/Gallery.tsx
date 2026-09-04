'use client';

import Image from 'next/image';
import { useReducedMotion } from 'framer-motion';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import Lightbox from './Lightbox';
import { gallery } from '@/lib/content';

/**
 * Trilho horizontal nativo (trackpad, swipe, setas e arraste com o mouse) +
 * lightbox. Mesmo mecanismo do portfólio do site da Camila Caruso: o
 * arraste só captura o ponteiro depois de 6px, para não matar o clique.
 */
function railLeftInset(root: HTMLElement) {
  return root.getBoundingClientRect().left + (parseFloat(getComputedStyle(root).scrollPaddingLeft) || 0);
}

function useRail(count: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    const compute = () => {
      const max = root.scrollWidth - root.clientWidth;
      setProgress(max > 4 ? Math.min(1, Math.max(0, root.scrollLeft / max)) : 0);
      const inset = railLeftInset(root);
      let best = 0;
      let bestDist = Infinity;
      root.querySelectorAll<HTMLElement>('[data-index]').forEach((card) => {
        const dist = Math.abs(card.getBoundingClientRect().left - inset);
        if (dist < bestDist) { bestDist = dist; best = Number(card.dataset.index); }
      });
      setActive(best);
    };
    compute();
    root.addEventListener('scroll', compute, { passive: true });
    window.addEventListener('resize', compute);

    let down = false;
    let dragging = false;
    let startX = 0;
    let startLeft = 0;
    let moved = 0;
    let pointerId = -1;
    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      down = true; dragging = false; moved = 0;
      startX = event.clientX; startLeft = root.scrollLeft; pointerId = event.pointerId;
    };
    const onMove = (event: PointerEvent) => {
      if (!down) return;
      const dx = event.clientX - startX;
      if (!dragging && Math.abs(dx) > 6) {
        dragging = true;
        try { root.setPointerCapture(pointerId); } catch { /* opcional */ }
        root.style.scrollSnapType = 'none';
      }
      if (!dragging) return;
      moved = Math.max(moved, Math.abs(dx));
      root.scrollLeft = startLeft - dx;
    };
    const settle = () => {
      if (!down) return;
      down = false;
      if (!dragging) return;
      dragging = false;
      try { root.releasePointerCapture(pointerId); } catch { /* já solto */ }
      root.style.scrollSnapType = '';
    };
    const onClickCapture = (event: MouseEvent) => {
      if (moved > 8) { event.preventDefault(); event.stopPropagation(); moved = 0; }
    };
    const onDragStart = (event: DragEvent) => event.preventDefault();
    root.addEventListener('dragstart', onDragStart);
    root.addEventListener('pointerdown', onDown);
    root.addEventListener('pointermove', onMove);
    root.addEventListener('pointerup', settle);
    root.addEventListener('pointercancel', settle);
    root.addEventListener('click', onClickCapture, true);
    return () => {
      root.removeEventListener('scroll', compute);
      window.removeEventListener('resize', compute);
      root.removeEventListener('dragstart', onDragStart);
      root.removeEventListener('pointerdown', onDown);
      root.removeEventListener('pointermove', onMove);
      root.removeEventListener('pointerup', settle);
      root.removeEventListener('pointercancel', settle);
      root.removeEventListener('click', onClickCapture, true);
    };
  }, [count]);

  const move = useCallback((direction: -1 | 1) => {
    const root = ref.current;
    if (!root) return;
    const inset = railLeftInset(root);
    const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-index]'));
    const target = direction === 1
      ? cards.find((card) => card.getBoundingClientRect().left > inset + 8)
      : cards.filter((card) => card.getBoundingClientRect().left < inset - 8).pop();
    if (!target) return;
    root.scrollBy({ left: target.getBoundingClientRect().left - inset, behavior: 'smooth' });
  }, []);

  return { ref, active, progress, move };
}

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const open = useCallback((index: number) => setLightbox(index), []);
  const close = useCallback(() => setLightbox(null), []);
  const reduced = useReducedMotion();
  const rail = useRail(gallery.length);

  return (
    <>
      <div
        ref={rail.ref}
        data-rail
        data-cursor="drag"
        tabIndex={0}
        aria-label="Galeria de resultados; deslize para explorar"
        className="scrollbar-none -mx-5 mt-12 flex snap-x gap-4 overflow-x-auto overflow-y-clip overscroll-x-contain px-5 pb-2 pt-2 [scroll-padding-left:20px] sm:mx-0 sm:gap-6 sm:px-0 sm:[scroll-padding-left:0] lg:mt-16"
      >
        {gallery.map((item, index) => (
          <button
            key={item.src}
            type="button"
            data-index={index}
            data-cursor="view"
            data-cursor-label="Abrir"
            aria-label={`Ampliar foto: ${item.title}`}
            onClick={() => open(index)}
            className="group relative w-[78vw] max-w-[420px] shrink-0 snap-start text-left sm:w-[46vw] lg:w-[min(30vw,460px)]"
          >
            <span className="relative block aspect-square overflow-hidden rounded-3xl bg-mist shadow-card">
              <Image
                src={item.src}
                alt=""
                fill
                quality={85}
                sizes="(max-width: 640px) 78vw, (max-width: 1023px) 46vw, 460px"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
              />
              <span className="absolute left-4 top-4 rounded-full bg-ink/75 px-3 py-1 text-xs font-bold tabular-nums tracking-[.12em] text-white backdrop-blur">{String(index + 1).padStart(2, '0')}</span>
              <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white text-ink opacity-90 transition-transform group-hover:scale-110"><ArrowUpRight className="h-4 w-4" /></span>
              {index === 0 && (
                <span aria-hidden="true" className="absolute inset-x-0 bottom-4 flex justify-between px-4 text-xs font-extrabold uppercase tracking-[.16em] text-white">
                  <span className="rounded-full bg-ink/70 px-3 py-1 backdrop-blur">Antes</span>
                  <span className="rounded-full bg-ocean px-3 py-1">Depois</span>
                </span>
              )}
            </span>
            <span className="mt-4 flex items-start justify-between gap-4 border-t border-ink/10 pt-3">
              <span className="min-w-0">
                <span className="block truncate font-display text-lg font-semibold text-ink">{item.title}</span>
                <span className="mt-0.5 block text-xs font-bold uppercase tracking-[.16em] text-aqua-dark">{item.tag}</span>
              </span>
            </span>
          </button>
        ))}
      </div>

      <div className="mt-8 flex items-center gap-4 sm:gap-5 lg:gap-6">
        <p className="w-[60px] shrink-0 text-xs font-bold tabular-nums tracking-[.16em] text-ink/80">
          {String(rail.active + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}
        </p>
        <div className="h-px flex-1 bg-ink/15">
          <div className="h-px origin-left bg-aqua" style={{ transform: `scaleX(${rail.progress})`, transition: reduced ? 'none' : 'transform .3s ease' }} />
        </div>
        <p className="shrink-0 text-xs font-bold uppercase tracking-[.2em] text-ink/80">
          <span className="lg:hidden">Deslize · toque para ampliar</span>
          <span className="hidden lg:inline">Arraste · clique para ampliar</span>
        </p>
        <div className="hidden gap-2 lg:flex">
          <button type="button" onClick={() => rail.move(-1)} disabled={rail.active === 0} aria-label="Foto anterior" className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 bg-white text-ink transition-colors hover:border-aqua hover:text-aqua-dark disabled:opacity-30"><ChevronLeft className="h-4 w-4" /></button>
          <button type="button" onClick={() => rail.move(1)} disabled={rail.active === gallery.length - 1} aria-label="Próxima foto" className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 bg-white text-ink transition-colors hover:border-aqua hover:text-aqua-dark disabled:opacity-30"><ChevronRight className="h-4 w-4" /></button>
        </div>
      </div>

      <Lightbox items={gallery} active={lightbox} onChange={open} onClose={close} />
    </>
  );
}
