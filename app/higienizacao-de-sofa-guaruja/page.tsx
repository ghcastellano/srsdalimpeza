import type { Metadata } from 'next';
import ServicePage from '@/components/ServicePage';
import { upholsteryPage } from '@/lib/service-pages';
import { shareImageUrl } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Higienização de Sofá no Guarujá e Santos',
  description:
    'Higienização de sofá, colchão, poltronas e tapetes com lavagem por extração, em domicílio, no Guarujá, Santos e Bertioga. Remove ácaros, manchas e odores, seca em poucas horas. Orçamento grátis pelo WhatsApp.',
  alternates: { canonical: `/${upholsteryPage.slug}` },
  openGraph: {
    title: 'Higienização de sofá e estofados no Guarujá | Srs da Limpeza',
    description: 'Lavagem com extração em domicílio para sofás, colchões, poltronas e tapetes. Nota 4,9 no Google.',
    url: `/${upholsteryPage.slug}`,
    images: [{ url: shareImageUrl, width: 1200, height: 630, alt: 'Logo Srs da Limpeza e sofá higienizado' }],
    type: 'website',
  },
};

export default function Page() {
  return <ServicePage content={upholsteryPage} />;
}
