export type User = {
  id: string;
  name: string;
  email: string;
  /** Emoji avatar */
  avatar: string;
  /** ISO date */
  joinedAt: string;
  totalOrders: number;
  /** USD */
  totalSpent: number;
};
