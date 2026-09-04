'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';

/**
 * Abre e fecha com `grid-template-rows: 0fr → 1fr`, que o CSS anima sozinho.
 * Antes era altura animada pelo framer-motion; isto não custa JavaScript algum.
 */
export default function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="border-t border-ink/20">
      {items.map((item, index) => {
        const expanded = open === index;
        return (
          <div key={item.q} className="border-b border-ink/20">
            <button
              type="button"
              id={`faq-trigger-${index}`}
              aria-expanded={expanded}
              aria-controls={`faq-panel-${index}`}
              onClick={() => setOpen(expanded ? -1 : index)}
              className="flex w-full items-center justify-between gap-6 py-6 text-left sm:py-8"
            >
              <span className="font-display text-2xl leading-[1.34] sm:text-3xl">{item.q}</span>
              <span className="grid h-9 w-9 shrink-0 place-items-center border border-ink/30">
                <Plus className={`h-4 w-4 transition-transform duration-300 ${expanded ? 'rotate-45' : ''}`} />
              </span>
            </button>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-trigger-${index}`}
              // `hidden` não serve aqui: a classe `grid` define display e
              // vence o display:none do atributo. `inert` tira do teclado e
              // dos leitores de tela sem interferir na animação.
              inert={!expanded}
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: expanded ? '1fr' : '0fr' }}
            >
              {/* O padding precisa ficar DENTRO do elemento que recorta: em
                  0fr a linha tem altura zero, mas o padding do filho continua
                  ocupando espaço e deixava uma linha da resposta aparecendo. */}
              <div className="overflow-hidden">
                <p className="pb-7 text-sm text-ink/85 sm:text-base [max-width:48rem]">{item.a}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
