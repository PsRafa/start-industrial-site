# Start Industrial — Landing Page

Site institucional da Start Industrial (sistemas de motobombas e painéis de comando,
Itajaí/SC). Uma página só, com scroll storytelling — headline em máscara animada, cinco
famílias de produto, carrossel horizontal com "pin" nos 11 sistemas, tabela de seleção por
aplicação, seção institucional com parallax e revelação de palavras, e contato direto por
WhatsApp.

**Origem**: este site foi desenhado numa ferramenta visual de design e exportado como site
estático. `index.html` contém o template + a lógica do componente; `support.js` é o runtime
gerado pela plataforma (**não editar à mão** — ele carrega React/ReactDOM/Babel do CDN
unpkg.com em tempo de execução pra interpretar o componente).

## Como ver localmente

Precisa de um servidor (não abre direto como `file://`, porque busca `support.js` via fetch):

```
npx serve .
```

## Como publicar

```
git add -A
git commit -m "..."
git push origin main
```

GitHub Pages já está ativo (branch `main`, pasta raiz) — publica sozinho a cada push:
**https://psrafa.github.io/start-industrial-site/**

## Estrutura

```
index.html                    template + dados dos 11 produtos/5 famílias (editar aqui)
support.js                    runtime gerado pela ferramenta de design — não editar à mão
assets/logo.png / logo-white.png    logo oficial (versão escura e branca)
assets/star.png / star-white.png    marca-d'água da estrela
assets/produtos/*.png         fotos reais de produto (fundo transparente)
assets/fachada-fabrica.jpeg   foto real da fábrica
assets/whatsapp.svg           ícone do WhatsApp
assets/catalogo/*.pdf         catálogo completo em PDF (não linkado no design atual)
legal/politica-de-privacidade.html   página avulsa, fora do design (não referenciada no
                                      layout atual — o site não tem formulário coletando
                                      dados, só links diretos pro WhatsApp)
tools/screenshot*.js          scripts Playwright pra testar visualmente antes de publicar
                               (rodar depois de qualquer mudança — ver seção abaixo)
```

## ⚠️ Sempre testar visualmente antes de reportar como pronto

Esse site usa técnicas de scroll (pin horizontal nos produtos, parallax, revelação de
palavras) que dependem de JavaScript calculando a posição de rolagem. Um erro nisso já
causou seções inteiras "sumirem" em versões anteriores do site. Antes de publicar qualquer
mudança:

```
npx serve . -p 8802     # num terminal
node tools/screenshot_dc.js       # noutro — tira print desktop com/sem rolar, testa o modal
node tools/screenshot_dc_mobile.js   # print mobile
```

Os prints vão pra `tools/shots/`. Olhar os dois (`dc_no_scroll.png`
e `dc_after_scroll.png`) — o espaço em branco grande no meio do `dc_no_scroll.png` é
esperado (é a "pista" de rolagem do carrossel com pin) e só desaparece depois de rolar de
verdade, o que é normal pra essa técnica.

## Pendências / pontos de atenção

- [ ] O footer do design atual **não linka** a Política de Privacidade nem o catálogo em
      PDF. Se quiser esses links visíveis no site, editar `index.html` diretamente.
- [ ] Console do navegador mostra um erro não-fatal (`TypeError` em `componentDidUpdate`,
      "reading 'filter'") vindo do runtime `support.js` durante a transição de streaming —
      não afeta o que é renderizado (testado com Playwright, com e sem rolagem), mas é do
      runtime gerado, não dá pra corrigir editando `index.html`.
- [ ] Horário de atendimento não aparece no site atual (o design não tem esse campo).
- [ ] CNPJ não está no catálogo, não aparece no site.

## Dados reais usados (vieram do catálogo oficial 2026)

Telefone/WhatsApp (47) 9 9151-4600, Instagram @start.industrial, endereço Rua Max, 200 —
São João, Itajaí/SC, os 11 sistemas em 5 famílias (StartFlow, StartPress, StartFire,
StartDrain, Construction) com ficha técnica completa, e as fotos reais de cada produto.
