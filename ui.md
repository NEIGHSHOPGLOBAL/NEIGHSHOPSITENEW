# UI.md — Neighshop Global Design System & Page Specification

> Reference: the "AXION" light-theme layout (clean editorial, big type, pill buttons, image-led bento cards, hairline dividers).
> Goal: a **premium, calm, light-theme** site and admin panel that feels like a modern product studio — not a template.
> Works with `ARCHITECTURE.md` (Next.js + TypeScript + Tailwind + shadcn/ui).

---

## 1. Design Direction (what we take from the reference)

| Trait in reference | How we use it |
|---|---|
| **Soft off-white canvas** (`#F4F4F4`) with **pure white cards** | Page background is off-white, cards are white. Depth comes from tone, not heavy shadows. |
| **Huge, tight headlines**, medium weight, near-black | Hero H1 at 72–96px desktop, tracking `-0.03em`, line-height `1.02`. |
| **Slash brand motif** (`/AXION`, `/TECHNOLOGY`, `/INDUSTRIES WE SERVE`) | Logo `/NEIGHSHOP`. Every section starts with a slash **eyebrow label**. This is our signature. |
| **Black pill buttons** + outlined pill secondary | Primary = solid ink pill. Secondary = 1px outlined pill. Nothing else competes. |
| **Image-led bento grid** with glass caption bars | Services and Portfolio use large rounded image cards with a blurred glass caption at the bottom. |
| **Icon-in-circle cards** with one dark "active" card | Industries carousel: white cards, circular icon top-left, text bottom-left; hovered/active card turns charcoal. |
| **Hairline-divided feature grid** + circular arrow buttons | "Why us / Technology" block: 2×2 grid, top border hairlines, `Learn More ⟶` with round arrow. |
| **Rounded frame (28px) on a muted sage backdrop** | Used for marketing screenshots/OG images and for the hero "device frame" treatment. The real site uses 24–28px section radii. |
| Lots of whitespace, small body text | Body copy is small and quiet (15–16px), strong contrast with huge headings. |

**Mood words:** calm · precise · editorial · confident · spacious.
**Avoid:** gradients on backgrounds, neon colors, heavy drop shadows, stock-illustration blobs, emoji icons, centered-everything layouts.

---

## 2. Design Tokens

### 2.1 Color

```css
:root {
  /* Neutrals */
  --bg:            #F4F4F2;   /* page canvas (warm off-white) */
  --surface:       #FFFFFF;   /* cards, header */
  --surface-2:     #EDEDEA;   /* subtle fills, inputs */
  --line:          #E3E3DF;   /* hairlines, card borders */
  --line-strong:   #CFCFC9;

  --ink:           #111111;   /* headings, primary buttons */
  --ink-2:         #2B2B2B;   /* body strong */
  --muted:         #6B6B66;   /* secondary text */
  --muted-2:       #9A9A94;   /* captions, placeholders */

  /* Charcoal "active" card (as the Manufacturing card in reference) */
  --charcoal:      #3F3F40;
  --charcoal-ink:  #FFFFFF;

  /* Brand accent – used sparingly (<5% of the UI) */
  --accent:        #2F5D3A;   /* deep forest green, echoes the reference containers */
  --accent-soft:   #E6EEE7;   /* tint for badges / highlights */
  --accent-2:      #A0A593;   /* sage – backdrops, frames, OG images */

  /* Feedback */
  --success: #1E7A46;  --warning: #B7791F;  --danger: #C23B3B;  --info: #2B6CB0;

  /* Overlay for glass captions on images */
  --glass-bg:      rgba(30,30,30,.45);
  --glass-blur:    14px;
  --scrim:         linear-gradient(to top, rgba(0,0,0,.55), rgba(0,0,0,0) 60%);
}
```

> One accent only. Everything else is neutral. Color arrives through **photography**, exactly like the reference.

### 2.2 Typography

