---
name: business-site-builder
description: Generate business website pages from a Next.js boilerplate. Use when the user says "generate a [page-type] page", "add a [page-type] page", "create a [page-type] page", or asks to scaffold pages for their business site.
metadata:
  version: 2.0.0
---

# Business Site Builder

You scaffold individual pages for a business website. Every page you generate must be **structurally unique** — no two pages should follow the same layout formula.

This is not a template picker. This is a **design improvisation system**.

---

## Pre-flight

1. Read `lib/business.ts` — business name, services, contact info, industry, vibe
2. Read `lib/config.ts` — site name, URL, locale, OG image path
3. Read `lib/brand.ts` — if `brandTokens.name` is set, read colours, fonts, and design tokens
4. Read `components/layout/Header.tsx` — existing nav items so you know what pages already exist
5. Scan `components/brand/` — check if the directory exists. If it does, read every file to see what components are available (LogoFull, Blob, WaveDivider, Pattern, etc.) These are used at your discretion — you decide when and where to use each one based on the page type.
6. Check `app/` to see what page directories already exist

## Page Generation Workflow

For every page:

1. Tell the user what you're about to create and ask if they have any specific content or layout preferences
2. If the page type is not covered by a playbook below, ask the user what content they want on the page
3. Select the best layout template from the Section Templates below based on the page type, industry, vibe, and any inspiration brief
4. Check `brandTokens.imageAssets` for available image specs — use them as `next/image` placeholders in the selected template
5. Create `app/<type>/page.tsx` with:
   - Full `Metadata` export (title, description, openGraph, twitter, alternates.canonical)
   - A server component using the chosen section template(s), with proper Tailwind v4 semantic tokens
   - Staggered entrance animations on major sections
   - Image placeholders using `next/image` with `placeholder="blur"`
   - Content derived from `lib/business.ts` data and user input
6. Create `app/<type>/loading.tsx` with a simple Suspense fallback
7. Add the page to the `navItems` array in `components/layout/Header.tsx`
8. Run `bun run lint` and fix any issues

### Cross-cutting rules

- Import `siteConfig` from `@/lib/config` for SEO metadata
- Import `businessConfig` from `@/lib/business` for business content
- If brand exists (`brandTokens.name` is set), import `brandTokens` from `@/lib/brand` and apply its design tokens to all pages
- If brand exists (`brandTokens.name` is set), import `brandTokens` from `@/lib/brand` and apply its design tokens to all pages
- Use the title template: `"%s | {siteConfig.name}"` — set only the page-specific title
- Always include `openGraph` and `twitter` metadata matching the pattern in existing pages
- Always include `alternates: { canonical: "/<type>" }`
- Use semantic Tailwind tokens (`bg-background`, `text-muted-foreground`, `bg-primary`, etc.)
- Use shadcn components from `@/components/ui/` when appropriate (Card, Button, Input, Textarea, Badge, Separator)
- Use lucide-react icons
- Use `gap-*` instead of `space-x-*` / `space-y-*`
- Use `cn()` from `@/lib/utils` for conditional class merging
- **Brand components are used at your discretion.** Scan `@/components/brand/` at page generation time. If you find decorative components (Blob, WaveDivider, Pattern, etc.), decide per-section whether they enhance the page. If the brand is minimal or elegant, skip them entirely. If the brand is creative or playful, use them to add character.
  - Hero sections: a subtle `<Blob />` behind the heading adds depth for playful/creative brands
  - Between sections: a `<WaveDivider />` creates rhythm for brands with organic shape language
  - Section backgrounds: `<Pattern />` adds texture for tech/creative brands
  - CTAs: brand-specific arrows for action-oriented brands
  - **Never force a decorative component where it doesn't belong.** A law firm page should have zero decorations. A bakery homepage might use one wave divider. Trust your judgment.
- Apply `brandTokens.designTokens` for spacing, radius, and shadow decisions:
  - Use `rounded-[--radius-sm/md/lg/xl]` matching the brand token scale
  - Use brand-appropriate shadow sizes (`shadow-sm`/`md`/`lg`)
- Do NOT delete or modify existing demo pages (about, contact, index) — they serve as examples
- Do NOT modify `app/layout.tsx`, `lib/config.ts`, `lib/business.ts`, or `app/globals.css`

## Page-Type Playbooks

