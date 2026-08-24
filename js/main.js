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
// Dados dos produtos (fonte única — usados na galeria em abas e no
// carrossel do Instagram)
// ---------------------------------------------------------------------
const PRODUTOS = [
  {
    num: "01", nome: "Pressurizadores de obra",
    titulo: "Água com pressão certa durante toda a construção",
    desc: "Sistemas provisórios utilizados durante a fase de construção para garantir o fornecimento de água com pressão adequada nos pontos de uso temporários, como mangueiras, lavadoras e equipamentos de limpeza — essenciais em obras verticais, onde a pressão da rede pública não chega aos andares superiores.",
    apps: "Canteiros de obras residenciais, comerciais e industriais, principalmente em edifícios de múltiplos pavimentos.",
    img: "assets/produtos/pressurizadores-obra.jpeg"
  },
  {
    num: "02", nome: "Sistemas de recalque",
    titulo: "Da cisterna até a caixa d'água, sem interrupção",
    desc: "Utilizados em edificações e condomínios, realizam o bombeamento de água de reservatórios inferiores (cisternas) para reservatórios superiores (caixas d'água), assegurando abastecimento contínuo e distribuição uniforme em todos os pontos de consumo.",
    apps: "Prédios residenciais, hotéis, condomínios, hospitais, indústrias e centros comerciais.",
    img: "assets/produtos/sistemas-recalque.jpeg"
  },
  {
    num: "03", nome: "Combate a incêndio",
    titulo: "Água pressurizada pronta pra atuação imediata",
    desc: "Mantêm a água pressurizada disponível para atuação imediata em caso de incêndio. Alimentam redes de hidrantes e sprinklers com vazão e pressão adequadas, assegurando eficácia no combate inicial ao fogo.",
    apps: "Edifícios residenciais e comerciais, indústrias, hospitais, shopping centers, escolas, condomínios e galpões logísticos.",
    img: "assets/produtos/combate-incendio.jpeg"
  },
  {
    num: "04", nome: "Pressurização direta e indireta",
    titulo: "Pressão estável, direto da rede ou via reservatório",
    desc: "Direta: bombeia a água diretamente da rede pública ou do reservatório, garantindo fluxo contínuo e pressão estável. Indireta: usa reservatórios intermediários para equalizar o abastecimento, reduzindo variações de pressão e protegendo tubulação e equipamentos contra sobrecargas.",
    apps: "Direta: edifícios de médio porte, academias, restaurantes e hotéis. Indireta: residenciais, hospitais, shopping centers e condomínios de grande porte.",
    img: "assets/produtos/pressurizacao-direta-indireta.jpeg"
  },
  {
    num: "05", nome: "Estações elevatórias",
    titulo: "Bombeamento de águas residuais e pluviais",
    desc: "Realizam o bombeamento de águas residuais ou pluviais quando o nível da rede pública está acima do ponto de coleta, evitando refluxo. Também usadas na drenagem de garagens, subsolos e poços de elevador, prevenindo alagamentos.",
    apps: "Subsolos, garagens, indústrias, hospitais, shopping centers, condomínios e áreas de difícil escoamento.",
    img: "assets/produtos/estacoes-elevatorias.jpeg"
  },
  {
    num: "06", nome: "Painéis de automação",
    titulo: "Controle e proteção inteligente do sistema",
    desc: "Painéis elétricos responsáveis pelo controle e proteção dos sistemas de bombeamento — operação totalmente automática, monitoramento contínuo, detecção de falhas elétricas e comandos de segurança.",
    apps: "Todos os tipos de sistema de bombeamento, em edificações residenciais e comerciais, indústrias, hospitais e centros corporativos.",
    img: "assets/produtos/paineis-automacao.jpeg"
  }
];

// ---------------------------------------------------------------------
// Galeria de produtos — abas com imagem inteira (sem cortar)
// ---------------------------------------------------------------------
const galleryTabs = document.getElementById("galleryTabs");
const galleryStage = document.getElementById("galleryStage");

