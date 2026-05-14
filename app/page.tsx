import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  Briefcase,
  Calendar,
  Coffee,
  Mail,
  MapPin,
  Phone,
  Truck,
  UtensilsCrossed,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { siteConfig } from "@/lib/config"
import { businessConfig } from "@/lib/business"

const serviceIcons = [Coffee, UtensilsCrossed, Briefcase, Calendar, Truck]

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
      <section className="flex flex-col items-center gap-6 px-4 py-24 text-center">
        <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
          {businessConfig.tagline}
        </h1>
        <p className="max-w-xl text-lg text-muted-foreground">
          {businessConfig.description}
        </p>
        <div className="flex gap-4">
          <Button size="lg" render={<Link href="/contact" />}>
            Contáctanos
            <ArrowRight data-icon="inline-end" />
          </Button>
          <Button size="lg" variant="outline" render={<Link href="/about" />}>
            Conócenos
          </Button>
        </div>
      </section>

      <section className="bg-muted px-4 py-20">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-10">
          <h2 className="font-heading text-3xl font-semibold tracking-tight">
            Nuestros servicios
          </h2>
          <div className="grid w-full gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {businessConfig.services.map((service, i) => {
              const Icon = serviceIcons[i]
              return (
                <Card key={service.title}>
                  <CardHeader>
                    <Icon className="size-5 text-primary" />
                    <CardTitle>{service.title}</CardTitle>
                    <CardDescription>{service.description}</CardDescription>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      <section className="px-4 py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-8 text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight">
            Un espacio para ti
          </h2>
          <p className="text-lg text-muted-foreground">
            Un ambiente moderno y cálido donde el buen café y las mejores
            conversaciones se encuentran. Pet-friendly, diseñado para trabajar,
            reunirte o simplemente disfrutar.
          </p>
          <Separator className="max-w-xs" />
          <blockquote className="text-xl font-medium italic text-foreground/80">
            &ldquo;Buen café, mejores conversaciones.&rdquo;
          </blockquote>
        </div>
      </section>

      <section className="bg-muted px-4 py-20">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight">
            Visítanos
          </h2>
          <div className="flex flex-col items-center gap-3 text-muted-foreground">
            <p className="flex items-center gap-2">
              <MapPin className="size-4 shrink-0" />
              <span>{businessConfig.address}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="size-4 shrink-0" />
              <a
                href={`tel:${businessConfig.phone}`}
                className="hover:text-foreground"
              >
                {businessConfig.phone}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="size-4 shrink-0" />
              <a
                href={`mailto:${businessConfig.email}`}
                className="hover:text-foreground"
              >
                {businessConfig.email}
              </a>
            </p>
          </div>
          <Button size="lg" render={<Link href="/contact" />} className="mt-2">
            Envíanos un mensaje
            <ArrowRight data-icon="inline-end" />
          </Button>
        </div>
      </section>
    </div>
  )
}
