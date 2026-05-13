import type { Metadata } from "next"
import { siteConfig } from "@/lib/config"

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch",
  openGraph: {
    title: `Contact | ${siteConfig.name}`,
    description: "Get in touch",
    url: `${siteConfig.url}/contact`,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    title: `Contact | ${siteConfig.name}`,
    description: "Get in touch",
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: "/contact",
  },
}

export default function Contact() {
  return (
    <div className="flex flex-1 flex-col items-center px-4">
      <main className="flex w-full max-w-3xl flex-col gap-8 py-16">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">Contact</h1>
        <div className="flex flex-col gap-4 text-muted-foreground">
          <p>
            This page is a placeholder. Replace it with a contact form, email link, or
            any other contact mechanism your project needs.
          </p>
          <p>
            Example: reach out at
            {" "}
            <a href="mailto:hello@example.com" className="underline underline-offset-2 hover:text-foreground">
              hello@example.com
            </a>
          </p>
        </div>
      </main>
    </div>
  )
}
