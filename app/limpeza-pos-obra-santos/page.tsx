import type { Metadata } from 'next';
import ServicePage from '@/components/ServicePage';
import { postWorkPage } from '@/lib/service-pages';
import { postWorkShareImageUrl } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Limpeza Pós-Obra em Santos, Guarujá e Bertioga',
  description:
    'Limpeza pós-obra residencial e comercial e revitalização de pisos em Santos, Guarujá e Bertioga. Removemos poeira, cimento, gesso, tinta e rejunte sem danificar acabamentos novos. Visita técnica gratuita.',
  alternates: { canonical: `/${postWorkPage.slug}` },
  openGraph: {
    title: 'Limpeza pós-obra em Santos e Guarujá | Srs da Limpeza',
    description: 'Entregamos o imóvel pronto para morar. Equipe treinada, equipamentos industriais e visita técnica gratuita.',
    url: `/${postWorkPage.slug}`,
    images: [{ url: postWorkShareImageUrl, width: 1200, height: 630, alt: 'Logo Srs da Limpeza e equipe realizando limpeza pós-obra' }],
    type: 'website',
  },
};

export default function Page() {
  return <ServicePage content={postWorkPage} />;
}
