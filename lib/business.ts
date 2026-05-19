export interface BusinessService {
  title: string
  description: string
}

export const businessConfig = {
  name: "Next Boilerplate",
  description:
    "Boilerplate moderno de Next.js para crear aplicaciones SaaS, plataformas web y productos impulsados por inteligencia artificial.",
  tagline: "Construye más rápido. Escala de forma inteligente.",
  email: "hola@nextboilerplate.dev",
  phone: "+52 444 000 0000",
  address: "San Luis Potosí, México",
  industry: "Desarrollo de Software / SaaS con IA",
  vibe: "Moderno, minimalista, escalable, enfocado en desarrolladores e impulsado por IA",

  services: [
    {
      title: "Starter SaaS con IA",
      description:
        "Base lista para construir productos SaaS con autenticación, pagos, dashboards y herramientas de inteligencia artificial.",
    },
    {
      title: "Arquitectura Next.js",
      description:
        "Estructura optimizada con App Router, Server Actions, TypeScript y mejores prácticas modernas.",
    },
    {
      title: "Autenticación y pagos",
      description:
        "Integración rápida con proveedores de autenticación, Stripe, suscripciones y gestión de usuarios.",
    },
    {
      title: "Componentes reutilizables",
      description:
        "Sistema de componentes reutilizables con Tailwind CSS, diseño responsive y enfoque escalable.",
    },
    {
      title: "Integración de agentes de IA",
      description:
        "Conecta agentes de IA, automatizaciones y APIs modernas para acelerar el desarrollo.",
    },
  ] as BusinessService[],
}
