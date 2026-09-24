document.getElementById("year").textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ---------------------------------------------------------------------
// Header: transparente no topo, sólido ao rolar
// ---------------------------------------------------------------------
const header = document.getElementById("siteHeader");
function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 40);
}
updateHeader();
window.addEventListener("scroll", updateHeader, { passive: true });

// ---------------------------------------------------------------------
// Menu mobile
// ---------------------------------------------------------------------
const navToggle = document.getElementById("navToggle");
const mobileNav = document.getElementById("mobileNav");
navToggle.addEventListener("click", () => mobileNav.classList.toggle("open"));
mobileNav.querySelectorAll("a").forEach((a) =>
  a.addEventListener("click", () => mobileNav.classList.remove("open"))
);

// ---------------------------------------------------------------------
// Ícones vetoriais próprios por família — identidade gráfica sem
// depender de fotografia
// ---------------------------------------------------------------------
const ICONS = {
  startflow: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="2" y="14" width="6" height="8" rx="1"/><rect x="16" y="2" width="6" height="8" rx="1"/><path d="M8 18h5a3 3 0 003-3V9"/><path d="M13 6l3 3 3-3"/></svg>`,
  startpress: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="13" r="8"/><path d="M12 13L16 8"/><path d="M8 13a4 4 0 018 0"/><path d="M12 3v2M4 13H2M22 13h-2"/></svg>`,
  startfire: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M12 21c4 0 6-3 6-6.5 0-2-1-3.5-2-5 0 2-1 3-2 2 .5-3-1-5-3-6.5-.5 3-2 4-3 6-1.5 2-2 3.5-2 5.5C6 18 8 21 12 21z"/></svg>`,
  startdrain: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 4h18l-7 8v6l-4 2v-8z"/></svg>`,
  construction: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 21V9l8-6 8 6v12"/><path d="M4 21h16M9 21v-6h6v6"/></svg>`
};

// ---------------------------------------------------------------------
// Dados — extraídos do catálogo oficial (Catálogo Start Industrial 2026)
// ---------------------------------------------------------------------
const FAMILIAS = [
  { slug: "startflow", nome: "StartFlow", funcao: "Repõe água em reservatórios. Comando por nível.", count: 3 },
  { slug: "startpress", nome: "StartPress", funcao: "Acompanha o consumo e controla a pressão da rede.", count: 3 },
  { slug: "startfire", nome: "StartFire", funcao: "Atende à demanda da rede preventiva de incêndio.", count: 2 },
  { slug: "startdrain", nome: "StartDrain", funcao: "Retira líquido acumulado. A versão ETE bombeia efluentes.", count: 2 },
  { slug: "construction", nome: "Construction", funcao: "Pressuriza a rede provisória da obra.", count: 1 }
];