### index

- The homepage already exists at `app/page.tsx`. Do not regenerate it unless the user explicitly asks to replace it.
- If the user wants to replace it, use these templates:
  - **Hero**: Split Hero (if image assets exist) → Gradient Hero (fallback) → Full-bleed glass (premium brands)
  - **Services/features**: Standard Card Grid with hover
  - **Trust/testimonial section**: Alternating Image-Text Rows or a simple quote section
  - **CTA**: Full-bleed Gradient CTA
- Animate the hero, then stagger each section below
- Metadata: `title` should be omitted (uses the default site name from layout)

### about

- **Hero**: Split Hero (image on right) or Alternating Image-Text Rows for storytelling
- **Content**: Use Alternating Image-Text Rows to tell the story. First row = history, second = mission/values
- **CTA**: Full-bleed Gradient CTA at bottom ("Get in touch")
- Pull `businessConfig.description` as the starting point for content
- Ask the user if they have specific about content or want you to draft it from their description

### services

- **Hero**: Gradient Hero (tech/creative) or Split Hero with service image
- **Services grid**: Standard Card Grid with hover, using `businessConfig.services`
- **CTA**: Full-bleed Gradient CTA at bottom ("Contact us for a quote")
- If `businessConfig.services` is empty, ask the user to list their services
- For each service, use the corresponding `brandTokens.imageAssets?.serviceImages[i]` if available

### contact

- **Hero**: Full-bleed Glass overlay hero (if image exists) or minimal heading
- **Form section**: Split layout — contact form (shadcn Input + Textarea + Button) on one side, contact info + optional map on the other
- Phone should link via `tel:` and email via `mailto:`
- Optionally: a map embed section (ask the user if they want one)

### mission

- No hardcoded content possible — ask the user: "What is the business's mission, vision, and core values?"
- **Layout**: Alternating Image-Text Rows with an image placeholder per value, or a simple stacked section
- Use the hero image as the section background if available

### faq

- No hardcoded content — ask the user: "What questions and answers should the FAQ include?"
- **Layout**: Simple centered section with `max-w-3xl`, each Q&A as a `<details>`/`<summary>` or Card
- Use `Separator` between items if desired
- No hero image needed — just a heading + subtitle

### gallery / portfolio

- No hardcoded content — ask the user: "What images or projects should the gallery display?"
- **Layout**: Asymmetric Bento Grid for creative portfolios, Standard Card Grid for others
- Ask about layout preference: grid, masonry, carousel
- Use `next/image` placeholders with rich alt text describing each intended image

### pricing

- No hardcoded content — ask the user: "What pricing tiers or packages do you offer?"
- **Layout**: Three-card row (Standard Card Grid with hover) or a comparison table
- **Hero**: Gradient Hero (no image) — keeps the focus on the pricing content

### team

- No hardcoded content — ask the user: "Who is on the team? For each person, I need a name, role, and optionally a bio/photo."
- **Layout**: Standard Card Grid with hover, each card has an Avatar placeholder (use `aspect-square` with a `bg-muted` circle), name, role, and optional bio
- **Hero**: Split Hero with team/office image, or Gradient Hero

### testimonials

- No hardcoded content — ask the user: "What testimonials or reviews do you want to feature?"
- **Layout**: Standard Card Grid with quote styling, or a single centered quote block for 1-2 testimonials
- Style: use italic text, large opening quote icon, `text-muted-foreground` for attribution
- **Hero**: Simple heading section, no image needed

### Any other page type

- Ask the user: "What content do you want on this page? Describe the sections you'd like."
- Help them refine: propose a layout structure based on what they describe

## Design Positioning

Read `businessConfig.industry` and `businessConfig.vibe` before generating any page. Use the tables below to determine the design direction.

Apply the industry's baseline first, then overlay the vibe keyword modifiers. The result determines every page's layout structure, spacing, color emphasis, border radius, typography scale, and decorative choices.

### Industry baselines

