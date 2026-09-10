# Migração — Srs da Limpeza

Atualizado em 10/09/2026. O DNS não foi alterado nesta entrega.

## Situação e critérios de liberação

- Site de conferência: https://srsdalimpeza.vercel.app
- Domínio principal: https://srsdalimpeza.com.br (sem www).
- A Vercel deve servir o domínio raiz e encaminhar www para ele com 308.
- NEXT_PUBLIC_SITE_URL em Production deve ser https://srsdalimpeza.com.br.
- Canonical, sitemap, robots, Open Graph e schema usam o domínio próprio.
- O cabeçalho X-Robots-Tag: noindex, follow é restrito a hosts *.vercel.app.
  Não colocar esse bloqueio no domínio próprio. Não bloquear o rastreador
  em robots.txt, pois ele precisa ler o noindex da prévia.

Não autorizar a virada sem validar HTTPS, destinos dos anúncios e conversões.
Trocar hospedagem não apaga automaticamente campanhas ou indexação; alterações
de URLs e conteúdo podem causar oscilações. Não há garantia de posição ou
de ausência de indisponibilidade.

## Rastreamento: integração preparada, validação da conta pendente

O código carrega GTM-KJWZ3WT uma única vez, somente no domínio próprio e após
consentimento. Na prévia/localhost, os eventos ficam apenas no dataLayer local
após aceitar medição; nenhuma tag real do Google é carregada por essa integração.

A inspeção pública do contêiner (versão 204 em 10/09/2026) mostrou:
- Google tag G-9S4463B3RC, Conversion Linker e remarketing AW-11058728475.
- Vários gatilhos dependem dos caminhos antigos, barras finais, IDs de formulário
  do WordPress e textos de botões que não existem mais no novo.
- lead_joinchat na home parece condicionado a clique de link sem filtro de
  WhatsApp. Confirmar no Tag Assistant; não assumir que esse evento é uma venda.
- GT-MRM49PH também era instalado diretamente pelo site antigo. Conferir seus
  destinos antes de adicioná-lo; não duplicar a instalação do mesmo Analytics.

### Contrato dos novos eventos

| Ação | Evento | Parâmetros |
|---|---|---|
| Clique/abertura de WhatsApp | whatsapp_click | contact_method, service_line, contact_placement, page_path |
| Clique em telefone | telephone_click | mesmos parâmetros |
| Formulário → abertura do WhatsApp | whatsapp_click | placement contact_form |
| Nova tentativa de abertura | whatsapp_click | placement contact_form_retry |

service_line é upholstery ou postWork. page_path não inclui query string.
Não enviar nome, telefone do visitante, mensagem, URL completa do WhatsApp
ou valores dos campos ao Analytics. Os links de retorno do formulário são
botões para não expor a mensagem como URL de link à medição automática.

### Antes do DNS, com acesso à conta

1. Inspecionar/publicar os gatilhos correspondentes aos novos eventos no GTM.
2. Rever/remover gatilhos legados que gerariam duplicidade ou falsos contatos.
3. Conferir Consent Mode e as configurações de medição aprimorada do GA4.
4. Validar uma ocorrência por ação no Tag Assistant e GA4 DebugView, sem dados
   pessoais. Testar recusa, aceite, revogação, ambas as linhas de atendimento,
   links e formulário.
5. Conferir quais eventos são ações de conversão do Ads e quais são importados
   do GA4, seus nomes, IDs/rótulos, contagem e status. Não criar uma ação nova
   nem trocar uma conversão principal sem alinhar com o administrador.
6. Exportar URLs finais e sitelinks das campanhas, inclusive pausadas relevantes.
   O sitemap de quatro páginas não prova que todas as campanhas foram cobertas.
   O contêiner também referencia caminhos antigos adicionais; validar se estão
   em uso antes da virada.
7. Confirmar atribuição na conta. Preservar gclid não prova conversão registrada.
   Não clicar em anúncio pago para testar nem enviar mensagem real à empresa.

## URLs preservadas

| Entrada antiga | Resultado no novo |
|---|---|
| / | / (200) |
| /higienizacao-de-estofados-na-baixada-santista/ | /higienizacao-de-sofa-guaruja (redirecionamento permanente) |
| /limpeza-pos-obra-santos/ | /limpeza-pos-obra-santos |
| /politica-de-privacidade/ | /politica-de-privacidade |

Parâmetros como gclid e utm_* devem continuar presentes após todos os saltos.
Repetir a verificação em HTTPS, com e sem www, depois da virada.

