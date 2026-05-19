// navigation.js — 카테고리 전환, 화살표 순환, 모바일 햄버거, 스크롤 헤더, URL hash.

import { isModalOpen } from "./image-modal.js";

const ORDER = ["home", "career", "awards-talks", "reading", "contact"];

// 카테고리별 서브 섹션 anchor — URL 직접 접근(#career-history 등) 처리용.
const SUB_TO_PARENT = {
  "career-introduce": "career",
  "career-history":   "career",
  "career-academic":  "career",
  "career-training":  "career",
  "at-awards":        "awards-talks",
  "at-talks":         "awards-talks",
};

// 카테고리 → 헤더 로고 텍스트. ko/en 동일하게 영문 카테고리명 사용.
const NAV_TITLE = {
  career:         "Career",
  "awards-talks": "Awards / Talks",
  reading:        "Reading",
  contact:        "Contact",
};

export function initNavigation() {
  const header   = document.getElementById("topNav");
  const menu     = document.getElementById("topNavMenu");
  const links    = document.querySelectorAll("[data-nav]:not(.page)");
  const pages    = document.querySelectorAll(".page");
  const prevBtn  = document.querySelector(".nav-arrow--prev");
  const nextBtn  = document.querySelector(".nav-arrow--next");
  const burger   = document.querySelector(".hamburger");
  const logoMobile = document.querySelector(".top-nav__logo-mobile");

  // ---- 로고 텍스트 갱신 (모바일에서만 노출 — PC는 별도 고정 로고) ----
  function updateLogo(name) {
    if (!logoMobile) return;
    logoMobile.textContent = NAV_TITLE[name] || "yimwooyoung";
  }

  // ---- 카테고리 전환 ----
  function goTo(name, { updateHash = true, scrollToId = null } = {}) {
    if (!ORDER.includes(name)) name = "home";

    pages.forEach(p => {
      p.classList.toggle("page--active", p.dataset.nav === name);
    });
    links.forEach(l => {
      l.classList.toggle("is-active", l.dataset.nav === name);
    });

    updateLogo(name);

    if (updateHash) {
      const newHash = `#${scrollToId || name}`;
      if (location.hash !== newHash) {
        history.pushState({ nav: name }, "", newHash);
      }
    }

    closeMenu();
    if (scrollToId) {
      // 페이지 표시 직후 anchor로 스크롤 (display 전환 후 layout 필요).
      requestAnimationFrame(() => {
        document.getElementById(scrollToId)?.scrollIntoView({ behavior: "auto", block: "start" });
      });
    } else {
      window.scrollTo({ top: 0, behavior: "auto" });
    }
  }

  // ---- 클릭 위임 (헤더 링크 + Home 히어로 CTA 등) ----
  document.addEventListener("click", (e) => {
    const target = e.target.closest("a[href^='#']");
    if (!target) return;

    const hash = target.getAttribute("href");
    const id = hash.slice(1);
    if (ORDER.includes(id)) {
      e.preventDefault();
      goTo(id);
      return;
    }
    if (id in SUB_TO_PARENT) {
      // 부모 페이지가 이미 활성이면 서브메뉴 자체 핸들러(smooth scroll)가 처리하도록 패스.
      const parent = SUB_TO_PARENT[id];
      const parentActive = document.getElementById(parent)?.classList.contains("page--active");
      if (!parentActive) {
        e.preventDefault();
        goTo(parent, { scrollToId: id });
      }
    }
  });

  // ---- 화살표 순환 ----
  function step(delta) {
    const current = getCurrentName();
    const idx = ORDER.indexOf(current);
    const next = ORDER[(idx + delta + ORDER.length) % ORDER.length];
    goTo(next);
  }
  prevBtn?.addEventListener("click", () => step(-1));
  nextBtn?.addEventListener("click", () => step(+1));

  // ---- 키보드: ←/→ (모달/모바일 메뉴 열림 상태에서는 무시) ----
  document.addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea, [contenteditable]")) return;
    if (isModalOpen()) return;
    if (menu?.classList.contains("is-open")) return;
    if (e.key === "ArrowLeft")  step(-1);
    if (e.key === "ArrowRight") step(+1);
  });

  // ---- 터치 스와이프: 좌/우로 카테고리 전환 (PC 화살표와 동일 동작) ----
  // 임계값: 수평 이동 > 60px, 수평 우세(|dx| > 1.5 * |dy|), 시간 < 600ms.
  // 가로 스크롤 영역(서브탭 등)이나 모달/햄버거 열림 시 무시.
  const SWIPE_THRESHOLD = 60;
  const SWIPE_RATIO     = 1.5;
  const SWIPE_TIMEOUT   = 600;
  let touchStart = null;

  function isInsideHorizontalScroller(el) {
    let n = el;
    while (n && n !== document.body) {
      if (n.classList?.contains("career-submenu") ||
          n.classList?.contains("at-submenu")) return true;
      n = n.parentElement;
    }
    return false;
  }

  document.addEventListener("touchstart", (e) => {
    if (e.touches.length !== 1) { touchStart = null; return; }
    if (isModalOpen()) return;
    if (menu?.classList.contains("is-open")) return;
    if (isInsideHorizontalScroller(e.target)) return;
    const t0 = e.touches[0];
    touchStart = { x: t0.clientX, y: t0.clientY, time: Date.now() };
  }, { passive: true });

  document.addEventListener("touchend", (e) => {
    if (!touchStart) return;
    const t1 = e.changedTouches[0];
    const dx = t1.clientX - touchStart.x;
    const dy = t1.clientY - touchStart.y;
    const dt = Date.now() - touchStart.time;
    touchStart = null;
    if (dt > SWIPE_TIMEOUT) return;
    if (Math.abs(dx) < SWIPE_THRESHOLD) return;
    if (Math.abs(dx) < SWIPE_RATIO * Math.abs(dy)) return;
    step(dx < 0 ? +1 : -1); // 왼쪽으로 스와이프 → 다음 카테고리
  }, { passive: true });

  document.addEventListener("touchcancel", () => { touchStart = null; }, { passive: true });

  // ---- 햄버거 메뉴 ----
  function openMenu() {
    if (!menu || !burger) return;
    menu.classList.add("is-open");
    burger.setAttribute("aria-expanded", "true");
    burger.setAttribute("aria-label", "메뉴 닫기");
  }
  function closeMenu() {
    if (!menu || !burger) return;
    menu.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "메뉴 열기");
  }
  burger?.addEventListener("click", () => {
    const expanded = burger.getAttribute("aria-expanded") === "true";
    expanded ? closeMenu() : openMenu();
  });

  // 패널 외부 영역 클릭/터치 시 자동 닫힘 (모바일 UX)
  document.addEventListener("click", (e) => {
    if (!menu?.classList.contains("is-open")) return;
    if (menu.contains(e.target) || burger?.contains(e.target)) return;
    closeMenu();
  });

  // ---- 스크롤 시 헤더 축소 + 블러 강화 ----
  let ticking = false;
  function onScroll() {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      header?.classList.toggle("is-scrolled", window.scrollY > 16);
      ticking = false;
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });

  // ---- 뒤로가기 / 직접 hash 입력 ----
  window.addEventListener("popstate", () => {
    routeFromHash((location.hash || "#home").slice(1), { updateHash: false });
  });
  // URL 바에서 hash만 직접 바꿔 입력한 경우(reload 없이) — popstate가 아닌 hashchange로 옴
  window.addEventListener("hashchange", () => {
    routeFromHash((location.hash || "#home").slice(1), { updateHash: false });
  });

  // ---- 초기 진입 ----
  routeFromHash((location.hash || "#home").slice(1), { updateHash: false });

  function routeFromHash(id, opts) {
    if (ORDER.includes(id)) {
      goTo(id, opts);
    } else if (id in SUB_TO_PARENT) {
      goTo(SUB_TO_PARENT[id], { ...opts, scrollToId: id });
    } else {
      goTo("home", opts);
    }
  }

  function getCurrentName() {
    const active = document.querySelector(".page.page--active");
    return active?.dataset.nav || "home";
  }
}
