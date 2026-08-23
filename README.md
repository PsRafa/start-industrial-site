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

## Como publicar (grátis)

Recomendado: GitHub Pages ou Vercel (import direto do repo, sem configuração).

```
git init
git add .
git commit -m "landing page institucional Start Industrial"
gh repo create start-industrial-site --public --source=. --push
```

Depois, ativar GitHub Pages nas configurações do repo (branch `main`, pasta raiz),
ou importar o repo na Vercel.

## ⚠️ Pendências antes de publicar de verdade (dados de exemplo usados)

- [ ] **Número de WhatsApp real do Erick** — hoje está como placeholder
      `5500000000000` em `index.html` (4 ocorrências: header, hero, seção
      de contato, botão flutuante).
- [ ] **E-mail comercial real** — hoje `comercial@startindustrial.com.br`
      (placeholder) em `index.html` (action do formulário + info de contato)
      e em `legal/politica-de-privacidade.html`.
- [ ] **Ativar o FormSubmit**: na primeira submissão do formulário, o
      FormSubmit.co manda um e-mail de confirmação para o endereço
      configurado — é preciso clicar no link de ativação uma vez, senão
      os envios seguintes não chegam.
- [ ] **Catálogo real de produtos** — o carrossel (`js/main.js`, array
      `PRODUTOS`) está com 6 categorias genéricas de bomba industrial
      como exemplo. Me manda a lista real (nome, descrição curta, e se
      tiver, foto de cada linha) que eu troco.
- [ ] **Fotos reais** — hero, seção "Obras e equipamentos" (`#galeria`)
      e miniaturas do carrossel estão com placeholders visuais (SVG/gradiente),
      não fotos. Pedir pro Erick/Daniel; troco por `<img>` assim que tiver.
- [ ] **Logo oficial** — recriei o logo em SVG a partir da imagem que você
      mandou (aproximação, não é o arquivo vetorial original). Se você tiver
      o `.svg`/`.ai` oficial da marca, me manda que eu substituo em
      `index.html` (2 ocorrências: header e rodapé) — fica mais fiel.
- [ ] **Textos institucionais** (missão, visão, valores, "quem somos",
      números do hero tipo "+00 anos de experiência") estão marcados com
      `<em>(ajustar)</em>` — são só placeholders de estrutura.
- [ ] **CNPJ e endereço** no rodapé — placeholder.
- [ ] **Política de Privacidade** (`legal/politica-de-privacidade.html`) —
      texto-base de LGPD, precisa de revisão jurídica antes de publicar oficialmente.

## Estrutura

```
index.html                        página única
css/styles.css                    todo o estilo (paleta teal da marca)
js/main.js                        carrossel de produtos, modal, menu mobile
legal/politica-de-privacidade.html
assets/favicon.svg
```

## Formulário de orçamento

Usa [FormSubmit](https://formsubmit.co) (gratuito, sem cadastro, sem backend)
para receber os dados por e-mail, incluindo o anexo de projeto (PDF/DWG/imagem).
Zero custo, zero infraestrutura pra manter.
