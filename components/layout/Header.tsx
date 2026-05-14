"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { siteConfig } from "@/lib/config"
import { ThemeToggle } from "@/components/layout/ThemeToggle"
import { BreadcrumbJsonLd } from "@/lib/json-ld"

// Updated by the agent when generating new pages via the business-site-builder skill
// Edit this array to add, remove, or reorder navigation links
const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/about", label: "Nosotros" },
  { href: "/contact", label: "Contacto" },
]

export function Header() {
  const pathname = usePathname()

  const currentItem = navItems.find(item => item.href === pathname)
  const breadcrumbItems = [
    { name: "Home", url: siteConfig.url },
    ...(currentItem
      ? [{ name: currentItem.label, url: `${siteConfig.url}${currentItem.href}` }]
      : []),
  ]

  return (
    <>
      <BreadcrumbJsonLd items={breadcrumbItems} />
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur-sm">
        <div className="mx-auto flex h-14 max-w-4xl items-center justify-between px-4">
          <Link href="/" className="font-heading text-sm font-semibold tracking-tight">
            next-boilerplate
          </Link>
          <nav className="flex items-center gap-1">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "rounded-md px-2.5 py-1.5 text-sm transition-colors",
                  pathname === item.href
                    ? "bg-muted font-medium text-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item.label}
              </Link>
            ))}
            <ThemeToggle />
          </nav>
        </div>
      </header>
    </>
  )
}
