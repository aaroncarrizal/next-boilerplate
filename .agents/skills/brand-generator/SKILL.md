---
name: brand-generator
description: Generate a complete brand identity for a business website — color palette, font pairing, optional SVG logo, optional decorative elements, and brand guidelines. Use when the user says "generate brand identity", "create branding", "set up brand", "design my brand", or "make a logo".
metadata:
  version: 2.0.0
---

# Brand Generator

You create a complete brand identity for a business. This is a seven-phase workflow, but the later phases are flexible — logo generation and decorative elements are created only if they suit the brand and the user wants them.

The fundamental principle: **every brand is different, so every output is different.** An elegant law firm gets a restrained palette, refined serif fonts, and zero decorative frills. A kids' bakery gets a warm vibrant palette, playful rounded fonts, and whimsical SVG blobs. A tech startup gets a bold modern palette, clean sans fonts, and geometric pattern accents. Nothing is one-size-fits-all.

## Pre-flight

1. Read `lib/business.ts` — business name, tagline, description, industry, vibe, services
2. Read `lib/config.ts` — site name, URL, locale, existing socials
3. Read `lib/brand.ts` — existing tokens (will be overwritten)
4. Read `app/globals.css` — note the Brand Palette block structure at the top
5. Read `app/layout.tsx` — note the font setup and `<html>` className
6. Read the `frontend-design` skill for high-level design quality guidance
7. Read the Design Positioning section in the `business-site-builder` skill

---

## Phase 1 — Color Palette

Generate a full oklch colour palette. This is the most consequential decision — it affects every page, every button, every hover state.

### 1.1 Determine palette direction

Cross-reference the industry baseline with vibe keywords:

**Industry baselines — these set the direction:**

| Industry | Hue family | Character | Notes |
|----------|-----------|-----------|-------|
| Bakery / cafe / restaurant | Warm amber, rose, terracotta | Appetite-whetting, cozy | High chroma primary, warm neutrals |
| Real estate | Slate, navy, warm stone grey | Premium, trust-building | Low chroma, restrained |
| Carpenter / handyman | Olive, ochre, warm brown | Earthy, rugged, honest | Muted saturation, warm neutrals |
| Salon / beauty / spa | Magenta, teal, rose gold | Bold, trendy, pampering | High chroma accent, sophisticated |
| Law / finance / accounting | Navy, charcoal, clean white | Authoritative, restrained | Very low chroma, neutral-dominant |
| Tech / SaaS / startup | Indigo, cyan, slate grey | Modern, crisp, innovative | Cool-dominant, clean greys |
| Healthcare / wellness | Soft teal, sage, warm cream | Calm, clean, caring | Low-medium chroma, gentle |
| Fitness / gym | Crimson, charcoal, electric | Energetic, intense | High contrast, dark-mode friendly |
| Ecommerce / retail | Saturated, high contrast | Persuasive, vibrant | Strong primary/background contrast |
| Creative / agency | Any bold direction | Expressive, distinctive | No rules — pick something intentional |
| Default / unknown | Balanced neutral + accent | Professional, approachable | Slate/stone + restrained accent |

**Vibe modifiers — these shift the baseline:**

| Keyword(s) | Effect on palette |
|------------|------------------|
| `elegant` / `luxury` / `refined` | Lower chroma everywhere. Muted accent. Warm neutrals. |
| `modern` / `contemporary` | Cooler hues. Secondary accent added. Clean grey neutrals. |
| `family owned` / `traditional` | Warmer neutrals. Softer accent. Inviting backgrounds. |
| `kids friendly` / `playful` / `fun` | Raise accent chroma. Add secondary playful accent. Light backgrounds. |
| `speedy` / `fast` / `dynamic` | High contrast. Bold accent chroma. Urgent feel. |
| `minimal` / `clean` / `pure` | Near-monochromatic. Tiny low-chroma accent. Lots of white. |
| `bold` / `vibrant` / `loud` | High saturation accent. Deep rich support colour. |
| `rustic` / `handcrafted` | Warm earth tones. Muted. Olive, ochre, rust, cream. |
| `corporate` / `professional` | Near-neutral. Blue or grey accent. Safe, restrained. |
| `whimsical` / `quirky` | Unexpected hue combos. Warm + cool pairing. |

