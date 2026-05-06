import type { Order } from "@/types";
import { mockFamilies } from "./families";
import {
  trackingEvents001,
  trackingEvents002,
  trackingEvents003,
  trackingEvents004,
  trackingEvents005,
  trackingEvents006,
  trackingEvents007,
  trackingEvents008,
} from "./tracking-events";

export const mockOrders: Order[] = [
  // 1. EN TRÁNSITO (showcase principal del tracking)
  {
    id: "ord_001",
    number: "YUM-2025-001234",
    status: "shipped",
    createdAt: "2025-05-03T10:32:00Z",
    estimatedDelivery: "2025-05-12",
    recipient: mockFamilies[0],
    items: [
      {
        productId: "p_alim_001",
        productName: "Arroz de Grano Largo",
        productImage:
          "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400",
        variant: "10 lb",
        quantity: 1,
        unitPrice: 15.99,
      },
      {
        productId: "p_alim_002",
        productName: "Pollo Entero Congelado",
        productImage:
          "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400",
        variant: "Aprox. 4 lb",
        quantity: 1,
        unitPrice: 22.99,
      },
      {
        productId: "p_alim_003",
        productName: "Aceite de Soya 1 Galón",
        productImage:
          "https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400",
        quantity: 1,
        unitPrice: 12.99,
      },
    ],
    subtotal: 51.97,
    shipping: 8.99,
    total: 60.96,
    currency: "USD",
    payment: { method: "card", last4: "4242", brand: "visa" },
    trackingEvents: trackingEvents001,
    publicTrackingId: "pub_a3f5g7h9",
  },

  // 2. ENTREGADO (tracking completo con foto del destinatario)
  {
    id: "ord_002",
    number: "YUM-2025-001210",
    status: "delivered",
    createdAt: "2025-04-15T14:22:00Z",
    estimatedDelivery: "2025-04-22",
    recipient: mockFamilies[1],
    items: [
      {
        productId: "combo_003",
        productName: "Combo Familiar Básico",
        productImage:
          "https://images.unsplash.com/photo-1542838132-92c53300491e?w=400",
        quantity: 1,
        unitPrice: 69.99,
      },
      {
        productId: "p_alim_041",
        productName: "Café La Llave 10 oz",
        productImage:
          "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400",
        quantity: 2,
        unitPrice: 7.99,
      },
    ],
    subtotal: 85.97,
    shipping: 8.99,
    total: 94.96,
    currency: "USD",
    payment: { method: "card", last4: "4242", brand: "visa" },
    trackingEvents: trackingEvents002,
    publicTrackingId: "pub_b4g6h8i0",
  },

  // 3. EN REPARTO
  {
    id: "ord_003",
    number: "YUM-2025-001225",
    status: "out-for-delivery",
    createdAt: "2025-04-28T09:15:00Z",
    estimatedDelivery: "2025-05-05",
    recipient: mockFamilies[0],
    items: [
      {
        productId: "combo_001",
        productName: "Combo Apagón Ready",
        productImage:
          "https://images.unsplash.com/photo-1620677368158-32b078c1c000?w=400",
        quantity: 1,
        unitPrice: 890,
      },
    ],
    subtotal: 890,
    shipping: 18.99,
    total: 908.99,
    currency: "USD",
    payment: { method: "card", last4: "5555", brand: "mastercard" },
    trackingEvents: trackingEvents003,
    publicTrackingId: "pub_c5h7i9j1",
  },

  // 4. EN ADUANA
  {
    id: "ord_004",
    number: "YUM-2025-001231",
    status: "in-customs",
    createdAt: "2025-04-30T11:00:00Z",
    estimatedDelivery: "2025-05-08",
    recipient: mockFamilies[2],
    items: [
      {
        productId: "p_elec_011",
        productName: "Microondas Panasonic 0.7 cu ft",
        productImage:
          "https://images.unsplash.com/photo-1574269910231-bc508bcb43e8?w=400",
        quantity: 1,
        unitPrice: 129,
      },
    ],
    subtotal: 129,
    shipping: 18.99,
    total: 147.99,
    currency: "USD",
    payment: { method: "card", last4: "4242", brand: "visa" },
    trackingEvents: trackingEvents004,
    publicTrackingId: "pub_d6i8j0k2",
  },

  // 5. PREPARANDO
  {
    id: "ord_005",
    number: "YUM-2025-001240",
    status: "preparing",
    createdAt: "2025-05-04T16:45:00Z",
    estimatedDelivery: "2025-05-13",
    recipient: mockFamilies[1],
    items: [
      {
        productId: "combo_006",
        productName: "Combo Mamá Diabética",
        productImage:
          "https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400",
        quantity: 1,
        unitPrice: 79.99,
      },
    ],
    subtotal: 79.99,
    shipping: 8.99,
    total: 88.98,
    currency: "USD",
    payment: { method: "card", last4: "4242", brand: "visa" },
    trackingEvents: trackingEvents005,
    publicTrackingId: "pub_e7j9k1l3",
  },

  // 6. ENTREGADO (Cumpleaños — con gift message)
  {
    id: "ord_006",
    number: "YUM-2025-001180",
    status: "delivered",
    createdAt: "2025-04-10T08:30:00Z",
    estimatedDelivery: "2025-04-17",
    recipient: mockFamilies[2],
    items: [
      {
        productId: "combo_007",
        productName: "Combo Cumpleaños",
        productImage:
          "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400",
        quantity: 1,
        unitPrice: 54.99,
      },
    ],
    subtotal: 54.99,
    shipping: 18.99,
    total: 73.98,
    currency: "USD",
    payment: { method: "card", last4: "4242", brand: "visa" },
    trackingEvents: trackingEvents006,
    publicTrackingId: "pub_f8k0l2m4",
    giftMessage: "Felicidades sobrina, te quiero mucho. Tía Yenny",
  },

  // 7. RECIÉN CREADO
  {
    id: "ord_007",
    number: "YUM-2025-001245",
    status: "pending",
    createdAt: "2025-05-05T08:00:00Z",
    estimatedDelivery: "2025-05-14",
    recipient: mockFamilies[0],
    items: [
      {
        productId: "p_elec_018",
        productName: 'Ventilador de Pie 18"',
        productImage:
          "https://images.unsplash.com/photo-1631545806609-a09e4b16d7d6?w=400",
        quantity: 1,
        unitPrice: 69.99,
      },
    ],
    subtotal: 69.99,
    shipping: 8.99,
    total: 78.98,
    currency: "USD",
    payment: { method: "card", last4: "4242", brand: "visa" },
    trackingEvents: trackingEvents007,
    publicTrackingId: "pub_g9l1m3n5",
  },

  // 8. ENTREGADO — moto eléctrica vía marítima
  {
    id: "ord_008",
    number: "YUM-2025-001120",
    status: "delivered",
    createdAt: "2025-03-15T10:00:00Z",
    estimatedDelivery: "2025-04-12",
    recipient: mockFamilies[2],
    items: [
      {
        productId: "p_veh_001",
        productName: "Moto Eléctrica Mishozuki Pro",
        productImage:
          "https://images.unsplash.com/photo-1558981852-426c6c22a060?w=400",
        variant: "Negro",
        quantity: 1,
        unitPrice: 1890,
      },
    ],
    subtotal: 1890,
    shipping: 4.99,
    total: 1894.99,
    currency: "USD",
    payment: { method: "card", last4: "4242", brand: "visa" },
    trackingEvents: trackingEvents008,
    publicTrackingId: "pub_h0m2n4o6",
  },
];

export function getOrderById(id: string): Order | undefined {
  return mockOrders.find((o) => o.id === id);
}

export function getOrderByPublicId(publicId: string): Order | undefined {
  return mockOrders.find((o) => o.publicTrackingId === publicId);
}
