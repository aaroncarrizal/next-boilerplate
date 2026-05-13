import type { Metadata } from "next"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { siteConfig } from "@/lib/config"
import { ArrowRightIcon, BracesIcon, LayersIcon, PaletteIcon } from "lucide-react"

const features = [
  {
    title: "shadcn/ui",
    description: "Components from @base-ui/react — Button, Card, DropdownMenu, and more.",
    icon: LayersIcon,
  },
  {
    title: "Dark Mode",
    description: "Class-based theming with next-themes. Toggle via the dropdown in the header.",
    icon: PaletteIcon,
  },
  {
    title: "TypeScript",
    description: "Strict mode, path aliases, and Next.js 16 async API patterns.",
    icon: BracesIcon,
  },
]

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
}

export default function Home() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <main className="flex w-full max-w-3xl flex-col items-center gap-12 py-24">
        <section className="flex flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            next-boilerplate
          </h1>
          <p className="max-w-lg text-muted-foreground sm:text-lg">
            A modern Next.js 16 starter with dark mode, shadcn/ui components, and
            best practices baked in.
          </p>
          <div className="flex gap-3">
            <Button variant="default" size="lg">
              Get Started
              <ArrowRightIcon data-icon="inline-end" />
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </section>

        <section className="grid w-full gap-4 sm:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Card key={feature.title} size="sm">
                <CardHeader>
                  <Icon className="size-5 text-muted-foreground" />
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            )
          })}
        </section>
      </main>
    </div>
  )
}