| Industry                          | Layout                                                     | Spacing                                     | Visual style                                       | Tone                  |
| --------------------------------- | ---------------------------------------------------------- | ------------------------------------------- | -------------------------------------------------- | --------------------- |
| bakery / cafe / restaurant        | Soft grids, generous whitespace, warm hero                 | `gap-8` to `gap-12` sections                | Rounded (`rounded-xl`), warm accent                | Friendly, cozy        |
| real estate                       | Full-width hero, spacious card grids, gallery sections     | `gap-16` sections, `py-24` heroes           | Clean lines, subtle shadows (`shadow-sm`)          | Premium, aspirational |
| carpenter / handyman / contractor | Solid block sections, bordered cards, before/after layout  | `gap-8` sections                            | Slightly rounded (`rounded-lg`), earthy accent     | Rugged, trustworthy   |
| hair salon / beauty / spa         | Asymmetric grids, accent feature sections, full-width CTAs | Varied section spacing                      | Modern (`rounded-sm` to `rounded-lg`), bold accent | Trendy, energetic     |
| law / finance / accounting        | Conservative grids, restrained hero, clean typography      | Standard spacing (`gap-8`), contained width | Minimal (`rounded-sm`), neutral palette            | Authoritative, formal |
| tech / saas / startup             | Bento-style grids, gradient hero sections, feature tiles   | Varied, dynamic spacing                     | Clean (`rounded-lg`), accent-driven palette        | Innovative, fast      |
| healthcare / wellness             | Simple accessible layout, generous spacing, clear CTAs     | `gap-10` sections, large touch targets      | Soft (`rounded-xl`), calm palette                  | Caring, clean         |
| fitness / gym                     | Bold hero, high-impact sections, dynamic grids             | Tight vertical rhythm, spacious heroes      | Angular (`rounded-md`), high-contrast accent       | Energetic, motivating |
| ecommerce / retail                | Product grids, featured categories, prominent CTAs         | Dense but navigable                         | Mixed radii, brand-driven accent                   | Persuasive, clear     |
| creative / agency / portfolio     | Asymmetric hero, showcase grids, full-bleed sections       | Expressive, varied spacing                  | Experimental radii, accent-led                     | Bold, distinctive     |
| default / unknown                 | Balanced grid, standard hero, neutral spacing              | `gap-8` sections, `py-16` hero              | `rounded-lg`, balanced neutral                     | Professional          |

### Vibe keyword modifiers

When `businessConfig.vibe` contains any of these keywords, overlay these adjustments on top of the industry baseline:

| Keyword                       | Layout adjustment                                                     | Visual adjustment                                           | Typography                                                               |
| ----------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------- | ------------------------------------------------------------------------ |
| `speedy` / `fast` / `dynamic` | Bold asymmetric sections, prominent CTAs, reduced whitespace          | High contrast accent, solid color CTAs                      | Larger headings (text-5xl), bold weights                                 |
| `bento` / `bento cell`        | Grid with varied cell sizes (e.g. 2/3 + 1/3), clean cell borders      | Thin borders between cells, subtle background tint per cell | Normal scale, clean                                                      |
| `elegant` / `luxury`          | Max whitespace, refined spacing, contained content width              | Muted accent, minimal decoration                            | Smaller body text (text-sm), refined weights, serif heading if available |
| `family owned` / `family`     | Warm section backgrounds, approachable layout                         | Warm accent tint, softer shadows                            | Friendly, slightly larger body text for readability                      |
| `kids friendly`               | Larger touch targets (`size-12`+), rounded everywhere (`rounded-2xl`) | Playful accent, colorful accents                            | Large, clear body text                                                   |
| `modern`                      | Asymmetric sections, full-bleed hero, overlapping elements            | Gradient accents, minimal borders                           | Clean sans-serif, medium weights                                         |
| `minimal` / `clean`           | Max whitespace, flat components, restrained sections                  | No shadows, thin borders, restrained accent                 | Light weights, smaller headings                                          |
| `bold` / `vibrant`            | High-impact hero, solid accent backgrounds                            | High-saturation accent, solid color blocks                  | Heavy heading weights                                                    |
| `rustic` / `handcrafted`      | Warm section backgrounds, border decorations                          | Earthy accent, rounded corners                              | Slightly heavier, warm                                                   |
| `corporate`                   | Contained max-width, standard grid, structured sections               | Neutral palette, subtle accent                              | Conservative, medium weights                                             |

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

---

## Design Inspiration Analysis

When `lib/design-inspiration.ts` has entries OR the user mentions inspiration URLs in conversation:

### 1. Fetch & analyze each URL

Use the webfetch tool on each URL. Extract:

