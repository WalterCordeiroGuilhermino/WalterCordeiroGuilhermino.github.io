/* =========================================================
   Portfólio · Walter Cordeiro Guilhermino
   - Tema claro/escuro (salvo no navegador)
   - Foco do portfólio: Tech / Negócios  (?foco=tech | ?foco=negocios)
   - Idioma: Português / English  (?lang=en)
   - Projetos carregados automaticamente do GitHub (tópico "portfolio")
   ========================================================= */

const CONFIG = {
  username: 'WalterCordeiroGuilhermino',
  portfolioTopic: 'portfolio',
  maxProjects: 6,
  defaultMode: 'tech',
  defaultLang: 'pt',
  defaultImage: 'assets/default-preview.jpg',
  overlayUrl: 'data/projects.json',  // opcional: textos extras por projeto
  cacheMinutes: 30,
  // Onde procurar a imagem de capa em cada repositório (na branch padrão)
  previewPaths: ['preview.png', 'preview.jpg', 'preview.webp', 'assets/preview.png', 'assets/preview.jpg', 'screenshot.png', 'screenshot.jpg'],
  // Imagem local opcional neste site: assets/<nome-do-repo>.<ext>
  localImageExts: ['jpg', 'png', 'webp']
};

/* ---------- Conteúdo por foco ----------
   pt/en:  textos do topo da página em cada idioma
   topics: tópicos do GitHub que fazem o projeto subir para o topo neste foco
   cv:     PDFs em assets/ por idioma (se não existir, tenta os gerais; se nenhum existir, o botão some) */
const MODES = {
  tech: {
    pt: {
      role: 'Dados · BI · Automação',
      headline: 'Transformo dados bagunçados em decisões claras.',
      sub: 'Python, SQL e Power BI para limpar, modelar e visualizar grandes volumes de dados, além de automações e aplicações web. Técnico em Informática e pós em Data Science e BI na Unicamp.'
    },
    en: {
      role: 'Data · BI · Automation',
      headline: 'I turn messy data into clear decisions.',
      sub: 'Python, SQL and Power BI to clean, model and visualize large volumes of data, plus automations and web apps. IT technical diploma and a postgraduate program in Data Science and BI at Unicamp.'
    },
    topics: ['data', 'dados', 'data-science', 'data-analysis', 'python', 'sql', 'power-bi', 'powerbi', 'dax', 'pandas', 'pyspark', 'spark',
      'machine-learning', 'ml', 'deep-learning', 'ai', 'ia', 'computer-vision', 'yolo', 'nlp', 'etl', 'dashboard', 'tableau', 'r',
      'streamlit', 'gradio', 'supabase', 'javascript', 'web', 'webapp', 'fullstack', 'api', 'automation', 'automacao'],
    cv: { pt: 'assets/curriculo-tech.pdf', en: 'assets/resume-tech-en.pdf' }
  },
  negocios: {
    pt: {
      role: 'Negócios · Finanças · Processos',
      headline: 'Processos mais rápidos e números confiáveis, com dados no centro.',
      sub: 'Experiência em faturamento, contratos, auditoria externa e implantação de sistemas, com automação em Power Query, VBA e Power BI para tirar o trabalho manual do caminho.'
    },
    en: {
      role: 'Business · Finance · Processes',
      headline: 'Faster processes and reliable numbers, with data at the core.',
      sub: 'Experience in billing, contract management, external audit and system rollouts, using Power Query, VBA and Power BI automation to take manual work out of the way.'
    },
    topics: ['finance', 'financas', 'finanças', 'fpa', 'controladoria', 'accounting', 'contabilidade', 'audit', 'auditoria', 'excel', 'vba',
      'power-automate', 'power-apps', 'sap', 'erp', 'business', 'negocios', 'dashboard', 'power-bi', 'powerbi', 'kpi', 'marketing', 'crm', 'sales'],
    cv: { pt: 'assets/curriculo-negocios.pdf', en: 'assets/resume-business-en.pdf' }
  }
};
const CV_FALLBACK = { pt: ['assets/curriculo.pdf'], en: ['assets/resume-en.pdf', 'assets/curriculo.pdf'] };