**Combine deliberately.** Bakery + elegant = muted warm amber (dried apricot, not bright orange). Tech + bold = striking deep indigo that commands attention.

### 1.2 Generate oklch values

Generate 12 values — 6 roles × light/dark:

| Variable | Light | Dark |
|----------|-------|------|
| `--primary-l` / `-d` | Chosen hue, medium chroma | Same hue, inverted lightness |
| `--primary-fg-l` / `-d` | High contrast on primary bg | High contrast on primary bg |
| `--secondary-l` / `-d` | Softer primary or complement | Inverted |
| `--secondary-fg-l` / `-d` | Contrast on secondary | Contrast on secondary |
| `--accent-l` / `-d` | Distinct complement hue | Adjusted for dark bg |
| `--accent-fg-l` / `-d` | Contrast on accent | Contrast on accent |
| `--muted-l` / `-d` | Subtle grey with warm/cool tilt | Subtle dark surface |
| `--muted-fg-l` / `-d` | Low-contrast text | Low-contrast text on dark |
| `--background-l` / `-d` | Near-white (0.97-0.995) | Near-black (0.03-0.12) |
| `--foreground-l` / `-d` | Near-black (0.1-0.2) | Near-white (0.85-0.95) |
| `--border-l` / `-d` | Subtle divider | Subtle dark divider |
| `--ring-l` / `-d` | Focus ring (usually primary) | Focus ring |

**Technical rules:**
- **Lightness**: 0 (black) to 1 (white). Light bg: 0.97-0.995. Dark bg: 0.03-0.12. Text: 0.1-0.2 light, 0.85-0.95 dark.
- **Chroma**: 0 (grey) to 0.3+ (vibrant). Primary: 0.1-0.25. Neutrals: 0-0.04.
- **Hue**: 0-360. Red ~25-35, orange ~50-70, amber ~80-95, green ~130-160, teal ~170-200, cyan ~210-230, blue ~240-270, indigo ~270-290, purple ~290-320, magenta ~320-350. Warm greys ~60-80, cool greys ~220-250.
- **WCAG**: Every fg/bg pair >= 4.5:1 (AA normal text).

### 1.3 Write to globals.css

Replace the oklch values in the Brand Palette block. Change only the oklch(...) values, never the variable names or structure. Do NOT touch the semantic mapping blocks below (:root and .dark at bottom of file).

```css
:root {
  --primary-l: oklch(0.45 0.22 265);
  --primary-fg-l: oklch(0.985 0 0);
  --primary-d: oklch(0.65 0.18 265);
  --primary-fg-d: oklch(0.15 0 0);
  /* ... all 12 tokens ... */
}
```

---

## Phase 2 — Font Pairing

Select a display font and body font that match the brand's character.

### 2.1 Choose the pair

| Brand character | Display font examples | Body font examples |
|----------------|----------------------|-------------------|
| Elegant / luxury / editorial | Playfair Display, Cormorant Garamond, Libre Baskerville, EB Garamond | Lora, Karla, Source Serif 4, DM Sans |
| Modern / tech / startup | Unbounded, Satoshi, Plus Jakarta Sans, Cabinet Grotesk | Outfit, DM Sans, Inter, Manrope |
| Friendly / family / warm | Fredoka, Quicksand, Nunito, Fira Sans | Nunito, Inter, Atkinson Hyperlegible |
| Bold / strong / impactful | Bebas Neue, Anton, Archivo Black, Staatliches | Archivo, Roboto, Rubik |
| Rustic / handcrafted / artisanal | Fraunces, Besley, Literata, Young Serif | Source Serif 4, Atkinson Hyperlegible, Sora |
| Creative / artistic / distinctive | Syne, Space Grotesk, Manrope, Sora | Manrope, Inter, DM Sans |
| Playful / kids / fun | Fredoka, Bubblegum Sans, Baloo 2, Mochiy Pop One | Quicksand, Nunito, Mulish |
| Corporate / professional / finance | Inter, DM Sans, Plus Jakarta Sans, IBM Plex Sans | Inter, IBM Plex Sans, Outfit |
| Healthcare / calm / trustworthy | Manrope, Sora, Nunito, Quicksand | Nunito, Inter, DM Sans |
| Fitness / energetic / motivating | Bebas Neue, Anton, Oswald, Archivo Black | Archivo, Rubik, Barlow |

