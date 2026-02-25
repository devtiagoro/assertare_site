// ====== WHATSAPP CONFIG ======
const WHATS_NUMBER = "5534991446022";

const WPP_MESSAGES = {
  menu: "Olá! Vim pelo site da Assertare e gostaria de agendar uma conversa sobre BPO financeiro.",
  hero: "Olá! Vi o site da Assertare e quero conversar sobre BPO financeiro e estruturação do financeiro. Pode me fazer algumas perguntas para entender meu cenário?",
  diagnostico: "Olá! Quero agendar um diagnóstico rápido do meu cenário de BPO financeiro. Sou [escritório contábil/empresa].",
  sobre: "Olá! Gostaria de entender como a Assertare pode ajudar com BPO financeiro (processo, rotina e entrega gerencial). Podemos conversar?",
  escritorios: "Olá! Sou de um escritório contábil e quero estruturar/implantar BPO financeiro com padrão de onboarding e fechamento. Podemos conversar?",
  empresas: "Olá! Sou empresa e quero organizar o financeiro com BPO financeiro (rotina + DRE e fluxo de caixa). Podemos conversar?",
  metodo: "Olá! Quero entender o método de implantação de BPO financeiro (90 dias) e como funciona na prática. Podemos conversar?",
  faq: "Olá! Estou pesquisando sobre BPO financeiro e queria entender como funcionaria no meu cenário. Podemos conversar?",
  contato: "Olá! Vim pelo site assertare.com.br e gostaria de agendar uma conversa. Sou [escritório contábil/empresa].",
  "mensagem-sugerida": "Olá, vi a Assertare. Sou um [escritório contábil/empresa] e quero entender como funciona o BPO financeiro no meu caso.",
  floating: "Olá! Vim pelo site da Assertare e gostaria de agendar uma conversa. Sou [escritório contábil/empresa]."
};

function buildWhatsLink(phone, text) {
  return `https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(text)}`;
}

function qs(sel) { return document.querySelector(sel); }
function qsa(sel) { return Array.from(document.querySelectorAll(sel)); }

// ====== Header scroll state ======
const header = qs("#header");
window.addEventListener("scroll", () => {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 8);
});

// ====== Mobile menu ======
const navToggle = qs("#navToggle");
const navMenu = qs("#navMenu");

if (navToggle && navMenu) {
  navToggle.addEventListener("click", () => {
    const open = navMenu.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", open ? "true" : "false");
  });

  qsa(".nav__link").forEach(link => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  document.addEventListener("click", (e) => {
    const clickedInside = navMenu.contains(e.target) || navToggle.contains(e.target);
    if (!clickedInside) {
      navMenu.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

// ====== Bind WhatsApp links everywhere ======
qsa(".js-wpp").forEach((el) => {
  const ctx = el.getAttribute("data-wpp-context") || "hero";
  const message = WPP_MESSAGES[ctx] || WPP_MESSAGES.hero;
  el.href = buildWhatsLink(WHATS_NUMBER, message);
});

// ====== Year ======
const yearEl = qs("#year");
if (yearEl) yearEl.textContent = new Date().getFullYear();