import type { Metadata } from 'next';
import Link from 'next/link';
import { Wordmark } from '@/components/Brand';
import { contact } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Política de privacidade',
  description: 'Como a Srs da Limpeza trata os dados enviados pelo site.',
  alternates: { canonical: '/politica-de-privacidade' },
};

export default function PrivacyPage() {
  return (
    <main className="bg-paper py-16 text-ink sm:py-24">
      <article className="container-shell max-w-3xl">
        <Link href="/" aria-label="Voltar ao início"><Wordmark className="h-12 w-auto" /></Link>
        <h1 className="display-title mt-10 text-4xl">Política de privacidade</h1>
        <p className="mt-3 text-sm text-ink/70">Última atualização: 2026</p>
        <div className="mt-8 space-y-5 text-base text-ink/85">
          <p>Este site é mantido pela Srs da Limpeza (CNPJ {contact.cnpj}). Ele não possui cadastro, cookies de rastreamento próprios nem banco de dados de visitantes.</p>
          <h2 className="font-display text-2xl font-semibold text-ink">Formulário de contato</h2>
          <p>Os dados digitados no formulário (nome, WhatsApp, serviço, cidade e mensagem) não são enviados nem armazenados por este site. Eles são usados apenas para montar a mensagem que abre no seu próprio aplicativo de WhatsApp. O envio acontece por sua decisão, diretamente pelo WhatsApp.</p>
          <h2 className="font-display text-2xl font-semibold text-ink">Serviços de terceiros</h2>
          <p>A página incorpora um mapa do Google Maps e links para Instagram, Facebook, YouTube e Google. Ao interagir com esses serviços, valem as políticas de privacidade de cada um deles.</p>
          <h2 className="font-display text-2xl font-semibold text-ink">Seus direitos</h2>
          <p>Nos termos da LGPD (Lei 13.709/2018), você pode solicitar informações, correção ou exclusão de dados que tenha compartilhado conosco pelo WhatsApp ou e-mail. Fale com a gente em <a href={`mailto:${contact.email}`} className="underline underline-offset-4">{contact.email}</a>.</p>
        </div>
        <Link href="/" className="mt-10 inline-flex min-h-12 items-center rounded-full bg-ink px-6 font-bold text-white">Voltar ao início</Link>
      </article>
    </main>
  );
}
