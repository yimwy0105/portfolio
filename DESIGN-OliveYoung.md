## Overview

CJ Olive Young is Korea's dominant Health & Beauty (H&B) marketplace, and its corporate web presence is a quiet, photography-led editorial product that lets the brand's *"ALL LIVE YOUNG"* philosophy carry the page. The base canvas is **pure white** (`{colors.canvas}` — #ffffff) with deep near-black ink (`{colors.ink}` — #1a1a1a) for headlines and body, paired with a two-voltage brand accent system: **Olive Green** (`{colors.primary}` — #82dc28) representing health and naturalness, and **Coral Orange** (`{colors.accent}` — #ff7878) representing beauty and youthful energy. These two colors are codified in the brand's own resource page — they are not inferred, they are the brand's declared identity. The 13° forward-tilted "OLIVE YOUNG" wordmark is the brand's typographic anchor and informs the entire system's sense of forward momentum.

The corporate site (`corp.oliveyoung.com`) reads like a quietly-confident global IR site — large hero photography of cosmetics and store interiors, oversized Korean display headlines in a humanist sans-serif, and feature cards arranged in a four-up sustainability grid. The career site (`career.oliveyoung.com`) inverts the tone to a more energetic, video-led recruitment feel — looping background videos in the hero, GIF-driven interview thumbnail cards in a dense magazine grid, and a flatter, more pop-style layout. Both share the same color trinity (white canvas, olive green, coral orange) and the same Pretendard / Noto Sans KR typographic foundation, but the corporate surface trends quieter and the career surface trends warmer.

The shape language is **soft, never sharp**. Buttons round to 4–8px (`{rounded.sm}` / `{rounded.md}`), feature and news cards use 8–12px (`{rounded.lg}`), photographic hero containers can run to 16px (`{rounded.xl}`), and category tag pills run fully rounded (`{rounded.pill}`). There are essentially no flat-corner interactive elements in the system — the warm-rounded geometry reinforces the H&B / wellness positioning.

**Key Characteristics:**
- Dual brand-accent system: `{colors.primary}` (#82dc28 — Olive Green) carries the wordmark, the sustainability iconography, and the primary "View More" CTAs; `{colors.accent}` (#ff7878 — Coral Orange) carries the secondary accent moments — career-page highlights, brand-energy callouts, and inline emphasis. Both are explicitly declared in the brand's own resource page.
- Pretendard / Noto Sans KR as the universal typeface — a humanist Korean-Latin sans designed for screen reading. Display weights land at 600–700; body sits at 400. There is no serif anywhere in the system.
- Hero-first photography: every corporate page opens with a full-bleed cinematic hero image of cosmetics, store interiors, or brand-themed product photography. The career site swaps in looping muted-color background videos.
- Four-up content card grids: the dominant pattern on the corporate homepage — Sustainability cards (ME:RACLE / Partners / Planet / Quality) and News cards both render as 4-up rounded photo-cards with a small eyebrow + headline beneath.
- Generous whitespace: `{spacing.section}` (80px) between major bands on the corporate page. The career site tightens this to 48–64px to fit more energetic content per scroll.
- Single-shadow elevation: cards on hover gain a soft `box-shadow: rgba(0,0,0,0.08) 0 4px 16px` lift. There are no progressive elevation tiers — flat or soft-lifted, nothing in between.
- 13° forward-tilted wordmark: the brand identity itself encodes forward momentum, and this tilt appears nowhere else in the system — it's a singular logo-only gesture, not a layout pattern.

## Colors

> **Source pages:** `corp.oliveyoung.com/ko` (homepage), `corp.oliveyoung.com/ko/company/brand` (brand resource page — primary source for declared brand colors), `career.oliveyoung.com/ko/home` and `/people` (career surfaces).

### Brand & Accent
- **Olive Green** (`{colors.primary}` — #82dc28): The signature brand color, explicitly declared as "건강함을 나타내는 올리브 그린" (Olive Green representing health). Carries the wordmark, the olive-symbol logo, sustainability iconography (ME:RACLE leaf marks), the primary "View More" CTAs on the corporate site, and inline emphasis on health/wellness content.
- **Olive Green Active** (`{colors.primary-active}` — #6bb820): Pressed / darker variant. Used on `{component.button-primary-active}`.
- **Olive Green Soft** (`{colors.primary-soft}` — #e8f7d4): A pale olive tint used as a soft background for tag chips and selected-state highlights.
- **Coral Orange** (`{colors.accent}` — #ff7878): The companion brand color, explicitly declared as "아름다움을 의미하는 코럴 오렌지" (Coral Orange representing beauty). Carries inline accent moments on the career site, "NEW" badges, hover-state highlights on category eyebrows, and the secondary CTA on featured campaign cards.
- **Coral Orange Active** (`{colors.accent-active}` — #ff5757): Pressed variant of the coral accent.
- **Coral Orange Soft** (`{colors.accent-soft}` — #ffe6e6): A pale coral tint used as a soft background for emphasis tags and seasonal callouts.

### Surface
- **Canvas** (`{colors.canvas}` — #ffffff): The default page background for both the corporate and career surfaces. Pure white — no warm cream tint.
- **Surface Soft** (`{colors.surface-soft}` — #f7f7f7): Section dividers, the inline filter band between hero and content, the news-card backgrounds when displayed in a soft-band section.
- **Surface Strong** (`{colors.surface-strong}` — #f0f0f0): Slightly heavier fill — the disabled-input background, the inactive-tab background, and the rare second-tier card surface.
- **Surface Dark** (`{colors.surface-dark}` — #1a1a1a): Used on the corporate footer and on rare dark CTA bands (sustainability sub-pages). Inverts text to white.
- **Surface Dark Soft** (`{colors.surface-dark-soft}` — #2a2a2a): A lighter dark used for elevated cards inside dark bands (footer column dividers, sustainability sub-section accents).

### Hairlines & Borders
- **Hairline** (`{colors.hairline}` — #e5e5e5): The default 1px border tone — card outlines, footer column dividers, table separators, form input outlines.
- **Hairline Soft** (`{colors.hairline-soft}` — #ededed): A lighter divider used on long-scrolling editorial body separators and between bylined-list rows.
- **Border Strong** (`{colors.border-strong}` — #cccccc): A heavier stroke used on focused outline buttons and form inputs after click.

### Text
- **Ink** (`{colors.ink}` — #1a1a1a): The dominant text color on light surfaces. Display headlines, body paragraphs, primary nav links, and most inline link text. Near-black, never pure black — preserves the brand's warm-photographic feel.
- **Body** (`{colors.body}` — #333333): A secondary running-text color used inside long-form sustainability and news copy where ink would feel too heavy.
- **Muted** (`{colors.muted}` — #666666): Sub-titles inside card blocks, footer category sub-labels, breadcrumb separators, "View All" / "View More" links when inline.
- **Muted Soft** (`{colors.muted-soft}` — #999999): Disabled link text, caption text, copyright lines. Used sparingly.
- **On Primary** (`{colors.on-primary}` — #ffffff): White text on Olive Green CTAs.
- **On Accent** (`{colors.on-accent}` — #ffffff): White text on Coral Orange CTAs and badges.
- **On Dark** (`{colors.on-dark}` — #ffffff): Pure white text on the dark footer and rare dark CTA bands.
- **On Dark Soft** (`{colors.on-dark-soft}` — #b3b3b3): Footer secondary text — copyright, legal links, micro-print.

### Semantic
- **Error** (`{colors.error}` — #e74c3c): Inline form validation error. Distinct from `{colors.accent}` (coral) — slightly more saturated red.
- **Success** (`{colors.success}` — #82dc28): The brand uses the primary Olive Green as the success tone — the same hex serves both as brand and as "successful state" indicator, consistent with the brand's health-positive identity.
- **Warning** (`{colors.warning}` — #f5a623): Amber callouts on rare admin / notice surfaces.
- **Focus** (`{colors.focus}` — #82dc28): Focus-ring color — also the brand primary. Keyboard focus on buttons / inputs uses a 2px Olive Green outer ring.

### Scrim
- **Scrim** (`{colors.scrim}` — #000000 at 50% opacity): The global modal backdrop tone — search overlay, image lightbox, sitemap drawer. Stored as the base hex; opacity is applied at render time.

## Typography

### Font Family

The system runs **Pretendard** as the primary face on the corporate site (a contemporary Korean-Latin humanist sans designed for screen reading with excellent Hangul rendering), with **Noto Sans KR** as the universal fallback. The career site appears to favor Noto Sans KR slightly more heavily but the same family pair governs both. The Latin fallback stack walks `Pretendard, "Apple SD Gothic Neo", "Malgun Gothic", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif`.

There is no display-specific face. The variable / weighted Pretendard carries the entire scale from 56px hero headlines down to 11px micro-labels. The brand does not use serif faces, monospace faces, or proprietary display typography anywhere on the public web. This is deliberate — Korean H&B sites overwhelmingly favor sans-serif because Hangul's structural geometry already supplies visual rhythm, and adding a serif would feel imported.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-xl}` | 56px | 700 | 1.15 | -1.5px | Corporate homepage hero ("ALL LIVE YOUNG") |
| `{typography.display-lg}` | 44px | 700 | 1.2 | -1px | Section heads ("Sustainability", "News") |
| `{typography.display-md}` | 32px | 700 | 1.25 | -0.8px | Sub-section heads, sustainability page openers |
| `{typography.display-sm}` | 24px | 600 | 1.3 | -0.4px | Card-cluster section headlines, history-page timeline labels |
| `{typography.title-lg}` | 20px | 600 | 1.35 | -0.2px | Feature card titles ("ME:RACLE", "협력사 상생") |
| `{typography.title-md}` | 18px | 600 | 1.4 | 0 | News card titles, interview thumbnail labels |
| `{typography.title-sm}` | 16px | 600 | 1.4 | 0 | Footer column heads ("회사", "사업영역") |
| `{typography.body-lg}` | 18px | 400 | 1.6 | 0 | Lead paragraphs in sustainability / vision pages |
| `{typography.body-md}` | 16px | 400 | 1.6 | 0 | Default running-text — news body, sustainability copy |
| `{typography.body-sm}` | 14px | 400 | 1.55 | 0 | Card meta lines, footer links, breadcrumb text |
| `{typography.caption}` | 13px | 500 | 1.4 | 0 | Category eyebrows above card titles ("ME:RACLE", "협력사 상생") |
| `{typography.caption-sm}` | 12px | 400 | 1.4 | 0 | Footer legal line ("© CJ OliveYoung. All Rights Reserved") |
| `{typography.uppercase-tag}` | 11px | 700 | 1.3 | 1px (uppercase) | "NEW", "PLATFORM", "BRAND", "STAFF" category eyebrows on the career site |
| `{typography.button-md}` | 15px | 600 | 1.0 | 0 | Primary CTA button labels |
| `{typography.button-sm}` | 13px | 600 | 1.0 | 0 | Pill button labels, tag chips |
| `{typography.nav-link}` | 15px | 500 | 1.4 | 0 | Top global nav menu items |
| `{typography.link}` | 14px | 400 | 1.5 | 0 | Inline body links |

### Principles

Display weights run **bold (700) at the largest sizes**, dropping to semibold (600) at sub-section levels. This contrasts with Western editorial systems (Apple, Stripe) that favor lighter display weights — the brand's choice of weight 700 at 44–56px is partly a Korean web convention (Hangul reads as denser at lighter weights, so display sizes need more weight to feel confident) and partly a brand confidence signal: the H&B-leading position calls for assertive headlines.

Body type sits at weight 400 with **1.6 line-height** — the most generous reading-rhythm choice on the page. Korean web typography typically uses 1.5–1.7 line-height because Hangul's syllabic block characters need more vertical breathing than Latin lowercase. The brand respects this convention.

Negative letter-spacing is applied at display sizes (-0.4 to -1.5px) to tighten the headlines visually. Korean characters are wider than Latin and benefit from negative tracking at large sizes; the brand follows this rule.

The career site's section eyebrows ("PLATFORM | 올리브영을 만드는", "BRAND | 올리브영다움을 만드는", "STAFF | 올리브영을 건강하게 만드는") render in `{typography.uppercase-tag}` at 11px / 700 with 1px positive tracking — these are the rare uppercase moments in the system, and they appear only as career-page category dividers.

### Note on Font Substitutes

If Pretendard is unavailable, **Noto Sans KR** (Google Fonts, free) is the closest official fallback — the brand declares it as the secondary stack member. **IBM Plex Sans KR** is another acceptable open-source substitute with similar humanist proportions. For mixed Korean-Latin contexts on systems where Pretendard is missing, **Inter** can handle the Latin run alongside Noto Sans KR — Pretendard itself was designed as a Korean-Latin pairing of Inter-like geometry.

## Layout

### Spacing System
- **Base unit:** 4px (with 2px micro-step for tight inline gaps).
- **Tokens:** `{spacing.xxs}` 2px · `{spacing.xs}` 4px · `{spacing.sm}` 8px · `{spacing.md}` 12px · `{spacing.base}` 16px · `{spacing.lg}` 24px · `{spacing.xl}` 32px · `{spacing.xxl}` 48px · `{spacing.section}` 80px.
- **Section padding (vertical):** `{spacing.section}` (80px) for major page bands on the corporate site; tightens to `{spacing.xxl}` (48–64px) on the career site for higher energy and density.
- **Card internal padding:** `{spacing.lg}` (24px) for `{component.sustainability-card}`, `{component.news-card}`, and `{component.interview-card}`; `{spacing.base}` (16px) for compact card meta blocks; `{spacing.sm}` (8px) on dense tag-row gutters.
- **Gutters:** `{spacing.lg}` (24px) between cards in the 4-up sustainability grid; `{spacing.base}` (16px) between cards in the news strip; `{spacing.xl}` (32px) inside footer column gutters.

### Grid & Container
- **Max content width:** ~1280px centered on the corporate homepage and editorial pages. Sustainability and vision pages cap closer to 1080px to keep long-form reading comfortable.
- **Sustainability card grid (homepage):** 4-column grid at desktop with each cell housing a photographic thumbnail (1:1 aspect), an eyebrow label in `{typography.caption}`, and a card title in `{typography.title-lg}`.
- **News card strip:** 4-up at desktop, collapsing to 2-up at tablet and 1-up at mobile. Each news card carries a 16:9 photo at top, headline beneath.
- **Career interview grid:** 4-up at desktop on the People page, with each tile carrying a small GIF/photo thumbnail, role + team label, and a clickable link area.
- **Footer:** 6-column link list at desktop covering 회사 / 사업영역 / 산업지원정보 / 트렌드 / 뉴스룸 / 문의, collapsing to 2-column on tablet and accordion on mobile.

### Whitespace Philosophy

The corporate site is **deliberately spacious** — `{spacing.section}` (80px) of vertical breathing room between major bands signals the brand's confidence and global-leader positioning. The career site is **deliberately tighter** — `{spacing.xxl}` (48px) section gaps and denser interview-card grids reflect the energetic recruitment voice and the need to surface many roles per scroll. The contrast is intentional: the corporate page reads as "carefully composed luxury catalog," while the career page reads as "vibrant team-introduction magazine."

Whitespace inside cards is generous (24px), letting type and photography breathe. Footer is the only area that goes deliberately dense — 6 columns of link lists need to fit the full information architecture into a single viewport.

## Elevation

The system caps elevation at **one shadow tier** plus the flat baseline.

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, no border | Default body sections, hero bands, footer, all editorial surfaces (95% of the system) |
| Soft hairline | 1px solid `{colors.hairline}` | Default border on cards, form inputs, footer column dividers |
| Card lift | `box-shadow: rgba(0, 0, 0, 0.08) 0 4px 16px 0` | Card hover-elevated states (sustainability cards, news cards, interview thumbnails) |
| Modal scrim | `{colors.scrim}` at 50% opacity | The global modal backdrop tone — search overlay, sitemap drawer, image lightbox |

There are **no progressive elevation tiers** — the system either has the one shadow on hover or none. Depth comes from photography, the white-on-white surface separation, and rounded-corner clipping rather than from layered shadows. This is consistent with the brand's photographic-led identity: shadows are reserved for content, not chrome.

### Decorative Depth
- **Photography supplies the depth.** Cosmetics product photography, store interior photography, and the K-Beauty / wellness imagery all carry inherent atmospheric depth — soft studio lighting, shallow depth-of-field on product close-ups, warm color grading on store interiors. The design lets the photography do the elevation work.
- **The 13° tilted wordmark** is the brand's only true depth-by-geometry gesture — it lives at the wordmark layer only, and never propagates to other components or layouts.
- **Career site looping background videos** (visible on `career.oliveyoung.com/ko/home`) add cinematic depth to the hero band without requiring CSS-level depth effects.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.none}` | 0px | Reserved — almost never used; only flat-edged content like full-bleed photographic hero bands |
| `{rounded.xs}` | 2px | Reserved for badge accents and tiny inline marks |
| `{rounded.sm}` | 4px | Small inline buttons, form input corners, dropdown items |
| `{rounded.md}` | 8px | Standard CTA buttons, text inputs, category tabs |
| `{rounded.lg}` | 12px | Content cards (sustainability, news, interview), feature cards |
| `{rounded.xl}` | 16px | Hero photographic containers, the larger marquee components |
| `{rounded.pill}` | 9999px | Category tag pills, "NEW" tags, filter chips |
| `{rounded.full}` | 9999px / 50% | Avatar substitutes, social icons, the round play-button overlay on video thumbnails |

### Photography Geometry

Photography is the dominant visual format in the system. Treatment varies by surface:
- **Hero photography:** Full-bleed 21:9 or 16:9 on the corporate homepage; rounded `{rounded.xl}` (16px) corners when contained inside a sub-section. Sustainability hero photography typically uses natural-light store-interior or product-still photography.
- **Sustainability and news card thumbnails:** 1:1 square crops at `{rounded.lg}` (12px) corners on the sustainability grid; 16:9 horizontal at `{rounded.lg}` (12px) on the news strip.
- **Career interview thumbnails:** Small GIFs / photographs at 4:3 or 1:1 aspect, rounded `{rounded.md}` (8px). Many career thumbnails use looping GIFs of real Olive Young staff members — the brand chooses to surface its actual team rather than stock imagery, which is one of its most distinctive recruitment-page choices.
- **Avatar / icon containers:** Perfect circles at `{rounded.full}`, typically 32–48px diameter for inline use.

When illustration is used (rare — the brand mostly uses photography), it remains photographic-realistic with soft color grading rather than flat-vector style.

## Components

### Top Navigation

**`top-nav`** — Corporate site nav bar. White surface, 72px height, 1px bottom hairline divider. The Olive Young wordmark (tilted 13° at brand color #82dc28) sits flush left, the six top-level nav items (회사소개 / 사업영역 / 지속가능경영 / 산업지원정보 / 트렌드 / 뉴스룸 / 커리어) sit in the center, and language toggles (한국어 / English / 日本語) + Family Site dropdown sit flush right.

**`top-nav-career`** — Career site nav bar. White surface, 64px height. Logo at left, primary nav items (Home / People / Culture / Benefit / FAQ / Jobs) center-left, external links (Company↗ / Tech blog↗) right of center, and a primary `{component.button-primary-coral}` "Apply" CTA at the far right. The career site uses Coral Orange (`{colors.accent}`) for its primary CTA rather than Olive Green — this is the key chromatic difference between the corporate and career surfaces.

**`nav-link`** — Top global nav menu items. Text `{colors.ink}` in `{typography.nav-link}` (15px / 500). Active state adds a 2px Olive Green underline beneath the label.

**`language-toggle`** — Small dropdown carrying the language selector at the right edge of the top nav. Default text `{colors.muted}` in `{typography.body-sm}`; expanded state reveals a small white dropdown card with the three language options.

### Buttons

**`button-primary`** — The signature Olive Green CTA used on the corporate site. Background `{colors.primary}` (#82dc28), text `{colors.on-primary}` (white), type `{typography.button-md}`, padding 12px × 24px, height 44px, rounded `{rounded.md}` (8px). Used for "View More" on sustainability and vision pages.

**`button-primary-active`** — Pressed state. Background flips to `{colors.primary-active}` (#6bb820). No transform, no shadow change.

**`button-primary-coral`** — The Coral Orange variant used on the career site. Background `{colors.accent}` (#ff7878), text `{colors.on-accent}` (white), same dimensions as `{component.button-primary}`. The career site's primary "Apply" CTA uses this variant exclusively — the corporate site rarely uses Coral as a button color.

**`button-secondary`** — White fill with ink text and a 1px ink outline. Same padding, height, and radius as primary. Used for "View All" / "Learn More" inline CTAs as a quieter alternative.

**`button-text-link`** — Plain ink text, no surface, no border. Underlined on press. Used for inline "View All News" / "View More" links inside content cards.

**`button-disabled`** — `{colors.surface-strong}` background with `{colors.muted-soft}` text. Cursor not-allowed.

**`text-link`** — Inline body links. Text `{colors.primary}` (Olive Green) on corporate body content, `{colors.accent}` (Coral) on career body content. Underlined on press; subtle but the green-vs-coral inline link is one of the system's clearest brand-tone differentiators.

### Cards & Containers

**`hero-band`** — Full-bleed photographic hero, 21:9 or 16:9 aspect at desktop. Carries the page's display headline overlaid with `{colors.on-dark}` white text in `{typography.display-xl}` over the photography (corporate site uses a translucent overlay or a tinted gradient at the bottom to ensure legibility). Vertical padding zero (full-bleed); the photo is the band.

**`sustainability-card`** — Used in the 4-up Sustainability grid on the corporate homepage. Background `{colors.canvas}` (white), rounded `{rounded.lg}` (12px), 1px hairline border, internal padding `{spacing.lg}` (24px). Layout: 1:1 photographic thumbnail at top (with `{rounded.md}` (8px) corner clipping), eyebrow label in `{typography.caption}` ("ME:RACLE", "협력사 상생"), card title in `{typography.title-lg}`, and a short tagline beneath in `{typography.body-md}`.

**`news-card`** — Used in the News strip on the corporate homepage. Background `{colors.canvas}`, rounded `{rounded.lg}`, hairline border. 16:9 photographic header image at top with `{rounded.md}` inner clipping, then the news headline in `{typography.title-md}` beneath in `{spacing.lg}` (24px) internal padding. Date stamp not always shown — the brand favors headline-first communication.

**`interview-card`** — Used in the career-site People page interview grid. Background `{colors.canvas}`, rounded `{rounded.md}` (8px), hairline border. Carries a small looping GIF or staff photograph at top (1:1 or 4:3), then a category eyebrow ("PLATFORM | 올리브영을 만드는") in `{typography.uppercase-tag}`, followed by role + team label ("MD | 헬시푸드팀") in `{typography.title-md}`. The entire card is tappable and links to a detailed interview page.

**`vision-callout-card`** — Used on the corporate homepage to surface the brand's core values ("Korea to Global / Beauty and Wellness / Growth for Value / Offline to Online"). Background `{colors.canvas}` with `{colors.primary-soft}` accent stripe, rounded `{rounded.lg}`, padding `{spacing.xl}` (32px). Layout: small accent thumbnail + a single-line tagline + a 2-line description.

**`coral-accent-card`** — A rare full-bleed coral card carrying a campaign or special-promotion call-to-action. Background `{colors.accent}` (#ff7878), text `{colors.on-accent}` (white), rounded `{rounded.lg}`, padding `{spacing.xxl}` (48px). The coral surface IS the voltage; the CTA inside uses a white button style. Used very sparingly — typically once per page, if at all.

### Inputs & Forms

**`text-input`** — Standard form input. Background `{colors.canvas}` (white), 1px hairline outline in `{colors.hairline}`, rounded `{rounded.md}` (8px), 48px height, 12px × 14px padding. Stacked label above in `{typography.caption}` muted, placeholder text in `{typography.body-md}` muted. On focus, the border thickens to 2px `{colors.primary}` (Olive Green) — no glow, no ring.

**`text-input-focused`** — Focus state. Border thickens to 2px Olive Green; the system optionally adds a faint 3px Olive-Green-at-15%-alpha outer ring on accessibility-priority pages.

**`search-input`** — The corporate site's search input lives in a modal overlay rather than persistently in the nav. When opened, the input is white-fill rounded `{rounded.pill}`, 48px height, with a magnifier icon at the left edge and a close affordance at the right edge.

### Tags / Badges

**`badge-pill-olive`** — Small pill label for category tags or status indicators. Background `{colors.primary-soft}` (#e8f7d4 — pale olive), text `{colors.primary-active}` (deep olive), type `{typography.button-sm}`, rounded `{rounded.pill}`, padding 4px × 12px.

**`badge-pill-coral`** — Coral-tinted variant. Background `{colors.accent-soft}` (#ffe6e6), text `{colors.accent-active}`, same dimensions. Used for "NEW" and seasonal campaign tags on the career site.

**`badge-coral-filled`** — Solid coral fill badge. Background `{colors.accent}` (#ff7878), text `{colors.on-accent}` (white), type `{typography.uppercase-tag}` (11px / 700 / 1px tracking, uppercase), rounded `{rounded.pill}`, padding 4px × 10px. Used for "NEW" badges on career interview cards and the corporate news strip.

**`category-eyebrow`** — Used above section headings ("PLATFORM | 올리브영을 만드는" on the career site, "Core Value" on the corporate homepage). No background — just text in `{typography.caption}` or `{typography.uppercase-tag}` in `{colors.muted}`, often paired with a small Olive Green or Coral accent dot beside it.

### Tab / Filter

**`category-tab`** + **`category-tab-active`** — Used in sub-nav rows on sustainability and trend pages. Inactive: transparent background, `{colors.muted}` text. Active: `{colors.primary-soft}` background, `{colors.primary-active}` text. Padding 10px × 16px, rounded `{rounded.md}` (8px).

### Footer

**`footer`** — Corporate footer. Background `{colors.canvas}` (white) with a 1px top hairline divider. 6-column link list at desktop covering 회사 / 사업영역 / 산업지원정보 / 트렌드 / 뉴스룸 / 문의. Each column heads with a `{typography.title-sm}` ink label and stacks `{component.footer-link}` rows in `{typography.body-sm}` ink. Vertical padding 64px.

**`footer-link`** — Each link row in the footer. Text `{colors.body}` in `{typography.body-sm}` (14px / 400). No underline by default.

**`legal-band`** — A bottom strip beneath the footer columns carrying the legal copy ("씨제이올리브영 주식회사 ⋯ ⓒ CJ OliveYoung. All Rights Reserved"), the privacy policy / terms / collection-policy links, and the social icons (YouTube, Instagram Official, Instagram Global, Tech Blog, LinkedIn). All text in muted `{colors.muted}` at `{typography.caption-sm}`.

**`social-icon-row`** — Row of 5 monochrome social icons at the bottom of the footer, each rendered as a 32px square mark with `{colors.muted}` fill. On press, the icon fills with `{colors.primary}` (Olive Green).

**`family-site-band`** — A horizontal accordion band above the legal footer listing CJ Group affiliates (CJ주식회사 / CJ제일제당 / CJ대한통운 / CJ ENM / etc.) in a 5-column grid with small wordmark thumbnails. Background `{colors.surface-soft}`, padding `{spacing.lg}` (24px).

### Signature Components

**`olive-symbol-logo`** — The 13° forward-tilted "OLIVE YOUNG" wordmark rendered at brand color `{colors.primary}` (#82dc28). The tilt is the brand's singular geometric gesture — it appears at the wordmark layer only, never on other components or layouts. The olive-leaf symbol (a stylized leaf-pair) precedes the wordmark on the corporate site nav.

**`brand-slogan-strip`** — A horizontal strip used on the corporate homepage carrying the brand's four core values as alternating image + label pairs ("Korea to Global / Beauty and Wellness / Growth for Value / Offline to Online / Global Beauty & Health Trend Leading Company"). Each value pairs with a small circular photographic thumbnail and a typography-only label. The strip uses `{spacing.section}` (80px) vertical padding and the pairs flow horizontally with `{spacing.xl}` (32px) gutters.

**`looping-video-hero`** — Used on the career site's home page. The hero is a looping muted-color background video (typically of Olive Young staff in candid moments) with text overlaid in `{colors.on-dark}` white. No play controls — the video loops silently and serves as atmospheric backdrop. This is the most cinematic moment in the entire system and is unique to the career surface.

**`me-racle-section`** — The brand's signature sustainability initiative section. Carries a custom illustrative composition (leaf-based abstract artwork) with the "ME:RACLE" wordmark in `{typography.display-md}`. Background is occasionally a soft Olive Green gradient — one of the only places in the system where Olive Green appears as a surface tint rather than as a CTA color.

## Responsive Behavior

| Name | Width | Key Changes |
|---|---|---|
| Mobile | < 768px | Top nav collapses to hamburger drawer; hero photography crops to 4:3 or 1:1 portrait; sustainability cards stack 1-up; news strip 1-up; career interview grid 1-up; footer 6 columns collapse to accordion |
| Tablet | 768–1024px | Top nav keeps full menu but tightens; sustainability cards 2-up; news strip 2-up; career interview grid 2-up; footer 2-up columns |
| Desktop | 1024–1440px | Full top nav with all menu items; sustainability cards 4-up; news strip 4-up; career interview grid 4-up; footer 6-column |
| Wide | > 1440px | Content width caps at 1280px on most pages; gutters absorb the rest |

### Touch Targets
- Primary CTAs at minimum 44 × 44px (above WCAG AA).
- Hamburger menu trigger 44 × 44px on mobile.
- Footer links sized at 16px height with `{spacing.sm}` (8px) vertical row padding for ~32px tappable rows — slightly tight for AAA but compensated by mobile accordion layout.
- Social icons at 32 × 32 with 8px padding extending tap area to 48 × 48.

### Collapsing Strategy
- Top nav collapses to hamburger drawer at < 768px; the drawer opens as a full-height white sheet with the menu items vertically stacked.
- Hero photography uses `srcset` with art-direction crops — landscape 21:9 on desktop, portrait 4:3 on mobile.
- Sustainability, news, and interview card grids reduce columns cleanly at each breakpoint — never reflow rows; always reduce columns.
- Footer 6-column layout collapses to 2-column at tablet, then accordion-by-column-heading on mobile.
- Family Site band collapses to a single-line horizontal scroll on mobile rather than reflowing the grid.

### Image Behavior
- Hero photography is lazy-loaded with high-priority `fetchpriority="high"` on the above-fold hero.
- Below-fold card thumbnails use lazy-loading with native `loading="lazy"`.
- Looping career-site background videos pause on mobile devices (autoplay restrictions); a poster image stands in.

## Do's and Don'ts

### Do
- Anchor every corporate page on the white canvas. The brand identity is precisely the clean white + olive green + coral orange trinity.
- Use `{colors.primary}` (Olive Green #82dc28) for the wordmark, primary CTAs on the corporate site, and "success / health" status indicators. The green IS the brand.
- Use `{colors.accent}` (Coral Orange #ff7878) for the career site's primary CTA, for "NEW" and seasonal badges, and for warm-tone callouts. The coral is the brand's companion voltage.
- Pair Pretendard with Noto Sans KR fallback for all Korean-Latin mixed content. The humanist sans pairing is the brand's typographic foundation.
- Apply `{spacing.section}` (80px) between major bands on corporate pages; tighten to 48–64px on career pages.
- Use photography (cosmetics, store interiors, staff candids) to carry visual weight rather than gradients or decorative chrome.
- Reserve the 13° tilted wordmark for the logo layer only. Don't propagate the tilt to other components.

### Don't
- Don't introduce a third brand color (no purple, no blue, no yellow as accent). The Olive + Coral pairing is the entire system.
- Don't bold the Korean display headlines beyond weight 700. Weight 800 / 900 / Heavy reads as aggressive in Korean H&B context.
- Don't use serif faces anywhere. The brand is exclusively sans-serif (Pretendard / Noto Sans KR).
- Don't tilt other elements at 13° in imitation of the wordmark. The tilt is a logo-only gesture and loses its meaning if repeated.
- Don't add hard drop-shadows beyond the single soft card-lift tier. The brand's elevation is minimal and intentional.
- Don't put Coral Orange CTAs on the corporate site or Olive Green CTAs on the career site without considering the surface convention. The chromatic split between surfaces (green for corporate, coral for career) is the brand's clearest tone-of-voice signal.
- Don't underline links by default. The system uses color (green or coral) to distinguish links and reserves underline for the press state.

## Iteration Guide

1. Focus on ONE component at a time. Reference its token directly (`{component.sustainability-card}`, `{component.button-primary-coral}`).
2. Variants of an existing component (`-active`, `-coral`, `-focused`) live as separate entries in `components:`.
3. Use `{token.refs}` everywhere — never inline hex.
4. Never document hover. Default and Active/Pressed states only.
5. Display headlines stay Pretendard / Noto Sans KR at weight 700 with negative tracking. Body stays weight 400 at 1.6 line-height. The Korean reading-rhythm is non-negotiable.
6. White + Olive Green + Coral Orange is the trinity. Don't introduce a fourth surface tone or accent color.
7. When in doubt about emphasis: larger Pretendard before bolder weight; photographic depth before CSS shadow.

## Known Gaps

- **Pretendard vs Noto Sans KR exact split:** the corporate site appears to favor Pretendard while the career site appears to use a slightly heavier reliance on Noto Sans KR; precise CSS extraction would require browser DevTools inspection that wasn't performed.
- **Hover state colors:** intentionally not documented per the system's no-hover policy — the brand's actual `:hover` styling for cards is the documented soft card-lift, but precise extraction of additional hover states (color shifts, transform animations) is unreliable.
- **Loading states / skeleton screens:** not visible on the extracted surfaces.
- **Form validation states beyond `{component.text-input-focused}`:** error / success input states would need a contact-form or inquiry-form interaction to fully extract.
- **Sustainability sub-page chrome:** the Sustainability section has its own sub-pages (ME:RACLE, Partners, Planet, Quality) which likely introduce custom illustrative components and possibly a soft-green tinted surface variant that isn't fully captured in the top-level homepage analysis.
- **Career site interview detail pages:** individual interview pages (linked from the People grid) likely use a custom long-form editorial template with quote pull-outs, photographic galleries, and timeline modules that aren't documented here.
- **Mobile-specific chrome:** detailed mobile screenshots were not captured directly; mobile behavior is inferred from the brand's standard Korean responsive-web conventions and the visible breakpoint patterns.
- **Animation and transition timings:** card hover lifts, video loop behaviors, and any scroll-triggered animations are not formally documented.
- **The `oliveyoung.co.kr` consumer mall and `global.oliveyoung.com` global mall surfaces** are out of scope for this corporate / career analysis — they share the brand color trinity but introduce a substantially different product-catalog / e-commerce UI vocabulary (product grid cards, price displays, shopping cart, review modules) that warrants a separate DESIGN.md.