/* ---------- Textos fixos da página em inglês ----------
   O português fica no próprio index.html (atributo data-i18n). */
const I18N_EN = {
  'skip': 'Skip to content',
  'nav.projects': 'Projects', 'nav.about': 'About', 'nav.stack': 'Stack', 'nav.exp': 'Experience',
  'modes.business': 'Business',
  'hero.status': 'Open to new opportunities',
  'hero.loc': 'Hortolândia, SP · Brazil',
  'hero.tz': 'UTC−3 (Brasília time)',
  'hero.lang': 'Fluent English (C2) · Native Portuguese',
  'hero.cta1': 'View projects', 'hero.cta2': 'Get in touch',
  'proof.1': 'response time on risk action items',
  'proof.2v': 'USD 100k+', 'proof.2': 'in sales orders managed per month',
  'proof.3': 'service-provider contracts managed',
  'proj.eyebrow': '01 · Projects', 'proj.title': 'Featured projects', 'proj.all': 'All on GitHub',
  'about.eyebrow': '02 · About', 'about.title': 'About me',
  'about.p1': 'I hold a Business Administration degree from PUC-Campinas and an IT technical diploma, and I’m taking a postgraduate program in Data Science and BI at Unicamp. I’ve worked at IBM, Zoetis and Forvis Mazars, always close to processes, numbers and systems.',
  'about.p2': 'What I enjoy most is taking a messy dataset, cleaning and organizing it, and turning it into something people can actually use to make decisions. I’m now channeling that experience into data and technology.',
  'stack.eyebrow': '03 · Stack', 'stack.title': 'Tools and skills',
  'stack.g1': 'Data & BI', 'stack.excel': 'Advanced Excel',
  'stack.g2': 'Programming & AI',
  'stack.g3': 'Automation & Systems', 'stack.impl': 'System rollouts',
  'stack.g4': 'Finance & Processes',
  'stack.f1': 'Accounts payable/receivable', 'stack.f2': 'Billing', 'stack.f3': 'External audit',
  'stack.f4': 'Contract management', 'stack.f5': 'Agile methods',
  'exp.eyebrow': '04 · Career', 'exp.title': 'Experience',
  'exp.1.role': 'Audit Trainee', 'exp.1.date': 'Dec 2025 – [month/year]',
  'exp.1.b1': 'Cut preparation time and manual reconciliation errors by building Power Query/VBA routines to clean datasets and accounting reports.',
  'exp.1.b2': 'Tested controls and balances for cash, accounts payable/receivable, inventory, fixed assets and taxes (PIS, COFINS, ICMS).',
  'exp.2.role': 'Sales Assistant', 'exp.2.date': 'Sep 2025 – Nov 2025',
  'exp.2.b1': 'Supported sales KPI tracking and client portfolio management during the expansion into Brazil’s Northeast region.',
  'exp.3.role': 'EHS Administrative Intern', 'exp.3.date': 'Jun 2022 – Jun 2024',
  'exp.3.b1': 'Reduced response time on risk action items by 40% by rolling out the new risk management system and a weekly review.',
  'exp.3.b2': 'Processed 50+ invoices per month, handling tax documents, accounts payable and tax compliance.',
  'exp.3.b3': 'Managed 50+ service-provider contracts, ensuring renewals and regulatory compliance.',
  'exp.4.date': 'Sep 2019 – Aug 2021',
  'exp.4.b1': 'Managed over USD 100k per month in sales orders for US and Canadian clients, in line with audit standards.',
  'exp.4.b2': 'Reached a customer satisfaction score of 96 by applying agile methods and Design Thinking to team workflows.',
  'edu.title': 'Education',
  'edu.1': '<strong>Postgraduate in Data Science and BI</strong> · Unicamp · in progress',
  'edu.2': '<strong>Bachelor’s in Business Administration</strong> · PUC-Campinas · 2024',
  'edu.3': '<strong>IT Technical Diploma</strong> · ETEC Hortolândia · 2014',
  'edu.certs': 'Certifications and courses',
  'foot.title': 'Let’s talk?', 'foot.lead': 'I reply quickly by email, LinkedIn or WhatsApp.',
  'foot.cv': 'Download résumé (PDF)', 'foot.small': 'Handmade and hosted on GitHub Pages',
  'modes.label': 'Portfolio focus'
};

