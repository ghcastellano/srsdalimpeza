'use client';

import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion';
import { useRef } from 'react';

function Word({ word, progress, range, floor }: { word: string; progress: MotionValue<number>; range: [number, number]; floor: number }) {
  const opacity = useTransform(progress, range, [floor, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {word}{' '}
    </motion.span>
  );
}

/**
 * Texto que "acende" palavra a palavra conforme o scroll — ligado direto ao
 * progresso (MotionValues), sem re-render por frame. O texto integral fica em
 * um span sr-only (leitores de tela); as palavras animadas são aria-hidden.
 * Os pisos de opacidade preservam contraste WCAG AA no estado de descanso.
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
  const root = useRef<HTMLParagraphElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: root, offset: ['start 0.92', 'start 0.36'] });
  const words = text.split(' ');
  const floor = dark ? .55 : .62;

  if (reduced) {
    return <Tag ref={root as never} className={className}>{text}</Tag>;
  }

  return (
    <Tag ref={root as never} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((word, index) => (
          <Word
            key={`${word}-${index}`}
            word={word}
            progress={scrollYProgress}
            range={[index / words.length, Math.min(1, (index + 1) / words.length + .08)]}
            floor={floor}
          />
        ))}
      </span>
    </Tag>
  );
}
