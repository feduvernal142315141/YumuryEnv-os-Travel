export type Municipality = {
  value: string;
  label: string;
  deliveryDays: string;
  population?: number;
};

export const matanzasMunicipalities: Municipality[] = [
  { value: "matanzas", label: "Matanzas (capital)", deliveryDays: "5-7", population: 152392 },
  { value: "cardenas", label: "Cárdenas", deliveryDays: "5-7", population: 103667 },
  { value: "varadero", label: "Varadero", deliveryDays: "5-7", population: 27170 },
  { value: "colon", label: "Colón", deliveryDays: "6-8", population: 68015 },
  { value: "jovellanos", label: "Jovellanos", deliveryDays: "6-8", population: 56321 },
  { value: "pedro-betancourt", label: "Pedro Betancourt", deliveryDays: "6-8", population: 28432 },
  { value: "jaguey-grande", label: "Jagüey Grande", deliveryDays: "7-9", population: 58108 },
  { value: "union-de-reyes", label: "Unión de Reyes", deliveryDays: "6-8", population: 36412 },
  { value: "cienaga-de-zapata", label: "Ciénaga de Zapata", deliveryDays: "7-9", population: 9135 },
  { value: "limonar", label: "Limonar", deliveryDays: "6-8", population: 27205 },
  { value: "marti", label: "Martí", deliveryDays: "7-9", population: 21872 },
  { value: "los-arabos", label: "Los Arabos", deliveryDays: "7-9", population: 23561 },
  { value: "perico", label: "Perico", deliveryDays: "7-9", population: 30821 },
  { value: "calimete", label: "Calimete", deliveryDays: "7-9", population: 28443 },
];

export function getMunicipalityByValue(value: string): Municipality | undefined {
  return matanzasMunicipalities.find((m) => m.value === value);
}
