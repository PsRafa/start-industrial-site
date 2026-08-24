// Ano no rodapé
document.getElementById("year").textContent = new Date().getFullYear();

// ---------------------------------------------------------------------
// CATÁLOGO — conteúdo real, extraído de assets/catalogo/catalogo-start-industrial.pdf
// ---------------------------------------------------------------------
const PRODUTOS = [
  {
    img: "assets/produtos/pressurizadores-obra.jpeg",
    titulo: "Pressurizadores de obra",
    resumo: "Água com pressão certa durante toda a construção.",
    descricao: "Sistemas provisórios utilizados durante a fase de construção para garantir o fornecimento de água com pressão adequada nos pontos de uso temporários, como mangueiras, lavadoras e equipamentos de limpeza. Asseguram o funcionamento eficiente das atividades de canteiro, especialmente em obras verticais, onde a pressão da rede pública é insuficiente para atender aos andares superiores.",
    aplicacoes: "Canteiros de obras residenciais, comerciais e industriais, principalmente em edifícios de múltiplos pavimentos."
  },
  {
    img: "assets/produtos/sistemas-recalque.jpeg",
    titulo: "Sistemas de recalque",
    resumo: "Da cisterna até a caixa d'água, sem interrupção.",
    descricao: "Utilizados em edificações e condomínios, os sistemas de recalque realizam o bombeamento de água de reservatórios inferiores (cisternas) para reservatórios superiores (caixas d'água), assegurando abastecimento contínuo e distribuição uniforme em todos os pontos de consumo.",
    aplicacoes: "Prédios residenciais, hotéis, condomínios, hospitais, indústrias e centros comerciais."
  },
  {
    img: "assets/produtos/combate-incendio.jpeg",
    titulo: "Sistemas de combate a incêndio",
    resumo: "Água pressurizada pronta pra atuação imediata.",
    descricao: "Projetados para garantir segurança em edificações, esses sistemas mantêm a água pressurizada disponível para atuação imediata em caso de incêndio. Alimentam redes de hidrantes e sprinklers com vazão e pressão adequadas, assegurando eficácia no combate inicial ao fogo.",
    aplicacoes: "Edifícios residenciais e comerciais, indústrias, hospitais, shopping centers, escolas, condomínios e galpões logísticos."
  },
  {
    img: "assets/produtos/pressurizacao-direta-indireta.jpeg",
    titulo: "Pressurização direta e indireta",
    resumo: "Pressão estável, direto da rede ou via reservatório.",
    descricao: "Pressurização Direta: realiza o bombeamento da água diretamente da rede pública ou do reservatório, garantindo fluxo contínuo e pressão estável em todos os pontos de consumo. Pressurização Indireta: utiliza reservatórios intermediários para equalizar o abastecimento, reduzindo variações de pressão e protegendo a tubulação e os equipamentos hidráulicos contra sobrecargas.",
    aplicacoes: "Direta: edifícios de médio porte, academias, restaurantes e hotéis. Indireta: prédios residenciais, hospitais, shopping centers e condomínios de grande porte."
  },
  {
    img: "assets/produtos/estacoes-elevatorias.jpeg",
    titulo: "Estações elevatórias",
    resumo: "Bombeamento de águas residuais e pluviais.",
    descricao: "Sistemas projetados para realizar o bombeamento de águas residuais ou pluviais quando o nível da rede pública está acima do ponto de coleta. Garantem o escoamento adequado e evitam o refluxo, direcionando a água para tratamento ou descarte. Também amplamente utilizadas na drenagem de áreas sujeitas a acúmulo, como garagens, subsolos e poços de elevador, prevenindo alagamentos.",
    aplicacoes: "Subsolos, garagens, indústrias, hospitais, shopping centers, condomínios e áreas de difícil escoamento."
  },
  {
    img: "assets/produtos/paineis-automacao.jpeg",
    titulo: "Painéis de automação",
    resumo: "Controle e proteção inteligente do sistema.",
    descricao: "Painéis elétricos responsáveis pelo controle e proteção dos sistemas de bombeamento. Proporcionam operação totalmente automática, com monitoramento contínuo do funcionamento, detecção de falhas elétricas e comandos de segurança que asseguram maior eficiência, confiabilidade e durabilidade ao conjunto.",
    aplicacoes: "Todos os tipos de sistemas de bombeamento — recalque, combate a incêndio, pressurização e estações elevatórias — em edificações residenciais e comerciais, indústrias, hospitais e centros corporativos."
  }
];

