# ARCHITECTURE.md — Neighshop Global Website + Admin CMS

> Version 1.0 · Owner: Neighshop Global (Delhi, India) · Stack aligned with the company's own technology list (Next.js, TypeScript, Node.js, PostgreSQL, AWS, Docker).

---

## 1. Purpose & Goals

Build one platform with two faces:

1. **Public website** — fast, SEO-first marketing site for Neighshop Global (services, products, portfolio, blog, training, contact).
2. **Admin panel (CMS)** — a proper back office where the team manages **Blogs, Services, Portfolio, Products, FAQs, Team, Locations, Leads, Media and a full SEO panel** without touching code.

### Non-goals (v1)
- Multi-tenant SaaS, e-commerce checkout, student LMS for the training program (training stays on `training.neighshopglobal.com`; only a listing + enquiry form lives here).

### Principles
| Principle | Meaning |
|---|---|
| Content-as-data | Everything on the site comes from the database. No hardcoded copy except UI labels. |
| SEO by default | Every page type has meta, OG, canonical, JSON-LD, sitemap entry. Editors get an SEO score. |
| Fast by default | Static generation + on-demand revalidation. Target Lighthouse ≥ 95 (mobile). |
| Safe publishing | Draft → Review → Scheduled → Published, with revision history and rollback. |
| Truthful content | Portfolio entries carry a `portfolio_type` so references/demos are never shown as clients. |

---

## 2. High-Level Architecture

```
                        ┌──────────────────────────────┐
   Visitors / Google ──▶│  CDN (CloudFront / Cloudflare)│
                        └──────────────┬───────────────┘
                                       │
                        ┌──────────────▼───────────────┐
                        │   Next.js App (App Router)    │
                        │  ┌────────────┐ ┌───────────┐ │
                        │  │ Public site│ │ /admin UI │ │
                        │  │ (SSG + ISR)│ │ (CSR/SSR) │ │
                        │  └─────┬──────┘ └─────┬─────┘ │
                        │        │  Route Handlers / tRPC│
                        └────────┼──────────────┼───────┘
                                 │              │
              ┌──────────────────▼──────────────▼───────────────────┐
              │               Application / Service layer            │
              │ Auth · RBAC · Content · SEO · Media · Leads · Search │
              └───┬───────────────┬───────────────┬─────────────┬────┘
                  │               │               │             │
           ┌──────▼─────┐  ┌──────▼─────┐  ┌──────▼─────┐ ┌─────▼──────┐
           │ PostgreSQL │  │  S3 bucket │  │   Redis    │ │ Email (SES)│
           │  (Prisma)  │  │ (media)    │  │ cache/queue│ │ + WhatsApp │
           └────────────┘  └────────────┘  └────────────┘ └────────────┘
```

**Why a single Next.js monolith?** 25-person company, one product. One repo, one deploy, shared types between admin and public site. Split into services only when load demands it.

---

## 3. Technology Stack

| Layer | Choice | Reason |
|---|---|---|
| Framework | **Next.js 14+ (App Router), TypeScript** | SSG/ISR, metadata API, server actions |
| UI | Tailwind CSS + shadcn/ui | Fast, consistent admin and site UI |
| Rich text editor | **TipTap** (ProseMirror) | Block editor, outputs JSON + HTML, supports custom nodes (callouts, CTA, FAQ) |
| ORM | **Prisma** | Typed schema, migrations |
| Database | **PostgreSQL** (AWS RDS) | Relational, full-text search (`tsvector`) |
| Cache / queue | Redis (ElastiCache or Upstash) | Rate limiting, job queue (BullMQ), session cache |
| Auth | **Auth.js (NextAuth)** with credentials + optional Google SSO, TOTP 2FA | Role-based admin |
| Validation | Zod | Same schemas for forms, API, DB input |
| Media storage | AWS S3 + CloudFront, `sharp` for resizing/WebP/AVIF | Optimized images |
| Email | AWS SES (or Resend) | Lead notifications, password reset |
| Search | Postgres FTS (v1) → Meilisearch (later) | Blog + site search |
| Hosting | AWS (ECS Fargate or EC2 + Docker) | Matches company stack |
| CI/CD | GitHub Actions → Docker image → ECR → ECS | Automated deploys |
| Monitoring | Sentry, CloudWatch, UptimeRobot | Errors + uptime |
| Analytics | GA4 + Google Search Console + (optional) Plausible | Traffic + SEO data |

---

## 4. Repository Structure