/* Textos usados pelo JavaScript */
const UI = {
  pt: {
    title: 'Walter Cordeiro Guilhermino · Dados, BI e Tecnologia',
    langBtn: 'EN', langLabel: 'Switch to English',
    themeDark: 'Ativar tema escuro', themeLight: 'Ativar tema claro',
    code: 'Código', demo: 'Ver demo', app: 'Abrir app', dash: 'Ver dashboard',
    fallback: 'Projeto do meu portfólio. Detalhes no repositório.',
    preview: 'Prévia do projeto',
    empty: 'Nenhum projeto encontrado. Veja',
    error: 'Não consegui carregar os projetos agora. Veja direto no',
    myGithub: 'meu GitHub'
  },
  en: {
    title: 'Walter Cordeiro Guilhermino · Data, BI & Technology',
    langBtn: 'PT', langLabel: 'Mudar para português',
    themeDark: 'Switch to dark theme', themeLight: 'Switch to light theme',
    code: 'Code', demo: 'Live demo', app: 'Open app', dash: 'View dashboard',
    fallback: 'Portfolio project. Details in the repository.',
    preview: 'Preview of',
    empty: 'No projects found. See',
    error: 'Couldn’t load projects right now. See them on',
    myGithub: 'my GitHub'
  }
};

/* Siglas e nomes que devem manter a grafia correta nos títulos */
const ACRONYMS = {
  sql: 'SQL', bi: 'BI', ia: 'IA', ai: 'AI', ml: 'ML', api: 'API', etl: 'ETL', kpi: 'KPI', kpis: 'KPIs', fpa: 'FP&A',
  yolo: 'YOLO', vit: 'ViT', crud: 'CRUD', ui: 'UI', ux: 'UX', nlp: 'NLP', llm: 'LLM', ocr: 'OCR', cnn: 'CNN',
  ehs: 'EHS', erp: 'ERP', sap: 'SAP', crm: 'CRM', rpa: 'RPA', dax: 'DAX', grc: 'GRC', csv: 'CSV',
  html: 'HTML', css: 'CSS', js: 'JS', sp: 'SP', br: 'BR', eda: 'EDA', mvp: 'MVP', os: 'OS',
  pyspark: 'PySpark', powerbi: 'Power BI', github: 'GitHub', javascript: 'JavaScript', typescript: 'TypeScript',
  sqlserver: 'SQL Server', postgresql: 'PostgreSQL', mysql: 'MySQL', nodejs: 'Node.js', vader: 'VADER'
};
/* Palavras que ficam minúsculas no meio do título */
const SMALL_WORDS = new Set(['de', 'da', 'do', 'das', 'dos', 'e', 'em', 'no', 'na', 'com', 'para', 'por', 'a', 'o', 'as',
  'of', 'and', 'the', 'in', 'for', 'with', 'to', 'on', 'vs', 'y', 'del', 'la']);

/**
 * Nome do repositório → título limpo.
 * Aceita "-", "_", ".", "+" e espaços como separadores, e camelCase.
 *   "pyspark-fraud-detection"   → "PySpark Fraud Detection"
 *   "contagem_de_moedas_YOLO"   → "Contagem de Moedas YOLO"
 *   "marketing.analytics_powerbi" → "Marketing Analytics Power BI"
 *   "techFix_ordens-servico"    → "Tech Fix Ordens Servico"
 */
function formatProjectName(name) {
  const tokens = String(name)
    .split(/[\s\-_.+]+/)
    .filter(Boolean)
    .flatMap(t => (ACRONYMS[t.toLowerCase()] ? [t] : t.replace(/([a-z0-9])([A-Z])/g, '$1 $2').split(' ')));

  return tokens.map((word, i) => {
    const lower = word.toLowerCase();
    if (ACRONYMS[lower]) return ACRONYMS[lower];
    if (i > 0 && SMALL_WORDS.has(lower)) return lower;
    if (word.length > 1 && word === word.toUpperCase() && /[A-Z]/.test(word)) return word; // sigla escrita pelo autor
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  }).join(' ');
}

