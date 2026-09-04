'use client';

import { useScrollProgress } from '@/lib/scrollProgress';

/**
 * Texto que "acende" da esquerda para a direita conforme o scroll.
 *
 * Um único elemento com máscara de gradiente, em vez de um <span> por palavra
 * (eram ~24 nós de DOM a mais) e sem framer-motion. O progresso entra como
 * variável CSS, então nada re-renderiza por frame.
 */
export default function WordReveal({
  text,
  className = '',
  as: Tag = 'p',
  dark = false,
}: {
  text: string;
  className?: string;
  as?: 'p' | 'h2' | 'h3';
  dark?: boolean;
}) {
  const ref = useScrollProgress((progress) => {
    ref.current?.style.setProperty('--reveal', `${progress * 100}%`);
  }, .92, .36);

  return (
    <Tag ref={ref as never} data-dark={dark || undefined} className={`word-reveal ${className}`}>
      {text}
    </Tag>
  );
}
