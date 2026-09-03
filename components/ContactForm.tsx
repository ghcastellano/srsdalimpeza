'use client';

import { ArrowUpRight, Check } from 'lucide-react';
import { FormEvent, useMemo, useState } from 'react';
import { contact, whatsappUrl, type Line } from '@/lib/content';

const serviceOptions: { label: string; line: Line }[] = [
  { label: 'Higienização de sofá', line: 'upholstery' },
  { label: 'Higienização de colchão', line: 'upholstery' },
  { label: 'Poltronas, cadeiras ou tapetes', line: 'upholstery' },
  { label: 'Estofados de bebê', line: 'upholstery' },
  { label: 'Impermeabilização', line: 'upholstery' },
  { label: 'Limpeza pós-obra', line: 'postWork' },
  { label: 'Revitalização de pisos', line: 'postWork' },
  { label: 'Outro / vários serviços', line: 'upholstery' },
];

export default function ContactForm() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', service: '', city: '', message: '' });

  const line = useMemo<Line>(() => serviceOptions.find((s) => s.label === form.service)?.line ?? 'upholstery', [form.service]);
  const finalMessage = useMemo(
    () => `Olá, Srs da Limpeza! Vim pelo site e quero um orçamento.\n\nNome: ${form.name}\nWhatsApp: ${form.phone}${form.service ? `\nServiço: ${form.service}` : ''}${form.city ? `\nCidade: ${form.city}` : ''}${form.message ? `\n\n${form.message}` : ''}`,
    [form],
  );

  function submit(event: FormEvent) {
    event.preventDefault();
    window.open(whatsappUrl(finalMessage, line), '_blank', 'noopener,noreferrer');
    setSent(true);
  }

  function formatPhone(value: string) {
    const digits = value.replace(/\D/g, '').slice(0, 11);
    if (digits.length <= 2) return digits ? `(${digits}` : '';
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  }

  // 16px até lg: fontes <16px em input fazem o iOS dar zoom no foco.
  const field = 'min-w-0 w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3.5 text-base text-white outline-none transition-colors placeholder:text-white/50 focus:border-sky focus:bg-white/15';
  const label = 'mb-2 block text-sm font-bold text-white/85';

  if (sent) {
    return (
      <div role="status" className="flex min-h-[420px] flex-col items-center justify-center rounded-3xl border border-white/20 p-8 text-center">
        <span className="grid h-16 w-16 place-items-center rounded-full bg-whatsapp text-ink"><Check className="h-7 w-7" /></span>
        <h3 className="mt-6 font-display text-3xl font-semibold text-white">Quase lá{form.name ? `, ${form.name.split(' ')[0]}` : ''}.</h3>
        <p className="mt-3 max-w-sm text-base text-white/80">Abrimos o WhatsApp com sua mensagem pronta. É só tocar em enviar por lá. Não abriu?</p>
        <a href={whatsappUrl(finalMessage, line)} target="_blank" rel="noopener noreferrer" className="mt-7 inline-flex min-h-12 items-center gap-3 rounded-full bg-whatsapp px-6 text-base font-bold text-ink">Abrir conversa <ArrowUpRight className="h-4 w-4" /></a>
        <a href={`mailto:${contact.email}?subject=${encodeURIComponent('Orçamento pelo site — Srs da Limpeza')}&body=${encodeURIComponent(finalMessage)}`} className="mt-4 text-base text-white/80 underline underline-offset-4">Prefere e-mail? Enviar por e-mail</a>
        <button type="button" onClick={() => setSent(false)} className="mt-3 text-base text-white/70 underline underline-offset-4">Enviar outra mensagem</button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="grid gap-5 sm:grid-cols-2">
      <div className="min-w-0">
        <label htmlFor="f-name" className={label}>Nome</label>
        <input id="f-name" required name="name" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={field} placeholder="Seu nome" />
      </div>
      <div className="min-w-0">
        <label htmlFor="f-phone" className={label}>WhatsApp</label>
        <input id="f-phone" required name="phone" inputMode="tel" autoComplete="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: formatPhone(e.target.value) })} className={field} placeholder="(13) 99999-9999" />
      </div>
      <div className="min-w-0">
        <label htmlFor="f-service" className={label}>Serviço</label>
        <select id="f-service" required name="service" value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })} className={`${field} [&>option]:text-ink`}>
          <option value="">Selecione</option>
          {serviceOptions.map((s) => <option key={s.label}>{s.label}</option>)}
        </select>
      </div>
      <div className="min-w-0">
        <label htmlFor="f-city" className={label}>Cidade</label>
        <select id="f-city" name="city" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className={`${field} [&>option]:text-ink`}>
          <option value="">Selecione</option>
          {contact.areas.map((c) => <option key={c}>{c}</option>)}
          <option>Outra</option>
        </select>
      </div>
      <div className="min-w-0 sm:col-span-2">
        <label htmlFor="f-message" className={label}>Conte rapidamente o que precisa (opcional)</label>
        <textarea id="f-message" rows={3} name="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={`${field} resize-none`} placeholder="Ex.: sofá de 3 lugares em suede, com manchas de pet." />
      </div>
      <div className="sm:col-span-2">
        <button type="submit" className="btn-shine group flex min-h-14 w-full items-center justify-between rounded-full bg-whatsapp px-6 text-base font-bold text-ink transition-transform hover:-translate-y-0.5">
          Receber orçamento no WhatsApp <ArrowUpRight className="h-5 w-5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </button>
        <p className="mt-4 text-center text-sm text-white/70">
          Ao enviar, abrimos seu WhatsApp com a mensagem pronta. Nada fica armazenado no site. ·{' '}
          <a href="/politica-de-privacidade" className="underline underline-offset-4 hover:text-sky">Política de privacidade</a>
        </p>
      </div>
    </form>
  );
}
