import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Wordmark } from '@/components/Brand';

export default function NotFound() {
  return (
    <main className="water-bg grid min-h-svh place-items-center px-6 py-20 text-ink">
      <div className="w-full max-w-xl text-center">
        <Wordmark className="mx-auto h-16 w-auto" />
        <p aria-hidden="true" className="text-gradient mt-12 font-display text-[7rem] font-bold leading-none">404</p>
        <h1 className="display-title mt-4 text-3xl">Essa página não existe. Mas o orçamento grátis, sim.</h1>
        <p className="mt-4 text-base text-ink/75">O endereço pode ter mudado. Volte ao início ou fale com a equipe.</p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-ink px-7 font-bold text-white">Voltar ao início</Link>
          <Link href="/#contato" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-ink/20 px-7 font-bold">Pedir orçamento <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </div>
    </main>
  );
}