const PRODUTOS = [
  {
    familia: "startflow", num: "01", pagina: "04 de 17",
    nome: "StartFlow H Compact", subtitulo: "Horizontal multiestágio · painel de comando",
    img: "assets/produtos/sistemas-recalque.jpeg",
    overview: "Transfere água entre reservatórios com motobombas horizontais e painel de comando. A reposição do reservatório de destino é automática.",
    operacao: "O nível do reservatório solicita a partida e o painel aciona a bomba selecionada. Em conjuntos com principal e reserva, o revezamento alterna a unidade em serviço; a reserva não compõe a vazão de operação normal.",
    dados: [["Bomba", "Centrífuga horizontal multiestágio"], ["Acionamento", "Painel; partida direta na referência"], ["Controle", "Nível do reservatório"], ["Arranjo", "Base, coletores, registros e retenções"], ["Interface", "Dispositivos de nível da instalação"]],
    aplicacao: "Água limpa entre cisterna e reservatório superior, reservatórios intermediários e outros pontos de armazenamento compatíveis.",
    nota: "A adequação depende da curva da bomba e das condições da instalação"
  },
  {
    familia: "startflow", num: "02", pagina: "05 de 17",
    nome: "StartFlow Plus V", subtitulo: "Vertical multiestágio · inversor na motobomba",
    img: "assets/produtos/sistemas-recalque.jpeg",
    overview: "Recalque entre reservatórios com bombas verticais multiestágio e inversor dedicado instalado em cada motobomba.",
    operacao: "A solicitação de abastecimento determina a operação do conjunto. O inversor aciona o motor e ajusta a velocidade conforme a programação, com rampas de partida e parada definidas no projeto.",
    dados: [["Bomba", "Centrífuga vertical multiestágio"], ["Acionamento", "Inversor dedicado por motobomba"], ["Controle", "Nível, com acionamento eletrônico"], ["Ajustes", "Rampas de partida e parada, velocidade"], ["Arranjo", "Base, interligações, registros e retenções"]],
    aplicacao: "Água limpa em edifícios e instalações que utilizam bombas verticais com acionamento junto às unidades de bombeamento.",
    nota: "Revezamento, reserva e operação simultânea conforme a composição do modelo"
  },
  {
    familia: "startflow", num: "03", pagina: "06 de 17",
    nome: "StartFlow Prime V", subtitulo: "Vertical multiestágio · inversor no painel",
    img: "assets/produtos/sistemas-recalque.jpeg",
    overview: "Recalque com bombas verticais multiestágio e inversor no painel de comando, para aplicações que preveem capacidade combinada de bombeamento.",
    operacao: "O controle recebe a demanda de abastecimento e coordena a entrada das unidades necessárias. A linha Prime admite soma de vazões das bombas em operação, consideradas na mesma altura manométrica.",
    dados: [["Bomba", "Centrífuga vertical multiestágio"], ["Acionamento", "Inversor ou inversores no painel"], ["Controle", "Nível, coordenado no painel"], ["Vazão", "Somável na mesma altura manométrica"], ["Coletores", "Compatíveis com a operação simultânea"]],
    aplicacao: "Transferência entre reservatórios quando se prevê operação conjunta de bombas e concentração dos acionamentos no painel.",
    nota: "A ficha do modelo informa bombas em operação, reserva e quantidade de inversores"
  },
  {
    familia: "startpress", num: "04", pagina: "07 de 17",
    nome: "StartPress H Compact", subtitulo: "Horizontal multiestágio · inversor na motobomba",
    img: "assets/produtos/pressurizacao-direta-indireta.jpeg",
    overview: "Pressurização com bombas horizontais multiestágio e inversores fixados nas motobombas. O controle acompanha a pressão da rede.",
    operacao: "A queda de pressão provocada pelo consumo aumenta a rotação até recuperar o valor ajustado; com menor demanda, a velocidade reduz. Em conjuntos com várias bombas, revezamento e apoio seguem a configuração.",
    dados: [["Bomba", "Centrífuga horizontal multiestágio"], ["Acionamento", "Inversor fixado na motobomba"], ["Controle", "Pressão da rede"], ["Arranjo", "Base, interligações, bloqueio e retenção"], ["Acessórios", "Vaso de pressão e coxins quando na composição"]],
    aplicacao: "Redes residenciais, comerciais e áreas comuns atendidas pela faixa hidráulica das bombas horizontais. A construção favorece locais com limitação de altura.",
    nota: "A função de repouso depende dos recursos do inversor e da programação"
  },
  {
    familia: "startpress", num: "05", pagina: "08 de 17",
    nome: "StartPress Plus V", subtitulo: "Vertical multiestágio · inversor na motobomba",
    img: "assets/produtos/pressurizacao-direta-indireta.jpeg",
    overview: "Pressurização com bombas verticais multiestágio e acionamento individual por inversor dedicado em cada motobomba.",
    operacao: "O controle compara a pressão medida com o valor ajustado e modula a velocidade. Se uma bomba não atende à demanda, as unidades de apoio entram de forma escalonada. A reserva fica fora do cálculo da capacidade em operação normal.",
    dados: [["Bomba", "Centrífuga vertical multiestágio"], ["Acionamento", "Inversor dedicado por motobomba"], ["Controle", "Pressão, por unidade"], ["Coordenação", "Entrada escalonada e revezamento"], ["Arranjo", "Coletores, base, registros e retenções"]],
    aplicacao: "Edifícios, condomínios e redes com consumo variável, conforme o ponto hidráulico e a configuração de operação.",
    nota: "A localização dos inversores diferencia esta versão da Prime V"
  },
  {
    familia: "startpress", num: "06", pagina: "09 de 17",
    nome: "StartPress Prime V", subtitulo: "Vertical multiestágio · inversor no painel",
    img: "assets/produtos/pressurizacao-direta-indireta.jpeg",
    overview: "Pressurização com bombas verticais multiestágio e acionamento por inversor no painel, reunindo os acionamentos previstos em um só gabinete.",
    operacao: "O controle recebe a pressão medida e ajusta a velocidade de bombeamento. A arquitetura elétrica define a participação de cada bomba, o revezamento e as unidades de apoio.",
    dados: [["Bomba", "Centrífuga vertical multiestágio"], ["Acionamento", "Inversor ou inversores no painel"], ["Controle", "Pressão, concentrado no painel"], ["Painel", "Proteções e comando conforme o modelo"], ["Arranjo", "Base, coletores, registros e retenções"]],
    aplicacao: "Edifícios e instalações em que os acionamentos devem ser reunidos no painel, conforme a potência ou a lógica operacional exigida.",
    nota: "O inversor no painel não implica maior pressão, vazão ou eficiência que a Plus V"
  },
  {
    familia: "startfire", num: "07", pagina: "10 de 17",
    nome: "StartFire EEJ", subtitulo: "Duas elétricas e uma jockey · comando por pressão",
    img: "assets/produtos/combate-incendio.jpeg",
    overview: "Conjunto para a rede hidráulica de combate a incêndio com duas motobombas elétricas em principal e reserva, e uma bomba jockey.",
    operacao: "A jockey recompõe pequenas quedas de pressão em repouso. Quando a rede exige vazão de combate, o comando aciona a bomba principal; a reserva atua segundo a lógica do sistema preventivo.",
    dados: [["Composição", "Duas elétricas de incêndio e uma jockey elétrica"], ["Bombas", "Horizontais, inclusive a jockey"], ["Controle", "Pressão da rede preventiva"], ["Painel", "Aço carbono, manômetro e comando por pressão"], ["Arranjo", "Base metálica e interligações identificadas em vermelho"]],
    aplicacao: "Redes hidráulicas de combate a incêndio previstas no projeto preventivo, com alimentação elétrica compatível com a configuração.",
    nota: "A jockey não atende à vazão de combate"
  },
  {
    familia: "startfire", num: "08", pagina: "11 de 17",
    nome: "StartFire EDJ", subtitulo: "Elétrica, diesel e jockey · comando por pressão",
    img: "assets/produtos/combate-incendio.jpeg",
    overview: "Conjunto para combate a incêndio com motobomba elétrica, unidade acionada por motor diesel e bomba jockey.",
    operacao: "A jockey mantém a pressão em repouso e a demanda de incêndio aciona as unidades de combate na sequência prevista. Na configuração principal elétrica e reserva diesel, a reserva atende ao ponto hidráulico exigido para sua função.",
    dados: [["Composição", "Uma elétrica, uma diesel e uma jockey elétrica"], ["Bombas", "Disposição horizontal"], ["Controle", "Pressão da rede preventiva"], ["Diesel", "Bateria, combustível, refrigeração e exaustão conforme escopo"], ["Arranjo", "Base, registros, retenções e interligações identificadas"]],
    aplicacao: "Redes preventivas com solução de reserva por motor a combustão, conforme a concepção do projeto.",
    nota: "A unidade diesel depende de seus próprios sistemas de partida e operação"
  },
  {
    familia: "startdrain", num: "09", pagina: "12 de 17",
    nome: "StartDrain", subtitulo: "Submersível · comando conforme nível de acúmulo",
    img: "assets/produtos/estacoes-elevatorias.jpeg",
    overview: "Bombeamento para retirada de água acumulada em poços, caixas e pontos de drenagem. Nas configurações submersíveis, a bomba opera no líquido.",
    operacao: "O líquido acumulado eleva o nível e solicita a partida; a bomba descarrega até o nível de parada programado. Com mais de uma unidade, pode haver revezamento e apoio por nível elevado.",
    dados: [["Bomba", "Submersível, conforme o líquido e os sólidos"], ["Motor", "Cabo e vedação para as condições de submersão"], ["Controle", "Nível de acúmulo"], ["Painel", "Dispositivos de nível conforme a lógica"], ["Descarga", "Tubulação, retenções e registros conforme o fornecimento"]],
    aplicacao: "Poços de drenagem, subsolos, garagens, caixas de coleta e contenção de águas compatíveis com a bomba selecionada.",
    nota: "A adequação depende do fluido, da altura de descarga e dos sólidos presentes"
  },
  {
    familia: "startdrain", num: "10", pagina: "13 de 17",
    nome: "StartDrain ETE", subtitulo: "Compatível com o efluente · comando por nível e processo",
    img: "assets/produtos/estacoes-elevatorias.jpeg",
    overview: "Conjunto para elevatórias e etapas de transferência de efluentes em instalações de tratamento.",
    operacao: "O comando solicita o bombeamento conforme o nível e as condições do processo, transferindo o efluente até o ponto de destino previsto. Revezamento e intertravamentos são definidos para a instalação.",
    dados: [["Bomba", "Submersível ou configuração específica"], ["Hidráulica", "Rotor, passagem de sólidos e vedação conforme a aplicação"], ["Controle", "Nível e condições do processo"], ["Painel", "Dispositivos de nível ou interfaces de processo"], ["Arranjo", "Uma unidade ou principal e reserva"]],
    aplicacao: "Elevatórias sanitárias e transferências de efluentes associadas à ETE, compatíveis com a bomba e a etapa de processo selecionadas.",
    nota: "A designação ETE não define, sozinha, trituração ou passagem de sólidos"
  },
  {
    familia: "construction", num: "11", pagina: "14 de 17",
    nome: "StartPress Construction", subtitulo: "Inversor dedicado · controle de pressão",
    img: "assets/produtos/pressurizadores-obra.jpeg",
    overview: "Pressurização para o abastecimento provisório de água durante a execução da obra, alimentando pontos de utilização em diferentes níveis.",
    operacao: "O consumo provoca queda de pressão e o controle aumenta a velocidade da bomba até recuperar o valor ajustado; com menor demanda, reduz a rotação e pode realizar a parada programada.",
    dados: [["Bomba", "Centrífuga horizontal multiestágio, água limpa"], ["Acionamento", "Inversor dedicado"], ["Controle", "Pressão, no próprio inversor"], ["Painel", "Sem painel de partida dedicado na referência"], ["Acessórios", "Vaso de pressão quando previsto na composição"]],
    aplicacao: "Rede provisória de água limpa, abastecimento de pavimentos e frentes de trabalho durante a construção.",
    nota: "Alterações de altura, tubulação ou pontos de consumo exigem nova verificação"
  }
];

