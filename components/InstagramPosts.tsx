'use client';

import { useEffect, useRef, useState } from 'react';
import { Camera, ArrowUpRight } from 'lucide-react';

const posts = [
  { id: 'DUrNh81kccg', title: 'Aqui a gente se garante', description: 'Higienização de colchão · publicação original', image: '/assets/photos/reel-estofados.webp' },
  { id: 'DV1wBAzEWu8', title: 'Mais um lar transformado', description: 'Limpeza pós-obra · publicação original', image: '/assets/photos/reel-pos-obra.webp' },
];

export default function InstagramPosts() {
  const [loaded, setLoaded] = useState<string[]>([]);
  const frames = useRef<Record<string, HTMLIFrameElement | null>>({});
  const [heights, setHeights] = useState<Record<string, number>>({});
  useEffect(() => {
    const resize = (event: MessageEvent) => {
      if (event.origin !== 'https://www.instagram.com') return;
      const id = posts.find((post) => frames.current[post.id]?.contentWindow === event.source)?.id;
      if (!id) return;
      try {
        const message = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        const height = message?.details?.height;
        if (message?.type === 'MEASURE' && typeof height === 'number' && Number.isFinite(height) && height >= 300 && height <= 2500) {
          setHeights((current) => current[id] === Math.ceil(height) ? current : { ...current, [id]: Math.ceil(height) });
        }
      } catch { /* Ignorar mensagens que não pertencem ao protocolo do embed. */ }
    };
    window.addEventListener('message', resize);
    return () => window.removeEventListener('message', resize);
  }, []);
  return (
    <section aria-labelledby="instagram-heading" className="mt-16 border-t border-ink/10 pt-12">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-aqua-dark">Direto do nosso Instagram</p>
          <h3 id="instagram-heading" className="mt-3 font-display text-2xl font-semibold text-ink sm:text-3xl">Acompanhe @srsdalimpeza</h3>
        </div>
        <a href="https://www.instagram.com/srsdalimpeza/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 font-bold text-aqua-dark">Ver perfil <ArrowUpRight className="h-4 w-4" /></a>
      </div>
      <p className="mt-4 max-w-2xl text-sm text-ink/70">Ao carregar uma publicação, você se conecta ao Instagram, que pode usar cookies conforme sua política de privacidade.</p>
      <div className="mt-8 grid items-start gap-6 md:grid-cols-2">
        {posts.map((post) => (
          <article key={post.id} className="min-w-0 overflow-hidden rounded-3xl border border-ink/10 bg-paper">
            {loaded.includes(post.id) ? (
              <iframe ref={(node) => { frames.current[post.id] = node; }} title={`Instagram da Srs da Limpeza: ${post.title}`} src={`https://www.instagram.com/reel/${post.id}/embed/captioned/`} className="w-full border-0" style={{ height: heights[post.id] ?? 850 }} allow="encrypted-media; fullscreen" referrerPolicy="strict-origin-when-cross-origin" />
            ) : (
              <div className="relative flex min-h-[460px] items-end overflow-hidden bg-ink p-6 sm:min-h-[540px]">
                {/* Prévia local já existente; nenhuma conexão com a Meta antes do clique. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={post.image} alt="" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-60" />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                <div className="relative text-white">
                  <Camera aria-hidden="true" className="mb-4 h-7 w-7" />
                  <h4 className="font-display text-2xl font-semibold">{post.title}</h4>
                  <p className="mt-2 text-sm text-white/85">{post.description}</p>
                  <button type="button" onClick={() => setLoaded((ids) => [...ids, post.id])} className="mt-5 min-h-12 rounded-full bg-white px-6 font-bold text-ink">Carregar publicação do Instagram</button>
                </div>
              </div>
            )}
            <a href={`https://www.instagram.com/reel/${post.id}/`} target="_blank" rel="noopener noreferrer" className="flex min-h-14 items-center justify-between gap-3 px-6 py-3 text-sm font-bold text-aqua-dark">Ver publicação no Instagram <ArrowUpRight className="h-4 w-4 shrink-0" /></a>
          </article>
        ))}
      </div>
    </section>
  );
}
