// bio.js — Career > Introduce 자기소개 상세 토글. 클릭 시 본문 로드 + 펼치고 부드럽게 스크롤.

import { getCurrentLang, t } from "./i18n.js";

let initialized = false;
let loaded = false;

export function initBio() {
  if (initialized) return;
  initialized = true;

  const btn  = document.getElementById("bioToggleBtn");
  const bio  = document.getElementById("careerBio");
  const label = btn?.querySelector(".bio-toggle__label");
  if (!btn || !bio) return;

  btn.addEventListener("click", async () => {
    const expanded = btn.getAttribute("aria-expanded") === "true";
    if (expanded) {
      bio.hidden = true;
      btn.setAttribute("aria-expanded", "false");
      btn.classList.remove("bio-toggle--open");
      if (label) label.textContent = t("career.bio.openLabel");
      return;
    }

    if (!loaded) {
      await loadAndRender(bio);
      loaded = true;
    }
    bio.hidden = false;
    btn.setAttribute("aria-expanded", "true");
    btn.classList.add("bio-toggle--open");
    if (label) label.textContent = t("career.bio.closeLabel");

    requestAnimationFrame(() => {
      bio.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  // 언어 변경 시 이미 로드된 본문이면 재로드, 버튼 라벨 갱신.
  document.addEventListener("languagechange", async () => {
    if (loaded) await loadAndRender(bio);
    if (!label) return;
    const expanded = btn.getAttribute("aria-expanded") === "true";
    label.textContent = t(expanded ? "career.bio.closeLabel" : "career.bio.openLabel");
  });
}

async function loadAndRender(root) {
  const lang = getCurrentLang();
  try {
    const res = await fetch(`data/bio_${lang}.json`, { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    root.innerHTML = renderBio(data);
  } catch (err) {
    root.innerHTML = `<p class="timeline__error">${escapeHTML(t("common.error"))} (${escapeHTML(err.message)})</p>`;
  }
}

function renderBio(data) {
  const paragraphs = (data.paragraphs || []).map(p => `<p class="bio__paragraph">${escapeHTML(p)}</p>`).join("");
  const strengths  = (data.strengths || []).map(s => `
    <li class="bio__strength">
      <strong class="bio__strength-label">${escapeHTML(s.label)}</strong>
      <span class="bio__strength-body">${escapeHTML(s.body)}</span>
    </li>
  `).join("");

  return `
    <h3 class="bio__title">${escapeHTML(data.title || "")}</h3>
    ${paragraphs}
    ${data.strengthsTitle ? `<p class="bio__strengths-title">${escapeHTML(data.strengthsTitle)}</p>` : ""}
    ${strengths ? `<ul class="bio__strengths">${strengths}</ul>` : ""}
    ${data.closing ? `<p class="bio__closing">${escapeHTML(data.closing)}</p>` : ""}
  `;
}

function escapeHTML(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
