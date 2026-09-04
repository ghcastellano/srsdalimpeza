export const siteUrl = 'https://srsdalimpeza.vercel.app';

export const contact = {
  brand: 'Srs da Limpeza',
  // Dois atendimentos (como no site atual): estofados e pós-obra/pisos.
  upholsteryPhone: '(13) 97407-6009',
  upholsteryDigits: '5513974076009',
  postWorkPhone: '(13) 99718-7827',
  postWorkDigits: '5513997187827',
  email: 'srsdalimpeza@gmail.com',
  instagram: 'https://www.instagram.com/srsdalimpeza/',
  instagramHandle: '@srsdalimpeza',
  facebook: 'https://www.facebook.com/people/Srs-da-Limpeza/100056914520935/',
  youtube: 'https://www.youtube.com/@srsdalimpeza',
  googleMaps: 'https://maps.app.goo.gl/52PxTdCVSY3aj4RP8',
  googleShare: 'https://share.google/9ThWMEkxk6GTyA2xt',
  cnpj: '33.287.389/0001-57',
  hours: 'Seg. a sex., 8h às 18h',
  areas: ['Guarujá', 'Santos', 'Bertioga', 'Praia Grande', 'São Vicente'],
  region: 'Baixada Santista · SP',
  // NAP (nome/endereço/telefone) igual ao do perfil do Google — a consistência
  // entre site e ficha é um dos pesos mais fortes do SEO local.
  street: 'R. Dr. Gervásio Bonavides, 84 — Loja A',
  district: 'Vila Luis Antonio',
  city: 'Guarujá',
  state: 'SP',
  zip: '11420-210',
  geo: { lat: -24.0060872, lng: -46.2713672 },
  rating: 4.9,
  reviewCount: 82,
};

export const fullAddress = `${contact.street}, ${contact.district}, ${contact.city} — ${contact.state}, ${contact.zip}`;

export const messages = {
  general: 'Olá, Srs da Limpeza! Vim pelo site e quero um orçamento gratuito.',
  upholstery: 'Olá! Quero um orçamento para higienização de estofados (sofá, colchão, cadeiras...).',
  postWork: 'Olá! Quero um orçamento para limpeza pós-obra / revitalização de pisos.',
};

export type Line = 'upholstery' | 'postWork';

