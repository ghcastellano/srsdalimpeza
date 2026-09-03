'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef } from 'react';
import { gallery } from '@/lib/content';

/**
 * Trilho horizontal com scroll-snap nativo (funciona com dedo, trackpad,
 * teclado e botões). Cursor "Arraste" no desktop.
 */
export default function Gallery() {
  const track = useRef<HTMLUListElement>(null);

  function scrollBy(direction: 1 | -1) {
    const el = track.current;
    if (!el) return;
    const item = el.querySelector<HTMLElement>('li');
    const step = (item?.offsetWidth ?? 320) + 20;
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  }

  return (
    <div className="relative mt-12 lg:mt-16">
      <ul
        ref={track}
        data-cursor="drag"
        tabIndex={0}
        aria-label="Galeria de resultados"
        className="scrollbar-none -mx-5 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 [scroll-padding-inline:20px] sm:-mx-0 sm:px-0 sm:[scroll-padding-inline:0]"
      >
        {gallery.map((item, index) => (
          <li key={item.src} className="relative w-[78vw] max-w-[380px] shrink-0 snap-start sm:w-[46vw] lg:w-[24vw] lg:max-w-[360px]">
            <figure className="group relative aspect-[4/5] overflow-hidden rounded-3xl bg-mist shadow-card">
              <Image
                src={item.src}
                alt={item.alt}
                fill
                quality={80}
                sizes="(max-width: 640px) 78vw, (max-width: 1023px) 46vw, 24vw"
                className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
              {index === 0 && (
                <div aria-hidden="true" className="absolute inset-x-0 top-0 flex justify-between p-4 text-xs font-extrabold uppercase tracking-[.16em] text-white">
                  <span className="rounded-full bg-ink/70 px-3 py-1 backdrop-blur">Antes</span>
                  <span className="rounded-full bg-ocean px-3 py-1">Depois</span>
                </div>
              )}
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-5 pt-14 text-white">
                <span className="text-xs font-bold uppercase tracking-[.16em] text-sky">{item.tag}</span>
              </figcaption>
            </figure>
          </li>
        ))}
      </ul>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-sm text-ink/70">Fotos reais de serviços executados pela equipe.</p>
        <div className="flex gap-2">
          <button type="button" onClick={() => scrollBy(-1)} aria-label="Anterior" className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-white text-ink transition-colors hover:border-aqua hover:text-aqua-dark"><ChevronLeft className="h-5 w-5" /></button>
          <button type="button" onClick={() => scrollBy(1)} aria-label="Próximo" className="grid h-11 w-11 place-items-center rounded-full border border-ink/15 bg-white text-ink transition-colors hover:border-aqua hover:text-aqua-dark"><ChevronRight className="h-5 w-5" /></button>
        </div>
      </div>
    </div>
  );
}
