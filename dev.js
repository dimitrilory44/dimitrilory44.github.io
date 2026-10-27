// Mode développeur (version geek)
(() => {
// Données du profil : source unique pour l'API et le terminal
const PROFILE = {
  name: "Dimitri Lory",
  title: "Développeur Full Stack Java",
  location: "Nantes (44)",
  experienceYears: "5+",
  stack: ["Spring Boot", "Angular", "Vue.js"],
  architecture: "microservices",
  languages: { fr: "natif", en: "technique" },
  openToWork: true,
  availability: { from: "immédiatement", contract: "CDI", workMode: "hybride", area: "Nantes et alentours" },
  target: "éditeurs de logiciel",
  nextStep: "intégrer l'IA dans les applications métier",
};

const SKILLS = {
  backend: ["Java 8 → 21", "Groovy", "Spring Boot", "Spring Security", "Micronaut", "Grails", "JPA / Hibernate", "REST", "JWT", "OpenAPI"],
  frontend: ["Angular 2 → 21", "Vue.js 2 / 3", "TypeScript", "Angular Material"],
  data: ["PostgreSQL", "MySQL"],
  tooling: ["Docker", "Maven", "Gradle", "GitLab CI", "ArgoCD", "Git"],
  testing: ["JUnit", "Mockito", "Jest", "Vitest", "TDD"],
  methods: ["Scrum", "Kanban", "CI / CD"],
  ai: ["GitHub Copilot (agent)", "Claude Code (agent)"],
};

const EXPERIENCES = [
  { from: "2025-09", to: "2026-07", company: "Kereis · Groupe Hardis", role: "Développeur Full Stack Java",
    sector: "assurance", team: 10,
    highlights: ["Gestion des adhésions : microservices Groovy / Micronaut + écrans Angular 18", "Tests, revues de code, déploiement GitLab CI", "Run : incidents de production, extractions datalake AWS", "GitHub Copilot (agent) : tests unitaires, documentation, revue de code — sorties relues et validées en local"] },
  { from: "2024-11", to: "2025-08", company: "Task Manager (projet entrepreneurial)", role: "Développeur Java",
    sector: "API REST", team: null,
    highlights: ["API REST sécurisée JWT + rôles", "Architecture modulaire par domaine, MapStruct", "OpenAPI, JUnit, Mockito"] },
  { from: "2023-05", to: "2024-10", company: "Leasecom", role: "Développeur Full Stack Java",
    sector: "leasing", team: 5,
    highlights: ["Refonte vers 10 microservices Java 17 / Spring Boot + Vue.js", "Pair programming avec l'architecte, initiation Kafka", "ArgoCD / Kubernetes, war rooms, accueil des nouveaux"] },
  { from: "2022-05", to: "2023-04", company: "EID Information · Groupe INTM", role: "Développeur Java / JEE",
    sector: "banque · monétique", team: 2,
    highlights: ["Paiement par carte pour Euro-Information (Crédit Mutuel)", "Java / JEE + mainframe", "Appui technique au chef de projet"] },
  { from: "2021-10", to: "2022-04", company: "Sopra Steria · Groupe INTM", role: "Développeur Full Stack Java",
    sector: "Assurance Maladie", team: 5,
    highlights: ["Spring Boot + Vue.js / TypeScript", "TDD : 95 % de couverture"] },
  { from: "2021-02", to: "2021-05", company: "Sopump", role: "Développeur front-end Angular",
    sector: "BTP", team: 3,
    highlights: ["Suivi du béton sur chantier : Angular 11, maquettes Figma, full remote"] },
  { from: "2019-07", to: "2021-01", company: "Digiwin · Groupe TRSB", role: "Développeur Java / Jalios",
    sector: "collectivités", team: 10,
    highlights: ["Intranets sur la plateforme Jalios / J2EE", "Maintenance évolutive et corrective"] },
];

const PROJECTS = [
  { name: "streaming-explorer", status: "IN_PROGRESS", stack: ["Angular 21", "Signals", "Angular Material", "TMDB API", "Vitest", "Claude Code"],
    description: "Films et séries filtrés selon vos plateformes de streaming : SPA Angular 21 « frontend only » branchée sur l'API TMDB. Architecture et choix techniques de ma main, Claude Code en appui (implémentation, tests, documentation). Bientôt : backend Spring Boot et recherche en langage naturel par IA." },
  { name: "portfolio", status: "LIVE", stack: ["HTML", "CSS", "JavaScript", "Claude Code"],
    description: "Ce site, mode dev compris : développé en pilotant Claude Code en agent. Je cadre et découpe le besoin, l'agent implémente, je relis et valide chaque changement." },
];

const EDUCATION = [
  { year: 2021, title: "Formation développeur web", school: "OpenClassrooms" },
  { year: 2019, title: "Certification Java / JEE", school: "M2i Nantes" },
  { year: 2018, title: "Développeur informatique", school: "CESI" },
  { year: 2015, title: "Licence pro Outils informatiques pour le génie des procédés", school: "IUT Saint-Nazaire" },
];

const CONTACT = {
  email: "lorydim44@gmail.com",
  phone: "07 61 14 94 98",
  linkedin: "https://www.linkedin.com/in/dimitri-lory",
  github: "https://github.com/dimitrilory44",
  cv: "cv/CV_Dimitri_Lory.pdf",
  dossier: "cv/Dossier_competences_Dimitri_Lory.pdf",
};

// Définition des endpoints affichés façon Swagger
const GROUPS = [
  { tag: "profile-controller", desc: "Qui je suis", ops: [
    { method: "get", path: "/api/v1/profile", summary: "Profil en bref", open: true, body: PROFILE },
    { method: "get", path: "/actuator/health", summary: "Disponibilité", body: { status: "UP", components: { availability: { status: "UP", details: { from: "immédiatement", contract: "CDI", workMode: "hybride", mobility: "Nantes et alentours" } }, motivation: { status: "UP" }, coffee: { status: "UP", level: 0.82 } } } },
  ]},
  { tag: "career-controller", desc: "Parcours et compétences", ops: [
    { method: "get", path: "/api/v1/experiences", summary: "Expériences professionnelles", open: true, body: EXPERIENCES },
    { method: "get", path: "/api/v1/skills", summary: "Compétences techniques", body: SKILLS },
    { method: "get", path: "/api/v1/education", summary: "Formation", body: EDUCATION },
  ]},
  { tag: "lab-controller", desc: "Projets personnels", ops: [
    { method: "get", path: "/api/v1/projects", summary: "Projets en cours", body: PROJECTS },
  ]},
  { tag: "hiring-controller", desc: "Pour me recruter", ops: [
    { method: "post", path: "/api/v1/hire", summary: "Proposer un poste", status: 201,
      request: { company: "VotreEditeur", role: "Développeur Full Stack Java", location: "Nantes" },
      body: { status: "CREATED", message: "Merci ! Contactez-moi directement :", contact: CONTACT } },
  ]},
];

// Coloration syntaxique JSON
const esc = (t) => t.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
function highlight(obj) {
  return esc(JSON.stringify(obj, null, 2)).replace(
    /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?)/g,
    (m, str, colon, bool, num) => {
      if (str) return colon ? `<span class="k">${str}</span><span class="p">:</span>` : `<span class="s">${str}</span>`;
      if (bool) return `<span class="b">${bool}</span>`;
      return `<span class="n">${num}</span>`;
    }
  );
}

const chevron = '<svg class="chev" viewBox="0 0 24 24" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function renderEndpoints() {
  const root = document.getElementById("endpoints");
  let n = 0;
  root.innerHTML = GROUPS.map((g) => `
    <div class="tag-group">
      <h2>${g.tag} <small>${g.desc}</small></h2>
      ${g.ops.map((op) => {
        const id = `op-${n++}`;
        const status = op.status || 200;
        const curl = op.method === "post"
          ? `curl -X <b>POST</b> http://localhost:8080${op.path} \\\n  -H "Content-Type: application/json" \\\n  -d '${JSON.stringify(op.request)}'`
          : `curl -X <b>GET</b> http://localhost:8080${op.path}`;
        return `
        <div class="op ${op.method}${op.open ? " open" : ""}">
          <button class="op-sum" type="button" aria-expanded="${!!op.open}" aria-controls="${id}">
            <span class="method">${op.method.toUpperCase()}</span>
            <span class="path">${op.path}</span>
            <span class="desc">${op.summary}</span>
            ${chevron}
          </button>
          <div class="op-body" id="${id}" ${op.open ? "" : "hidden"}>
            <pre class="curl">${curl}</pre>
            <div class="op-tools">
              <button class="try" type="button">Try it out</button>
              <span class="resp-meta"><span class="code-${status}">${status} ${status === 201 ? "Created" : "OK"}</span><span class="ms">application/json</span></span>
            </div>
            <pre class="json">${highlight(op.body)}</pre>
          </div>
        </div>`;
      }).join("")}
    </div>`).join("");

  root.addEventListener("click", (e) => {
    const sum = e.target.closest(".op-sum");
    if (sum) {
      const op = sum.parentElement;
      const body = op.querySelector(".op-body");
      const open = body.hidden;
      body.hidden = !open;
      op.classList.toggle("open", open);
      sum.setAttribute("aria-expanded", open);
      return;
    }
    const tryBtn = e.target.closest(".try");
    if (tryBtn) {
      const body = tryBtn.closest(".op-body");
      const json = body.querySelector(".json");
      const ms = body.querySelector(".ms");
      const latency = 18 + Math.floor(Math.random() * 60);
      json.classList.add("loading");
      tryBtn.textContent = "Executing…";
      setTimeout(() => {
        json.classList.remove("loading");
        tryBtn.textContent = "Try it out";
        ms.textContent = `${latency} ms · application/json`;
      }, reduceMotion ? 0 : latency * 6);
    }
  });
}

// Animation des logs de démarrage (les lignes sont déjà dans la page, on les rejoue)
function playBootLog() {
  const lines = [...document.querySelectorAll("#log li")];
  const skip = document.getElementById("skip");
  if (reduceMotion) return;
  lines.forEach((l) => l.classList.add("pending"));
  skip.hidden = false;
  let i = 0;
  const timer = setInterval(() => {
    if (i >= lines.length) { clearInterval(timer); skip.hidden = true; return; }
    lines[i++].classList.remove("pending");
  }, 140);
  skip.addEventListener("click", () => {
    clearInterval(timer);
    lines.forEach((l) => l.classList.remove("pending"));
    skip.hidden = true;
  });
}

// Terminal interactif
const out = document.getElementById("term-out");
const input = document.getElementById("term-input");
const history = [];
let hIndex = 0;

function print(text, cls = "out") {
  const p = document.createElement("p");
  p.className = `line ${cls}`;
  p.textContent = text;
  out.appendChild(p);
}

const COMMANDS = {
  help: () => [
    ["Commandes disponibles :", "acc"],
    ["  whoami        qui suis-je", "out"],
    ["  skills        mes compétences", "out"],
    ["  experience    mon parcours", "out"],
    ["  projects      mes projets en cours", "out"],
    ["  education     ma formation", "out"],
    ["  contact       me joindre", "out"],
    ["  cv            mon CV et mon dossier de compétences (PDF)", "out"],
    ["  clear         effacer le terminal", "out"],
    ["  …et peut-être une commande cachée avec sudo.", "out"],
  ],
  whoami: () => [
    [`${PROFILE.name} — ${PROFILE.title}`, "ok"],
    [`${PROFILE.experienceYears} ans d'expérience · ${PROFILE.stack.join(" · ")} · ${PROFILE.location}`, "out"],
    [`Cible : ${PROFILE.target}. Prochaine étape : ${PROFILE.nextStep}.`, "out"],
    [`Disponible ${PROFILE.availability.from} · ${PROFILE.availability.contract} · ${PROFILE.availability.workMode} · ${PROFILE.availability.area}`, "ok"],
  ],
  skills: () => Object.entries(SKILLS).map(([k, v]) => [`${k.padEnd(9)} ${v.join(", ")}`, "out"]),
  experience: () => EXPERIENCES.map((x) => [`${x.from} → ${x.to}  ${x.role} @ ${x.company}`, "out"]),
  projects: () => PROJECTS.flatMap((p) => [[`● ${p.name} [${p.status}]`, "ok"], [`  ${p.description}`, "out"]]),
  education: () => EDUCATION.map((e) => [`${e.year}  ${e.title} — ${e.school}`, "out"]),
  contact: () => [
    [`email     ${CONTACT.email}`, "out"],
    [`phone     ${CONTACT.phone}`, "out"],
    [`linkedin  ${CONTACT.linkedin}`, "out"],
    [`github    ${CONTACT.github}`, "out"],
    [`cv        ${CONTACT.cv}`, "out"],
    [`dossier   ${CONTACT.dossier}`, "out"],
  ],
  cv: () => {
    window.open(CONTACT.cv, "_blank", "noopener");
    return [
      ["Ouverture de mon CV…", "ok"],
      [`→ ${CONTACT.cv}`, "out"],
      [`Dossier de compétences : ${CONTACT.dossier}`, "out"],
    ];
  },
  ls: () => [["profile.json  skills.json  experience.log  projects/  contact.vcf", "out"]],
  pwd: () => [["/home/dimitri/nantes", "out"]],
  date: () => [[new Date().toLocaleString("fr-FR"), "out"]],
  java: () => [['openjdk version "21" — et aussi 8, 11 et 17 en production.', "out"]],
};

