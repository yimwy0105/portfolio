# Portfolio · yimwy.com

임우영(Yim WooYoung)의 개인 포트폴리오 웹사이트.
DX / Digital Platform Strategist 로서 약 20년간의 리테일·F&B 디지털 플랫폼 기획·구축 경험을
정리한 단일 페이지(SPA-like) 정적 사이트입니다.

배포: https://yimwy.com

## 구성

- **Home** — 인사 / 소개
- **Career** — Introduce · Career History · Academic · Training / Certification
- **Awards / Talks** — 수상 이력 · 발표 이력
- **Reading** — 독서 기록 (Notion 동기화)
- **Contact** — Email · LinkedIn

한국어 / 영어 i18n, 라이트 / 다크 테마를 지원합니다.

## 기술 스택

- HTML5 / CSS3 / Vanilla JavaScript (ES Modules)
- 빌드 도구 없음 — 정적 호스팅으로 바로 서빙
- 데이터: `data/*.json` (i18n 분리)
- 로케일: `locales/{ko,en}.json`

## 폴더 구조

```
.
├── index.html
├── css/         # theme · index · components
├── js/          # app, navigation, i18n, theme, timeline, bio, awards-talks, reading, image-modal
├── data/        # career / bio / awards / talks / education / reading JSON
├── locales/     # ko.json, en.json
└── assets/
    ├── images/  # portfolio · awards · talks
    └── reading/ # 책 표지 이미지
```

## 로컬 실행

빌드 도구가 없으므로 정적 서버 하나만 띄우면 됩니다.
(브라우저에서 `index.html`을 더블클릭하면 `fetch()`가 CORS로 막히므로 반드시 서버로 띄워야 합니다.)

```bash
# Python 3
python3 -m http.server 8000

# 또는 Node
npx serve .
```

접속: http://localhost:8000

## 배포

GitHub Pages 로 배포됩니다 — `main` 브랜치 루트가 그대로 서빙됩니다.
빌드 단계 없음.

## 라이선스

코드 구조는 자유롭게 참고하셔도 됩니다. 단, 프로필·경력·이미지 등 개인 콘텐츠는 무단 사용을 금합니다.
