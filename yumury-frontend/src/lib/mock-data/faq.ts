export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export type FAQCategory = {
  id: string;
  name: string;
  /** Lucide icon name */
  icon: string;
  items: FAQItem[];
};

export const faqCategories: FAQCategory[] = [
  {
    id: "envios",
    name: "Envíos",
    icon: "Truck",
    items: [
      {
        id: "envio_1",
        question: "¿Cuánto demora un envío a Matanzas?",
        answer:
          "Depende del método: Estándar (5-7 días), Express (3-5 días), Marítimo (4-7 semanas) para envíos grandes como motos o electrodomésticos. Los tiempos pueden variar según el municipio destino.",
      },
      {
        id: "envio_2",
        question: "¿A qué municipios de Matanzas llegan?",
        answer:
          "Llegamos a los 14 municipios de la provincia: Matanzas (capital), Cárdenas, Varadero, Colón, Jovellanos, Pedro Betancourt, Jagüey Grande, Unión de Reyes, Ciénaga de Zapata, Limonar, Martí, Los Arabos, Perico y Calimete.",
      },
      {
        id: "envio_3",
        question: "¿Cuánto cuesta el envío?",
        answer:
          "El costo depende del método y el peso. Estándar ($8.99), Express ($18.99), Marítimo ($4.99 — el más económico para envíos grandes). El precio total se calcula en el checkout.",
      },
      {
        id: "envio_4",
        question: "¿Puedo enviar a varios familiares en un solo pedido?",
        answer:
          'Cada pedido se envía a un solo destinatario. Si necesitas enviar a varios familiares, crea pedidos separados. Con tu sistema de "Mis Familias" guardado, solo te toma segundos.',
      },
    ],
  },
  {
    id: "pagos",
    name: "Pagos",
    icon: "CreditCard",
    items: [
      {
        id: "pago_1",
        question: "¿Qué métodos de pago aceptan?",
        answer:
          "Aceptamos tarjetas de crédito y débito Visa, Mastercard y American Express. Procesamos los pagos de forma segura con Stripe.",
      },
      {
        id: "pago_2",
        question: "¿Es seguro pagar en Yumury?",
        answer:
          "Sí. Usamos Stripe, una de las pasarelas de pago más seguras del mundo. No almacenamos los datos de tu tarjeta en nuestros servidores.",
      },
      {
        id: "pago_3",
        question: "¿Cuándo se cobra el pago?",
        answer:
          "El pago se cobra al confirmar el pedido. Si por algún motivo no podemos procesar el envío, te reembolsamos automáticamente.",
      },
      {
        id: "pago_4",
        question: "¿Hay costos ocultos?",
        answer:
          "No. El precio que ves en el checkout es lo que pagas. Sin sobrecostos sorpresa, sin tarifas ocultas.",
      },
    ],
  },
  {
    id: "productos",
    name: "Productos",
    icon: "Package",
    items: [
      {
        id: "prod_1",
        question: "¿Los alimentos llegan en buen estado?",
        answer:
          "Sí. Los productos congelados (carnes, mariscos) viajan en cadena de frío garantizada. Los demás alimentos están empacados para resistir el viaje. Si algo llega en mal estado, lo reembolsamos.",
      },
      {
        id: "prod_2",
        question: "¿Tienen productos sin azúcar / para diabéticos?",
        answer:
          "Sí. Tenemos un Combo Mamá Diabética con productos especialmente seleccionados sin azúcar. También tenemos productos individuales aptos para diabéticos.",
      },
      {
        id: "prod_3",
        question: "¿Las motos tienen garantía?",
        answer:
          "Sí. Todas las motos eléctricas y de combustión tienen garantía del fabricante (1-2 años según el modelo). Si tienes problemas en Cuba, contáctanos y coordinamos.",
      },
      {
        id: "prod_4",
        question: "¿Puedo armar mi propio combo?",
        answer:
          "Por ahora ofrecemos combos pre-armados, pero puedes pedirle a Yumi (nuestro asistente IA) que te ayude a armar un envío personalizado con productos individuales.",
      },
    ],
  },
  {
    id: "tracking",
    name: "Tracking",
    icon: "MapPin",
    items: [
      {
        id: "track_1",
        question: "¿Cómo funciona el tracking?",
        answer:
          "Cada pedido tiene tracking visual en tiempo real. Ves cada etapa del proceso: confirmación, preparación en Miami (con foto), tránsito, llegada a Cuba, almacén Matanzas, reparto y entrega final. Recibes actualizaciones por email automáticamente.",
      },
      {
        id: "track_2",
        question: "¿Puedo compartir el tracking con mi familiar en Cuba?",
        answer:
          "Sí. Cada pedido tiene un link público que puedes compartir por WhatsApp con tu familiar para que vea el progreso del envío.",
      },
      {
        id: "track_3",
        question: "¿Recibo notificaciones cuando llega el pedido?",
        answer:
          "Sí. Te avisamos por email en cada cambio de estado importante. Tu familiar recibe SMS cuando el repartidor está en camino.",
      },
    ],
  },
  {
    id: "cuenta",
    name: "Mi Cuenta",
    icon: "User",
    items: [
      {
        id: "cta_1",
        question: '¿Qué son "Mis Familias"?',
        answer:
          "Es nuestro sistema único: guardas los datos de tus familiares (mamá, abuela, tíos) una sola vez y luego reordenas con un click. No tienes que volver a escribir direcciones, teléfonos o preferencias cada vez.",
      },
      {
        id: "cta_2",
        question: "¿Puedo guardar varias direcciones de un familiar?",
        answer:
          "Por ahora cada familiar tiene una dirección principal. Si tu familiar se muda, simplemente edita los datos.",
      },
      {
        id: "cta_3",
        question: "¿Puedo eliminar mi cuenta?",
        answer:
          "Sí. Desde Configuración > Eliminar cuenta. Recuerda que se borrarán también tus familias guardadas y el historial.",
      },
    ],
  },
  {
    id: "devoluciones",
    name: "Devoluciones",
    icon: "RefreshCw",
    items: [
      {
        id: "dev_1",
        question: "¿Qué pasa si mi pedido llega incompleto?",
        answer:
          "Tenemos Garantía Yumury: si llega incompleto, dañado o no llega, te reembolsamos sin pelear. Solo contáctanos por email o WhatsApp con el número de pedido.",
      },
      {
        id: "dev_2",
        question: "¿Cuánto demora un reembolso?",
        answer:
          "Los reembolsos a tarjeta toman 3-5 días hábiles en aparecer en tu cuenta, dependiendo de tu banco.",
      },
      {
        id: "dev_3",
        question: "¿Puedo cancelar un pedido?",
        answer:
          'Puedes cancelar mientras esté en estado "Pendiente" o "Confirmado" (antes de empezar el empaque). Una vez en preparación o enviado, no se puede cancelar.',
      },
    ],
  },
];
