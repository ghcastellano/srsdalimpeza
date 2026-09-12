'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowUpRight, Mail, Menu, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Wordmark } from './Brand';
import { contact, messages, navLinks, whatsappUrl } from '@/lib/content';
import { useFocusTrap } from '@/lib/useFocusTrap';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('');
  const pathname = usePathname();
  const isHome = pathname === '/';
  // Fora da home as âncoras precisam do prefixo da rota para levar de volta.
  const hrefFor = (href: string) => (isHome ? href : `/${href}`);
  const menuRef = useFocusTrap<HTMLDivElement>(open, () => setOpen(false));

  // Um listener passivo escreve o progresso numa variável CSS; a barra é
  // transform puro. Antes isso vinha do useScroll do framer-motion.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty('--scroll-progress', String(max > 0 ? window.scrollY / max : 0));
      setScrolled(window.scrollY > 40);
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  useEffect(() => {
    if (!isHome) return;
    const nodes = navLinks.map((l) => document.getElementById(l.href.slice(1))).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: [0, .2, .5] },
    );
    nodes.forEach((n) => observer.observe(n));
    return () => observer.disconnect();
  }, [isHome]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          open ? 'bg-transparent' : scrolled ? 'border-b border-ink/10 bg-white shadow-[0_8px_30px_-20px_rgba(6,38,55,.35)]' : 'bg-white'
        }`}
      >
        <div className="container-shell flex h-[72px] items-center justify-between lg:h-[84px]">
          <Link prefetch={false} href={isHome ? '#inicio' : '/'} aria-label="Srs da Limpeza — início" className="relative z-10 flex shrink-0 items-center">
            <Wordmark priority className="h-[58px] w-auto sm:h-[62px] lg:h-[70px]" />
          </Link>

          <nav aria-label="Navegação principal" className="hidden items-center gap-1 text-[15px] font-semibold text-ink/80 xl:flex">
            {navLinks.map((link) => {
              const current = active === link.href;
              return (
                <a
                  key={link.href}
                  href={hrefFor(link.href)}
                  aria-current={current ? 'location' : undefined}
                  className={`group relative rounded-full px-3.5 py-2.5 transition-colors hover:text-ink ${current ? 'text-ink' : ''}`}
                >
                  {link.label}
                  <span className={`absolute inset-x-3.5 bottom-1 h-[2px] rounded-full bg-aqua transition-transform duration-300 ${current ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`} />
                </a>
              );
            })}
            <a
              href={whatsappUrl(messages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-shine ml-3 inline-flex min-h-11 items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[15px] font-bold text-white transition-colors hover:bg-ocean"
            >
              Orçamento grátis <ArrowUpRight className="h-4 w-4" />
            </a>
          </nav>

          <div className="flex items-center gap-2 xl:hidden">
            <a
              href={whatsappUrl(messages.general)}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden min-h-11 items-center rounded-full px-4 text-sm font-bold sm:inline-flex ${open ? 'bg-white/10 text-white' : 'bg-ink text-white'}`}
            >
              Orçamento grátis
            </a>
            <button
              type="button"
              aria-label={open ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-haspopup="dialog"
              onClick={() => setOpen((v) => !v)}
              className={`relative z-10 grid h-11 w-11 place-items-center rounded-full border transition-colors ${open ? 'border-white/40 text-white' : 'border-ink/20 bg-white/60 text-ink'}`}
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-sky via-aqua to-ocean" style={{ transform: 'scaleX(var(--scroll-progress, 0))' }} />
      </header>

      {open && (
          <div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navegação"
            className="fade-in fixed inset-0 z-[45] overflow-y-auto bg-ink pb-[max(28px,calc(env(safe-area-inset-bottom)+16px))] pt-[84px] text-white"
          >
            <div aria-hidden="true" className="dots pointer-events-none absolute inset-0 opacity-30" />
            <div className="container-shell relative flex min-h-full flex-col gap-6">
              <nav aria-label="Menu móvel" className="border-t border-white/15">
                {navLinks.map((link, index) => (
                  <div key={link.href} className="fade-up" style={{ animationDelay: `${.05 + .04 * index}s` }}>
                    <a
                      href={hrefFor(link.href)}
                      onClick={() => setOpen(false)}
                      className="flex min-h-12 items-center justify-between border-b border-white/15 py-3 font-display text-[clamp(1.7rem,6.5vw,2.3rem)] font-semibold transition-colors hover:text-sky"
                    >
                      {link.label}
                      <span className="font-sans text-xs tabular-nums text-white/45">0{index + 1}</span>
                    </a>
                  </div>
                ))}
              </nav>
              <div className="fade-up mt-auto" style={{ animationDelay: '.3s' }}>
                <div role="group" aria-label="Contato rápido" className="border-y border-white/15 py-4">
                  <p className="mb-3 text-xs font-bold uppercase tracking-[.17em] text-sky">Contato rápido</p>
                  <div className="grid grid-cols-1 gap-x-4 gap-y-1 text-base text-white/85 sm:grid-cols-2">
                    <a href={`tel:+${contact.upholsteryDigits}`} className="inline-flex min-h-11 items-center gap-2.5"><Phone className="h-4 w-4 text-sky" />{contact.upholsteryPhone} · Estofados</a>
                    <a href={`tel:+${contact.postWorkDigits}`} className="inline-flex min-h-11 items-center gap-2.5"><Phone className="h-4 w-4 text-sky" />{contact.postWorkPhone} · Pós-obra</a>
                    <a href={`mailto:${contact.email}`} className="inline-flex min-h-11 items-center gap-2.5"><Mail className="h-4 w-4 text-sky" />{contact.email}</a>
                    <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2.5">Instagram {contact.instagramHandle}<ArrowUpRight className="h-4 w-4 text-sky" /></a>
                  </div>
                </div>
                <a href={whatsappUrl(messages.general)} target="_blank" rel="noopener noreferrer" className="mt-4 flex min-h-14 items-center justify-between rounded-full bg-whatsapp px-6 text-base font-bold text-ink">
                  Pedir orçamento no WhatsApp <ArrowUpRight className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
      )}
    </>
  );
}
