import type { YumiPattern } from "@/types";

export const yumiPatterns: YumiPattern[] = [
  {
    id: "saludo",
    keywords: ["hola", "hey", "buenos dias", "buenos días", "buenas", "qué tal", "que tal"],
    response: {
      text: "¡Hola! 👋 Soy Yumi, tu asistente para armar envíos a Matanzas. Cuéntame qué necesitas y te ayudo a elegir.",
      suggestions: [
        "Tengo $80 para mi mamá",
        "Combo familiar para 4 personas",
        "Necesito un refrigerador",
        "Algo para los apagones",
      ],
    },
    priority: 1,
  },
  {
    id: "apagon",
    keywords: [
      "apagón",
      "apagon",
      "luz",
      "electricidad",
      "corte de luz",
      "sin energía",
      "sin luz",
      "corriente",
      "cortes",
    ],
    response: {
      text: "¡Tenemos el combo perfecto para los apagones! El **Combo Apagón Ready** ($890) incluye una estación EcoFlow Delta 1300, lámparas LED recargables, power bank y ventilador USB. Con eso tu familia tiene electricidad para iluminar, cargar celulares y refrescarse durante los cortes prolongados.",
      combos: ["combo-apagon-ready"],
      suggestions: [
        "Ver detalles del combo",
        "¿Hay algo más económico?",
        "¿Tienes paneles solares?",
        "Solo necesito una lámpara",
      ],
      followUp: "¿Te interesa este combo o prefieres opciones individuales?",
    },
    priority: 10,
  },
  {
    id: "solar",
    keywords: ["panel solar", "solar", "energía solar", "paneles", "autónomo", "independiente"],
    response: {
      text: "Para independencia energética total te recomiendo el **Combo Energía Solar Completo** ($1,290). Incluye un panel solar de 400W + EcoFlow Delta 1300 + accesorios de instalación. Tu familia genera su propia electricidad y se olvida de los apagones para siempre.",
      combos: ["combo-energia-solar"],
      products: ["panel-solar-400w", "panel-solar-200w"],
      suggestions: [
        "Ver el combo solar",
        "Solo el panel",
        "Combo más simple para apagones",
      ],
    },
    priority: 9,
  },
  {
    id: "diabetico",
    keywords: ["diabét", "diabetic", "sin azúcar", "azúcar baja", "no puede azúcar"],
    response: {
      text: "Tenemos el **Combo Mamá Diabética** ($79.99) pensado especialmente para personas con diabetes. Incluye productos sin azúcar, avena integral, café descafeinado, endulzante natural y vegetales especiales.",
      combos: ["combo-mama-diabetica"],
      suggestions: [
        "Ver el combo",
        "¿Tienes algo para hipertensos?",
        "Productos individuales sin azúcar",
      ],
      followUp: "¿Quieres ver los detalles?",
    },
    priority: 9,
  },
  {
    id: "refrigerador",
    keywords: ["refrigerador", "nevera", "frigider", "fridge", "enfriar"],
    response: {
      text: "Tenemos varios refrigeradores. Para recomendarte el ideal, dime: ¿cuántas personas viven en la casa? y ¿prefieres compacto, mediano o grande?",
      products: [
        "refrigerador-royal-250l",
        "refrigerador-mabe-350l",
        "refrigerador-samsung-450l",
      ],
      suggestions: [
        "Mediano para 4 personas",
        "Compacto",
        "El más grande",
        "El más económico",
      ],
    },
    priority: 8,
  },
  {
    id: "cumpleanos",
    keywords: ["cumpleaños", "cumple", "birthday", "regalo", "sorpresa"],
    response: {
      text: "¡Qué lindo detalle! 🎂 Tengo el **Combo Cumpleaños** ($54.99) que incluye torta dulce, caramelos, decoración (globos, sombreros, pancarta) y un mensaje personalizado. Si me dices la edad y los gustos, puedo sugerirte algo más específico.",
      combos: ["combo-cumpleanos"],
      suggestions: [
        "Es para un niño",
        "Es para un adulto",
        "Es para una mujer",
        "Algo más premium",
      ],
    },
    priority: 8,
  },
  {
    id: "bebe",
    keywords: ["bebé", "bebe", "recién nacido", "pañales", "pampers", "baby"],
    response: {
      text: "Tenemos el **Combo Bebé** ($59.99) con pañales Pampers (talla seleccionable), toallitas, talco, aceite Johnson's, loción y shampoo de bebé. Todo lo esencial para el cuidado.",
      combos: ["combo-bebe"],
      products: ["panales-pampers"],
      suggestions: [
        "Ver el combo bebé",
        "Solo necesito pañales",
        "¿Qué talla recomiendas?",
      ],
    },
    priority: 8,
  },
  {
    id: "tiempo-envio",
    keywords: [
      "cuánto demora",
      "cuánto tarda",
      "cuándo llega",
      "tiempo de envío",
      "cuántos días",
      "tarda",
    ],
    response: {
      text: "Tenemos 3 opciones de envío a Matanzas:\n\n🚀 **Express** — 3-5 días — $18.99\n✓ **Estándar** — 5-7 días — $8.99\n🚢 **Marítimo** — 4-7 semanas — $4.99 (solo para envíos grandes)\n\nPara alimentos te recomiendo Estándar o Express. Para electrodomésticos grandes y motos, Marítimo es lo más económico.",
      suggestions: [
        "Necesito el express",
        "¿Cuál es para una moto?",
        "¿Cuándo llega a Cárdenas?",
      ],
    },
    priority: 7,
  },
  {
    id: "moto-electrica",
    keywords: ["moto eléctrica", "moto electrica", "scooter", "motoneta"],
    response: {
      text: "Tenemos varios modelos de motos eléctricas. La más popular es la **Mishozuki Pro** ($1,890) con 80km de autonomía. La **Avispa 350W** ($1,290) es la más económica. La **Premium 1500W** ($2,490) es la mejor para distancias largas.",
      products: [
        "moto-electrica-mishozuki-pro",
        "moto-electrica-avispa",
        "moto-electrica-premium-1500w",
      ],
      suggestions: ["La más económica", "La de mayor autonomía", "Quiero ver fotos"],
    },
    priority: 8,
  },
  {
    id: "moto-combustion",
    keywords: ["moto gasolina", "moto combustion", "motor", "cilindros", "cc"],
    response: {
      text: "Tenemos motos de combustión Honda, Suzuki y Yamaha. La **Honda 125cc** ($2,290) es la más confiable, la **Suzuki 150cc** ($2,690) la más potente, la **Yamaha 125cc** ($2,490) buen equilibrio. La económica es la **110cc** ($1,890).",
      products: [
        "moto-honda-125",
        "moto-suzuki-150",
        "moto-yamaha-125",
        "moto-economica-110",
      ],
      suggestions: ["La más confiable", "La más potente", "La más económica"],
    },
    priority: 8,
  },
  {
    id: "pollo",
    keywords: ["pollo", "chicken", "gallina"],
    response: {
      text: "Tenemos pollo en varias presentaciones: entero ($22.99), pechugas ($18.50), alas ($14.99), muslos ($13.99). Todos llegan congelados con cadena de frío garantizada.",
      products: ["pollo-entero-congelado", "pechuga-pollo", "alas-pollo", "muslos-pollo"],
      suggestions: ["Pollo entero", "Solo pechugas", "Combo con pollo"],
    },
    priority: 7,
  },
  {
    id: "arroz",
    keywords: ["arroz", "rice"],
    response: {
      text: "Tenemos arroz blanco de grano largo Mahatma ($8.99 por 5 lb, también en 10 y 20 lb) y arroz integral ($9.99). Si necesitas más cantidad, los combos familiares incluyen arroz.",
      products: ["arroz-grano-largo", "arroz-integral"],
      combos: ["combo-familiar-basico"],
      suggestions: ["Mejor el combo familiar", "20 libras de arroz", "Arroz integral"],
    },
    priority: 7,
  },
  {
    id: "economico",
    keywords: [
      "económico",
      "economico",
      "barato",
      "poco dinero",
      "presupuesto bajo",
      "low budget",
      "menos",
    ],
    response: {
      text: "Para algo económico te recomiendo el **Combo Familiar Básico** ($69.99) que incluye arroz, frijoles, aceite, pollo, picadillo, azúcar, sal y café. Le alcanza a una familia para varios días.",
      combos: ["combo-familiar-basico"],
      suggestions: ["Ver el combo", "Algo aún más simple", "Solo aseo personal"],
    },
    priority: 7,
  },
  {
    id: "presupuesto-80",
    keywords: ["$80", "80 dolares", "80 dólares", "tengo 80"],
    response: {
      text: "Con $80 tienes opciones excelentes. Te recomiendo:\n\n1. **Combo Familiar Básico** ($69.99) — la opción más completa\n2. **Combo Mamá Diabética** ($79.99) — si tu familiar es diabética\n3. **Combo Cumpleaños** ($54.99) + algunos extras\n\n¿Para quién es y qué necesita?",
      combos: ["combo-familiar-basico", "combo-mama-diabetica", "combo-cumpleanos"],
      suggestions: ["Es para mi mamá", "Es para varias personas", "Es para un cumpleaños"],
    },
    priority: 8,
  },
  {
    id: "garantia",
    keywords: ["garantía", "garantia", "seguro", "confianza", "estafa", "qué pasa si", "reembolso"],
    response: {
      text: "Tenemos **Garantía Yumury**: si tu pedido no llega, llega incompleto o llega dañado, te reembolsamos sin pelear. Además, tendrás tracking visual en tiempo real con fotos en cada etapa para que veas exactamente dónde está tu envío.",
      suggestions: ["¿Cómo funciona el tracking?", "Ver testimonios", "Empezar a comprar"],
    },
    priority: 6,
  },
  {
    id: "municipios",
    keywords: ["cárdenas", "cardenas", "varadero", "matanzas centro", "colón", "jovellanos", "jagüey"],
    response: {
      text: "Llegamos a los 14 municipios de Matanzas. Los tiempos varían: capital, Cárdenas y Varadero (5-7 días), municipios cercanos (6-8 días), municipios alejados como Ciénaga de Zapata, Calimete, Perico (7-9 días).",
      suggestions: ["Es para Cárdenas", "Es para Varadero", "Es para Colón"],
    },
    priority: 6,
  },
  {
    id: "aseo",
    keywords: ["aseo", "jabón", "champú", "pasta dental", "desodorante", "higiene"],
    response: {
      text: "Tenemos el **Combo Aseo Personal** ($42.99) con jabón Dove, pasta Colgate, champú Head & Shoulders, acondicionador, desodorantes y papel higiénico Charmin. Marcas reconocidas que les hacen mucha falta.",
      combos: ["combo-aseo-personal"],
      products: ["jabon-dove-paquete", "champu-hs", "pasta-colgate"],
      suggestions: ["Ver el combo de aseo", "Solo champú", "Combo de limpieza"],
    },
    priority: 7,
  },
  {
    id: "ciclon",
    keywords: ["ciclón", "ciclon", "huracán", "huracan", "tormenta", "emergencia"],
    response: {
      text: "Para temporada de ciclones tenemos el **Combo Ciclón Ready** ($145) con linterna, radio a baterías, velas, fósforos, agua embotellada, conservas y botiquín. Lo esencial para los primeros 5-7 días sin servicios.",
      combos: ["combo-ciclon-ready"],
      suggestions: ["Ver el combo", "Algo más completo", "Combo apagón también"],
    },
    priority: 9,
  },
  {
    id: "cafe",
    keywords: ["café", "cafe", "coffee"],
    response: {
      text: "Tenemos los dos cafés cubanos icónicos: **La Llave** ($7.99 por 10 oz) y **Bustelo** ($7.50 por 10 oz). Ambos tueste oscuro, molienda fina. Si quieres más cantidad, vienen en los combos familiares.",
      products: ["cafe-la-llave", "cafe-bustelo"],
      suggestions: ["La Llave", "Bustelo", "Combo con café"],
    },
    priority: 7,
  },
  {
    id: "gracias",
    keywords: ["gracias", "thanks", "thank you", "genial", "perfecto", "ok"],
    response: {
      text: "¡De nada! 😊 Si necesitas algo más, aquí estoy. ¿Quieres que te ayude con algo más o procedes con el pedido?",
      suggestions: ["Necesito algo más", "Ir al carrito", "Empezar de nuevo"],
    },
    priority: 5,
  },
];

export const yumiFallback = {
  text: "Cuéntame un poco más sobre lo que buscas. Por ejemplo: a quién le envías, qué presupuesto tienes, o si necesitas algo específico (comida, electrodoméstico, vehículo).",
  suggestions: [
    "Tengo un presupuesto de $X",
    "Es para mi mamá",
    "Necesito comida para la semana",
    "Quiero un electrodoméstico",
  ],
};

export function findYumiResponse(userMessage: string): YumiPattern | null {
  const text = userMessage.toLowerCase();
  const sorted = [...yumiPatterns].sort((a, b) => (b.priority || 0) - (a.priority || 0));
  for (const pattern of sorted) {
    const hasMatch = pattern.keywords.some((kw) => text.includes(kw.toLowerCase()));
    const hasExclusion = pattern.excludeKeywords?.some((kw) => text.includes(kw.toLowerCase()));
    if (hasMatch && !hasExclusion) {
      return pattern;
    }
  }
  return null;
}