```
neighshop-site/
├── ARCHITECTURE.md
├── prisma/
│   ├── schema.prisma
│   ├── migrations/
│   └── seed/                  # imports company/services/portfolio/faq JSON
│       ├── company.json
│       ├── services.json
│       ├── products.json
│       ├── portfolio.json
│       ├── team.json
│       ├── faq.json
│       ├── locations.json
│       └── seed.ts
├── src/
│   ├── app/
│   │   ├── (site)/                    # PUBLIC
│   │   │   ├── page.tsx               # Home
│   │   │   ├── services/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── products/[slug]/page.tsx
│   │   │   ├── portfolio/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [slug]/page.tsx
│   │   │   ├── blog/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── [slug]/page.tsx
│   │   │   │   ├── category/[slug]/page.tsx
│   │   │   │   ├── tag/[slug]/page.tsx
│   │   │   │   └── author/[slug]/page.tsx
│   │   │   ├── training/page.tsx
│   │   │   ├── about/page.tsx
│   │   │   ├── locations/[city]/page.tsx   # local SEO pages
│   │   │   ├── contact/page.tsx
│   │   │   ├── faq/page.tsx
│   │   │   └── [...page]/page.tsx          # generic CMS pages (privacy, terms)
│   │   ├── admin/                     # ADMIN (auth-protected)
│   │   │   ├── layout.tsx
│   │   │   ├── dashboard/
│   │   │   ├── blog/{posts,categories,tags,authors,comments}/
│   │   │   ├── services/
│   │   │   ├── products/
│   │   │   ├── portfolio/
│   │   │   ├── pages/
│   │   │   ├── faqs/
│   │   │   ├── team/
│   │   │   ├── locations/
│   │   │   ├── leads/
│   │   │   ├── media/
│   │   │   ├── seo/
│   │   │   │   ├── overview/
│   │   │   │   ├── meta-manager/
│   │   │   │   ├── redirects/
│   │   │   │   ├── sitemap-robots/
│   │   │   │   ├── schema/
│   │   │   │   ├── audit/
│   │   │   │   └── integrations/
│   │   │   ├── settings/
│   │   │   ├── users/
│   │   │   └── audit-log/
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/
│   │   │   ├── admin/…                # protected route handlers
│   │   │   ├── public/leads/          # contact form (rate-limited)
│   │   │   ├── revalidate/            # on-demand ISR
│   │   │   └── upload/                # signed S3 URLs
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── rss.xml/route.ts
│   │   └── feed.json/route.ts
│   ├── server/
│   │   ├── services/                  # business logic (post.service.ts, seo.service.ts …)
│   │   ├── repositories/              # Prisma queries
│   │   ├── auth/                      # rbac.ts, session.ts
│   │   ├── seo/                       # metadata builder, jsonld, scorer, redirects
│   │   ├── media/                     # s3, sharp pipeline
│   │   ├── jobs/                      # scheduled publish, sitemap ping, backups
│   │   └── validators/                # Zod schemas
│   ├── components/
│   │   ├── site/                      # Header, Footer, Hero, CTA, Cards …
│   │   ├── admin/                     # DataTable, Editor, SeoPanel, MediaPicker …
│   │   └── ui/                        # shadcn primitives
│   ├── lib/                           # utils, constants, env.ts
│   └── middleware.ts                  # admin auth gate + redirect engine
├── public/
├── Dockerfile
├── docker-compose.yml
├── .github/workflows/deploy.yml
└── .env.example
```

---

## 5. Data Model (Prisma)

### 5.1 Entity overview

```
User ──< Post >── Category
  │        │ ╲──< PostTag >── Tag
  │        ├──< PostRevision
  │        └── SeoMeta (1:1)
Service ── SeoMeta (1:1)
Product ── SeoMeta
PortfolioItem >──< Service / Industry ── SeoMeta
Page ── SeoMeta
Location ── SeoMeta
Faq (attachable to any page/service/post)
Redirect · Media · Lead · TeamMember · Setting · AuditLog
```

### 5.2 Schema (core)