| Role | Font | Notes |
|---|---|---|
| Display + UI | **Inter Tight** (or *Source Sans 3*, which the reference closely resembles) | Variable font, self-hosted via `next/font` |
| Mono (eyebrows, code, admin IDs) | **JetBrains Mono** | Optional, used for the `/LABEL` eyebrow if a techy feel is wanted |

```css
/* Scale – clamp() for fluid sizing */
--fs-display: clamp(2.75rem, 6.2vw + 0.5rem, 6rem);    /* hero H1   44 → 96 */
--fs-h1:      clamp(2.25rem, 4vw + 0.5rem, 4rem);      /* page H1   36 → 64 */
--fs-h2:      clamp(1.875rem, 2.6vw + 0.5rem, 3rem);   /* section   30 → 48 */
--fs-h3:      clamp(1.25rem, 1vw + 1rem, 1.625rem);    /* card      20 → 26 */
--fs-body-lg: 1.125rem;   /* 18 */
--fs-body:    0.9375rem;  /* 15 – default, matches reference's quiet body */
--fs-small:   0.8125rem;  /* 13 */
--fs-eyebrow:  0.75rem;   /* 12, uppercase, tracking .08em */
```

| Token | Weight | Line-height | Letter-spacing |
|---|---|---|---|
| Display / H1 / H2 | 500 | 1.02–1.1 | `-0.03em` |
| H3 | 500 | 1.2 | `-0.01em` |
| Body | 400 | 1.6 | 0 |
| Eyebrow | 500 | 1 | `+0.08em`, UPPERCASE |
| Button | 500 | 1 | 0 |

### 2.3 Spacing, radius, shadow

```css
--space: 4px;   /* base unit. use 4/8/12/16/24/32/48/64/96/128 */
--container: 1280px;      /* max content width */
--gutter: clamp(20px, 4vw, 48px);
--section-y: clamp(72px, 10vw, 140px);

--r-xs: 8px;  --r-sm: 12px;  --r-md: 16px;  --r-lg: 20px;  --r-xl: 28px;  --r-pill: 999px;

--shadow-xs: 0 1px 2px rgba(17,17,17,.04);
--shadow-sm: 0 2px 8px rgba(17,17,17,.05);
--shadow-md: 0 12px 32px -8px rgba(17,17,17,.10);   /* hover lift only */
```

Cards: `background: var(--surface); border: 1px solid var(--line); border-radius: var(--r-lg);`
No shadow at rest. Shadow appears on hover.

### 2.4 Tailwind mapping (`tailwind.config.ts`)

```ts
export default {
  theme: {
    container: { center: true, padding: "var(--gutter)", screens: { "2xl": "1280px" } },
    extend: {
      colors: {
        bg: "var(--bg)", surface: "var(--surface)", "surface-2": "var(--surface-2)",
        line: "var(--line)", ink: "var(--ink)", muted: "var(--muted)",
        charcoal: "var(--charcoal)", accent: { DEFAULT: "var(--accent)", soft: "var(--accent-soft)" },
      },
      borderRadius: { xl: "28px", lg: "20px", md: "16px" },
      fontFamily: { sans: ["var(--font-inter-tight)", "system-ui", "sans-serif"] },
      letterSpacing: { tightest: "-0.03em" },
    },
  },
};
```

---

## 3. Core Components

### 3.1 Buttons

| Variant | Style | Use |
|---|---|---|
| **Primary** | bg `--ink`, text white, `h-10 px-5`, radius pill, 13–14px/500 | Contact Us, Learn More, See All, Submit |
| **Secondary** | transparent, 1px `--line-strong`, text `--ink` | Sign In / Admin, secondary CTAs |
| **Ghost link** | text + circular arrow (see 3.2) | "Learn More" in cards |
| **On-dark** | bg white, text ink | Over images / charcoal cards |
| Sizes | `sm 36px` · `md 40px` · `lg 52px` | Hero uses `lg` |

States: hover → background `#000` + arrow nudges 2px right; active → `scale(.98)`; focus-visible → 2px ring `--accent` offset 2px; disabled → 40% opacity.

