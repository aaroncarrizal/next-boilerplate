export interface BusinessService {
  title: string
  description: string
}

export const businessConfig = {
  name: "Café Sierra Azul",
  description:
    "Cafetería de especialidad en San Luis Potosí enfocada en café de origen mexicano, brunch artesanal y experiencias relajadas con diseño contemporáneo.",
  tagline: "Buen café, mejores conversaciones.",
  email: "hola@cafesierraazul.mx",
  phone: "+52 444 312 8471",
  address: "Av. Venustiano Carranza 1450, Col. Tequisquiapan, San Luis Potosí, S.L.P., México",
  industry: "Cafetería / Hospitality",
  vibe: "Moderno, cálido, minimalista, creativo y pet-friendly",
  services: [
    {
      title: "Café de especialidad",
      description: "Espresso, métodos filtrados y bebidas de temporada preparadas con granos mexicanos de origen.",
    },
    {
      title: "Brunch artesanal",
      description: "Opciones frescas preparadas al momento, incluyendo chilaquiles, pan francés y bowls saludables.",
    },
    {
      title: "Espacio coworking",
      description: "Área cómoda con WiFi de alta velocidad, enchufes y ambiente tranquilo para trabajar o estudiar.",
    },
    {
      title: "Eventos privados",
      description: "Reservaciones para reuniones, talleres y celebraciones pequeñas con servicio personalizado.",
    },
    {
      title: "Coffee catering",
      description: "Barra móvil de café para eventos corporativos, bodas y activaciones de marca.",
    },
  ] as BusinessService[],
}
