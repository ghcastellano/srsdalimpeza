import Image from 'next/image';
import Link from 'next/link';
import { ArrowUpRight, BadgeCheck, Check } from 'lucide-react';
import Accordion from './Accordion';
import ContactForm from './ContactForm';
import Footer from './Footer';
import Header from './Header';
import PhotoGrid from './PhotoGrid';
import ProcessTimeline from './ProcessTimeline';
import Reviews from './Reviews';
import SectionHeading from './SectionHeading';
import WhatsAppFab from './WhatsAppFab';
import Reveal from './ui/Reveal';
import { contact, fullAddress, siteUrl, whatsappUrl, type GalleryItem, type Line } from '@/lib/content';

export type ServicePageContent = {
  slug: string;
  line: Line;
  /** Palavra-chave principal, usada no h1 e no schema. */
  h1: string;
  eyebrow: string;
  intro: string;
  hero: { src: string; alt: string };
  message: string;
  /** Blocos de texto próprios da página — nunca repetidos da home. */
  sections: { title: string; body: string[] }[];
  includes: { title: string; text: string }[];
  steps: { title: string; text: string }[];
  gallery: GalleryItem[];
  faq: { q: string; a: string }[];
  serviceName: string;
  serviceDescription: string;
};

export default function ServicePage({ content }: { content: ServicePageContent }) {
  const url = `${siteUrl}/${content.slug}`;
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Service',
        '@id': `${url}#service`,
        name: content.serviceName,
        description: content.serviceDescription,
        serviceType: content.serviceName,
        provider: { '@id': `${siteUrl}/#business` },
        areaServed: contact.areas.map((name) => ({ '@type': 'City', name })),
        url,
        offers: { '@type': 'Offer', availability: 'https://schema.org/InStock', priceCurrency: 'BRL' },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: siteUrl },
          { '@type': 'ListItem', position: 2, name: content.serviceName, item: url },
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: content.faq.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };

  return (
    <>
      <a href="#main" className="skip-link">Ir para o conteúdo</a>
      <Header />
      <main id="main" className="relative">
        <section className="hero-menu-bg relative overflow-hidden pt-[104px] lg:pt-[132px]">
          <div className="container-shell relative grid items-center gap-10 pb-16 lg:grid-cols-12 lg:gap-12 lg:pb-24">
            <div className="lg:col-span-6">
              <nav aria-label="Trilha de navegação" className="mb-6 text-sm text-ink/70">
                <Link href="/" className="border-b border-transparent transition-colors hover:border-aqua hover:text-ink">Início</Link>
                <span className="px-2" aria-hidden="true">/</span>
                <span className="font-semibold text-ink">{content.serviceName}</span>
              </nav>
              <h1 className="display-title text-[clamp(2.2rem,5.6vw,4.2rem)] text-ink">
                <span className="eyebrow mb-5 block font-sans text-aqua-dark">{content.eyebrow}</span>
                {content.h1}
              </h1>
              <p className="mt-6 max-w-xl text-lg text-ink/80">{content.intro}</p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  href={whatsappUrl(content.message, content.line)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-shine group inline-flex min-h-14 items-center justify-center gap-3 rounded-full bg-whatsapp px-8 text-base font-bold text-ink shadow-[0_18px_40px_-16px_rgba(37,211,102,.7)] transition-transform duration-300 hover:-translate-y-0.5"
                >
                  Pedir orçamento grátis
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <a href="#contato" className="inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-ink/15 bg-white/80 px-7 text-base font-bold text-ink transition-colors hover:border-aqua hover:text-aqua-dark">
                  Falar com a equipe
                </a>
              </div>
              <p className="mt-6 text-sm text-ink/70">
                Nota <strong className="text-ink">{String(contact.rating).replace('.', ',')}</strong> no Google · {contact.reviewCount} avaliações · atendimento em {contact.areas.join(', ')}
              </p>
            </div>
            <Reveal delay={.1} className="lg:col-span-6">
              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-[0_40px_90px_-30px_rgba(6,38,55,.45)]">
                <Image src={content.hero.src} alt={content.hero.alt} fill priority quality={84} sizes="(max-width: 1023px) 92vw, 46vw" className="object-cover" />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <div className="container-shell grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              {content.sections.map((block, index) => (
                <Reveal key={block.title} delay={index * .06} className={index > 0 ? 'mt-12 block' : 'block'}>
                  <h2 className="display-title text-[clamp(1.7rem,3.4vw,2.6rem)] text-ink">{block.title}</h2>
                  {block.body.map((paragraph) => (
                    <p key={paragraph.slice(0, 24)} className="mt-4 text-base text-ink/80">{paragraph}</p>
                  ))}
                </Reveal>
              ))}
            </div>
            <div className="lg:col-span-5">
              <Reveal>
                <div className="rounded-3xl border border-ink/10 bg-paper p-7">
                  <h2 className="font-display text-xl font-semibold text-ink">O que está incluído</h2>
                  <ul className="mt-5 grid gap-4">
                    {content.includes.map((item) => (
                      <li key={item.title} className="flex gap-3">
                        <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-aqua/15 text-aqua-dark"><Check className="h-3.5 w-3.5" /></span>
                        <span>
                          <strong className="block text-sm font-bold text-ink">{item.title}</strong>
                          <span className="block text-sm text-ink/75">{item.text}</span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <a href={whatsappUrl(content.message, content.line)} target="_blank" rel="noopener noreferrer" className="mt-7 flex min-h-[52px] items-center justify-between rounded-full bg-ink px-6 py-4 text-sm font-bold text-white transition-colors hover:bg-ocean">
                    Pedir orçamento <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section className="bg-paper py-20 sm:py-24">
          <div className="container-shell grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Como funciona" title={<>Do primeiro contato à <span className="text-gradient">entrega final.</span></>} />
            </div>
            <div className="lg:col-span-7"><ProcessTimeline steps={content.steps} /></div>
          </div>
        </section>

        <section className="bg-white py-20 sm:py-24">
          <div className="container-shell">
            <SectionHeading eyebrow="Resultados" title={<>Fotos de serviços <span className="text-gradient">executados pela equipe.</span></>} text="Clique em qualquer foto para ampliar." />
            <PhotoGrid items={content.gallery} className="mt-10 grid grid-cols-2 gap-4 lg:grid-cols-4" sizes="(max-width: 1023px) 45vw, 22vw" />
          </div>
        </section>

        <section className="bg-mist py-20 sm:py-24">
          <div className="container-shell">
            <SectionHeading eyebrow="Avaliações no Google" title={<>Quem contrata, <span className="text-gradient">recomenda.</span></>} />
            <Reviews />
          </div>
        </section>

        <section className="bg-paper py-20 sm:py-24">
          <div className="container-shell grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4"><SectionHeading eyebrow="Dúvidas frequentes" title="Perguntas que recebemos toda semana." /></div>
            <div className="lg:col-span-8"><Reveal><Accordion items={content.faq} /></Reveal></div>
          </div>
        </section>

        <section id="contato" className="relative overflow-hidden bg-ocean py-20 text-white sm:py-24">
          <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-0 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(127,217,234,.30)_0%,rgba(127,217,234,.10)_45%,transparent_70%)]" />
          <div className="container-shell relative grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading dark eyebrow="Fale conosco" title="Peça seu orçamento gratuito." text="Respondemos em minutos, de segunda a sexta, das 8h às 18h." />
              <Reveal delay={.12}>
                <div className="mt-8 rounded-3xl border border-white/15 bg-white/[.12] p-5">
                  <p className="text-xs font-bold uppercase tracking-[.16em] text-sky">Onde estamos</p>
                  <address className="mt-2 not-italic leading-7 text-white/90">{fullAddress}</address>
                  <a href={contact.googleMaps} target="_blank" rel="noopener noreferrer" className="mt-2 inline-flex min-h-11 items-center gap-2 font-bold text-sky underline underline-offset-4">
                    Ver no Google Maps <ArrowUpRight className="h-4 w-4" />
                  </a>
                </div>
              </Reveal>
              <Reveal delay={.16}>
                <ul className="mt-6 grid gap-2.5">
                  {contact.areas.map((city) => (
                    <li key={city} className="flex items-center gap-2.5 text-sm text-white/85"><BadgeCheck className="h-4 w-4 shrink-0 text-sky" />Atendimento em domicílio em {city}</li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <div className="lg:col-span-7"><Reveal delay={.1}><ContactForm /></Reveal></div>
          </div>
        </section>
        <WhatsAppFab />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
    </>
  );
}
