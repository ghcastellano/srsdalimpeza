'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * "Luz de água": cáusticas suaves atrás do hero, como o reflexo do sol no
 * fundo de uma piscina. Indireto, sem objeto óbvio.
 *
 * WebGL puro de propósito: isto é um quad de tela cheia com um fragment shader
 * e não precisa de engine 3D (a versão com three.js custava 700KB).
 *
 * Aqui fica só o porteiro: ≥768px, sem prefers-reduced-motion. Só então o
 * motor (shader + loop) é importado — no celular esse arquivo nunca é baixado.
 * Sem GPU real (SwiftShader etc.) cada frame vira tarefa longa, então o motor
 * desiste. ?fx=1 força.
 */
export default function WaterLight({ className = '' }: { className?: string }) {
  const host = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    const forced = new URLSearchParams(window.location.search).has('fx');
    if (!forced && !window.matchMedia('(min-width: 768px) and (prefers-reduced-motion: no-preference)').matches) return;

    let stop: (() => void) | null = null;
    let cancelled = false;
    import('./waterLightGL').then(({ start }) => {
      if (cancelled) return;
      stop = start(el, forced);
      if (stop) setReady(true);
    });

    return () => {
      cancelled = true;
      stop?.();
    };
  }, []);

  return (
    <div
      ref={host}
      data-fx={ready ? 'on' : 'off'}
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 hidden md:block [&>canvas]:h-full [&>canvas]:w-full ${className}`}
    />
  );
}