/* ---------- Utilitários ---------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const store = {
  get(k, area = localStorage) { try { return area.getItem(k); } catch { return null; } },
  set(k, v, area = localStorage) { try { area.setItem(k, v); } catch { /* modo privado */ } }
};

/* Testa se uma imagem existe sem bloquear nada */
function probeImage(url) {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img.naturalWidth > 1);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

/* ---------- Tema ---------- */
function initTheme() {
  const btn = $('#theme-toggle');
  const icon = btn.querySelector('i');
  const apply = theme => {
    document.documentElement.setAttribute('data-theme', theme);
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    btn.setAttribute('aria-label', theme === 'dark' ? t('themeLight') : t('themeDark'));
  };
  apply(document.documentElement.getAttribute('data-theme') || 'light');
  btn.addEventListener('click', () => {
    const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    apply(next);
    store.set('theme', next);
  });
}

/* ---------- Estado ---------- */
let currentMode = CONFIG.defaultMode;
let currentLang = CONFIG.defaultLang;
let allProjects = []; // repositórios já carregados
const t = key => UI[currentLang][key];

function setParam(key, value) {
  const url = new URL(location.href);
  if (value === null) url.searchParams.delete(key); else url.searchParams.set(key, value);
  history.replaceState(null, '', url);
}

/* ---------- Idioma ---------- */
const ptOriginal = {}; // português lido do próprio HTML
function setLang(lang, { updateUrl = true } = {}) {
  currentLang = lang === 'en' ? 'en' : 'pt';
  const root = document.documentElement;
  root.lang = currentLang === 'en' ? 'en' : 'pt-BR';
  root.setAttribute('data-lang', currentLang);

  $$('[data-i18n]').forEach(el => {
    const k = el.dataset.i18n;
    if (!(k in ptOriginal)) ptOriginal[k] = el.innerHTML;
    el.innerHTML = currentLang === 'en' && I18N_EN[k] ? I18N_EN[k] : ptOriginal[k];
  });
  $$('[data-i18n-aria]').forEach(el => {
    const k = el.dataset.i18nAria, attr = 'pt:' + k;
    if (!(attr in ptOriginal)) ptOriginal[attr] = el.getAttribute('aria-label');
    el.setAttribute('aria-label', currentLang === 'en' && I18N_EN[k] ? I18N_EN[k] : ptOriginal[attr]);
  });

  document.title = t('title');
  const btn = $('#lang-toggle');
  btn.textContent = t('langBtn');
  btn.setAttribute('aria-label', t('langLabel'));
  btn.setAttribute('lang', currentLang === 'en' ? 'pt-BR' : 'en');
  const themeBtn = $('#theme-toggle');
  themeBtn.setAttribute('aria-label', root.getAttribute('data-theme') === 'dark' ? t('themeLight') : t('themeDark'));

  renderModeTexts();
  updateCvLink();
  if (allProjects.length) renderProjects();

  store.set('lang', currentLang);
  if (updateUrl) setParam('lang', currentLang === 'en' ? 'en' : null);
  root.classList.remove('i18n-pending');
}

function initLang() {
  $('#lang-toggle').addEventListener('click', () => setLang(currentLang === 'en' ? 'pt' : 'en'));
  const fromUrl = new URLSearchParams(location.search).get('lang');
  setLang(fromUrl || store.get('lang') || CONFIG.defaultLang, { updateUrl: false });
}

/* ---------- Foco (modo) ---------- */
function renderModeTexts() {
  const m = MODES[currentMode][currentLang];
  $$('[data-text]').forEach(el => { el.textContent = m[el.dataset.text] || ''; });
}