## DNS — somente com autorização específica

Observações anteriores (revalidar no dia):
- A do domínio raiz: 34.139.152.124.
- www: CNAME para srsdalimpeza.com.br.
- Nameservers: ns-cloud-c1..c4.googledomains.com.
- O certificado HTTPS do www no servidor antigo apresentou incompatibilidade.
  A configuração de redirecionamento na Vercel não corrige o certificado antigo.
- Não foi encontrado MX na consulta anterior; isso não dispensa confirmar todos
  os serviços e preservar registros com o administrador.

Sequência:
1. Exportar a zona DNS e fazer backup do WordPress (arquivos e banco).
2. Conferir todos os registros atuais, incluindo A, AAAA, CNAME, CAA, TXT e MX.
   Preservar verificações do Google, e-mail, NS/SOA e serviços não envolvidos.
3. Usar os valores de DNS indicados no painel da Vercel para este projeto,
   nunca copiar IPs de tutoriais. Confirmar emissão/validação TLS de ambos
   os hosts; quando possível, provisionar e testar antes da virada.
4. Se reduzir TTL, aguardar pelo menos o TTL anterior antes de trocar destinos.
   TTL menor reduz caches, mas não garante propagação instantânea.
5. Após autorização, alterar apenas os registros necessários para o site.
6. Testar certificado válido, 200/308, ausência de loops, parâmetros, imagens,
   formulários, canonical/sitemap, noindex somente na prévia e rastreamento.
7. Enviar sitemap e inspecionar URLs no Search Console. Acompanhar erros de
   indexação e destinos/conversões no Ads. Não há prazo garantido de indexação.
8. Manter servidor antigo e backups até que logs e verificações confirmem que
   a migração estabilizou. Seu desligamento exige autorização específica.

Reversão: restaurar os valores da zona salvos no backup. Não é instantânea:
caches DNS e certificados podem afetar a recuperação. Manter ambos os ambientes
operacionais durante a janela.

## Origem dos materiais e alterações aprovadas

- Marca completa: public/assets/brand/logo-site-original.webp, copiada de
  Icone-site.webp do .com.br. Arquivo intacto, proporção original, enquadramento
  das margens em CSS e fundo integrado ao cabeçalho claro.
- Favicon: enquadramento do S desse arquivo em SVG, exportado nos tamanhos
  32/96/180/192/512. Não foi criada uma nova letra ou marca por IA.
- Orientação final: manter a imagem institucional ilustrativa das irmãs
  (original-quemsomos.webp, 600 × 600), substituindo o pedido de removê-la.
  quemsomos-4k.webp é uma ampliação conservadora para 3840 × 3840, sem
  recriar rostos ou inventar detalhes. O teste de melhoria generativa foi
  descartado por modificar detalhes; não é usado no site. Next/Image entrega
  tamanhos responsivos em AVIF/WebP com qualidade 75 e cache, mantendo o
  enquadramento original com object-contain. 4K é a resolução ampliada,
  não uma captura nativa com detalhes novos.
- Serviços: imagens serv-higienizacao-de-sofa/colchao/cadeiras/moveis-criancas,
  limpeza-posobra-home e revitalizacao-pisos-home-min, do .com.br.
- Tapetes: carpete-1.webp da galeria antiga; não repetir o cartão antigo que
  usava imagem de colchão para tapetes.
- Impermeabilização: foto enviada em 07/09/2026 às 16:54:44, gotas no sofá.
- Instagram: DUrNh81kccg (post da captura enviada) e DV1wBAzEWu8.
  Prévia local, carregamento por escolha do visitante, iframe oficial e link
  alternativo. Não é um feed automático. Aparência/disponibilidade dependem
  do Instagram. Altura responde apenas à origem oficial e ao iframe esperado.
- Áudio 16:51:35: preferência por preservar imagens do site anterior.

## Desenvolvimento e publicação

Repositório: https://github.com/ghcastellano/srsdalimpeza (privado).
Branch de produção: claude/srsdal-limpeza-site-2ojrd0.
Projeto Vercel: srsdalimpeza, equipe gustavo-s.

Validar build e TypeScript, executar node --test tests/tracking.test.mjs
(Node com suporte a TypeScript stripping, como Node 22.18+), testar no navegador
desktop/mobile e verificar o deploy correspondente ao commit publicado.
Não usar npm audit fix --force indiscriminadamente: há avisos de dependências
preexistentes que devem ser tratados em manutenção separada.