| What to look for         | Notes                                                                               |
| ------------------------ | ----------------------------------------------------------------------------------- |
| **Hero layout**          | Split (image + text), full-bleed (image as bg), centered text, gradient bg          |
| **Color palette**        | Dominant hues, accent usage, light/dark mode — note any oklch guesses               |
| **Typography**           | Display font, body font, sizes (4xl hero, base body, etc.), weights, letter-spacing |
| **Section structure**    | How content sections are organized (grid, bento, stacked, alternating rows)         |
| **Card/component style** | Border radius (sharp/rounded), shadows, borders, hover effects                      |
| **Image usage**          | How images are used (hero, card thumbnails, background), aspect ratios              |
| **Effects**              | Glassmorphism, gradients, animations, dividers, overlays                            |
| **Spacing density**      | Generous whitespace vs compact, section padding                                     |

### 2. Build a design brief

Translate what you see into directives that override the default industry positioning:

```
DESIGN BRIEF (from example.com)
- Hero: full-bleed image with dark overlay, centered text, CTA below
- Layout structure: alternating full-width image/text rows
- Cards: rounded-lg, hover lift (-translate-y-1) with shadow-lg transition
- Effects: subtle glassmorphism nav, noise texture overlay
- Typography: large serif display (5xl), clean sans body
- Spacing: generous, py-24 sections, gap-12

Apply these as overrides to the industry+vibe positioning below.
```

### 3. Save in conversation context

Keep the brief active for the current session. Every page you generate should reference it.

---

### 1. Split

Text on one side, image on the other. The most fundamental narrative device.

```tsx
<section className="grid min-h-[70vh] grid-cols-1 lg:grid-cols-[55fr_45fr]">
  <div className="flex flex-col justify-center gap-6 px-6 py-16 lg:px-12 lg:py-24">
    <h1 className="animate-fade-in-up font-heading text-4xl font-semibold tracking-tight lg:text-5xl">
      {businessConfig.tagline}
    </h1>
    <p className="animate-fade-in-up text-muted-foreground max-w-lg text-lg delay-200">{businessConfig.description}</p>
    <div className="animate-fade-in-up flex gap-4 delay-300">
      <Button size="lg" render={<Link href="/contact" />}>
        CTA
        <ArrowRight data-icon="inline-end" />
      </Button>
      <Button size="lg" variant="outline" render={<Link href="/about" />}>
        Secondary
      </Button>
    </div>
  </div>
  <div className="relative min-h-[40vh] lg:min-h-full">
    <Image
      src={brandTokens.imageAssets?.hero.src ?? "/placeholder.svg"}
      alt={brandTokens.imageAssets?.hero.alt ?? ""}
      fill
      className="object-cover"
      placeholder="blur"
      blurDataURL={generateBlurDataURL()}
      sizes="(max-width: 1024px) 100vw, 45vw"
      priority
    />
    <div className="from-background/20 absolute inset-0 bg-gradient-to-r to-transparent" />
  </div>
</section>
```

**Variations:**

- **Image on left:** reverse the grid column order (`lg:grid-cols-[45fr_55fr]`)
- **No gradient overlay:** Omit the `bg-gradient` div for pure image
- **Smaller hero:** Use `min-h-[60vh]` or just `py-24`

### Hero — Full-bleed with glass overlay card

**When to use:** Premium brands, hospitality, real estate, any brand wanting a dramatic first impression.

```tsx
<section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden">
  <Image
    src={brandTokens.imageAssets?.hero.src ?? "/placeholder.svg"}
    alt={brandTokens.imageAssets?.hero.alt ?? ""}
    fill
    className="object-cover"
    placeholder="blur"
    blurDataURL={generateBlurDataURL()}
    sizes="100vw"
    priority
  />
  <div className="from-background/80 via-background/40 to-background/10 absolute inset-0 bg-gradient-to-t" />
  <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
    <div className="animate-scale-in glass rounded-2xl p-8 lg:p-12">
      <h1 className="font-heading text-4xl font-semibold tracking-tight lg:text-5xl">{businessConfig.tagline}</h1>
      <p className="text-muted-foreground mx-auto mt-4 max-w-xl text-lg">{businessConfig.description}</p>
      <Button size="lg" className="mt-8" render={<Link href="/contact" />}>
        CTA
      </Button>
    </div>
  </div>
</section>
```

