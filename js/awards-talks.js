// awards-talks.js — Awards / Talks 섹션: 서브메뉴 동기화, Awards 타임라인 + Talks 카드 렌더.

import { getCurrentLang, t } from "./i18n.js";
import { bindImageClicks, picture } from "./image-modal.js";

let initialized = false;

export function initAwardsTalks() {
  if (initialized) return;
  initialized = true;

  setupSubmenu();
  loadAwards();
  loadTalks();

  document.addEventListener("languagechange", () => {
    loadAwards();
    loadTalks();
  });
}

/* ---------- Submenu ---------- */
function setupSubmenu() {
  const links = document.querySelectorAll("#awards-talks .at-submenu__link");
  if (!links.length) return;

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      const id = link.getAttribute("href").slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      setActive(id);
    });
  });

  const sections = ["at-awards", "at-talks"]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (!("IntersectionObserver" in window) || !sections.length) return;

  const io = new IntersectionObserver((entries) => {
    let bestId = null;
    let bestRatio = 0;
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio > bestRatio) {
        bestRatio = entry.intersectionRatio;
        bestId = entry.target.id;
      }
    });
    if (bestId) setActive(bestId);
  }, { threshold: [0.15, 0.4, 0.7], rootMargin: "-80px 0px -40% 0px" });

  sections.forEach(s => io.observe(s));
}

function setActive(id) {
  document.querySelectorAll("#awards-talks .at-submenu__link").forEach(l => {
    l.classList.toggle("is-active", l.dataset.sub === id);
  });
}

/* ---------- Awards ---------- */
async function loadAwards() {
  const root = document.getElementById("awardsTimelineRoot");
  if (!root) return;

  const lang = getCurrentLang();
  try {
    const res = await fetch(`data/awards_${lang}.json`, { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    renderAwards(root, data.awards || []);
  } catch (err) {
    root.innerHTML = `<p class="timeline__error">${escapeHTML(t("common.error"))} (${escapeHTML(err.message)})</p>`;
  }
}

function renderAwards(root, items) {
  root.removeAttribute("data-loading");
  const sorted = [...items].sort((a, b) => dateKey(b.date) - dateKey(a.date));
  root.innerHTML = `<ol class="timeline__projects">${sorted.map(renderAwardItem).join("")}</ol>`;

  observeReveal(root);
  bindImageClicks(root);
}

function gradeLabel(grade) {
  const key = `awards.grade.${grade}`;
  const val = t(key);
  if (val !== key) return val;
  return t("awards.grade.default");
}

function renderAwardItem(it) {
  const grade = (it.grade || "").toLowerCase();
  const label = gradeLabel(grade);
  const imageList = Array.isArray(it.images) && it.images.length
    ? it.images
    : (it.image ? [it.image] : []);
  const image = imageList.length ? `
    <div class="award-card__cert ${imageList.length > 1 ? "award-card__cert--multi" : ""}">
      ${imageList.map(src => `
        <button type="button" class="project-card__image-btn" data-image-src="${escapeAttr(src)}" aria-label="수상증 확대 보기">
          ${picture(src, `${it.title} 수상증`, 'loading="lazy" decoding="async"')}
        </button>
      `).join("")}
    </div>` : "";

  return `
    <li class="timeline__project slide-up">
      <div class="timeline__dot" aria-hidden="true"></div>
      <article class="project-card award-card">
        <div class="award-card__head">
          <span class="award-badge award-badge--${escapeAttr(grade || "default")}" aria-hidden="true">
            ${badgeIcon()}
            <span class="award-badge__text">${escapeHTML(label)}</span>
          </span>
          <div class="award-card__meta-wrap">
            <h4 class="award-card__title">${escapeHTML(it.title)}</h4>
            <p class="project-card__meta">
              <span>${escapeHTML(it.issuer || "")}</span>
              ${it.date ? `<span class="dot-sep">·</span><span>${escapeHTML(it.date)}</span>` : ""}
            </p>
          </div>
        </div>
        ${image}
      </article>
    </li>
  `;
}

function badgeIcon() {
  return `
    <svg class="award-badge__icon" viewBox="0 0 24 24" width="20" height="20" aria-hidden="true">
      <circle cx="12" cy="9" r="6" fill="none" stroke="currentColor" stroke-width="2"/>
      <path d="M8.5 13.5L7 22l5-3 5 3-1.5-8.5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>
      <circle cx="12" cy="9" r="2.5" fill="currentColor"/>
    </svg>
  `;
}

/* ---------- Talks ---------- */
async function loadTalks() {
  const root = document.getElementById("talksRoot");
  if (!root) return;

  const lang = getCurrentLang();
  try {
    const res = await fetch(`data/talks_${lang}.json`, { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    renderTalks(root, data.talks || []);
  } catch (err) {
    root.innerHTML = `<p class="timeline__error">${escapeHTML(t("common.error"))} (${escapeHTML(err.message)})</p>`;
  }
}

function renderTalks(root, items) {
  root.removeAttribute("data-loading");
  const sorted = [...items].sort((a, b) => dateKey(b.date) - dateKey(a.date));
  root.innerHTML = `<div class="talks-grid">${sorted.map(renderTalkCard).join("")}</div>`;

  observeReveal(root);
  bindImageClicks(root);
}

function renderTalkCard(it) {
  const hasDesc = it.description && it.description.trim();
  const hasImages = Array.isArray(it.images) && it.images.length > 0;
  const imageBlock = hasImages
    ? it.images.map(src => `
        <button type="button" class="project-card__image-btn" data-image-src="${escapeAttr(src)}" aria-label="강연 이미지 확대 보기">
          ${picture(src, `${it.event} 강연 이미지`, 'loading="lazy" decoding="async"')}
        </button>
      `).join("")
    : `<div class="talk-card__image-placeholder" aria-hidden="true">
        <svg viewBox="0 0 24 24" width="32" height="32">
          <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" stroke-width="1.5"/>
          <circle cx="9" cy="11" r="1.5" fill="currentColor"/>
          <path d="M21 17l-5-5-8 8" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
        </svg>
        <span>${escapeHTML(t("talks.imagePlaceholder"))}</span>
      </div>`;

  return `
    <article class="talk-card slide-up">
      <div class="talk-card__image">${imageBlock}</div>
      <div class="talk-card__body">
        <p class="talk-card__date">${escapeHTML(it.date || "")}</p>
        <h3 class="talk-card__event">${escapeHTML(it.event || "")}</h3>
        <p class="talk-card__session">${escapeHTML(it.session || "")}</p>
        ${hasDesc ? `<p class="talk-card__desc">${escapeHTML(it.description)}</p>` : ""}
      </div>
    </article>
  `;
}

/* ---------- helpers ---------- */
function dateKey(d) {
  const m = String(d || "").match(/(\d{4})\.(\d{2})\.(\d{2})/);
  return m ? parseInt(m[1] + m[2] + m[3], 10) : 0;
}

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

  targets.forEach(el => el.classList.contains("is-visible") || io.observe(el));
}

function escapeHTML(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
function escapeAttr(s) { return escapeHTML(s); }