function run(raw) {
  const cmd = raw.trim().replace(/\s+/g, " ");
  print(`recruteur@dimitri:~$ ${raw}`, "cmd");
  if (!cmd) return;
  history.push(cmd);
  hIndex = history.length;
  const lower = cmd.toLowerCase();

  if (lower === "clear") { out.innerHTML = ""; return; }
  if (lower.startsWith("sudo")) {
    if (lower.includes("hire")) {
      print("[sudo] mot de passe pour recruteur : ********", "out");
      print("✔ Permission accordée. Excellente décision.", "ok");
      print(`→ Écrivez-moi à ${CONTACT.email} ou appelez le ${CONTACT.phone}.`, "acc");
    } else {
      print("recruteur n'apparaît pas dans le fichier sudoers. Essayez : sudo hire dimitri", "err");
    }
    return;
  }
  if (lower === "rm -rf /" || lower.startsWith("rm ")) { print("Bien essayé 😄 Ce CV est en lecture seule.", "err"); return; }

  const fn = COMMANDS[lower];
  if (fn) fn().forEach(([t, c]) => print(t, c));
  else print(`zsh: command not found: ${cmd}. Tapez « help ».`, "err");
}

document.getElementById("term-form").addEventListener("submit", (e) => {
  e.preventDefault();
  run(input.value);
  input.value = "";
  out.parentElement.scrollIntoView({ block: "nearest" });
});
input.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp" && hIndex > 0) { input.value = history[--hIndex]; e.preventDefault(); }
  if (e.key === "ArrowDown") { hIndex = Math.min(hIndex + 1, history.length); input.value = history[hIndex] || ""; e.preventDefault(); }
  if (e.key === "Tab") {
    const match = Object.keys(COMMANDS).concat("clear").find((c) => c.startsWith(input.value.toLowerCase()));
    if (match && input.value) { input.value = match; e.preventDefault(); }
  }
});
document.querySelectorAll(".quick button").forEach((b) =>
  b.addEventListener("click", () => { run(b.dataset.cmd); input.focus({ preventScroll: true }); })
);
document.getElementById("term-body").addEventListener("click", (e) => {
  if (!e.target.closest("button") && !window.getSelection().toString()) input.focus({ preventScroll: true });
});

// Horloge de Nantes dans la barre d'état
function tick() {
  const t = new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Paris" });
  document.getElementById("clock").textContent = `Nantes ${t}`;
}

// Bouton retour en haut, version terminal : barre de progression ASCII
const devTop = document.getElementById("dev-top");
const devBar = devTop.querySelector(".dt-bar");
const devPct = devTop.querySelector(".dt-pct");
const BAR_WIDTH = 10;
function updateDevTop() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0;
  const filled = Math.round(progress * BAR_WIDTH);
  devBar.textContent = `[${"█".repeat(filled)}${"░".repeat(BAR_WIDTH - filled)}]`;
  devPct.textContent = `${Math.round(progress * 100)}%`;
  devTop.classList.toggle("visible", window.scrollY > 400);
}
window.addEventListener("scroll", updateDevTop, { passive: true });
devTop.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
  document.querySelector("#dev .exit-dev")?.focus({ preventScroll: true });
});
updateDevTop();

renderEndpoints();
window.DevMode = { onEnter: playBootLog };
print("Bienvenue ! Tapez « help » pour voir les commandes, ou cliquez sur un raccourci.", "acc");
tick();
setInterval(tick, 30000);

})();
