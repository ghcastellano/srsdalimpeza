'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

/**
 * Entrada suave ao aparecer na tela.
 *
 * CSS puro + IntersectionObserver, de propósito: a versão anterior usava
 * framer-motion animando `filter: blur()`, que força re-rasterização a cada
 * frame e não vai para a GPU. Com 8 a 11 elementos entrando juntos isso
 * gerava travadas de 60 a 100ms no scroll. Aqui só opacity e transform, que o
 * compositor resolve sozinho — zero JavaScript por frame.
 */
export default function Reveal({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
      setShown(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShown(true);
        observer.disconnect();
      },
      { threshold: .08, rootMargin: '0px 0px -6% 0px' },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? 'is-in' : ''} ${className}`}
      style={delay ? { transitionDelay: `${delay}s` } : undefined}
    >
      {children}
    </div>
  );
}
