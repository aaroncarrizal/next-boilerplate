import type { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Code2, Cog, ExternalLink, Rocket, Shield, Workflow, Zap } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { brandTokens } from "@/lib/brand"
import { businessConfig } from "@/lib/business"
import { siteConfig } from "@/lib/config"

const features = [
  {
    icon: Zap,
    title: "Rendimiento optimizado",
    description: "Construido sobre Next.js 16 con Turbopack, Server Components y las mejores prácticas de rendimiento.",
  },
  {
    icon: Shield,
    title: "Arquitectura robusta",
    description: "TypeScript estricto, ESLint flat config, y estructura modular lista para escalar.",
  },
  {
    icon: Workflow,
    title: "Flujo completo",
    description: "Autenticación, pagos, dashboard y agentes de IA integrados desde el primer commit.",
  },
  {
    icon: Rocket,
    title: "Despliegue inmediato",
    description: "Configurado para Vercel, Docker, y cualquier proveedor cloud con un solo comando.",
  },
  {
    icon: Cog,
    title: "Personalizable al máximo",
    description: "Tema completo con shadcn/ui, Tailwind v4, y sistema de diseño basado en tokens.",
  },
  {
    icon: Code2,
    title: "Código abierto y modular",
    description: "Cada componente es independiente, documentado y fácil de modificar o reemplazar.",
  },
]

const serviceIcons = [Zap, Workflow, Shield, Cog, Rocket]

