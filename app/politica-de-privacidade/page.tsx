import type { Metadata } from 'next';
import Link from 'next/link';
import { Wordmark } from '@/components/Brand';
import { contact } from '@/lib/content';
import { CookieSettings } from '@/components/TrackingConsent';

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
          <p>Este site é mantido pela Srs da Limpeza (CNPJ {contact.cnpj}). Ele não possui cadastro nem banco de dados para armazenar os dados digitados no formulário de orçamento.</p>
          <h2 className="font-display text-2xl font-semibold text-ink">Formulário de contato</h2>
          <p>Os dados digitados no formulário (nome, WhatsApp, serviço, cidade e mensagem) não são recebidos por um servidor de formulários deste site. Ao pedir o orçamento, esses dados são incluídos no endereço que abre o WhatsApp para preparar a mensagem, passando a esse serviço. Você confirma o envio da mensagem no próprio WhatsApp. A opção de e-mail prepara o mesmo conteúdo no seu aplicativo de e-mail.</p>
          <h2 className="font-display text-2xl font-semibold text-ink">Serviços de terceiros</h2>
          <p>A página incorpora um mapa do Google Maps e oferece vídeos do YouTube e publicações do Instagram. As publicações do Instagram se conectam à Meta somente quando você solicita seu carregamento. Esses serviços podem receber dados técnicos, como endereço IP e informações do navegador, conforme suas próprias políticas de privacidade.</p>
          <h2 className="font-display text-2xl font-semibold text-ink">Medição e cookies opcionais</h2>
          <p>No domínio srsdalimpeza.com.br, somente após sua autorização, o Google Tag Manager carrega ferramentas de análise e publicidade do Google para medir visitas, cliques de contato e desempenho de anúncios. Podem ser usados identificadores de cookies e de campanhas. Os eventos de contato criados por este site não incluem nome, telefone pessoal ou mensagem digitada no formulário. A configuração das ferramentas do Google é administrada pela empresa.</p>
          <p>Sua escolha é salva neste navegador para não perguntar a cada página. Recusar não impede o orçamento. Você pode rever sua escolha abaixo; ao revogar, o site interrompe o carregamento da medição e remove os cookies de medição conhecidos que consegue acessar.</p>
          <CookieSettings />
          <h2 className="font-display text-2xl font-semibold text-ink">Seus direitos</h2>
          <p>Nos termos da LGPD (Lei 13.709/2018), você pode solicitar informações, correção ou exclusão de dados que tenha compartilhado conosco pelo WhatsApp ou e-mail. Fale com a gente em <a href={`mailto:${contact.email}`} className="underline underline-offset-4">{contact.email}</a>.</p>
        </div>
        <Link href="/" className="mt-10 inline-flex min-h-12 items-center rounded-full bg-ink px-6 font-bold text-white">Voltar ao início</Link>
      </article>
    </main>
  );
}
