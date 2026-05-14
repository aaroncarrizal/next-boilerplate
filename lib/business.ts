export interface BusinessService {
  title: string
  description: string
}

export const businessConfig = {
  name: "Next boilerplate",
  description: "A modern Next.js 16 starter with shadcn/ui, dark mode, and best practices.",
  tagline: "",
  email: "",
  phone: "",
  address: "",
  industry: "",
  vibe: "",
  services: [] as BusinessService[],
}
