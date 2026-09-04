'use client';

import Reveal from './ui/Reveal';
import { useScrollProgress } from '@/lib/scrollProgress';

function Step({ step, index, dark }: { step: { title: string; text: string }; index: number; dark: boolean }) {
  return (
    <Reveal delay={index * .05}>
      <div className={`relative grid gap-4 border-b py-7 pl-12 sm:grid-cols-[90px_1fr_1fr] sm:gap-8 sm:py-9 sm:pl-16 ${dark ? 'border-white/20' : 'border-ink/20'}`}>
        <span
          aria-hidden="true"
          className={`absolute left-0 top-8 grid h-8 w-8 place-items-center rounded-full border text-[10px] tabular-nums sm:top-10 ${
            dark ? 'border-aqua/60 bg-ink text-aqua' : 'border-aqua-dark/50 bg-paper text-aqua-dark'
          }`}
        >
          {index + 1}
        </span>
        <span aria-hidden="true" className={`font-display text-4xl leading-[1.34] text-outline sm:text-5xl ${dark ? 'text-aqua/80' : 'text-aqua-dark/80'}`}>
          0{index + 1}
        </span>
        <h3 className="font-display text-2xl leading-[1.34] sm:text-3xl">
          <span className="sr-only">Etapa {index + 1}: </span>{step.title}
        </h3>
        <p className={`text-sm ${dark ? 'text-white/85' : 'text-ink/85'}`}>{step.text}</p>
      </div>
    </Reveal>
  );
}

/**
 * Linha vertical que se desenha conforme o scroll percorre as etapas.
 */
export default function ProcessTimeline({ steps, dark = false }: { steps: { title: string; text: string }[]; dark?: boolean }) {
  // A linha se desenha via scaleY numa variável CSS: sem re-render por frame.
  const root = useScrollProgress((progress) => {
    root.current?.style.setProperty('--draw', String(progress));
  }, .78, .2);

  return (
    <div ref={root as never} className={`relative border-t [--draw:0] ${dark ? 'border-white/20' : 'border-ink/20'}`}>
      <div aria-hidden="true" className={`absolute bottom-0 left-4 top-0 w-px ${dark ? 'bg-white/15' : 'bg-ink/12'}`} />
      <div
        aria-hidden="true"
        style={{ transform: 'scaleY(var(--draw))' }}
        className={`absolute bottom-0 left-4 top-0 w-px origin-top ${dark ? 'bg-aqua' : 'bg-aqua-dark'}`}
      />
      {steps.map((step, index) => (
        <Step key={step.title} step={step} index={index} dark={dark} />
      ))}
    </div>
  );
}
