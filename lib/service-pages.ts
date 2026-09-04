import type { ServicePageContent } from '@/components/ServicePage';
import { gallery, postWorkGallery } from './content';

const pick = (items: typeof gallery, srcs: string[]) =>
  srcs.map((src) => items.find((item) => item.src.endsWith(src))!).filter(Boolean);

/**
 * Conteúdo próprio de cada landing de serviço. Texto escrito só para estas
 * páginas — repetir a home geraria conteúdo duplicado e as duas competiriam
 * entre si pela mesma busca.
 */
export const upholsteryPage: ServicePageContent = {
  slug: 'higienizacao-de-sofa-guaruja',
  line: 'upholstery',
  serviceName: 'Higienização de sofá e estofados',
  serviceDescription:
    'Higienização profunda de sofás, colchões, poltronas, cadeiras e tapetes com extração, em domicílio, no Guarujá, Santos e Bertioga.',
  eyebrow: 'Higienização de estofados · Guarujá, Santos e Bertioga',
  h1: 'Higienização de sofá que devolve cor, maciez e cheiro de novo.',
  intro:
    'Lavagem com extração em domicílio para sofás, colchões, poltronas, cadeiras e tapetes. Removemos ácaros, fungos, suor e manchas impregnadas sem encharcar o estofado — e você usa o móvel de novo em poucas horas.',
  hero: {
    src: '/assets/photos/sofa-1.webp',
    alt: 'Profissional da Srs da Limpeza higienizando um sofá claro com máquina extratora em uma residência no Guarujá',
  },
  message: 'Olá! Vim pela página de higienização de sofá e quero um orçamento.',
  sections: [
    {
      title: 'Por que o litoral exige higienização mais frequente',
      body: [
        'Maresia, umidade alta e areia formam a combinação que mais castiga estofado na Baixada Santista. A umidade mantém a fibra sempre levemente úmida, o que favorece fungos e o cheiro de mofo; a areia funciona como lixa, desgastando o tecido por dentro a cada vez que alguém senta.',
        'Em casa de praia o problema piora com o uso concentrado: o sofá fica meses fechado e recebe muita gente em poucos fins de semana. Por isso recomendamos higienizar estofados de veraneio a cada 6 meses, e os de uso diário uma vez por ano.',
      ],
    },
    {
      title: 'Como é a lavagem com extração',
      body: [
        'Não é lavagem a seco nem pano úmido. Aplicamos uma solução específica para o tipo de tecido, deixamos agir sobre a sujeira impregnada e então a extratora injeta e suga a água na mesma passada, puxando junto o que estava no fundo da espuma.',
        'É esse retorno de água suja que mostra o que havia ali dentro. Como a sucção retira quase toda a umidade, o estofado não fica encharcado e seca em poucas horas, não em dias.',
      ],
    },
    {
      title: 'Tecidos que atendemos',
      body: [
        'Suede, chenille, linho, veludo, sarja, courino e couro legítimo. Cada um pede produto, pressão e temperatura diferentes — couro, por exemplo, é limpo e hidratado, nunca extraído com água.',
        'Antes de começar, testamos o produto em uma área escondida do móvel. Se o tecido tiver risco de encolher ou desbotar, avisamos antes e propomos outro método.',
      ],
    },
  ],
  includes: [
    { title: 'Aspiração profunda', text: 'Remove areia, poeira e pelos das frestas, costuras e do vão sob os assentos.' },
    { title: 'Pré-tratamento de manchas', text: 'Cada mancha recebe o produto certo: gordura, caneta, urina de pet, café ou sangue.' },
    { title: 'Extração com injeção', text: 'A máquina injeta e suga na mesma passada, tirando a sujeira do fundo da espuma.' },
    { title: 'Odorização', text: 'Neutraliza o odor na origem em vez de mascarar com perfume.' },
    { title: 'Secagem acelerada', text: 'Sucção forte e ventilação: pronto para uso em poucas horas.' },
    { title: 'Impermeabilização opcional', text: 'Camada protetora que repele líquidos e facilita a limpeza do dia a dia.' },
  ],
  steps: [
    { title: 'Envie uma foto pelo WhatsApp', text: 'Com a foto do estofado e o número de lugares já conseguimos passar o valor, sem visita.' },
    { title: 'Agendamos no seu horário', text: 'Vamos até você em Guarujá, Santos, Bertioga, Praia Grande e São Vicente.' },
    { title: 'Higienizamos no local', text: 'Aspiração, pré-tratamento, extração e odorização. O móvel não sai de casa.' },
    { title: 'Você confere antes de pagar', text: 'Mostramos o resultado e a água extraída. Só então fechamos o serviço.' },
  ],
  gallery: pick(gallery, ['sofa-7.webp', 'sofa-1.webp', 'colchao-2.webp', 'poltronas.webp', 'sofa-3.webp', 'cadeiras-3.webp', 'tapete.webp', 'sofa-8.webp']),
  faq: [
    { q: 'Quanto tempo o sofá leva para secar?', a: 'Na maioria dos casos, de 3 a 6 horas. A extração retira quase toda a umidade, então o que sobra evapora rápido. Tecidos mais densos, como veludo, e dias muito úmidos podem levar até 12 horas. Deixar ventilador ligado e janela aberta acelera.' },
    { q: 'Preciso tirar o sofá do lugar ou levar a algum lugar?', a: 'Não. Todo o serviço é feito na sua casa, com a máquina que levamos. Só pedimos um ponto de energia e espaço para circular ao redor do móvel.' },
    { q: 'A higienização tira todas as manchas?', a: 'A maioria sai por completo. Manchas antigas, de tinta, alvejante ou que já desbotaram a fibra podem clarear sem sumir totalmente — nesses casos avisamos antes de começar, para você decidir se vale a pena.' },
    { q: 'É seguro para bebês e pets?', a: 'Sim. Usamos produtos biodegradáveis, sem cheiro forte de química e sem resíduo tóxico. Depois de seco, o estofado pode ser usado normalmente por crianças e animais.' },
    { q: 'Vocês higienizam colchão também?', a: 'Sim, e é um dos serviços mais pedidos. O colchão acumula suor, células de pele e ácaros — as principais causas de rinite e alergia noturna. O processo é o mesmo do sofá.' },
    { q: 'Quanto custa a higienização de um sofá?', a: 'Depende do número de lugares, do tecido e do estado. Envie uma foto pelo WhatsApp e passamos o valor exato na hora, sem compromisso. Aceitamos até 3x sem juros, PIX, dinheiro ou débito.' },
    { q: 'De quanto em quanto tempo devo higienizar?', a: 'Uso diário: uma vez por ano. Casa de praia ou com pets e crianças pequenas: a cada 6 meses. Quem tem alergia respiratória costuma sentir diferença higienizando a cada 6 meses.' },
  ],
};

