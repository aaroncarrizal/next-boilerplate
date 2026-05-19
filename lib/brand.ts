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
  name: "Next Boilerplate",
  tagline: "Construye más rápido. Escala de forma inteligente.",
  description:
    "Boilerplate moderno de Next.js para crear aplicaciones SaaS, plataformas web y productos impulsados por inteligencia artificial.",
  colors: {
    "primary": "oklch(0.48 0.18 268)",
    "primary-foreground": "oklch(0.985 0 0)",
    "secondary": "oklch(0.9 0.025 265)",
    "secondary-foreground": "oklch(0.35 0.12 268)",
    "accent": "oklch(0.58 0.1 195)",
    "accent-foreground": "oklch(0.985 0 0)",
    "muted": "oklch(0.945 0.008 265)",
    "muted-foreground": "oklch(0.52 0.02 265)",
    "background": "oklch(0.995 0 0)",
    "foreground": "oklch(0.13 0.01 260)",
    "border": "oklch(0.91 0.015 265)",
    "ring": "oklch(0.48 0.18 268)",
  },
  fonts: {
    display: "Sora",
    body: "Outfit",
    mono: "Geist Mono",
  },
  designTokens: {
    radius: { sm: "0.375rem", md: "0.5rem", lg: "0.75rem", xl: "1rem" },
    shadow: { sm: "0 1px 2px rgba(0,0,0,0.05)", md: "0 4px 6px rgba(0,0,0,0.07)", lg: "0 10px 25px rgba(0,0,0,0.1)" },
    spacing: "4px",
  },
  imageAssets: {
    hero: {
      src: "/images/hero-next-boilerplate.png",
      alt: "Espacio de trabajo de desarrollo con editor de código en monitor principal, iluminación ambiental azul índigo y taza de café",
      width: 1920,
      height: 1080,
      aspectRatio: "16/9",
      style: "clean modern tech workspace photography, cool indigo color grading, soft ambient lighting, shallow depth of field",
      prompt:
        "Modern developer workspace with dual monitors, clean desk setup, code editor on main screen with indigo theme, warm ambient lighting, mechanical keyboard, minimalist aesthetic, cool blue-indigo color palette, depth of field blur on background, photography style, 8k resolution",
    },
    backgrounds: [
      {
        src: "/images/bg-grid-next-boilerplate.png",
        alt: "Fondo abstracto con patrón de cuadrícula en tonos índigo con gradiente sutil",
        width: 1920,
        height: 1080,
        aspectRatio: "16/9",
        style: "abstract tech background, geometric grid pattern, indigo gradient, clean minimal",
        prompt:
          "Abstract technology background with subtle geometric grid pattern in deep indigo tones, smooth radial gradient from center, clean minimal composition, no text, dark mode aesthetic, 8k",
      },
      {
        src: "/images/bg-dashboard-next-boilerplate.png",
        alt: "Fondo difuminado con gráficos de datos abstractos y node-graph en tonos azul índigo",
        width: 1920,
        height: 1080,
        aspectRatio: "16/9",
        style: "abstract data visualization, blurred background, node graph patterns, cool blue tones",
        prompt:
          "Abstract blurred background with subtle data visualization elements, node connection graphs, floating geometric shapes in indigo and teal, soft bokeh effect, modern tech aesthetic, no text, 8k",
      },
    ],
    serviceImages: [
      {
        src: "/images/service-saas-next-boilerplate.png",
        alt: "Dashboard SaaS con gráficos de métricas, sidebar de navegación y tabla de datos",
        width: 800,
        height: 600,
        aspectRatio: "4/3",
        style: "clean SaaS dashboard UI mockup, indigo accent colors, modern flat design",
        prompt:
          "SaaS dashboard interface with metric cards, line charts, navigation sidebar on left, data table, indigo and teal accent colors, clean modern UI design, well-organized layout, 8k",
      },
      {
        src: "/images/service-nextjs-next-boilerplate.png",
        alt: "Editor de código con estructura de proyecto Next.js y terminal abierta",
        width: 800,
        height: 600,
        aspectRatio: "4/3",
        style: "code editor screenshot, dark theme, Next.js project structure, developer tools visible",
        prompt:
          "VS Code editor with Next.js project open, file tree sidebar showing app directory structure, dark indigo theme, integrated terminal below, clean code syntax highlighting, developer-focused composition, 8k",
      },
      {
        src: "/images/service-auth-next-boilerplate.png",
        alt: "Pantalla de inicio de sesión moderna con campos de formulario y botón de autenticación",
        width: 800,
        height: 600,
        aspectRatio: "4/3",
        style: "clean login UI, centered card layout, modern authentication interface, indigo accent",
        prompt:
          "Modern login screen with centered card layout, email and password fields, styled button in indigo, social login options below, clean minimal design, soft shadow on card, 8k",
      },
      {
        src: "/images/service-components-next-boilerplate.png",
        alt: "Galería de componentes UI con botones, tarjetas, formularios y modales",
        width: 800,
        height: 600,
        aspectRatio: "4/3",
        style: "component library showcase, clean organized grid, varied UI elements, modern design system",
        prompt:
          "UI component showcase grid displaying buttons, cards, input fields, modals, and badges in an organized layout, modern design system aesthetic, indigo and neutral colors, clean borders and shadows, 8k",
      },
      {
        src: "/images/service-ai-next-boilerplate.png",
        alt: "Visualización abstracta de agentes de IA conectados en red con nodos brillantes",
        width: 800,
        height: 600,
        aspectRatio: "4/3",
        style: "abstract AI network visualization, glowing nodes, connection lines, indigo gradient background",
        prompt:
          "Abstract artificial intelligence network visualization with glowing nodes connected by luminous lines, deep indigo background with teal accent nodes, futuristic but clean aesthetic, no text, 8k",
      },
    ],
  },
}