function setMode(mode, { updateUrl = true } = {}) {
  if (mode === 'dados') mode = 'tech'; // links antigos
  if (!MODES[mode]) mode = CONFIG.defaultMode;
  currentMode = mode;
  document.documentElement.setAttribute('data-mode', mode);

  $$('[data-set-mode]').forEach(b => b.setAttribute('aria-checked', String(b.dataset.setMode === mode)));
  renderModeTexts();

  // Stack: grupos do foco primeiro; os outros ficam mais discretos
  const stack = $('#stack-list');
  $$('.stack__group', stack)
    .map((g, i) => ({ g, i: Number(g.dataset.order ?? (g.dataset.order = i)) }))
    .sort((a, b) => Number(b.g.dataset.modes.split(' ').includes(mode)) - Number(a.g.dataset.modes.split(' ').includes(mode)) || a.i - b.i)
    .forEach(({ g }) => {
      const inMode = g.dataset.modes.split(' ').includes(mode);
      g.classList.toggle('is-dim', !inMode);
      stack.appendChild(g);
    });

  updateCvLink();
  if (allProjects.length) renderProjects();

  store.set('foco', mode);
  if (updateUrl) setParam('foco', mode);
}

function initModes() {
  $$('[data-set-mode]').forEach(b => b.addEventListener('click', () => setMode(b.dataset.setMode)));
  const fromUrl = new URLSearchParams(location.search).get('foco');
  setMode(fromUrl || store.get('foco') || CONFIG.defaultMode, { updateUrl: false });
}

/* ---------- Currículo ---------- */
const fileCache = {};
async function fileExists(url) {
  if (url in fileCache) return fileCache[url];
  try {
    const res = await fetch(url, { method: 'HEAD', cache: 'no-cache' });
    fileCache[url] = res.ok;
  } catch { fileCache[url] = false; }
  return fileCache[url];
}
async function updateCvLink() {
  const link = $('#cv-download');
  const mode = currentMode, lang = currentLang;
  const candidates = [MODES[mode].cv[lang], ...CV_FALLBACK[lang]];
  for (const url of candidates) {
    if (await fileExists(url)) {
      if (mode !== currentMode || lang !== currentLang) return; // trocou no meio
      link.href = url;
      link.hidden = false;
      return;
    }
  }
  if (mode === currentMode && lang === currentLang) link.hidden = true;
}

/* ---------- Projetos ---------- */
async function fetchRepos() {
  const key = 'gh-repos-v2';
  const cached = JSON.parse(store.get(key, sessionStorage) || 'null');
  if (cached && Date.now() - cached.t < CONFIG.cacheMinutes * 60e3) return cached.data;

  try {
    const res = await fetch(`https://api.github.com/users/${CONFIG.username}/repos?sort=pushed&direction=desc&per_page=100`);
    if (!res.ok) throw new Error(`GitHub API ${res.status}`);
    const data = await res.json();
    store.set(key, JSON.stringify({ t: Date.now(), data }), sessionStorage);
    return data;
  } catch (err) {
    if (cached) return cached.data; // limite da API: usa a última lista
    throw err;
  }
}

async function fetchOverlay() {
  try {
    const res = await fetch(CONFIG.overlayUrl, { cache: 'no-cache' });
    if (!res.ok) return {};
    const json = await res.json();
    return Object.fromEntries(Object.entries(json).filter(([k]) => !k.startsWith('_')));
  } catch { return {}; }
}

async function findProjectImage(repo, extra) {
  if (extra.image) return extra.image;

  for (const ext of CONFIG.localImageExts) {
    const url = `assets/${repo.name}.${ext}`;
    if (await probeImage(url)) return url;
  }
  const branch = repo.default_branch || 'main';
  for (const path of CONFIG.previewPaths) {
    const url = `https://raw.githubusercontent.com/${CONFIG.username}/${repo.name}/${branch}/${path}`;
    if (await probeImage(url)) return url;
  }
  // Imagem automática que o GitHub gera para todo repositório
  return `https://opengraph.githubassets.com/1/${CONFIG.username}/${repo.name}`;
}

function scoreForMode(p, mode) {
  const keywords = MODES[mode].topics;
  if (p.extra.modes) return p.extra.modes.includes(mode) ? 100 : 0;
  if (!keywords.length) return 1;
  return (p.topics || []).filter(t => keywords.includes(t.toLowerCase())).length;
}

