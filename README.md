# next-boilerplate

A production-ready [Next.js](https://nextjs.org) 16 boilerplate with dark mode, shadcn/ui, SEO, and best practices baked in.

Built for Spanish-language projects — but works for any locale.

## Tech Stack

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 |
| UI Library | shadcn/ui (nova preset, base-ui/react primitives) |
| Icons | lucide-react |
| Dark mode | next-themes (class-based) |
| Formatting | Prettier + Tailwind plugin |
| Linting | ESLint 9 (flat config) + @stylistic (Airbnb-style) |

## Features

- **Dark mode** — theme toggle button, respects system preference, stores choice
- **shadcn/ui** — Button, Card, DropdownMenu, Input, Textarea, Label, Separator, Avatar, Badge
- **Routing** — Home (`/`), About (`/about`), Contact (`/contact`), 404 page
- **SEO** — Open Graph, Twitter Cards, sitemap.xml, robots.txt, JSON-LD structured data, OG image generation
- **Spanish-first** — `lang="es"`, OG locale `es_ES`
- **API** — Health endpoint (`/api/health`)
- **Loading states** — Suspense boundaries with loading spinners
- **Prettier** — Consistent formatting with Tailwind class sorting
- **ESLint** — Airbnb-inspired stylistic rules + Next.js/TypeScript best practices

## Business Site Builder

This boilerplate includes a `business-site-builder` agent skill for scaffolding business website pages one at a time. Each page is generated via conversation with the agent.

### Setup per client

1. **`lib/business.ts`** — set the business name, services offered, contact info
2. **`lib/config.ts`** — set URL, locale, OG image path
3. **`app/globals.css`** — set brand colors (edit the Brand Palette block only)

The demo pages (Home, About, Contact) stay as examples — no need to delete them.

### Workflow

```
"generate a services page"
```

The agent reads `lib/business.ts` for context, loads the skill, follows the relevant playbook, and creates:

```
app/services/page.tsx       # Server component with metadata + content
app/services/loading.tsx    # Suspense fallback
```

Then it updates `navItems` in `components/layout/Header.tsx` to include the new page.

For content-heavy pages (FAQ, mission, pricing, testimonials, team, gallery), the agent asks you what content to include before generating.

### Available playbooks

| Page type | Content source |
|-----------|---------------|
| index | Default page from template (replace on request) |
| about | `businessConfig.description` + user input |
| services | `businessConfig.services` array |
| contact | `businessConfig` contact fields |
| mission, faq, pricing, team, testimonials, gallery | User provides content via chat |
| *(any other)* | User describes desired content |

## Getting Started

```bash
# Install dependencies
bun install

# Start dev server
bun dev

# Build for production
bun run build

# Start production server
bun start

# Lint
bun run lint

# Format code
bunx prettier --write .
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
├── layout.tsx            # Root layout (metadata, ThemeProvider, Header, Footer, JSON-LD)
├── page.tsx              # Home page
├── loading.tsx           # Root loading spinner
├── not-found.tsx         # 404 page
├── globals.css           # Tailwind v4 + shadcn CSS variables
├── sitemap.ts            # Dynamic sitemap
├── robots.ts             # robots.txt
├── opengraph-image.tsx   # Dynamic OG image (next/og)
├── manifest.ts           # Web app manifest
├── about/
│   ├── page.tsx          # About page
│   └── loading.tsx
├── contact/
│   ├── page.tsx          # Contact page
│   └── loading.tsx
└── api/
    └── health/
        └── route.ts      # Health check endpoint
components/
├── ui/                   # shadcn components (auto-generated)
│   ├── button.tsx
│   ├── card.tsx
│   ├── dropdown-menu.tsx
│   ├── input.tsx
│   ├── textarea.tsx
│   ├── label.tsx
│   ├── separator.tsx
│   ├── avatar.tsx
│   └── badge.tsx
└── layout/
    ├── Header.tsx        # Navigation + theme toggle + BreadcrumbList JSON-LD
    ├── Footer.tsx        # Footer
    └── ThemeToggle.tsx   # Dark mode toggle button
lib/
├── config.ts             # Site-wide configuration (name, URL, locale, social links)
├── json-ld.tsx           # Structured data helpers (Organization, WebSite, Breadcrumb)
└── utils.ts              # cn() utility class merger
```

## Configuration

### Site-wide settings

Edit `lib/config.ts` to set your project's name, URL, locale, and social links:

```ts
export const siteConfig = {
  name: "My Project",
  description: "A description for SEO and OG tags.",
  url: "https://mydomain.com",
  locale: "es_ES",           // Change to your locale
  ogImage: "/opengraph-image",
  socials: {
    twitter: "https://twitter.com/myhandle",
    github: "https://github.com/me/my-project",
  },
}
```

This single file drives the root layout metadata, sitemap URLs, robots.txt, JSON-LD, and OG image. Change it once and everything updates.

### Adding a new page

1. Create a folder under `app/`:

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

2. The title template (`%s | ${siteConfig.name}`) auto-formats the page title.
3. Add a link in `Header.tsx` in the `navItems` array.

### Adding shadcn components

```bash
bunx --bun shadcn@latest add dialog select
```

Components are placed in `components/ui/`. This boilerplate uses **base-ui/react** primitives (not Radix). The `render` prop is the base-ui equivalent of Radix's `asChild`.

### Adding a dynamic route

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from "next"

type Props = { params: Promise<{ slug: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params     // params is async in Next.js 16
  return { title: slug }
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params
  return <h1>{slug}</h1>
}
```

## Brand Colors

All colors are defined in a **single Brand Palette block** at the top of `app/globals.css`. Each variable has two variants — `-l` for light mode and `-d` for dark mode. Variables without a suffix are shared by both modes.

**To re-theme the entire site**, edit just this one block:

```css
:root {
  /* ── Primary (buttons, links, active states) ── */
  --primary-l: oklch(0.205 0 0);         /* ← light mode color */
  --primary-fg-l: oklch(0.985 0 0);      /* ← light mode text on primary */
  --primary-d: oklch(0.922 0 0);         /* ← dark mode color */
  --primary-fg-d: oklch(0.205 0 0);      /* ← dark mode text on primary */

  /* ── Secondary (subtle buttons, tags) ── */
  --secondary-l: oklch(0.97 0 0);
  --secondary-fg-l: oklch(0.205 0 0);
  --secondary-d: oklch(0.269 0 0);
  --secondary-fg-d: oklch(0.985 0 0);
  /* ... */
}
```

The semantic mapping blocks below (`:root` light mode and `.dark` dark mode) are **mechanical pass-throughs** — they reference the brand palette variables. You never edit them.

The colors use the **`oklch()` color space** — perceptually uniform at any hue. Use [oklch.com](https://oklch.com) to pick values.

Every color is referenced through **semantic Tailwind utilities**:

| CSS variable | Tailwind utility | Usage |
|---|---|---|
| `--primary` | `bg-primary` / `text-primary` | Main brand color |
| `--primary-foreground` | `text-primary-foreground` | Text on primary bg |
| `--secondary` | `bg-secondary` | Subtle brand |
| `--muted` | `bg-muted` | Subdued backgrounds |
| `--muted-foreground` | `text-muted-foreground` | Secondary text |
| `--accent` | `bg-accent` | Highlight / hover |
| `--destructive` | `bg-destructive` | Errors / delete actions |
| `--border` | `border-border` | Dividers / outlines |
| `--background` | `bg-background` | Page background |
| `--foreground` | `text-foreground` | Default text |

Before adding a custom color to a component, check if an existing semantic token fits.

### Color snippets for common brands

Swap these into `--primary-l` / `--primary-d` / `--primary-fg-l` / `--primary-fg-d`:

| Brand | Light primary | Dark primary |
|-------|---------------|--------------|
| **Indigo (current)** | `oklch(0.45 0.22 265)` | `oklch(0.65 0.18 265)` |
| Neutral | `oklch(0.205 0 0)` | `oklch(0.922 0 0)` |
| Blue (SaaS) | `oklch(0.546 0.245 262)` | `oklch(0.8 0.1 262)` |
| Green (finance) | `oklch(0.5 0.2 145)` | `oklch(0.8 0.1 145)` |
| Purple (creative) | `oklch(0.48 0.22 295)` | `oklch(0.8 0.1 295)` |
| Red (media) | `oklch(0.58 0.22 25)` | `oklch(0.8 0.1 25)` |
| Teal (health) | `oklch(0.52 0.18 185)` | `oklch(0.8 0.1 185)` |

The foreground for each brand should be a high-contrast text color:
- Light foreground: `oklch(0.985 0 0)` (white)
- Dark foreground: `oklch(0.15 0 0)` (near-black)

## Fonts

Default: **Geist Sans** for body text, **Geist Sans** for headings.

**To change fonts:**

1. **Swap the import** in `app/layout.tsx` at the top:

```tsx
// Replace:
import { Geist, Geist_Mono } from "next/font/google"
// With e.g.:
import { Inter, JetBrains_Mono } from "next/font/google"

const inter = Inter({
  variable: "--font-sans",    // ← keeps --font-sans variable name
  subsets: ["latin"],
})

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})
```

2. **Update the JSX** in the same file:

```tsx
<html
  className={`${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
>
```

3. **For a separate heading font**, add another `next/font/google` import and set its variable. Then update `--font-heading` in `globals.css`:

```css
:root {
  --font-heading: var(--font-display);  /* or whatever variable name */
}
```

The Tailwind utilities `font-sans`, `font-mono`, and `font-heading` map to the CSS variables set by these fonts.

## Dark Mode

Uses `next-themes` with class-based strategy.

- Toggle button in the header (sun/moon icon)
- Respects `prefers-color-scheme` on first visit
- Choice is persisted to `localStorage`
- Uses `disableTransitionOnChange` to prevent flash

CSS variables in `globals.css`:
- `:root` — light theme colors
- `.dark` — dark theme colors (applied via `.dark` class on `<html>`)
- Tailwind's `@custom-variant dark` enables class-based `dark:` utilities

## SEO

Everything driven by `lib/config.ts`:

| Feature | Implementation |
|---------|---------------|
| Title template | `"%s | {name}"` in root layout |
| Meta description | Per-page + layout default from config |
| Open Graph | `og:title`, `og:description`, `og:image`, `og:locale: es_ES` |
| Twitter Cards | `summary_large_image` card |
| Canonical URLs | Self-referencing per page |
| Sitemap | Auto-generated `sitemap.xml` with priorities |
| Robots.txt | `robots.ts` — allow all, points to sitemap |
| OG Image | Dynamic 1200×630 via `next/og` (branded gradient) |
| Structured data | Organization, WebSite (layout), BreadcrumbList (Header) |
| Manifest | Web app manifest |
| Viewport | `device-width`, `initial-scale=1`, theme color |
| Security headers | `Referrer-Policy: strict-origin-when-cross-origin`, no `X-Powered-By` |

To disable index on a page (e.g., admin, draft):

```tsx
export const metadata: Metadata = {
  robots: { index: false },
}
```

## Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start dev server (Turbopack) |
| `bun run build` | Production build |
| `bun start` | Start production server |
| `bun run lint` | Run ESLint |
| `bunx prettier --write .` | Format all files |

## Known Next.js 16 Differences

- **`params` and `searchParams`** — always `async` in page/layout components
- **`middleware.ts`** → renamed to **`proxy.ts`**
- **Turbopack** — enabled by default for dev and build
- **`next/image`** — stricter local image rules (needs `images.localPatterns`)
- **`next lint`** removed — use `eslint` directly (already in scripts)

## Deployment

Deploy to Vercel:

```bash
bun run build
```

Or use `output: "standalone"` in `next.config.ts` for Docker:

```ts
const nextConfig: NextConfig = {
  output: "standalone",
}
```
