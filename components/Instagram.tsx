import Image from 'next/image';
import { ArrowUpRight, Play } from 'lucide-react';
import Reveal from './ui/Reveal';
import { contact, instagramPosts } from '@/lib/content';

function InstagramIcon({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={`fill-none stroke-current ${className}`} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

export default function Instagram() {
  return (
    <div className="mt-12 grid gap-5 lg:mt-16 lg:grid-cols-3 lg:gap-6">
      {instagramPosts.map((post, index) => (
        <Reveal key={post.url} delay={index * .07} className="h-full">
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="view"
            data-cursor-label="Abrir"
            className="group relative flex h-full flex-col overflow-hidden rounded-3xl bg-ink text-white shadow-card"
          >
            <div className="relative aspect-[4/5] overflow-hidden sm:aspect-square">
              <Image src={post.image} alt="" fill quality={80} sizes="(max-width: 1023px) 92vw, 30vw" className="object-cover opacity-90 transition-transform duration-700 group-hover:scale-[1.05]" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent" />
              <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold uppercase tracking-[.14em] backdrop-blur">
                {post.kind.startsWith('Reel') ? <Play className="h-3.5 w-3.5 fill-current" /> : <InstagramIcon className="h-3.5 w-3.5" />}
                {post.kind}
              </span>
            </div>
            <div className="flex flex-1 flex-col p-6 pt-0">
              <p className="text-base leading-7 text-white/85">{post.caption}</p>
              <span className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-sky">
                Ver no Instagram <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </a>
        </Reveal>
      ))}
      <Reveal delay={.2} className="lg:col-span-3">
        <a
          href={contact.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col items-start justify-between gap-4 rounded-3xl border border-ink/10 bg-white p-6 shadow-card transition-colors hover:border-aqua sm:flex-row sm:items-center"
        >
          <span className="flex items-center gap-4">
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] text-white"><InstagramIcon className="h-6 w-6" /></span>
            <span>
              <span className="block font-display text-lg font-semibold text-ink">Siga {contact.instagramHandle}</span>
              <span className="block text-sm text-ink/70">Antes e depois, bastidores e dicas para conservar seus estofados.</span>
            </span>
          </span>
          <span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-bold text-white transition-colors group-hover:bg-ocean">Seguir <ArrowUpRight className="h-4 w-4" /></span>
        </a>
      </Reveal>
    </div>
  );
}
