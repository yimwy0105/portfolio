// i18n.js — KO/EN 토글. locales/{lang}.json 로드 후 data-i18n="key" 요소를 갱신.
// 언어 변경 시 'languagechange' 커스텀 이벤트를 발행 → 데이터 렌더러가 받아서 재렌더.

const STORAGE_KEY = "wy-lang";
const SUPPORTED   = ["ko", "en"];
const DEFAULT     = "ko";

const cache = {};
let currentLang = DEFAULT;

export function getCurrentLang() { return currentLang; }

export function t(key) {
  const dict = cache[currentLang];
  return (dict && key in dict) ? dict[key] : key;
}

async function loadLocale(lang) {
  if (cache[lang]) return cache[lang];
  try {
    const res = await fetch(`locales/${lang}.json`, { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    cache[lang] = await res.json();
    return cache[lang];
  } catch (err) {
    console.warn(`[i18n] Failed to load ${lang}.json`, err);
    cache[lang] = {};
    return cache[lang];
  }
}

function apply(lang) {
  const dict = cache[lang] || {};
  currentLang = lang;
  document.documentElement.setAttribute("lang", lang);

  // 일반 텍스트
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (key && key in dict) el.textContent = dict[key];
  });

  // 속성 번역: data-i18n-attr="aria-label:key,title:key2"
  document.querySelectorAll("[data-i18n-attr]").forEach(el => {
    el.dataset.i18nAttr.split(",").forEach(pair => {
      const [attr, key] = pair.split(":").map(s => s && s.trim());
      if (attr && key && key in dict) el.setAttribute(attr, dict[key]);
    });
  });

  // meta title / description
  if ("meta.title" in dict)       document.title = dict["meta.title"];
  if ("meta.description" in dict) {
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute("content", dict["meta.description"]);
  }

  document.dispatchEvent(new CustomEvent("languagechange", { detail: { lang } }));
}

function updateToggle(toggle) {
  if (!toggle) return;
  // 현재 KO면 다음 전환 대상인 "EN"을, 현재 EN면 "KO"를 라벨로 표시한다.
  const label = toggle.querySelector(".language-toggle__label");
  if (label) label.textContent = currentLang === "ko" ? "EN" : "KO";
  toggle.setAttribute("data-lang-current", currentLang);
  toggle.setAttribute("aria-label", currentLang === "ko" ? "Switch to English" : "한국어로 전환");
}

export async function initI18n() {
  const toggle = document.querySelector(".language-toggle");

  const saved   = localStorage.getItem(STORAGE_KEY);
  const initial = SUPPORTED.includes(saved) ? saved : DEFAULT;

  await Promise.all(SUPPORTED.map(loadLocale));
  apply(initial);
  updateToggle(toggle);

  toggle?.addEventListener("click", () => {
    const next = currentLang === "ko" ? "en" : "ko";
    localStorage.setItem(STORAGE_KEY, next);
    apply(next);
    updateToggle(toggle);
  });
}
