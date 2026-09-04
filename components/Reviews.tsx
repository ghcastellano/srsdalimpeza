import Image from 'next/image';
import { ArrowUpRight, Star } from 'lucide-react';
import Reveal from './ui/Reveal';
import { contact, reviews } from '@/lib/content';

function Stars({ className = '' }: { className?: string }) {
  return (
    <span role="img" aria-label="5 de 5 estrelas" className={`flex gap-0.5 text-[#f5b400] ${className}`}>
      {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />)}
    </span>
  );
}

/** Marca do Google, para deixar claro que as avaliações são de lá. */
function GoogleMark({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-2.8-.4-4H24v7.3h12.1c-.2 2-1.6 5-4.5 7l-.1.3 6.5 5 .5.1c4.1-3.8 6.6-9.4 6.6-15.7z" />
      <path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.3l-6.9-5.4c-1.9 1.3-4.4 2.2-7.6 2.2-5.8 0-10.7-3.8-12.5-9.1l-.3.1-6.7 5.2-.1.3C8 41.6 15.4 46 24 46z" />
      <path fill="#FBBC05" d="M11.5 28.4c-.5-1.4-.7-2.9-.7-4.4s.3-3 .7-4.4v-.3l-6.8-5.3-.2.1A22 22 0 0 0 2 24c0 3.5.9 6.9 2.5 9.9l7-5.5z" />
      <path fill="#EB4335" d="M24 10.5c4.1 0 6.9 1.8 8.5 3.3l6.2-6C34.9 4.3 29.9 2 24 2 15.4 2 8 6.4 4.5 14.1l7 5.5c1.8-5.3 6.7-9.1 12.5-9.1z" />
    </svg>
  );
}

export default function Reviews() {
  return (
    <div className="mt-12 lg:mt-16">
      <Reveal>
        <a
          href={contact.googleShare}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex flex-wrap items-center gap-x-5 gap-y-3 rounded-2xl bg-white p-4 pr-6 shadow-card ring-1 ring-ink/5 transition-shadow hover:shadow-glow"
        >
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-mist"><GoogleMark className="h-6 w-6" /></span>
          <span>
            <span className="flex items-center gap-2 text-base font-extrabold text-ink">Excelente <Stars /></span>
            <span className="block text-sm text-ink/70">Nota {String(contact.rating).replace('.', ',')} de 5, com base em {contact.reviewCount} avaliações publicadas no Google</span>
          </span>
          <span className="inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 text-sm font-bold text-white transition-colors group-hover:bg-ocean">
            Ver todas <ArrowUpRight className="h-4 w-4" />
          </span>
        </a>
      </Reveal>

      <div className="mt-8 grid items-start gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((review, index) => (
          <Reveal key={review.name} delay={(index % 3) * .06}>
            <figure className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-ink/5">
              <div className="flex items-center justify-between gap-3">
                <Stars />
                <GoogleMark className="h-4 w-4 shrink-0 opacity-70" />
              </div>
              <blockquote className="mt-4 text-base leading-7 text-ink/85">“{review.text}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                {review.avatar ? (
                  <Image src={review.avatar} alt="" data-decorative width={40} height={40} className="h-10 w-10 shrink-0 rounded-full object-cover" />
                ) : (
                  <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-sky to-aqua text-sm font-bold text-ink">
                    {review.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                  </span>
                )}
                <span className="min-w-0">
                  <span className="block truncate text-sm font-bold text-ink">{review.name}</span>
                  <span className="block text-[13px] text-ink/70">
                    {review.service} · <time dateTime={review.iso}>{review.date}</time>
                  </span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
