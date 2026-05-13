import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: "About",
  description: "About the next-boilerplate project",
  openGraph: {
    title: `About | ${siteConfig.name}`,
    description: "About the next-boilerplate project",
    url: `${siteConfig.url}/about`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    title: `About | ${siteConfig.name}`,
    description: "About the next-boilerplate project",
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: "/about",
  },
}

export default function About() {
  return (
    <div className="flex flex-1 flex-col items-center px-4">
      <main className="flex w-full max-w-3xl flex-col gap-8 py-16">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">About</h1>
        <div className="flex flex-col gap-4 text-muted-foreground">
          <p>
            This boilerplate provides a foundation for building Next.js applications with
            modern tooling and best practices.
          </p>
          <p>
            It includes dark mode via next-themes, shadcn/ui components built on
            @base-ui/react, Tailwind CSS v4, TypeScript strict mode, and the latest
            Next.js 16 conventions.
          </p>
          <p>
            Use it as a starting point for your next project — delete what you do not
            need and build from there.
          </p>
        </div>
      </main>
    </div>
  )
}