function rankProjects(mode) {
  return allProjects
    .map((p, i) => ({ p, i, score: scoreForMode(p, mode), order: p.extra.order ?? 999 }))
    .sort((a, b) => (b.score > 0) - (a.score > 0) || a.order - b.order || b.score - a.score || a.i - b.i)
    .slice(0, CONFIG.maxProjects)
    .map(x => x.p);
}

function demoLabel(url) {
  if (/streamlit|hf\.space|huggingface/.test(url)) return t('app');
  if (/tableau|powerbi|app\.powerbi/.test(url)) return t('dash');
  return t('demo');
}

/* Campo do projects.json no idioma atual (ex.: problem_en), com o português como reserva */
const pick = (extra, field) => (currentLang === 'en' && extra[field + '_en']) || extra[field];

function createCard(p) {
  const card = document.createElement('article');
  card.className = 'card';

  const title = pick(p.extra, 'title') || formatProjectName(p.name);
  const problem = pick(p.extra, 'problem') || p.description || t('fallback');
  const result = pick(p.extra, 'result');
  const homepage = p.extra.demo || p.homepage || '';
  const isOwnSite = /^https?:\/\/waltercordeiroguilhermino\.github\.io\/?$/i.test(homepage);
  const hasDemo = homepage && !isOwnSite;
  const topics = (p.topics || []).filter(t => t !== CONFIG.portfolioTopic).slice(0, 5);

  card.innerHTML = `
    <div class="card__thumb"><img alt="${esc(t('preview'))} ${esc(title)}" loading="lazy" decoding="async"></div>
    <div class="card__body">
      <h3>${esc(title)}</h3>
      <p class="card__problem">${esc(problem)}</p>
      ${result ? `<p class="card__result"><i class="fas fa-arrow-trend-up" aria-hidden="true"></i><span>${esc(result)}</span></p>` : ''}
      ${topics.length ? `<ul class="tags">${topics.map(t => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
      <div class="card__links">
        <a href="${esc(p.html_url)}" target="_blank" rel="noopener"><i class="fab fa-github" aria-hidden="true"></i> ${t('code')}</a>
        ${hasDemo ? `<a href="${esc(homepage)}" target="_blank" rel="noopener"><i class="fas fa-arrow-up-right-from-square" aria-hidden="true"></i> ${demoLabel(homepage)}</a>` : ''}
      </div>
    </div>`;

  // A imagem chega depois, sem segurar o card
  const img = card.querySelector('img');
  img.addEventListener('load', () => img.classList.add('is-loaded'));
  img.addEventListener('error', () => { if (!img.src.endsWith(CONFIG.defaultImage)) img.src = CONFIG.defaultImage; });
  p.imagePromise.then(url => { img.src = url; });

  return card;
}

function renderProjects() {
  const list = $('#projects-list');
  const ranked = rankProjects(currentMode);
  list.replaceChildren(...ranked.map(createCard));
}

async function loadProjects() {
  const list = $('#projects-list');
  list.innerHTML = Array(3).fill('<div class="card skeleton" aria-hidden="true"></div>').join('');

  try {
    const [repos, overlay] = await Promise.all([fetchRepos(), fetchOverlay()]);
    allProjects = repos
      .filter(r => !r.fork && !r.archived && r.topics?.includes(CONFIG.portfolioTopic))
      .map(r => {
        const p = { ...r, extra: overlay[r.name] || {} };
        p.imagePromise = findProjectImage(p, p.extra); // todas as capas em paralelo
        return p;
      });

    if (!allProjects.length) {
      list.innerHTML = `<p class="state">${t('empty')} <a href="https://github.com/${CONFIG.username}" target="_blank" rel="noopener">${t('myGithub')}</a>.</p>`;
      return;
    }
    renderProjects();
  } catch (err) {
    console.error('Erro ao carregar projetos:', err);
    list.innerHTML = `<p class="state">${t('error')} <a href="https://github.com/${CONFIG.username}" target="_blank" rel="noopener">${t('myGithub')}</a>.</p>`;
  }
}

/* ---------- Início ---------- */
document.addEventListener('DOMContentLoaded', () => {
  $('#year').textContent = new Date().getFullYear();
  initModes();
  initLang();
  initTheme();
  loadProjects();
});
