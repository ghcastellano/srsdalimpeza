'use client';

import { AnimatePresence, motion, useMotionValue, useSpring } from 'framer-motion';
import { useEffect, useState } from 'react';

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

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 380, damping: 34, mass: .55 });
  const ringY = useSpring(y, { stiffness: 380, damping: 34, mass: .55 });

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches) return;
    setEnabled(true);
    document.documentElement.classList.add('cc-cursor');

    const onMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);
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
      document.documentElement.classList.remove('cc-cursor');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const expanded = mode === 'view' || mode === 'drag';

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[95]" style={{ opacity: hidden ? 0 : 1, transition: 'opacity .25s ease' }}>
      {/* dot */}
      <motion.div
        style={{ x, y }}
        className="absolute left-0 top-0"
      >
        <div className={`-translate-x-1/2 -translate-y-1/2 rounded-full bg-aqua transition-all duration-200 ${expanded ? 'h-0 w-0 opacity-0' : 'h-1.5 w-1.5 opacity-100'}`} />
      </motion.div>
      {/* trailing ring / label */}
      <motion.div style={{ x: ringX, y: ringY }} className="absolute left-0 top-0">
        <div
          className={`flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full transition-all duration-300 ease-out ${
            expanded
              ? 'h-[84px] w-[84px] bg-aqua text-ink'
              : mode === 'link'
                ? 'h-12 w-12 border border-aqua/80 bg-aqua/10'
                : 'h-9 w-9 border border-aqua/60'
          }`}
        >
          <AnimatePresence>
            {expanded && (
              <motion.span
                initial={{ opacity: 0, scale: .6 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: .6 }}
                transition={{ duration: .18 }}
                className="text-[10px] font-semibold uppercase tracking-[.18em]"
              >
                {label}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
