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
    default: 'Srs da Limpeza — Higienização de Estofados e Limpeza Pós-Obra em Guarujá, Santos e Bertioga',
    template: '%s | Srs da Limpeza',
  },
  description:
    'Higienização de sofá, colchão e estofados, impermeabilização, limpeza pós-obra e revitalização de pisos na Baixada Santista. +6.000 clientes, avaliação Excelente no Google, secagem rápida e produtos seguros para crianças e pets. Orçamento grátis pelo WhatsApp.',
  alternates: { canonical: '/' },
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
    title: 'Srs da Limpeza — Seu sofá como novo, sua casa livre de ácaros',
    description: 'Higienização de estofados, impermeabilização, limpeza pós-obra e revitalização de pisos em Guarujá, Santos e Bertioga. Orçamento grátis no WhatsApp.',
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
