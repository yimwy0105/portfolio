// reading.js — data/reading.json을 불러와 책 카드 그리드로 렌더링.

const DATA_URL = "data/reading.json";

const STATUS_ORDER = { "읽는중": 0, "완료": 1, "읽기보류": 2, "읽기전": 3, "구매희망": 4, "백과사전": 5 };

const FORMAT_LABEL = {
  Paper: "종이책",
  AudioBook: "오디오북",
  eBook: "전자책",
  Library: "도서관",
};

let initialized = false;

export async function initReading() {
  if (initialized) return;
  initialized = true;

  const root = document.getElementById("readingGrid");
  if (!root) return;

  try {
    const res = await fetch(DATA_URL, { cache: "no-cache" });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    const books = sortBooks(data.books || []);
    render(root, books);
  } catch (err) {
    console.error("[reading] load failed:", err);
    root.setAttribute("data-state", "error");
    root.innerHTML = `<p class="reading-status">독서 목록을 불러오지 못했습니다.</p>`;
  }
}

function sortBooks(books) {
  return [...books].sort((a, b) => {
    const sa = STATUS_ORDER[a.status] ?? 99;
    const sb = STATUS_ORDER[b.status] ?? 99;
    if (sa !== sb) return sa - sb;
    const ea = a.endDate || a.startDate || "";
    const eb = b.endDate || b.startDate || "";
    if (ea && eb) return eb.localeCompare(ea);
    if (ea) return -1;
    if (eb) return 1;
    return 0;
  });
}

function render(root, books) {
  root.setAttribute("data-state", "active");
  root.innerHTML = "";

  const frag = document.createDocumentFragment();
  for (const b of books) frag.appendChild(card(b));
  root.appendChild(frag);
}

function card(b) {
  const el = document.createElement("article");
  el.className = "book-card";
  el.setAttribute("data-status", b.status);

  el.appendChild(cover(b));
  el.appendChild(body(b));
  return el;
}

function cover(b) {
  const wrap = document.createElement("div");
  wrap.className = "book-card__cover";

  if (b.cover) {
    const img = document.createElement("img");
    img.src = b.cover;
    img.alt = b.title;
    img.loading = "lazy";
    img.decoding = "async";
    wrap.appendChild(img);
  } else {
    wrap.classList.add("book-card__cover--empty");
    wrap.textContent = b.title?.slice(0, 2) || "?";
  }

  if (b.status === "읽는중") {
    const badge = document.createElement("span");
    badge.className = "book-card__status book-card__status--reading";
    badge.textContent = "읽는중";
    wrap.appendChild(badge);
  }

  if (typeof b.rating === "number") {
    const r = document.createElement("span");
    r.className = "book-card__rating";
    r.textContent = `★ ${b.rating}`;
    wrap.appendChild(r);
  }

  return wrap;
}

function body(b) {
  const wrap = document.createElement("div");
  wrap.className = "book-card__body";

  const title = document.createElement("h3");
  title.className = "book-card__title";
  title.textContent = b.title;
  wrap.appendChild(title);

  if (b.author) {
    const author = document.createElement("p");
    author.className = "book-card__author";
    author.textContent = b.author;
    wrap.appendChild(author);
  }

  const meta = document.createElement("div");
  meta.className = "book-card__meta";

  if (b.genre) {
    const g = document.createElement("span");
    g.className = "book-card__chip book-card__chip--genre";
    g.textContent = b.genre;
    meta.appendChild(g);
  }

  for (const fmt of b.formats || []) {
    const f = document.createElement("span");
    f.className = "book-card__chip book-card__chip--format";
    f.textContent = FORMAT_LABEL[fmt] || fmt;
    meta.appendChild(f);
  }

  if (meta.childElementCount > 0) wrap.appendChild(meta);

  const date = formatDateRange(b.startDate, b.endDate);
  if (date) {
    const d = document.createElement("p");
    d.className = "book-card__date";
    d.textContent = date;
    wrap.appendChild(d);
  }

  return wrap;
}

function formatDateRange(start, end) {
  if (!start && !end) return "";
  const fmt = (s) => s ? s.slice(0, 7).replace("-", ".") : "";
  if (start && end) {
    const s = fmt(start);
    const e = fmt(end);
    return s === e ? s : `${s} – ${e}`;
  }
  return fmt(start || end);
}