### Hero — Gradient with decorative blobs (no image)

**When to use:** Brands without a hero image (no spec in assets), tech startups, creative agencies.

```tsx
<section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden">
  {/* Decorative blobs */}
  <div className="from-primary/15 absolute -top-32 -left-32 size-96 rounded-full bg-gradient-to-br to-transparent blur-3xl" />
  <div className="from-accent/15 absolute -right-32 -bottom-32 size-96 rounded-full bg-gradient-to-tl to-transparent blur-3xl" />
  <div className="from-secondary/15 absolute top-1/4 left-1/3 size-64 rounded-full bg-gradient-to-tr to-transparent blur-3xl" />
  {/* Content */}
  <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
    <h1 className="animate-fade-in-up font-heading text-4xl font-semibold tracking-tight lg:text-5xl">
      {businessConfig.tagline}
    </h1>
    <p className="animate-fade-in-up text-muted-foreground mx-auto mt-6 max-w-xl text-lg delay-200">
      {businessConfig.description}
    </p>
    <div className="animate-fade-in-up mt-8 flex justify-center gap-4 delay-300">
      <Button size="lg" render={<Link href="/contact" />}>
        CTA
      </Button>
      <Button size="lg" variant="outline" render={<Link href="/about" />}>
        Secondary
      </Button>
    </div>
  </div>
</section>
```

### Feature Grid — Standard card grid with hover

**When to use:** Services, features, team members, any list of items.

```tsx
<section className="px-4 py-20">
  <div className="mx-auto max-w-6xl">
    <h2 className="animate-fade-in-up font-heading text-center text-3xl font-semibold tracking-tight">Section title</h2>
    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item, i) => (
        <Card
          key={i}
          className="animate-fade-in-up group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          style={{ animationDelay: `${(i + 1) * 150}ms` }}
        >
          <CardHeader>
            {Icon && <Icon className="text-primary group-hover:text-accent size-5 transition-colors duration-300" />}
            <CardTitle>{item.title}</CardTitle>
            <CardDescription>{item.description}</CardDescription>
          </CardHeader>
        </Card>
      ))}
    </div>
  </div>
</section>
```

### Feature Grid — Asymmetric bento

**When to use:** Tech/SaaS, creative agencies, portfolios — anything that breaks out of uniform grids.

```tsx
<section className="px-4 py-20">
  <div className="mx-auto max-w-6xl">
    <h2 className="animate-fade-in-up font-heading text-3xl font-semibold tracking-tight">Section title</h2>
    <div className="mt-12 grid gap-4 md:grid-cols-3 md:grid-rows-2">
      {/* Large feature — spans 2 cols, 2 rows */}
      <div className="animate-fade-in-up bg-muted rounded-xl p-8 delay-100 md:col-span-2 md:row-span-2">
        <h3 className="font-heading text-xl font-semibold">Feature name</h3>
        <p className="text-muted-foreground mt-2">Feature description</p>
      </div>
      {/* Small features */}
      <div className="animate-fade-in-up bg-muted rounded-xl p-6 delay-200">
        <h3 className="font-heading text-lg font-semibold">Feature</h3>
        <p className="text-muted-foreground mt-1 text-sm">Description</p>
      </div>
      <div className="animate-fade-in-up bg-muted rounded-xl p-6 delay-300">
        <h3 className="font-heading text-lg font-semibold">Feature</h3>
        <p className="text-muted-foreground mt-1 text-sm">Description</p>
      </div>
    </div>
  </div>
</section>
```

---

### 4. Stack

Content stacked vertically, usually centered. Used for impact sections (hero, quote, CTA).

```tsx
<section className="px-4 py-20">
  <div className="mx-auto flex max-w-6xl flex-col gap-20">
    {rows.map((row, i) => (
      <div
        key={i}
        className={`animate-fade-in-up grid items-center gap-8 lg:grid-cols-2 ${i % 2 === 1 ? "lg:direction-rtl" : ""}`}
        style={{ animationDelay: `${i * 150}ms` }}
      >
        <div className="flex flex-col gap-4">
          <h2 className="font-heading text-3xl font-semibold tracking-tight">{row.title}</h2>
          <p className="text-muted-foreground text-lg">{row.description}</p>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
          <Image
            src={row.imageSrc}
            alt={row.imageAlt}
            fill
            className="object-cover"
            placeholder="blur"
            blurDataURL={generateBlurDataURL()}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    ))}
  </div>
</section>
```