const SELECAO = [
  ["StartFlow H Compact", "Reposição de reservatórios", "Nível", "Painel, partida direta", "Cisterna e reservatório superior"],
  ["StartFlow Plus V", "Reposição de reservatórios", "Nível", "Inversor na bomba", "Instalações com bombas verticais"],
  ["StartFlow Prime V", "Reposição com operação conjunta", "Nível", "Inversor no painel", "Quando se prevê soma de vazões"],
  ["StartPress H Compact", "Pressão da rede", "Pressão", "Inversor na bomba", "Locais com limitação de altura"],
  ["StartPress Plus V", "Pressão da rede", "Pressão", "Inversor por unidade", "Edifícios com consumo variável"],
  ["StartPress Prime V", "Pressão da rede", "Pressão", "Inversor no painel", "Acionamentos reunidos no painel"],
  ["StartFire EEJ", "Demanda de incêndio", "Pressão", "Duas elétricas e jockey", "Rede preventiva com reserva elétrica"],
  ["StartFire EDJ", "Demanda de incêndio", "Pressão", "Elétrica, diesel e jockey", "Reserva por motor a combustão"],
  ["StartDrain", "Água acumulada", "Nível de acúmulo", "Submersível", "Poços, subsolos e garagens"],
  ["StartDrain ETE", "Efluentes", "Nível e processo", "Conforme o efluente", "Elevatórias sanitárias e ETE"],
  ["StartPress Construction", "Pressurização provisória", "Pressão", "Inversor dedicado", "Rede provisória de obra"]
];

