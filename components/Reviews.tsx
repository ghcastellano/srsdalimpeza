import { Star } from 'lucide-react';
import Reveal from './ui/Reveal';
import { contact, reviews } from '@/lib/content';

function Stars() {
  return (
    <span role="img" aria-label="5 de 5 estrelas" className="flex gap-0.5 text-[#f5b400]">
      {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="h-4 w-4 fill-current" aria-hidden="true" />)}
    </span>
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
          className="inline-flex flex-wrap items-center gap-x-4 gap-y-2 rounded-2xl bg-white p-4 pr-6 shadow-card ring-1 ring-ink/5 transition-shadow hover:shadow-glow"
        >
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-mist font-display text-xl font-bold text-aqua-dark">G</span>
          <span>
            <span className="flex items-center gap-2 text-sm font-extrabold text-ink">Excelente <Stars /></span>
            <span className="block text-[13px] text-ink/70">Com base em 73 avaliações publicadas no Google · ver todas</span>
          </span>
        </a>
      </Reveal>
      <div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3 [&>*]:mb-5 [&>*]:break-inside-avoid">
        {reviews.map((review, index) => (
          <Reveal key={review.name} delay={(index % 3) * .06}>
            <figure className="rounded-3xl bg-white p-6 shadow-card ring-1 ring-ink/5">
              <Stars />
              <blockquote className="mt-4 text-base leading-7 text-ink/85">“{review.text}”</blockquote>
              <figcaption className="mt-5 flex items-center gap-3">
                <span aria-hidden="true" className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-sky to-aqua text-sm font-bold text-ink">
                  {review.name.split(' ').map((p) => p[0]).slice(0, 2).join('')}
                </span>
                <span>
                  <span className="block text-sm font-bold text-ink">{review.name}</span>
                  <span className="block text-[13px] text-ink/70">{review.service} · {review.date}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
