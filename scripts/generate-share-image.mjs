import sharp from 'sharp';

const width = 1200;
const height = 630;

// A foto e o logo são arquivos já usados pelo site; a arte não inventa pessoas
// ou serviços. O logo fica inteiro na área central vista no recorte do WhatsApp.
const logo = await sharp('public/assets/brand/logo-lockup-original.png')
  .extract({ left: 38, top: 130, width: 440, height: 245 })
  .resize({ width: 620 })
  .png()
  .toBuffer();

async function generate({ photoPath, headline, description, outputPath }) {
  const photo = await sharp(photoPath)
    .resize(width, 236, { fit: 'cover', position: 'centre' })
    .toBuffer();

  const overlay = Buffer.from(`
  <svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="394" fill="#f7fdff"/>
    <rect width="1200" height="7" fill="#26b8dc"/>
    <rect y="382" width="1200" height="12" fill="#d0f3f9"/>
    <rect y="394" width="1200" height="236" fill="#0c3042" opacity=".56"/>
    <text x="600" y="468" fill="#ffffff" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="46" font-weight="700">${headline}</text>
    <text x="600" y="521" fill="#ffffff" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="25">${description}</text>
  </svg>
`);

  await sharp({ create: { width, height, channels: 3, background: '#f7fdff' } })
    .composite([
      { input: photo, top: 394, left: 0 },
      { input: overlay, top: 0, left: 0 },
      { input: logo, top: 20, left: 290 },
    ])
    .jpeg({ quality: 86, mozjpeg: true })
    .toFile(outputPath);
}

await generate({
  photoPath: 'public/assets/photos/sofa-2.webp',
  headline: 'Seu sofá como novo.',
  description: 'Higienização de estofados · Guarujá, Santos e Bertioga',
  outputPath: 'public/assets/brand/compartilhamento-whatsapp.jpg',
});

await generate({
  photoPath: 'public/assets/photos/pos-obra-hero.webp',
  headline: 'Obra pronta. Espaço impecável.',
  description: 'Limpeza pós-obra · Guarujá, Santos e Bertioga',
  outputPath: 'public/assets/brand/compartilhamento-pos-obra.jpg',
});
