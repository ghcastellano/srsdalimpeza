# Srs da Limpeza

Site institucional da Srs da Limpeza (higienização de estofados, impermeabilização, limpeza pós-obra e revitalização de pisos — Guarujá, Santos e Bertioga). Next.js + Tailwind + Framer Motion + Lenis + Three.js.

## Desenvolvimento

```bash
npm install
npm run dev
```

## Validação

```bash
npm run build
npx next start -p 3300 &
CHROMIUM_PATH=/opt/pw-browsers/chromium BASE_URL=http://localhost:3300 npm run qa
```

`npm run qa` roda: QA funcional (âncoras, menu, formulário → WhatsApp, 3D, cursor), auditoria axe (WCAG 2.1 AA) e matriz responsiva de 320 a 2560 px com screenshots.