```prisma
generator client { provider = "prisma-client-js" }
datasource db { provider = "postgresql"; url = env("DATABASE_URL") }

enum Role          { SUPER_ADMIN ADMIN EDITOR AUTHOR SEO_MANAGER VIEWER }
enum PublishStatus { DRAFT IN_REVIEW SCHEDULED PUBLISHED ARCHIVED }
enum PortfolioType { CLIENT_PROJECT INTERNAL_DEMO REFERENCE_CONCEPT }
enum LeadStatus    { NEW CONTACTED QUALIFIED PROPOSAL WON LOST SPAM }
enum RobotsDirective { INDEX_FOLLOW NOINDEX_FOLLOW INDEX_NOFOLLOW NOINDEX_NOFOLLOW }

model User {
  id           String   @id @default(cuid())
  name         String
  email        String   @unique
  passwordHash String
  role         Role     @default(EDITOR)
  avatarId     String?
  bio          String?
  slug         String   @unique         // author page
  twoFactorSecret String?
  isActive     Boolean  @default(true)
  lastLoginAt  DateTime?
  posts        Post[]
  createdAt    DateTime @default(now())
}

/// ---------- SEO (shared by every content type) ----------
model SeoMeta {
  id               String   @id @default(cuid())
  metaTitle        String?                    // <= 60 chars recommended
  metaDescription  String?                    // <= 160 chars recommended
  focusKeyword     String?
  secondaryKeywords String[]
  canonicalUrl     String?
  robots           RobotsDirective @default(INDEX_FOLLOW)
  ogTitle          String?
  ogDescription    String?
  ogImageId        String?
  twitterCard      String   @default("summary_large_image")
  schemaType       String?                    // Article, Service, FAQPage, Product, LocalBusiness…
  schemaOverride   Json?                      // custom JSON-LD (advanced)
  includeInSitemap Boolean  @default(true)
  sitemapPriority  Float    @default(0.7)
  sitemapChangefreq String  @default("weekly")
  seoScore         Int?                       // 0–100, computed
  seoIssues        Json?                      // [{rule, severity, message}]
  updatedAt        DateTime @updatedAt

  post      Post?
  service   Service?
  product   Product?
  portfolio PortfolioItem?
  page      Page?
  location  Location?
}

/// ---------- BLOG ----------
model Post {
  id            String   @id @default(cuid())
  title         String
  slug          String   @unique
  excerpt       String?
  contentJson   Json                          // TipTap document
  contentHtml   String                        // rendered + sanitized
  tocJson       Json?                         // auto-generated headings
  coverImageId  String?
  coverAlt      String?
  status        PublishStatus @default(DRAFT)
  publishedAt   DateTime?
  scheduledFor  DateTime?
  readingTimeMin Int      @default(1)
  isFeatured    Boolean  @default(false)
  allowComments Boolean  @default(false)
  authorId      String
  author        User     @relation(fields: [authorId], references: [id])
  categoryId    String?
  category      Category? @relation(fields: [categoryId], references: [id])
  tags          PostTag[]
  relatedServiceId String?                    // for internal-link CTA block
  seoId         String   @unique
  seo           SeoMeta  @relation(fields: [seoId], references: [id])
  revisions     PostRevision[]
  faqs          Faq[]
  viewCount     Int      @default(0)
  searchVector  Unsupported("tsvector")?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
  @@index([status, publishedAt])
}

model PostRevision {
  id        String   @id @default(cuid())
  postId    String
  post      Post     @relation(fields: [postId], references: [id], onDelete: Cascade)
  title     String
  contentJson Json
  editorId  String
  note      String?
  createdAt DateTime @default(now())
}

model Category { id String @id @default(cuid()) name String slug String @unique description String? posts Post[] }
model Tag      { id String @id @default(cuid()) name String slug String @unique posts PostTag[] }
model PostTag  { postId String tagId String post Post @relation(fields:[postId],references:[id]) tag Tag @relation(fields:[tagId],references:[id]) @@id([postId, tagId]) }

/// ---------- SERVICES ----------
model Service {
  id           String   @id @default(cuid())
  name         String                          // "Mobile App Development"
  slug         String   @unique
  shortDesc    String                          // card text
  longContentJson Json?                        // full page body
  longContentHtml String?
  iconKey      String?
  heroImageId  String?
  features     String[]                        // ["Android","iOS","Fintech"]
  techTags     String[]
  process      Json?                           // optional per-service steps
  displayOrder Int      @default(0)
  status       PublishStatus @default(DRAFT)
  seoId        String   @unique
  seo          SeoMeta  @relation(fields: [seoId], references: [id])
  portfolio    PortfolioItem[]
  faqs         Faq[]
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
}

/// ---------- PRODUCTS (Rapido Clone, Urban Company Clone, CRM…) ----------
model Product {
  id           String   @id @default(cuid())
  name         String
  slug         String   @unique
  category     String
  description  String
  contentJson  Json?
  features     String[]
  priceLabel   String?                         // "Starting at ₹…" or "On request"
  demoUrl      String?
  galleryIds   String[]
  displayOrder Int      @default(0)
  status       PublishStatus @default(DRAFT)
  seoId        String   @unique
  seo          SeoMeta  @relation(fields: [seoId], references: [id])
  faqs         Faq[]
}

/// ---------- PORTFOLIO ----------
model PortfolioItem {
  id           String   @id @default(cuid())
  name         String
  slug         String   @unique
  category     String                          // E-Commerce, Healthcare, Logistics…
  description  String
  portfolioType PortfolioType @default(REFERENCE_CONCEPT)   // IMPORTANT – see §5.3
  clientName   String?
  clientApproved Boolean @default(false)       // permission to show name/logo
  caseStudyJson Json?
  challenge    String?
  solution     String?
  results      Json?                           // [{label:"Load time", value:"-42%"}]
  techUsed     String[]
  liveUrl      String?
  coverImageId String?
  galleryIds   String[]
  completedOn  DateTime?
  isFeatured   Boolean  @default(false)
  displayOrder Int      @default(0)
  status       PublishStatus @default(DRAFT)
  services     Service[]
  seoId        String   @unique
  seo          SeoMeta  @relation(fields: [seoId], references: [id])
}

/// ---------- GENERIC PAGES, LOCATIONS, FAQ, TEAM ----------
model Page {
  id String @id @default(cuid())
  title String slug String @unique
  contentJson Json contentHtml String
  template String @default("default")
  status PublishStatus @default(DRAFT)
  seoId String @unique seo SeoMeta @relation(fields:[seoId],references:[id])
}

model Location {
  id String @id @default(cuid())
  city String slug String @unique
  status String                                // Active | Maintenance | Coming Soon
  address String? phone String? lat Float? lng Float?
  contentJson Json?
  seoId String @unique seo SeoMeta @relation(fields:[seoId],references:[id])
}

model Faq {
  id String @id @default(cuid())
  question String answer String
  displayOrder Int @default(0)
  isGlobal Boolean @default(false)             // shown on /faq
  postId String? post Post? @relation(fields:[postId],references:[id])
  serviceId String? service Service? @relation(fields:[serviceId],references:[id])
  productId String? product Product? @relation(fields:[productId],references:[id])
}

model TeamMember {
  id String @id @default(cuid())
  name String role String bio String? photoId String?
  expertise String[] linkedin String? displayOrder Int @default(0) isVisible Boolean @default(true)
}

/// ---------- SEO INFRA ----------
model Redirect {
  id String @id @default(cuid())
  fromPath String @unique
  toPath String
  statusCode Int @default(301)                 // 301 | 302 | 410
  hits Int @default(0)
  isAuto Boolean @default(false)               // created when slug changes
  createdAt DateTime @default(now())
}

model Media {
  id String @id @default(cuid())
  key String url String mimeType String
  width Int? height Int? sizeBytes Int
  altText String? title String? folder String @default("general")
  variants Json?                                // {thumb, md, lg, webp, avif}
  uploadedById String createdAt DateTime @default(now())
}

/// ---------- LEADS, SETTINGS, AUDIT ----------
model Lead {
  id String @id @default(cuid())
  name String email String phone String?
  company String? service String? budget String? message String
  sourcePage String? utmSource String? utmMedium String? utmCampaign String?
  status LeadStatus @default(NEW)
  assignedToId String? notes String?
  ipHash String? createdAt DateTime @default(now())
}

model Setting { key String @id value Json }        // company, social, scripts, analytics IDs
model AuditLog {
  id String @id @default(cuid())
  userId String action String entity String entityId String
  diff Json? ip String? createdAt DateTime @default(now())
  @@index([entity, entityId])
}
```