// ---------------------------------------------------------------------
// As cinco famílias
// ---------------------------------------------------------------------
const familiasGrid = document.getElementById("familiasGrid");
if (familiasGrid) {
  familiasGrid.innerHTML = FAMILIAS.map(
    (f) => `
    <div class="familia-card" data-familia="${f.slug}">
      <div class="familia-icon">${ICONS[f.slug]}</div>
      <span class="familia-count">${f.count} sistema${f.count > 1 ? "s" : ""}</span>
      <h3>${f.nome}</h3>
      <p>${f.funcao}</p>
    </div>`
  ).join("");
  familiasGrid.querySelectorAll(".familia-card").forEach((card) => {
    card.addEventListener("click", () => {
      const tab = document.querySelector(`.catalogo-tab[data-familia="${card.dataset.familia}"]`);
      if (tab) tab.click();
      document.getElementById("produtos").scrollIntoView({ behavior: "smooth" });
    });
  });
}

// ---------------------------------------------------------------------
// Catálogo — abas por família + lista técnica em acordeão
// ---------------------------------------------------------------------
const catalogoTabs = document.getElementById("catalogoTabs");
const produtoList = document.getElementById("produtoList");

function renderTabs(activeSlug) {
  const all = [{ slug: "todos", nome: "Todos" }, ...FAMILIAS];
  catalogoTabs.innerHTML = all
    .map(
      (f) =>
        `<button class="catalogo-tab${f.slug === activeSlug ? " active" : ""}" data-familia="${f.slug}">${f.nome}</button>`
    )
    .join("");
  catalogoTabs.querySelectorAll(".catalogo-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      renderTabs(btn.dataset.familia);
      renderList(btn.dataset.familia);
    });
  });
}

