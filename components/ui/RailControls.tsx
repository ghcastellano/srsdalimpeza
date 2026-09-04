'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function RailControls({
  active,
  count,
  progress,
  onMove,
  hint = 'clique para ampliar',
}: {
  active: number;
  count: number;
  progress: number;
  onMove: (direction: -1 | 1) => void;
  hint?: string;
}) {
  return (
    <div className="mt-8 flex items-center gap-4 sm:gap-5 lg:gap-6">
      <p className="w-[60px] shrink-0 text-xs font-bold tabular-nums tracking-[.16em] text-ink/80">
        {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
      </p>
      <div className="h-px flex-1 bg-ink/15">
        <div style={{ transform: `scaleX(${progress})` }} className="h-px origin-left bg-aqua transition-transform duration-300" />
      </div>
      <p className="shrink-0 text-xs font-bold uppercase tracking-[.2em] text-ink/80">
        <span className="lg:hidden">Deslize</span>
        <span className="hidden lg:inline">Arraste · {hint}</span>
      </p>
      <div className="hidden gap-2 lg:flex">
        <button type="button" onClick={() => onMove(-1)} disabled={active === 0} aria-label="Rolar para trás" className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 bg-white text-ink transition-colors hover:border-aqua hover:text-aqua-dark disabled:opacity-30"><ChevronLeft className="h-4 w-4" /></button>
        <button type="button" onClick={() => onMove(1)} disabled={active === count - 1} aria-label="Rolar para frente" className="grid h-11 w-11 place-items-center rounded-full border border-ink/20 bg-white text-ink transition-colors hover:border-aqua hover:text-aqua-dark disabled:opacity-30"><ChevronRight className="h-4 w-4" /></button>
      </div>
    </div>
  );
}
