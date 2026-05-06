import type { OrderStatus } from "./order";

export type TrackingEvent = {
  id: string;
  status: OrderStatus;
  title: string;
  description: string;
  location: string;
  /** ISO date */
  timestamp: string;
  photo?: string;
  photoCaption?: string;
  isCompleted: boolean;
  isCurrent: boolean;
  /** True when the timestamp is a future estimate */
  estimated?: boolean;
};