function renderList(filterSlug) {
  const list = filterSlug === "todos" ? PRODUTOS : PRODUTOS.filter((p) => p.familia === filterSlug);
  produtoList.innerHTML = list
    .map(
      (p) => `
    <div class="produto-row" data-num="${p.num}">
      <button class="produto-row-head">
        <span class="produto-num">${p.num}</span>
        <span class="produto-name-wrap">
          <span class="produto-name">${p.nome}</span>
          <span class="produto-tagline">${p.subtitulo}</span>
        </span>
        <span class="produto-toggle"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 5v14M5 12h14"/></svg></span>
      </button>
      <div class="produto-panel">
        <div class="produto-panel-inner">
          <div class="produto-icon-wrap">
            <div class="produto-icon">${ICONS[p.familia]}</div>
          </div>
          <div class="produto-body">
            <p class="overview">${p.overview}</p>
            <p class="op-label">Operação</p>
            <p class="op-text">${p.operacao}</p>
            <dl class="spec-table">
              ${p.dados.map(([k, v]) => `<div class="spec-row"><dt>${k}</dt><dd>${v}</dd></div>`).join("")}
            </dl>
            <p class="produto-app-label">Aplicação</p>
            <p class="produto-app-text">${p.aplicacao}</p>
            <p class="produto-note">${p.nota}</p>
          </div>
        </div>
      </div>
    </div>`
    )
    .join("");

  produtoList.querySelectorAll(".produto-row-head").forEach((head) => {
    head.addEventListener("click", () => {
      const row = head.closest(".produto-row");
      const wasOpen = row.classList.contains("open");
      produtoList.querySelectorAll(".produto-row.open").forEach((r) => r.classList.remove("open"));
      if (!wasOpen) row.classList.add("open");
    });
  });
}

if (catalogoTabs && produtoList) {
  renderTabs("todos");
  renderList("todos");
}

