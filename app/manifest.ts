import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Srs da Limpeza',
    short_name: 'Srs da Limpeza',
    description: 'Higienização de estofados, impermeabilização, limpeza pós-obra e revitalização de pisos na Baixada Santista.',
    start_url: '/',
    display: 'standalone',
    background_color: '#f6fbfd',
    theme_color: '#0f5f83',
    icons: [
      { src: '/assets/brand/icon-192.png', sizes: '192x192', type: 'image/png' },
      { src: '/assets/brand/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
  };
}
