import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { Wordmark } from './Brand';
import { contact, messages, navLinks, whatsappUrl } from '@/lib/content';

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-ink text-white">
      <div aria-hidden="true" className="h-1 bg-gradient-to-r from-sky via-aqua to-ocean" />
      <div aria-hidden="true" className="dots pointer-events-none absolute inset-0 opacity-20" />
      <div className="container-shell relative py-14 lg:py-20">
        <div className="grid gap-10 border-b border-white/15 pb-12 lg:grid-cols-[1.2fr_.8fr] lg:items-end">
          <div>
            <p className="eyebrow text-sky">Pronto para transformar seus estofados?</p>
            <h2 className="display-title mt-5 max-w-3xl text-[clamp(2rem,4.8vw,3.8rem)]">Fale agora e receba seu orçamento em minutos.</h2>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <a href={whatsappUrl(messages.upholstery)} target="_blank" rel="noopener noreferrer" className="group flex min-h-14 items-center justify-between gap-4 rounded-full bg-whatsapp px-6 text-base font-bold text-ink">
              Estofados <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href={whatsappUrl(messages.postWork, 'postWork')} target="_blank" rel="noopener noreferrer" className="group flex min-h-14 items-center justify-between gap-4 rounded-full border border-white/30 px-6 text-base font-bold transition-colors hover:border-sky hover:text-sky">
              Pós-obra e pisos <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>

        <div className="grid gap-10 pt-10 sm:grid-cols-2 lg:grid-cols-[1.3fr_.7fr_1fr_1fr] lg:pt-12">
          <div>
            <Wordmark white className="h-14 w-auto" />
            <p className="mt-6 max-w-sm text-base text-white/80">Especialistas em higienização e impermeabilização de estofados, limpeza pós-obra e revitalização de pisos. Cuidamos do que é importante para você.</p>
            <p className="mt-4 text-sm text-white/60">CNPJ {contact.cnpj}</p>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-sky">Serviços</p>
            <div className="mt-4 flex flex-col gap-0.5 text-base text-white/85">
              <Link href="/higienizacao-de-sofa-guaruja" className="flex min-h-11 w-fit items-center border-b border-transparent transition-colors hover:border-sky hover:text-white">Higienização de sofá</Link>
              <Link href="/limpeza-pos-obra-santos" className="flex min-h-11 w-fit items-center border-b border-transparent transition-colors hover:border-sky hover:text-white">Limpeza pós-obra</Link>
              {navLinks.slice(0, 4).map((link) => <Link key={link.href} href={`/${link.href}`} className="flex min-h-11 w-fit items-center border-b border-transparent transition-colors hover:border-sky hover:text-white">{link.label}</Link>)}
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-sky">Contato</p>
            <div className="mt-4 flex flex-col gap-0.5 text-base text-white/85">
              <a href={whatsappUrl(messages.upholstery)} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center">Estofados: {contact.upholsteryPhone}</a>
              <a href={whatsappUrl(messages.postWork, 'postWork')} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center">Pós-obra: {contact.postWorkPhone}</a>
              <a href={`mailto:${contact.email}`} className="flex min-h-11 items-center break-all">{contact.email}</a>
              <span className="flex min-h-11 items-center">{contact.hours}</span>
            </div>
          </div>
          <div>
            <p className="text-xs font-bold uppercase tracking-[.2em] text-sky">Social e região</p>
            <div className="mt-4 flex flex-col gap-0.5 text-base text-white/85">
              <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center">Instagram</a>
              <a href={contact.facebook} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center">Facebook</a>
              <a href={contact.youtube} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center">YouTube</a>
              <a href={contact.googleMaps} target="_blank" rel="noopener noreferrer" className="flex min-h-11 items-center">Google · {contact.reviewCount} avaliações</a>
              <address className="not-italic pt-2 text-sm leading-6 text-white/70">
                {contact.street}<br />
                {contact.district} · {contact.city} — {contact.state}<br />
                CEP {contact.zip}
              </address>
              <span className="pt-1 text-sm text-white/70">Atendemos {contact.areas.join(' · ')}</span>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/15 pt-6 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Srs da Limpeza · Todos os direitos reservados</p>
          <Link href="/politica-de-privacidade" className="flex min-h-11 w-fit items-center border-b border-transparent transition-colors hover:border-sky hover:text-white">Política de privacidade</Link>
        </div>
      </div>
    </footer>
  );
}
