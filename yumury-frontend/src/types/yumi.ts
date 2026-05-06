export type YumiMessageRole = "user" | "assistant";

export type YumiMessage = {
  id: string;
  role: YumiMessageRole;
  content: string;
  /** ISO timestamp */
  timestamp: string;
  /** Slugs of products to embed inside the bubble */
  productSlugs?: string[];
  comboSlugs?: string[];
  suggestions?: string[];
};

export type YumiPattern = {
  id: string;
  keywords: string[];
  excludeKeywords?: string[];
  response: {
    text: string;
    /** Product slugs to recommend */
    products?: string[];
    combos?: string[];
    suggestions?: string[];
    followUp?: string;
  };
  /** Higher priority patterns are matched first when multiple match */
  priority?: number;
};