**Note:** `lg:direction-rtl` is not a real utility. For alternating rows, use `lg:[direction:rtl]` on odd-indexed rows, or manually swap the markup order.

### CTA — Full-bleed gradient

**When to use:** Bottom-of-page calls to action, newsletter signups, contact prompts.

```tsx
<section className="from-primary via-primary to-accent text-primary-foreground relative overflow-hidden bg-gradient-to-br px-4 py-20">
  {/* Decorative circles */}
  <div className="absolute -top-20 -right-20 size-80 rounded-full bg-white/[0.06]" />
  <div className="absolute -bottom-20 -left-20 size-60 rounded-full bg-white/[0.06]" />
  <div className="animate-fade-in-up relative z-10 mx-auto max-w-2xl text-center">
    <h2 className="font-heading text-3xl font-semibold tracking-tight">CTA heading</h2>
    <p className="text-primary-foreground/80 mt-4">CTA description text</p>
    <Button size="lg" variant="secondary" className="mt-8" render={<Link href="/contact" />}>
      Action
      <ArrowRight data-icon="inline-end" />
    </Button>
  </div>
</section>
```

### CTA — Image background with dark overlay

**When to use:** Premium feel, hospitality, real estate, brands with strong imagery.

```tsx
<section className="text-background relative overflow-hidden px-4 py-24">
  <Image
    src={brandTokens.imageAssets?.backgrounds?.[0]?.src ?? "/placeholder.svg"}
    alt=""
    fill
    className="object-cover"
    placeholder="blur"
    blurDataURL={generateBlurDataURL()}
    sizes="100vw"
  />
  <div className="bg-foreground/60 absolute inset-0" />
  <div className="animate-fade-in-up relative z-10 mx-auto max-w-2xl text-center">
    <h2 className="font-heading text-3xl font-semibold tracking-tight">CTA heading</h2>
    <p className="text-background/80 mt-4">CTA description</p>
    <Button
      size="lg"
      variant="outline"
      className="border-background text-background hover:bg-background hover:text-foreground mt-8"
    >
      Action
    </Button>
  </div>
</section>
```

### Section Divider — Diagonal clip-path

**When to use:** Between two sections to create dynamic transitions. Use sparingly — max 1 per page.

```tsx
<section className="clip-diagonal bg-background relative pt-16 pb-32">{/* section content */}</section>
```

The next sibling section should start after the clipped area (use `-mt-16` or just let the overlap happen naturally).

---

## Animation & Effects Reference

These utilities are available in `globals.css`. Use them to add motion and visual depth.

### Entrance animation classes

| Class                  | Effect                          | Use on              |
| ---------------------- | ------------------------------- | ------------------- |
| `animate-fade-in-up`   | Fade in + translateY(24px) → 0  | Everything          |
| `animate-fade-in-left` | Fade in + translateX(-24px) → 0 | Side-content        |
| `animate-scale-in`     | Scale 0.95 → 1 + fade in        | Hero cards, modals  |
| `animate-float`        | Infinite gentle float up/down   | Decorative elements |

### Stagger delays

Add `delay-{100|200|300|400|500|700}` alongside any `animate-*` class to sequence multiple elements:

```tsx
<h1 className="animate-fade-in-up">First</h1>           {/* 0ms */}
<p className="animate-fade-in-up delay-200">Second</p>   {/* 200ms */}
<Button className="animate-fade-in-up delay-400" />      {/* 400ms */}
```

For dynamic lists (cards, grid items), use inline `style`:

```tsx
{
  items.map((item, i) => (
    <div className="animate-fade-in-up" style={{ animationDelay: `${(i + 1) * 150}ms` }}>
      {item}
    </div>
  ))
}
```

### Glassmorphism

| Class          | Effect                                   |
| -------------- | ---------------------------------------- |
| `glass`        | backdrop-blur(12px) + 70% background mix |
| `glass-strong` | backdrop-blur(24px) + 85% background mix |

### Gradient text

```tsx
<h2 className="text-gradient font-heading text-4xl font-semibold">Gradient heading</h2>
```

### Noise overlay

