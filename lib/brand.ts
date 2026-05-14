export interface BrandColors {
  "primary": string
  "primary-foreground": string
  "secondary": string
  "secondary-foreground": string
  "accent": string
  "accent-foreground": string
  "muted": string
  "muted-foreground": string
  "background": string
  "foreground": string
  "border": string
  "ring": string
}

export interface BrandFonts {
  display: string
  body: string
  mono: string
}

export interface BrandDesignTokens {
  radius: {
    sm: string
    md: string
    lg: string
    xl: string
  }
  shadow: {
    sm: string
    md: string
    lg: string
  }
  spacing: string
}

export interface BrandImageSpec {
  src: string
  alt: string
  width: number
  height: number
  aspectRatio: string
  style: string
  prompt: string
}

export interface BrandImageAssets {
  hero: BrandImageSpec
  backgrounds?: BrandImageSpec[]
  serviceImages?: BrandImageSpec[]
}

export interface BrandTokens {
  name: string
  tagline: string
  description: string
  colors: BrandColors
  fonts: BrandFonts
  designTokens: BrandDesignTokens
  imageAssets?: BrandImageAssets
}

export const brandTokens: BrandTokens = {
  name: "",
  tagline: "",
  description: "",
  colors: {
    "primary": "",
    "primary-foreground": "",
    "secondary": "",
    "secondary-foreground": "",
    "accent": "",
    "accent-foreground": "",
    "muted": "",
    "muted-foreground": "",
    "background": "",
    "foreground": "",
    "border": "",
    "ring": "",
  },
  fonts: {
    display: "Geist",
    body: "Geist",
    mono: "Geist Mono",
  },
  designTokens: {
    radius: { sm: "0.375rem", md: "0.5rem", lg: "0.75rem", xl: "1rem" },
    shadow: { sm: "0 1px 2px rgba(0,0,0,0.05)", md: "0 4px 6px rgba(0,0,0,0.07)", lg: "0 10px 25px rgba(0,0,0,0.1)" },
    spacing: "4px",
  },
}