### 5.3 Portfolio integrity rule (important)

The source data mixes real projects with references and demos (e.g. *Orbito CRM* is labeled "demo by Neighshop Global"; names such as *Gymshark*, *GoPuff*, *TaskRabbit* are well-known third-party brands, and a public listing does not by itself prove a client relationship).

| `portfolioType` | Shown as | Allowed UI wording |
|---|---|---|
| `CLIENT_PROJECT` + `clientApproved = true` | "Client project" | Name, logo, case study |
| `INTERNAL_DEMO` | "Neighshop demo" | "Demo product built by Neighshop" |
| `REFERENCE_CONCEPT` | "Concept / reference build" | "Inspired by…", **never** "our client" |

Rules enforced in code:
- Default for all seeded entries = `REFERENCE_CONCEPT` until a human reviews them.
- A third-party brand name/logo can only be published as a client if `clientApproved` is true.
- Public site badge and JSON-LD reflect the type automatically.
- Admin shows a warning banner on any item with a recognized brand name and no approval.

---

## 6. Admin Panel (CMS)

### 6.1 Roles & permissions (RBAC)

| Permission | Super Admin | Admin | Editor | Author | SEO Manager | Viewer |
|---|:-:|:-:|:-:|:-:|:-:|:-:|
| Manage users / roles | ✅ | ✅ | – | – | – | – |
| Site settings, scripts | ✅ | ✅ | – | – | – | – |
| Create/edit own posts | ✅ | ✅ | ✅ | ✅ | – | – |
| Edit all posts | ✅ | ✅ | ✅ | – | – | – |
| Publish / schedule | ✅ | ✅ | ✅ | – | – | – |
| Services / Products / Portfolio CRUD | ✅ | ✅ | ✅ | – | – | – |
| SEO panel (meta, redirects, schema, sitemap) | ✅ | ✅ | view | – | ✅ | – |
| Leads | ✅ | ✅ | view | – | – | view |
| Media upload | ✅ | ✅ | ✅ | ✅ | ✅ | – |
| Audit log | ✅ | ✅ | – | – | – | – |

