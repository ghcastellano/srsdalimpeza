'use client';

import Image from 'next/image';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Leaf, ShieldCheck, Star, Wind } from 'lucide-react';
import { useRef } from 'react';
import Bubbles3D from './fx/Bubbles3D';
import Marquee from './fx/Marquee';
import { contact, messages, whatsappUrl } from '@/lib/content';

function Line({ text, delay, className = '' }: { text: string; delay: number; className?: string }) {
  const reduced = useReducedMotion();
  return (
    <span className="line-mask">
      <motion.span
        className={`inline-block ${className}`}
        initial={reduced ? false : { y: '110%' }}
        animate={{ y: '0%' }}
        transition={{ duration: .85, delay, ease: [0.22, 1, 0.36, 1] }}
      >
        {text}
      </motion.span>
    </span>
  );
}

const trust = [
  { icon: Star, label: 'Excelente no Google', sub: '73 avaliações · 5 estrelas' },
  { icon: Wind, label: 'Secagem rápida', sub: 'pronto em poucas horas' },
  { icon: Leaf, label: 'Produtos ecológicos', sub: 'seguros p/ crianças e pets' },
  { icon: ShieldCheck, label: 'Garantia de resultado', sub: 'se não ficar bom, voltamos' },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: root, offset: ['start start', 'end start'] });
  const copyY = useTransform(scrollYProgress, [0, 1], ['0%', '14%']);
  const copyOpacity = useTransform(scrollYProgress, [0, .8], [1, 0]);
  const imgY = useTransform(scrollYProgress, [0, 1], ['0%', '10%']);

  return (
    <section id="inicio" ref={root} className="water-bg relative overflow-hidden pt-[96px] lg:min-h-[100svh] lg:pt-[110px]">
      <div aria-hidden="true" className="dots pointer-events-none absolute inset-0 opacity-40 [mask-image:radial-gradient(60%_60%_at_50%_40%,#000,transparent)]" />

      <div className="container-shell relative grid items-center gap-10 pb-24 lg:grid-cols-12 lg:gap-8 lg:pb-32">
        <motion.div style={reduced ? undefined : { y: copyY, opacity: copyOpacity }} className="relative z-10 lg:col-span-6">
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7, delay: .1 }}
            className="eyebrow text-aqua-dark"
          >
            Higienização de estofados · {contact.region} · desde 2018
          </motion.p>
          <h1 className="display-title mt-6 text-[clamp(2.55rem,7.2vw,5.4rem)] text-ink">
            <Line text="Seu sofá como novo." delay={.15} />
            <Line text="Sua casa livre" delay={.27} />
            <Line text="de ácaros." delay={.37} className="text-gradient pr-2" />
          </h1>
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7, delay: .55 }}
            className="mt-7 max-w-xl text-lg text-ink/80"
          >
            Higienização profunda de sofás, colchões e estofados, impermeabilização, limpeza pós-obra e revitalização de pisos. Mais de 6.000 clientes atendidos em Guarujá, Santos e Bertioga. Orçamento grátis em minutos.
          </motion.p>
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7, delay: .68 }}
            className="mt-9 flex flex-col gap-4 sm:flex-row sm:items-center"
          >
            <a
              href={whatsappUrl(messages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-whatsapp px-8 text-base font-bold text-ink shadow-[0_18px_40px_-16px_rgba(37,211,102,.7)] transition-transform duration-300 hover:-translate-y-0.5"
            >
              <WhatsIcon className="h-5 w-5" />
              Pedir orçamento grátis
              <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href="#resultados" className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-ink/15 bg-white/60 px-7 text-base font-bold text-ink backdrop-blur transition-colors hover:border-aqua hover:text-aqua-dark">
              Ver resultados <ArrowDown className="h-4 w-4 transition-transform group-hover:translate-y-0.5" />
            </a>
          </motion.div>

          <motion.ul
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: .7, delay: .85 }}
            aria-label="Diferenciais"
            className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 border-t border-ink/10 pt-7 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4"
          >
            {trust.map(({ icon: Icon, label, sub }) => (
              <li key={label} className="flex items-start gap-3">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white text-aqua-dark shadow-card"><Icon className="h-4 w-4" /></span>
                <span className="min-w-0">
                  <span className="block text-sm font-bold leading-5 text-ink">{label}</span>
                  <span className="block text-[13px] leading-5 text-ink/70">{sub}</span>
                </span>
              </li>
            ))}
          </motion.ul>
        </motion.div>

        {/* Coluna visual: foto em cartão + bolhas 3D confinadas ao cartão (md+). */}
        <motion.div
          initial={reduced ? false : { opacity: 0, scale: .96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, delay: .35, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-6"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[560px] sm:aspect-[5/4] lg:aspect-[4/5] lg:max-w-none xl:aspect-[5/5.4]">
            <motion.div style={reduced ? undefined : { y: imgY }} className="absolute -inset-y-[5%] inset-x-0 overflow-hidden rounded-[2rem] shadow-[0_40px_90px_-30px_rgba(6,38,55,.45)]">
              <Image
                src="/assets/photos/hero-wide.webp"
                alt="Crianças deitadas e sorrindo em um sofá claro recém-higienizado"
                fill
                priority
                fetchPriority="high"
                quality={82}
                sizes="(max-width: 640px) 92vw, (max-width: 1023px) 560px, 46vw"
                className="object-cover object-[62%_center]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-transparent" />
            </motion.div>
            <Bubbles3D className="-inset-[12%] z-10" />
            {/* Selo flutuante */}
            <div className="absolute bottom-5 left-5 z-20 flex items-center gap-3 rounded-2xl bg-white/90 p-3 pr-5 shadow-card backdrop-blur sm:bottom-7 sm:left-7">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-ink text-sky"><Star className="h-5 w-5 fill-current" /></span>
              <span>
                <span className="block text-sm font-extrabold leading-5 text-ink">Excelente · 73 avaliações</span>
                <span className="block text-[13px] leading-5 text-ink/70">Google · Guarujá e região</span>
              </span>
            </div>
            <div className="absolute right-4 top-2 z-20 rounded-full bg-ink px-4 py-2 text-[13px] font-bold text-white shadow-card sm:right-6 sm:top-4">+6.000 clientes atendidos</div>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: .7, duration: .7 }}
        className="absolute inset-x-0 bottom-0 z-10 border-t border-ink/10 bg-white/50 backdrop-blur-[2px]"
      >
        <Marquee
          items={['Higienização de sofá', 'Colchões', 'Impermeabilização', 'Tapetes e carpetes', 'Limpeza pós-obra', 'Revitalização de pisos', 'Guarujá · Santos · Bertioga']}
          duration={40}
          className="py-4 text-[12px] font-bold uppercase tracking-[.2em] text-ink/70"
        />
      </motion.div>
    </section>
  );
}

