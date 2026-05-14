<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data.

**Key Next.js 16 differences:**
- `params` and `searchParams` in pages/layouts are **always `async`** — must be `await`ed
- `middleware.ts` is **deprecated** — use `proxy.ts` instead
- Turbopack is the **default** bundler for dev and build
- `next/image` requires `images.localPatterns` for local images with query strings
- **No `next lint`** — use ESLint directly
- React 19.2 — hooks, `use()`, etc.

Read `node_modules/next/dist/docs/` before writing code that touches a new API surface.

---

# Project Conventions

## Stack

| Layer | Tool |
|-------|------|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 (CSS-based config, no `tailwind.config.*`) |
| UI Library | shadcn/ui **nova** preset |
| Primitives | **@base-ui/react** (NOT Radix) |
| Icons | lucide-react |
| Dark mode | next-themes (class-based, `attribute="class"`) |
| Linting | ESLint 9 flat config + @stylistic (Airbnb-style) |
| Formatting | Prettier + prettier-plugin-tailwindcss |
| Package manager | Bun |

## Critical Rules

### Dark mode uses `next-themes` with class strategy
- ThemeProvider in `app/layout.tsx` wraps the entire body
- User choice persists to `localStorage`, initial fallback to `prefers-color-scheme`
- `@custom-variant dark (&:is(.dark *))` in `globals.css` enables `dark:` Tailwind utilities
- To toggle display client-side, use `useTheme()` from `next-themes`
- **Never write `prefers-color-scheme` media queries** — use the `.dark` class

### shadcn/ui uses base-ui (NOT Radix)
- `components.json` shows `"style": "base-nova"`
- All UI components use `@base-ui/react` primitives
- **`render` prop replaces Radix's `asChild`** — `<Button render={<Link />} />`
- Do NOT import from `@radix-ui/*` — those packages are not installed
- shadcn components are in `components/ui/` — they are auto-generated, avoid manual edits
- `@stylistic/max-len` is off for `components/ui/` — those files have long classname lines

### Site configuration is centralized
- **`lib/config.ts`** is the single source of truth for: site name, URL, locale, description, OG image path, social links
- Import from `@/lib/config` for any SEO-related values
- Do NOT hardcode site name or URL in page metadata — always use `siteConfig`

### SEO metadata
- Root layout (`app/layout.tsx`) has complete `metadata` + `viewport` exports
- Every page should export its own `metadata` object (title, description, OG, canonical)
- Use the title template (`"%s | {siteConfig.name}"`) — set only the page-specific title
- Pages should include `openGraph` and `twitter` metadata objects
- `app/not-found.tsx` should have `robots: { index: false }`
- `lib/json-ld.tsx` has helpers for structured data (Organization, WebSite, BreadcrumbList)

### Brand colors are in `app/globals.css`
- Single **Brand Palette** block at the top — edit only this section
- Each variable has `-l` (light mode) and `-d` (dark mode) variants, e.g. `--primary-l` / `--primary-d`
- Variables without a suffix (e.g. `--radius`, `--chart-*`) are shared by both modes
- Semantic mapping blocks below the palette are pass-throughs — never edit them
- Colors use the `oklch()` color space — use [oklch.com](https://oklch.com) to pick values

### Styling patterns
- Use Tailwind v4 `@theme inline` for CSS variables (defined in `globals.css`)
- Use semantic color tokens: `bg-background`, `text-muted-foreground`, `bg-primary`, etc.
- Never manually write color hex values (exceptions for OG images)
- Before adding a new color to a component, check if an existing semantic token fits
- Use `size-*` when width and height are equal
- Use `gap-*` instead of `space-x-*` / `space-y-*`
- Use `cn()` from `@/lib/utils` for conditional class merging

### Routing
- All routes use the `app/` directory (App Router)
- `params` and `searchParams` are `Promise<>` — always `await` them
- Pages can be server components by default; use `"use client"` only when needed
- `loading.tsx` provides Suspense fallback at each route level

## Import Aliases

```
@/*           →  ./src/*  (or ./)
@/components  →  ./components
@/lib         →  ./lib
@/app         →  ./app
```

## Available Agent Skills

The `.agents/skills/` directory contains skills for:
- **shadcn** — adding, updating, debugging shadcn/ui components
- **next-best-practices** — file conventions, RSC boundaries, metadata, etc.
- **seo-audit** — SEO auditing and recommendations
- **frontend-design** — high-quality frontend builds
- **accessibility** — WCAG 2.2 compliance audits
- **programmatic-seo** — scalable SEO page generation
- **business-site-builder** — generating business website pages one at a time

## ESLint Config

Flat config in `eslint.config.mjs`. Layers:
1. `eslint-config-next/core-web-vitals` + `eslint-config-next/typescript`
2. `@stylistic/eslint-plugin` recommended (Airbnb-style formatting)
3. `typescript-eslint` — TS-specific rules
4. Custom overrides (Next.js JSX, shadcn patterns)

## Fonts

- Geist Sans → CSS variable `--font-sans`
- Geist Mono → CSS variable `--font-geist-mono`
- Both loaded via `next/font/google` in `app/layout.tsx`
- `--font-heading` in `globals.css` defaults to `var(--font-sans)` — change it for a separate heading font
- Tailwind v4 `@theme inline` maps `--font-sans`, `--font-mono`, and `--font-heading` to `font-sans`, `font-mono`, `font-heading` utilities
- To change fonts: swap the import in `layout.tsx`, update the variable names if needed
- `lib/config.ts` has `fonts.sans` and `fonts.mono` for reference in OG images, etc.

---

# Business Site Builder

This template can scaffold business website pages via the `business-site-builder` skill.

## Setup per client

1. Edit `lib/business.ts` — set the business name, description, services, contact info. Set `industry` (e.g. "bakery", "real estate") and `vibe` (e.g. "speedy, elegant, family owned") to control the generated site's look and feel.
2. Edit `lib/config.ts` — set URL, locale, OG image path
3. Edit `app/globals.css` — set brand colors (primary-l, primary-d, etc.)

The demo pages (Home, About, Contact) stay in the template as examples.

## Workflow

When the user asks to generate a page (e.g., "generate a services page"), the agent:

1. Reads `lib/business.ts` and `lib/config.ts` for context
2. Loads the `business-site-builder` skill
3. Follows the relevant playbook for that page type
4. Creates `app/<type>/page.tsx` + `app/<type>/loading.tsx`
5. Updates `navItems` in `components/layout/Header.tsx`
6. Asks the user for input when the playbook has no default content (FAQ, mission, pricing, etc.)
<!-- END:nextjs-agent-rules -->