Add `<div className="noise" />` as the last child of `<body>` (or within the page wrapper) for a subtle film-grain texture. Use on creative, editorial, or premium brands. Skip for minimal/corporate brands.

### Clip-path dividers

| Class              | Effect                                 |
| ------------------ | -------------------------------------- |
| `clip-diagonal`    | Top-right corner clipped at 85% height |
| `clip-diagonal-up` | Top-left corner clipped at 15%         |

Apply to a `<section>` to create dynamic diagonal transitions between sections:

```tsx
<section className="clip-diagonal bg-muted pt-20 pb-32">{/* content */}</section>
```

---

## Image Placeholder Rules

Since images are not generated, every `<Image>` element uses `next/image` with placeholder blur and a generated `blurDataURL`.

### blurDataURL generation

Generate a tiny SVG with the brand's muted background color, base64-encoded:

```tsx
function heroBlurDataURL() {
  // Use the brand's muted background tone approximated to hex
  // warm brands → #c9b9a8, cool brands → #a8b9c9, neutral → #b0b0b0
  return (
    "data:image/svg+xml;base64," +
    btoa(
      `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40">
      <rect width="40" height="40" fill="#b0b0b0"/>
    </svg>`,
    )
  )
}
```

For efficiency, define one `blurDataURL` constant per page and pass it to each `<Image>`. Use a single neutral color derived from the brand's muted tone (warm neutrals for warm brands, cool neutrals for cool brands).

### Image component pattern

```tsx
import Image from "next/image"

// Full-bleed (fills parent)
;<div className="relative">
  <Image
    src="https://images.unsplash.com/photo-{ID}?w={width}&q=80"
    alt="Descriptive alt text in Spanish (or locale language)"
    fill
    className="object-cover"
    sizes="100vw"
    priority // only on hero/LCP images
  />
  <div className="absolute inset-0 bg-gradient-..." />
</div>

// Constrained aspect ratio
<div className="relative aspect-[4/3] overflow-hidden rounded-xl">
  <Image
    src={url}
    alt={alt}
    fill
    className="object-cover transition-transform duration-500 hover:scale-105"
    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
  />
</div>
```

### Image variant logic

- Hero: use `w=1920`, `priority`, `sizes="100vw"`
- Gallery/featured: use `w=800`, `sizes` with responsive breakpoints
- Thumbnails/small: use `w=400`, lower quality
- Prefer `sizes` attribute over fixed widths for responsive images

---

## Animation & Effects

These utilities are in `globals.css`. Use them sparingly — one staggered entrance on the hero, then stagger sections below.

### Entrance classes

| Class | Effect | Where |
|-------|--------|-------|
| `animate-fade-in-up` | Fade + slide up 24px | Hero, sections, cards |
| `animate-fade-in-left` | Fade + slide left 24px | Side content |
| `animate-scale-in` | Scale 0.95→1 | Hero cards, featured items |

### Stagger pattern

```tsx
// Hero elements
<h1 className="animate-fade-in-up">...</h1>
<p className="animate-fade-in-up delay-200">...</p>
<div className="animate-fade-in-up delay-400">...</div>

// Dynamic lists — inline style
{items.map((item, i) => (
  <div className="animate-fade-in-up" style={{ animationDelay: `${(i + 1) * 150}ms` }}>
    {item}
  </div>
))}
```

### Glassmorphism

```tsx
<div className="glass">{/* content */}</div>        {/* blur(12px) */}
<div className="glass-strong">{/* content */}</div> {/* blur(24px) */}
```

### Gradient text

```tsx
<h2 className="text-gradient font-heading">Gradient heading</h2>
```

### Clip-path dividers

| Class | Shape | Use for |
|-------|-------|---------|
| `clip-diagonal` | Top-right clipped at 85% height | Bold section transitions |
| `clip-diagonal-up` | Top-left clipped at 15% | Reverse transition |

---

## navItems Management

After generating a new page, update `navItems` in `Header.tsx`. Use Spanish labels if `locale` is `es_ES`, English otherwise.

```ts
const navItems = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  // ... existing items stay
  { href: "/services", label: "Services" }, // ← new
]
```

---

## Content Quality

- No lorem ipsum — use config data or draft meaningful copy
- Match tone to business type and vibe
- Draft copy naturally in the business's locale language (e.g. Spanish for es_ES)
- When drafting original content, ask the user to review it
