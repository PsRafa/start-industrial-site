// Injeta header/footer compartilhados e só então carrega main.js —
// garante que os elementos existem antes do resto do JS rodar.
(async function () {
  const headerSlot = document.getElementById("header-slot");
  const footerSlot = document.getElementById("footer-slot");

  async function inject(slot, path) {
    if (!slot) return;
    try {
      const res = await fetch(path);
      slot.outerHTML = await res.text();
    } catch (e) {
      console.error("Falha ao carregar " + path, e);
    }
  }

  await Promise.all([inject(headerSlot, "partials/header.html"), inject(footerSlot, "partials/footer.html")]);

  const page = document.body.dataset.page || "home";
  document.querySelectorAll('[data-nav="' + page + '"]').forEach((a) => a.classList.add("nav-active"));

  const script = document.createElement("script");
  script.src = "js/main.js";
  document.body.appendChild(script);
})();
