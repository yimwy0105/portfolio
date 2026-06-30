// sync-reading.mjs — Notion 독서 DB → data/reading.json 동기화.
// 공식 Notion API 사용(무의존성). 기존 책은 상태/날짜/평점/장르/포맷만 갱신하고,
// 신규 책은 알라딘 표지를 내려받아 추가한다.
//
// 실행: NOTION_TOKEN=secret_xxx node scripts/sync-reading.mjs

import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, "..");
const JSON_PATH = resolve(ROOT, "data/reading.json");
const COVERS_DIR = resolve(ROOT, "assets/reading/covers");

const DATABASE_ID = "27c4573b0fd38041acb3c8ce89f230ec"; // 독서 Library DB (구 API용)
const DATA_SOURCE_ID = "2604573b-0fd3-8036-b419-000bf4cab2e2"; // 📚 Library 데이터소스 (신 API용)
const TOKEN = process.env.NOTION_TOKEN;

const stripDash = (s) => s.replace(/-/g, "");

async function notion(path, body, version) {
  const res = await fetch(`https://api.notion.com/v1/${path}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${TOKEN}`,
      "Notion-Version": version,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body || {}),
  });
  if (!res.ok) {
    const err = new Error(`Notion ${path} ${res.status}: ${await res.text()}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

async function queryAll(path, version) {
  const pages = [];
  let cursor;
  do {
    const data = await notion(path, { page_size: 100, start_cursor: cursor }, version);
    pages.push(...data.results);
    cursor = data.has_more ? data.next_cursor : undefined;
  } while (cursor);
  return pages;
}

// DB 전체 페이지 수집 — 신 API(data source) 우선, 404면 구 API(database)로 폴백
async function fetchAllPages() {
  try {
    return await queryAll(`data_sources/${DATA_SOURCE_ID}/query`, "2025-09-03");
  } catch (e) {
    if (e.status !== 404) throw e;
    console.warn("data_sources 404 → databases 엔드포인트로 폴백");
    return await queryAll(`databases/${DATABASE_ID}/query`, "2022-06-28");
  }
}

// 페이지 properties → 평탄화
export function parsePage(p) {
  const props = p.properties;
  const title = (props["Book Title"]?.title || []).map((t) => t.plain_text).join("");
  return {
    id: stripDash(p.id),
    title,
    author: (props["Author"]?.rich_text || []).map((t) => t.plain_text).join("") || null,
    genre: props["Genre"]?.select?.name ?? null,
    formats: (props["Format"]?.multi_select || []).map((o) => o.name),
    rating: props["N.Rating"]?.number ?? null,
    status: props["Status"]?.status?.name ?? null,
    startDate: props["읽기시작"]?.date?.start ?? null,
    endDate: props["종료일"]?.date?.start ?? null,
    url: props["URL"]?.url ?? null,
  };
}

// 알라딘 상품 페이지에서 og:image 표지 URL 추출
export async function aladinCover(url) {
  if (!url) return null;
  try {
    const html = await (await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } })).text();
    const m = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
    return m ? m[1] : null;
  } catch (e) {
    console.warn("표지 페이지 로드 실패:", url, e.message);
    return null;
  }
}

// 표지 이미지 다운로드 → assets/reading/covers/<basename>, 상대경로 반환
export async function downloadCover(imgUrl) {
  const name = imgUrl.split("/").pop().split("?")[0];
  const dest = resolve(COVERS_DIR, name);
  const rel = `assets/reading/covers/${name}`;
  if (existsSync(dest)) return rel;
  const buf = Buffer.from(await (await fetch(imgUrl, { headers: { "User-Agent": "Mozilla/5.0" } })).arrayBuffer());
  writeFileSync(dest, buf);
  return rel;
}

// reading.json 직렬화(책 1개당 한 줄, 키 순서 고정)
const KEY_ORDER = ["id", "title", "author", "genre", "formats", "cover", "startDate", "endDate", "rating", "status"];
export function serialize(data) {
  const line = (b) => {
    const o = {};
    for (const k of KEY_ORDER) o[k] = b[k] ?? null;
    return "    " + JSON.stringify(o);
  };
  return (
    "{\n" +
    `  "syncedAt": ${JSON.stringify(data.syncedAt)},\n` +
    `  "source": ${JSON.stringify(data.source)},\n` +
    `  "books": [\n` +
    data.books.map(line).join(",\n") +
    "\n  ]\n}\n"
  );
}

async function main() {
  if (!TOKEN) {
    console.error("NOTION_TOKEN 환경변수가 없습니다.");
    process.exit(1);
  }
  const data = JSON.parse(readFileSync(JSON_PATH, "utf8"));
  const byId = new Map(data.books.map((b) => [b.id, b]));

  const pages = (await fetchAllPages()).map(parsePage);
  const MUTABLE = ["status", "startDate", "endDate", "rating", "genre", "formats"];

  let updates = 0;
  let added = 0;

  for (const n of pages) {
    const existing = byId.get(n.id);
    if (existing) {
      // 기존 책: 변동 필드만 갱신
      for (const k of MUTABLE) {
        if (JSON.stringify(existing[k]) !== JSON.stringify(n[k])) {
          existing[k] = n[k];
          updates++;
        }
      }
    } else {
      // 신규 책: 표지 내려받아 추가
      const imgUrl = await aladinCover(n.url);
      const cover = imgUrl ? await downloadCover(imgUrl) : null;
      data.books.push({
        id: n.id,
        title: n.title.split(" | ")[0].trim(),
        author: n.author,
        genre: n.genre,
        formats: n.formats,
        cover,
        startDate: n.startDate,
        endDate: n.endDate,
        rating: n.rating,
        status: n.status,
      });
      added++;
      console.log("신규:", n.title.split(" | ")[0].trim());
    }
  }

  data.syncedAt = new Date().toISOString().slice(0, 10);
  writeFileSync(JSON_PATH, serialize(data));
  console.log(`동기화 완료 — 신규 ${added}권, 필드 업데이트 ${updates}건, 총 ${data.books.length}권`);
}

// 직접 실행될 때만 동기화 수행(테스트 시 import 가능)
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch((e) => {
    console.error(e);
    process.exit(1);
  });
}
