'use client';

import { useEffect, useRef, useState } from 'react';

type Mode = 'default' | 'link' | 'view' | 'drag';

/**
 * Cursor customizado (dot + anel magnético). Só ativa em ponteiro preciso
 * e sem prefers-reduced-motion; em touch nunca é montado.
 */
export default function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<Mode>('default');
  const [label, setLabel] = useState('');
  const [hidden, setHidden] = useState(true);

  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
    setEnabled(true);
    document.documentElement.classList.add('cc-cursor');

    // O ponto segue o cursor na hora; o anel usa um lerp curto num único rAF.
    // Antes eram dois springs do framer-motion.
    let px = -100, py = -100, rx = -100, ry = -100, frame = 0;
    const render = () => {
      frame = requestAnimationFrame(render);
      rx += (px - rx) * .35;
      ry += (py - ry) * .35;
      if (dot.current) dot.current.style.transform = `translate3d(${px}px, ${py}px, 0)`;
      if (ring.current) ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
    };
    frame = requestAnimationFrame(render);

    const onMove = (event: PointerEvent) => {
      px = event.clientX;
      py = event.clientY;
      setHidden(false);
    };
    const onOver = (event: PointerEvent) => {
      const target = event.target as HTMLElement;
      const tagged = target.closest?.('[data-cursor]') as HTMLElement | null;
      if (tagged) {
        const kind = tagged.dataset.cursor === 'drag' ? 'drag' : 'view';
        setMode(kind);
        setLabel(tagged.dataset.cursorLabel ?? (kind === 'drag' ? 'Arraste' : 'Ver'));
        return;
      }
      if (target.closest?.('a, button, [role="button"], input, textarea, select, label, summary')) {
        setMode('link');
        setLabel('');
        return;
      }
      setMode('default');
      setLabel('');
    };
    const onLeave = () => setHidden(true);

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(frame);
      document.documentElement.classList.remove('cc-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  if (!enabled) return null;

  const expanded = mode === 'view' || mode === 'drag';

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[95]" style={{ opacity: hidden ? 0 : 1, transition: 'opacity .25s ease' }}>
      {/* dot */}
      <div ref={dot} className="absolute left-0 top-0">
        <div className={`-translate-x-1/2 -translate-y-1/2 rounded-full bg-aqua transition-all duration-200 ${expanded ? 'h-0 w-0 opacity-0' : 'h-1 w-1 opacity-100'}`} />
      </div>
      {/* trailing ring / label */}
      <div ref={ring} className="absolute left-0 top-0">
        <div
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-[width,height,background-color,border-color] duration-200 ease-out ${
            expanded
              ? 'h-[58px] w-[58px] bg-aqua text-ink'
              : mode === 'link'
                ? 'h-8 w-8 border border-aqua/80 bg-aqua/10'
                : 'h-6 w-6 border border-aqua/60'
          }`}
        >
          {expanded && <span className="text-[9px] font-bold uppercase tracking-[.14em]">{label}</span>}
        </div>
      </div>
    </div>
  );
}
