'use client';

import Image from 'next/image';
import { ArrowUpRight, Play } from 'lucide-react';
import { useCallback, useState } from 'react';
import dynamic from 'next/dynamic';
import RailControls from './ui/RailControls';
import { contact, media } from '@/lib/content';
import { useRail } from '@/lib/useRail';

function InstagramIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`fill-none stroke-current ${className}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

// O lightbox só existe depois do primeiro clique: fora do bundle inicial.
const Lightbox = dynamic(() => import('./Lightbox'), { ssr: false });

export default function MediaRail() {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const open = useCallback((index: number) => setLightbox(index), []);
  const close = useCallback(() => setLightbox(null), []);
  const rail = useRail(media.length);

  return (
    <>
      <div
        {...rail.railProps}
        aria-label="Vídeos e fotos; arraste para explorar"
        className={`scrollbar-none -mx-5 mt-12 flex snap-x gap-4 overflow-x-auto overflow-y-clip overscroll-x-contain px-5 pb-2 pt-2 [scroll-padding-left:20px] sm:mx-0 sm:gap-6 sm:px-0 sm:[scroll-padding-left:0] lg:mt-16 ${rail.dragging ? 'select-none' : ''}`}
      >
        {media.map((item, index) => {
          const isVideo = item.kind === 'youtube' || item.kind === 'video';
          return (
            <button
              key={item.src}
              type="button"
              data-index={index}
              data-cursor="view"
              data-cursor-label={isVideo ? 'Assistir' : 'Abrir'}
              aria-label={isVideo ? `Assistir: ${item.title}` : `Ampliar foto: ${item.title}`}
              onClick={() => open(index)}
              className="group relative w-[78vw] max-w-[440px] shrink-0 snap-start text-left sm:w-[52vw] lg:w-[min(32vw,480px)]"
            >
              <span className="relative block aspect-[16/10] overflow-hidden rounded-3xl bg-ink shadow-card">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  quality={82}
                  draggable={false}
                  sizes="(max-width: 640px) 78vw, (max-width: 1023px) 52vw, 480px"
                  className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.05]"
                />
                <span className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-ink/70 px-3 py-1.5 text-xs font-bold uppercase tracking-[.14em] text-white">
                  {isVideo ? <Play className="h-3.5 w-3.5 fill-current" /> : null}
                  {item.tag}
                </span>
                {isVideo && (
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-white/95 text-ink shadow-glow transition-transform duration-300 group-hover:scale-110">
                      <Play className="ml-0.5 h-6 w-6 fill-current" />
                    </span>
                  </span>
                )}
              </span>
              <span className="mt-4 flex items-start justify-between gap-4 border-t border-ink/10 pt-3">
                <span className="min-w-0">
                  <span className="block truncate font-display text-lg font-semibold text-ink">{item.title}</span>
                  <span className="mt-0.5 block text-xs font-bold uppercase tracking-[.16em] text-aqua-dark">
                    {isVideo ? 'Toca aqui na página' : 'Foto em alta resolução'}
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <RailControls active={rail.active} count={media.length} progress={rail.progress} onMove={rail.move} hint="clique para assistir" />

      <a
        href={contact.instagram}
        target="_blank"
        rel="noopener noreferrer"
        className="group mt-10 flex flex-col items-start justify-between gap-4 rounded-3xl border border-ink/10 bg-white p-6 shadow-card transition-colors hover:border-aqua sm:flex-row sm:items-center"
      >
        <span className="flex items-center gap-4">
          <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white"><InstagramIcon className="h-6 w-6" /></span>
          <span>
            <span className="block font-display text-lg font-semibold text-ink">Siga {contact.instagramHandle}</span>
            <span className="block text-sm text-ink/70">Antes e depois, bastidores e dicas para conservar seus estofados.</span>
          </span>
        </span>
        <span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-bold text-white transition-colors group-hover:bg-ocean">Seguir <ArrowUpRight className="h-4 w-4" /></span>
      </a>

      <Lightbox items={media} active={lightbox} onChange={open} onClose={close} />
    </>
  );
}
