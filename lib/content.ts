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
};

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
  { value: 73, prefix: '', label: 'avaliações no Google', note: 'nota Excelente · 5 estrelas' },
  { value: 99.9, prefix: '', suffix: '%', label: 'de ácaros e bactérias', note: 'eliminados a cada higienização' },
  { value: 2018, prefix: '', label: 'ano de fundação', note: 'referência no Guarujá desde então', raw: true },
];

export const services = [
  {
    slug: 'sofa',
    title: 'Higienização de sofá',
    text: 'Extração profunda que remove ácaros, manchas e odores. Seu sofá volta a ter cor, maciez e cheiro de novo.',
    image: '/assets/photos/sofa-7.webp',
    line: 'upholstery' as Line,
  },
  {
    slug: 'colchao',
    title: 'Higienização de colchão',
    text: 'Remove mofo, suor e ácaros que causam rinite e alergia. Você dorme em um colchão realmente limpo.',
    image: '/assets/photos/colchao-1.webp',
    line: 'upholstery' as Line,
  },
  {
    slug: 'cadeiras',
    title: 'Poltronas e cadeiras',
    text: 'Cadeiras de jantar, poltronas e cadeiras de escritório com o mesmo padrão de limpeza profunda.',
    image: '/assets/photos/cadeiras-2.webp',
    line: 'upholstery' as Line,
  },
  {
    slug: 'tapetes',
    title: 'Tapetes e carpetes',
    text: 'Lavagem com extração que tira a sujeira acumulada entre as fibras sem danificar o tecido.',
    image: '/assets/photos/tapete.webp',
    line: 'upholstery' as Line,
  },
  {
    slug: 'bebe',
    title: 'Estofados de bebê',
    text: 'Carrinhos, bebê-conforto e cadeirinhas higienizados com produtos biodegradáveis e seguros.',
    image: '/assets/photos/cadeira-infantil.webp',
    line: 'upholstery' as Line,
  },
  {
    slug: 'impermeabilizacao',
    title: 'Impermeabilização',
    text: 'Camada protetora que repele líquidos e facilita a limpeza do dia a dia. Proteção que dura.',
    image: '/assets/photos/sofa-4.webp',
    line: 'upholstery' as Line,
  },
  {
    slug: 'pos-obra',
    title: 'Limpeza pós-obra',
    text: 'Remoção de poeira, cimento, tinta, gesso e rejunte. Entregamos o imóvel pronto para morar ou alugar.',
    image: '/assets/photos/pos-obra-5.webp',
    line: 'postWork' as Line,
  },
  {
    slug: 'pisos',
    title: 'Revitalização de pisos',
    text: 'Pisos de madeira, porcelanato e pedra recuperados com máquinas industriais e produtos adequados.',
    image: '/assets/photos/posobra-2.webp',
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

export type GalleryItem = { src: string; title: string; tag: string };

export const gallery: GalleryItem[] = [
  { src: '/assets/photos/sofa-7.webp', title: 'Sofá de suede: antes e depois', tag: 'Higienização de sofá' },
  { src: '/assets/photos/sofa-1.webp', title: 'Extração profissional em sofá claro', tag: 'Equipe em ação' },
  { src: '/assets/photos/sofa-8.webp', title: 'Tecido recuperado com extração', tag: 'Higienização de sofá' },
  { src: '/assets/photos/colchao-2.webp', title: 'Colchão de casal higienizado', tag: 'Higienização de colchão' },
  { src: '/assets/photos/poltronas.webp', title: 'Poltrona clara como nova', tag: 'Poltronas' },
  { src: '/assets/photos/carpete-1.webp', title: 'Carpete de escritório lavado', tag: 'Tapetes e carpetes' },
  { src: '/assets/photos/cadeiras-3.webp', title: 'Cadeiras de jantar higienizadas', tag: 'Cadeiras' },
  { src: '/assets/photos/sofa-3.webp', title: 'Sofá de canto em linho', tag: 'Higienização de sofá' },
  { src: '/assets/photos/cadeiras-1.webp', title: 'Cadeiras de couro revitalizadas', tag: 'Cadeiras' },
  { src: '/assets/photos/tapete.webp', title: 'Tapete de sala higienizado', tag: 'Tapetes e carpetes' },
  { src: '/assets/photos/sofa-6.webp', title: 'Sofá retrátil pronto para uso', tag: 'Higienização de sofá' },
  { src: '/assets/photos/colchao-3.webp', title: 'Colchão livre de ácaros', tag: 'Higienização de colchão' },
];

export const postWorkGallery: GalleryItem[] = [
  { src: '/assets/photos/posobra-12.webp', title: 'Varanda entregue limpa após a obra', tag: 'Limpeza pós-obra' },
  { src: '/assets/photos/posobra-9.webp', title: 'Cozinha pronta para uso', tag: 'Limpeza pós-obra' },
  { src: '/assets/photos/posobra-7.webp', title: 'Ilha e bancada sem resíduo de obra', tag: 'Limpeza pós-obra' },
  { src: '/assets/photos/posobra-14.webp', title: 'Sala liberada para a mudança', tag: 'Limpeza pós-obra' },
  { src: '/assets/photos/posobra-13.webp', title: 'Cozinha com eletrodomésticos limpos', tag: 'Limpeza pós-obra' },
  { src: '/assets/photos/posobra-5.webp', title: 'Banheiro higienizado no pós-obra', tag: 'Limpeza pós-obra' },
  { src: '/assets/photos/posobra-2.webp', title: 'Porcelanato revitalizado', tag: 'Revitalização de pisos' },
  { src: '/assets/photos/posobra-10.webp', title: 'Área social pronta para receber', tag: 'Limpeza pós-obra' },
  { src: '/assets/photos/posobra-3.webp', title: 'Esquadrias e vidros sem respingo', tag: 'Limpeza pós-obra' },
];

/**
 * Avaliações reais publicadas no Google (73 no total, nota Excelente).
 * `avatar` só existe para quem tem foto de perfil pública no Google; os demais
 * caem nas iniciais da marca. Ordenadas da mais recente para a mais antiga.
 */
export type Review = { name: string; iso: string; date: string; service: string; text: string; avatar?: string };

export const reviews: Review[] = [
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

/** Posts públicos do Instagram referenciados no site atual. */
export const instagramPosts = [
  { url: 'https://www.instagram.com/reel/DV1wBAzEWu8/', image: '/assets/photos/posobra-12.webp', caption: 'Mais um lar transformado! Pós-obra completo após marcenaria, pedras, fechamento de varanda e pintura. Prontinho para receber a família.', kind: 'Reel · Pós-obra' },
  { url: 'https://www.instagram.com/reel/DUrNh81kccg/', image: '/assets/photos/sofa-8.webp', caption: 'Higienização profunda de estofados: extração, odorização e secagem rápida. Veja o resultado em vídeo.', kind: 'Reel · Estofados' },
  { url: 'https://www.instagram.com/srsdalimpeza/', image: '/assets/photos/colchao-1.webp', caption: 'Bastidores, antes e depois e dicas de conservação. Siga @srsdalimpeza e acompanhe o dia a dia da equipe.', kind: 'Perfil · @srsdalimpeza' },
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
  { label: 'Avaliações', href: '#avaliacoes' },
  { label: 'Pós-obra', href: '#pos-obra' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contato', href: '#contato' },
];