Permissions are checked server-side in `server/auth/rbac.ts` (`can(user, "post:publish")`). UI hiding is cosmetic only.

### 6.2 Dashboard
- Posts by status, scheduled queue, drafts awaiting review
- New leads (7/30 days), lead-status funnel
- SEO health: average score, pages with issues, 404s, top redirects
- Search Console snapshot (clicks, impressions, top queries) when connected
- Recent activity from the audit log

### 6.3 Blog module (full)

**Posts list:** search, filter (status, category, author, date), bulk actions (publish, archive, change category, delete), column for SEO score.

**Post editor (single screen, 3 zones):**
```
┌───────────────────────────────┬──────────────────────────┐
│ Title / Slug (auto + editable)│  Publish box             │
│ TipTap editor                 │   Status · Schedule date │
│  - H2/H3, lists, quotes       │   Author · Featured      │
│  - Images w/ alt + caption    │   Save draft / Preview   │
│  - Code blocks, tables        │  Category · Tags         │
│  - Callout, CTA, FAQ blocks   │  Cover image + alt       │
│  - YouTube embed              │  Related service (CTA)   │
│  - Internal link suggester    │ ───────────────────────  │
│ Excerpt                       │  SEO PANEL (live)        │
│                               │   Snippet preview        │
│                               │   Focus keyword + score  │
│                               │   Checklist              │
└───────────────────────────────┴──────────────────────────┘
```

**Blog features**
- Auto slug from title, uniqueness check, **auto-redirect on slug change**
- Autosave every 30s; **revision history** with diff + restore
- Workflow: Draft → In Review → Scheduled → Published (Authors can only submit for review)
- Scheduled publishing via BullMQ job → triggers ISR revalidation
- Auto **table of contents**, reading time, heading-ID anchors
- Categories (single), tags (many), author profiles with bio (E-E-A-T)
- Related posts (same category/tags) + manual override
- Preview link with signed token for unpublished drafts
- FAQ block per post → outputs `FAQPage` JSON-LD
- Cover image + OG image auto-generated fallback (`@vercel/og`) when none set
- RSS + JSON feed
- Optional comments (off by default; moderation queue if enabled)
- HTML sanitization (DOMPurify/sanitize-html) on save

### 6.4 Services module
CRUD for the nine services (seeded from `services.json`): name, slug, short description (card), long rich-text body, features/tags, tech tags, icon, hero image, display order (drag-and-drop), related portfolio items, service-level FAQs, SEO tab. Each service renders at `/services/[slug]` with a lead CTA.

### 6.5 Portfolio module
CRUD with `portfolioType`, `clientApproved`, category, case study fields (challenge/solution/results), tech used, gallery, linked services, featured flag, order. Filter chips by category on the public page. Warning banners per §5.3.

### 6.6 Other modules
| Module | Notes |
|---|---|
| **Products** | Rapido Clone, Urban Company Clone, CRM & Custom Software; features list, gallery, demo URL, "Request demo" CTA |
| **Pages** | About, Privacy, Terms, Refund etc. with templates |
| **FAQs** | Global + attachable to services/products/posts |
| **Team** | Founder/CEO, CTO, COO and future hires |
| **Locations** | Delhi (Active), Jaipur (Maintenance), Bangalore (Coming Soon); each can have a local-SEO page |
| **Training listing** | Single editable page: program, duration, price, curriculum, address, enquiry form |
| **Leads (mini-CRM)** | Inbox, status pipeline, assign, notes, CSV export, spam filter, email alert |
| **Media library** | Folders, drag-drop upload, auto WebP/AVIF + responsive sizes, **alt-text required** to publish, usage tracking, unused-file cleanup |
| **Settings** | Company info, social links, header/footer menus, analytics IDs, header/footer scripts, default OG image, 404 content |
| **Users** | Invite by email, roles, enforce 2FA, deactivate |
| **Audit log** | Who changed what, with before/after diff |

