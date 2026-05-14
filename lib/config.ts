import { businessConfig } from "./business"
export const siteConfig = {
  name: businessConfig.name,
  description: businessConfig.description,
  url: "https://example.com",
  locale: "es_ES",
  ogImage: "/opengraph-image",
  socials: {
    twitter: "https://twitter.com/example",
    github: "https://github.com/example/next-boilerplate",
  },
  fonts: {
    sans: "Geist",
    mono: "Geist Mono",
  },
}
