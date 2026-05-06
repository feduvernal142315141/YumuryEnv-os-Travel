import type { Family } from "./family";
import type { TrackingEvent } from "./tracking";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "shipped"
  | "in-customs"
  | "in-warehouse"
  | "out-for-delivery"
  | "delivered"
  | "incident";

export type OrderItem = {
  productId: string;
  productName: string;
  productImage: string;
  variant?: string;
  quantity: number;
  unitPrice: number;
};

export type OrderPayment = {
  method: "card" | "paypal";
  last4?: string;
  brand?: "visa" | "mastercard" | "amex";
};

export type Order = {
  id: string;
  /** Human-friendly order number e.g. YUM-2025-001234 */
  number: string;
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
  recipient: Family;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount?: number;
  total: number;
  currency: "USD";
  trackingEvents: TrackingEvent[];
  payment: OrderPayment;
  giftMessage?: string;
  /** Hashed id used for the public shareable tracking URL */
  publicTrackingId: string;
};
