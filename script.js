// Copie de l'adresse e-mail
const copyBtn = document.getElementById("copy-email");
const emailEl = document.getElementById("email");

copyBtn?.addEventListener("click", async () => {
  const email = emailEl.textContent.trim();
  try {
    await navigator.clipboard.writeText(email);
    copyBtn.textContent = "Copié";
  } catch {
    // Repli : sélectionne le texte pour une copie manuelle
    const range = document.createRange();
    range.selectNodeContents(emailEl);
    const sel = window.getSelection();
    sel.removeAllRanges();
    sel.addRange(range);
    copyBtn.textContent = "Sélectionné";
  }
  setTimeout(() => (copyBtn.textContent = "Copier"), 2000);
});

// Lien de navigation actif selon la section visible
const links = document.querySelectorAll(".nav-links a");
const sections = [...links].map((a) => document.querySelector(a.getAttribute("href")));

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) =>
        a.classList.toggle("active", a.getAttribute("href") === "#" + entry.target.id)
      );
    });
  },
  { rootMargin: "-40% 0px -55% 0px" }
);
sections.forEach((s) => s && observer.observe(s));

// Année du pied de page
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Parallaxe : [data-speed] suit le défilement de la page, [data-rel] suit la position de l'élément à l'écran
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const pageLayers = [...document.querySelectorAll("[data-speed]")];
const relLayers = [...document.querySelectorAll("[data-rel]")];
let ticking = false;

function renderParallax() {
  const y = window.scrollY;
  const vh = window.innerHeight;
  pageLayers.forEach((el) => {
    if (y > vh * 1.5) return; // décor de l'en-tête : inutile une fois hors de l'écran
    el.style.transform = `translate3d(0, ${(y * parseFloat(el.dataset.speed)).toFixed(1)}px, 0)`;
  });
  relLayers.forEach((el) => {
    const r = el.parentElement.getBoundingClientRect();
    if (r.bottom < 0 || r.top > vh) return;
    const offset = (r.top + r.height / 2 - vh / 2) * parseFloat(el.dataset.rel);
    el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
  });
  ticking = false;
}

if (!reduceMotion) {
  window.addEventListener("scroll", () => {
    if (!ticking) { ticking = true; requestAnimationFrame(renderParallax); }
  }, { passive: true });
  window.addEventListener("resize", renderParallax);
  renderParallax();
}

// Fin du chargement : on retire le squelette dès que le HTML et les polices sont prêts, sans attendre les images
// (au moins 500 ms d'affichage pour éviter un flash, au plus 1 s d'attente pour les polices)
function endLoading() {
  const wait = Math.max(0, 500 - performance.now());
  setTimeout(() => document.documentElement.classList.remove("is-loading"), wait);
}
const fontsReady = document.fonts ? document.fonts.ready : Promise.resolve();
Promise.race([fontsReady, new Promise((r) => setTimeout(r, 1000))]).then(endLoading);

// Apparition des blocs : seuls ceux situés sous l'écran au chargement sont masqués puis révélés
const revealTargets = document.querySelectorAll(
  "section .eyebrow, section h2, .feature, .skill-group, .job, .project, .edu li, .contact-box"
);
if (!reduceMotion && "IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.remove("reveal-pending");
      entry.target.classList.add("reveal-in");
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8% 0px" });

  revealTargets.forEach((el) => {
    if (el.getBoundingClientRect().top < window.innerHeight) return; // déjà visible : on n'y touche pas
    const siblings = [...el.parentElement.children];
    el.style.setProperty("--i", Math.min(siblings.indexOf(el), 4));
    el.classList.add("reveal-pending");
    revealObserver.observe(el);
  });
}

// Bouton retour en haut + progression de lecture
const toTop = document.getElementById("to-top");
function updateToTop() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
  toTop.style.setProperty("--progress", progress.toFixed(3));
  toTop.classList.toggle("visible", window.scrollY > 600);
}
window.addEventListener("scroll", updateToTop, { passive: true });
updateToTop();
toTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  document.querySelector(".nav-brand")?.focus({ preventScroll: true });
});

// Bascule entre la version classique et le mode développeur (#dev dans l'URL pour partager ce mode)
const classicView = document.getElementById("classic");
const devView = document.getElementById("dev");
function setMode(mode, animate = true) {
  const apply = () => {
    const dev = mode === "dev";
    document.documentElement.dataset.mode = mode;
    classicView.hidden = dev;
    devView.hidden = !dev;
    window.scrollTo(0, 0);
    try { history.replaceState(null, "", dev ? "#dev" : location.pathname + location.search); } catch (e) {}
    if (dev && window.DevMode) window.DevMode.onEnter();
    const focusTarget = dev ? devView.querySelector(".exit-dev") : classicView.querySelector(".mode-switch");
    focusTarget?.focus({ preventScroll: true });
  };
  if (!animate || reduceMotion) { apply(); return; }
  const root = document.documentElement;
  root.classList.remove("switching");
  void root.offsetWidth;
  root.classList.add("switching");
  setTimeout(apply, 190);
  setTimeout(() => root.classList.remove("switching"), 600);
}
document.querySelectorAll("[data-mode-switch]").forEach((btn) =>
  btn.addEventListener("click", () => setMode(btn.dataset.modeSwitch))
);
if (location.hash === "#dev") setMode("dev", false);