**Don't pick the first pair that fits.** Browse Google Fonts mentally and try to find something unexpected but appropriate. A bakery doesn't need Playfair Display again — maybe Fraunces for headings with its charming ink traps. A real estate company doesn't need another Inter site — maybe Sora for a clean contemporary feel.

### 2.2 Font setup

1. Generate `next/font/google` import code for both fonts
2. Replace existing imports in `app/layout.tsx` — remove Geist import, add new fonts
3. Update `<html>` className: `${fontDisplay.variable} ${fontBody.variable} h-full antialiased`
4. If the font uses a different CSS variable than `--font-sans` or `--font-heading`, update `globals.css` `@theme` mapping accordingly
5. Update `lib/config.ts` `fonts` section with the actual font names
6. Verify locale support: if `es_ES` and the font lacks Latin Extended chars, fall back to Geist

**Layout.tsx replacement pattern:**

```tsx
// Before:
import { Geist, Geist_Mono } from "next/font/google"
const geistSans = Geist({ variable: "--font-sans", subsets: ["latin"] })
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] })

// After:
import { Playfair_Display, Lora } from "next/font/google"
const playfair = Playfair_Display({ variable: "--font-heading", subsets: ["latin"] })
const lora = Lora({ variable: "--font-sans", subsets: ["latin"] })
```

```tsx
// Before:
className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}

// After:
className={`${playfair.variable} ${lora.variable} h-full antialiased`}
```

---

## Phase 2.5 — Image Specifications

Generate detailed image specs for every image slot on the site. Do NOT generate actual images — create rich metadata that describes what images should look like, so the client can source or commission them later.

### 2.5.1 Determine image needs

Every site needs at least a hero image. Additional images depend on the brand:

| Image slot | Required? | When |
|-----------|-----------|------|
| Hero | Always | Main homepage hero background |
| Backgrounds | Optional | For full-bleed sections, CTA backdrops, alternating rows |
| Service images | If services exist | One per service from `businessConfig.services` |
| About image | Optional | Team/space photo |

### 2.5.2 Generate image specs

For every image slot, generate a `BrandImageSpec`:

```ts
{
  src: "/images/hero-cafe.jpg",           // descriptive filename
  alt: "Café interior con luz cálida, mesas de madera y barista preparando café de especialidad",
  width: 1920,                             // intended full resolution
  height: 1080,
  aspectRatio: "16/9",                     // CSS aspect-ratio value
  style: "warm moody editorial photography, shallow depth of field, golden hour lighting",
  prompt: "Interior de una cafetería de especialidad, luz cálida entrando por ventanas grandes, mesas de madera, barista en mostrador preparando pour-over, atmósfera acogedora, fotografía editorial, poca profundidad de campo",
}
```

**Rules for alt text:**
- Be specific and descriptive — this is what screen readers and Google Images index
- Describe the scene, lighting, mood, and key elements
- Match the brand's locale (Spanish for `es_ES`, English otherwise)
- Length: 10-20 words

**Rules for `style`:**
- Combine mood + photography style: e.g. "bright clean lifestyle" · "dark dramatic editorial" · "warm moody documentary" · "minimalist studio lighting"
- Derived from the `vibe` and `industry` — use the same modifier logic as the palette
- This tells the photographer or AI generator what look to achieve

**Rules for `prompt`:**
- Write it as if feeding an AI image generator (Midjourney, DALL-E, Gemini)
- Include: subject, lighting, composition, mood, color palette reference
- Reference the brand's vibe keywords
- ~50 words, detailed but not absurd

**Rules for `src`:**
- Always `/images/<context>-<business-slug>.jpg`
- e.g. `/images/hero-sierra-azul.jpg` · `/images/service-cafe-especialidad.jpg` · `/images/about-interior.jpg`

### 2.5.3 Write to lib/brand.ts

Populate `brandTokens.imageAssets` with all generated specs:

```ts
imageAssets: {
  hero: { /* spec */ },
  backgrounds: [ /* optional specs */ ],
  serviceImages: [
    { /* spec for each service */ },
  ],
}
```

### 2.5.4 Create placeholder directories

```bash
mkdir -p public/images
```

