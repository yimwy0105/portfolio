// timeline.js — Career 섹션: 서브메뉴 스크롤 동기화, 타임라인 렌더, 이미지 모달, Education(학력/자격) 통합.

import { getCurrentLang, t } from "./i18n.js";
import { bindImageClicks, picture } from "./image-modal.js";

let initialized = false;

export function initCareer() {
  if (initialized) return;
  initialized = true;

  setupSubmenu();
  loadAndRenderTimeline();
  loadAndRenderEducation();

  document.addEventListener("languagechange", () => {
    loadAndRenderTimeline();
    loadAndRenderEducation();
  });
}

/* ---------- Submenu: 클릭 스크롤 + 스크롤 위치에 따른 활성 표시 ---------- */
function setupSubmenu() {
  const links = document.querySelectorAll(".career-submenu__link");
  if (!links.length) return;

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveSubmenu(id);
    });
  });

  const sections = ["career-introduce", "career-history", "career-academic", "career-training"]
    .map(id => document.getElementById(id))
    .filter(Boolean);
  if (!sections.length) return;

  // 헤더 높이만큼 띄운 viewport 상단을 기준선으로, 그 선을 이미 지나간 마지막 섹션을 활성화.
  // 섹션 길이에 상관없이 스크롤 순서대로 일관되게 활성 표시가 진행된다.
  const OFFSET = 120;
  let rafId = 0;

  function update() {
    rafId = 0;
    let activeId = sections[0].id;
    for (const s of sections) {
      if (s.getBoundingClientRect().top - OFFSET <= 0) activeId = s.id;
      else break;
    }
    setActiveSubmenu(activeId);
  }

  function onScroll() {
    if (rafId) return;
    rafId = requestAnimationFrame(update);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  update();
}

function setActiveSubmenu(id) {
  let activeLink = null;
  document.querySelectorAll(".career-submenu__link").forEach(l => {
    const isActive = l.dataset.sub === id;
    l.classList.toggle("is-active", isActive);
    if (isActive) activeLink = l;
  });
  // 모바일에선 서브탭이 가로 스크롤(.career-submenu). 활성 탭을 컨테이너 좌측에 강제 정렬.
  // inline:"start" 가 가장 가까운 가로 스크롤 부모만 정렬해 window 세로 스크롤엔 영향 없음.
  activeLink?.scrollIntoView({ inline: "start", block: "nearest", behavior: "smooth" });
}

