'use client';

import Image from 'next/image';
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { MediaItem } from '@/lib/content';

type Props = {
  items: MediaItem[];
  active: number | null;
  onChange: (index: number) => void;
  onClose: () => void;
};

/**
 * Player embutido. Vídeo nosso toca em <video> nativo — sem terceiros, sem
 * login e sem iframe. Só o YouTube usa embed, por ser hospedado lá.
 */
function Player({ item }: { item: MediaItem }) {
  const native = item.kind === 'video';
  const vertical = Boolean(item.vertical);
  // No vertical quem manda é a ALTURA (h-full + aspect), senão a caixa 9:16
  // calculada a partir da largura estoura para fora da área e cobre a legenda.
  const frame = vertical
    ? 'relative h-full max-h-full w-auto aspect-[9/16] overflow-hidden rounded-2xl bg-black/40'
    : 'relative w-full aspect-video overflow-hidden rounded-2xl bg-black/40';

  return (
    <div className={`relative mx-auto flex h-full w-full items-center justify-center ${vertical ? '' : 'max-w-[1100px]'}`}>
      <div className={frame}>
        {/* Capa por trás do player: cobre o instante de carregamento em vez de
            deixar um retângulo preto. */}
        <Image src={item.src} alt="" data-decorative fill quality={60} sizes="(max-width: 1023px) 92vw, 1100px" className="scale-105 object-cover opacity-25 blur-sm" />
        <span aria-hidden="true" className="absolute inset-0 grid place-items-center">
          <span className="h-9 w-9 animate-spin rounded-full border-2 border-white/25 border-t-white/80" />
        </span>
        {native ? (
          // muted + autoPlay: os navegadores bloqueiam autoplay com som; os
          // controles ficam visíveis para quem quiser ativar o áudio.
          <video
            key={item.videoSrc}
            poster={item.src}
            controls
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label={item.title}
            className="absolute inset-0 h-full w-full bg-black object-contain"
          >
            {item.videoSrcWebm && <source src={item.videoSrcWebm} type="video/webm" />}
            <source src={item.videoSrc} type="video/mp4" />
          </video>
        ) : (
          <iframe
            key={item.mediaId}
            src={`https://www.youtube-nocookie.com/embed/${item.mediaId}?autoplay=1&rel=0&modestbranding=1&playsinline=1&hl=pt-BR`}
            title={item.title}
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        )}
      </div>
    </div>
  );
}

/**
 * Lightbox acessível (portal no body, foco preso, setas/Esc). Foto ocupa a
 * área disponível em object-contain e amplia no clique; vídeo toca embutido.
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

  const item = active === null ? null : items[active];
  if (!mounted || !item || active === null) return null;
  const isVideo = item.kind === 'youtube' || item.kind === 'video';

  return createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}
          className="fade-in fixed inset-0 z-[80] grid grid-cols-[minmax(0,1fr)] grid-rows-[auto_minmax(0,1fr)_auto] bg-ink/[.98] p-3 text-white sm:p-5 lg:p-6"
        >
          <header className="flex min-w-0 items-start justify-between gap-4 border-b border-white/15 pb-3 sm:gap-6 sm:pb-4">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[.18em] text-sky">
                {isVideo ? 'Vídeo' : 'Foto'} {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
              </p>
              <h2 id={titleId} className="mt-1.5 truncate font-display text-xl font-semibold sm:text-2xl">{item.title}</h2>
            </div>
            <button ref={closeButton} type="button" onClick={onClose} aria-label="Fechar" className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/30 transition-colors hover:border-sky hover:bg-sky hover:text-ink">
              <X className="h-5 w-5" />
            </button>
          </header>

          <div className={`min-h-0 py-3 sm:py-4 ${!isVideo && zoom ? 'overflow-auto overscroll-contain' : 'grid place-items-center'}`}>
              <div key={item.src} className="fade-in relative h-full w-full">
                {isVideo ? (
                  <Player item={item} />
                ) : (
                  <div
                    onClick={() => setZoom((z) => !z)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); setZoom((z) => !z); } }}
                    aria-label={zoom ? 'Reduzir foto' : 'Ampliar foto'}
                    className={zoom ? 'relative h-[200%] w-[200%] cursor-zoom-out' : 'relative h-full w-full cursor-zoom-in'}
                  >
                    <Image src={item.src} alt={item.alt} fill quality={92} sizes="100vw" className="object-contain" priority />
                  </div>
                )}
              </div>
          </div>

          <footer className="flex min-w-0 flex-col gap-3 border-t border-white/15 pt-3 sm:pt-4">
            {item.caption && <p className="mx-auto max-w-3xl text-center text-sm leading-6 text-white/80">{item.caption}</p>}
            <div className="flex min-w-0 items-center justify-between gap-3">
              <button type="button" onClick={() => onChange((active - 1 + items.length) % items.length)} aria-label="Anterior" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-4 text-xs font-bold uppercase tracking-[.14em] transition-colors hover:border-sky hover:text-sky sm:px-5">
                <ChevronLeft className="h-4 w-4" /><span className="hidden sm:inline">Anterior</span>
              </button>
              {item.url ? (
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 min-w-0 items-center gap-2 truncate rounded-full px-2 text-xs font-bold uppercase tracking-[.15em] text-white/70 transition-colors hover:text-sky">
                  <span className="truncate">{item.tag}</span><ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                </a>
              ) : (
                <p className="min-w-0 truncate px-2 text-center text-xs font-bold uppercase tracking-[.15em] text-white/70">{item.tag}</p>
              )}
              <button type="button" onClick={() => onChange((active + 1) % items.length)} aria-label="Próximo" className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/25 px-4 text-xs font-bold uppercase tracking-[.14em] transition-colors hover:border-sky hover:text-sky sm:px-5">
                <span className="hidden sm:inline">Próximo</span><ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </footer>
        </div>,
    document.body,
  );
}
