// app.js — 진입점. 모듈 초기화 + 스크롤 트리거 페이드인.

import { initNavigation } from "./navigation.js";
import { initTheme }      from "./theme.js";
import { initI18n }       from "./i18n.js";
import { initImageModal } from "./image-modal.js";
import { initBio }        from "./bio.js";
import { initCareer }     from "./timeline.js";
import { initAwardsTalks } from "./awards-talks.js";
import { initReading }    from "./reading.js";

function initScrollReveal() {
  const targets = document.querySelectorAll(".fade-in, .slide-up, .slide-left, .slide-right");
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
  }, { threshold: 0.15, rootMargin: "0px 0px -40px 0px" });

  targets.forEach(el => el.classList.contains("is-visible") || io.observe(el));
}

function watchPageActivation(id, init) {
  const el = document.getElementById(id);
  if (!el) return;

  const tryInit = () => {
    if (el.classList.contains("page--active")) init();
  };
  tryInit();

  const mo = new MutationObserver(tryInit);
  mo.observe(el, { attributes: true, attributeFilter: ["class"] });
}

async function boot() {
  initTheme();
  await initI18n();
  initNavigation();
  initImageModal();
  initScrollReveal();
  watchPageActivation("career", () => { initCareer(); initBio(); });
  watchPageActivation("awards-talks", initAwardsTalks);
  watchPageActivation("reading", initReading);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", boot);
} else {
  boot();
}
