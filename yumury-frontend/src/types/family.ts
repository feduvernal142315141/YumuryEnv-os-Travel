export type Relationship =
  | "Madre"
  | "Padre"
  | "Hermano"
  | "Hermana"
  | "Tío"
  | "Tía"
  | "Abuelo"
  | "Abuela"
  | "Sobrino"
  | "Sobrina"
  | "Hijo"
  | "Hija"
  | "Esposo"
  | "Esposa"
  | "Amigo"
  | "Otro";

export type FamilyAddress = {
  street: string;
  number: string;
  between?: string;
  /** Slug of the Matanzas municipality */
  municipality: string;
  municipalityLabel: string;
  province: "Matanzas";
  reference?: string;
};

export type FamilyStats = {
  totalOrdersReceived: number;
  lastOrderDate?: string;
  /** USD */
  totalReceived: number;
};

export type Family = {
  id: string;
  alias: string;
  fullName: string;
  relationship: Relationship;
  age?: number;
  /** Emoji avatar */
  avatar: string;
  phone: string;
  altPhone?: string;
  address: FamilyAddress;
  /** ISO date */
  birthday?: string;
  preferences?: string[];
  alerts?: string[];
  notes?: string;
  stats?: FamilyStats;
  createdAt: string;
};
