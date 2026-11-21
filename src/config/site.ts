export const site = {
  name: "Vida Animal",
  description:
    "Pet shop com banho, tosa, rações e cuidado para cães e gatos. Amor, carinho e cuidado em cada detalhe.",
  phoneDisplay: "(74) 98831-2804",
  whatsappPhone: "5574988312804",
  whatsappMessage: "Olá! Gostaria de agendar um atendimento na Vida Animal.",
  address: {
    street: "R. Tobias Barreto, 66 - Piranga",
    city: "Juazeiro - BA, 48900-070",
    query: "R. Tobias Barreto, 66 - Piranga, Juazeiro - BA, 48900-070",
  },
  hours: {
    days: "Seg a Sáb",
    time: "8h às 20h",
  },
  social: {
    instagram: "https://www.instagram.com/vidaanimaljua/",
    facebook: "",
  },
} as const;

export const navItems = [
  { href: "#inicio", label: "Início" },
  { href: "#servicos", label: "Serviços" },
  { href: "#marcas", label: "Marcas" },
  { href: "#sobre", label: "Sobre Nós" },
  { href: "#galeria", label: "Galeria" },
  { href: "#dicas", label: "Dicas" },
  { href: "#contato", label: "Contato" },
] as const;

export const brands = [
  { name: "Golden", tone: "brand" },
  { name: "Nature", tone: "navy" },
  { name: "Premier", tone: "navy" },
  { name: "Royal Canin", tone: "brand" },
  { name: "Farmina", tone: "navy" },
  { name: "Fórmula Natural", tone: "brand" },
  { name: "Special Dog", tone: "navy" },
  { name: "Whiskas", tone: "brand" },
] as const;

export const services = [
  {
    title: "Banho e Tosa",
    description: "Beleza, higiene e muito carinho.",
    icon: "scissors",
    accent: "brand",
  },
  {
    title: "Vacinas e Medicamentos",
    description: "Proteção e saúde em todas as fases.",
    icon: "syringe",
    accent: "brand",
  },
  {
    title: "Rações",
    description: "Nutrição de qualidade para seu pet.",
    icon: "bowl",
    accent: "brand",
  },
  {
    title: "Cuidados Veterinários",
    description: "Acompanhamento e bem-estar sempre.",
    icon: "paw",
    accent: "sun",
  },
] as const;

export const gallery = [
  {
    src: "/images/galeria-banho.jpg",
    alt: "Cachorro no banho, com espuma na cabeça",
    width: 900,
    height: 675,
  },
  {
    src: "/images/galeria-laco.jpg",
    alt: "Cachorro pequeno com laço rosa",
    width: 900,
    height: 675,
  },
  {
    src: "/images/galeria-vet.jpg",
    alt: "Filhote sendo segurado com cuidado",
    width: 900,
    height: 675,
  },
  {
    src: "/images/galeria-descanso.jpg",
    alt: "Gato descansando em uma caminha",
    width: 900,
    height: 675,
  },
] as const;

export const tips = [
  {
    title: "Água fresca por perto",
    description:
      "Troque a água ao longo do dia e deixe mais de um potinho em casa, principalmente no calor.",
  },
  {
    title: "Escovação sem pressa",
    description:
      "Poucos minutos de escovação deixam o pelo mais confortável e transformam o cuidado em um momento calmo.",
  },
  {
    title: "Rotina que o pet entende",
    description:
      "Horários parecidos de comida, descanso e passeio ajudam o animal a se sentir seguro.",
  },
] as const;

export const about = {
  title: "Sobre a Vida Animal",
  lead: "Somos um pet shop apaixonado por animais e comprometido em oferecer o melhor cuidado para seu pet. Aqui, você encontra serviços de qualidade, produtos das melhores marcas e uma equipe preparada para atender com muito amor!",
  more: "O cuidado começa no jeito de receber: com calma, atenção ao temperamento de cada animal e carinho em cada detalhe do atendimento.",
} as const;