/* ---------- Data load + render ---------- */
async function loadAndRenderTimeline() {
  const root = document.getElementById("timelineRoot");
  if (!root) return;

  const lang = getCurrentLang();
  try {
    const res = await fetch(`data/career_${lang}.json`, { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    renderTimeline(root, data);
  } catch (err) {
    root.innerHTML = `<p class="timeline__error">${escapeHTML(t("common.error"))} (${escapeHTML(err.message)})</p>`;
  }
}

function renderTimeline(root, data) {
  const companies = Array.isArray(data?.companies) ? data.companies : [];
  root.removeAttribute("data-loading");
  root.innerHTML = companies.map(renderCompany).join("");

  observeReveal(root);
  bindImageClicks(root);
}

function renderCompany(company) {
  const info = company.info || {};
  const infoLines = [
    info.business  && `<li><span class="company-info__label">${escapeHTML(t("career.info.business"))}</span><span>${escapeHTML(info.business)}</span></li>`,
    info.revenue   && `<li><span class="company-info__label">${escapeHTML(t("career.info.revenue"))}</span><span>${escapeHTML(info.revenue)}</span></li>`,
    info.employees && `<li><span class="company-info__label">${escapeHTML(t("career.info.employees"))}</span><span>${escapeHTML(info.employees)}</span></li>`,
  ].filter(Boolean).join("");

  const projects = (company.projects || []).map(renderProject).join("");

  return `
    <section class="timeline__company" data-company="${escapeAttr(company.id)}">
      <header class="timeline__company-header slide-up">
        <div class="timeline__dot timeline__dot--major" aria-hidden="true"></div>
        <div class="timeline__company-meta">
          <h3 class="timeline__company-name">${escapeHTML(company.name)}</h3>
          <p class="timeline__company-sub">
            <span>${escapeHTML(company.period)}</span>
            <span class="dot-sep">·</span>
            <span>${escapeHTML(company.duration)}</span>
            ${company.position ? `<span class="dot-sep">·</span><span>${escapeHTML(company.position)}</span>` : ""}
            ${company.department ? `<span class="dot-sep">·</span><span>${escapeHTML(company.department)}</span>` : ""}
          </p>
          ${infoLines ? `<ul class="company-info">${infoLines}</ul>` : ""}
        </div>
      </header>

      <ol class="timeline__projects">
        ${projects}
      </ol>
    </section>
  `;
}

function renderProject(project) {
  const tasks = (project.tasks || [])
    .map(t => `<li>${escapeHTML(t)}</li>`)
    .join("");

  const images = (project.images || []);
  const gallery = images.length
    ? `<div class="project-card__gallery ${images.length > 1 ? "project-card__gallery--scroll" : ""}">
        ${images.map(src => `
          <button type="button" class="project-card__image-btn" data-image-src="${escapeAttr(src)}" aria-label="이미지 확대 보기">
            ${picture(src, `${project.title} 포트폴리오 이미지`, 'loading="lazy" decoding="async"')}
          </button>
        `).join("")}
      </div>`
    : "";

  return `
    <li class="timeline__project slide-up">
      <div class="timeline__dot" aria-hidden="true"></div>
      <article class="project-card">
        <h4 class="project-card__title">${escapeHTML(project.title)}</h4>
        <p class="project-card__meta">
          <span>${escapeHTML(project.period)}</span>
          ${project.team ? `<span class="dot-sep">·</span><span>${escapeHTML(project.team)}</span>` : ""}
        </p>
        ${tasks ? `<ul class="project-card__tasks">${tasks}</ul>` : ""}
        ${gallery}
      </article>
    </li>
  `;
}

/* ---------- Reveal observer (렌더 후 새 요소에 대해) ---------- */
function observeReveal(root) {
  const targets = root.querySelectorAll(".fade-in, .slide-up, .slide-left, .slide-right");
  if (!("IntersectionObserver" in window)) {
    targets.forEach(el => el.classList.add("is-visible"));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

  targets.forEach(el => io.observe(el));
}

/* ---------- HTML escape ---------- */
function escapeHTML(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
function escapeAttr(s) { return escapeHTML(s); }

/* ==========================================================
 * Education — Academic / Training (기존 education.js 통합)
 * ========================================================== */
async function loadAndRenderEducation() {
  const academicRoot = document.getElementById("academicTimelineRoot");
  const trainingRoot = document.getElementById("trainingTimelineRoot");
  if (!academicRoot || !trainingRoot) return;

  const lang = getCurrentLang();
  try {
    const res = await fetch(`data/education_${lang}.json`, { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();

    renderAcademic(academicRoot, data.academic || []);
    renderTraining(trainingRoot, data.training || []);

    observeReveal(document.getElementById("career"));
  } catch (err) {
    const msg = `<p class="timeline__error">${escapeHTML(t("common.error"))} (${escapeHTML(err.message)})</p>`;
    academicRoot.innerHTML = msg;
    trainingRoot.innerHTML = msg;
  }
}

/* ---------- Render: Academic ---------- */
function renderAcademic(root, items) {
  root.removeAttribute("data-loading");
  const sorted = [...items].sort((a, b) => eduPeriodKey(b.period) - eduPeriodKey(a.period));
  root.innerHTML = `<ol class="timeline__projects">${sorted.map(renderAcademicItem).join("")}</ol>`;
}

function renderAcademicItem(it) {
  const period = formatEduPeriod(it.period);
  const metaParts = [
    `<span>${escapeHTML(period)}</span>`,
    it.major  && `<span class="dot-sep">·</span><span>${escapeHTML(it.major)}</span>`,
    it.degree && `<span class="dot-sep">·</span><span>${escapeHTML(it.degree)}</span>`,
  ].filter(Boolean).join("");

  return `
    <li class="timeline__project slide-up">
      <div class="timeline__dot" aria-hidden="true"></div>
      <article class="project-card">
        <h4 class="project-card__title">${escapeHTML(it.school)}</h4>
        <p class="project-card__meta">${metaParts}</p>
      </article>
    </li>
  `;
}

/* ---------- Render: Training ---------- */
function renderTraining(root, items) {
  root.removeAttribute("data-loading");
  const sorted = [...items].sort((a, b) => eduPeriodKey(b.period) - eduPeriodKey(a.period));
  root.innerHTML = `<ol class="timeline__projects">${sorted.map(renderTrainingItem).join("")}</ol>`;
}

function renderTrainingItem(it) {
  const period = formatEduPeriod(it.period);
  return `
    <li class="timeline__project slide-up">
      <div class="timeline__dot" aria-hidden="true"></div>
      <article class="project-card">
        <h4 class="project-card__title">${escapeHTML(it.name)}</h4>
        <p class="project-card__meta">
          <span>${escapeHTML(period)}</span>
          ${it.institution ? `<span class="dot-sep">·</span><span>${escapeHTML(it.institution)}</span>` : ""}
        </p>
      </article>
    </li>
  `;
}

/* ---------- Education helpers ---------- */
function eduPeriodKey(period) {
  const m = String(period || "").match(/(\d{4})\.(\d{2})/);
  return m ? parseInt(m[1], 10) * 100 + parseInt(m[2], 10) : 0;
}

function formatEduPeriod(period) {
  const m = String(period || "").match(/(\d{4}\.\d{2})\s*~\s*(\d{4}\.\d{2})/);
  if (m && m[1] === m[2]) return m[1];
  return period;
}
