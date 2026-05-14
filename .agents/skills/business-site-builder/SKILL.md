---
name: business-site-builder
description: Generate business website pages from a Next.js boilerplate. Use when the user says "generate a [page-type] page", "add a [page-type] page", "create a [page-type] page", or asks to scaffold pages for their business site.
metadata:
  version: 1.0.0
---

# Business Site Builder

You scaffold individual pages for a business website built on this Next.js boilerplate. Each page is generated one at a time via conversation.

## Pre-flight

1. Read `lib/business.ts` — this has the business's name, services, contact info, and other context
2. Read `lib/config.ts` — this has the site name, URL, locale, and OG image path
3. Read `components/layout/Header.tsx` — to see existing nav items so you know which pages already exist
4. Check `app/` to see what page directories already exist

## Page Generation Workflow

For every page:

1. Tell the user what you're about to create and ask if they have any specific content or layout preferences
2. If the page type is not covered by a playbook below, ask the user what content they want on the page
3. Create `app/<type>/page.tsx` with:
   - Full `Metadata` export (title, description, openGraph, twitter, alternates.canonical)
   - A server component with proper Tailwind v4 semantic tokens
   - Content derived from `lib/business.ts` data and user input
4. Create `app/<type>/loading.tsx` with a simple Suspense fallback
5. Add the page to the `navItems` array in `components/layout/Header.tsx`
6. Run `bun run lint` and fix any issues

### Cross-cutting rules

- Import `siteConfig` from `@/lib/config` for SEO metadata
- Import `businessConfig` from `@/lib/business` for business content
- Use the title template: `"%s | {siteConfig.name}"` — set only the page-specific title
- Always include `openGraph` and `twitter` metadata matching the pattern in existing pages
- Always include `alternates: { canonical: "/<type>" }`
- Use semantic Tailwind tokens (`bg-background`, `text-muted-foreground`, `bg-primary`, etc.)
- Use shadcn components from `@/components/ui/` when appropriate (Card, Button, Input, Textarea, Badge, Separator)
- Use lucide-react icons
- Use `gap-*` instead of `space-x-*` / `space-y-*`
- Use `cn()` from `@/lib/utils` for conditional class merging
- Do NOT delete or modify existing demo pages (about, contact, index) — they serve as examples
- Do NOT modify `app/layout.tsx`, `lib/config.ts`, `lib/business.ts`, or `app/globals.css`

## Page-Type Playbooks

### index

- The homepage already exists at `app/page.tsx`. Do not regenerate it unless the user explicitly asks to replace it.
- If the user wants to replace it, typically includes: hero section with tagline + CTA, featured services grid (from `businessConfig.services`), trust signals or testimonials
- Metadata: `title` should be omitted (uses the default site name from layout)

### about

- Typically includes: company story, mission/values, optionally team members
- Pull `businessConfig.description` as the starting point for content
- Ask the user if they have specific about content or want you to draft it from their description

### services

- Typically includes: each service from `businessConfig.services` rendered in a Card grid, optionally with icons
- If `businessConfig.services` is empty, ask the user to list their services
- Optionally: a CTA section at the bottom ("contact us for a quote")

### contact

- Typically includes: contact form (shadcn Input + Textarea + Button), phone, email, address from config
- Phone should link via `tel:` and email via `mailto:`
- Optionally: a map embed section (ask the user if they want one)

### mission

- No hardcoded content possible — ask the user: "What is the business's mission, vision, and core values?"
- Render what they provide in a clean layout (heading per section, paragraph per value)

### faq

- No hardcoded content — ask the user: "What questions and answers should the FAQ include?"
- Render each pair using a `<details>` / `<summary>` pattern or a simple section layout
- Use `Separator` between items if desired

### gallery / portfolio

- No hardcoded content — ask the user: "What images or projects should the gallery display?"
- Ask about layout preference: grid, masonry, carousel
- Note: actual images need to be sourced separately — use placeholder descriptions or `next/image` with external URLs if provided

### pricing

- No hardcoded content — ask the user: "What pricing tiers or packages do you offer?"
- Typically rendered as a row of Cards or a table

### team

- No hardcoded content — ask the user: "Who is on the team? For each person, I need a name, role, and optionally a bio/photo."
- Render as a grid of Avatar + name + role cards

### testimonials

- No hardcoded content — ask the user: "What testimonials or reviews do you want to feature?"
- Render as a grid of Card components with quote styling

### Any other page type

- Ask the user: "What content do you want on this page? Describe the sections you'd like."
- Help them refine: propose a layout structure based on what they describe

## navItems Management

After generating a new page, update `navItems` in `Header.tsx`:

```ts
// Find the array and append the new entry
const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  // ... existing items stay
  { href: "/services", label: "Services" },  // ← new
]
```

Check the user's `lib/config.ts` locale. If it's `es_ES` (the default), use Spanish labels for nav items. Otherwise use English.

## Content Quality

- Keep content concise and business-appropriate
- Do not use lorem ipsum — either use data from config or draft meaningful copy
- Match the tone to the business type (e.g., "friendly" for a local plumber, "professional" for a law firm)
- When drafting copy, ask the user to review and adjust
