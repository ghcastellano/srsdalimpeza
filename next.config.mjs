/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [75, 80, 82, 85, 88, 90, 100],
    minimumCacheTTL: 2678400,
  },
  experimental: {
    optimizePackageImports: ['lucide-react', 'framer-motion', 'three'],
  },
  // Redirects 301 do WordPress antigo. Quando o DNS apontar para cá, estas
  // URLs deixam de existir no servidor antigo; sem o 301 o Google perde o
  // histórico de ranking delas e o visitante cai em 404.
  async redirects() {
    return [
      {
        source: '/higienizacao-de-estofados-na-baixada-santista',
        destination: '/higienizacao-de-sofa-guaruja',
        permanent: true,
      },
      // Restos de WordPress que o Google ainda tem indexados.
      { source: '/wp-admin/:path*', destination: '/', permanent: true },
      { source: '/wp-login.php', destination: '/', permanent: true },
      { source: '/xmlrpc.php', destination: '/', permanent: true },
      { source: '/feed', destination: '/', permanent: true },
      { source: '/comments/feed', destination: '/', permanent: true },
    ];
  },
  async headers() {
    const cache = [{ key: 'Cache-Control', value: 'public, max-age=2592000, stale-while-revalidate=86400' }];
    const security = [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
      { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=(), payment=()' },
      { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
    ];
    return [
      { source: '/(.*)', headers: security },
      { source: '/assets/:path*', headers: cache },
    ];
  },
};

export default nextConfig;