const carousel = document.getElementById("carousel");
PRODUTOS.forEach((p) => {
  const card = document.createElement("button");
  card.className = "produto-card";
  card.innerHTML = `
    <div class="produto-thumb" style="background-image:url('${p.img}')"></div>
    <div class="produto-body">
      <h3>${p.titulo}</h3>
      <p>${p.resumo}</p>
      <span class="ver-mais">Ver detalhes →</span>
    </div>`;
  card.addEventListener("click", () => openModal(p));
  carousel.appendChild(card);
});

document.getElementById("carPrev").addEventListener("click", () => {
  carousel.scrollBy({ left: -320, behavior: "smooth" });
});
document.getElementById("carNext").addEventListener("click", () => {
  carousel.scrollBy({ left: 320, behavior: "smooth" });
});

// ---------------------------------------------------------------------
// Instagram — grade de "posts" com as fotos reais do catálogo
// ---------------------------------------------------------------------
const igGrid = document.getElementById("igGrid");
if (igGrid) {
  PRODUTOS.forEach((p) => {
    const a = document.createElement("a");
    a.href = "https://www.instagram.com/start.bombas/";
    a.target = "_blank";
    a.rel = "noopener";
    a.className = "ig-post";
    a.style.backgroundImage = `url('${p.img}')`;
    a.innerHTML = `<span class="ig-post-overlay"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 2 .25 2.4.42.6.24 1 .5 1.5 1s.76.9 1 1.5c.17.4.36 1.2.42 2.4.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 2-.42 2.4a4 4 0 01-1 1.5 4 4 0 01-1.5 1c-.4.17-1.2.36-2.4.42-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-2-.25-2.4-.42a4 4 0 01-1.5-1 4 4 0 01-1-1.5c-.17-.4-.36-1.2-.42-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-2 .42-2.4a4 4 0 011-1.5 4 4 0 011.5-1c.4-.17 1.2-.36 2.4-.42C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.52 0-4.76.07-.97.04-1.5.2-1.85.34-.46.18-.8.4-1.15.74-.34.35-.56.69-.74 1.15-.14.35-.3.88-.34 1.85C3.1 8.48 3.1 8.85 3.1 12s0 3.52.06 4.76c.05.97.2 1.5.34 1.85.18.46.4.8.74 1.15.35.34.69.56 1.15.74.35.14.88.3 1.85.34C8.48 20.9 8.85 20.9 12 20.9s3.52 0 4.76-.06c.97-.05 1.5-.2 1.85-.34.46-.18.8-.4 1.15-.74.34-.35.56-.69.74-1.15.14-.35.3-.88.34-1.85.06-1.24.06-1.61.06-4.76s0-3.52-.06-4.76c-.05-.97-.2-1.5-.34-1.85a3 3 0 00-.74-1.15 3 3 0 00-1.15-.74c-.35-.14-.88-.3-1.85-.34C15.52 4 15.15 4 12 4zm0 3.4a4.6 4.6 0 110 9.2 4.6 4.6 0 010-9.2zm0 1.8a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6zm4.8-2a1.08 1.08 0 110 2.16 1.08 1.08 0 010-2.16z"/></svg></span>`;
    igGrid.appendChild(a);
  });
}

// ---------------------------------------------------------------------
// Modal de detalhes do produto
// ---------------------------------------------------------------------
const modalOverlay = document.getElementById("modalOverlay");
const modalImg = document.getElementById("modalImg");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalApp = document.getElementById("modalApp");

function openModal(p) {
  modalImg.style.backgroundImage = `url('${p.img}')`;
  modalTitle.textContent = p.titulo;
  modalDesc.textContent = p.descricao;
  modalApp.textContent = p.aplicacoes;
  modalOverlay.classList.add("open");
  document.body.style.overflow = "hidden";
}
function closeModal() {
  modalOverlay.classList.remove("open");
  document.body.style.overflow = "";
}
document.getElementById("modalClose").addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeModal();
});

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
// Revelação suave ao rolar (IntersectionObserver)
// ---------------------------------------------------------------------
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
);
document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

// ---------------------------------------------------------------------
// Parallax sutil na foto do hero (leve, desativa se o usuário prefere menos movimento)
// ---------------------------------------------------------------------
const heroPhoto = document.querySelector(".hero-photo");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (heroPhoto && !prefersReducedMotion) {
  window.addEventListener(
    "scroll",
    () => {
      const y = Math.min(window.scrollY, 500) * 0.08;
      heroPhoto.style.backgroundPosition = `center ${50 + y * 0.3}%`;
    },
    { passive: true }
  );
}

// ---------------------------------------------------------------------
// Marquee "onde atuamos" — duplica o conteúdo pra loop contínuo sem salto
// ---------------------------------------------------------------------
const marquee = document.querySelector(".marquee-track");
if (marquee) {
  marquee.innerHTML += marquee.innerHTML;
}
