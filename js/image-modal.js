// image-modal.js — 공용 이미지 확대 모달. 열기/닫기 핸들러를 한 번만 부트한다.

let modal = null;
let img = null;
let lastFocused = null;

// PNG/JPG 경로를 .webp로 치환. 변환 실패 시 원본 fallback (img onerror).
function toWebp(src) {
  return src.replace(/\.(png|jpe?g)$/i, ".webp");
}

// WebP 우선 + 원본 fallback 마크업. 데이터 JSON의 .png 경로를 그대로 사용한다.
export function picture(src, alt, attrs = "") {
  const esc = (s) => String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;");
  return `
    <picture>
      <source srcset="${esc(toWebp(src))}" type="image/webp">
      <img ${attrs} src="${esc(src)}" alt="${esc(alt)}">
    </picture>
  `;
}

export function initImageModal() {
  modal = document.getElementById("imageModal");
  if (!modal) return;
  img = modal.querySelector(".image-modal__image");
  const closeBtn = modal.querySelector(".image-modal__close");

  closeBtn?.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && !modal.hidden) closeModal();
  });
}

export function isModalOpen() {
  return !!modal && !modal.hidden;
}

export function bindImageClicks(root) {
  if (!modal || !img || !root) return;
  root.querySelectorAll(".project-card__image-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const src = btn.dataset.imageSrc;
      if (!src) return;
      lastFocused = btn;
      const webp = toWebp(src);
      img.onerror = () => { img.onerror = null; img.src = src; };
      img.src = webp;
      img.alt = btn.querySelector("img")?.alt || "";
      modal.hidden = false;
      document.body.style.overflow = "hidden";
      modal.querySelector(".image-modal__close")?.focus();
    });
  });
}

function closeModal() {
  if (!modal || !img) return;
  modal.hidden = true;
  img.removeAttribute("src");
  document.body.style.overflow = "";
  lastFocused?.focus?.();
  lastFocused = null;
}
