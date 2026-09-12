import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import Reveal from './ui/Reveal';
import { services, whatsappUrl } from '@/lib/content';

export default function Services() {
  return (
    <div className="mt-12 grid gap-5 min-[480px]:grid-cols-2 lg:mt-16 lg:grid-cols-4 lg:gap-6">
      {services.map((service, index) => {
        // Serviço com landing própria linka para ela — é o link interno que
        // faz o Google descobrir e ranquear a página. Os demais seguem
        // indo direto para o WhatsApp.
        const internal = Boolean(service.href);
        const card = (
          <>
            <div data-service-image={service.slug} className="relative aspect-[4/3] overflow-hidden">
              <Image
                src={service.image}
                alt={service.imageAlt}
                fill
                quality={90}
                sizes="(max-width: 479px) 92vw, (max-width: 1023px) 46vw, (min-width: 1440px) 330px, 23vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
              />
              <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1 text-xs font-bold tabular-nums text-ink/80">0{index + 1}</span>
            </div>
            <div className="flex flex-1 flex-col p-6">
              <h3 className="font-display text-xl font-semibold text-ink">{service.title}</h3>
              <p className="mt-2.5 flex-1 text-sm text-ink/70">{service.text}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-aqua-dark">
                {internal ? 'Ver serviço' : 'Pedir orçamento'}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </>
        );
        const className = 'group relative flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card ring-1 ring-ink/5 transition-all duration-500 hover:-translate-y-1 hover:shadow-glow';

        return (
          <Reveal key={service.slug} delay={(index % 4) * .06} className="h-full">
            {internal ? (
              <Link
                prefetch={false}
                href={service.href!}
                data-cursor="view"
                data-cursor-label="Ver"
                aria-label={`${service.title} — ver página do serviço`}
                className={className}
              >
                {card}
              </Link>
            ) : (
              <a
                href={whatsappUrl(`Olá! Quero um orçamento para: ${service.title}.`, service.line)}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="view"
                data-cursor-label="Orçar"
                aria-label={`${service.title} — pedir orçamento no WhatsApp`}
                className={className}
              >
                {card}
              </a>
            )}
          </Reveal>
        );
      })}
    </div>
  );
}
