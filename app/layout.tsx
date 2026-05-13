import type { Metadata, Viewport } from "next"
// ── Fonts ─────────────────────────────────────────────
// To change fonts:
//   1. Swap the import below with your chosen Google Font
//   2. Update the variable name if different
//   3. For a separate heading font, add its CSS variable
//      to <html> className and update --font-heading in globals.css
// ─────────────────────────────────────────────────────
import { Geist, Geist_Mono } from "next/font/google"
import { ThemeProvider } from "next-themes"

import { siteConfig } from "@/lib/config"
import { OrganizationJsonLd, WebSiteJsonLd } from "@/lib/json-ld"
import { Header } from "@/components/layout/Header"
import { Footer } from "@/components/layout/Footer"
import "./globals.css"

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    template: `%s | ${siteConfig.name}`,
    default: siteConfig.name,
  },
  description: siteConfig.description,
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  alternates: {
    canonical: "/",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Header />
          <main className="flex flex-1 flex-col">{children}</main>
          <Footer />
        </ThemeProvider>
        <OrganizationJsonLd
          name={siteConfig.name}
          url={siteConfig.url}
          sameAs={[siteConfig.links.twitter, siteConfig.links.github]}
        />
        <WebSiteJsonLd
          name={siteConfig.name}
          url={siteConfig.url}
        />
      </body>
    </html>
  )
}