### 3.2 Circular arrow button (`ArrowCircle`)
32–36px circle, bg `--ink`, white `arrow-right` icon (lucide, 16px, stroke 1.75). On hover the arrow translates `+3px`. Used next to "Learn More" and in the carousel (outlined variant for prev/next).

### 3.3 Eyebrow label
```
/TECHNOLOGY      ← 12px, uppercase, tracking .08em, color --ink, preceded by a literal "/"
```
Always placed 16px above the H2. The slash is part of the brand — never replace with a bullet.

### 3.4 Header (sticky)
- Height 64px, white (`--surface`) with bottom hairline, `backdrop-filter: blur(12px)` when scrolled.
- Left: logo `/NEIGHSHOP` (700, tracking `.04em`, 18px).
- Center: nav links (13px, `--ink-2`), gap 36px — **Services · Products · Portfolio · Blog · Training · About**.
- Right: `Contact Us` (primary pill) + `Admin / Sign In` (secondary pill, hidden for visitors, shown only as "Client Login" if needed).
- Mobile: hamburger → full-screen sheet with large links (28px), CTA pinned at bottom.
- Active link: 1px underline offset 6px.

### 3.5 Image card with glass caption (`MediaCard`)
```
┌──────────────────────────────┐
│         full-bleed image     │  radius 20px, overflow hidden
│                              │  image scales 1.04 on hover (600ms ease-out)
│▒▒▒▒▒▒▒▒▒ glass bar ▒▒▒▒▒▒▒▒▒▒│  background var(--glass-bg), blur 14px
│ Title (16px/500, white)      │  padding 16–20px
│ 2-line description (12.5px)  │  color rgba(255,255,255,.78), line-clamp 2
└──────────────────────────────┘
```
Add the scrim gradient under the glass bar so text stays AA-contrast on any photo.

### 3.6 Icon card (`IndustryCard`)
- 260–300px wide, height 340px, white, radius 20px, padding 24px.
- Top-left: 48px circle (`--ink` bg, white icon 22px).
- Bottom-left: title (18px/500) + description (13px/`--muted`, 3 lines).
- **Active/hover:** bg `--charcoal`, text white, icon circle flips to white bg with dark icon (this is the dark "Manufacturing" card in the reference).
- Lives in a horizontal scroll-snap carousel with **prev / next circles + thin progress line** above it.

### 3.7 Feature cell (`FeatureCell`)
Top hairline (`1px --line-strong`), 28px top padding, title (18px/500), description (13px/`--muted`, max 3 lines), 24px gap, then `Learn More` + `ArrowCircle`. Arranged 2×2 with 24px column gap.

### 3.8 Stat block
Large number (56–72px, 500, tight tracking) + 13px label under it, separated by vertical hairlines.
Data: `100+ Clients` · `100+ Projects` · `25+ Team` · `7+ Years` · `3–6 mo Post-launch support`.

### 3.9 Form controls
Height 48px, bg `--surface`, 1px `--line-strong`, radius 12px, 15px text. Focus: border `--ink` + 3px `rgba(17,17,17,.08)` ring. Labels above (13px/500). Errors: red text 12.5px + red border. Select / textarea share the same style. Floating labels are **not** used.

### 3.10 Badges / chips
Pill, 28px high, 12.5px text. Default: `--surface-2` bg. Accent: `--accent-soft` bg + `--accent` text. Used for tech tags, portfolio type, post categories.

### 3.11 Portfolio type badge (from `portfolioType`)
| Type | Badge |
|---|---|
| `CLIENT_PROJECT` | Accent chip "Client project" |
| `INTERNAL_DEMO` | Neutral chip "Neighshop demo" |
| `REFERENCE_CONCEPT` | Outline chip "Concept build" |

---

## 4. Layout System