---

## 7. SEO Panel (dedicated module)

### 7.1 Per-content SEO tab (appears on every editor)
- Meta title & description with **live character counters** and pixel-width bar
- **Google SERP preview** (desktop + mobile) and **social card preview**
- Focus keyword + secondary keywords
- Canonical URL, robots directive (index/noindex, follow/nofollow)
- OG / Twitter overrides, OG image picker
- Schema type selector + JSON-LD preview/override
- Include in sitemap, priority, change frequency
- **SEO score (0–100)** with a pass/fail checklist

**Scoring rules (examples)**

| Rule | Severity |
|---|---|
| Title 30–60 chars and contains focus keyword | High |
| Description 120–160 chars and contains keyword | High |
| Slug short, lowercase, contains keyword | Medium |
| Keyword in first 100 words | Medium |
| Exactly one H1; keyword in at least one H2 | Medium |
| Content ≥ 600 words (blog) | Medium |
| All images have alt text | High |
| ≥ 2 internal links, ≥ 1 external link | Medium |
| Cover/OG image present | Medium |
| No duplicate title/description elsewhere | High |
| Readability (sentence length, passive voice) | Low |

Score is computed in `server/seo/scorer.ts` on save and stored in `SeoMeta.seoScore` / `seoIssues`.

### 7.2 SEO section in admin (`/admin/seo/*`)

1. **Overview** — site-wide score, issue counts, top errors, indexation status, Search Console clicks/impressions.
2. **Meta Manager** — spreadsheet-style table of every URL: title, description, robots, score. Inline edit, bulk edit, export/import CSV. Highlights missing/duplicate/too-long values.
3. **Templates** — default patterns, e.g. blog: `%title% | Neighshop Global`, service: `%service% in %city% | Neighshop Global`. Per-field fallback chain: custom → template → auto-generated.
4. **Redirects** — 301/302/410 rules, regex support, CSV import, hit counter, auto-created on slug/URL change, loop detection.
5. **404 Monitor** — logs broken URLs hit by users/bots, one-click "create redirect".
6. **Sitemap & Robots** — view/preview generated `sitemap.xml` (index split by type: pages, services, portfolio, blog, locations), exclude rules, edit `robots.txt`, ping search engines on publish.
7. **Schema (JSON-LD)** — global Organization + WebSite (with sitelinks search box), per-type templates, validator link, custom overrides.
8. **Site Audit** — scheduled crawl (weekly) of own URLs: broken links, missing alt, orphan pages, redirect chains, thin content, duplicate titles, slow pages (Lighthouse CI).
9. **Internal Linking** — suggestions ("this post mentions *mobile app development* → link to `/services/mobile-app-development`"), orphan-page list.
10. **Integrations** — Google Search Console (OAuth, read-only), GA4, Bing Webmaster verification tags, Google Business Profile link, Meta pixel — stored in `Setting`, injected via the layout.
11. **Local SEO** — NAP (Name, Address, Phone) block, LocalBusiness schema per city (Delhi active; Jaipur/Bangalore flagged), city landing pages.

### 7.3 Technical SEO implemented in code

| Item | Implementation |
|---|---|
| Metadata | Next.js `generateMetadata()` reads `SeoMeta` + templates |
| JSON-LD | `Organization`, `WebSite`, `BreadcrumbList` (all), `Article`/`BlogPosting` (posts), `Service` (services), `FAQPage`, `Product`/`SoftwareApplication` (products), `LocalBusiness` (locations), `CreativeWork` (portfolio, respecting `portfolioType`), `Course` (training) |
| Sitemap | `app/sitemap.ts` — DB-driven, `lastmod` from `updatedAt`, split into multiple sitemaps over 5,000 URLs |
| Robots | `app/robots.ts` — blocks `/admin`, `/api`, preview URLs; points to sitemap |
| Canonical | Always absolute, strips tracking params, handles pagination |
| Pagination | `rel` handling + self-canonical on blog pages |
| Images | `next/image`, AVIF/WebP, width/height set, lazy loading, mandatory alt |
| Core Web Vitals | SSG/ISR, font subsetting, minimal client JS, preconnect, CDN caching |
| Hreflang | Ready for `en-IN` / `en` if international pages are added |
| Slugs | Lowercase-hyphen, no stop-words option, immutable after publish unless auto-redirect is on |
| Security headers | HSTS, CSP, X-Content-Type-Options, Referrer-Policy |
| Feeds | `/rss.xml`, `/feed.json` |
| Admin pages | `noindex, nofollow` always |

