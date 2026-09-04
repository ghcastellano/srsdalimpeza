import type { ReactNode } from 'react';

/**
 * Entrada suave ao aparecer na tela.
 *
 * Componente puro: sem hooks, sem estado e sem efeito. Quem observa é um
 * único IntersectionObserver global (RevealObserver), em vez de um por
 * elemento — eram ~40 instâncias e ~40 observers criados na hidratação.
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
  return (
    <div className={`reveal ${className}`} style={delay ? { transitionDelay: `${delay}s` } : undefined}>
      {children}
    </div>
  );
}