- **12-column grid**, container 1280px, gutter 24px (desktop), 16px (mobile).
- Breakpoints: `sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536`.
- Section vertical rhythm: `--section-y` (72px mobile → 140px desktop).
- Heading block pattern (used everywhere): **eyebrow + H2 on the left (cols 1–7), short paragraph + button on the right (cols 9–12), aligned to the top** — exactly like the reference's hero and industries sections.
- Page "frame" treatment: each major section can sit inside a rounded `--r-xl` panel with `--bg` fill, inset 16px from the viewport on desktop, to echo the reference's rounded cards.

---

## 5. Page Blueprints

### 5.1 Home

**S1 · Hero**
```
[ Header ]
H1 (left, cols 1–8):         Paragraph (right, cols 9–12, top-aligned)
"We build software              "End-to-end software engineering and digital
 that moves your                 growth partner for startups and businesses."
 business forward"              [ Start a Project ]  [ View Work ]

[ Full-width rounded image/visual, bleeding off bottom edge, cropped ]
```
- Visual options (pick one): (a) cinematic photo of a team/workspace in muted tones, (b) a large 3D-rendered device cluster (phone + laptop) on white, (c) abstract product UI screenshots in a rounded frame. Keep it **desaturated** with one green or accent object, like the green container.
- H1 enters with a 0.6s mask-reveal per line (stagger 80ms).
- Small trust line under CTA: "100+ projects delivered · 7+ years · Delhi, India".

**S2 · Logos / proof strip** — marquee of client logos **only where `clientApproved`**; otherwise show the stat row instead.

**S3 · Services bento** (mirrors "Logistics Solutions")
- Header row: H2 "Services built for growth" left, paragraph + `See All` pill right.
- Grid (desktop 12 cols): row 1 → **two large cards (6/6)**, row 2 → **one large (6) + two small (3/3)**. Total 5 featured; remaining services appear on `/services`.
- Featured: Custom Website Development · Mobile App Development · CRM & Custom Software · E-Commerce Development · Digital Marketing/SEO.
- Cards use `MediaCard` (glass caption). Heights: large 320px, small 320px.

**S4 · Products** — 3 large white cards with a UI mock screenshot top, name, feature chips (Rapido Clone, Urban Company Clone, CRM). CTA "Request demo".

**S5 · Industries carousel** (mirrors "Tailored Logistics for Every Business")
- Eyebrow `/INDUSTRIES WE SERVE`, H2 "Tailored software for every industry", paragraph right, carousel controls right-aligned.
- Cards: Healthcare & MedTech · Fintech & Payments · EdTech & E-Learning · Logistics & Supply Chain · Real Estate & PropTech · E-Commerce & Retail.

**S6 · Why Neighshop / Technology** (mirrors "Innovation that Moves Your Business")
- Eyebrow `/TECHNOLOGY`, H2 left, paragraph right.
- Left: tall rounded image (4:5). Right: 2×2 `FeatureCell`s → *Product Engineering · Business Automation · AI & LLM Integration · Post-launch Support (3–6 months)*.
- Below: tech-stack marquee (React, Next.js, TypeScript, Node.js, Python, Django, Flutter, React Native, PostgreSQL, MongoDB, Firebase, AWS, Docker, GraphQL) as quiet grey wordmarks.

**S7 · Process** — 4-step horizontal timeline in hairline columns: Discovery Call → Scope & Quote → Design & Build → Launch & Support (numbers `01–04` in 56px light grey). Expandable to the 6-step version on `/about`.

**S8 · Portfolio preview** — masonry of 6 items with `portfolioType` badge. `View all work` pill.

**S9 · Stats + testimonials** — stat block, then a single large quote slider (only real, approved testimonials).

**S10 · Blog preview** — 3 cards: image 16:10, category chip, title (20px/500), date + reading time.

**S11 · Final CTA** — full-width **charcoal** rounded panel (`--r-xl`), huge white headline "Have an idea? Let's build it.", white pill button + phone/email. (The one dark moment on the page.)

**S12 · Footer** — white, 4 columns (company blurb + contact, Services, Company, Resources), giant `/NEIGHSHOP` wordmark in `--surface-2` across the bottom, locations strip (Delhi · Jaipur · Bangalore with status dots).

