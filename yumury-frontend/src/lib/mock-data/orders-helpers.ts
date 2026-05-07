import { mockOrders } from "./orders";

export function getOrderById(id: string) {
  return mockOrders.find((o) => o.id === id);
}

export function getOrderByPublicId(publicId: string) {
  return mockOrders.find((o) => o.publicTrackingId === publicId);
}