Create an empty `.gitkeep` in `public/images/` to preserve the directory:

```bash
touch public/images/.gitkeep
```

The images themselves are NOT generated. The specs serve as a blueprint — the client provides actual images later, matching the described style.

---

## Phase 3 — Logo (optional, ask first)

**Do not generate a logo unless the user wants one.** This is a conversation, not a batch process.

### 3.1 Ask the user

Present three options clearly:

> "I can generate a logo for your brand. Here are your options:
>
> 1. **Provide your own** — I'll integrate it into the site
> 2. **I generate one** — I'll create an SVG logo with geometric mark + wordmark
> 3. **Skip logo** — The site will use typography-only branding in the header"
>

Wait for their response. Do not proceed without it.

### 3.2 If they provide their own

Ask them for the file or URL. Integrate it into `components/brand/Logo.tsx` as a simple wrapper:

```tsx
import Image from "next/image"
import type { SVGProps } from "react"

interface LogoProps extends SVGProps<SVGSVGElement> {
  size?: number
}

export function LogoFull({ className }: LogoProps) {
  return <img src="/logo.png" alt="Business Name" className={className} />
}
```

Generate an `index.ts` barrel export. Update the `Header.tsx` import if needed.

### 3.3 If they want you to generate one

Create `components/brand/Logo.tsx` with these exports:

| Export | viewBox | Content |
|--------|---------|---------|
| `LogoFull` | `0 0 200 60` | Icon mark + business name wordmark + optional tagline |
| `LogoIcon` | `0 0 60 60` | Square mark only (favicon, mobile) |
| `LogoWordmark` | `0 0 140 40` | Text-only (when mark context is established) |
| `LogoMono` | `0 0 200 60` | Single-colour version |

**Design principles for SVG logos:**

- **Shape language**: Derive from industry. Flowing bezier curves for salon/wellness. Sharp geometric angles for tech/law. Warm rounded organic for bakery/kids. Clean structural blocks for real estate/construction.
- **Depth**: Use `<linearGradient>` in `<defs>` referencing CSS variables (not hardcoded hex) so the logo works in light and dark mode. Layer translucent shapes for depth — an opaque base shape + a semi-transparent highlight shape + a subtle shadow beneath.
- **Gradients**: Always reference `var(--primary)` and `var(--primary)` with opacity. Never hardcode colours. Example:
  ```tsx
  <defs>
    <linearGradient id="logo-grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stopColor="var(--primary)" />
      <stop offset="100%" stopColor="var(--primary)" stopOpacity={0.6} />
    </linearGradient>
  </defs>
  ```
- **Wordmark**: Use SVG `<text>` with `fontFamily="var(--font-heading)"` so it uses the brand display font. Match letter-spacing and weight to the brand character.
- **Responsive**: Use `viewBox` only (no fixed width/height). Accept `size` prop mapped to `width`/`height`.
- **Accessibility**: Add `role="img"` and `aria-label` with the business name.

**Component interface to use:**

```tsx
import type { SVGProps } from "react"

interface LogoProps extends SVGProps<SVGSVGElement> {
  size?: number
}

export function LogoFull({ size = 200, className, ...props }: LogoProps) {
  return (
    <svg
      viewBox="0 0 200 60"
      width={size}
      height={size * 0.3}
      className={className}
      role="img"
      aria-label="Business Name"
      {...props}
    >
      {/* SVG content */}
    </svg>
  )
}
```

Also create `components/brand/index.ts` barrel export:
```ts
export { LogoFull, LogoIcon, LogoWordmark, LogoMono } from "./Logo"
```

### 3.4 If they skip

Do nothing. The site uses typography-only branding — the business name in the header, styled with the display font.

---

## Phase 4 — Decorative Elements (optional, zero to three)

**Do not generate decorative elements unless they genuinely enhance the brand.** Many brands look better without them.

### 4.1 Evaluate whether the brand needs decoration

Use this framework to decide:

**Brands that benefit from decorations:**
- Creative agencies, portfolios, design studios (blobs, patterns, abstract shapes)
- Bakeries, cafes, restaurants (warm waves, organic blobs, ingredient-inspired patterns)
- Kids'/family businesses (playful shapes, dotted patterns, colourful accents)
- Salons, spas, beauty (flowing curves, petal-like shapes, elegant dividers)
- Fitness studios (dynamic diagonals, chevrons, angular patterns)
- Tech startups (geometric grids, hexagonal patterns, connecting nodes)

