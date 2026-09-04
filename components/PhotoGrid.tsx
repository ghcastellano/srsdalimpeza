'use client';

import Image from 'next/image';
import { Maximize2 } from 'lucide-react';
import { useCallback, useState } from 'react';
import Lightbox from './Lightbox';
import Reveal from './ui/Reveal';
import type { GalleryItem } from '@/lib/content';

/**
 * Grade de fotos em que TODA foto abre no lightbox (com ida e volta).
 * `featured` deixa a primeira ocupando duas colunas e duas linhas.
 */
export default function PhotoGrid({
  items,
  className = '',
  itemClassName = 'aspect-[3/4]',
  featured = false,
  sizes = '(max-width: 1023px) 45vw, 22vw',
  dark = false,
}: {
  items: GalleryItem[];
  className?: string;
  itemClassName?: string;
  featured?: boolean;
  sizes?: string;
  dark?: boolean;
}) {
  const [active, setActive] = useState<number | null>(null);
  const open = useCallback((index: number) => setActive(index), []);
  const close = useCallback(() => setActive(null), []);

  return (
    <>
      <div className={className}>
        {items.map((item, index) => (
          <Reveal key={item.src} delay={Math.min(index, 5) * .05} className={featured && index === 0 ? 'col-span-2 row-span-2' : ''}>
            <button
              type="button"
              onClick={() => open(index)}
              data-cursor="view"
              data-cursor-label="Abrir"
              aria-label={`Ampliar foto: ${item.title}`}
              className={`group relative block w-full overflow-hidden rounded-2xl ${featured && index === 0 ? 'aspect-[4/3] sm:aspect-square' : itemClassName} ${dark ? 'bg-white/5' : 'bg-mist'}`}
            >
              <Image src={item.src} alt={item.alt} fill quality={85} sizes={sizes} className="object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              <span className="absolute right-2.5 top-2.5 grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                <Maximize2 className="h-4 w-4" />
              </span>
              <span className="absolute inset-x-0 bottom-0 truncate p-3 text-left text-xs font-bold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">{item.title}</span>
            </button>
          </Reveal>
        ))}
      </div>
      <Lightbox items={items} active={active} onChange={open} onClose={close} />
    </>
  );
}
