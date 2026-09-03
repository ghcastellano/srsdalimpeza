'use client';

import { animate, useInView, useReducedMotion } from 'framer-motion';
import { useEffect, useRef } from 'react';

export default function Counter({
  value,
  className = '',
  duration = 1.8,
}: {
  value: number;
  className?: string;
  duration?: number;
}) {
  const node = useRef<HTMLSpanElement>(null);
  const inView = useInView(node, { once: true, margin: '-10% 0px' });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!node.current) return;
    if (!inView) return;
    if (reduced) {
      node.current.textContent = String(value);
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        if (node.current) node.current.textContent = String(Math.round(latest));
      },
    });
    return () => controls.stop();
  }, [inView, reduced, value, duration]);

  return <span ref={node} className={`tabular-nums ${className}`}>0</span>;
}
