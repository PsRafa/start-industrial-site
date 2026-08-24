# Start Industrial — Landing Page Institucional

Site institucional estático (HTML/CSS/JS puro, sem build, sem custo) para a Start Industrial —
bombas e sistemas hidráulicos industriais. Feito para evoluir depois em direção a um portal
maior (CRM, BIM, acesso de vendedores, ERP), então a estrutura foi mantida simples e modular
de propósito.

## Como ver localmente

Só abrir `index.html` no navegador, ou rodar um servidor estático simples:

```
npx serve .
```

## Como publicar

```
git add -A
git commit -m "..."
git push origin main
```

O GitHub Pages já está ativo neste repo (branch `main`, pasta raiz) — publica automaticamente
a cada push em: **https://psrafa.github.io/start-industrial-site/**

## ⚠️ Pendências reais (o que ainda precisa de confirmação sua)

- [ ] **Confirmar e-mail comercial**: usei `contato@startindustrial.com.br` (baseado no
      domínio real do catálogo) no formulário, na página de contato e na política de
      privacidade. Se a caixa certa for outra, me fala que eu troco em tudo de uma vez.
- [ ] **Ativar o FormSubmit**: na primeira submissão do formulário, o FormSubmit.co manda
      um e-mail de confirmação pra `contato@startindustrial.com.br` — alguém precisa clicar
      no link de ativação uma vez, senão os envios seguintes não chegam.
- [ ] **Fotos de obra "ao vivo"** (não só produto de catálogo) — a seção Instagram usa as
      fotos de produto do catálogo por enquanto. Se quiser fotos reais de obras/instalações
      lá, é só mandar.
- [ ] **Horário de atendimento** no cartão de contato — ainda placeholder ("Seg a sex, 8h
      às 18h"), ajusta se for diferente.
- [ ] **CNPJ** — não estava no catálogo, não incluí no rodapé. Manda se quiser que apareça.
- [ ] **Política de Privacidade** — texto-base de LGPD, ainda precisa de revisão jurídica
      antes de publicar como documento oficial.

## O que já é 100% real (veio do catálogo em PDF)

- Logo oficial (`assets/start_ind.png`, extraído dos arquivos que você mandou)
- Telefone/WhatsApp: (47) 9 9151-4600
- Endereço: Rua Max, 200 — São João, Itajaí/SC
- Instagram: @start.bombas
- As 6 categorias de produto, com descrição e "Aplicações" reais (`js/main.js`, array `PRODUTOS`)
- Fotos reais de cada categoria de produto (`assets/produtos/`, extraídas do PDF)
- Foto real da fachada da fábrica, usada no hero (`assets/fachada-fabrica.jpeg`)
- Texto de "Sobre nós" e "Portfólio" (seção `#sobre`)
- Catálogo em PDF completo, disponível pra download direto no site
  (`assets/catalogo/catalogo-start-industrial.pdf`)

## Estrutura

```
index.html                          página única
css/styles.css                      todo o estilo
js/main.js                          carrossel, modal, grid do Instagram, marquee, menu mobile
legal/politica-de-privacidade.html
assets/start_ind.png                logo oficial
assets/fachada-fabrica.jpeg         foto real da fábrica (usada no hero)
assets/produtos/*.jpeg              fotos reais de cada categoria (extraídas do catálogo)
assets/catalogo/*.pdf               catálogo completo pra download
tools/extract_catalog_images.py     script usado pra extrair as fotos do PDF — reaproveitar
                                     se o catálogo for atualizado no futuro
```

## Formulário de orçamento

Usa [FormSubmit](https://formsubmit.co) (gratuito, sem cadastro, sem backend) para receber
os dados por e-mail, incluindo o anexo de projeto (PDF/DWG/imagem). Zero custo.

## Toques de UX/UI adicionados

- Marquee contínuo com os setores atendidos (dado real, extraído das "Aplicações" do catálogo)
- Grid de "posts" estilo Instagram com as fotos reais, linkando pro perfil @start.bombas
- Parallax sutil na foto do hero ao rolar (desativa automaticamente se o visitante tem
  "reduzir movimento" ativado no sistema)
- Hover com zoom sutil nos cards de produto
- Modal de produto com foto real + bloco de "Aplicações"
