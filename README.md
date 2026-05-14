# next-boilerplate

A production-ready [Next.js](https://nextjs.org) 16 boilerplate with dark mode, shadcn/ui, SEO, and an agent-driven workflow for building branded business websites.

Built for Spanish-language projects — works for any locale.

## Quick start

```bash
bun install
bun dev      # → http://localhost:3000
bun run build
```

## Client workflow

This template is designed to be cloned for each client. The agent scaffolds brand identity and pages via conversation.

### 1. Configure

**`lib/business.ts`** — business name, services, industry, vibe:

```ts
export const businessConfig = {
  name: "Panadería El Trigo",
  tagline: "El pan de cada día",
  industry: "bakery",                          // controls design direction
  vibe: "family owned, warm, traditional",     // modifies the design
  email: "hola@panaderiaeltrigo.com",
  phone: "+34 91 123 45 67",
  address: "Calle Mayor 12, Madrid",
  services: [
    { title: "Pan artesano", description: "Masa madre, horneado en piedra" },
  ],
}
```

**`lib/config.ts`** — URL, locale, OG image path, social links.

The demo pages (Home, About, Contact) stay as examples — no need to delete them.

### 2. Generate brand identity

> "generate brand identity"

The agent reads `industry` + `vibe` and:

| Step | What happens |
|------|-------------|
| Colour palette | Generates oklch values → writes to `app/globals.css` |
| Font pairing | Picks display + body fonts → updates `app/layout.tsx` |
| Logo | Asks: provide your own, generate an SVG, or skip |
| Decorations | Creates 0-3 SVG components (blobs, waves, patterns) only if they fit the brand |
| Brand tokens | Writes `lib/brand.ts` with all colour, font, and design token values |
| Guidelines | Fills `docs/BRAND.md` with palette, typography, voice & tone |

### 3. Generate pages

> "generate a services page"

Agent reads brand tokens, follows the relevant playbook, creates:

```
app/services/page.tsx      # Server component with metadata + content
app/services/loading.tsx   # Suspense fallback
```

Header nav updates automatically. Repeat for each page:

> "generate an about page"
> "add an FAQ page"    → agent asks for Q&A content
> "add a team page"    → agent asks for team member info

Every page inherits the same palette, fonts, radii, shadows, and decorative language.

### 4. Launch

```bash
bun run build
```

## Project structure

```
app/
├── layout.tsx            # Root layout (metadata, ThemeProvider, Header, Footer, JSON-LD)
├── page.tsx              # Home page
├── loading.tsx           # Root loading spinner
├── not-found.tsx         # 404 page
├── globals.css           # Tailwind v4 + brand colour variables
├── sitemap.ts            # Dynamic sitemap
├── robots.ts             # robots.txt
├── opengraph-image.tsx   # Dynamic OG image
├── manifest.ts           # Web app manifest
├── about/                # Demo page (keep as example)
├── contact/              # Demo page (keep as example)
└── api/health/           # Health check endpoint
components/
├── ui/                   # shadcn components (auto-generated)
└── layout/
    ├── Header.tsx        # Navigation + theme toggle
    ├── Footer.tsx
    └── ThemeToggle.tsx
lib/
├── config.ts             # Site-wide config (name, URL, locale, socials)
├── business.ts           # Business data (services, industry, vibe)
├── brand.ts              # Brand tokens + image asset specs (populated by brand-generator)
├── design-inspiration.ts # Reference URLs for the agent to analyze
├── json-ld.tsx           # Structured data helpers
└── utils.ts              # cn() utility
public/
└── images/               # Image placeholders (specs in brand.ts; add real files here)
```

## Manual reference

### Configuration

**`lib/config.ts`** drives all SEO metadata, sitemap URLs, robots.txt, JSON-LD, and OG image:

```ts
export const siteConfig = {
  name: "My Project",
  description: "A description for SEO and OG tags.",
  url: "https://mydomain.com",
  locale: "es_ES",
  ogImage: "/opengraph-image",
  socials: {
    twitter: "https://twitter.com/myhandle",
    github: "https://github.com/me/my-project",
  },
}
```

### Brand colors

Colours use the **oklch()** colour space, defined in a single Brand Palette block at the top of `app/globals.css`. Each variable has a light (`-l`) and dark (`-d`) variant:

```css
:root {
  --primary-l: oklch(0.45 0.22 265);     /* light mode */
  --primary-fg-l: oklch(0.985 0 0);
  --primary-d: oklch(0.65 0.18 265);     /* dark mode */
  --primary-fg-d: oklch(0.15 0 0);
}
```

The semantic mapping blocks below (`:root` and `.dark`) pass through these variables — never edit them. The agent (`brand-generator` skill) populates this block automatically.

Semantic Tailwind utilities (`bg-primary`, `text-muted-foreground`, `border-border`, etc.) map to these variables throughout the codebase.

### Fonts

Default: **Geist Sans** (body) and **Geist Sans** (headings). The agent swaps these per client via `next/font/google`. To change manually, update the font imports in `app/layout.tsx` and the `<html>` className.

Tailwind utilities `font-sans`, `font-mono`, `font-heading` map to the CSS variables set by your chosen fonts.

### Dark mode

Uses `next-themes` with class strategy. Toggle button in the header. Respects `prefers-color-scheme` on first visit, persists choice to `localStorage`. CSS variables in `:root` (light) and `.dark` (dark) handle all theming.

### SEO

Everything drives from `lib/config.ts`:

| Feature | Implementation |
|---------|---------------|
| Title template | `"%s | {name}"` in root layout |
| Open Graph | Per-page `og:title`, `og:description`, `og:image` |
| Twitter Cards | `summary_large_image` |
| Sitemap | Dynamic `sitemap.xml` with priorities |
| Robots.txt | Allow all, points to sitemap |
| OG image | 1200×630 via `next/og` |
| Structured data | Organization, WebSite, BreadcrumbList via `lib/json-ld.tsx` |
| Viewport | `device-width`, `initial-scale=1`, theme color |
| Security | `Referrer-Policy: strict-origin-when-cross-origin` |

### shadcn components

```bash
bunx --bun shadcn@latest add dialog select
```

Components land in `components/ui/`. Uses **base-ui/react** primitives (not Radix) — the `render` prop replaces Radix's `asChild`.

### CSS utilities

Available in `globals.css` for page generation:

| Utility | Type | Use case |
|---------|------|----------|
| `.noise` | Fixed overlay | Subtle film-grain texture on entire page |
| `.glass` / `.glass-strong` | Background | Glassmorphism cards with backdrop blur |
| `.text-gradient` | Text color | Gradient heading text |
| `.clip-diagonal` / `.clip-diagonal-up` | Section clip-path | Dynamic diagonal section dividers |
| `.animate-fade-in-up` / `.animate-fade-in-left` / `.animate-scale-in` | Keyframe | Entrance animations (stagger with `.delay-{100-700}`) |
| `.animate-float` | Keyframe | Infinite gentle float for decorative elements |

### Adding a page manually

```tsx
// app/features/page.tsx
import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: "Features",
  description: "Our features",
  openGraph: {
    title: `Features | ${siteConfig.name}`,
    description: "Our features",
    url: `${siteConfig.url}/features`,
  },
  alternates: { canonical: "/features" },
}

export default function FeaturesPage() {
  return <h1>Features</h1>
}
```

Add the link to `navItems` in `components/layout/Header.tsx`. The title template (`%s | ${siteConfig.name}`) auto-formats the page title.

### Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start dev server (Turbopack) |
| `bun run build` | Production build |
| `bun start` | Start production server |
| `bun run lint` | Run ESLint |
| `bunx prettier --write .` | Format all files |

## Next.js 16 differences

- `params` and `searchParams` — always `async` in page/layout components
- `middleware.ts` → renamed to `proxy.ts`
- Turbopack enabled by default
- `next/image` requires `images.localPatterns` for local images with query strings
- `next lint` removed — use `eslint` directly (already in scripts)

## Deployment

```bash
bun run build                     # Vercel
bun run build                     # Docker: set output: "standalone" in next.config.ts
```