function renderGalleryPanel(produto) {
  galleryStage.innerHTML = `
    <div class="gallery-media" id="galleryMedia">
      <div class="full-media-blur" style="background-image:url('${produto.img}')"></div>
      <img class="full-media-img" src="${produto.img}" alt="${produto.nome} — Start Industrial">
    </div>
    <div class="gallery-copy" id="galleryCopy">
      <span class="n">${produto.num} — ${produto.nome}</span>
      <h3>${produto.titulo}</h3>
      <p>${produto.desc}</p>
      <span class="app-label">Aplicações</span>
      <p class="app-text">${produto.apps}</p>
    </div>`;
  requestAnimationFrame(() => {
    document.getElementById("galleryCopy").classList.add("in");
  });
}

if (galleryTabs && galleryStage) {
  PRODUTOS.forEach((produto, i) => {
    const btn = document.createElement("button");
    btn.className = "gallery-tab" + (i === 0 ? " active" : "");
    btn.type = "button";
    btn.dataset.index = String(i);
    btn.setAttribute("role", "tab");
    btn.innerHTML = `<span class="gt-num">${produto.num}</span><span class="gt-name">${produto.nome}</span>`;
    btn.addEventListener("click", () => {
      if (btn.classList.contains("active")) return;
      galleryTabs.querySelectorAll(".gallery-tab").forEach((t) => t.classList.remove("active"));
      btn.classList.add("active");
      const media = document.getElementById("galleryMedia");
      if (media) media.classList.add("fading");
      setTimeout(() => renderGalleryPanel(produto), 180);
    });
    galleryTabs.appendChild(btn);
  });
  renderGalleryPanel(PRODUTOS[0]);
}

// ---------------------------------------------------------------------
// Instagram — carrossel automático com as fotos reais do catálogo,
// imagem inteira sem cortar
// ---------------------------------------------------------------------
const igTrack = document.getElementById("igTrack");
if (igTrack) {
  const igCard = (produto) => `
    <a href="https://www.instagram.com/start.bombas/" target="_blank" rel="noopener" class="ig-post">
      <div class="full-media-blur" style="background-image:url('${produto.img}')"></div>
      <img class="full-media-img" src="${produto.img}" alt="${produto.nome} — @start.bombas">
      <span class="ig-post-overlay"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 2 .25 2.4.42.6.24 1 .5 1.5 1s.76.9 1 1.5c.17.4.36 1.2.42 2.4.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 2-.42 2.4a4 4 0 01-1 1.5 4 4 0 01-1.5 1c-.4.17-1.2.36-2.4.42-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-2-.25-2.4-.42a4 4 0 01-1.5-1 4 4 0 01-1-1.5c-.17-.4-.36-1.2-.42-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-2 .42-2.4a4 4 0 011-1.5 4 4 0 011.5-1c.4-.17 1.2-.36 2.4-.42C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.52 0-4.76.07-.97.04-1.5.2-1.85.34-.46.18-.8.4-1.15.74-.34.35-.56.69-.74 1.15-.14.35-.3.88-.34 1.85C3.1 8.48 3.1 8.85 3.1 12s0 3.52.06 4.76c.05.97.2 1.5.34 1.85.18.46.4.8.74 1.15.35.34.69.56 1.15.74.35.14.88.3 1.85.34C8.48 20.9 8.85 20.9 12 20.9s3.52 0 4.76-.06c.97-.05 1.5-.2 1.85-.34.46-.18.8-.4 1.15-.74.34-.35.56-.69.74-1.15.14-.35.3-.88.34-1.85.06-1.24.06-1.61.06-4.76s0-3.52-.06-4.76c-.05-.97-.2-1.5-.34-1.85a3 3 0 00-.74-1.15 3 3 0 00-1.15-.74c-.35-.14-.88-.3-1.85-.34C15.52 4 15.15 4 12 4zm0 3.4a4.6 4.6 0 110 9.2 4.6 4.6 0 010-9.2zm0 1.8a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6zm4.8-2a1.08 1.08 0 110 2.16 1.08 1.08 0 010-2.16z"/></svg></span>
    </a>`;
  const cards = PRODUTOS.map(igCard).join("");
  igTrack.innerHTML = cards + cards;
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
  document.querySelectorAll(".reveal, .reveal-img").forEach((el) => revealObserver.observe(el));
} else {
  document.querySelectorAll(".reveal, .reveal-img").forEach((el) => el.classList.add("in-view"));
}

// ---------------------------------------------------------------------
// Marquee — duplica o conteúdo pra loop contínuo sem salto
// ---------------------------------------------------------------------
const marquee = document.querySelector(".marquee-track");
if (marquee) {
  marquee.innerHTML += marquee.innerHTML;
}
