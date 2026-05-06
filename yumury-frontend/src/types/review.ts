export type Review = {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  userLocation: string;
  /** 1-5 */
  rating: number;
  title: string;
  content: string;
  photos?: string[];
  date: string;
  helpful: number;
  verified: boolean;
};
