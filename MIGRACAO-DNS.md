# Migração do site para a Vercel — passo a passo para o administrador

**Site novo (já no ar, para conferência):** https://srsdalimpeza.vercel.app
**Domínio final:** srsdalimpeza.com.br

---

## Resposta curta: muda só o DNS?

**Sim.** O registro do domínio no Registro.br não muda de dono nem de registrador, e os
nameservers também **não precisam mudar**. O que muda são **dois registros dentro da zona
de DNS**: o do domínio raiz e o do `www`.

O que descobri sobre a configuração atual:

| Item | Situação hoje | Muda? |
|---|---|---|
| Registrador | Registro.br (domínio `.com.br`) | Não |
| Nameservers | `ns-cloud-c1..c4.googledomains.com` → **Google Cloud DNS** | Não |
| Onde o DNS é editado | Console do **Google Cloud → Network Services → Cloud DNS** | — |
| `srsdalimpeza.com.br` (A) | `34.139.152.124` (servidor Apache no Google Cloud) | **Sim** |
| `www` (CNAME) | aponta para `srsdalimpeza.com.br` | **Sim** |
| **MX (e-mail)** | **não existe nenhum** | **Não mexer** |
| TXT `google-site-verification` | existe (Search Console) | **Não apagar** |

> **Sobre e-mail:** o domínio **não tem registros MX**, ou seja, hoje não recebe e-mail
> nele. O contato da empresa é Gmail (`srsdalimpeza@gmail.com`). Então a troca **não
> derruba e-mail nenhum**. Ainda assim, confirme com o cliente antes: se alguém usa
> `contato@srsdalimpeza.com.br`, isso precisa ser resolvido antes da virada.

> **Sobre o TXT de verificação do Google:** existe um registro
> `google-site-verification=4xIOgfwoO04O73APMsZsoLMM20T3i4kdh_T7AFTYVso`.
> **Mantenha esse registro.** Apagá-lo faz a empresa perder a verificação no Search Console.

---

## Ordem recomendada

A ordem importa: fazendo nesta sequência, o site nunca fica fora do ar.

```
1. Adicionar o domínio na Vercel        (site antigo continua no ar)
2. Baixar o TTL do DNS para 300s        (24h antes da virada)
3. Trocar os 2 registros no Cloud DNS   (a virada acontece aqui)
4. Conferir HTTPS e redirects
5. Search Console + Google Meu Negócio
6. Desligar o servidor antigo           (só depois de 1 semana)
```

---

## Passo 1 — Adicionar o domínio na Vercel

Feito por quem tem acesso à conta Vercel (projeto **srsdalimpeza**, time `ghcastellano`).

1. Acesse https://vercel.com/gustavo-s/srsdalimpeza/settings/domains
2. Em **Add Domain**, digite `srsdalimpeza.com.br` e confirme.
3. Quando perguntar como tratar o `www`, escolha a opção que
   **redireciona `www` para o domínio sem www** (`srsdalimpeza.com.br`).
   Isso evita conteúdo duplicado no Google.
4. A Vercel vai mostrar uma tela **"Invalid Configuration"** com os registros DNS
   necessários. **Anote exatamente os valores que aparecerem ali.**

> ⚠️ **Use os valores que a Vercel mostrar na sua tela, não os de tutoriais antigos.**
> A Vercel mudou os IPs e hostnames ao longo do tempo e o valor correto varia por
> projeto e região. Historicamente eram `76.76.21.21` (A) e `cname.vercel-dns.com`
> (CNAME); projetos novos costumam receber `216.198.79.1` e um hostname regional
> como `xxxxx.vercel-dns.com`. **A tela do painel é a fonte da verdade.**

### Variável de ambiente (importante para o SEO)

Ainda na Vercel, em **Settings → Environment Variables**, adicione:

| Name | Value | Environments |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://srsdalimpeza.com.br` | Production |

Depois clique em **Redeploy** no último deploy de produção.

Isso faz o site publicar o domínio próprio em: canonical, sitemap.xml, robots.txt,
Open Graph e em todo o schema.org. **Sem isso, o Google continua vendo o site como
`srsdalimpeza.vercel.app`** e a autoridade não migra. Já está preparado no código —
é só definir a variável, nada precisa ser alterado em arquivo.

---

## Passo 2 — Baixar o TTL (fazer 24h antes)

No Google Cloud DNS, abra a zona de `srsdalimpeza.com.br` e altere o **TTL** dos
registros `A` (raiz) e `CNAME` (www) para **300 segundos**.

Sem isso, provedores de internet podem continuar mandando visitantes para o servidor
antigo por até 6 horas depois da virada. Com TTL de 300s, a troca propaga em minutos.

Espere o tempo do TTL antigo (21600s = 6h) passar antes de seguir para o passo 3.

---

## Passo 3 — Trocar os registros (a virada)

**Onde:** https://console.cloud.google.com → **Network Services → Cloud DNS** →
zona `srsdalimpeza.com.br`.

Faça as duas alterações abaixo, com os valores que a Vercel mostrou no Passo 1.

### 3.1 — Domínio raiz

| | Antes | Depois |
|---|---|---|
| Nome | `srsdalimpeza.com.br.` | igual |
| Tipo | `A` | `A` |
| TTL | 300 | 300 |
| Valor | `34.139.152.124` | **o IP que a Vercel mostrou** |

