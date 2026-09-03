import Image from 'next/image';
import { ArrowUpRight, BadgeCheck, Bug, Droplets, Leaf, ShieldCheck, Sparkles, Users, Wind } from 'lucide-react';
import Accordion from '@/components/Accordion';
import { BrandLockup } from '@/components/Brand';
import ContactForm from '@/components/ContactForm';
import Counter from '@/components/fx/Counter';
import Marquee from '@/components/fx/Marquee';
import WordReveal from '@/components/fx/WordReveal';
import Footer from '@/components/Footer';
import Gallery from '@/components/Gallery';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Instagram from '@/components/Instagram';
import ProcessTimeline from '@/components/ProcessTimeline';
import Reviews from '@/components/Reviews';
import SectionHeading from '@/components/SectionHeading';
import Services from '@/components/Services';
import WhatsAppFab from '@/components/WhatsAppFab';
import ParallaxImage from '@/components/ui/ParallaxImage';
import Reveal from '@/components/ui/Reveal';
import { benefits, contact, faq, messages, postWorkClients, postWorkGallery, postWorkScope, process, siteUrl, whatsappUrl } from '@/lib/content';

const benefitIcons = [ShieldCheck, Wind, Leaf, Sparkles, Users, BadgeCheck];

export default function HomePage() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Srs da Limpeza',
    url: siteUrl,
    email: contact.email,
    telephone: `+${contact.upholsteryDigits}`,
    image: `${siteUrl}/opengraph-image`,
    logo: `${siteUrl}/assets/brand/icon-512.png`,
    foundingDate: '2018',
    sameAs: [contact.instagram, contact.facebook, contact.youtube, contact.googleMaps],
    address: { '@type': 'PostalAddress', addressLocality: 'Guarujá', addressRegion: 'SP', addressCountry: 'BR' },
    areaServed: contact.areas.map((name) => ({ '@type': 'City', name })),
    openingHours: 'Mo-Fr 08:00-18:00',
    priceRange: '$$',
    aggregateRating: { '@type': 'AggregateRating', ratingValue: '5', reviewCount: '73' },
    makesOffer: ['Higienização de sofá', 'Higienização de colchão', 'Impermeabilização de estofados', 'Limpeza pós-obra', 'Revitalização de pisos'].map((name) => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name } })),
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faq.map((item) => ({ '@type': 'Question', name: item.q, acceptedAnswer: { '@type': 'Answer', text: item.a } })),
  };

  return (
    <>
      <a href="#main" className="skip-link">Ir para o conteúdo</a>
      <Header />
      <main id="main" className="relative">
        <Hero />

        {/* Prova social numérica */}
        <section aria-label="Números da Srs da Limpeza" className="border-b border-ink/10 bg-white">
          <div className="container-shell grid grid-cols-2 divide-ink/10 py-10 sm:py-12 lg:grid-cols-4 lg:divide-x">
            {[
              { value: 6000, prefix: '+', label: 'clientes atendidos', note: 'Baixada Santista e São Paulo' },
              { value: 73, prefix: '', label: 'avaliações no Google', note: 'todas com 5 estrelas' },
              { value: 8, prefix: '', label: 'serviços especializados', note: 'estofados, pós-obra e pisos' },
              { value: 5, prefix: '', label: 'cidades atendidas', note: 'Guarujá, Santos, Bertioga e mais' },
            ].map((item, index) => (
              <Reveal key={item.label} delay={index * .06} className="px-2 py-4 sm:px-6">
                <p className="font-display text-4xl font-semibold text-ink sm:text-5xl">
                  {item.prefix}<Counter value={item.value} />
                </p>
                <p className="mt-2 text-sm font-bold text-ink">{item.label}</p>
                <p className="text-[13px] text-ink/70">{item.note}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Problema → solução */}
        <section className="noise relative overflow-hidden bg-ink py-20 text-white sm:py-24 lg:py-32">
          <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[520px] w-[520px] rounded-full bg-aqua/25 blur-[120px]" />
          <div aria-hidden="true" className="pointer-events-none absolute -bottom-40 -left-40 h-[420px] w-[420px] rounded-full bg-sky/20 blur-[120px]" />
          <div className="container-shell relative grid gap-12 lg:grid-cols-12 lg:items-center">
            <div className="lg:col-span-7">
              <Reveal><p className="eyebrow text-sky">O que você não vê no seu sofá</p></Reveal>
              <WordReveal
                as="h2"
                dark
                text="Ácaros, fungos e bactérias se acumulam onde sua família descansa todos os dias. A gente tira tudo isso e devolve o cheiro de novo."
                className="display-title mt-6 text-[clamp(1.9rem,4.4vw,3.6rem)]"
              />
            </div>
            <div className="grid gap-4 lg:col-span-5">
              {[
                { icon: Bug, title: 'Ácaros', text: 'Principal causa de rinite, asma e alergias respiratórias dentro de casa.' },
                { icon: Droplets, title: 'Fungos e mofo', text: 'Umidade do litoral gera pontinhos escuros, odor e manchas difíceis.' },
                { icon: ShieldCheck, title: 'Bactérias', text: 'Suor, restos de comida e pets: risco real para crianças e idosos.' },
              ].map(({ icon: Icon, title, text }, index) => (
                <Reveal key={title} delay={index * .08}>
                  <div className="flex gap-4 rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-sky/15 text-sky"><Icon className="h-5 w-5" /></span>
                    <div>
                      <h3 className="font-display text-lg font-semibold">{title}</h3>
                      <p className="mt-1 text-sm text-white/75">{text}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Serviços */}
        <section id="servicos" className="bg-paper py-20 sm:py-24 lg:py-32">
          <div className="container-shell">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8">
                <SectionHeading eyebrow="Nossos serviços" title={<>Soluções completas em higienização <span className="text-gradient">para sua casa ou empresa.</span></>} text="Cada serviço é executado em várias etapas, com equipamentos profissionais e produtos biodegradáveis. Toque em um serviço para pedir orçamento." />
              </div>
              <Reveal delay={.1} className="lg:col-span-3 lg:col-start-10 lg:pb-2">
                <p className="text-sm text-ink/70">Atendimento em domicílio em <strong className="text-ink">{contact.areas.join(', ')}</strong>.</p>
              </Reveal>
            </div>
            <Services />
          </div>
        </section>

        {/* Faixa de marca */}
        <div className="bg-gradient-to-r from-ocean via-aqua to-sky py-4 text-white">
          <Marquee items={['Secagem rápida', 'Produtos biodegradáveis', 'Seguro para pets e crianças', 'Orçamento grátis', 'Até 3x sem juros', 'Excelente no Google']} duration={44} className="font-display text-xl font-semibold sm:text-2xl" />
        </div>

        {/* Como funciona */}
        <section id="como-funciona" className="bg-white py-20 sm:py-24 lg:py-32">
          <div className="container-shell grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading eyebrow="Como funciona" title={<>Simples, rápido e <span className="text-gradient">sem complicação.</span></>} text="Em 4 passos seus estofados ficam como novos. Você só precisa mandar uma mensagem." />
              <Reveal delay={.15}>
                <a href={whatsappUrl(messages.general)} target="_blank" rel="noopener noreferrer" className="btn-shine mt-8 inline-flex min-h-[52px] items-center gap-3 rounded-full bg-ink px-7 py-4 text-base font-bold text-white transition-colors hover:bg-ocean">
                  Começar pelo WhatsApp <ArrowUpRight className="h-4 w-4" />
                </a>
              </Reveal>
              <Reveal delay={.2}>
                <div className="relative mt-12 hidden aspect-[4/3] overflow-hidden rounded-3xl lg:block">
                  <Image src="/assets/photos/sofa-1.webp" alt="Profissional da Srs da Limpeza higienizando um sofá com extratora" fill quality={80} sizes="40vw" className="object-cover" />
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <ProcessTimeline steps={process} />
            </div>
          </div>
        </section>

        {/* Resultados */}
        <section id="resultados" className="water-bg overflow-clip py-20 sm:py-24 lg:py-32">
          <div className="container-shell">
            <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
              <div className="lg:col-span-8"><SectionHeading eyebrow="Resultados reais" title={<>Veja a diferença que uma <span className="text-gradient">higienização profissional</span> faz.</>} text="Sofás, colchões, poltronas, tapetes e cadeiras entregues pela nossa equipe em Guarujá, Santos e Bertioga." /></div>
              <p className="text-xs font-bold uppercase tracking-[.17em] text-ink/70 lg:col-span-3 lg:col-start-10 lg:pb-2">Galeria · arraste para ver</p>
            </div>
            <Gallery />
          </div>
        </section>

        {/* Benefícios */}
        <section id="diferenciais" className="bg-white py-20 sm:py-24 lg:py-32">
          <div className="container-shell">
            <SectionHeading align="center" eyebrow="Por que escolher a Srs da Limpeza" title={<>Muito mais do que <span className="text-gradient">uma limpeza comum.</span></>} text="Um serviço completo que cuida da saúde da sua família e da durabilidade dos seus móveis." />
            <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
              {benefits.map((item, index) => {
                const Icon = benefitIcons[index];
                return (
                  <Reveal key={item.title} delay={(index % 3) * .07} className="h-full">
                    <div className="group h-full rounded-3xl border border-ink/8 bg-paper p-7 transition-all duration-500 hover:-translate-y-1 hover:border-aqua/40 hover:shadow-glow">
                      <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-sky/50 to-aqua/30 text-aqua-dark transition-colors group-hover:from-aqua group-hover:to-ocean group-hover:text-white"><Icon className="h-5 w-5" /></span>
                      <h3 className="mt-5 font-display text-xl font-semibold text-ink">{item.title}</h3>
                      <p className="mt-2 text-sm text-ink/70">{item.text}</p>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        {/* Avaliações */}
        <section id="avaliacoes" className="bg-mist py-20 sm:py-24 lg:py-32">
          <div className="container-shell">
            <SectionHeading eyebrow="Avaliações no Google" title={<>Quem contrata, <span className="text-gradient">recomenda.</span></>} text="Depoimentos reais publicados no Google por clientes de Guarujá, Santos e Bertioga." />
            <Reviews />
          </div>
        </section>

        {/* Pós-obra */}
        <section id="pos-obra" className="relative overflow-hidden bg-ink py-20 text-white sm:py-24 lg:py-32">
          <div className="container-shell grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <SectionHeading dark eyebrow="Limpeza pós-obra e pisos" title={<>Terminou a obra? <span className="text-sky">Entregamos o imóvel pronto para morar.</span></>} text="Referência em limpeza pós-obra na Baixada Santista. Removemos poeira, cimento, gesso, tinta e rejunte sem danificar as superfícies novas, com equipe supervisionada do começo ao fim." />
              <Reveal delay={.12}>
                <ul className="mt-8 grid gap-2.5 sm:grid-cols-2">
                  {postWorkScope.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-white/85"><BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-sky" />{item}</li>
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={.16}>
                <p className="mt-8 text-xs font-bold uppercase tracking-[.17em] text-sky">Atendemos</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {postWorkClients.map((c) => <span key={c} className="rounded-full border border-white/20 px-3 py-1.5 text-sm text-white/85">{c}</span>)}
                </div>
              </Reveal>
              <Reveal delay={.2}>
                <a href={whatsappUrl(messages.postWork, 'postWork')} target="_blank" rel="noopener noreferrer" className="btn-shine mt-9 inline-flex min-h-14 items-center gap-3 rounded-full bg-whatsapp px-7 text-base font-bold text-ink">
                  Agendar visita técnica grátis <ArrowUpRight className="h-4 w-4" />
                </a>
              </Reveal>
            </div>
            <div className="lg:col-span-6">
              <Reveal>
                <ParallaxImage src="/assets/photos/pos-obra-hero.webp" alt="Profissional aspirando o piso de um imóvel recém-construído" sizes="(max-width: 1023px) 92vw, 46vw" quality={80} className="aspect-[4/3] w-full rounded-3xl" imageClassName="object-cover" />
              </Reveal>
              <div className="mt-5 grid grid-cols-4 gap-3">
                {postWorkGallery.map((item, index) => (
                  <Reveal key={item.src} delay={index * .06}>
                    <div className="relative aspect-[3/4] overflow-hidden rounded-2xl">
                      <Image src={item.src} alt={item.alt} fill quality={78} sizes="(max-width: 1023px) 22vw, 11vw" className="object-cover" />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Sobre */}
        <section id="sobre" className="bg-paper py-20 sm:py-24 lg:py-32">
          <div className="container-shell grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <Reveal>
                <div className="relative mx-auto max-w-[420px] px-10 py-12">
                  <BrandLockup />
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <SectionHeading eyebrow="Quem somos" title={<>Paixão por limpeza e <span className="text-gradient">cuidado com o que é seu.</span></>} />
              <Reveal delay={.12}>
                <div className="mt-6 space-y-4 text-base text-ink/80">
                  <p>A Srs da Limpeza nasceu em 2018, no Guarujá, com a missão de levar saúde, conforto e bem-estar para dentro da sua casa. Somos especialistas em higienização e impermeabilização de colchões e estofados, revitalização de pisos e limpeza pós-obra.</p>
                  <p>Cada serviço é realizado com atenção aos detalhes e supervisionado pelas proprietárias, Mariana e Juliana. Atendemos residências e empresas com o mesmo compromisso: devolver a vida e a beleza do que é seu, como se fosse novo.</p>
                </div>
              </Reveal>
              <Reveal delay={.18}>
                <dl className="mt-8 grid grid-cols-2 gap-6 border-t border-ink/10 pt-8 sm:grid-cols-4">
                  {[['Desde', '2018'], ['Sede', 'Guarujá · SP'], ['Horário', 'Seg. a sex. · 8h às 18h'], ['Pagamento', '3x sem juros · PIX']].map(([k, v]) => (
                    <div key={k}><dt className="text-xs font-bold uppercase tracking-[.16em] text-aqua-dark">{k}</dt><dd className="mt-1 text-sm font-semibold text-ink">{v}</dd></div>
                  ))}
                </dl>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Instagram */}
        <section id="instagram" className="bg-white py-20 sm:py-24 lg:py-32">
          <div className="container-shell">
            <SectionHeading eyebrow="Instagram" title={<>Acompanhe os resultados <span className="text-gradient">de perto.</span></>} text="Vídeos e fotos publicados pela equipe no Instagram." />
            <Instagram />
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-paper py-20 sm:py-24 lg:py-32">
          <div className="container-shell grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4"><SectionHeading eyebrow="Dúvidas frequentes" title="Tudo o que você precisa saber antes de contratar." text="Não achou sua dúvida? Chame no WhatsApp: respondemos em minutos." /></div>
            <div className="lg:col-span-8"><Reveal><Accordion items={faq} /></Reveal></div>
          </div>
        </section>

        {/* Contato */}
        <section id="contato" className="relative overflow-hidden bg-ocean py-20 text-white sm:py-24 lg:py-32">
          <div aria-hidden="true" className="pointer-events-none absolute -left-32 top-0 h-[480px] w-[480px] rounded-full bg-sky/25 blur-[120px]" />
          <div className="container-shell relative grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <SectionHeading dark eyebrow="Fale conosco" title="Pronto para transformar seus estofados?" text="Preencha e receba seu orçamento no WhatsApp. Respondemos em minutos, de segunda a sexta, das 8h às 18h." />
              <Reveal delay={.12}>
                <dl className="mt-8 grid gap-5 sm:grid-cols-2">
                  <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                    <dt className="text-xs font-bold uppercase tracking-[.16em] text-sky">Estofados</dt>
                    <dd className="mt-1 text-lg font-bold"><a href={whatsappUrl(messages.upholstery)} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center">{contact.upholsteryPhone}</a></dd>
                  </div>
                  <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur">
                    <dt className="text-xs font-bold uppercase tracking-[.16em] text-sky">Pós-obra e pisos</dt>
                    <dd className="mt-1 text-lg font-bold"><a href={whatsappUrl(messages.postWork, 'postWork')} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center">{contact.postWorkPhone}</a></dd>
                  </div>
                  <div className="rounded-3xl border border-white/15 bg-white/10 p-5 backdrop-blur sm:col-span-2">
                    <dt className="text-xs font-bold uppercase tracking-[.16em] text-sky">E-mail e região</dt>
                    <dd className="mt-1 text-base"><a href={`mailto:${contact.email}`} className="inline-flex min-h-11 items-center font-bold">{contact.email}</a><br /><span className="text-white/80">{contact.areas.join(' · ')}</span></dd>
                  </div>
                </dl>
              </Reveal>
            </div>
            <div className="lg:col-span-7"><Reveal delay={.1}><ContactForm /></Reveal></div>
          </div>
        </section>

        <section aria-label="Localização no mapa" className="h-[340px] bg-paper sm:h-[420px]">
          <iframe
            title="Srs da Limpeza no Google Maps — Guarujá, SP"
            src="https://www.google.com/maps?q=Srs+da+Limpeza+Guaruj%C3%A1&z=13&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="h-full w-full border-0 grayscale-[.2]"
            allowFullScreen
          />
        </section>
        <WhatsAppFab />
      </main>
      <Footer />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  );
}