// ---------------------------------------------------------------------
// Tabela de seleção por aplicação
// ---------------------------------------------------------------------
const selecaoBody = document.getElementById("selecaoBody");
if (selecaoBody) {
  selecaoBody.innerHTML = SELECAO.map(
    (row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`
  ).join("");
}

// ---------------------------------------------------------------------
// Instagram — grade de tiles com a identidade gráfica (ícones das
// famílias), sem depender de fotografia
// ---------------------------------------------------------------------
const igGrid = document.getElementById("igGrid");
if (igGrid) {
  const slugs = [
    "startflow", "startpress", "startfire", "startdrain", "construction",
    "startflow", "startpress", "startfire", "startdrain", "construction", "startflow", "startpress"
  ];
  igGrid.innerHTML = slugs
    .map(
      (slug) => `
    <a href="https://www.instagram.com/start.industrial/" target="_blank" rel="noopener" class="ig-post">
      <span class="ig-icon">${ICONS[slug]}</span>
      <span class="ig-post-overlay"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 2 .25 2.4.42.6.24 1 .5 1.5 1s.76.9 1 1.5c.17.4.36 1.2.42 2.4.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 2-.42 2.4a4 4 0 01-1 1.5 4 4 0 01-1.5 1c-.4.17-1.2.36-2.4.42-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-2-.25-2.4-.42a4 4 0 01-1.5-1 4 4 0 01-1-1.5c-.17-.4-.36-1.2-.42-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-2 .42-2.4a4 4 0 011-1.5 4 4 0 011.5-1c.4-.17 1.2-.36 2.4-.42C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.52 0-4.76.07-.97.04-1.5.2-1.85.34-.46.18-.8.4-1.15.74-.34.35-.56.69-.74 1.15-.14.35-.3.88-.34 1.85C3.1 8.48 3.1 8.85 3.1 12s0 3.52.06 4.76c.05.97.2 1.5.34 1.85.18.46.4.8.74 1.15.35.34.69.56 1.15.74.35.14.88.3 1.85.34C8.48 20.9 8.85 20.9 12 20.9s3.52 0 4.76-.06c.97-.05 1.5-.2 1.85-.34.46-.18.8-.4 1.15-.74.34-.35.56-.69.74-1.15.14-.35.3-.88.34-1.85.06-1.24.06-1.61.06-4.76s0-3.52-.06-4.76c-.05-.97-.2-1.5-.34-1.85a3 3 0 00-.74-1.15 3 3 0 00-1.15-.74c-.35-.14-.88-.3-1.85-.34C15.52 4 15.15 4 12 4zm0 3.4a4.6 4.6 0 110 9.2 4.6 4.6 0 010-9.2zm0 1.8a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6zm4.8-2a1.08 1.08 0 110 2.16 1.08 1.08 0 010-2.16z"/></svg></span>
    </a>`
    )
    .join("");
}

// ---------------------------------------------------------------------
// Revelação suave ao rolar
// ---------------------------------------------------------------------
if (!prefersReducedMotion) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
  );
  document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));
  setTimeout(() => document.querySelectorAll(".draw-path").forEach((el) => el.classList.add("in-view")), 300);
} else {
  document.querySelectorAll(".reveal, .draw-path").forEach((el) => el.classList.add("in-view"));
}

// ---------------------------------------------------------------------
// Formulário de orçamento — monta a mensagem e abre no WhatsApp
// ---------------------------------------------------------------------
const formOrcamento = document.getElementById("formOrcamento");
if (formOrcamento) {
  formOrcamento.addEventListener("submit", (e) => {
    e.preventDefault();
    const val = (id) => document.getElementById(id).value.trim();

    const linhas = ["Olá! Vim pelo site e gostaria de um orçamento:", "", `Nome: ${val("nome")}`];
    if (val("empresa")) linhas.push(`Empresa: ${val("empresa")}`);
    linhas.push(`WhatsApp: ${val("whatsapp")}`);
    linhas.push(`E-mail: ${val("email")}`);
    if (val("cidade")) linhas.push(`Cidade/UF: ${val("cidade")}`);
    linhas.push(`Sistema de interesse: ${val("tipo")}`);
    if (val("mensagem")) linhas.push("", `Detalhes: ${val("mensagem")}`);

    const texto = encodeURIComponent(linhas.join("\n"));
    window.open(`https://wa.me/5547991514600?text=${texto}`, "_blank", "noopener");
  });
}

// ---------------------------------------------------------------------
// Marquee — duplica o conteúdo pra loop contínuo sem salto
// ---------------------------------------------------------------------
const marquee = document.querySelector(".marquee-track");
if (marquee) {
  marquee.innerHTML += marquee.innerHTML;
}
