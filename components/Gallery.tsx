'use client';

import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import RailControls from './ui/RailControls';
import { gallery } from '@/lib/content';
import { useRail } from '@/lib/useRail';

// O lightbox só existe depois do primeiro clique: fora do bundle inicial.
const Lightbox = dynamic(() => import('./Lightbox'), { ssr: false });

export default function Gallery() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const open = useCallback((index: number) => setLightbox(index), []);
  const close = useCallback(() => setLightbox(null), []);
  const rail = useRail(gallery.length);

  return (
    <>
      <div
        {...rail.railProps}
        aria-label="Galeria de resultados; arraste para explorar"
        className={`scrollbar-none -mx-5 mt-12 flex snap-x gap-4 overflow-x-auto overflow-y-clip overscroll-x-contain px-5 pb-2 pt-2 [scroll-padding-left:20px] sm:mx-0 sm:gap-6 sm:px-0 sm:[scroll-padding-left:0] lg:mt-16 ${rail.dragging ? 'select-none' : ''}`}
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
                alt={item.alt}
                fill
                quality={85}
                draggable={false}
                sizes="(max-width: 640px) 78vw, (max-width: 1023px) 46vw, 460px"
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
              />
              <span className="absolute left-4 top-4 rounded-full bg-ink/85 px-3 py-1 text-xs font-bold tabular-nums tracking-[.12em] text-white">{String(index + 1).padStart(2, '0')}</span>
              <span className="absolute right-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-white text-ink opacity-90 transition-transform group-hover:scale-110"><ArrowUpRight className="h-4 w-4" /></span>
              {index === 0 && (
                <span aria-hidden="true" className="absolute inset-x-0 bottom-4 flex justify-between px-4 text-xs font-extrabold uppercase tracking-[.16em] text-white">
                  <span className="rounded-full bg-ink/80 px-3 py-1">Antes</span>
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

      <RailControls active={rail.active} count={gallery.length} progress={rail.progress} onMove={rail.move} />
      <Lightbox items={gallery} active={lightbox} onChange={open} onClose={close} />
    </>
  );
}