---

## 8. Rendering, Caching & Revalidation

| Page type | Strategy | Revalidation |
|---|---|---|
| Home, Services, Portfolio, Products, Pages | **SSG + ISR** | On-demand when admin saves/publishes |
| Blog index / post / category / tag | **SSG + ISR** (`revalidate: 3600` safety net) | On-demand on publish/update; also revalidates index + category + tag + author pages |
| Search results | SSR (no-store) | – |
| Admin | SSR / client, `no-store` | – |
| Lead form POST | Route handler | – |

Flow: **Admin saves → service layer writes DB → `revalidatePath/Tag` called → CDN purge (CloudFront invalidation for changed paths) → sitemap `lastmod` updates.**

---

## 9. API Design

Internal REST route handlers (Zod-validated) under `/api`. All `/api/admin/*` require session + permission.

| Method | Endpoint | Purpose |
|---|---|---|
| GET/POST | `/api/admin/posts` | list / create |
| GET/PATCH/DELETE | `/api/admin/posts/:id` | read / update / delete |
| POST | `/api/admin/posts/:id/publish` | publish or schedule |
| GET | `/api/admin/posts/:id/revisions` | revision list |
| POST | `/api/admin/posts/:id/revisions/:rid/restore` | rollback |
| CRUD | `/api/admin/services`, `/products`, `/portfolio`, `/pages`, `/faqs`, `/team`, `/locations` | content |
| POST | `/api/admin/reorder` | drag-drop ordering |
| GET/PATCH | `/api/admin/seo/meta` | bulk meta manager |
| CRUD | `/api/admin/seo/redirects` | redirects |
| GET | `/api/admin/seo/404s` | 404 log |
| POST | `/api/admin/seo/audit/run` | trigger crawl |
| POST | `/api/admin/seo/score` | live score for editor |
| POST | `/api/upload/sign` | S3 pre-signed upload |
| GET/PATCH | `/api/admin/leads` | leads inbox |
| POST | `/api/public/leads` | contact form (rate-limited, honeypot, reCAPTCHA/Turnstile) |
| GET | `/api/public/search?q=` | site search |
| POST | `/api/revalidate` | secret-protected ISR hook |

**Optional (v2):** expose a read-only public JSON/GraphQL API so mobile apps or other sites can consume the content.

---

## 10. Security

- Passwords: Argon2id; lockout after repeated failures; 2FA (TOTP) mandatory for Admin/Super Admin
- Sessions: httpOnly, secure, SameSite=Lax cookies; short-lived with rotation
- CSRF protection on mutations; strict Zod validation on every input
- Rich-text sanitized on save **and** render; uploads validated by MIME + magic bytes, size limits, no SVG scripts
- Rate limiting (Redis) on login, lead form, search
- Spam: honeypot + Cloudflare Turnstile + email/IP throttling
- Secrets in AWS Secrets Manager; `.env` never committed
- Least-privilege IAM for S3/SES; private S3 origin behind CloudFront (OAC)
- DB: private subnet, encrypted at rest, daily automated backups + 7-day PITR, quarterly restore test
- Lead PII: IPs stored hashed; data-retention policy; privacy policy + consent banner (India DPDP Act-aware)
- Audit log for all admin writes; admin URL behind optional IP allow-list
- Dependency scanning (Dependabot, `npm audit`) in CI

---

## 11. Performance Targets

| Metric | Target |
|---|---|
| LCP | < 2.0 s (mobile, 4G) |
| INP | < 200 ms |
| CLS | < 0.05 |
| TTFB (cached) | < 200 ms |
| Lighthouse (SEO / Best Practices / A11y) | ≥ 95 each |
| JS on public pages | < 120 KB gzipped |

Admin-only libraries (TipTap, tables, charts) are loaded only under `/admin` via route-level code splitting.

---

## 12. Deployment & Environments

| Env | Purpose | Infra |
|---|---|---|
| Local | Dev | `docker-compose` (Postgres, Redis, MinIO, Mailpit) |
| Staging | QA / client preview (`staging.…`, `noindex`) | Small ECS service + RDS |
| Production | Live | ECS Fargate (2 tasks), RDS Multi-AZ, ElastiCache, S3 + CloudFront |