export const metadata: Metadata = {
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: "/",
  },
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      {/* ── Hero ── */}
      <section className="relative grid min-h-[80vh] grid-cols-1 overflow-hidden lg:grid-cols-[1fr_45fr]">
        <div className="from-primary/20 via-accent/10 absolute inset-0 bg-gradient-to-br to-transparent lg:bg-none" />
        <div className="from-background via-background/60 absolute inset-0 bg-gradient-to-t to-transparent lg:bg-gradient-to-r" />

        <div className="relative z-10 flex flex-col justify-center gap-6 px-6 py-20 lg:px-12 lg:py-24">
          <div className="animate-fade-in-up">
            <span className="bg-primary/10 text-primary inline-block rounded-full px-3 py-1 text-xs font-medium tracking-wider uppercase">
              Next.js 16 · SaaS · IA
            </span>
          </div>
          <h1 className="animate-fade-in-up font-heading max-w-lg text-4xl font-semibold tracking-tight delay-100 lg:text-5xl">
            {businessConfig.tagline}
          </h1>
          <p className="animate-fade-in-up text-muted-foreground max-w-md text-lg delay-200">
            {businessConfig.description}
          </p>
          <div className="animate-fade-in-up flex flex-wrap gap-4 delay-300">
            <Button size="lg" render={<Link href="/contact" />}>
              Comenzar proyecto
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="outline" render={<Link href="/about" />}>
              Saber más
            </Button>
          </div>
        </div>

        <div className="relative min-h-[50vh] lg:min-h-full">
          <Image
            src={brandTokens.imageAssets?.hero.src ?? "/placeholder.svg"}
            alt={brandTokens.imageAssets?.hero.alt ?? ""}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 45vw"
            priority
          />
          <div className="from-background via-background/40 absolute inset-0 bg-gradient-to-t to-transparent lg:bg-gradient-to-l" />
        </div>
      </section>

      {/* ── Features grid ── */}
      <section className="bg-muted/50 px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="animate-fade-in-up mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-semibold tracking-tight">
              Todo lo que necesitas para empezar
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Un boilerplate completo con las tecnologías más modernas del ecosistema Next.js.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, i) => {
              const Icon = feature.icon
              return (
                <Card
                  key={feature.title}
                  className="animate-fade-in-up group border-none shadow-none transition-all duration-300 hover:-translate-y-1 hover:shadow-md"
                  style={{ animationDelay: `${(i + 1) * 120}ms` }}
                >
                  <CardHeader>
                    <div className="bg-primary/10 text-primary mb-3 inline-flex size-10 items-center justify-center rounded-lg">
                      <Icon className="size-5" />
                    </div>
                    <CardTitle className="text-base">{feature.title}</CardTitle>
                    <CardDescription>{feature.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Services ── */}
      <section className="px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="animate-fade-in-up mx-auto max-w-2xl text-center">
            <h2 className="font-heading text-3xl font-semibold tracking-tight">
              Soluciones listas para usar
            </h2>
            <p className="text-muted-foreground mt-4 text-lg">
              Módulos preconstruidos que aceleran el desarrollo de tu SaaS.
            </p>
          </div>
          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {businessConfig.services.map((service, i) => {
              const Icon = serviceIcons[i]
              const image = brandTokens.imageAssets?.serviceImages?.[i]
              return (
                <Card
                  key={service.title}
                  className="animate-fade-in-up group overflow-hidden border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                  style={{ animationDelay: `${(i + 1) * 120}ms` }}
                >
                  {image && (
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                  )}
                  <CardHeader>
                    {Icon && (
                      <div className="text-primary mb-2 inline-flex size-9 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="size-4" />
                      </div>
                    )}
                    <CardTitle className="text-base">{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Why (Alternating rows) ── */}
      <section className="bg-muted/50 px-4 py-24">
        <div className="mx-auto max-w-6xl">
          <div className="animate-fade-in-up mb-16 text-center">
            <h2 className="font-heading text-3xl font-semibold tracking-tight">
              Construye más rápido. Escala de forma inteligente.
            </h2>
          </div>

          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="animate-fade-in-up order-2 lg:order-1">
              <h3 className="font-heading text-2xl font-semibold tracking-tight">
                Arquitectura moderna desde el día uno
              </h3>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Next.js 16 con App Router, Server Components y Server Actions. Turbopack como bundler
                por defecto. TypeScript 5 estricto. Todo configurado para que empieces a construir
                funciones de negocio desde el primer minuto, no infraestructura.
              </p>
              <ul className="mt-6 space-y-3">
                {["Rendimiento nativo con Turbopack", "SEO optimizado con metadatos y structured data", "ESLint + Prettier + Husky preconfigurados"].map(
                  text => (
                    <li key={text} className="flex items-start gap-3">
                      <span className="bg-primary/10 text-primary mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                        ✓
                      </span>
                      <span className="text-muted-foreground">{text}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <div className="animate-fade-in-up relative order-1 aspect-[4/3] overflow-hidden rounded-xl lg:order-2">
              <Image
                src={brandTokens.imageAssets?.backgrounds?.[0]?.src ?? "/placeholder.svg"}
                alt={brandTokens.imageAssets?.backgrounds?.[0]?.alt ?? ""}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>

          <div className="mt-20 grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <div className="animate-fade-in-up relative aspect-[4/3] overflow-hidden rounded-xl">
              <Image
                src={brandTokens.imageAssets?.backgrounds?.[1]?.src ?? "/placeholder.svg"}
                alt={brandTokens.imageAssets?.backgrounds?.[1]?.alt ?? ""}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
            <div className="animate-fade-in-up">
              <h3 className="font-heading text-2xl font-semibold tracking-tight">
                IA y automatización integradas
              </h3>
              <p className="text-muted-foreground mt-4 leading-relaxed">
                Conecta agentes de inteligencia artificial, automatizaciones y APIs modernas sin
                friction. El boilerplate incluye la estructura para integrar modelos de lenguaje,
                procesamiento de datos y workflows inteligentes desde el inicio.
              </p>
              <ul className="mt-6 space-y-3">
                {["Agentes de IA preconfigurados", "Stripe + autenticación lista", "Dashboard analítico con métricas en tiempo real"].map(
                  text => (
                    <li key={text} className="flex items-start gap-3">
                      <span className="bg-primary/10 text-primary mt-0.5 inline-flex size-5 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                        ✓
                      </span>
                      <span className="text-muted-foreground">{text}</span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="from-primary via-primary/90 to-accent relative overflow-hidden px-4 py-24 text-primary-foreground">
        <div className="absolute -top-24 -right-24 size-96 rounded-full bg-white/[0.06]" />
        <div className="absolute -bottom-24 -left-24 size-72 rounded-full bg-white/[0.06]" />
        <div className="animate-fade-in-up relative z-10 mx-auto max-w-2xl text-center">
          <h2 className="font-heading text-foreground text-3xl font-semibold tracking-tight">
            ¿Listo para construir tu próximo SaaS?
          </h2>
          <p className="mt-4 text-lg text-foreground/80">
            Descarga el boilerplate, configura tu proyecto y empieza a desarrollar en minutos.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Button
              size="lg"
              variant="secondary"
              render={<Link href="/contact" />}
            >
              Empezar ahora
              <ArrowRight data-icon="inline-end" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              render={<Link href="https://github.com/example/next-boilerplate" />}
            >
              <ExternalLink className="size-4" />
              Ver en GitHub
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