### 5.2 Services index & detail
- **Index:** same bento as home but all nine, plus a filter-free clean grid.
- **Detail (`/services/[slug]`):** hero (eyebrow + H1 + paragraph + CTA), feature chips, sticky side card ("Get a quote" mini-form), rich-text body, process strip, related portfolio (3), FAQ accordion, final CTA.

### 5.3 Portfolio
- Filter pills by category (All · E-Commerce · Healthcare · Service Provider · Logistics · Mobile App…).
- Grid 3-col, 4:3 images, hover → image zoom + arrow circle appears bottom-right.
- Detail: cover, meta row (Type, Industry, Services, Tech), Challenge / Solution / Results (big numbers), gallery, next-project link.

### 5.4 Blog
- **Index:** featured post (large 2-col card), category chips, search, 3-col grid, pagination.
- **Post:** narrow reading column (720px), H1 40–56px, author row, cover 16:9, auto table of contents on desktop (sticky left), callouts, code blocks (dark `#111` w/ copy button), FAQ block, author box, related posts, CTA card.
- Body text 18px/1.75, `--ink-2`; links underlined with `--accent`.

### 5.5 Training
- Hero with price `₹5,499`, "45 Days · Offline · Max 10 students · Narela, Delhi".
- Curriculum as a two-column checklist, project tiles (3 mini · 2 major · 1+ real client project), address card with map, enquiry form.

### 5.6 Contact
Two columns: left = big H1 + contact list (phone, email, Delhi address) + location status chips; right = white form card (name, email, phone, service select, budget, message). Success state replaces card content with a check + next steps.

---

## 6. Imagery & Iconography