**CI/CD (GitHub Actions):** lint → typecheck → unit/integration tests → Prisma migrate (staging) → Playwright smoke tests → build Docker image → push to ECR → deploy → post-deploy Lighthouse CI + sitemap ping.

**Environment variables (`.env.example`)**
```
DATABASE_URL=
REDIS_URL=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
SITE_URL=https://neighshopglobal.com
S3_BUCKET= S3_REGION= CDN_URL=
AWS_ACCESS_KEY_ID= AWS_SECRET_ACCESS_KEY=
SES_FROM_EMAIL=info@neighshopglobal.com
TURNSTILE_SECRET=
REVALIDATE_SECRET=
GOOGLE_CLIENT_ID= GOOGLE_CLIENT_SECRET=      # SSO + Search Console
SENTRY_DSN=
```

---

## 13. Seed Data Mapping

Initial import from the company JSON files (`prisma/seed/seed.ts`):

| Source file | → Table | Notes |
|---|---|---|
| `company.json` | `Setting(company)` | Stats, mission, contact, positioning |
| `services.json` | `Service` | 9 services; `features` → `features[]`; slugs auto-generated |
| `products.json` | `Product` | Rapido Clone, Urban Company Clone, CRM; Training → `Page(training)` |
| `portfolio.json` | `PortfolioItem` | **All set to `REFERENCE_CONCEPT` / `clientApproved=false`; `Orbito CRM` → `INTERNAL_DEMO`** pending human review |
| `team.json` | `TeamMember` | 3 leaders |
| `technology.json` | `Setting(tech)` | Rendered as tech-stack section |
| `industries.json` | `Setting(industries)` | Home + service pages |
| `process.json` | `Setting(process)` | 6-step process (+ 4-step commercial flow) |
| `faq.json` | `Faq(isGlobal=true)` | Also emits `FAQPage` schema |
| `locations.json` | `Location` | Delhi, Jaipur, Bangalore with status |
| Training dataset | `Page(training)` + structured JSON | Program, price ₹5,499, 45 days, Narela address, curriculum |

Every seeded record starts as `DRAFT` with an auto-generated `SeoMeta` (title/description templates) so nothing goes live unreviewed.

---

## 14. Suggested Public Site Map (URLs)

```
/                         Home
/services                 Services index
/services/{slug}          9 service pages
/products/{slug}          Rapido Clone · Urban Company Clone · CRM
/portfolio                Filterable gallery
/portfolio/{slug}         Case study / project page
/blog                     Blog index (search, categories)
/blog/{slug}              Post
/blog/category/{slug}     /blog/tag/{slug}     /blog/author/{slug}
/training                 Internship program + enquiry
/about                    Story, team, mission, stats
/locations/{city}         Delhi (primary), Jaipur, Bangalore
/faq   /contact   /privacy-policy   /terms
/sitemap.xml  /robots.txt  /rss.xml
```

Suggested high-intent landing content (SEO): *app development company in Delhi*, *Rapido clone app development*, *Urban Company clone script*, *custom CRM development India*, *internship in Delhi web development*.

---

## 15. Delivery Roadmap

| Phase | Scope | Est. |
|---|---|---|
| **0 — Foundation** | Repo, Docker, CI, Prisma schema, auth, RBAC, design system | 1 wk |
| **1 — CMS core** | Media library, Services, Products, Portfolio, Pages, FAQs, Team, Locations CRUD + seed import | 2 wks |
| **2 — Blog** | Editor, categories/tags/authors, revisions, scheduling, preview, RSS | 2 wks |
| **3 — SEO panel** | Per-page SEO tab + scoring, templates, sitemap/robots, redirects, 404 monitor, JSON-LD | 2 wks |
| **4 — Public site** | All templates, lead form + Leads inbox, search, performance pass | 2 wks |
| **5 — Hardening** | Audit crawler, Search Console/GA4, security review, load test, content migration, launch | 1–2 wks |
| **v2 ideas** | Meilisearch, AI-assisted meta/outline drafting (LLM), A/B landing pages, public content API, multi-language | later |

---

## 16. Definition of Done (per content type)

- [ ] CRUD in admin with validation and permissions
- [ ] Draft / publish / (schedule) workflow and preview
- [ ] SEO tab with score, SERP preview, JSON-LD
- [ ] Included in sitemap, correct canonical, breadcrumbs
- [ ] On-demand revalidation on save
- [ ] Audit-log entries
- [ ] Mobile-responsive public template, Lighthouse ≥ 95
- [ ] Unit + e2e tests for the main flow

---

*End of document.*