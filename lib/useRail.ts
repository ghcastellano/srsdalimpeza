'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

function railLeftInset(root: HTMLElement) {
  return root.getBoundingClientRect().left + (parseFloat(getComputedStyle(root).scrollPaddingLeft) || 0);
}

/**
 * Trilho horizontal: trackpad, swipe, setas e arraste com o mouse.
 *
 * Duas armadilhas resolvidas aqui:
 * 1. O arraste só captura o ponteiro depois de 6px — capturar já no
 *    pointerdown redireciona o clique para o trilho e mata a abertura do item.
 * 2. O Lenis (smooth scroll) intercepta o wheel da página inteira e engolia o
 *    gesto horizontal do trackpad. O atributo data-lenis-prevent-horizontal,
 *    devolvido em `railProps`, faz o Lenis ignorar gestos horizontais aqui.
 */
export function useRail(count: number) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);

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
    let isDrag = false;
    let startX = 0;
    let startLeft = 0;
    let moved = 0;
    let pointerId = -1;

    const onDown = (event: PointerEvent) => {
      if (event.pointerType !== 'mouse' || event.button !== 0) return;
      down = true; isDrag = false; moved = 0;
      startX = event.clientX; startLeft = root.scrollLeft; pointerId = event.pointerId;
    };
    const onMove = (event: PointerEvent) => {
      if (!down) return;
      const dx = event.clientX - startX;
      if (!isDrag && Math.abs(dx) > 6) {
        isDrag = true;
        setDragging(true);
        try { root.setPointerCapture(pointerId); } catch { /* opcional */ }
        root.style.scrollSnapType = 'none';
      }
      if (!isDrag) return;
      moved = Math.max(moved, Math.abs(dx));
      root.scrollLeft = startLeft - dx;
    };
    const settle = () => {
      if (!down) return;
      down = false;
      if (!isDrag) return;
      isDrag = false;
      setDragging(false);
      try { root.releasePointerCapture(pointerId); } catch { /* já solto */ }
      root.style.scrollSnapType = '';
    };
    // Depois de um arraste real, engole o clique que o browser dispara.
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

  const railProps = {
    ref,
    'data-rail': true,
    'data-lenis-prevent-horizontal': true,
    'data-cursor': 'drag',
    tabIndex: 0,
  } as const;

  return { ref, active, progress, dragging, move, railProps };
}
