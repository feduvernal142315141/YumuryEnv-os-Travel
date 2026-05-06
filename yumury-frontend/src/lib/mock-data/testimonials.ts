export type Testimonial = {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  productSent: string;
  quote: string;
  sentTo: string;
};

export const testimonials: Testimonial[] = [
  {
    id: "test_001",
    name: "Yusniel Rodríguez",
    location: "Miami, FL",
    avatar: "👨🏽",
    rating: 5,
    productSent: "Combo Familiar Premium",
    quote:
      "Llevaba un año buscando una agencia confiable. Yumury cambió todo. Mi mamá en Matanzas me llama emocionada cada vez que recibe un pedido. El tracking con fotos es algo que no tiene nadie más.",
    sentTo: "Mamá en Matanzas",
  },
  {
    id: "test_002",
    name: "Mariela González",
    location: "Tampa, FL",
    avatar: "👩🏽",
    rating: 5,
    productSent: "Refrigerador Mabe 350L",
    quote:
      "Le compré un refrigerador a mis abuelos. Llegó en 3 semanas como prometieron, y el equipo de Yumury hasta me llamó cuando lo entregaron. Cero estrés.",
    sentTo: "Abuelos en Cárdenas",
  },
  {
    id: "test_003",
    name: "Roberto Pérez",
    location: "Hialeah, FL",
    avatar: "👨🏽",
    rating: 5,
    productSent: "Combo Apagón Ready",
    quote:
      "Los apagones en Matanzas son brutales. Le mandé el EcoFlow a mi madre y desde entonces no se ha quejado más. Vale cada dólar invertido.",
    sentTo: "Madre en Cárdenas",
  },
  {
    id: "test_004",
    name: "Yamila Castro",
    location: "Madrid, España",
    avatar: "👩🏽",
    rating: 5,
    productSent: "Combo Mamá Diabética",
    quote:
      "Encontrar productos sin azúcar para enviar a Cuba era una pesadilla. El combo diabético de Yumury es perfecto. Mi mamá tiene productos que no se consiguen allá.",
    sentTo: "Mamá en Matanzas",
  },
  {
    id: "test_005",
    name: "Carlos Fernández",
    location: "Houston, TX",
    avatar: "👨🏽",
    rating: 5,
    productSent: "Moto Eléctrica Mishozuki Pro",
    quote:
      "Mi hermano necesitaba moverse para trabajar. La moto eléctrica llegó en 5 semanas, exactamente como dijeron. Sin sobrecostos sorpresa al final.",
    sentTo: "Hermano en Varadero",
  },
  {
    id: "test_006",
    name: "Yanet Suárez",
    location: "Miami, FL",
    avatar: "👩🏽",
    rating: 5,
    productSent: "Combo Cumpleaños",
    quote:
      "Hice una sorpresa de cumpleaños a mi sobrina con el combo. Cuando lo recibió me mandó un video llorando de la emoción. No tiene precio eso.",
    sentTo: "Sobrina en Cárdenas",
  },
  {
    id: "test_007",
    name: "Osvaldo Ramírez",
    location: "Newark, NJ",
    avatar: "👨🏽",
    rating: 5,
    productSent: "Combo Familiar Básico (mensual)",
    quote:
      'Cada mes le mando el combo familiar a mi madre. Es como una suscripción. Ella ya espera el día y todo el barrio sabe cuando "llega el de Yumury".',
    sentTo: "Madre en Matanzas",
  },
  {
    id: "test_008",
    name: "Lourdes Díaz",
    location: "Madrid, España",
    avatar: "👩🏽",
    rating: 5,
    productSent: "Combo Energía Solar Completo",
    quote:
      "Invertí en independencia energética para mis padres. Panel solar + EcoFlow. Ya no dependen de los apagones. La diferencia en su calidad de vida es enorme.",
    sentTo: "Padres en Jovellanos",
  },
  {
    id: "test_009",
    name: "Yoandri Pérez",
    location: "Las Vegas, NV",
    avatar: "👨🏽",
    rating: 5,
    productSent: "Combo Bebé",
    quote:
      "Mi sobrino acaba de nacer en Cárdenas. Le mando el combo bebé cada mes. Pampers de los buenos, todo. Mi cuñada está agradecidísima.",
    sentTo: "Sobrino recién nacido en Cárdenas",
  },
  {
    id: "test_010",
    name: "Belinda García",
    location: "Los Angeles, CA",
    avatar: "👩🏽",
    rating: 5,
    productSent: "Combo Aseo Personal (recurrente)",
    quote:
      "Lo más complicado en Cuba es el aseo personal de calidad. El combo de Yumury con marcas como Dove, Pantene, Pampers — eso le hacía una falta tremenda a mi familia.",
    sentTo: "Familia en Matanzas",
  },
];
