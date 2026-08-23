// Ano no rodapé
document.getElementById("year").textContent = new Date().getFullYear();

// ---------------------------------------------------------------------
// CATÁLOGO — dados de EXEMPLO. Substituir por linhas/produtos reais da
// Start Industrial (nome, descrição, e se possível imagem em assets/produtos/).
// ---------------------------------------------------------------------
const ICON_BOMBA = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/></svg>`;
const ICON_SUBMERSA = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M3 15c2-1 4-1 6 0s4 1 6 0 4-1 6 0M3 19c2-1 4-1 6 0s4 1 6 0 4-1 6 0"/><rect x="9" y="3" width="6" height="10" rx="1"/></svg>`;
const ICON_RECALQUE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M4 20V10a4 4 0 014-4h8a4 4 0 014 4v10"/><path d="M8 20v-6M16 20v-6M12 20v-9"/></svg>`;
const ICON_BOOSTER = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M13 2L3 14h7l-1 8 11-14h-7l0-6z"/></svg>`;
const ICON_DOSADORA = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><path d="M9 3h6M10 3v5l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3"/></svg>`;
const ICON_PAINEL = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h8M8 16h4"/></svg>`;

const PRODUTOS = [
  {
    icon: ICON_BOMBA,
    titulo: "Bombas centrífugas",
    resumo: "Para movimentação de água em grande volume.",
    descricao: "Linha de bombas centrífugas para captação, transferência e recalque de água em obras e plantas industriais. Dimensionamento técnico conforme vazão e altura manométrica do projeto. — Descrição de exemplo, ajustar com specs reais do catálogo."
  },
  {
    icon: ICON_SUBMERSA,
    titulo: "Bombas submersíveis",
    resumo: "Para poços, cisternas e áreas alagadas.",
    descricao: "Equipamentos submersíveis para drenagem de obra, poços artesianos e situações de nível de água variável. Robustez para operação contínua em ambiente agressivo. — Descrição de exemplo, ajustar com specs reais do catálogo."
  },
  {
    icon: ICON_RECALQUE,
    titulo: "Sistemas de recalque",
    resumo: "Água até a última laje, com pressão constante.",
    descricao: "Sistema completo de recalque projetado para prédios e empreendimentos verticais — da caixa d'água ao reservatório superior, garantindo pressão adequada em todos os pavimentos. — Descrição de exemplo, ajustar com specs reais do catálogo."
  },
  {
    icon: ICON_BOOSTER,
    titulo: "Pressurização / booster",
    resumo: "Pressão constante mesmo em horário de pico.",
    descricao: "Conjuntos pressurizadores (booster) com variador de frequência para manter pressão estável independentemente da demanda simultânea de água no empreendimento. — Descrição de exemplo, ajustar com specs reais do catálogo."
  },
  {
    icon: ICON_DOSADORA,
    titulo: "Bombas dosadoras",
    resumo: "Dosagem precisa de produtos químicos.",
    descricao: "Para aplicações de tratamento de água/efluentes que exigem dosagem controlada e precisa de reagentes. — Descrição de exemplo, ajustar com specs reais do catálogo."
  },
  {
    icon: ICON_PAINEL,
    titulo: "Automação e painéis elétricos",
    resumo: "Controle inteligente do seu sistema.",
    descricao: "Painéis de comando e automação para operação segura, com proteção elétrica e monitoramento do sistema de bombeamento. — Descrição de exemplo, ajustar com specs reais do catálogo."
  }
];

const carousel = document.getElementById("carousel");
PRODUTOS.forEach((p) => {
  const card = document.createElement("button");
  card.className = "produto-card";
  card.innerHTML = `
    <div class="produto-thumb">${p.icon}</div>
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
// Modal de detalhes do produto
// ---------------------------------------------------------------------
const modalOverlay = document.getElementById("modalOverlay");
const modalIcon = document.getElementById("modalIcon");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");

function openModal(p) {
  modalIcon.innerHTML = p.icon;
  modalTitle.textContent = p.titulo;
  modalDesc.textContent = p.descricao;
  modalOverlay.classList.add("open");
}
function closeModal() {
  modalOverlay.classList.remove("open");
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
