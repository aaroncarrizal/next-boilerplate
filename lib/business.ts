export interface BusinessService {
  title: string
  description: string
}

export const businessConfig = {
  name: "Next boilerplate",
  description: "",
  tagline: "",
  email: "",
  phone: "",
  address: "",
  services: [] as BusinessService[],
}
