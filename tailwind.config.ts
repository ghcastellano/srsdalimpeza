import type { Config } from 'tailwindcss';

export default {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Paleta extraída do logo (gradiente azul-oceano → aqua) + neutros
        // "limpos". ink = azul-marinho profundo para texto/superfícies escuras.
        ink: '#062637',
        ocean: '#0f5f83',
        aqua: '#1d9bc4',
        'aqua-dark': '#0d6f94',
        sky: '#7fd9ea',
        mist: '#e8f5fa',
        paper: '#f6fbfd',
        foam: '#ffffff',
        lime: '#2fd28f',
        whatsapp: '#25D366',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'Manrope', 'Helvetica Neue', 'Arial', 'sans-serif'],
        display: ['var(--font-display)', 'Sora', 'Avenir Next', 'sans-serif'],
      },
      fontSize: {
        sm: ['1rem', { lineHeight: '1.7', letterSpacing: '.005em' }],
        base: ['1.0625rem', { lineHeight: '1.7', letterSpacing: '.005em' }],
        lg: ['1.125rem', { lineHeight: '1.65' }],
        xl: ['1.25rem', { lineHeight: '1.3' }],
        '2xl': ['1.5rem', { lineHeight: '1.25' }],
        '3xl': ['1.875rem', { lineHeight: '1.2' }],
        '4xl': ['2.25rem', { lineHeight: '1.15' }],
        '5xl': ['3rem', { lineHeight: '1.1' }],
        '6xl': ['3.75rem', { lineHeight: '1.05' }],
        '7xl': ['4.5rem', { lineHeight: '1.02' }],
      },
      boxShadow: {
        glow: '0 20px 60px -20px rgba(29,155,196,.45)',
        card: '0 10px 40px -18px rgba(6,38,55,.25)',
      },
    },
  },
  plugins: [],
} satisfies Config;