export function whatsappUrl(message: string, line: Line = 'upholstery') {
  const digits = line === 'postWork' ? contact.postWorkDigits : contact.upholsteryDigits;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

export const stats = [
  { value: 6000, prefix: '+', label: 'clientes atendidos', note: 'na Baixada Santista e em São Paulo' },
  { value: 82, prefix: '', label: 'avaliações no Google', note: 'nota 4,9 de 5 no Google' },
  { value: 99.9, prefix: '', suffix: '%', label: 'de ácaros e bactérias', note: 'eliminados a cada higienização' },
  { value: 2018, prefix: '', label: 'ano de fundação', note: 'referência no Guarujá desde então', raw: true },
];

export type Service = { slug: string; title: string; text: string; image: string; imageAlt: string; href?: string; line: Line };

export const services: Service[] = [
  {
    slug: 'sofa',
    title: 'Higienização de sofá',
    text: 'Extração profunda que remove ácaros, manchas e odores. Seu sofá volta a ter cor, maciez e cheiro de novo.',
    image: '/assets/photos/sofa-7.webp',
    imageAlt: 'Higienização de sofá: antes e depois em tecido suede',
    href: '/higienizacao-de-sofa-guaruja',
    line: 'upholstery' as Line,
  },
  {
    slug: 'colchao',
    title: 'Higienização de colchão',
    text: 'Remove mofo, suor e ácaros que causam rinite e alergia. Você dorme em um colchão realmente limpo.',
    image: '/assets/photos/colchao-1.webp',
    imageAlt: 'Higienização de colchão que remove ácaros, mofo e suor',
    line: 'upholstery' as Line,
  },
  {
    slug: 'cadeiras',
    title: 'Poltronas e cadeiras',
    text: 'Cadeiras de jantar, poltronas e cadeiras de escritório com o mesmo padrão de limpeza profunda.',
    image: '/assets/photos/cadeiras-2.webp',
    imageAlt: 'Higienização de poltronas e cadeiras estofadas',
    line: 'upholstery' as Line,
  },
  {
    slug: 'tapetes',
    title: 'Tapetes e carpetes',
    text: 'Lavagem com extração que tira a sujeira acumulada entre as fibras sem danificar o tecido.',
    image: '/assets/photos/tapete.webp',
    imageAlt: 'Higienização de tapetes e carpetes com extração',
    line: 'upholstery' as Line,
  },
  {
    slug: 'bebe',
    title: 'Estofados de bebê',
    text: 'Carrinhos, bebê-conforto e cadeirinhas higienizados com produtos biodegradáveis e seguros.',
    image: '/assets/photos/cadeira-infantil.webp',
    imageAlt: 'Higienização de estofados de bebê: bebê-conforto e cadeirinha',
    line: 'upholstery' as Line,
  },
  {
    slug: 'impermeabilizacao',
    title: 'Impermeabilização',
    text: 'Camada protetora que repele líquidos e facilita a limpeza do dia a dia. Proteção que dura.',
    image: '/assets/photos/sofa-4.webp',
    imageAlt: 'Impermeabilização de sofá que repele líquidos e manchas',
    line: 'upholstery' as Line,
  },
  {
    slug: 'pos-obra',
    title: 'Limpeza pós-obra',
    text: 'Remoção de poeira, cimento, tinta, gesso e rejunte. Entregamos o imóvel pronto para morar ou alugar.',
    image: '/assets/photos/pos-obra-5.webp',
    imageAlt: 'Limpeza pós-obra em imóvel recém-construído no Guarujá',
    href: '/limpeza-pos-obra-santos',
    line: 'postWork' as Line,
  },
  {
    slug: 'pisos',
    title: 'Revitalização de pisos',
    text: 'Pisos de madeira, porcelanato e pedra recuperados com máquinas industriais e produtos adequados.',
    image: '/assets/photos/posobra-2.webp',
    imageAlt: 'Revitalização de piso de porcelanato após a obra',
    line: 'postWork' as Line,
  },
];

export const process = [
  { title: 'Você chama no WhatsApp', text: 'Envie uma foto do estofado ou do imóvel e descreva o que precisa. Respondemos em minutos com o orçamento.' },
  { title: 'Agendamos no seu horário', text: 'Escolha o melhor dia e horário. Vamos até você, em Guarujá, Santos, Bertioga e região.' },
  { title: 'Higienização profissional', text: 'Aspiração, pré-tratamento das manchas, extração profunda e odorização com produtos biodegradáveis.' },
  { title: 'Resultado garantido', text: 'Secagem acelerada e entrega com cheiro de novo. Se algo não ficar como combinado, voltamos.' },
];

export const benefits = [
  { title: 'Saúde em primeiro lugar', text: 'Eliminamos ácaros, bactérias e fungos que causam alergias, rinite e problemas respiratórios.' },
  { title: 'Secagem rápida', text: 'Processo de extração eficiente: seus estofados prontos para uso em poucas horas, não em dias.' },
  { title: 'Produtos ecológicos', text: 'Biodegradáveis e seguros para crianças, pets e toda a família. Sem cheiro forte de química.' },
  { title: 'Proteção e durabilidade', text: 'Tratamentos que prolongam a vida útil dos estofados e protegem contra o desgaste do uso.' },
  { title: 'Equipe treinada', text: 'Profissionais capacitados e em constante treinamento, supervisionados pelas proprietárias.' },
  { title: 'Transparência total', text: 'Orçamento claro, sem surpresa. Pagamento em até 3x sem juros, PIX, dinheiro ou débito.' },
];

export const postWorkScope = [
  'Luminárias, ar-condicionado e ventiladores',
  'Rodapés, portas, guarnições e molduras',
  'Pisos: varrer, aspirar, esfregar e higienizar',
  'Janelas, esquadrias, soleiras e vidros',
  'Banheiros e cozinhas higienizados',
  'Armários, gavetas e estantes por dentro',
  'Resíduos de tinta, massa, gesso, cimento e rejunte',
  'Remoção de adesivos e etiquetas',
];

export const postWorkClients = ['Residências', 'Hotéis e pousadas', 'Imobiliárias', 'Arquitetos', 'Empreiteiras', 'Condomínios', 'Comércios', 'Escolas'];

/** `alt` descreve a imagem para busca/leitor de tela; `title` é o rótulo visível. */
export type GalleryItem = { src: string; title: string; tag: string; alt: string };

/**
 * Item de mídia do lightbox. `kind` decide o que é reproduzido:
 * - 'photo' (padrão): a foto em object-contain, com zoom.
 * - 'youtube': player do YouTube embutido, tocando dentro da página.
 * - 'instagram': embed do reel; o link para o post fica como saída.
 */
export type MediaItem = GalleryItem & {
  kind?: 'photo' | 'youtube' | 'instagram';
  /** ID do vídeo no YouTube ou código do reel no Instagram. */
  mediaId?: string;
  url?: string;
  caption?: string;
};

export const gallery: GalleryItem[] = [
  { src: '/assets/photos/sofa-7.webp', title: 'Sofá de suede: antes e depois', tag: 'Higienização de sofá' , alt: 'Sofá de suede marrom higienizado pela Srs da Limpeza: metade com sujeira impregnada e metade limpa após a extração' },
  { src: '/assets/photos/sofa-1.webp', title: 'Extração profissional em sofá claro', tag: 'Equipe em ação' , alt: 'Profissional da Srs da Limpeza higienizando um sofá claro com máquina extratora em uma residência no Guarujá' },
  { src: '/assets/photos/sofa-8.webp', title: 'Tecido recuperado com extração', tag: 'Higienização de sofá' , alt: 'Tecido de sofá recuperado após higienização profunda com extração de sujeira e ácaros' },
  { src: '/assets/photos/colchao-2.webp', title: 'Colchão de casal higienizado', tag: 'Higienização de colchão' , alt: 'Colchão de casal durante a higienização profissional que remove ácaros, mofo e suor impregnado' },
  { src: '/assets/photos/poltronas.webp', title: 'Poltrona clara como nova', tag: 'Poltronas' , alt: 'Poltrona de tecido claro higienizada e sem manchas após limpeza profissional de estofados' },
  { src: '/assets/photos/carpete-1.webp', title: 'Carpete de escritório lavado', tag: 'Tapetes e carpetes' , alt: 'Carpete de escritório lavado com extração profissional, sem manchas e com secagem rápida' },
  { src: '/assets/photos/cadeiras-3.webp', title: 'Cadeiras de jantar higienizadas', tag: 'Cadeiras' , alt: 'Cadeiras de jantar estofadas higienizadas em residência na Baixada Santista' },
  { src: '/assets/photos/sofa-3.webp', title: 'Sofá de canto em linho', tag: 'Higienização de sofá' , alt: 'Sofá de canto em tecido claro higienizado e pronto para uso em sala de estar' },
  { src: '/assets/photos/cadeiras-1.webp', title: 'Cadeiras de couro revitalizadas', tag: 'Cadeiras' , alt: 'Cadeiras de couro revitalizadas após limpeza e hidratação profissional' },
  { src: '/assets/photos/tapete.webp', title: 'Tapete de sala higienizado', tag: 'Tapetes e carpetes' , alt: 'Tapete de sala higienizado com lavagem por extração, sem odores e livre de ácaros' },
  { src: '/assets/photos/sofa-6.webp', title: 'Sofá retrátil pronto para uso', tag: 'Higienização de sofá' , alt: 'Sofá retrátil higienizado e pronto para uso poucas horas após a limpeza' },
  { src: '/assets/photos/colchao-3.webp', title: 'Colchão livre de ácaros', tag: 'Higienização de colchão' , alt: 'Colchão livre de ácaros e bactérias após higienização com produtos biodegradáveis' },
];

export const postWorkGallery: GalleryItem[] = [
  { src: '/assets/photos/posobra-12.webp', title: 'Varanda entregue limpa após a obra', tag: 'Limpeza pós-obra' , alt: 'Varanda de apartamento entregue limpa após a limpeza pós-obra da Srs da Limpeza' },
  { src: '/assets/photos/posobra-9.webp', title: 'Cozinha pronta para uso', tag: 'Limpeza pós-obra' , alt: 'Cozinha nova pronta para uso após limpeza pós-obra, sem poeira nem respingos de tinta' },
  { src: '/assets/photos/posobra-7.webp', title: 'Ilha e bancada sem resíduo de obra', tag: 'Limpeza pós-obra' , alt: 'Ilha e bancada de cozinha sem resíduo de obra após limpeza técnica das superfícies' },
  { src: '/assets/photos/posobra-14.webp', title: 'Sala liberada para a mudança', tag: 'Limpeza pós-obra' , alt: 'Sala de apartamento reformado pronta para morar após a limpeza pós-obra' },
  { src: '/assets/photos/posobra-13.webp', title: 'Cozinha com eletrodomésticos limpos', tag: 'Limpeza pós-obra' , alt: 'Cozinha com eletrodomésticos e armários limpos por dentro depois da obra' },
  { src: '/assets/photos/posobra-5.webp', title: 'Banheiro higienizado no pós-obra', tag: 'Limpeza pós-obra' , alt: 'Banheiro higienizado no pós-obra, com louças e rejunte livres de cimento' },
  { src: '/assets/photos/posobra-2.webp', title: 'Porcelanato revitalizado', tag: 'Revitalização de pisos' , alt: 'Piso de porcelanato revitalizado após a obra, sem manchas de cimento ou rejunte' },
  { src: '/assets/photos/posobra-10.webp', title: 'Área social pronta para receber', tag: 'Limpeza pós-obra' , alt: 'Cozinha nova entregue sem resíduos de obra, poeira ou respingos de tinta' },
  { src: '/assets/photos/posobra-3.webp', title: 'Esquadrias e vidros sem respingo', tag: 'Limpeza pós-obra' , alt: 'Esquadrias e vidros sem respingo de tinta ou massa após a limpeza pós-obra' },
];

/**
 * Avaliações reais publicadas no Google (73 no total, nota Excelente).
 * `avatar` só existe para quem tem foto de perfil pública no Google; os demais
 * caem nas iniciais da marca. Ordenadas da mais recente para a mais antiga.
 */
export type Review = { name: string; iso?: string; date: string; service: string; text: string; avatar?: string; note?: string };

export const reviews: Review[] = [
  // Sem data: o perfil do Google não a exibe na ordenação por relevância.
  { name: 'Gustavo', date: 'Local Guide · 21 avaliações', service: 'Higienização de sofá', note: 'Ótimo preço · R$ 300–400', text: 'Super pontuais e sérios! Difícil no Guarujá algum tipo de serviço similar. Empresa higiênica, deixaram o piso super seco e não fizeram sujeira alguma. Sou detalhista e elas foram impecáveis.' },
  { name: 'Fabricio Rodrigues', iso: '2026-06-01', date: 'junho de 2026', service: 'Pós-obra', text: 'Profissionais muito qualificadas. Deixaram o apartamento um brinco. Tudo como se fosse super novo. Agradeço à Juliana e sua equipe pela simpatia, atenção, profissionalismo e cumprimento dos prazos.' },
  { name: 'Daiane Ribeiro', iso: '2026-02-10', date: 'fevereiro de 2026', service: 'Sofá e poltrona', text: 'Elas são muito caprichosas, deixam tudo bem limpinho e cheiroso, meu sofá ficou novo depois da limpeza e minha poltrona então, que é clara, nossa, parece outra!' },
  { name: 'Marina Oliveira Lopes', iso: '2026-01-22', date: 'janeiro de 2026', service: 'Residencial', avatar: '/assets/reviews/marina-oliveira-lopes.webp', text: 'Atendimento rápido, equipe focada e com produtos especializados para o trabalho. Pessoas que entendem o que estão fazendo. Deixaram minha casa impecável.' },
  { name: 'Zê', iso: '2025-12-15', date: 'dezembro de 2025', service: 'Condomínio', text: 'A empresa fez serviços no meu condomínio. São muito sérios, entendem do que fazem, pontuais: marca e vem na hora e dia marcado, e o resultado ficou ótimo! Pode contratar sem medo.' },
  { name: 'Fabio Godoy', iso: '2025-12-02', date: 'dezembro de 2025', service: 'Residencial', avatar: '/assets/reviews/fabio-godoy.webp', text: 'Tudo entregue conforme o combinado, equipe prestativa e de confiança. Recomendo.' },
  { name: 'Fátima Aguiar', iso: '2025-11-24', date: 'novembro de 2025', service: 'Colchões', text: 'Atendimento de excelência! Mariana foi de um profissionalismo ímpar e o serviço executado, limpeza e higienização de colchões, foi impecável! Meus colchões estavam com pontinhos de mofo e sujidade causada por tempo de uso. Tudo removido com perfeição! Super recomendo!' },
  { name: 'Vilma Pannunzio', iso: '2025-11-19', date: 'novembro de 2025', service: 'Pós-obra e piso de madeira', text: 'Desde o primeiro contato a Juliana atendeu prontamente. Muito pontual com horários. Foi realizada a restauração do piso de madeira e o apartamento estava com muita poeira. Tudo muito bem limpo e supervisionado pela Juliana, proprietária da empresa. Prestação de serviço nota 10.' },
  { name: 'Fabíola Garoni', iso: '2025-09-27', date: 'setembro de 2025', service: 'Estofados e pós-obra', avatar: '/assets/reviews/fabiola-garoni.webp', text: 'Contratei para higienizar meu sofá, colchões e poltronas após 4 meses de obra. A Mariana e sua equipe são ótimas profissionais, deixaram tudo limpinho e cheirosinho. Fiz também a limpeza pós-obra com a Juliana, que comanda a equipe durante todo o período e entrega um trabalho maravilhoso! Nota mil!' },
  { name: 'Silvana Andrade', iso: '2025-09-05', date: 'setembro de 2025', service: 'Pós-obra', avatar: '/assets/reviews/silvana-andrade.webp', text: 'Excelente serviço prestado! Meu apartamento estava uma lástima no pós-obra e as meninas fizeram milagres. Juliana extremamente simpática e eficiente. Recomendo a todos!' },
  { name: 'Andre Rodrigo Germano', iso: '2025-09-03', date: 'setembro de 2025', service: 'Pós-obra', text: 'Minha experiência foi ótima! Limpeza pós-obra impecável do local. Superou nossas expectativas. Super recomendo.' },
];

/**
 * Vídeos e bastidores. Os dois vídeos do YouTube são do canal da empresa e
 * tocam dentro da página; os reels abrem no embed do Instagram.
 */
export const media: MediaItem[] = [
  {
    kind: 'youtube',
    mediaId: '5YG8UkMFTpE',
    src: '/assets/photos/yt-5YG8UkMFTpE.webp',
    title: 'A obra ou reforma acabou?',
    tag: 'Vídeo · Limpeza pós-obra',
    alt: 'Apartamento entregue pronto para uso após a limpeza pós-obra da Srs da Limpeza',
    caption: 'Entregamos o imóvel pronto para uso, com qualidade e agilidade. Veja como a equipe trabalha do início à vistoria final.',
    url: 'https://www.youtube.com/watch?v=5YG8UkMFTpE',
  },
  {
    kind: 'youtube',
    mediaId: 'VBI5Rb2Vq4Y',
    src: '/assets/photos/yt-VBI5Rb2Vq4Y.webp',
    title: 'Nunca use ácido em mármore',
    tag: 'Vídeo · Revitalização de pisos',
    alt: 'Alerta sobre o uso de ácido em piso de mármore durante a limpeza pós-obra',
    caption: 'Ácido mancha mármore e porcelanato polido de forma irreversível. Veja o que usamos no lugar para tirar nata de cimento sem danificar o acabamento.',
    url: 'https://www.youtube.com/watch?v=VBI5Rb2Vq4Y',
  },
  {
    kind: 'instagram',
    mediaId: 'DV1wBAzEWu8',
    src: '/assets/photos/posobra-12.webp',
    title: 'Mais um lar transformado',
    tag: 'Reel · Pós-obra',
    alt: 'Apartamento entregue limpo após a limpeza pós-obra da Srs da Limpeza',
    caption: 'Pós-obra completo após marcenaria, pedras, fechamento de varanda e pintura. Prontinho para receber a família.',
    url: 'https://www.instagram.com/reel/DV1wBAzEWu8/',
  },
  {
    kind: 'instagram',
    mediaId: 'DUrNh81kccg',
    src: '/assets/photos/sofa-8.webp',
    title: 'Higienização profunda de estofado',
    tag: 'Reel · Estofados',
    alt: 'Higienização profunda de estofado com extração, em vídeo no Instagram',
    caption: 'Extração, odorização e secagem rápida. O retorno de água suja mostra o que estava no fundo da espuma.',
    url: 'https://www.instagram.com/reel/DUrNh81kccg/',
  },
  {
    src: '/assets/photos/sofa-7.webp',
    title: 'Sofá de suede: antes e depois',
    tag: 'Foto · Higienização de sofá',
    alt: 'Sofá de suede marrom higienizado pela Srs da Limpeza: metade com sujeira impregnada e metade limpa após a extração',
    caption: 'A mesma peça, na mesma foto: à esquerda antes, à direita depois da extração.',
  },
  {
    src: '/assets/photos/posobra-9.webp',
    title: 'Cozinha entregue após a obra',
    tag: 'Foto · Limpeza pós-obra',
    alt: 'Cozinha nova pronta para uso após limpeza pós-obra, sem poeira nem respingos de tinta',
    caption: 'Armários limpos por dentro, esquadrias sem respingo e piso tratado antes da mudança.',
  },
];

export const faq = [
  { q: 'Quanto tempo leva para o sofá secar?', a: 'Usamos extração de alta potência, então a secagem é acelerada: na maioria dos casos o estofado está pronto para uso em poucas horas, dependendo do tecido e da ventilação do ambiente.' },
  { q: 'Os produtos são seguros para crianças e pets?', a: 'Sim. Trabalhamos com produtos biodegradáveis, sem cheiro forte de química, seguros para crianças, pets e pessoas alérgicas.' },
  { q: 'Vocês atendem em qual região?', a: 'Guarujá, Santos, Bertioga, Praia Grande e São Vicente. Para outras cidades da Baixada Santista, consulte pelo WhatsApp.' },
  { q: 'Faxina e limpeza pós-obra são a mesma coisa?', a: 'Não. A limpeza pós-obra exige equipamentos industriais, produtos específicos para remover cimento, gesso, tinta e rejunte, e uma equipe treinada para não danificar as superfícies novas.' },
  { q: 'Como funciona o orçamento?', a: 'É gratuito. Para estofados, basta enviar fotos pelo WhatsApp. Para pós-obra e pisos, fazemos uma visita técnica sem custo para avaliar o espaço e definir prazo e valor.' },
  { q: 'Quais as formas de pagamento?', a: 'Cartão de crédito em até 3x sem juros, PIX, dinheiro ou cartão de débito.' },
  { q: 'A higienização tira todas as manchas?', a: 'Removemos a grande maioria das manchas e odores. Manchas muito antigas ou de tinta permanente podem clarear sem sair por completo; avisamos antes de começar, com total transparência.' },
];

export const navLinks = [
  { label: 'Serviços', href: '#servicos' },
  { label: 'Como funciona', href: '#como-funciona' },
  { label: 'Resultados', href: '#resultados' },
  { label: 'Vídeos', href: '#videos' },
  { label: 'Avaliações', href: '#avaliacoes' },
  { label: 'Pós-obra', href: '#pos-obra' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contato', href: '#contato' },
];
