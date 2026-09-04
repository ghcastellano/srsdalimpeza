'use client';

import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { GalleryItem } from '@/lib/content';

type Props = {
  items: GalleryItem[];
  active: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
};

/**
 * Lightbox acessível (portal no body, foco preso, setas/Esc). A foto ocupa a
 * área disponível em object-contain: tamanho proporcional à tela, em alta
 * qualidade (quality 92, sizes 100vw). Clique amplia com pan por scroll nativo.
 */
export default function Lightbox({ items, active, onChange, onClose }: Props) {
  const titleId = useId();
  const closeButton = useRef<HTMLButtonElement>(null);
  const [zoom, setZoom] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  useEffect(() => { setZoom(false); }, [active]);

  useEffect(() => {
    if (active === null) return;
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowRight') onChange((active + 1) % items.length);
      if (event.key === 'ArrowLeft') onChange((active - 1 + items.length) % items.length);
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    requestAnimationFrame(() => closeButton.current?.focus());
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKey);
      previouslyFocused?.focus();
    };
  }, [active, onChange, onClose, items.length]);

  if (!mounted) return null;

  return createPortal(
    <AnimatePresence>
      {active !== null && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: .28 }}
          onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
          className="fixed inset-0 z-[80] grid grid-cols-[minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)_auto] bg-ink/[.98] backdrop-blur-md p-3 text-white sm:p-5 lg:p-6"
        >
          <header className="flex min-w-0 items-start justify-between gap-4 border-b border-white/15 pb-3 sm:gap-6 sm:pb-4">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-sky">
                Foto {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </p>
              <h2 id={titleId} className="mt-1.5 truncate font-display text-xl font-semibold sm:text-2xl">{items[active].title}</h2>
            </div>
            <button ref={closeButton} type="button" onClick={onClose} aria-label="Fechar foto" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/30 transition-colors hover:border-sky hover:bg-sky hover:text-ink">
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className={`min-h-0 py-3 sm:py-4 ${zoom ? 'overflow-auto overscroll-contain' : 'grid place-items-center'}`}>
            <AnimatePresence mode="wait">
              <motion.div
                key={items[active].src}
                initial={{ opacity: 0, scale: .985 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: .992 }}
                transition={{ duration: .35, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setZoom((z) => !z)}
                role="button"
                tabIndex={0}
                onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setZoom((z) => !z); } }}
                aria-label={zoom ? 'Reduzir foto' : 'Ampliar foto'}
                className={zoom ? 'relative h-[200%] w-[200%] cursor-zoom-out' : 'relative h-full w-full cursor-zoom-in'}
              >
                <Image src={items[active].src} alt="" fill quality={92} sizes="100vw" className="object-contain" priority />
              </motion.div>
            </AnimatePresence>
          </div>

          <footer className="flex min-w-0 items-center justify-between gap-3 border-t border-white/15 pt-3 sm:gap-4 sm:pt-4">
            <button type="button" onClick={() => onChange((active - 1 + items.length) % items.length)} aria-label="Foto anterior" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-4 text-xs font-bold uppercase tracking-[.14em] transition-colors hover:border-sky hover:text-sky sm:px-5">
              <ChevronLeft className="h-4 w-4" /><span className="hidden sm:inline">Anterior</span>
            </button>
            <p className="max-w-[48%] truncate text-center text-xs font-bold uppercase tracking-[.15em] text-white/70">{items[active].tag}</p>
            <button type="button" onClick={() => onChange((active + 1) % items.length)} aria-label="Próxima foto" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-4 text-xs font-bold uppercase tracking-[.14em] transition-colors hover:border-sky hover:text-sky sm:px-5">
              <span className="hidden sm:inline">Próxima</span><ChevronRight className="h-4 w-4" />
            </button>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}