### 3.2 — www

| | Antes | Depois |
|---|---|---|
| Nome | `www.srsdalimpeza.com.br.` | igual |
| Tipo | `CNAME` | `CNAME` |
| TTL | 300 | 300 |
| Valor | `srsdalimpeza.com.br.` | **o hostname que a Vercel mostrou** (termina com `.vercel-dns.com.`) |

> No Google Cloud DNS, valores de CNAME precisam terminar com **ponto final**.

### Não mexa em

- O registro **TXT** `google-site-verification=...`
- Os **NS** e o **SOA**
- Qualquer registro que você não reconheça sem antes checar para que serve

---

## Passo 4 — Conferir (10 a 30 minutos depois)

Na Vercel, a tela de Domains deve mudar de "Invalid Configuration" para
**"Valid Configuration"** e o certificado HTTPS é emitido sozinho (Let's Encrypt,
automático e gratuito — não precisa comprar nem instalar nada).

Verifique no navegador ou no terminal:

```bash
# devem responder 200 e com cadeado
https://srsdalimpeza.com.br
https://srsdalimpeza.com.br/higienizacao-de-sofa-guaruja
https://srsdalimpeza.com.br/limpeza-pos-obra-santos

# www deve redirecionar para a versão sem www
curl -sI https://www.srsdalimpeza.com.br | head -3

# a URL antiga da página de estofados deve redirecionar (308)
curl -sI https://srsdalimpeza.com.br/higienizacao-de-estofados-na-baixada-santista | head -3
```

Os redirects do site antigo **já estão programados no projeto** e funcionam sozinhos:

| URL antiga | Vai para |
|---|---|
| `/higienizacao-de-estofados-na-baixada-santista` | `/higienizacao-de-sofa-guaruja` |
| `/limpeza-pos-obra-santos/` | `/limpeza-pos-obra-santos` |
| `/politica-de-privacidade/` | `/politica-de-privacidade` |
| `/wp-admin/*`, `/wp-login.php`, `/xmlrpc.php`, `/feed` | `/` |

---

## Passo 5 — Google (fazer no mesmo dia)

1. **Search Console** — https://search.google.com/search-console
   - Se a propriedade for do tipo "prefixo de URL" com `http://`, adicione também
     `https://srsdalimpeza.com.br`.
   - Em **Sitemaps**, envie: `https://srsdalimpeza.com.br/sitemap.xml`
   - Em **Inspeção de URL**, peça indexação das duas páginas novas de serviço.
     Sem isso o Google pode levar semanas para achá-las; com isso, dias.

2. **Google Meu Negócio** — https://business.google.com
   - Confirme que o site cadastrado é `https://srsdalimpeza.com.br`.

3. **Bing Webmaster Tools** (opcional, 5 minutos) — importa direto do Search Console.

---

## Passo 6 — Desligar o servidor antigo

**Espere pelo menos 7 dias.** Enquanto o DNS termina de propagar no mundo todo, algum
visitante ainda pode cair no IP antigo.

Antes de desligar de vez:

1. **Faça backup completo** do WordPress: arquivos + banco de dados.
2. Guarde o backup por pelo menos 6 meses.
3. Só então desligue a VM no Google Cloud (isso também para de gerar custo).

---

## Se algo der errado: como voltar atrás

A reversão é imediata e sem perda. No Cloud DNS, devolva os dois registros aos valores
originais:

| Registro | Valor original |
|---|---|
| `srsdalimpeza.com.br` (A) | `34.139.152.124` |
| `www.srsdalimpeza.com.br` (CNAME) | `srsdalimpeza.com.br.` |

Com TTL de 300s, o site antigo volta a responder em cerca de 5 minutos. Por isso o
Passo 6 (desligar o servidor antigo) só acontece no fim — enquanto ele estiver de pé,
a volta atrás é sempre possível.

---

## Ficha técnica do projeto

| | |
|---|---|
| Repositório | https://github.com/ghcastellano/srsdalimpeza (branch `main`) |
| Projeto Vercel | `srsdalimpeza` (time `gustavo-s` / `ghcastellano`) |
| Stack | Next.js 16 · React 19 · Tailwind · TypeScript |
| Deploy | Automático a cada push na `main` |
| HTTPS | Automático pela Vercel, renovação sozinha |
| Custo de hospedagem | Plano Hobby da Vercel atende este site |
| Páginas | `/` · `/higienizacao-de-sofa-guaruja` · `/limpeza-pos-obra-santos` · `/politica-de-privacidade` |

### Como alterar conteúdo depois

Quase todo o texto do site (telefones, endereço, serviços, avaliações, FAQ) está em
**um único arquivo**: `lib/content.ts`. Editar e dar push na `main` publica sozinho.
O texto das duas páginas de serviço fica em `lib/service-pages.ts`.

### Testes automáticos

```bash
npm run build                 # compila
BASE_URL=http://localhost:3300 node tests/qa.mjs      # funcional + SEO
BASE_URL=http://localhost:3300 node tests/a11y.mjs    # acessibilidade (axe)
BASE_URL=http://localhost:3300 node tests/matrix.mjs  # responsivo, 12 telas
```