**Brands that should NOT use decorations:**
- Law firms, accountants, financial services (distracts from trust signals)
- Medical/healthcare (creates visual noise, reduces perceived cleanliness)
- Corporate B2B services (unnecessary, looks unprofessional)
- Any brand with `vibe: "minimal"` or `vibe: "elegant"` (decorations contradict the aesthetic)

If the brand falls into the "avoid" category, skip this phase entirely and move to Phase 5.

### 4.2 Decide what to create (0-3 components)

Based on the brand character, pick from these categories — or invent your own:

| Category | When to use | Example |
|----------|-------------|---------|
| **Background blobs** | Creative, playful, warm brands | Organic bezier shapes, soft gradients |
| **Section dividers** | When sections need visual separation | Gentle waves for friendly brands, sharp angles for bold brands |
| **Background patterns** | Tech, creative, structured brands | Dot grids, hex grids, diamond patterns |
| **Directional arrows** | Action-oriented brands (fitness, startup) | Bold arrows, corner brackets, chevrons |
| **Dots / sparkles** | Playful, kids, lifestyle | Scattered dots, star-like shapes |
| **Orbit / ring shapes** | Tech, science, premium | Concentric rings, orbital paths |

**Create only what fits.** A creative agency might get: Blob.tsx (abstract overlapping shapes) + Pattern.tsx (dot grid in brand accent). A bakery might get: WaveDivider.tsx (soft bread-like curve). A kids' daycare might get: Blob.tsx (rounded friendly shape) + Dots.tsx (colourful scattered dots). A tech startup might get: Pattern.tsx (hexagonal grid). Nothing more than 3.

### 4.3 Component patterns

Each component follows this pattern:

```tsx
import type { SVGProps } from "react"

interface BlobProps extends SVGProps<SVGSVGElement> {
  size?: number
  color?: string
}

export function Blob({ size = 300, color = "var(--primary)", className, ...props }: BlobProps) {
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      fill={color}
      opacity={0.08}
      role="presentation"
      aria-hidden
      {...props}
    >
      <path d="M...Z" />
    </svg>
  )
}
```

Key rules:
- Use `viewBox` for scalability
- Accept `color` prop defaulting to `"var(--primary)"` so theme colours flow through
- Low default opacity (0.03-0.10) so decorations stay subtle
- `role="presentation"` and `aria-hidden` for accessibility
- Export from `components/brand/index.ts`

**Shape language per industry:**

| Industry | Shape vocabulary |
|----------|-----------------|
| Bakery / cafe | Soft organic curves, rounded blobs, gentle undulating waves |
| Real estate | Clean rectangles, straight lines, 45-degree angles |
| Tech / SaaS | Hexagons, circles with nodes, connecting lines, grids |
| Salon / beauty | Flowing bezier curves, ellipses, spirals, petal forms |
| Healthcare | Soft circles, pill shapes, gentle S-curves, rounded squares |
| Fitness | Sharp diagonals, chevrons, triangles, angular shapes |
| Creative / agency | Asymmetric, overlapping, unexpected combinations |
| Kids / playful | Bubbles, stars, dotted lines, irregular organic shapes |
| Default | Balanced organic + geometric, nothing extreme |

Do not use predefined SVG paths. Generate fresh paths that express the brand's specific character.

---

## Phase 5 — Brand Tokens

Update `lib/brand.ts` with the actual values from phases 1, 2, and 2.5.

Set every field:
- `name` — business name from `businessConfig.name`
- `tagline` — from `businessConfig.tagline` or empty string
- `description` — from `businessConfig.description`
- `colors` — the 12 oklch values from Phase 1
- `fonts` — display, body, mono font names
- `designTokens` — radii, shadows, spacing that match the brand character:
  - `radius.sm/md/lg/xl`: Match the brand's shape language. Playful brands get larger radii (0.75rem sm, 1.5rem xl). Corporate brands get smaller (0.125rem sm, 0.5rem xl).
  - `shadow.sm/md/lg`: Elevation should match density. Clean/minimal brands get subtle shadows. Bold brands can use more pronounced shadows.
  - `spacing`: 4px is the default base unit. Dense brands can use 2px. Spacious editorial brands can use 8px.

