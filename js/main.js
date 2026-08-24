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
// Showcase: troca a imagem fixa conforme o item de texto entra na tela
// ---------------------------------------------------------------------
const showcaseItems = document.querySelectorAll(".showcase-item");
const showcaseLayers = document.querySelectorAll(".showcase-media-layer");
const progressWrap = document.getElementById("showcaseProgress");

if (showcaseItems.length && progressWrap) {
  showcaseItems.forEach((_, i) => {
    const dot = document.createElement("span");
    dot.className = "dot" + (i === 0 ? " active" : "");
    progressWrap.appendChild(dot);
  });
  const dots = progressWrap.querySelectorAll(".dot");

  const showcaseObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = Number(entry.target.dataset.index);
          showcaseLayers.forEach((layer, i) => layer.classList.toggle("active", i === idx));
          dots.forEach((dot, i) => dot.classList.toggle("active", i === idx));
        }
      });
    },
    { threshold: 0.5, rootMargin: "-40% 0px -40% 0px" }
  );
  showcaseItems.forEach((item) => showcaseObserver.observe(item));
}

// ---------------------------------------------------------------------
// Instagram — grade de "posts" com as fotos reais do catálogo
// ---------------------------------------------------------------------
const IG_IMAGES = [
  "assets/produtos/pressurizadores-obra.jpeg",
  "assets/produtos/sistemas-recalque.jpeg",
  "assets/produtos/combate-incendio.jpeg",
  "assets/produtos/pressurizacao-direta-indireta.jpeg",
  "assets/produtos/estacoes-elevatorias.jpeg",
  "assets/produtos/paineis-automacao.jpeg"
];
const igGrid = document.getElementById("igGrid");
if (igGrid) {
  IG_IMAGES.forEach((src) => {
    const a = document.createElement("a");
    a.href = "https://www.instagram.com/start.bombas/";
    a.target = "_blank";
    a.rel = "noopener";
    a.className = "ig-post";
    a.style.backgroundImage = `url('${src}')`;
    a.innerHTML = `<span class="ig-post-overlay"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 2 .25 2.4.42.6.24 1 .5 1.5 1s.76.9 1 1.5c.17.4.36 1.2.42 2.4.07 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.25 2-.42 2.4a4 4 0 01-1 1.5 4 4 0 01-1.5 1c-.4.17-1.2.36-2.4.42-1.3.07-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-2-.25-2.4-.42a4 4 0 01-1.5-1 4 4 0 01-1-1.5c-.17-.4-.36-1.2-.42-2.4C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.25-2 .42-2.4a4 4 0 011-1.5 4 4 0 011.5-1c.4-.17 1.2-.36 2.4-.42C8.4 2.2 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.52 0-4.76.07-.97.04-1.5.2-1.85.34-.46.18-.8.4-1.15.74-.34.35-.56.69-.74 1.15-.14.35-.3.88-.34 1.85C3.1 8.48 3.1 8.85 3.1 12s0 3.52.06 4.76c.05.97.2 1.5.34 1.85.18.46.4.8.74 1.15.35.34.69.56 1.15.74.35.14.88.3 1.85.34C8.48 20.9 8.85 20.9 12 20.9s3.52 0 4.76-.06c.97-.05 1.5-.2 1.85-.34.46-.18.8-.4 1.15-.74.34-.35.56-.69.74-1.15.14-.35.3-.88.34-1.85.06-1.24.06-1.61.06-4.76s0-3.52-.06-4.76c-.05-.97-.2-1.5-.34-1.85a3 3 0 00-.74-1.15 3 3 0 00-1.15-.74c-.35-.14-.88-.3-1.85-.34C15.52 4 15.15 4 12 4zm0 3.4a4.6 4.6 0 110 9.2 4.6 4.6 0 010-9.2zm0 1.8a2.8 2.8 0 100 5.6 2.8 2.8 0 000-5.6zm4.8-2a1.08 1.08 0 110 2.16 1.08 1.08 0 010-2.16z"/></svg></span>`;
    igGrid.appendChild(a);
  });
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
