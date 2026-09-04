import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import Cursor from '@/components/fx/Cursor';
import SmoothScroll from '@/components/fx/SmoothScroll';
import { siteUrl } from '@/lib/content';
import './globals.css';

const display = localFont({
  src: './fonts/sora-var.woff2',
  variable: '--font-display',
  weight: '300 800',
  display: 'swap',
});

const sans = localFont({
  src: './fonts/manrope-var.woff2',
  variable: '--font-sans',
  weight: '400 800',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    // ~60 caracteres: palavra-chave primária + cidade antes do corte do Google.
    default: 'Higienização de Sofá e Estofados no Guarujá | Srs da Limpeza',
    template: '%s | Srs da Limpeza',
  },
  description:
    'Higienização de sofá, colchão e estofados, impermeabilização, limpeza pós-obra e revitalização de pisos em Guarujá, Santos e Bertioga. Nota 4,9 no Google com 82 avaliações, secagem rápida e produtos seguros para crianças e pets. Orçamento grátis pelo WhatsApp.',
  keywords: [
    'higienização de sofá Guarujá',
    'limpeza de estofados Santos',
    'higienização de colchão Bertioga',
    'impermeabilização de estofados',
    'limpeza pós-obra Guarujá',
    'revitalização de pisos Baixada Santista',
    'lavagem de sofá a seco',
  ],
  authors: [{ name: 'Srs da Limpeza' }],
  creator: 'Srs da Limpeza',
  publisher: 'Srs da Limpeza',
  category: 'Serviços de limpeza',
  alternates: { canonical: '/' },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  icons: {
    icon: [
      { url: '/assets/brand/favicon.svg', type: 'image/svg+xml' },
      { url: '/assets/brand/favicon-32.png', type: 'image/png', sizes: '32x32' },
      { url: '/assets/brand/icon-192.png', type: 'image/png', sizes: '192x192' },
    ],
    shortcut: '/assets/brand/favicon-32.png',
    apple: '/assets/brand/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Higienização de sofá e estofados no Guarujá | Srs da Limpeza',
    description: 'Higienização de estofados, impermeabilização, limpeza pós-obra e revitalização de pisos em Guarujá, Santos e Bertioga. Nota 4,9 no Google. Orçamento grátis no WhatsApp.',
    url: siteUrl,
    siteName: 'Srs da Limpeza',
    images: [{ url: '/opengraph-image', width: 1200, height: 630, alt: 'Srs da Limpeza — higienização de estofados e limpeza pós-obra' }],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: { card: 'summary_large_image' },
};

export const viewport: Viewport = {
  themeColor: '#0f5f83',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="pt-BR" className={`${display.variable} ${sans.variable}`}>
      <body>
        <SmoothScroll />
        {children}
        <Cursor />
      </body>
    </html>
  );
}
