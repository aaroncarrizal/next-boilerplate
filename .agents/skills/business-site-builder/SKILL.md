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

## Design Positioning

Read `businessConfig.industry` and `businessConfig.vibe` before generating any page. Use the tables below to determine the design direction.

Apply the industry's baseline first, then overlay the vibe keyword modifiers. The result determines every page's layout structure, spacing, color emphasis, border radius, typography scale, and decorative choices.

### Industry baselines

| Industry | Layout | Spacing | Visual style | Tone |
|----------|--------|---------|-------------|------|
| bakery / cafe / restaurant | Soft grids, generous whitespace, warm hero | `gap-8` to `gap-12` sections | Rounded (`rounded-xl`), warm accent | Friendly, cozy |
| real estate | Full-width hero, spacious card grids, gallery sections | `gap-16` sections, `py-24` heroes | Clean lines, subtle shadows (`shadow-sm`) | Premium, aspirational |
| carpenter / handyman / contractor | Solid block sections, bordered cards, before/after layout | `gap-8` sections | Slightly rounded (`rounded-lg`), earthy accent | Rugged, trustworthy |
| hair salon / beauty / spa | Asymmetric grids, accent feature sections, full-width CTAs | Varied section spacing | Modern (`rounded-sm` to `rounded-lg`), bold accent | Trendy, energetic |
| law / finance / accounting | Conservative grids, restrained hero, clean typography | Standard spacing (`gap-8`), contained width | Minimal (`rounded-sm`), neutral palette | Authoritative, formal |
| tech / saas / startup | Bento-style grids, gradient hero sections, feature tiles | Varied, dynamic spacing | Clean (`rounded-lg`), accent-driven palette | Innovative, fast |
| healthcare / wellness | Simple accessible layout, generous spacing, clear CTAs | `gap-10` sections, large touch targets | Soft (`rounded-xl`), calm palette | Caring, clean |
| fitness / gym | Bold hero, high-impact sections, dynamic grids | Tight vertical rhythm, spacious heroes | Angular (`rounded-md`), high-contrast accent | Energetic, motivating |
| ecommerce / retail | Product grids, featured categories, prominent CTAs | Dense but navigable | Mixed radii, brand-driven accent | Persuasive, clear |
| creative / agency / portfolio | Asymmetric hero, showcase grids, full-bleed sections | Expressive, varied spacing | Experimental radii, accent-led | Bold, distinctive |
| default / unknown | Balanced grid, standard hero, neutral spacing | `gap-8` sections, `py-16` hero | `rounded-lg`, balanced neutral | Professional |

### Vibe keyword modifiers

When `businessConfig.vibe` contains any of these keywords, overlay these adjustments on top of the industry baseline:

| Keyword | Layout adjustment | Visual adjustment | Typography |
|---------|------------------|-------------------|------------|
| `speedy` / `fast` / `dynamic` | Bold asymmetric sections, prominent CTAs, reduced whitespace | High contrast accent, solid color CTAs | Larger headings (text-5xl), bold weights |
| `bento` / `bento cell` | Grid with varied cell sizes (e.g. 2/3 + 1/3), clean cell borders | Thin borders between cells, subtle background tint per cell | Normal scale, clean |
| `elegant` / `luxury` | Max whitespace, refined spacing, contained content width | Muted accent, minimal decoration | Smaller body text (text-sm), refined weights, serif heading if available |
| `family owned` / `family` | Warm section backgrounds, approachable layout | Warm accent tint, softer shadows | Friendly, slightly larger body text for readability |
| `kids friendly` | Larger touch targets (`size-12`+), rounded everywhere (`rounded-2xl`) | Playful accent, colorful accents | Large, clear body text |
| `modern` | Asymmetric sections, full-bleed hero, overlapping elements | Gradient accents, minimal borders | Clean sans-serif, medium weights |
| `minimal` / `clean` | Max whitespace, flat components, restrained sections | No shadows, thin borders, restrained accent | Light weights, smaller headings |
| `bold` / `vibrant` | High-impact hero, solid accent backgrounds | High-saturation accent, solid color blocks | Heavy heading weights |
| `rustic` / `handcrafted` | Warm section backgrounds, border decorations | Earthy accent, rounded corners | Slightly heavier, warm |
| `corporate` | Contained max-width, standard grid, structured sections | Neutral palette, subtle accent | Conservative, medium weights |

### Design levers

These are the concrete Tailwind decisions the agent makes based on the design positioning:

- **Hero layout**: `py-16` vs `py-24` vs `min-h-[60vh]`, full-width vs contained
- **Grid columns**: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-3` vs bento asymmetric cells
- **Border radius**: `rounded-sm` / `rounded-lg` / `rounded-xl` / `rounded-2xl`
- **Shadows**: `shadow-sm` / `shadow-md` / `shadow-lg` vs none (flat)
- **Accent usage**: which semantic color to lean on (`bg-accent`, `text-accent`, border-accent, etc.)
- **Section spacing**: `gap-6` / `gap-8` / `gap-12` / `gap-16`
- **Heading sizes**: `text-3xl` / `text-4xl` / `text-5xl`
- **Content width**: `max-w-3xl` vs `max-w-5xl` vs `max-w-6xl`
- **Background variation**: alternating `bg-background` / `bg-muted` sections vs all `bg-background`
- **CTA prominence**: `size-lg` buttons vs `size-default`, solid vs outline

Always use semantic tokens — never hardcode colors or raw values. Combine industry baseline with vibe modifiers into coherent decisions.

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
