import type React from "react"

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue }

interface JsonLdProps {
  data: Record<string, JsonValue>
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  )
}

interface OrganizationJsonLdProps {
  name: string
  url: string
  logo?: string
  sameAs?: string[]
}

export function OrganizationJsonLd({ name, url, logo, sameAs }: OrganizationJsonLdProps) {
  const data: Record<string, JsonValue> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    url,
  }

  if (logo) data.logo = logo
  if (sameAs && sameAs.length > 0) data.sameAs = sameAs

  return <JsonLd data={data} />
}

interface WebSiteJsonLdProps {
  name: string
  url: string
  searchUrl?: string
}

export function WebSiteJsonLd({ name, url, searchUrl }: WebSiteJsonLdProps) {
  const data: Record<string, JsonValue> = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
  }

  if (searchUrl) {
    data.potentialAction = {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": searchUrl,
      },
      "query-input": "required name=search_term_string",
    }
  }

  return <JsonLd data={data} />
}

interface BreadcrumbJsonLdProps {
  items: { name: string, url: string }[]
}

export function BreadcrumbJsonLd({ items }: BreadcrumbJsonLdProps) {
  const data: Record<string, JsonValue> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url,
    })),
  }

  return <JsonLd data={data} />
}