---

## Phase 6 — Brand Guidelines

Update `docs/BRAND.md` with actual brand decisions. Fill every section.

### Logo section

If a logo was generated, list the variants:

```markdown
| Variant | Component | Usage |
|---------|-----------|-------|
| Full | `<LogoFull />` | Header, business cards |
| Icon | `<LogoIcon />` | Favicon, mobile nav |
| Wordmark | `<LogoWordmark />` | When mark context is established |
| Monochrome | `<LogoMono />` | Single-colour contexts |
```

If no logo exists, write:

```markdown
No logo was generated. The site uses typography-only branding with the display font.
```

### Colour palette section

Fill the table with actual hex values (convert oklch to hex for human reference):

```markdown
| Token | Light hex | Dark hex | Usage |
|-------|-----------|----------|-------|
| Primary | #... | #... | Buttons, links, active states |
| ... | ... | ... | ... |
```

### Typography section

```markdown
| Role | Font | Weight | Size |
|------|------|--------|------|
| Display / Hero | Font Name | 700 | text-5xl |
| Heading | Font Name | 600 | text-2xl |
| Body | Font Name | 400 | text-base |
| Caption | Font Name | 400 | text-sm |
```

### Image Style Guide

If image specs were generated in Phase 2.5, include the full image assets table:

```markdown
### Image Style Guide

All images should follow the style: `[style from spec]`

| Slot | Dimensions | Aspect ratio | Scene description |
|------|-----------|-------------|-------------------|
| Hero | 1920×1080 | 16:9 | [alt text from spec] |
| Service 1 | 800×600 | 4:3 | [alt text] |
```

Include the style descriptor prominently. This serves as the creative brief for the photographer or designer sourcing the images.

### Voice & Tone

Derive from `businessConfig.vibe`:

- `elegant` → voice is refined, warm but polished; avoid casual language
- `family owned` → voice is friendly, approachable; use "we" and "you"
- `speedy` / `dynamic` → voice is direct, confident; short sentences
- `kids friendly` → voice is warm, enthusiastic; playful but not childish
- `modern` → voice is clear, forward-thinking; avoid jargon
- `rustic` → voice is warm, genuine; storytelling tone
- `bold` → voice is assertive, punchy; imperative sentences
- `minimal` → voice is concise, precise; every word earns its place

Combine multiple keywords. A "family owned, modern" bakery = approachable but not old-fashioned.

### Decorative elements

If any were created, list them:

```markdown
| Component | Usage |
|-----------|-------|
| `<Blob />` | Hero section background decoration |
| `<WaveDivider />` | Between main content sections |
```

If none were created, write:

```markdown
No decorative elements were generated — the design relies on typography, spacing, and colour.
```

---

## Phase 7 — Verification

1. Run `bun run build` and fix any TypeScript/lint errors
2. Verify `globals.css` has valid oklch values (no syntax errors)
3. Verify `app/layout.tsx` renders without hydration errors
4. Run `bun run lint` and fix any issues
5. If a logo was generated: verify it renders in the header
6. Verify `lib/brand.ts` has no empty strings (all fields populated)
7. Verify `lib/brand.ts` has `imageAssets.hero` populated (src, alt, dimensions all set)
8. Verify `public/images/` directory exists with `.gitkeep`

---

## What comes next

After brand generation, tell the user what was done and suggest next steps:

> "Your brand identity is ready. Here's what was created:
> - Colour palette in globals.css
> - Font pair loaded in layout.tsx
> - Image specifications in lib/brand.ts (detailed specs for every image slot — placeholder-ready)
> - Brand tokens in lib/brand.ts
> - Guidelines in docs/BRAND.md
>
> No actual images were generated. The specs describe the intended look (style, mood, composition) for each image. You can replace the placeholders with real photos that match the spec.
>
> You can now generate pages. Try: 'generate a services page'"

If logo was skipped:

> "No logo was set. The header uses your business name as typography. You can add a logo later by placing it in components/brand/Logo.tsx."

If decorative elements were skipped:

> "No decorative elements were added — the design relies on typography, spacing, and colour for impact."