export function WhatsIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`fill-current ${className}`}>
      <path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.373 0 .025 5.35 0 12c0 2.116.553 4.19 1.604 6.022L0 24l6.33-1.596A11.938 11.938 0 0 0 12 24c6.627 0 12-5.373 12-12 0-2.951-1.081-5.67-2.48-7.52zM12 21.5c-1.77 0-3.49-.47-4.998-1.356l-.357-.214-3.75.95.98-3.66-.23-.37A9.5 9.5 0 0 1 2.5 12c0-5.247 4.253-9.5 9.5-9.5 2.54 0 4.9.99 6.693 2.78A9.45 9.45 0 0 1 21.5 12c0 5.247-4.253 9.5-9.5 9.5z" />
      <path d="M17.472 14.382c-.297-.148-1.757-.867-2.03-.967-.273-.099-.472-.148-.672.148-.198.297-.768.967-.94 1.166-.173.199-.347.223-.644.075-.297-.148-1.255-.462-2.39-1.475-.884-.788-1.48-1.761-1.653-2.058-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.199-.298.298-.497.099-.198 0-.373-.05-.52-.05-.148-.672-1.611-.921-2.204-.242-.579-.487-.5-.672-.51l-.57-.01c-.198 0-.52.074-.793.373-.273.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.876 1.213 3.074.149.198 2.095 3.2 5.076 4.487 3.002 1.3 3.24 1.366 3.24 1.366.238.066.467.055.643.033.196-.023 1.757-.718 2.004-1.413.248-.695.248-1.29.173-1.413-.074-.124-.272-.198-.57-.347z" />
    </svg>
  );
}