- **Photography:** desaturate ~15%, soft natural light, neutral backgrounds, one hero object. Aspect ratios: hero 16:9 (or wider crop), cards 4:3 / 3:2, tall feature 4:5.
- **Product screenshots:** place inside a 28px-rounded frame on `--accent-2` (sage) background for a polished showcase look (reproduces the reference's presentation).
- **Icons:** lucide-react, 1.75 stroke, 20–24px; inside 48px solid circles for cards.
- **Illustrations:** none. Use photography, UI screenshots and 3D renders only.
- **Image rules:** always `next/image`, explicit width/height, descriptive `alt`, AVIF/WebP, blurred placeholder.

---

## 7. Motion

| Where | Effect | Spec |
|---|---|---|
| Page load | Hero lines reveal upward | 600ms, `cubic-bezier(.22,1,.36,1)`, stagger 80ms |
| Sections | Fade-up on enter | 24px → 0, 500ms, once, `IntersectionObserver` |
| Cards | Image zoom + lift | scale 1.04, 600ms; card `translateY(-4px)` + `--shadow-md` |
| Buttons | Arrow nudge, subtle press | 150ms |
| Carousel | Scroll-snap + progress bar fill | native scroll, no heavy libs |
| Header | Blur + hairline on scroll | 200ms |
| Numbers | Count-up in stats | 1.2s, once |

Use **Framer Motion** sparingly (hero, reveals). Respect `prefers-reduced-motion` — disable all transforms and keep fades only.

---

## 8. Responsive Behaviour

| Breakpoint | Changes |
|---|---|
| ≥1024 | Full bento, 2×2 feature grid, 4-card carousel visible |
| 768–1023 | Bento becomes 2 columns; hero paragraph moves under H1; carousel shows 2.5 cards |
| <768 | Single column; header → hamburger sheet; hero H1 44px; bento cards 280px tall stacked; industries carousel 1.2 cards visible with snap; stats 2×2; footer accordions |

Touch targets ≥ 44px. Sticky bottom CTA bar (Call / WhatsApp / Get Quote) on mobile for service and product pages.

---

## 9. Accessibility

- Contrast AA minimum (body `#2B2B2B` on `#F4F4F2` ≈ 12:1; muted `#6B6B66` on white ≈ 5.4:1).
- Glass captions always paired with scrim so white text ≥ 4.5:1.
- Visible focus rings, skip-to-content link, semantic landmarks, one H1 per page.
- Carousel: keyboard arrows, `aria-roledescription="carousel"`, pause on hover/focus.
- Accordions and sheets follow WAI-ARIA patterns (use shadcn/Radix primitives).
- Forms: labels linked, errors announced via `aria-live="polite"`.

---

## 10. Admin Panel UI (same language, denser)

The admin uses the **same tokens** so it feels like one product, with tighter density.

**Shell**
- Left sidebar 248px, white, hairline right border; logo `/NEIGHSHOP` + "Admin" chip. Groups: *Content* (Posts, Services, Products, Portfolio, Pages, FAQs) · *SEO* (Overview, Meta, Redirects, Sitemap, Schema, Audit) · *Business* (Leads, Team, Locations) · *System* (Media, Users, Settings, Audit log). Active item = `--surface-2` bg + 2px ink left bar.
- Top bar 56px: breadcrumb, global search (`⌘K` command palette), notifications, user menu.
- Canvas `--bg`; content in white cards (`--r-lg`, hairline border).

**Patterns**
- **Data tables:** 44px rows, sticky header, sortable, column visibility, row checkbox + bulk bar, status chips (Draft grey · In review amber · Scheduled blue · Published green).
- **Editor layout:** 2-column — left main editor (max 820px), right 340px sticky inspector with tabs `Publish · SEO · Settings`.
- **SEO tab:** SERP preview card (white, Google-like), character counters (green/amber/red), circular score gauge (0–100) with checklist beneath.
- **Dashboard:** KPI cards (number 32px + sparkline), SEO health donut, recent leads table, scheduled posts list.
- **Media library:** masonry grid, drag-drop dropzone with dashed `--line-strong` border, side panel for alt text (required badge if missing).
- **Empty states:** icon in 48px circle, one-line explanation, primary pill.
- **Toasts** bottom-right, ink bg, white text, 3s.
- Dark mode is **out of scope**; this is a light-theme product by decision.

---

## 11. Content Voice (UI copy)

- Short, confident, plain. Headings are statements, not slogans.
- Examples: *"We build software that moves your business forward."* · *"Tailored software for every industry."* · *"From first call to launch, one team."* · *"Have an idea? Let's build it."*
- Buttons: verbs — *Start a project, View work, Get a quote, Request demo, Read article*.
- Never claim clients that are not marked `CLIENT_PROJECT` + approved.

---

## 12. Implementation Notes

**Libraries:** Tailwind CSS, shadcn/ui (Radix), lucide-react, Framer Motion, `embla-carousel-react` (carousel), `next/font`, `next/image`.

**File layout**
```
src/components/ui/          Button, Badge, Input, Select, Accordion, Sheet, Tabs …
src/components/site/
  Header.tsx  Footer.tsx  Eyebrow.tsx  SectionHeader.tsx
  Hero.tsx  MediaCard.tsx  BentoGrid.tsx  IndustryCarousel.tsx
  FeatureGrid.tsx  StatBlock.tsx  ProcessSteps.tsx  CtaPanel.tsx
  PortfolioCard.tsx  PostCard.tsx  ContactForm.tsx
src/components/admin/       Sidebar, Topbar, DataTable, StatusChip, SeoPanel, MediaPicker, KpiCard …
src/styles/tokens.css       CSS variables from §2
```

**`SectionHeader` contract (reused on every section)**
```tsx
<SectionHeader
  eyebrow="Technology"            // renders "/TECHNOLOGY"
  title="Innovation that moves your business"
  description="We leverage the latest technology to improve how we manage your projects."
  action={{ label: "See all", href: "/services" }}
/>
```

**Quality bar before shipping each page**
- [ ] Matches tokens (no hard-coded colors/radii)
- [ ] Eyebrow + big heading pattern used
- [ ] Only one accent color visible; photography carries the color
- [ ] Lighthouse ≥ 95 mobile; images optimized
- [ ] Keyboard + screen-reader pass
- [ ] Looks right at 360 / 768 / 1280 / 1920 widths

---

*End of document.*