// theme.js — 다크/라이트 토글. localStorage에 사용자 선택 저장.
// 명시적 선택이 없으면 시스템 설정(prefers-color-scheme)을 따른다.

import { t } from "./i18n.js";

const STORAGE_KEY = "wy-theme";

export function initTheme() {
  const toggle = document.querySelector(".theme-toggle");
  if (!toggle) return;

  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "dark" || saved === "light") {
    document.documentElement.setAttribute("data-theme", saved);
  }
  updateAria();

  toggle.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme");
    const next = current === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem(STORAGE_KEY, next);
    updateAria();
  });

  document.addEventListener("languagechange", updateAria);

  function updateAria() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark"
      || (!document.documentElement.hasAttribute("data-theme")
          && matchMedia("(prefers-color-scheme: dark)").matches);
    toggle.setAttribute("aria-label", isDark ? t("header.themeToLight") : t("header.themeToDark"));
  }
}