export const postWorkPage: ServicePageContent = {
  slug: 'limpeza-pos-obra-santos',
  line: 'postWork',
  serviceName: 'Limpeza pós-obra e revitalização de pisos',
  serviceDescription:
    'Limpeza pós-obra residencial e comercial e revitalização de pisos em Santos, Guarujá e Bertioga, com equipamentos industriais e equipe supervisionada.',
  eyebrow: 'Limpeza pós-obra · Santos, Guarujá e Bertioga',
  h1: 'Limpeza pós-obra que entrega o imóvel pronto para morar.',
  intro:
    'Removemos poeira fina, respingos de tinta, gesso, cimento e rejunte sem riscar as superfícies novas. Equipe treinada, equipamentos industriais e supervisão da proprietária do começo ao fim da obra.',
  hero: {
    src: '/assets/photos/pos-obra-hero.webp',
    alt: 'Equipe da Srs da Limpeza, de uniforme, revitalizando o piso de madeira de um apartamento após a obra',
  },
  message: 'Olá! Vim pela página de limpeza pós-obra e quero agendar uma visita técnica.',
  sections: [
    {
      title: 'Faxina e limpeza pós-obra não são a mesma coisa',
      body: [
        'A faxina comum trabalha sobre sujeira solta. O pós-obra trabalha sobre resíduo aderido: nata de cimento no porcelanato, respingo de tinta no vidro, gesso no rodapé, cola de piso, adesivo de esquadria. Nada disso sai com pano e detergente.',
        'Também é a etapa em que mais se estraga acabamento novo. Ácido muriático em porcelanato polido mancha para sempre; espátula errada risca o vidro; produto alcalino demais desbota rejunte. A diferença entre uma equipe treinada e uma diarista é justamente saber o que não usar em cada superfície.',
      ],
    },
    {
      title: 'A poeira que volta três dias depois',
      body: [
        'Toda obra deixa poeira fina em suspensão que assenta aos poucos. Se a limpeza for feita só no chão, em 48 horas tudo está empoeirado de novo e a sensação é de que o serviço não foi feito.',
        'Por isso limpamos de cima para baixo e em duas passadas: primeiro luminárias, teto, ar-condicionado, ventiladores e o topo dos armários; depois paredes, esquadrias e bancadas; o piso é sempre o último. A segunda passada pega o que assentou durante o próprio serviço.',
      ],
    },
    {
      title: 'Revitalização de pisos',
      body: [
        'Quando o piso original foi preservado durante a obra, muitas vezes não é preciso trocar — só recuperar. Fazemos revitalização de madeira, porcelanato, granito, mármore e pisos vinílicos com máquinas industriais e o produto adequado a cada material.',
        'É o serviço que mais surpreende cliente de imóvel antigo em Santos e no Guarujá: um piso de madeira opaco, com anos de marca de móvel, volta a ter uniformidade sem obra nenhuma.',
      ],
    },
  ],
  includes: [
    { title: 'Luminárias e climatização', text: 'Lustres, spots, ar-condicionado e ventiladores de teto limpos por dentro.' },
    { title: 'Rodapés e molduras', text: 'Portas, guarnições, batentes e molduras livres de gesso, massa e tinta.' },
    { title: 'Vidros e esquadrias', text: 'Janelas, soleiras e trilhos sem respingo de tinta nem resíduo de fita.' },
    { title: 'Banheiros e cozinhas', text: 'Louças, metais, box e rejunte higienizados e sem nata de cimento.' },
    { title: 'Armários por dentro', text: 'Gavetas, prateleiras e nichos aspirados e limpos antes da mudança.' },
    { title: 'Tratamento de pisos', text: 'Varrer, aspirar, esfregar e higienizar — com o produto certo para o material.' },
  ],
  steps: [
    { title: 'Visita técnica gratuita', text: 'Avaliamos o imóvel, o tipo de acabamento e o volume de resíduo. Sem custo e sem compromisso.' },
    { title: 'Orçamento com prazo fechado', text: 'Você recebe valor, número de profissionais e quantos dias a equipe fica no local.' },
    { title: 'Execução supervisionada', text: 'A proprietária acompanha a equipe durante todo o período, não só na entrega.' },
    { title: 'Vistoria final com você', text: 'Percorremos o imóvel juntos. O que não estiver certo, refazemos na hora.' },
  ],
  gallery: pick(postWorkGallery, ['posobra-12.webp', 'posobra-9.webp', 'posobra-7.webp', 'posobra-14.webp', 'posobra-13.webp', 'posobra-5.webp', 'posobra-2.webp', 'posobra-3.webp']),
  faq: [
    { q: 'Quanto tempo leva a limpeza pós-obra?', a: 'Um apartamento de 2 dormitórios costuma levar de 1 a 2 dias com equipe de 3 pessoas. Casas, imóveis comerciais e obras com muito resíduo de gesso ou cimento podem levar mais. O prazo é fechado na visita técnica, antes de começar.' },
    { q: 'Vocês usam ácido no piso?', a: 'Nunca em mármore, granito polido ou porcelanato acetinado — o ácido mancha esses materiais de forma irreversível. Trabalhamos com desincrustantes específicos para cada superfície. Ácido só entra onde o fabricante do piso permite.' },
    { q: 'Precisa ter água e luz no imóvel?', a: 'Sim. Nossos equipamentos são elétricos e o serviço consome bastante água. Se a obra ainda estiver sem ligação definitiva, avise na visita para combinarmos a solução.' },
    { q: 'Atendem obra comercial e condomínio?', a: 'Sim. Atendemos residências, hotéis e pousadas, imobiliárias, arquitetos, empreiteiras, condomínios, comércios, escolas e galpões. Emitimos os documentos que o condomínio exigir para liberar a equipe.' },
    { q: 'Quando devo agendar?', a: 'Assim que a última etapa suja terminar — normalmente depois da pintura e da instalação da marcenaria. Agendar com uma semana de antecedência garante a data, principalmente em fim de mês e antes de feriado.' },
    { q: 'O que fazem com o entulho?', a: 'Removemos resíduo de limpeza: poeira, embalagens, restos de fita e adesivo. Entulho de obra pesado, como sacos de massa e restos de alvenaria, é responsabilidade da construtora e deve sair antes da nossa entrada.' },
    { q: 'Qual a diferença para uma diarista?', a: 'Equipamento e treinamento. Usamos extratora, lavadora de alta pressão e enceradeira industrial, e a equipe sabe qual produto pode tocar cada acabamento novo. É o que evita o prejuízo de riscar um vidro ou manchar um porcelanato recém-instalado.' },
  ],
};

export const servicePages = [upholsteryPage, postWorkPage];
