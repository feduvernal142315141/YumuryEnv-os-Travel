# 📦 Yumury — Mock Data Specification

> Especificación completa de TODOS los datos mock del demo. Nada debe parecer "lorem ipsum".

---

## 🎯 Filosofía del Mock Data

**Regla #1 — Realismo absoluto.** Nada debe parecer mock. Un usuario no técnico no debe distinguirlo de producción.

**Regla #2 — Variedad sobre repetición.** No "Producto 1", "Producto 2". Nombres reales, marcas creíbles, precios coherentes con el mercado real de envíos a Cuba.

**Regla #3 — Contexto cubano respetado.** Nombres de familias cubanos comunes, municipios reales de Matanzas, productos que realmente se envían a Cuba (basado en investigación de Katapulk, Supermarket23, DimeCuba).

**Regla #4 — Imágenes reales de Unsplash.** Para productos genéricos, usar URLs de Unsplash con queries específicos. Ejemplo: `https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800` (arroz). El demo debe verse premium con fotos profesionales.

---

## 📂 Estructura de Archivos

```
lib/mock-data/
├── categories.ts              # 4 categorías + subcategorías
├── municipalities.ts          # 14 municipios de Matanzas
├── products/
│   ├── alimentos.ts           # ~75 productos
│   ├── electrodomesticos.ts   # ~36 productos
│   ├── vehiculos.ts           # ~19 productos
│   └── index.ts               # Re-export consolidado
├── combos.ts                  # 15 combos curados
├── families.ts                # 3 familias mock del usuario logueado
├── orders.ts                  # 8 pedidos en distintos estados
├── tracking-events.ts         # Eventos de tracking por pedido
├── reviews.ts                 # 50 reviews variadas
├── testimonials.ts            # 10 testimonios para home
├── yumi-responses.ts          # Patterns de respuestas de Yumi
├── faq.ts                     # FAQ por categorías
├── user.ts                    # Mock user logueado
└── index.ts                   # Helpers y re-exports
```

---

## 🏗️ Tipos TypeScript

Crear estos tipos en `types/`:

### `types/category.ts`

```typescript
export type CategorySlug = 'alimentos' | 'combos' | 'electrodomesticos' | 'vehiculos';

export type Category = {
  id: string;
  slug: CategorySlug;
  name: string;
  description: string;
  shortDescription: string;
  image: string;
  icon: string;              // Nombre del icono Lucide
  color: string;             // Color brand asociado (hex)
  productCount: number;
  subcategories: Subcategory[];
  featured: boolean;
};

export type Subcategory = {
  id: string;
  slug: string;
  categorySlug: CategorySlug;
  name: string;
  description: string;
  image: string;
  productCount: number;
};
```

### `types/product.ts`

```typescript
import { CategorySlug } from './category';

export type ShippingType = 'standard' | 'express' | 'maritime';
export type StockLevel = 'high' | 'medium' | 'low' | 'out';

export type Product = {
  // Identificación
  id: string;
  slug: string;

  // Info básica
  name: string;
  description: string;          // 1-2 oraciones
  longDescription: string;      // Párrafo completo
  category: CategorySlug;
  subcategory: string;
  brand?: string;
  countryOfOrigin?: string;

  // Pricing
  price: number;                // En USD
  comparePrice?: number;        // Para mostrar descuento
  currency: 'USD';

  // Media
  thumbnail: string;
  images: ProductImage[];

  // Variantes
  variants?: ProductVariant[];

  // Specs
  specs?: ProductSpec[];

  // Inventario y envío
  inStock: boolean;
  stockLevel?: StockLevel;
  estimatedDelivery: string;    // "5-7 días", "2-3 semanas"
  shippingType: ShippingType;
  weight?: number;              // En kg

  // Marketing
  tags: string[];
  rating?: number;              // 0-5
  reviewCount?: number;
  featured?: boolean;
  isNew?: boolean;
  bestseller?: boolean;

  // Combo (si aplica)
  isCombo?: boolean;
  comboItems?: ComboItem[];
  comboTheme?: string;
  comboBadge?: string;
};

export type ProductImage = {
  url: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
};

export type ProductVariant = {
  id: string;
  name: string;                 // "5 lb", "Negro", "300L"
  type: 'weight' | 'size' | 'color' | 'model' | 'capacity';
  priceModifier: number;        // 0 si es base
  inStock: boolean;
  image?: string;
};

export type ProductSpec = {
  label: string;
  value: string;
  group?: string;
};

export type ComboItem = {
  productId?: string;
  name: string;
  quantity: number;
  unit: string;
  image?: string;
};
```

### `types/family.ts`

```typescript
export type Relationship =
  | 'Madre' | 'Padre' | 'Hermano' | 'Hermana'
  | 'Tío' | 'Tía' | 'Abuelo' | 'Abuela'
  | 'Sobrino' | 'Sobrina' | 'Hijo' | 'Hija'
  | 'Esposo' | 'Esposa' | 'Amigo' | 'Otro';

export type Family = {
  id: string;
  alias: string;              // "Mamá", "Tía Mercedes"
  fullName: string;
  relationship: Relationship;
  age?: number;
  avatar: string;             // Emoji
  phone: string;
  altPhone?: string;
  address: FamilyAddress;
  birthday?: string;          // ISO date
  preferences?: string[];
  alerts?: string[];          // "Diabético", "Hipertenso"
  notes?: string;
  stats?: FamilyStats;
  createdAt: string;
};

export type FamilyAddress = {
  street: string;
  number: string;
  between?: string;
  municipality: string;       // slug
  municipalityLabel: string;
  province: 'Matanzas';
  reference?: string;
};

export type FamilyStats = {
  totalOrdersReceived: number;
  lastOrderDate?: string;
  totalReceived: number;      // USD
};
```

### `types/order.ts`

```typescript
import { Family } from './family';

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'preparing'
  | 'shipped'
  | 'in-customs'
  | 'in-warehouse'
  | 'out-for-delivery'
  | 'delivered'
  | 'incident';

export type Order = {
  id: string;
  number: string;             // "YUM-2025-001234"
  status: OrderStatus;
  createdAt: string;
  estimatedDelivery: string;
  recipient: Family;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount?: number;
  total: number;
  currency: 'USD';
  trackingEvents: TrackingEvent[];
  payment: OrderPayment;
  giftMessage?: string;
  publicTrackingId: string;   // Para link compartible
};

export type OrderItem = {
  productId: string;
  productName: string;
  productImage: string;
  variant?: string;
  quantity: number;
  unitPrice: number;
};

export type OrderPayment = {
  method: 'card' | 'paypal';
  last4?: string;
  brand?: 'visa' | 'mastercard' | 'amex';
};
```

### `types/tracking.ts`

```typescript
import { OrderStatus } from './order';

export type TrackingEvent = {
  id: string;
  status: OrderStatus;
  title: string;
  description: string;
  location: string;
  timestamp: string;          // ISO date
  photo?: string;
  photoCaption?: string;
  isCompleted: boolean;
  isCurrent: boolean;
  estimated?: boolean;        // true si es fecha estimada
};
```

### `types/yumi.ts`

```typescript
export type YumiMessageRole = 'user' | 'assistant';

export type YumiMessage = {
  id: string;
  role: YumiMessageRole;
  content: string;
  timestamp: string;
  productSlugs?: string[];    // Productos a embeber en el mensaje
  comboSlugs?: string[];
  suggestions?: string[];
};

export type YumiPattern = {
  id: string;
  keywords: string[];
  excludeKeywords?: string[];
  response: {
    text: string;
    products?: string[];      // slugs
    combos?: string[];
    suggestions?: string[];
    followUp?: string;
  };
  priority?: number;
};
```

### `types/review.ts`

```typescript
export type Review = {
  id: string;
  productId: string;
  userName: string;
  userAvatar?: string;
  userLocation: string;
  rating: number;             // 1-5
  title: string;
  content: string;
  photos?: string[];
  date: string;
  helpful: number;
  verified: boolean;
};
```

### `types/user.ts`

```typescript
export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string;
  joinedAt: string;
  totalOrders: number;
  totalSpent: number;
};
```

---

## 🏷️ Categorías (`lib/mock-data/categories.ts`)

```typescript
import { Category } from '@/types/category';

export const categories: Category[] = [
  {
    id: 'cat_alimentos',
    slug: 'alimentos',
    name: 'Alimentos',
    description: 'Todo lo que tu familia necesita para llenar la despensa, desde básicos hasta especialidades.',
    shortDescription: 'Comida y aseo para el día a día',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=1200',
    icon: 'UtensilsCrossed',
    color: '#15803D',
    productCount: 75,
    featured: true,
    subcategories: [
      {
        id: 'sub_carnes',
        slug: 'carnes-y-pollo',
        categorySlug: 'alimentos',
        name: 'Carnes y Pollo',
        description: 'Pollo, cerdo, res, embutidos y mariscos congelados',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
        productCount: 15
      },
      {
        id: 'sub_granos',
        slug: 'granos',
        categorySlug: 'alimentos',
        name: 'Granos y Pastas',
        description: 'Arroz, frijoles, lentejas, espagueti y harinas',
        image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800',
        productCount: 12
      },
      {
        id: 'sub_aceites',
        slug: 'aceites-condimentos',
        categorySlug: 'alimentos',
        name: 'Aceites y Condimentos',
        description: 'Aceites, sal, azúcar, especias, café y salsas',
        image: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800',
        productCount: 14
      },
      {
        id: 'sub_lacteos',
        slug: 'lacteos',
        categorySlug: 'alimentos',
        name: 'Lácteos',
        description: 'Leche en polvo, condensada, quesos y mantequilla',
        image: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800',
        productCount: 12
      },
      {
        id: 'sub_conservas',
        slug: 'conservas',
        categorySlug: 'alimentos',
        name: 'Conservas y Enlatados',
        description: 'Atún, sardinas, jamoneta, vegetales y frutas en lata',
        image: 'https://images.unsplash.com/photo-1607612822681-2caa9d3da90e?w=800',
        productCount: 14
      },
      {
        id: 'sub_aseo',
        slug: 'aseo-personal',
        categorySlug: 'alimentos',
        name: 'Aseo Personal',
        description: 'Jabón, pasta dental, champú, desodorante y pañales',
        image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800',
        productCount: 13
      },
      {
        id: 'sub_limpieza',
        slug: 'limpieza',
        categorySlug: 'alimentos',
        name: 'Limpieza del Hogar',
        description: 'Detergente, cloro, papel higiénico y productos de limpieza',
        image: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800',
        productCount: 10
      }
    ]
  },
  {
    id: 'cat_combos',
    slug: 'combos',
    name: 'Combos',
    description: 'Combos pre-armados curados para cada ocasión. Pensados con propósito, no solo bulk.',
    shortDescription: 'Listos para enviar, sin pensar',
    image: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1200',
    icon: 'Package',
    color: '#EA8A1C',
    productCount: 15,
    featured: true,
    subcategories: [
      {
        id: 'sub_combos_basicos',
        slug: 'basicos',
        categorySlug: 'combos',
        name: 'Combos Básicos',
        description: 'Para enviar lo esencial sin complicaciones',
        image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
        productCount: 4
      },
      {
        id: 'sub_combos_familiares',
        slug: 'familiares',
        categorySlug: 'combos',
        name: 'Combos Familiares',
        description: 'Para alimentar familias completas',
        image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
        productCount: 4
      },
      {
        id: 'sub_combos_emergencia',
        slug: 'emergencia',
        categorySlug: 'combos',
        name: 'Combos Emergencia',
        description: 'Apagones, ciclones y situaciones críticas',
        image: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800',
        productCount: 3
      },
      {
        id: 'sub_combos_especiales',
        slug: 'especiales',
        categorySlug: 'combos',
        name: 'Combos Especiales',
        description: 'Cumpleaños, bebés, dietas especiales',
        image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800',
        productCount: 4
      }
    ]
  },
  {
    id: 'cat_electro',
    slug: 'electrodomesticos',
    name: 'Electrodomésticos',
    description: 'Calidad garantizada para hacer la vida más fácil en Matanzas. Refrigeración, cocina, climatización y energía.',
    shortDescription: 'Calidad que dura',
    image: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200',
    icon: 'Refrigerator',
    color: '#DC2626',
    productCount: 36,
    featured: true,
    subcategories: [
      {
        id: 'sub_refrig',
        slug: 'refrigeracion',
        categorySlug: 'electrodomesticos',
        name: 'Refrigeración',
        description: 'Refrigeradores, neveras y congeladores',
        image: 'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=800',
        productCount: 6
      },
      {
        id: 'sub_cocina',
        slug: 'cocina',
        categorySlug: 'electrodomesticos',
        name: 'Cocina',
        description: 'Hornillas, microondas, ollas eléctricas y cocinas',
        image: 'https://images.unsplash.com/photo-1556909195-d85075a0a96d?w=800',
        productCount: 8
      },
      {
        id: 'sub_clima',
        slug: 'climatizacion',
        categorySlug: 'electrodomesticos',
        name: 'Climatización',
        description: 'Aires acondicionados, ventiladores y climatizadores',
        image: 'https://images.unsplash.com/photo-1631545806609-a09e4b16d7d6?w=800',
        productCount: 6
      },
      {
        id: 'sub_energia',
        slug: 'energia',
        categorySlug: 'electrodomesticos',
        name: 'Energía',
        description: 'EcoFlow, paneles solares, generadores y baterías',
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
        productCount: 8
      },
      {
        id: 'sub_pequenos',
        slug: 'pequenos',
        categorySlug: 'electrodomesticos',
        name: 'Pequeños Electrodomésticos',
        description: 'Licuadoras, batidoras, planchas y más',
        image: 'https://images.unsplash.com/photo-1570222094114-d054a817e56b?w=800',
        productCount: 8
      }
    ]
  },
  {
    id: 'cat_vehiculos',
    slug: 'vehiculos',
    name: 'Vehículos',
    description: 'Movilidad para tu familia. Motos eléctricas, motos de combustión, bicicletas y repuestos.',
    shortDescription: 'Movilidad confiable',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=1200',
    icon: 'Bike',
    color: '#0F5F2E',
    productCount: 19,
    featured: true,
    subcategories: [
      {
        id: 'sub_motos_e',
        slug: 'motos-electricas',
        categorySlug: 'vehiculos',
        name: 'Motos Eléctricas',
        description: 'Motos eléctricas con autonomía de hasta 120 km',
        image: 'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800',
        productCount: 6
      },
      {
        id: 'sub_motos_c',
        slug: 'motos-combustion',
        categorySlug: 'vehiculos',
        name: 'Motos de Combustión',
        description: 'Motos de gasolina Honda, Suzuki, Yamaha',
        image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800',
        productCount: 4
      },
      {
        id: 'sub_bicis',
        slug: 'bicicletas-electricas',
        categorySlug: 'vehiculos',
        name: 'Bicicletas Eléctricas',
        description: 'E-bikes plegables, urbanas, de montaña y cargo',
        image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=800',
        productCount: 4
      },
      {
        id: 'sub_repuestos',
        slug: 'repuestos',
        categorySlug: 'vehiculos',
        name: 'Repuestos y Accesorios',
        description: 'Baterías, cargadores, cascos, llantas',
        image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800',
        productCount: 5
      }
    ]
  }
];

// Helpers
export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find(c => c.slug === slug);
}

export function getSubcategoryBySlug(categorySlug: string, subSlug: string) {
  const cat = getCategoryBySlug(categorySlug);
  return cat?.subcategories.find(s => s.slug === subSlug);
}
```

---

## 🗺️ Municipios de Matanzas (`lib/mock-data/municipalities.ts`)

```typescript
export type Municipality = {
  value: string;
  label: string;
  deliveryDays: string;
  population?: number;
};

export const matanzasMunicipalities: Municipality[] = [
  { value: 'matanzas', label: 'Matanzas (capital)', deliveryDays: '5-7' },
  { value: 'cardenas', label: 'Cárdenas', deliveryDays: '5-7' },
  { value: 'varadero', label: 'Varadero', deliveryDays: '5-7' },
  { value: 'colon', label: 'Colón', deliveryDays: '6-8' },
  { value: 'jovellanos', label: 'Jovellanos', deliveryDays: '6-8' },
  { value: 'pedro-betancourt', label: 'Pedro Betancourt', deliveryDays: '6-8' },
  { value: 'jaguey-grande', label: 'Jagüey Grande', deliveryDays: '7-9' },
  { value: 'union-de-reyes', label: 'Unión de Reyes', deliveryDays: '6-8' },
  { value: 'cienaga-de-zapata', label: 'Ciénaga de Zapata', deliveryDays: '7-9' },
  { value: 'limonar', label: 'Limonar', deliveryDays: '6-8' },
  { value: 'marti', label: 'Martí', deliveryDays: '7-9' },
  { value: 'los-arabos', label: 'Los Arabos', deliveryDays: '7-9' },
  { value: 'perico', label: 'Perico', deliveryDays: '7-9' },
  { value: 'calimete', label: 'Calimete', deliveryDays: '7-9' },
];

export function getMunicipalityByValue(value: string): Municipality | undefined {
  return matanzasMunicipalities.find(m => m.value === value);
}
```

---

## 🥗 Productos Alimentos (`lib/mock-data/products/alimentos.ts`)

> Total: 75 productos. Aquí están todos con la estructura completa. Para mantener legibilidad, presento 5 ejemplos completos detallados y luego el resto en formato compacto que el implementador completará siguiendo el mismo patrón.

### Ejemplos completos detallados (5)

```typescript
import { Product } from '@/types/product';

export const alimentos: Product[] = [
  // ============================================
  // GRANOS Y PASTAS
  // ============================================
  {
    id: 'p_alim_001',
    slug: 'arroz-grano-largo',
    name: 'Arroz de Grano Largo',
    description: 'Arroz blanco de grano largo, calidad premium, perfecto para el día a día.',
    longDescription: 'Arroz blanco de grano largo seleccionado, el grano que prefieren los cubanos. Cocción uniforme, granos sueltos y suaves. Empacado en bolsas de polietileno alimentario que mantienen la frescura. Producto fundamental de la dieta diaria, dura meses en buen estado.',
    category: 'alimentos',
    subcategory: 'granos',
    brand: 'Mahatma',
    countryOfOrigin: 'Estados Unidos',
    price: 8.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800', alt: 'Bolsa de arroz', width: 800, height: 800 },
      { url: 'https://images.unsplash.com/photo-1536304993881-ff6e9eefa2a6?w=800', alt: 'Arroz cocinado', width: 800, height: 800 }
    ],
    variants: [
      { id: 'v_001', name: '5 lb', type: 'weight', priceModifier: 0, inStock: true },
      { id: 'v_002', name: '10 lb', type: 'weight', priceModifier: 7, inStock: true },
      { id: 'v_003', name: '20 lb', type: 'weight', priceModifier: 14, inStock: true }
    ],
    specs: [
      { label: 'Tipo', value: 'Grano largo' },
      { label: 'Marca', value: 'Mahatma' },
      { label: 'Origen', value: 'USA' },
      { label: 'Conservación', value: 'Lugar fresco y seco' }
    ],
    inStock: true,
    stockLevel: 'high',
    estimatedDelivery: '5-7 días',
    shippingType: 'standard',
    weight: 2.27,
    tags: ['básico', 'grano', 'familiar', 'imprescindible'],
    rating: 4.8,
    reviewCount: 124,
    bestseller: true,
    featured: true
  },

  // ============================================
  // CARNES Y POLLO
  // ============================================
  {
    id: 'p_alim_002',
    slug: 'pollo-entero-congelado',
    name: 'Pollo Entero Congelado',
    description: 'Pollo entero fresco congelado, sin menudencias, listo para cocinar.',
    longDescription: 'Pollo entero seleccionado, criado en granjas certificadas, congelado al momento del despresado para preservar la frescura y los nutrientes. Sin menudencias, limpio y listo para cocinar. Llega a Matanzas en cadena de frío garantizada.',
    category: 'alimentos',
    subcategory: 'carnes-y-pollo',
    brand: 'Tyson',
    countryOfOrigin: 'Estados Unidos',
    price: 22.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=800', alt: 'Pollo entero', width: 800, height: 800 }
    ],
    variants: [
      { id: 'v_pollo_1', name: 'Aprox. 4 lb', type: 'weight', priceModifier: 0, inStock: true },
      { id: 'v_pollo_2', name: 'Aprox. 6 lb', type: 'weight', priceModifier: 9, inStock: true }
    ],
    specs: [
      { label: 'Tipo', value: 'Pollo entero sin menudencias' },
      { label: 'Estado', value: 'Congelado' },
      { label: 'Cadena de frío', value: 'Garantizada' },
      { label: 'Peso aprox.', value: '4 lb (1.8 kg)' }
    ],
    inStock: true,
    stockLevel: 'medium',
    estimatedDelivery: '5-7 días',
    shippingType: 'express',
    weight: 1.8,
    tags: ['carne', 'pollo', 'congelado', 'familiar'],
    rating: 4.7,
    reviewCount: 89,
    bestseller: true
  },

  // ============================================
  // ACEITES Y CONDIMENTOS
  // ============================================
  {
    id: 'p_alim_003',
    slug: 'aceite-soya-galon',
    name: 'Aceite de Soya 1 Galón',
    description: 'Aceite de soya puro, ideal para cocinar y freír.',
    longDescription: 'Aceite de soya 100% puro, refinado, perfecto para cualquier preparación culinaria. Botella de 1 galón (3.78L) que rinde por meses. Sin colesterol, sin grasas trans.',
    category: 'alimentos',
    subcategory: 'aceites-condimentos',
    brand: 'Crisco',
    countryOfOrigin: 'Estados Unidos',
    price: 12.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800', alt: 'Aceite de soya', width: 800, height: 800 }
    ],
    specs: [
      { label: 'Volumen', value: '1 galón (3.78L)' },
      { label: 'Tipo', value: 'Soya puro refinado' },
      { label: 'Sin', value: 'Colesterol ni grasas trans' }
    ],
    inStock: true,
    stockLevel: 'high',
    estimatedDelivery: '5-7 días',
    shippingType: 'standard',
    weight: 3.5,
    tags: ['aceite', 'cocina', 'básico'],
    rating: 4.6,
    reviewCount: 67,
    bestseller: true
  },

  // ============================================
  // LÁCTEOS
  // ============================================
  {
    id: 'p_alim_004',
    slug: 'leche-en-polvo-nido-5lb',
    name: 'Leche en Polvo Nido 5 lb',
    description: 'Leche en polvo entera Nido, calidad premium, larga duración.',
    longDescription: 'Leche en polvo entera Nido de Nestlé, fortificada con vitaminas A, C y D, y minerales esenciales. Bolsa de 5 lb (2.27 kg) que rinde aproximadamente 18 litros de leche reconstituida. Ideal para familias, dura meses sin refrigerar.',
    category: 'alimentos',
    subcategory: 'lacteos',
    brand: 'Nido (Nestlé)',
    countryOfOrigin: 'México',
    price: 32.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1628088062854-d1870b4553da?w=800', alt: 'Leche en polvo', width: 800, height: 800 }
    ],
    specs: [
      { label: 'Peso', value: '5 lb (2.27 kg)' },
      { label: 'Rinde', value: '~18 litros' },
      { label: 'Vitaminas', value: 'A, C, D + minerales' },
      { label: 'Conservación', value: 'Lugar fresco y seco' }
    ],
    inStock: true,
    stockLevel: 'medium',
    estimatedDelivery: '5-7 días',
    shippingType: 'standard',
    weight: 2.27,
    tags: ['lácteo', 'leche', 'familiar', 'premium'],
    rating: 4.9,
    reviewCount: 215,
    bestseller: true,
    featured: true
  },

  // ============================================
  // ASEO PERSONAL
  // ============================================
  {
    id: 'p_alim_005',
    slug: 'panales-pampers',
    name: 'Pañales Pampers Baby Dry',
    description: 'Pañales desechables Pampers, hasta 12 horas de protección.',
    longDescription: 'Pañales desechables Pampers Baby Dry con tecnología de absorción que mantiene al bebé seco hasta 12 horas. Ajuste cómodo y suave para la piel. Disponible en tallas 1 a 6.',
    category: 'alimentos',
    subcategory: 'aseo-personal',
    brand: 'Pampers',
    countryOfOrigin: 'Estados Unidos',
    price: 32.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1607000853019-fa39f1a90eb1?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1607000853019-fa39f1a90eb1?w=800', alt: 'Pañales Pampers', width: 800, height: 800 }
    ],
    variants: [
      { id: 'v_p_t1', name: 'Talla 1 (4-6 kg)', type: 'size', priceModifier: 0, inStock: true },
      { id: 'v_p_t2', name: 'Talla 2 (5-8 kg)', type: 'size', priceModifier: 0, inStock: true },
      { id: 'v_p_t3', name: 'Talla 3 (7-13 kg)', type: 'size', priceModifier: 2, inStock: true },
      { id: 'v_p_t4', name: 'Talla 4 (10-17 kg)', type: 'size', priceModifier: 4, inStock: true },
      { id: 'v_p_t5', name: 'Talla 5 (12+ kg)', type: 'size', priceModifier: 5, inStock: true },
      { id: 'v_p_t6', name: 'Talla 6 (16+ kg)', type: 'size', priceModifier: 6, inStock: false }
    ],
    specs: [
      { label: 'Marca', value: 'Pampers Baby Dry' },
      { label: 'Cantidad', value: '~80-120 pañales según talla' },
      { label: 'Protección', value: 'Hasta 12 horas' }
    ],
    inStock: true,
    stockLevel: 'high',
    estimatedDelivery: '5-7 días',
    shippingType: 'standard',
    weight: 4.5,
    tags: ['bebé', 'pañales', 'aseo'],
    rating: 4.9,
    reviewCount: 178,
    bestseller: true
  },

  // ============================================
  // AQUÍ CONTINÚAN LOS 70 PRODUCTOS RESTANTES
  // Siguiendo exactamente el mismo patrón de estructura
  // ============================================
];
```

### Lista completa de 75 productos a crear

> El implementador debe seguir la estructura completa de los 5 ejemplos arriba para CADA uno de estos productos. URL de imagen: usar Unsplash con query relevante.

#### Carnes y Pollo (15)

| ID | Slug | Nombre | Precio | Marca | Bestseller |
|----|------|--------|--------|-------|------------|
| p_alim_002 | pollo-entero-congelado | Pollo Entero Congelado | $22.99 | Tyson | ⭐ |
| p_alim_006 | pechuga-pollo | Pechuga de Pollo | $18.50 | Tyson | ⭐ |
| p_alim_007 | alas-pollo | Alas de Pollo | $14.99 | Tyson | |
| p_alim_008 | muslos-pollo | Muslos de Pollo | $13.99 | Perdue | |
| p_alim_009 | picadillo-res | Picadillo de Res | $19.99 | (genérica) | ⭐ |
| p_alim_010 | carne-molida-premium | Carne Molida Premium 80/20 | $24.99 | (genérica) | |
| p_alim_011 | masa-cerdo | Masa de Cerdo | $26.99 | (genérica) | ⭐ |
| p_alim_012 | costillas-cerdo | Costillas de Cerdo | $22.50 | (genérica) | |
| p_alim_013 | lomo-cerdo | Lomo de Cerdo | $25.99 | (genérica) | |
| p_alim_014 | jamon-lonchas | Jamón en Lonchas | $11.99 | Oscar Mayer | |
| p_alim_015 | chorizo-espanol | Chorizo Español | $13.50 | Goya | |
| p_alim_016 | salchichas-vienesas | Salchichas Vienesas | $7.99 | Bar-S | |
| p_alim_017 | camarones-congelados | Camarones Congelados | $18.99 | (genérica) | |
| p_alim_018 | pescado-filetes | Filetes de Pescado | $23.99 | (genérica) | |
| p_alim_019 | mariscos-mixtos | Mariscos Mixtos | $28.99 | (genérica) | |

Búsquedas de imagen Unsplash sugeridas: `chicken breast`, `chicken wings`, `pork`, `ground beef`, `frozen shrimp`, `fish fillet`, `seafood mix`, `ham slices`, `chorizo sausage`.

#### Granos y Pastas (12)

| ID | Slug | Nombre | Precio | Variantes |
|----|------|--------|--------|-----------|
| p_alim_001 | arroz-grano-largo | Arroz de Grano Largo | $8.99 | 5/10/20 lb |
| p_alim_020 | arroz-integral | Arroz Integral | $9.99 | 5 lb |
| p_alim_021 | frijoles-negros | Frijoles Negros | $7.50 | 5 lb |
| p_alim_022 | frijoles-colorados | Frijoles Colorados | $7.50 | 5 lb |
| p_alim_023 | frijoles-blancos | Frijoles Blancos | $7.99 | 5 lb |
| p_alim_024 | lentejas | Lentejas | $8.50 | 5 lb |
| p_alim_025 | garbanzos | Garbanzos | $8.99 | 5 lb |
| p_alim_026 | chicharo | Chícharo | $7.50 | 5 lb |
| p_alim_027 | espagueti-paquete | Espagueti Barilla (4 paquetes) | $5.99 | - |
| p_alim_028 | macarron-coditos | Macarrón Coditos | $4.99 | - |
| p_alim_029 | harina-trigo | Harina de Trigo | $6.99 | 5 lb |
| p_alim_030 | harina-maiz | Harina de Maíz | $6.50 | 5 lb |

#### Aceites y Condimentos (14)

| ID | Slug | Nombre | Precio |
|----|------|--------|--------|
| p_alim_003 | aceite-soya-galon | Aceite de Soya 1 Galón | $12.99 |
| p_alim_031 | aceite-oliva-extra-virgen | Aceite de Oliva Extra Virgen 1L | $14.99 |
| p_alim_032 | aceite-girasol | Aceite de Girasol 1L | $9.99 |
| p_alim_033 | sal-mesa | Sal de Mesa 5 lb | $3.99 |
| p_alim_034 | azucar-blanca | Azúcar Blanca 5 lb | $5.99 |
| p_alim_035 | azucar-morena | Azúcar Morena 3 lb | $5.50 |
| p_alim_036 | vinagre-blanco | Vinagre Blanco 1L | $4.50 |
| p_alim_037 | salsa-tomate | Salsa de Tomate (3 unidades) | $6.99 |
| p_alim_038 | mostaza | Mostaza | $4.99 |
| p_alim_039 | mayonesa-hellmanns | Mayonesa Hellmann's 30 oz | $7.50 |
| p_alim_040 | especias-mixtas | Kit Especias Mixtas | $14.99 |
| p_alim_041 | cafe-la-llave | Café La Llave 10 oz | $7.99 |
| p_alim_042 | cafe-bustelo | Café Bustelo 10 oz | $7.50 |
| p_alim_043 | te-bolsas-100 | Té en Bolsas (caja x100) | $5.99 |

#### Lácteos (12)

| ID | Slug | Nombre | Precio |
|----|------|--------|--------|
| p_alim_004 | leche-en-polvo-nido-5lb | Leche en Polvo Nido 5 lb | $32.99 |
| p_alim_044 | leche-polvo-familia | Leche en Polvo Familia 4 lb | $26.99 |
| p_alim_045 | leche-descremada-polvo | Leche Descremada en Polvo | $28.99 |
| p_alim_046 | leche-condensada-nestle | Leche Condensada Nestlé (caja x12) | $21.99 |
| p_alim_047 | leche-evaporada | Leche Evaporada (caja x12) | $18.99 |
| p_alim_048 | queso-amarillo | Queso Amarillo 3 lb | $19.99 |
| p_alim_049 | queso-blanco | Queso Blanco 2 lb | $15.99 |
| p_alim_050 | mantequilla | Mantequilla 3 lb | $14.99 |
| p_alim_051 | margarina | Margarina 2 lb | $9.99 |
| p_alim_052 | mantequilla-mani | Mantequilla de Maní 28 oz | $8.99 |
| p_alim_053 | dulce-de-leche | Dulce de Leche 1 lb | $7.50 |
| p_alim_054 | crema-leche | Crema de Leche | $6.99 |

#### Conservas (14)

| ID | Slug | Nombre | Precio |
|----|------|--------|--------|
| p_alim_055 | atun-aceite-caja | Atún en Aceite (caja x10) | $19.99 |
| p_alim_056 | atun-agua-caja | Atún en Agua (caja x10) | $18.99 |
| p_alim_057 | sardinas-aceite-caja | Sardinas en Aceite (caja x12) | $16.99 |
| p_alim_058 | jamoneta-caja | Jamoneta (caja x6) | $24.99 |
| p_alim_059 | salchichas-lata-caja | Salchichas en Lata (caja x12) | $17.99 |
| p_alim_060 | spam-original | Spam Original (caja x6) | $22.99 |
| p_alim_061 | vegetales-mixtos-caja | Vegetales Mixtos (caja x6) | $11.99 |
| p_alim_062 | arvejas-lata-caja | Arvejas en Lata (caja x6) | $9.99 |
| p_alim_063 | maiz-dulce-caja | Maíz Dulce (caja x6) | $10.99 |
| p_alim_064 | frijoles-lata-caja | Frijoles en Lata (caja x12) | $14.99 |
| p_alim_065 | duraznos-almibar | Duraznos en Almíbar (caja x6) | $13.99 |
| p_alim_066 | pina-almibar | Piña en Almíbar (caja x6) | $12.99 |
| p_alim_067 | mermelada-variada | Mermelada Variada (3 frascos) | $9.99 |
| p_alim_068 | pulpa-fruta-tropical | Pulpa de Fruta Tropical | $11.99 |

#### Aseo Personal (13)

| ID | Slug | Nombre | Precio |
|----|------|--------|--------|
| p_alim_069 | jabon-dove-paquete | Jabón Dove (paquete x6) | $12.99 |
| p_alim_070 | jabon-palmolive | Jabón Palmolive (paquete x10) | $11.99 |
| p_alim_071 | pasta-colgate | Pasta Dental Colgate (paquete x4) | $9.99 |
| p_alim_072 | pasta-crest | Pasta Dental Crest (paquete x4) | $10.99 |
| p_alim_073 | champu-hs | Champú Head & Shoulders 32 oz | $13.99 |
| p_alim_074 | champu-pantene | Champú Pantene 32 oz | $12.99 |
| p_alim_075 | acondicionador-pantene | Acondicionador Pantene 32 oz | $11.99 |
| p_alim_076 | desodorante-old-spice | Desodorante Old Spice (3 unidades) | $11.99 |
| p_alim_077 | desodorante-dove | Desodorante Dove (3 unidades) | $13.99 |
| p_alim_078 | toallas-always | Toallas Sanitarias Always (paquete x4) | $19.99 |
| p_alim_005 | panales-pampers | Pañales Pampers Baby Dry | $32.99 |
| p_alim_079 | papel-higienico-charmin | Papel Higiénico Charmin (paquete x12) | $14.99 |
| p_alim_080 | cuchillas-gillette | Cuchillas Gillette (10 unidades) | $18.99 |

#### Limpieza (10)

| ID | Slug | Nombre | Precio |
|----|------|--------|--------|
| p_alim_081 | detergente-tide | Detergente Tide 5 lb | $14.99 |
| p_alim_082 | detergente-ariel | Detergente Ariel 5 lb | $13.99 |
| p_alim_083 | cloro-clorox | Cloro Clorox 1 galón | $7.99 |
| p_alim_084 | jabon-fregar-dawn | Jabón de Fregar Dawn | $5.99 |
| p_alim_085 | esponjas-multiuso | Esponjas Multiuso (paquete x10) | $7.99 |
| p_alim_086 | escoba-recogedor | Escoba con Recogedor | $11.99 |
| p_alim_087 | trapeador-cubeta | Trapeador con Cubeta | $19.99 |
| p_alim_088 | ambientador-spray | Ambientador Spray (3 unidades) | $9.99 |
| p_alim_089 | papel-cocina | Papel de Cocina (paquete x6) | $11.99 |
| p_alim_090 | bolsas-basura | Bolsas de Basura (caja x100) | $14.99 |

---

## 🔌 Productos Electrodomésticos (`lib/mock-data/products/electrodomesticos.ts`)

> Total: 36 productos. 1 ejemplo completo + lista del resto.

### Ejemplo completo

```typescript
import { Product } from '@/types/product';

export const electrodomesticos: Product[] = [
  {
    id: 'p_elec_001',
    slug: 'ecoflow-delta-1300',
    name: 'EcoFlow Delta 1300 — Estación de Energía Portátil',
    description: 'La solución definitiva para los apagones. 1260 Wh, carga rápida y silenciosa.',
    longDescription: 'EcoFlow Delta 1300 es una estación de energía portátil con 1260 Wh de capacidad, suficiente para alimentar refrigerador, ventilador, lámparas, TV y cargar todos los dispositivos durante horas. Carga al 80% en solo 1 hora. 6 salidas AC + USB + USB-C. Ideal para enfrentar los apagones prolongados de Matanzas. Garantía de 2 años.',
    category: 'electrodomesticos',
    subcategory: 'energia',
    brand: 'EcoFlow',
    countryOfOrigin: 'China',
    price: 1099,
    comparePrice: 1299,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1620677368158-32b078c1c000?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1620677368158-32b078c1c000?w=800', alt: 'EcoFlow Delta 1300', width: 800, height: 800 }
    ],
    specs: [
      { label: 'Capacidad', value: '1260 Wh', group: 'Eléctrico' },
      { label: 'Salida AC', value: '1800W (3300W surge)', group: 'Eléctrico' },
      { label: 'Salidas', value: '6 AC + 2 USB-C + 4 USB-A', group: 'Conectividad' },
      { label: 'Tiempo de carga', value: '0-80% en 1 hora', group: 'Carga' },
      { label: 'Peso', value: '14 kg', group: 'Físico' },
      { label: 'Garantía', value: '2 años', group: 'Servicio' }
    ],
    inStock: true,
    stockLevel: 'medium',
    estimatedDelivery: '7-10 días',
    shippingType: 'express',
    weight: 14,
    tags: ['energía', 'apagón', 'EcoFlow', 'premium', 'imprescindible'],
    rating: 4.9,
    reviewCount: 87,
    bestseller: true,
    featured: true
  },
  // ... 35 productos restantes
];
```

### Lista completa de 36 productos

#### Refrigeración (6)

| ID | Slug | Nombre | Precio | Bestseller |
|----|------|--------|--------|------------|
| p_elec_002 | refrigerador-royal-250l | Refrigerador Royal 250L | $580 | |
| p_elec_003 | refrigerador-mabe-350l | Refrigerador Mabe 350L | $890 | ⭐ |
| p_elec_004 | refrigerador-samsung-450l | Refrigerador Samsung 450L No-Frost | $1,290 | |
| p_elec_005 | nevera-compacta-90l | Nevera Compacta 90L | $320 | |
| p_elec_006 | congelador-horizontal-200l | Congelador Horizontal 200L | $620 | |
| p_elec_007 | refrigerador-solar-12v | Refrigerador Solar 12V 180L | $1,150 | |

#### Cocina (8)

| ID | Slug | Nombre | Precio |
|----|------|--------|--------|
| p_elec_008 | cocina-induccion-2 | Cocina de Inducción 2 Hornillas | $189 |
| p_elec_009 | cocina-electrica-4 | Cocina Eléctrica 4 Hornillas | $290 |
| p_elec_010 | cocina-gas-4 | Cocina de Gas 4 Hornillas | $349 |
| p_elec_011 | microondas-panasonic | Microondas Panasonic 0.7 cu ft | $129 |
| p_elec_012 | instant-pot | Olla Presión Eléctrica Instant Pot 6Q | $119 |
| p_elec_013 | olla-arrocera-aroma | Olla Arrocera Aroma 8 Tazas | $59 |
| p_elec_014 | sandwichera | Sandwichera/Plancha | $39.99 |
| p_elec_015 | tostadora-2-slice | Tostadora 2 Slices | $34.99 |

#### Climatización (6)

| ID | Slug | Nombre | Precio |
|----|------|--------|--------|
| p_elec_016 | aire-split-12000 | Aire Acondicionado Split 12,000 BTU | $590 |
| p_elec_017 | aire-ventana-8000 | Aire Acondicionado Ventana 8,000 BTU | $390 |
| p_elec_018 | ventilador-pie-18 | Ventilador de Pie 18" | $69.99 |
| p_elec_019 | ventilador-mesa-usb | Ventilador de Mesa USB Recargable | $39.99 |
| p_elec_020 | ventilador-techo-52 | Ventilador de Techo 52" | $129 |
| p_elec_021 | climatizador-portatil | Climatizador Portátil 3-en-1 | $189 |

#### Energía (8) ⭐ Sección clave

| ID | Slug | Nombre | Precio |
|----|------|--------|--------|
| p_elec_001 | ecoflow-delta-1300 | EcoFlow Delta 1300 | $1,099 |
| p_elec_022 | ecoflow-river-2 | EcoFlow River 2 (288 Wh) | $349 |
| p_elec_023 | ecoflow-delta-pro | EcoFlow Delta Pro 3.6 kWh | $2,890 |
| p_elec_024 | panel-solar-200w | Panel Solar 200W | $249 |
| p_elec_025 | panel-solar-400w | Panel Solar 400W | $429 |
| p_elec_026 | generador-inverter-2200w | Generador Inverter 2200W | $890 |
| p_elec_027 | power-bank-30000 | Power Bank 30,000 mAh | $59.99 |
| p_elec_028 | lampara-led-solar | Lámpara LED Recargable Solar | $24.99 |

#### Pequeños Electrodomésticos (8)

| ID | Slug | Nombre | Precio |
|----|------|--------|--------|
| p_elec_029 | licuadora-oster | Licuadora Oster 8 Velocidades | $59.99 |
| p_elec_030 | batidora-mano | Batidora de Mano | $34.99 |
| p_elec_031 | plancha-vapor | Plancha de Vapor | $44.99 |
| p_elec_032 | cafetera-electrica | Cafetera Eléctrica 12 Tazas | $49.99 |
| p_elec_033 | procesadora-alimentos | Procesadora de Alimentos | $79.99 |
| p_elec_034 | hervidora-electrica | Hervidora Eléctrica | $24.99 |
| p_elec_035 | aspiradora-compacta | Aspiradora Compacta | $89.99 |
| p_elec_036 | lavadora-portatil-5kg | Lavadora Portátil 5 kg | $290 |

---

## 🛵 Productos Vehículos (`lib/mock-data/products/vehiculos.ts`)

> Total: 19 productos. 1 ejemplo completo + lista.

### Ejemplo completo

```typescript
import { Product } from '@/types/product';

export const vehiculos: Product[] = [
  {
    id: 'p_veh_001',
    slug: 'moto-electrica-mishozuki-pro',
    name: 'Moto Eléctrica Mishozuki Pro',
    description: 'Moto eléctrica 60V con autonomía de 80 km. La más popular de Yumury.',
    longDescription: 'Moto eléctrica Mishozuki Pro con motor de 1500W, batería de litio de 60V/32Ah que ofrece hasta 80 km de autonomía por carga. Velocidad máxima 55 km/h. Asiento doble cómodo, frenos de disco delanteros y traseros, suspensión hidráulica, luces LED. Perfecta para Matanzas. Incluye cargador y manual. Llega vía marítima en 4-7 semanas.',
    category: 'vehiculos',
    subcategory: 'motos-electricas',
    brand: 'Mishozuki',
    countryOfOrigin: 'China',
    price: 1890,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=800', alt: 'Moto eléctrica Mishozuki Pro', width: 800, height: 800 }
    ],
    variants: [
      { id: 'v_mish_neg', name: 'Negro', type: 'color', priceModifier: 0, inStock: true },
      { id: 'v_mish_roj', name: 'Rojo', type: 'color', priceModifier: 0, inStock: true },
      { id: 'v_mish_azu', name: 'Azul', type: 'color', priceModifier: 0, inStock: false }
    ],
    specs: [
      { label: 'Motor', value: '1500W', group: 'Motor' },
      { label: 'Batería', value: '60V / 32Ah Litio', group: 'Motor' },
      { label: 'Autonomía', value: '80 km', group: 'Rendimiento' },
      { label: 'Velocidad máx.', value: '55 km/h', group: 'Rendimiento' },
      { label: 'Tiempo de carga', value: '6-8 horas', group: 'Carga' },
      { label: 'Frenos', value: 'Disco delantero y trasero', group: 'Seguridad' },
      { label: 'Suspensión', value: 'Hidráulica', group: 'Estructura' },
      { label: 'Capacidad', value: '2 personas', group: 'Estructura' },
      { label: 'Garantía', value: '1 año', group: 'Servicio' }
    ],
    inStock: true,
    stockLevel: 'low',
    estimatedDelivery: '4-7 semanas',
    shippingType: 'maritime',
    weight: 90,
    tags: ['moto', 'eléctrica', 'transporte', 'premium'],
    rating: 4.8,
    reviewCount: 56,
    bestseller: true,
    featured: true
  },
  // ... 18 más
];
```

### Lista completa de 19 productos

#### Motos Eléctricas (6)

| ID | Slug | Nombre | Precio |
|----|------|--------|--------|
| p_veh_001 | moto-electrica-mishozuki-pro | Moto Eléctrica Mishozuki Pro | $1,890 |
| p_veh_002 | moto-electrica-avispa | Moto Eléctrica Avispa 350W | $1,290 |
| p_veh_003 | moto-electrica-premium-1500w | Moto Eléctrica Premium 1500W | $2,490 |
| p_veh_004 | moto-electrica-scooter | Moto Eléctrica Scooter Urbana | $1,690 |
| p_veh_005 | moto-electrica-plegable | Moto Eléctrica Plegable Urbana | $1,190 |
| p_veh_006 | moto-electrica-offroad | Moto Eléctrica Off-road | $2,890 |

#### Motos de Combustión (4)

| ID | Slug | Nombre | Precio |
|----|------|--------|--------|
| p_veh_007 | moto-honda-125 | Moto Honda 125cc | $2,290 |
| p_veh_008 | moto-suzuki-150 | Moto Suzuki 150cc | $2,690 |
| p_veh_009 | moto-yamaha-125 | Moto Yamaha 125cc | $2,490 |
| p_veh_010 | moto-economica-110 | Moto Económica 110cc | $1,890 |

#### Bicicletas Eléctricas (4)

| ID | Slug | Nombre | Precio |
|----|------|--------|--------|
| p_veh_011 | bici-electrica-plegable | Bicicleta Eléctrica Plegable | $890 |
| p_veh_012 | bici-electrica-montana | Bicicleta Eléctrica de Montaña | $1,290 |
| p_veh_013 | bici-electrica-urbana | Bicicleta Eléctrica Urbana 26" | $990 |
| p_veh_014 | bici-electrica-cargo | Bicicleta Eléctrica Cargo | $1,490 |

#### Repuestos y Accesorios (5)

| ID | Slug | Nombre | Precio |
|----|------|--------|--------|
| p_veh_015 | bateria-litio-60v | Batería Litio 60V para Moto Eléctrica | $390 |
| p_veh_016 | cargador-universal-moto | Cargador Universal Moto Eléctrica | $89 |
| p_veh_017 | cascos-x2 | Cascos Certificados (2 unidades) | $79 |
| p_veh_018 | kit-llantas-camaras | Kit Llantas + Cámaras | $129 |
| p_veh_019 | espejos-manillares | Espejos y Manillares | $59 |

---

## 📦 Combos Curados (`lib/mock-data/combos.ts`)

15 combos completos con productos detallados:

```typescript
import { Product } from '@/types/product';

export const combos: Product[] = [
  // ============================================
  // 1. COMBO APAGÓN READY ⭐
  // ============================================
  {
    id: 'combo_001',
    slug: 'combo-apagon-ready',
    name: 'Combo Apagón Ready',
    description: 'Para los apagones largos. Energía, luz y aire para tu familia.',
    longDescription: 'Diseñado específicamente para enfrentar los cortes de electricidad prolongados que afectan a Matanzas. Una estación de energía portátil EcoFlow + lámparas LED recargables + ventilador USB + power bank que mantendrán a tu familia con luz, comunicación y refrescada hasta por 12 horas continuas. Una inversión que se nota desde el primer apagón.',
    category: 'combos',
    subcategory: 'emergencia',
    price: 890,
    comparePrice: 1010,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1620677368158-32b078c1c000?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1620677368158-32b078c1c000?w=800', alt: 'Combo Apagón Ready', width: 800, height: 800 }
    ],
    isCombo: true,
    comboTheme: 'apagon-ready',
    comboBadge: 'Apagón Ready',
    comboItems: [
      { name: 'Estación EcoFlow Delta 1300', quantity: 1, unit: 'unidad', productId: 'p_elec_001' },
      { name: 'Lámpara LED Recargable Solar', quantity: 2, unit: 'unidad', productId: 'p_elec_028' },
      { name: 'Power Bank 30,000 mAh', quantity: 1, unit: 'unidad', productId: 'p_elec_027' },
      { name: 'Ventilador USB Recargable', quantity: 1, unit: 'unidad', productId: 'p_elec_019' },
      { name: 'Linterna LED Potente', quantity: 1, unit: 'unidad' }
    ],
    inStock: true,
    stockLevel: 'medium',
    estimatedDelivery: '7-10 días',
    shippingType: 'express',
    weight: 18,
    tags: ['apagón', 'emergencia', 'energía', 'imprescindible'],
    rating: 4.9,
    reviewCount: 87,
    bestseller: true,
    featured: true
  },

  // ============================================
  // 2. COMBO CICLÓN READY
  // ============================================
  {
    id: 'combo_002',
    slug: 'combo-ciclon-ready',
    name: 'Combo Ciclón Ready',
    description: 'Para temporada de ciclones. Lo esencial para 5-7 días de emergencia.',
    longDescription: 'Combo de emergencia diseñado para la temporada ciclónica. Incluye linterna, radio a baterías para mantener comunicación, velas, fósforos, agua embotellada, conservas variadas y botiquín básico. Lo que tu familia necesita para esos primeros días críticos sin servicios.',
    category: 'combos',
    subcategory: 'emergencia',
    price: 145,
    comparePrice: 170,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1611273426858-450d8e3c9fce?w=800', alt: 'Combo Ciclón Ready', width: 800, height: 800 }
    ],
    isCombo: true,
    comboTheme: 'ciclon-ready',
    comboBadge: 'Ciclón Ready',
    comboItems: [
      { name: 'Linterna LED', quantity: 2, unit: 'unidad' },
      { name: 'Radio AM/FM a baterías', quantity: 1, unit: 'unidad' },
      { name: 'Velas grandes', quantity: 10, unit: 'unidad' },
      { name: 'Fósforos resistentes al agua', quantity: 5, unit: 'cajas' },
      { name: 'Agua embotellada', quantity: 1, unit: 'caja' },
      { name: 'Atún en lata', quantity: 6, unit: 'unidad' },
      { name: 'Galletas saladas', quantity: 4, unit: 'paquetes' },
      { name: 'Botiquín básico', quantity: 1, unit: 'unidad' }
    ],
    inStock: true,
    stockLevel: 'high',
    estimatedDelivery: '5-7 días',
    shippingType: 'express',
    weight: 12,
    tags: ['ciclón', 'emergencia', 'preparación'],
    rating: 4.8,
    reviewCount: 43,
    featured: true
  },

  // ============================================
  // 3. COMBO FAMILIAR BÁSICO ⭐ MÁS VENDIDO
  // ============================================
  {
    id: 'combo_003',
    slug: 'combo-familiar-basico',
    name: 'Combo Familiar Básico',
    description: 'Lo esencial para una familia. Comida básica para 1-2 semanas.',
    longDescription: 'El combo más popular de Yumury. Pensado para alimentar a una familia con productos básicos durante 1-2 semanas. Arroz, frijoles, aceite, pollo, picadillo, azúcar, sal y café — todo lo que se necesita para cocinar comidas completas. La opción más económica y completa.',
    category: 'combos',
    subcategory: 'familiares',
    price: 69.99,
    comparePrice: 84.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800', alt: 'Combo familiar básico', width: 800, height: 800 }
    ],
    isCombo: true,
    comboTheme: 'familiar-basico',
    comboBadge: 'Más vendido',
    comboItems: [
      { name: 'Arroz de grano largo', quantity: 10, unit: 'lb', productId: 'p_alim_001' },
      { name: 'Frijoles negros', quantity: 5, unit: 'lb', productId: 'p_alim_021' },
      { name: 'Aceite de soya', quantity: 1, unit: 'galón', productId: 'p_alim_003' },
      { name: 'Pollo entero congelado', quantity: 5, unit: 'lb', productId: 'p_alim_002' },
      { name: 'Picadillo de res', quantity: 3, unit: 'lb', productId: 'p_alim_009' },
      { name: 'Azúcar blanca', quantity: 4, unit: 'lb', productId: 'p_alim_034' },
      { name: 'Sal de mesa', quantity: 1, unit: 'paquete', productId: 'p_alim_033' },
      { name: 'Café La Llave', quantity: 1, unit: 'paquete', productId: 'p_alim_041' }
    ],
    inStock: true,
    stockLevel: 'high',
    estimatedDelivery: '5-7 días',
    shippingType: 'standard',
    weight: 25,
    tags: ['familiar', 'básico', 'alimentos', 'imprescindible', 'económico'],
    rating: 4.9,
    reviewCount: 234,
    bestseller: true,
    featured: true
  },

  // ============================================
  // 4. COMBO FAMILIAR PREMIUM
  // ============================================
  {
    id: 'combo_004',
    slug: 'combo-familiar-premium',
    name: 'Combo Familiar Premium',
    description: 'El familiar básico ampliado con carnes premium, lácteos y frutas.',
    longDescription: 'Para quien quiere ofrecerle lo mejor a su familia. Incluye todo del Familiar Básico más carne de cerdo, mariscos, lácteos premium, frutas y vegetales en conserva. Alimenta a una familia de 4-5 personas durante casi 3 semanas.',
    category: 'combos',
    subcategory: 'familiares',
    price: 129.99,
    comparePrice: 159.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800', alt: 'Combo familiar premium', width: 800, height: 800 }
    ],
    isCombo: true,
    comboTheme: 'familiar-premium',
    comboBadge: 'Premium',
    comboItems: [
      { name: 'Todo del Combo Familiar Básico', quantity: 1, unit: 'set' },
      { name: 'Carne de cerdo', quantity: 5, unit: 'lb' },
      { name: 'Mariscos surtidos', quantity: 3, unit: 'lb' },
      { name: 'Leche en polvo Nido', quantity: 1, unit: 'paquete' },
      { name: 'Queso amarillo', quantity: 2, unit: 'lb' },
      { name: 'Mantequilla', quantity: 1, unit: 'lb' },
      { name: 'Frutas en almíbar', quantity: 3, unit: 'frascos' },
      { name: 'Vegetales mixtos', quantity: 4, unit: 'latas' }
    ],
    inStock: true,
    stockLevel: 'medium',
    estimatedDelivery: '5-7 días',
    shippingType: 'express',
    weight: 38,
    tags: ['familiar', 'premium', 'completo'],
    rating: 4.8,
    reviewCount: 124,
    featured: true
  },

  // ============================================
  // 5. COMBO FAMILIAR XL (1 MES)
  // ============================================
  {
    id: 'combo_005',
    slug: 'combo-familiar-xl',
    name: 'Combo Familiar XL — 1 Mes Completo',
    description: 'Despensa para un mes completo. Para familias de 4-6 personas.',
    longDescription: 'El combo más completo de Yumury. Despensa completa para un mes para una familia de 4-6 personas. Todo lo necesario: carnes variadas, granos en cantidad, aceites, lácteos, conservas, productos de aseo y limpieza. La opción ideal para enviar una sola vez al mes.',
    category: 'combos',
    subcategory: 'familiares',
    price: 189.99,
    comparePrice: 235,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800', alt: 'Combo familiar XL', width: 800, height: 800 }
    ],
    isCombo: true,
    comboTheme: 'familiar-xl',
    comboBadge: 'Despensa del mes',
    comboItems: [
      { name: 'Arroz', quantity: 20, unit: 'lb' },
      { name: 'Frijoles variados', quantity: 10, unit: 'lb' },
      { name: 'Pollo entero', quantity: 10, unit: 'lb' },
      { name: 'Carne de res molida', quantity: 5, unit: 'lb' },
      { name: 'Carne de cerdo', quantity: 5, unit: 'lb' },
      { name: 'Aceite', quantity: 2, unit: 'galones' },
      { name: 'Leche en polvo', quantity: 1, unit: 'paquete grande' },
      { name: 'Café', quantity: 2, unit: 'paquetes' },
      { name: 'Conservas variadas', quantity: 12, unit: 'unidades' },
      { name: 'Aseo personal básico', quantity: 1, unit: 'kit' },
      { name: 'Limpieza básica', quantity: 1, unit: 'kit' }
    ],
    inStock: true,
    stockLevel: 'medium',
    estimatedDelivery: '5-7 días',
    shippingType: 'standard',
    weight: 65,
    tags: ['familiar', 'mes completo', 'despensa', 'XL'],
    rating: 4.9,
    reviewCount: 89
  },

  // ============================================
  // 6. COMBO MAMÁ DIABÉTICA
  // ============================================
  {
    id: 'combo_006',
    slug: 'combo-mama-diabetica',
    name: 'Combo Mamá Diabética',
    description: 'Productos sin azúcar y aptos para diabéticos. Cuidado especial.',
    longDescription: 'Combo pensado especialmente para personas con diabetes. Incluye productos sin azúcar, avena integral, café descafeinado, endulzante natural (stevia), vegetales especiales, harinas integrales y proteínas magras. Cuida a quien más quieres con productos seleccionados.',
    category: 'combos',
    subcategory: 'especiales',
    price: 79.99,
    comparePrice: 95,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800', alt: 'Combo diabético', width: 800, height: 800 }
    ],
    isCombo: true,
    comboTheme: 'diabetica',
    comboBadge: 'Cuidado especial',
    comboItems: [
      { name: 'Avena integral', quantity: 3, unit: 'lb' },
      { name: 'Pechuga de pollo', quantity: 3, unit: 'lb' },
      { name: 'Stevia (endulzante natural)', quantity: 2, unit: 'paquetes' },
      { name: 'Café descafeinado', quantity: 1, unit: 'paquete' },
      { name: 'Pan integral', quantity: 2, unit: 'paquetes' },
      { name: 'Vegetales mixtos', quantity: 6, unit: 'latas' },
      { name: 'Aceite de oliva', quantity: 1, unit: 'litro' },
      { name: 'Mermelada sin azúcar', quantity: 1, unit: 'frasco' },
      { name: 'Galletas integrales', quantity: 2, unit: 'paquetes' }
    ],
    inStock: true,
    stockLevel: 'medium',
    estimatedDelivery: '5-7 días',
    shippingType: 'standard',
    weight: 14,
    tags: ['diabético', 'sin azúcar', 'especial', 'cuidado'],
    rating: 4.9,
    reviewCount: 67,
    featured: true
  },

  // ============================================
  // 7. COMBO CUMPLEAÑOS
  // ============================================
  {
    id: 'combo_007',
    slug: 'combo-cumpleanos',
    name: 'Combo Cumpleaños',
    description: 'Sorprende con un cumpleaños completo. Torta, dulces y decoración.',
    longDescription: 'Hace que el cumpleaños de tu familiar sea especial sin importar la distancia. Incluye torta dulce, caramelos surtidos, decoración (globos, sombreros, pancarta de Feliz Cumpleaños), velas, y un mensaje personalizado escrito a mano por el equipo de Yumury que se entrega con el combo.',
    category: 'combos',
    subcategory: 'especiales',
    price: 54.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800', alt: 'Combo cumpleaños', width: 800, height: 800 }
    ],
    isCombo: true,
    comboTheme: 'cumpleanos',
    comboBadge: 'Especial',
    comboItems: [
      { name: 'Torta dulce', quantity: 1, unit: 'unidad' },
      { name: 'Caramelos surtidos', quantity: 2, unit: 'paquetes' },
      { name: 'Globos decorativos', quantity: 12, unit: 'unidad' },
      { name: 'Sombreros de fiesta', quantity: 6, unit: 'unidad' },
      { name: 'Pancarta Feliz Cumpleaños', quantity: 1, unit: 'unidad' },
      { name: 'Velas de cumpleaños', quantity: 1, unit: 'paquete' },
      { name: 'Mensaje personalizado', quantity: 1, unit: 'tarjeta' }
    ],
    inStock: true,
    stockLevel: 'high',
    estimatedDelivery: '5-7 días',
    shippingType: 'express',
    weight: 4,
    tags: ['cumpleaños', 'celebración', 'especial', 'regalo'],
    rating: 4.9,
    reviewCount: 156,
    featured: true
  },

  // ============================================
  // 8. COMBO ASEO PERSONAL
  // ============================================
  {
    id: 'combo_008',
    slug: 'combo-aseo-personal',
    name: 'Combo Aseo Personal',
    description: 'Productos de aseo para varios meses. Marcas reconocidas.',
    longDescription: 'Kit completo de aseo personal con marcas reconocidas. Jabones, pasta dental, champú, acondicionador, desodorantes y papel higiénico para que tu familia esté abastecida por meses.',
    category: 'combos',
    subcategory: 'basicos',
    price: 42.99,
    comparePrice: 52,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800', alt: 'Combo aseo personal', width: 800, height: 800 }
    ],
    isCombo: true,
    comboTheme: 'aseo',
    comboItems: [
      { name: 'Jabón Dove', quantity: 12, unit: 'unidad' },
      { name: 'Pasta dental Colgate', quantity: 4, unit: 'unidad' },
      { name: 'Champú Head & Shoulders', quantity: 1, unit: 'botella' },
      { name: 'Acondicionador Pantene', quantity: 1, unit: 'botella' },
      { name: 'Desodorante Old Spice', quantity: 3, unit: 'unidad' },
      { name: 'Toallas sanitarias Always', quantity: 1, unit: 'paquete' },
      { name: 'Papel higiénico Charmin', quantity: 12, unit: 'rollos' }
    ],
    inStock: true,
    stockLevel: 'high',
    estimatedDelivery: '5-7 días',
    shippingType: 'standard',
    weight: 8,
    tags: ['aseo', 'personal', 'familiar'],
    rating: 4.8,
    reviewCount: 178
  },

  // ============================================
  // 9. COMBO LIMPIEZA HOGAR
  // ============================================
  {
    id: 'combo_009',
    slug: 'combo-limpieza-hogar',
    name: 'Combo Limpieza del Hogar',
    description: 'Todo para mantener la casa limpia por meses.',
    longDescription: 'Kit de productos de limpieza con marcas confiables. Detergente, cloro, esponjas, jabón de fregar, ambientador y bolsas de basura. Suficiente para varios meses de limpieza profunda.',
    category: 'combos',
    subcategory: 'basicos',
    price: 39.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1583947215259-38e31be8751f?w=800', alt: 'Combo limpieza', width: 800, height: 800 }
    ],
    isCombo: true,
    comboTheme: 'limpieza',
    comboItems: [
      { name: 'Detergente Tide', quantity: 5, unit: 'lb' },
      { name: 'Cloro Clorox', quantity: 1, unit: 'galón' },
      { name: 'Esponjas multiuso', quantity: 10, unit: 'unidad' },
      { name: 'Jabón de fregar Dawn', quantity: 1, unit: 'botella' },
      { name: 'Ambientador spray', quantity: 3, unit: 'unidad' },
      { name: 'Bolsas de basura', quantity: 100, unit: 'unidad' },
      { name: 'Papel de cocina', quantity: 6, unit: 'rollos' }
    ],
    inStock: true,
    stockLevel: 'high',
    estimatedDelivery: '5-7 días',
    shippingType: 'standard',
    weight: 10,
    tags: ['limpieza', 'hogar', 'básico'],
    rating: 4.7,
    reviewCount: 94
  },

  // ============================================
  // 10. COMBO BEBÉ
  // ============================================
  {
    id: 'combo_010',
    slug: 'combo-bebe',
    name: 'Combo Bebé',
    description: 'Todo para el cuidado del bebé. Pañales, toallitas y aseo.',
    longDescription: 'Kit completo para el cuidado del bebé: pañales (talla seleccionable), toallitas húmedas, talco, aceite mineral, loción y shampoo de bebé. Marcas reconocidas como Pampers y Johnson\'s.',
    category: 'combos',
    subcategory: 'especiales',
    price: 59.99,
    comparePrice: 75,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1607000853019-fa39f1a90eb1?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1607000853019-fa39f1a90eb1?w=800', alt: 'Combo bebé', width: 800, height: 800 }
    ],
    isCombo: true,
    comboTheme: 'bebe',
    comboBadge: 'Para los más pequeños',
    variants: [
      { id: 'v_bebe_t1', name: 'Talla 1', type: 'size', priceModifier: 0, inStock: true },
      { id: 'v_bebe_t2', name: 'Talla 2', type: 'size', priceModifier: 0, inStock: true },
      { id: 'v_bebe_t3', name: 'Talla 3', type: 'size', priceModifier: 0, inStock: true },
      { id: 'v_bebe_t4', name: 'Talla 4', type: 'size', priceModifier: 3, inStock: true }
    ],
    comboItems: [
      { name: 'Pañales Pampers (talla seleccionada)', quantity: 1, unit: 'paquete' },
      { name: 'Toallitas húmedas', quantity: 4, unit: 'paquetes' },
      { name: 'Talco para bebé', quantity: 2, unit: 'unidad' },
      { name: 'Aceite mineral Johnson\'s', quantity: 1, unit: 'unidad' },
      { name: 'Loción Johnson\'s', quantity: 1, unit: 'unidad' },
      { name: 'Shampoo de bebé', quantity: 1, unit: 'unidad' }
    ],
    inStock: true,
    stockLevel: 'high',
    estimatedDelivery: '5-7 días',
    shippingType: 'standard',
    weight: 6,
    tags: ['bebé', 'pañales', 'especial'],
    rating: 4.9,
    reviewCount: 112
  },

  // ============================================
  // 11. COMBO COCINA ESENCIAL
  // ============================================
  {
    id: 'combo_011',
    slug: 'combo-cocina-esencial',
    name: 'Combo Cocina Esencial',
    description: 'Lo básico para empezar a cocinar bien.',
    longDescription: 'Kit de productos esenciales para una cocina bien surtida: aceite, sal, azúcar, vinagre, especias variadas, salsa de tomate, mayonesa, café y té. Lo que toda cocina cubana necesita.',
    category: 'combos',
    subcategory: 'basicos',
    price: 74.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800', alt: 'Combo cocina esencial', width: 800, height: 800 }
    ],
    isCombo: true,
    comboItems: [
      { name: 'Aceite de soya', quantity: 1, unit: 'galón' },
      { name: 'Sal', quantity: 5, unit: 'lb' },
      { name: 'Azúcar', quantity: 5, unit: 'lb' },
      { name: 'Vinagre blanco', quantity: 1, unit: 'litro' },
      { name: 'Kit de especias', quantity: 1, unit: 'set' },
      { name: 'Salsa de tomate', quantity: 3, unit: 'unidades' },
      { name: 'Mayonesa Hellmann\'s', quantity: 1, unit: 'pomo grande' },
      { name: 'Café La Llave', quantity: 2, unit: 'paquetes' },
      { name: 'Té en bolsas', quantity: 1, unit: 'caja' }
    ],
    inStock: true,
    stockLevel: 'high',
    estimatedDelivery: '5-7 días',
    shippingType: 'standard',
    weight: 16,
    tags: ['cocina', 'esencial', 'condimentos'],
    rating: 4.7,
    reviewCount: 78
  },

  // ============================================
  // 12. COMBO SOLO CARNES
  // ============================================
  {
    id: 'combo_012',
    slug: 'combo-solo-carnes',
    name: 'Combo Solo Carnes',
    description: 'Variedad de carnes premium congeladas. Para los que quieren proteína.',
    longDescription: 'Selección premium de carnes congeladas con cadena de frío garantizada. Pollo, res, cerdo, mariscos — todo lo necesario para una alimentación rica en proteínas durante semanas.',
    category: 'combos',
    subcategory: 'familiares',
    price: 89.99,
    comparePrice: 105,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800', alt: 'Combo carnes', width: 800, height: 800 }
    ],
    isCombo: true,
    comboTheme: 'carnes',
    comboItems: [
      { name: 'Pollo entero', quantity: 4, unit: 'lb' },
      { name: 'Pechuga de pollo', quantity: 3, unit: 'lb' },
      { name: 'Picadillo de res', quantity: 3, unit: 'lb' },
      { name: 'Masa de cerdo', quantity: 3, unit: 'lb' },
      { name: 'Camarones congelados', quantity: 1, unit: 'lb' },
      { name: 'Filetes de pescado', quantity: 2, unit: 'lb' }
    ],
    inStock: true,
    stockLevel: 'medium',
    estimatedDelivery: '5-7 días',
    shippingType: 'express',
    weight: 16,
    tags: ['carnes', 'proteína', 'congelado'],
    rating: 4.8,
    reviewCount: 67
  },

  // ============================================
  // 13. COMBO DESPENSA MES
  // ============================================
  {
    id: 'combo_013',
    slug: 'combo-despensa-mes',
    name: 'Combo Despensa del Mes',
    description: 'Despensa completa equivalente a un mes de comida.',
    longDescription: 'Despensa estratégicamente armada para 1 mes de comida para 2-3 personas. Granos, conservas, aceites, lácteos, café y conservas en cantidad suficiente para no preocuparse por comprar en un mes entero.',
    category: 'combos',
    subcategory: 'familiares',
    price: 159.99,
    comparePrice: 195,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=800', alt: 'Despensa del mes', width: 800, height: 800 }
    ],
    isCombo: true,
    comboTheme: 'despensa',
    comboBadge: 'Mes completo',
    comboItems: [
      { name: 'Arroz', quantity: 15, unit: 'lb' },
      { name: 'Frijoles negros', quantity: 5, unit: 'lb' },
      { name: 'Lentejas', quantity: 2, unit: 'lb' },
      { name: 'Aceite', quantity: 1, unit: 'galón' },
      { name: 'Leche en polvo', quantity: 1, unit: 'paquete grande' },
      { name: 'Café', quantity: 2, unit: 'paquetes' },
      { name: 'Atún', quantity: 1, unit: 'caja x10' },
      { name: 'Sardinas', quantity: 1, unit: 'caja x12' },
      { name: 'Vegetales mixtos en lata', quantity: 6, unit: 'unidades' },
      { name: 'Galletas saladas', quantity: 4, unit: 'paquetes' }
    ],
    inStock: true,
    stockLevel: 'medium',
    estimatedDelivery: '5-7 días',
    shippingType: 'standard',
    weight: 32,
    tags: ['despensa', 'mes', 'completo'],
    rating: 4.8,
    reviewCount: 53
  },

  // ============================================
  // 14. COMBO ENERGÍA SOLAR
  // ============================================
  {
    id: 'combo_014',
    slug: 'combo-energia-solar',
    name: 'Combo Energía Solar Completo',
    description: 'Solución solar autónoma. Panel + EcoFlow + accesorios.',
    longDescription: 'La solución más completa para independencia energética en Matanzas. Panel solar de 400W + EcoFlow Delta 1300 + cables, conectores y soporte de instalación. Genera tu propia electricidad y olvídate de los apagones para siempre.',
    category: 'combos',
    subcategory: 'emergencia',
    price: 1290,
    comparePrice: 1450,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=800', alt: 'Combo solar', width: 800, height: 800 }
    ],
    isCombo: true,
    comboTheme: 'solar',
    comboBadge: 'Solar Pro',
    comboItems: [
      { name: 'Panel Solar 400W', quantity: 1, unit: 'unidad', productId: 'p_elec_025' },
      { name: 'EcoFlow Delta 1300', quantity: 1, unit: 'unidad', productId: 'p_elec_001' },
      { name: 'Cables MC4', quantity: 1, unit: 'set' },
      { name: 'Conectores y adaptadores', quantity: 1, unit: 'kit' },
      { name: 'Soporte de instalación', quantity: 1, unit: 'unidad' },
      { name: 'Manual en español', quantity: 1, unit: 'unidad' }
    ],
    inStock: true,
    stockLevel: 'low',
    estimatedDelivery: '7-10 días',
    shippingType: 'express',
    weight: 35,
    tags: ['solar', 'energía', 'apagón', 'premium'],
    rating: 4.9,
    reviewCount: 32,
    featured: true
  },

  // ============================================
  // 15. COMBO ESTUDIANTE
  // ============================================
  {
    id: 'combo_015',
    slug: 'combo-estudiante',
    name: 'Combo Estudiante',
    description: 'Útiles escolares + snacks. Para estudiantes en Matanzas.',
    longDescription: 'Kit pensado para estudiantes: útiles escolares (libretas, lápices, bolígrafos, mochila), más snacks saludables y productos de aseo personal. Perfecto para enviar a sobrinos, hijos o cualquier estudiante.',
    category: 'combos',
    subcategory: 'especiales',
    price: 44.99,
    currency: 'USD',
    thumbnail: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800',
    images: [
      { url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800', alt: 'Combo estudiante', width: 800, height: 800 }
    ],
    isCombo: true,
    comboTheme: 'estudiante',
    comboItems: [
      { name: 'Libretas', quantity: 5, unit: 'unidad' },
      { name: 'Lápices y bolígrafos', quantity: 1, unit: 'kit' },
      { name: 'Mochila escolar', quantity: 1, unit: 'unidad' },
      { name: 'Calculadora', quantity: 1, unit: 'unidad' },
      { name: 'Snacks saludables variados', quantity: 1, unit: 'pack' },
      { name: 'Aseo personal básico', quantity: 1, unit: 'kit' }
    ],
    inStock: true,
    stockLevel: 'high',
    estimatedDelivery: '5-7 días',
    shippingType: 'standard',
    weight: 5,
    tags: ['estudiante', 'útiles', 'escolar'],
    rating: 4.7,
    reviewCount: 41
  }
];
```

---

## 👨‍👩‍👧 Familias Mock (`lib/mock-data/families.ts`)

```typescript
import { Family } from '@/types/family';

export const mockFamilies: Family[] = [
  {
    id: 'family_001',
    alias: 'Mamá Mercedes',
    fullName: 'Mercedes González Pérez',
    relationship: 'Madre',
    age: 67,
    avatar: '👵',
    phone: '+53 5234 5678',
    altPhone: '+53 4523 1234',
    address: {
      street: 'Calle 12',
      number: '234',
      between: 'entre 3ra y 5ta',
      municipality: 'cardenas',
      municipalityLabel: 'Cárdenas',
      province: 'Matanzas',
      reference: 'Casa azul a la izquierda del CUPET'
    },
    birthday: '1958-06-12',
    preferences: ['café', 'arroz', 'pollo', 'aseo personal'],
    alerts: ['Diabética'],
    notes: 'Le encanta el café fuerte. Prefiere productos sin azúcar.',
    stats: {
      totalOrdersReceived: 12,
      lastOrderDate: '2025-04-22',
      totalReceived: 567.89
    },
    createdAt: '2024-01-15T10:30:00Z'
  },
  {
    id: 'family_002',
    alias: 'Tío Pedro',
    fullName: 'Pedro Ramírez Castro',
    relationship: 'Tío',
    age: 72,
    avatar: '👴',
    phone: '+53 5345 6789',
    address: {
      street: 'Avenida 1ro de Mayo',
      number: '15',
      between: 'entre Maceo y Martí',
      municipality: 'matanzas',
      municipalityLabel: 'Matanzas (capital)',
      province: 'Matanzas',
      reference: 'Edificio amarillo, segundo piso'
    },
    birthday: '1953-09-08',
    preferences: ['conservas', 'café', 'limpieza'],
    alerts: ['Hipertenso'],
    notes: 'Vive solo, le mandamos productos básicos cada mes.',
    stats: {
      totalOrdersReceived: 8,
      lastOrderDate: '2025-04-15',
      totalReceived: 389.50
    },
    createdAt: '2024-02-20T14:15:00Z'
  },
  {
    id: 'family_003',
    alias: 'Sobrina Camila',
    fullName: 'Camila Fernández González',
    relationship: 'Sobrina',
    age: 24,
    avatar: '👧',
    phone: '+53 5456 7890',
    address: {
      street: 'Calle 23',
      number: '108',
      between: 'entre Avenida 1ra y 3ra',
      municipality: 'varadero',
      municipalityLabel: 'Varadero',
      province: 'Matanzas',
      reference: 'Cerca del hotel Iberostar'
    },
    birthday: '2001-11-30',
    preferences: ['aseo personal premium', 'comida especial', 'electrodomésticos'],
    alerts: [],
    notes: 'Trabaja en hotelería, le gustan productos de marca.',
    stats: {
      totalOrdersReceived: 5,
      lastOrderDate: '2025-03-28',
      totalReceived: 234.99
    },
    createdAt: '2024-05-10T09:00:00Z'
  }
];
```

---

## 📋 Pedidos Mock (`lib/mock-data/orders.ts`)

8 pedidos en distintos estados:

```typescript
import { Order } from '@/types/order';
import { mockFamilies } from './families';
import {
  trackingEvents001, trackingEvents002, trackingEvents003,
  trackingEvents004, trackingEvents005, trackingEvents006,
  trackingEvents007, trackingEvents008
} from './tracking-events';

export const mockOrders: Order[] = [
  // ============================================
  // 1. EN TRÁNSITO (showcase principal del tracking)
  // ============================================
  {
    id: 'ord_001',
    number: 'YUM-2025-001234',
    status: 'shipped',
    createdAt: '2025-05-03T10:32:00Z',
    estimatedDelivery: '2025-05-12',
    recipient: mockFamilies[0],
    items: [
      {
        productId: 'p_alim_001',
        productName: 'Arroz de Grano Largo',
        productImage: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?w=400',
        variant: '10 lb',
        quantity: 1,
        unitPrice: 15.99
      },
      {
        productId: 'p_alim_002',
        productName: 'Pollo Entero Congelado',
        productImage: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=400',
        variant: 'Aprox. 4 lb',
        quantity: 1,
        unitPrice: 22.99
      },
      {
        productId: 'p_alim_003',
        productName: 'Aceite de Soya 1 Galón',
        productImage: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400',
        quantity: 1,
        unitPrice: 12.99
      }
    ],
    subtotal: 51.97,
    shipping: 8.99,
    total: 60.96,
    currency: 'USD',
    payment: { method: 'card', last4: '4242', brand: 'visa' },
    trackingEvents: trackingEvents001,
    publicTrackingId: 'pub_a3f5g7h9'
  },

  // 2. ENTREGADO (muestra tracking completo con foto del destinatario)
  {
    id: 'ord_002',
    number: 'YUM-2025-001210',
    status: 'delivered',
    createdAt: '2025-04-15T14:22:00Z',
    estimatedDelivery: '2025-04-22',
    recipient: mockFamilies[1],
    items: [
      {
        productId: 'combo_003',
        productName: 'Combo Familiar Básico',
        productImage: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=400',
        quantity: 1,
        unitPrice: 69.99
      },
      {
        productId: 'p_alim_041',
        productName: 'Café La Llave 10 oz',
        productImage: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=400',
        quantity: 2,
        unitPrice: 7.99
      }
    ],
    subtotal: 85.97,
    shipping: 8.99,
    total: 94.96,
    currency: 'USD',
    payment: { method: 'card', last4: '4242', brand: 'visa' },
    trackingEvents: trackingEvents002,
    publicTrackingId: 'pub_b4g6h8i0'
  },

  // 3. EN REPARTO (out-for-delivery)
  {
    id: 'ord_003',
    number: 'YUM-2025-001225',
    status: 'out-for-delivery',
    createdAt: '2025-04-28T09:15:00Z',
    estimatedDelivery: '2025-05-05',
    recipient: mockFamilies[0],
    items: [
      {
        productId: 'combo_001',
        productName: 'Combo Apagón Ready',
        productImage: 'https://images.unsplash.com/photo-1620677368158-32b078c1c000?w=400',
        quantity: 1,
        unitPrice: 890
      }
    ],
    subtotal: 890,
    shipping: 18.99,
    total: 908.99,
    currency: 'USD',
    payment: { method: 'card', last4: '5555', brand: 'mastercard' },
    trackingEvents: trackingEvents003,
    publicTrackingId: 'pub_c5h7i9j1'
  },

  // 4. EN ADUANA
  {
    id: 'ord_004',
    number: 'YUM-2025-001231',
    status: 'in-customs',
    createdAt: '2025-04-30T11:00:00Z',
    estimatedDelivery: '2025-05-08',
    recipient: mockFamilies[2],
    items: [
      {
        productId: 'p_elec_011',
        productName: 'Microondas Panasonic 0.7 cu ft',
        productImage: 'https://images.unsplash.com/photo-1586035893364-7c7a3c8f4f4d?w=400',
        quantity: 1,
        unitPrice: 129
      }
    ],
    subtotal: 129,
    shipping: 18.99,
    total: 147.99,
    currency: 'USD',
    payment: { method: 'card', last4: '4242', brand: 'visa' },
    trackingEvents: trackingEvents004,
    publicTrackingId: 'pub_d6i8j0k2'
  },

  // 5. PREPARANDO
  {
    id: 'ord_005',
    number: 'YUM-2025-001240',
    status: 'preparing',
    createdAt: '2025-05-04T16:45:00Z',
    estimatedDelivery: '2025-05-13',
    recipient: mockFamilies[1],
    items: [
      {
        productId: 'combo_006',
        productName: 'Combo Mamá Diabética',
        productImage: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400',
        quantity: 1,
        unitPrice: 79.99
      }
    ],
    subtotal: 79.99,
    shipping: 8.99,
    total: 88.98,
    currency: 'USD',
    payment: { method: 'card', last4: '4242', brand: 'visa' },
    trackingEvents: trackingEvents005,
    publicTrackingId: 'pub_e7j9k1l3'
  },

  // 6. ENTREGADO (hace 2 semanas, segundo ejemplo de delivered)
  {
    id: 'ord_006',
    number: 'YUM-2025-001180',
    status: 'delivered',
    createdAt: '2025-04-10T08:30:00Z',
    estimatedDelivery: '2025-04-17',
    recipient: mockFamilies[2],
    items: [
      {
        productId: 'combo_007',
        productName: 'Combo Cumpleaños',
        productImage: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400',
        quantity: 1,
        unitPrice: 54.99
      }
    ],
    subtotal: 54.99,
    shipping: 18.99,
    total: 73.98,
    currency: 'USD',
    payment: { method: 'card', last4: '4242', brand: 'visa' },
    trackingEvents: trackingEvents006,
    publicTrackingId: 'pub_f8k0l2m4',
    giftMessage: 'Felicidades sobrina, te quiero mucho. Tía Yenny'
  },

  // 7. RECIÉN CREADO
  {
    id: 'ord_007',
    number: 'YUM-2025-001245',
    status: 'pending',
    createdAt: '2025-05-05T08:00:00Z',
    estimatedDelivery: '2025-05-14',
    recipient: mockFamilies[0],
    items: [
      {
        productId: 'p_elec_018',
        productName: 'Ventilador de Pie 18"',
        productImage: 'https://images.unsplash.com/photo-1631545806609-a09e4b16d7d6?w=400',
        quantity: 1,
        unitPrice: 69.99
      }
    ],
    subtotal: 69.99,
    shipping: 8.99,
    total: 78.98,
    currency: 'USD',
    payment: { method: 'card', last4: '4242', brand: 'visa' },
    trackingEvents: trackingEvents007,
    publicTrackingId: 'pub_g9l1m3n5'
  },

  // 8. ENTREGADO (envío grande - moto eléctrica)
  {
    id: 'ord_008',
    number: 'YUM-2025-001120',
    status: 'delivered',
    createdAt: '2025-03-15T10:00:00Z',
    estimatedDelivery: '2025-04-12',
    recipient: mockFamilies[2],
    items: [
      {
        productId: 'p_veh_001',
        productName: 'Moto Eléctrica Mishozuki Pro',
        productImage: 'https://images.unsplash.com/photo-1558981852-426c6c22a060?w=400',
        variant: 'Negro',
        quantity: 1,
        unitPrice: 1890
      }
    ],
    subtotal: 1890,
    shipping: 4.99,
    total: 1894.99,
    currency: 'USD',
    payment: { method: 'card', last4: '4242', brand: 'visa' },
    trackingEvents: trackingEvents008,
    publicTrackingId: 'pub_h0m2n4o6'
  }
];

// Helpers
export function getOrderById(id: string): Order | undefined {
  return mockOrders.find(o => o.id === id);
}

export function getOrderByPublicId(publicId: string): Order | undefined {
  return mockOrders.find(o => o.publicTrackingId === publicId);
}
```

---

## 🚚 Tracking Events (`lib/mock-data/tracking-events.ts`)

```typescript
import { TrackingEvent } from '@/types/tracking';

// ORDER 001 - SHIPPED (en tránsito) - Showcase principal
export const trackingEvents001: TrackingEvent[] = [
  {
    id: 'evt_001_1',
    status: 'pending',
    title: 'Pedido recibido',
    description: 'Hemos recibido tu pedido y estamos validando el pago.',
    location: 'Miami, FL',
    timestamp: '2025-05-03T10:32:00Z',
    isCompleted: true,
    isCurrent: false
  },
  {
    id: 'evt_001_2',
    status: 'confirmed',
    title: 'Pedido confirmado',
    description: 'Pago procesado correctamente. Empezamos a preparar tu pedido.',
    location: 'Miami, FL',
    timestamp: '2025-05-03T10:35:00Z',
    isCompleted: true,
    isCurrent: false
  },
  {
    id: 'evt_001_3',
    status: 'preparing',
    title: 'Preparando en almacén Miami',
    description: 'Tu pedido está siendo empacado con cuidado por nuestro equipo.',
    location: 'Miami, FL',
    timestamp: '2025-05-03T14:15:00Z',
    photo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600',
    photoCaption: 'Tu pedido empacado y listo para enviar',
    isCompleted: true,
    isCurrent: false
  },
  {
    id: 'evt_001_4',
    status: 'shipped',
    title: 'En tránsito hacia Cuba',
    description: 'Vuelo internacional MIA → HAV. Tu pedido viaja con prioridad.',
    location: 'Vuelo internacional',
    timestamp: '2025-05-03T18:00:00Z',
    isCompleted: true,
    isCurrent: true   // 👈 ESTADO ACTUAL
  },
  {
    id: 'evt_001_5',
    status: 'in-customs',
    title: 'En aduana cubana',
    description: 'Tu pedido está en proceso de despacho aduanal.',
    location: 'La Habana, Cuba',
    timestamp: '2025-05-04T11:00:00Z',
    isCompleted: false,
    isCurrent: false,
    estimated: true
  },
  {
    id: 'evt_001_6',
    status: 'in-warehouse',
    title: 'Llegada al almacén Matanzas',
    description: 'Tu pedido llegó a nuestro centro de distribución en Matanzas.',
    location: 'Matanzas, Cuba',
    timestamp: '2025-05-05T09:00:00Z',
    isCompleted: false,
    isCurrent: false,
    estimated: true
  },
  {
    id: 'evt_001_7',
    status: 'out-for-delivery',
    title: 'En reparto hacia Cárdenas',
    description: 'El repartidor está en camino a la dirección de tu familiar.',
    location: 'Cárdenas, Matanzas',
    timestamp: '2025-05-05T14:00:00Z',
    isCompleted: false,
    isCurrent: false,
    estimated: true
  },
  {
    id: 'evt_001_8',
    status: 'delivered',
    title: 'Entregado a Mamá Mercedes',
    description: 'Tu pedido fue entregado correctamente.',
    location: 'Cárdenas, Matanzas',
    timestamp: '2025-05-05T16:30:00Z',
    isCompleted: false,
    isCurrent: false,
    estimated: true
  }
];

// ORDER 002 - DELIVERED (todos los eventos completados, foto final)
export const trackingEvents002: TrackingEvent[] = [
  // ... todos los 8 eventos con isCompleted: true, isCurrent: false
  // último evento incluye foto del destinatario recibiendo:
  // photo: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600'
  // photoCaption: 'Tío Pedro recibió su pedido con éxito'
  {
    id: 'evt_002_1',
    status: 'pending',
    title: 'Pedido recibido',
    description: 'Hemos recibido tu pedido.',
    location: 'Miami, FL',
    timestamp: '2025-04-15T14:22:00Z',
    isCompleted: true,
    isCurrent: false
  },
  {
    id: 'evt_002_2',
    status: 'confirmed',
    title: 'Pedido confirmado',
    description: 'Pago procesado correctamente.',
    location: 'Miami, FL',
    timestamp: '2025-04-15T14:25:00Z',
    isCompleted: true,
    isCurrent: false
  },
  {
    id: 'evt_002_3',
    status: 'preparing',
    title: 'Preparando en almacén Miami',
    description: 'Pedido empacado.',
    location: 'Miami, FL',
    timestamp: '2025-04-15T17:00:00Z',
    photo: 'https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=600',
    photoCaption: 'Empacado en Miami',
    isCompleted: true,
    isCurrent: false
  },
  {
    id: 'evt_002_4',
    status: 'shipped',
    title: 'En tránsito hacia Cuba',
    description: 'Vuelo MIA → HAV.',
    location: 'Vuelo internacional',
    timestamp: '2025-04-16T08:00:00Z',
    isCompleted: true,
    isCurrent: false
  },
  {
    id: 'evt_002_5',
    status: 'in-customs',
    title: 'En aduana cubana',
    description: 'Despacho aduanal completado.',
    location: 'La Habana, Cuba',
    timestamp: '2025-04-17T13:00:00Z',
    isCompleted: true,
    isCurrent: false
  },
  {
    id: 'evt_002_6',
    status: 'in-warehouse',
    title: 'Llegada al almacén Matanzas',
    description: 'Recibido en centro de distribución.',
    location: 'Matanzas, Cuba',
    timestamp: '2025-04-19T10:00:00Z',
    photo: 'https://images.unsplash.com/photo-1605367898060-aff44dc2ed25?w=600',
    photoCaption: 'En el almacén de Matanzas',
    isCompleted: true,
    isCurrent: false
  },
  {
    id: 'evt_002_7',
    status: 'out-for-delivery',
    title: 'En reparto hacia Matanzas centro',
    description: 'Repartidor en camino.',
    location: 'Matanzas, Cuba',
    timestamp: '2025-04-21T09:30:00Z',
    isCompleted: true,
    isCurrent: false
  },
  {
    id: 'evt_002_8',
    status: 'delivered',
    title: 'Entregado a Tío Pedro',
    description: 'Pedido entregado con éxito. ¡Gracias por confiar en Yumury!',
    location: 'Matanzas, Cuba',
    timestamp: '2025-04-21T15:45:00Z',
    photo: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600',
    photoCaption: 'Tío Pedro recibió su pedido',
    isCompleted: true,
    isCurrent: false
  }
];

// ORDER 003 - OUT FOR DELIVERY (current = out-for-delivery)
export const trackingEvents003: TrackingEvent[] = [
  // 6 eventos completados, evento 7 (out-for-delivery) es current,
  // evento 8 (delivered) pendiente y estimado
  // ... estructura similar al 001 pero con current en evt 7
  // Por brevedad, replicar mismo patrón ajustando isCurrent
];

// ORDER 004 - IN CUSTOMS (current = in-customs)
export const trackingEvents004: TrackingEvent[] = [
  // 4 eventos completados (pending, confirmed, preparing, shipped),
  // evento 5 (in-customs) es current,
  // eventos 6-8 pendientes
];

// ORDER 005 - PREPARING (current = preparing)
export const trackingEvents005: TrackingEvent[] = [
  // 2 eventos completados (pending, confirmed),
  // evento 3 (preparing) es current,
  // eventos 4-8 pendientes
];

// ORDER 006 - DELIVERED (todos completados, sin foto al final - variante)
export const trackingEvents006: TrackingEvent[] = [
  // Mismo patrón que 002 pero sin foto de entrega (variante)
];

// ORDER 007 - PENDING (recién creado, solo evento 1 actual)
export const trackingEvents007: TrackingEvent[] = [
  {
    id: 'evt_007_1',
    status: 'pending',
    title: 'Pedido recibido',
    description: 'Hemos recibido tu pedido y estamos validando el pago.',
    location: 'Miami, FL',
    timestamp: '2025-05-05T08:00:00Z',
    isCompleted: false,
    isCurrent: true
  },
  // Resto pendientes y estimados
];

// ORDER 008 - DELIVERED (envío marítimo de moto eléctrica, ~4 semanas)
export const trackingEvents008: TrackingEvent[] = [
  // Tracking más largo con fechas espaciadas para reflejar envío marítimo
  // Showcase de un envío grande exitoso
];
```

> **Nota al implementador**: Crear los 8 arrays completos siguiendo el mismo patrón. Para que el demo se vea rico, asegurar que cada estado de pedido tiene su tracking acorde, mostrando diversidad visual en el timeline.

---

## 💬 Reviews (`lib/mock-data/reviews.ts`)

50 reviews variadas distribuidas entre productos populares:

```typescript
import { Review } from '@/types/review';

const cubanNames = [
  'Yusniel R.', 'Mariela G.', 'Roberto P.', 'Yamila C.', 'Carlos F.',
  'Yanet S.', 'Osvaldo R.', 'Lourdes D.', 'Yoandri P.', 'Belinda G.',
  'Daniel M.', 'Liset H.', 'Alejandro V.', 'Yuvisay L.', 'Maritza A.',
  'Yander B.', 'Dayana O.', 'Yoel G.', 'Noslen J.', 'Idania R.'
];

const locations = [
  'Miami, FL', 'Tampa, FL', 'Hialeah, FL', 'Orlando, FL', 'Houston, TX',
  'Madrid, España', 'Barcelona, España', 'Newark, NJ', 'Las Vegas, NV',
  'Louisville, KY', 'Atlanta, GA', 'Los Angeles, CA'
];

export const mockReviews: Review[] = [
  // Reviews para Arroz (p_alim_001)
  {
    id: 'rev_001',
    productId: 'p_alim_001',
    userName: 'Yusniel R.',
    userAvatar: '👨🏽',
    userLocation: 'Miami, FL',
    rating: 5,
    title: 'Llegó perfecto',
    content: 'Mi mamá lo recibió en 6 días. Arroz de muy buena calidad, sin granos partidos. Ya pedí otra vez.',
    date: '2025-04-20',
    helpful: 23,
    verified: true
  },
  {
    id: 'rev_002',
    productId: 'p_alim_001',
    userName: 'Mariela G.',
    userAvatar: '👩🏽',
    userLocation: 'Tampa, FL',
    rating: 5,
    title: 'El que prefiere mi familia',
    content: 'Los granos quedan sueltos y blancos. Ya van 4 veces que pido y siempre llega bien.',
    date: '2025-04-15',
    helpful: 18,
    verified: true
  },
  {
    id: 'rev_003',
    productId: 'p_alim_001',
    userName: 'Roberto P.',
    userAvatar: '👨🏽',
    userLocation: 'Madrid, España',
    rating: 4,
    title: 'Buen arroz, bien empacado',
    content: 'Calidad buena. Llegó un día después de lo prometido pero todo bien. Empaque resistente.',
    date: '2025-04-08',
    helpful: 12,
    verified: true
  },

  // Reviews para Pollo Entero (p_alim_002)
  {
    id: 'rev_004',
    productId: 'p_alim_002',
    userName: 'Yamila C.',
    userAvatar: '👩🏽',
    userLocation: 'Hialeah, FL',
    rating: 5,
    title: 'Llegó congelado al 100%',
    content: 'Tenía dudas si el pollo iba a llegar bien por la cadena de frío, pero llegó perfecto. Mi familia en Cárdenas estaba feliz.',
    date: '2025-04-25',
    helpful: 34,
    verified: true
  },
  {
    id: 'rev_005',
    productId: 'p_alim_002',
    userName: 'Carlos F.',
    userAvatar: '👨🏽',
    userLocation: 'Houston, TX',
    rating: 5,
    title: 'Excelente calidad',
    content: 'Pollo de muy buen tamaño, bien limpio. La cadena de frío funcionó perfecto. Recomendado.',
    date: '2025-04-18',
    helpful: 21,
    verified: true
  },

  // Reviews para Aceite (p_alim_003)
  {
    id: 'rev_006',
    productId: 'p_alim_003',
    userName: 'Yanet S.',
    userAvatar: '👩🏽',
    userLocation: 'Miami, FL',
    rating: 5,
    title: 'Galón completo, no como en otras tiendas',
    content: 'Por fin un galón completo y de buena marca. En otras agencias mandan medio galón disfrazado.',
    date: '2025-04-22',
    helpful: 28,
    verified: true
  },

  // Reviews para Leche en Polvo (p_alim_004)
  {
    id: 'rev_007',
    productId: 'p_alim_004',
    userName: 'Osvaldo R.',
    userAvatar: '👨🏽',
    userLocation: 'Newark, NJ',
    rating: 5,
    title: 'La leche del Nido',
    content: 'Esta es la marca que toda la vida hemos consumido. Llegó perfectamente sellada y vencimiento bien lejos.',
    date: '2025-04-19',
    helpful: 19,
    verified: true
  },
  {
    id: 'rev_008',
    productId: 'p_alim_004',
    userName: 'Lourdes D.',
    userAvatar: '👩🏽',
    userLocation: 'Madrid, España',
    rating: 5,
    title: 'Le hace mucha falta a mis padres',
    content: 'Mis padres son mayores y necesitan leche todos los días. Gracias a Yumury siempre tienen.',
    date: '2025-04-12',
    helpful: 41,
    verified: true
  },

  // Reviews para EcoFlow (p_elec_001)
  {
    id: 'rev_009',
    productId: 'p_elec_001',
    userName: 'Daniel M.',
    userAvatar: '👨🏽',
    userLocation: 'Miami, FL',
    rating: 5,
    title: 'Cambió la vida de mis padres',
    content: 'Inversión de 1099 dólares pero vale cada centavo. Mis padres ya no sufren los apagones largos en Cárdenas. Pueden ver TV, cargar el celular y tener un ventilador prendido toda la noche.',
    date: '2025-03-28',
    helpful: 89,
    verified: true,
    photos: ['https://images.unsplash.com/photo-1620677368158-32b078c1c000?w=600']
  },
  {
    id: 'rev_010',
    productId: 'p_elec_001',
    userName: 'Liset H.',
    userAvatar: '👩🏽',
    userLocation: 'Tampa, FL',
    rating: 5,
    title: 'Funciona como dice',
    content: 'Llegó en 9 días. Mi hermana lo conectó al refrigerador durante un apagón de 8 horas y aguantó perfecto.',
    date: '2025-03-15',
    helpful: 56,
    verified: true
  },

  // Reviews para Combo Familiar Básico (combo_003)
  {
    id: 'rev_011',
    productId: 'combo_003',
    userName: 'Alejandro V.',
    userAvatar: '👨🏽',
    userLocation: 'Hialeah, FL',
    rating: 5,
    title: 'Lo pido cada mes religiosamente',
    content: 'Es el combo perfecto. No tengo que pensar qué mandar. Llega completo y a buen precio.',
    date: '2025-04-23',
    helpful: 67,
    verified: true
  },
  {
    id: 'rev_012',
    productId: 'combo_003',
    userName: 'Yuvisay L.',
    userAvatar: '👩🏽',
    userLocation: 'Orlando, FL',
    rating: 5,
    title: 'Mi mamá quedó feliz',
    content: 'Le mandé este combo a mi mamá y le duró casi 2 semanas. Buen pollo, buen arroz, buen café. Recomendado.',
    date: '2025-04-10',
    helpful: 45,
    verified: true
  },

  // Reviews para Combo Apagón Ready (combo_001)
  {
    id: 'rev_013',
    productId: 'combo_001',
    userName: 'Maritza A.',
    userAvatar: '👩🏽',
    userLocation: 'Miami, FL',
    rating: 5,
    title: 'La mejor inversión que he hecho',
    content: 'En Matanzas los apagones son terribles. Mandé este combo a mi madre y mi hermana y ahora pueden dormir con ventilador y luz. Cambió todo.',
    date: '2025-04-05',
    helpful: 73,
    verified: true,
    photos: ['https://images.unsplash.com/photo-1620677368158-32b078c1c000?w=600']
  },

  // Reviews para Moto Eléctrica Mishozuki (p_veh_001)
  {
    id: 'rev_014',
    productId: 'p_veh_001',
    userName: 'Yander B.',
    userAvatar: '👨🏽',
    userLocation: 'Las Vegas, NV',
    rating: 5,
    title: 'Mi sobrino feliz',
    content: 'Le mandé la moto a mi sobrino para que no tenga que tomar guagua. Llegó en 5 semanas como dijeron. Funciona perfecto.',
    date: '2025-03-20',
    helpful: 34,
    verified: true,
    photos: ['https://images.unsplash.com/photo-1558981852-426c6c22a060?w=600']
  },
  {
    id: 'rev_015',
    productId: 'p_veh_001',
    userName: 'Dayana O.',
    userAvatar: '👩🏽',
    userLocation: 'Atlanta, GA',
    rating: 4,
    title: 'Buena moto, buen servicio',
    content: 'La moto llegó en buen estado y mi familia me mandó video probándola. Una rueda llegó con poco aire pero la inflaron y todo bien.',
    date: '2025-02-28',
    helpful: 22,
    verified: true
  },

  // Reviews para Refrigerador (p_elec_003)
  {
    id: 'rev_016',
    productId: 'p_elec_003',
    userName: 'Yoel G.',
    userAvatar: '👨🏽',
    userLocation: 'Louisville, KY',
    rating: 5,
    title: 'Mis abuelos felices',
    content: 'Le compré el refrigerador Mabe a mis abuelos. Llegó en 3 semanas. El equipo lo subió hasta el segundo piso. Excelente.',
    date: '2025-03-10',
    helpful: 48,
    verified: true
  },

  // Reviews para Combo Cumpleaños (combo_007)
  {
    id: 'rev_017',
    productId: 'combo_007',
    userName: 'Noslen J.',
    userAvatar: '👩🏽',
    userLocation: 'Miami, FL',
    rating: 5,
    title: 'Perfecto para sorpresa de cumpleaños',
    content: 'Le hice una sorpresa a mi sobrina por su cumpleaños 15. La torta llegó perfecta, los globos, todo. Ella lloró cuando lo recibió.',
    date: '2025-04-08',
    helpful: 89,
    verified: true,
    photos: ['https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=600']
  },

  // Reviews para Combo Diabética (combo_006)
  {
    id: 'rev_018',
    productId: 'combo_006',
    userName: 'Idania R.',
    userAvatar: '👩🏽',
    userLocation: 'Madrid, España',
    rating: 5,
    title: 'Perfecto para mi mamá',
    content: 'Mi mamá es diabética y este combo le ha cambiado la alimentación. Productos que no se consiguen en Cuba. Gracias!',
    date: '2025-03-25',
    helpful: 56,
    verified: true
  },

  // ============================================
  // El implementador debe completar hasta llegar a 50 reviews
  // distribuyéndolas entre productos populares siguiendo
  // los patrones arriba. Variar entre 4 y 5 estrellas
  // (con algunas de 3-4 esporádicas para realismo)
  // ============================================
];

// Helpers
export function getProductReviews(productId: string): Review[] {
  return mockReviews.filter(r => r.productId === productId);
}

export function getProductRatingStats(productId: string) {
  const reviews = getProductReviews(productId);
  if (reviews.length === 0) return null;
  const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
  const avg = sum / reviews.length;
  const breakdown = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length
  }));
  return { average: avg, total: reviews.length, breakdown };
}
```

### Templates para los 32 reviews restantes

Para que el implementador genere variedad realista, usar estos templates rotando nombres, locations y productos:

**Templates positivos (5⭐)**:
- "Llegó en X días perfecto. Mi [familiar] feliz."
- "Ya van X veces que pido y siempre bien."
- "Excelente calidad, recomendado."
- "Mejor que [Katapulk/Supermarket23], en serio."
- "Empacado con cuidado, todo intacto."

**Templates muy positivos (5⭐) con detalle**:
- "Tenía dudas pero superó expectativas..."
- "Mi [familiar] me llamó emocionado..."
- "Por fin algo que llega como prometen..."

**Templates buenos (4⭐)**:
- "Buen producto, llegó con un día de retraso pero todo bien."
- "Cumple, aunque esperaba un poco más por el precio."

**Templates ocasionales mixtos (3-4⭐)** — uno o dos para realismo:
- "El producto llegó bien pero la atención al cliente podría mejorar."
- "Buen empaque, pero el tracking se quedó parado un día."

---

## 💭 Testimonios (`lib/mock-data/testimonials.ts`)

10 testimonios para el home, más extensos que las reviews:

```typescript
export type Testimonial = {
  id: string;
  name: string;
  location: string;
  avatar: string;
  rating: number;
  productSent: string;
  quote: string;
  sentTo: string;
};

export const testimonials: Testimonial[] = [
  {
    id: 'test_001',
    name: 'Yusniel Rodríguez',
    location: 'Miami, FL',
    avatar: '👨🏽',
    rating: 5,
    productSent: 'Combo Familiar Premium',
    quote: 'Llevaba un año buscando una agencia confiable. Yumury cambió todo. Mi mamá en Matanzas me llama emocionada cada vez que recibe un pedido. El tracking con fotos es algo que no tiene nadie más.',
    sentTo: 'Mamá en Matanzas'
  },
  {
    id: 'test_002',
    name: 'Mariela González',
    location: 'Tampa, FL',
    avatar: '👩🏽',
    rating: 5,
    productSent: 'Refrigerador Mabe 350L',
    quote: 'Le compré un refrigerador a mis abuelos. Llegó en 3 semanas como prometieron, y el equipo de Yumury hasta me llamó cuando lo entregaron. Cero estrés.',
    sentTo: 'Abuelos en Cárdenas'
  },
  {
    id: 'test_003',
    name: 'Roberto Pérez',
    location: 'Hialeah, FL',
    avatar: '👨🏽',
    rating: 5,
    productSent: 'Combo Apagón Ready',
    quote: 'Los apagones en Matanzas son brutales. Le mandé el EcoFlow a mi madre y desde entonces no se ha quejado más. Vale cada dólar invertido.',
    sentTo: 'Madre en Cárdenas'
  },
  {
    id: 'test_004',
    name: 'Yamila Castro',
    location: 'Madrid, España',
    avatar: '👩🏽',
    rating: 5,
    productSent: 'Combo Mamá Diabética',
    quote: 'Encontrar productos sin azúcar para enviar a Cuba era una pesadilla. El combo diabético de Yumury es perfecto. Mi mamá tiene productos que no se consiguen allá.',
    sentTo: 'Mamá en Matanzas'
  },
  {
    id: 'test_005',
    name: 'Carlos Fernández',
    location: 'Houston, TX',
    avatar: '👨🏽',
    rating: 5,
    productSent: 'Moto Eléctrica Mishozuki Pro',
    quote: 'Mi hermano necesitaba moverse para trabajar. La moto eléctrica llegó en 5 semanas, exactamente como dijeron. Sin sobrecostos sorpresa al final.',
    sentTo: 'Hermano en Varadero'
  },
  {
    id: 'test_006',
    name: 'Yanet Suárez',
    location: 'Miami, FL',
    avatar: '👩🏽',
    rating: 5,
    productSent: 'Combo Cumpleaños',
    quote: 'Hice una sorpresa de cumpleaños a mi sobrina con el combo. Cuando lo recibió me mandó un video llorando de la emoción. No tiene precio eso.',
    sentTo: 'Sobrina en Cárdenas'
  },
  {
    id: 'test_007',
    name: 'Osvaldo Ramírez',
    location: 'Newark, NJ',
    avatar: '👨🏽',
    rating: 5,
    productSent: 'Combo Familiar Básico (mensual)',
    quote: 'Cada mes le mando el combo familiar a mi madre. Es como una suscripción. Ella ya espera el día y todo el barrio sabe cuando "llega el de Yumury".',
    sentTo: 'Madre en Matanzas'
  },
  {
    id: 'test_008',
    name: 'Lourdes Díaz',
    location: 'Madrid, España',
    avatar: '👩🏽',
    rating: 5,
    productSent: 'Combo Energía Solar Completo',
    quote: 'Invertí en independencia energética para mis padres. Panel solar + EcoFlow. Ya no dependen de los apagones. La diferencia en su calidad de vida es enorme.',
    sentTo: 'Padres en Jovellanos'
  },
  {
    id: 'test_009',
    name: 'Yoandri Pérez',
    location: 'Las Vegas, NV',
    avatar: '👨🏽',
    rating: 5,
    productSent: 'Combo Bebé',
    quote: 'Mi sobrino acaba de nacer en Cárdenas. Le mando el combo bebé cada mes. Pampers de los buenos, todo. Mi cuñada está agradecidísima.',
    sentTo: 'Sobrino recién nacido en Cárdenas'
  },
  {
    id: 'test_010',
    name: 'Belinda García',
    location: 'Los Angeles, CA',
    avatar: '👩🏽',
    rating: 5,
    productSent: 'Combo Aseo Personal (recurrente)',
    quote: 'Lo más complicado en Cuba es el aseo personal de calidad. El combo de Yumury con marcas como Dove, Pantene, Pampers — eso le hacía una falta tremenda a mi familia.',
    sentTo: 'Familia en Matanzas'
  }
];
```

---

## 🤖 Yumi Responses (`lib/mock-data/yumi-responses.ts`)

Sistema de patterns para respuestas contextuales:

```typescript
import { YumiPattern } from '@/types/yumi';

export const yumiPatterns: YumiPattern[] = [
  // === SALUDO ===
  {
    id: 'saludo',
    keywords: ['hola', 'hey', 'buenos dias', 'buenos días', 'buenas', 'qué tal', 'que tal'],
    response: {
      text: '¡Hola! 👋 Soy Yumi, tu asistente para armar envíos a Matanzas. Cuéntame qué necesitas y te ayudo a elegir.',
      suggestions: [
        'Tengo $80 para mi mamá',
        'Combo familiar para 4 personas',
        'Necesito un refrigerador',
        'Algo para los apagones'
      ]
    },
    priority: 1
  },

  // === APAGONES / ENERGÍA ===
  {
    id: 'apagon',
    keywords: ['apagón', 'apagon', 'luz', 'electricidad', 'corte de luz', 'sin energía', 'sin luz', 'corriente', 'cortes'],
    response: {
      text: '¡Tenemos el combo perfecto para los apagones! El **Combo Apagón Ready** ($890) incluye una estación EcoFlow Delta 1300, lámparas LED recargables, power bank y ventilador USB. Con eso tu familia tiene electricidad para iluminar, cargar celulares y refrescarse durante los cortes prolongados.',
      combos: ['combo-apagon-ready'],
      suggestions: [
        'Ver detalles del combo',
        '¿Hay algo más económico?',
        '¿Tienes paneles solares?',
        'Solo necesito una lámpara'
      ],
      followUp: '¿Te interesa este combo o prefieres opciones individuales?'
    },
    priority: 10
  },

  // === SOLAR ===
  {
    id: 'solar',
    keywords: ['panel solar', 'solar', 'energía solar', 'paneles', 'autónomo', 'independiente'],
    response: {
      text: 'Para independencia energética total te recomiendo el **Combo Energía Solar Completo** ($1,290). Incluye un panel solar de 400W + EcoFlow Delta 1300 + accesorios de instalación. Tu familia genera su propia electricidad y se olvida de los apagones para siempre.',
      combos: ['combo-energia-solar'],
      products: ['panel-solar-400w', 'panel-solar-200w'],
      suggestions: [
        'Ver el combo solar',
        'Solo el panel',
        'Combo más simple para apagones'
      ]
    },
    priority: 9
  },

  // === DIABETES ===
  {
    id: 'diabetico',
    keywords: ['diabét', 'diabetic', 'sin azúcar', 'azúcar baja', 'no puede azúcar'],
    response: {
      text: 'Tenemos el **Combo Mamá Diabética** ($79.99) pensado especialmente para personas con diabetes. Incluye productos sin azúcar, avena integral, café descafeinado, endulzante natural y vegetales especiales.',
      combos: ['combo-mama-diabetica'],
      suggestions: [
        'Ver el combo',
        '¿Tienes algo para hipertensos?',
        'Productos individuales sin azúcar'
      ],
      followUp: '¿Quieres ver los detalles?'
    },
    priority: 9
  },

  // === REFRIGERADOR ===
  {
    id: 'refrigerador',
    keywords: ['refrigerador', 'nevera', 'frigider', 'fridge', 'enfriar'],
    response: {
      text: 'Tenemos varios refrigeradores. Para recomendarte el ideal, dime: ¿cuántas personas viven en la casa? y ¿prefieres compacto, mediano o grande?',
      products: ['refrigerador-royal-250l', 'refrigerador-mabe-350l', 'refrigerador-samsung-450l'],
      suggestions: [
        'Mediano para 4 personas',
        'Compacto',
        'El más grande',
        'El más económico'
      ]
    },
    priority: 8
  },

  // === CUMPLEAÑOS ===
  {
    id: 'cumpleanos',
    keywords: ['cumpleaños', 'cumple', 'birthday', 'regalo', 'sorpresa'],
    response: {
      text: '¡Qué lindo detalle! 🎂 Tengo el **Combo Cumpleaños** ($54.99) que incluye torta dulce, caramelos, decoración (globos, sombreros, pancarta) y un mensaje personalizado. Si me dices la edad y los gustos, puedo sugerirte algo más específico.',
      combos: ['combo-cumpleanos'],
      suggestions: [
        'Es para un niño',
        'Es para un adulto',
        'Es para una mujer',
        'Algo más premium'
      ]
    },
    priority: 8
  },

  // === BEBÉ ===
  {
    id: 'bebe',
    keywords: ['bebé', 'bebe', 'recién nacido', 'pañales', 'pampers', 'baby'],
    response: {
      text: 'Tenemos el **Combo Bebé** ($59.99) con pañales Pampers (talla seleccionable), toallitas, talco, aceite Johnson\'s, loción y shampoo de bebé. Todo lo esencial para el cuidado.',
      combos: ['combo-bebe'],
      products: ['panales-pampers'],
      suggestions: [
        'Ver el combo bebé',
        'Solo necesito pañales',
        '¿Qué talla recomiendas?'
      ]
    },
    priority: 8
  },

  // === TIEMPO DE ENVÍO ===
  {
    id: 'tiempo-envio',
    keywords: ['cuánto demora', 'cuánto tarda', 'cuándo llega', 'tiempo de envío', 'cuántos días', 'tarda'],
    response: {
      text: 'Tenemos 3 opciones de envío a Matanzas:\n\n🚀 **Express** — 3-5 días — $18.99\n✓ **Estándar** — 5-7 días — $8.99\n🚢 **Marítimo** — 4-7 semanas — $4.99 (solo para envíos grandes)\n\nPara alimentos te recomiendo Estándar o Express. Para electrodomésticos grandes y motos, Marítimo es lo más económico.',
      suggestions: [
        'Necesito el express',
        '¿Cuál es para una moto?',
        '¿Cuándo llega a Cárdenas?'
      ]
    },
    priority: 7
  },

  // === MOTO ELÉCTRICA ===
  {
    id: 'moto-electrica',
    keywords: ['moto eléctrica', 'moto electrica', 'scooter', 'motoneta'],
    response: {
      text: 'Tenemos varios modelos de motos eléctricas. La más popular es la **Mishozuki Pro** ($1,890) con 80km de autonomía. La **Avispa 350W** ($1,290) es la más económica. La **Premium 1500W** ($2,490) es la mejor para distancias largas.',
      products: ['moto-electrica-mishozuki-pro', 'moto-electrica-avispa', 'moto-electrica-premium-1500w'],
      suggestions: [
        'La más económica',
        'La de mayor autonomía',
        'Quiero ver fotos'
      ]
    },
    priority: 8
  },

  // === MOTO COMBUSTIÓN ===
  {
    id: 'moto-combustion',
    keywords: ['moto gasolina', 'moto combustion', 'motor', 'cilindros', 'cc'],
    response: {
      text: 'Tenemos motos de combustión Honda, Suzuki y Yamaha. La **Honda 125cc** ($2,290) es la más confiable, la **Suzuki 150cc** ($2,690) la más potente, la **Yamaha 125cc** ($2,490) buen equilibrio. La económica es la **110cc** ($1,890).',
      products: ['moto-honda-125', 'moto-suzuki-150', 'moto-yamaha-125', 'moto-economica-110'],
      suggestions: [
        'La más confiable',
        'La más potente',
        'La más económica'
      ]
    },
    priority: 8
  },

  // === POLLO ===
  {
    id: 'pollo',
    keywords: ['pollo', 'chicken', 'gallina'],
    response: {
      text: 'Tenemos pollo en varias presentaciones: entero ($22.99), pechugas ($18.50), alas ($14.99), muslos ($13.99). Todos llegan congelados con cadena de frío garantizada.',
      products: ['pollo-entero-congelado', 'pechuga-pollo', 'alas-pollo', 'muslos-pollo'],
      suggestions: [
        'Pollo entero',
        'Solo pechugas',
        'Combo con pollo'
      ]
    },
    priority: 7
  },

  // === ARROZ ===
  {
    id: 'arroz',
    keywords: ['arroz', 'rice'],
    response: {
      text: 'Tenemos arroz blanco de grano largo Mahatma ($8.99 por 5 lb, también en 10 y 20 lb) y arroz integral ($9.99). Si necesitas más cantidad, los combos familiares incluyen arroz.',
      products: ['arroz-grano-largo', 'arroz-integral'],
      combos: ['combo-familiar-basico'],
      suggestions: [
        'Mejor el combo familiar',
        '20 libras de arroz',
        'Arroz integral'
      ]
    },
    priority: 7
  },

  // === COMBO ECONÓMICO ===
  {
    id: 'economico',
    keywords: ['económico', 'economico', 'barato', 'poco dinero', 'presupuesto bajo', 'low budget', 'menos'],
    response: {
      text: 'Para algo económico te recomiendo el **Combo Familiar Básico** ($69.99) que incluye arroz, frijoles, aceite, pollo, picadillo, azúcar, sal y café. Le alcanza a una familia para varios días.',
      combos: ['combo-familiar-basico'],
      suggestions: [
        'Ver el combo',
        'Algo aún más simple',
        'Solo aseo personal'
      ]
    },
    priority: 7
  },

  // === COMBO PRESUPUESTO 80 ===
  {
    id: 'presupuesto-80',
    keywords: ['$80', '80 dolares', '80 dólares', 'tengo 80'],
    response: {
      text: 'Con $80 tienes opciones excelentes. Te recomiendo:\n\n1. **Combo Familiar Básico** ($69.99) — la opción más completa\n2. **Combo Mamá Diabética** ($79.99) — si tu familiar es diabética\n3. **Combo Cumpleaños** ($54.99) + algunos extras\n\n¿Para quién es y qué necesita?',
      combos: ['combo-familiar-basico', 'combo-mama-diabetica', 'combo-cumpleanos'],
      suggestions: [
        'Es para mi mamá',
        'Es para varias personas',
        'Es para un cumpleaños'
      ]
    },
    priority: 8
  },

  // === GARANTÍA / CONFIANZA ===
  {
    id: 'garantia',
    keywords: ['garantía', 'garantia', 'seguro', 'confianza', 'estafa', 'qué pasa si', 'reembolso'],
    response: {
      text: 'Tenemos **Garantía Yumury**: si tu pedido no llega, llega incompleto o llega dañado, te reembolsamos sin pelear. Además, tendrás tracking visual en tiempo real con fotos en cada etapa para que veas exactamente dónde está tu envío.',
      suggestions: [
        '¿Cómo funciona el tracking?',
        'Ver testimonios',
        'Empezar a comprar'
      ]
    },
    priority: 6
  },

  // === MUNICIPIOS ===
  {
    id: 'municipios',
    keywords: ['cárdenas', 'cardenas', 'varadero', 'matanzas centro', 'colón', 'jovellanos', 'jagüey'],
    response: {
      text: 'Llegamos a los 14 municipios de Matanzas. Los tiempos varían: capital, Cárdenas y Varadero (5-7 días), municipios cercanos (6-8 días), municipios alejados como Ciénaga de Zapata, Calimete, Perico (7-9 días).',
      suggestions: [
        'Es para Cárdenas',
        'Es para Varadero',
        'Es para Colón'
      ]
    },
    priority: 6
  },

  // === ASEO PERSONAL ===
  {
    id: 'aseo',
    keywords: ['aseo', 'jabón', 'champú', 'pasta dental', 'desodorante', 'higiene'],
    response: {
      text: 'Tenemos el **Combo Aseo Personal** ($42.99) con jabón Dove, pasta Colgate, champú Head & Shoulders, acondicionador, desodorantes y papel higiénico Charmin. Marcas reconocidas que les hacen mucha falta.',
      combos: ['combo-aseo-personal'],
      products: ['jabon-dove-paquete', 'champu-hs', 'pasta-colgate'],
      suggestions: [
        'Ver el combo de aseo',
        'Solo champú',
        'Combo de limpieza'
      ]
    },
    priority: 7
  },

  // === GRACIAS / DESPEDIDA ===
  {
    id: 'gracias',
    keywords: ['gracias', 'thanks', 'thank you', 'genial', 'perfecto', 'ok'],
    response: {
      text: '¡De nada! 😊 Si necesitas algo más, aquí estoy. ¿Quieres que te ayude con algo más o procedes con el pedido?',
      suggestions: [
        'Necesito algo más',
        'Ir al carrito',
        'Empezar de nuevo'
      ]
    },
    priority: 5
  }
];

// Fallback genérico
export const yumiFallback = {
  text: 'Cuéntame un poco más sobre lo que buscas. Por ejemplo: a quién le envías, qué presupuesto tienes, o si necesitas algo específico (comida, electrodoméstico, vehículo).',
  suggestions: [
    'Tengo un presupuesto de $X',
    'Es para mi mamá',
    'Necesito comida para la semana',
    'Quiero un electrodoméstico'
  ]
};

// Helper para encontrar el patrón que matchea
export function findYumiResponse(userMessage: string): YumiPattern | null {
  const text = userMessage.toLowerCase();

  // Ordenar por priority desc para que los más específicos ganen
  const sorted = [...yumiPatterns].sort((a, b) => (b.priority || 0) - (a.priority || 0));

  for (const pattern of sorted) {
    const hasMatch = pattern.keywords.some(kw => text.includes(kw.toLowerCase()));
    const hasExclusion = pattern.excludeKeywords?.some(kw => text.includes(kw.toLowerCase()));

    if (hasMatch && !hasExclusion) {
      return pattern;
    }
  }

  return null;
}
```

---

## ❓ FAQ (`lib/mock-data/faq.ts`)

```typescript
export type FAQItem = {
  id: string;
  question: string;
  answer: string;
};

export type FAQCategory = {
  id: string;
  name: string;
  icon: string;          // Lucide icon name
  items: FAQItem[];
};

export const faqCategories: FAQCategory[] = [
  {
    id: 'envios',
    name: 'Envíos',
    icon: 'Truck',
    items: [
      {
        id: 'envio_1',
        question: '¿Cuánto demora un envío a Matanzas?',
        answer: 'Depende del método: Estándar (5-7 días), Express (3-5 días), Marítimo (4-7 semanas) para envíos grandes como motos o electrodomésticos. Los tiempos pueden variar según el municipio destino.'
      },
      {
        id: 'envio_2',
        question: '¿A qué municipios de Matanzas llegan?',
        answer: 'Llegamos a los 14 municipios de la provincia: Matanzas (capital), Cárdenas, Varadero, Colón, Jovellanos, Pedro Betancourt, Jagüey Grande, Unión de Reyes, Ciénaga de Zapata, Limonar, Martí, Los Arabos, Perico y Calimete.'
      },
      {
        id: 'envio_3',
        question: '¿Cuánto cuesta el envío?',
        answer: 'El costo depende del método y el peso. Estándar ($8.99), Express ($18.99), Marítimo ($4.99 — el más económico para envíos grandes). El precio total se calcula en el checkout.'
      },
      {
        id: 'envio_4',
        question: '¿Puedo enviar a varios familiares en un solo pedido?',
        answer: 'Cada pedido se envía a un solo destinatario. Si necesitas enviar a varios familiares, crea pedidos separados. Con tu sistema de "Mis Familias" guardado, solo te toma segundos.'
      }
    ]
  },
  {
    id: 'pagos',
    name: 'Pagos',
    icon: 'CreditCard',
    items: [
      {
        id: 'pago_1',
        question: '¿Qué métodos de pago aceptan?',
        answer: 'Aceptamos tarjetas de crédito y débito Visa, Mastercard y American Express. Procesamos los pagos de forma segura con Stripe.'
      },
      {
        id: 'pago_2',
        question: '¿Es seguro pagar en Yumury?',
        answer: 'Sí. Usamos Stripe, una de las pasarelas de pago más seguras del mundo. No almacenamos los datos de tu tarjeta en nuestros servidores.'
      },
      {
        id: 'pago_3',
        question: '¿Cuándo se cobra el pago?',
        answer: 'El pago se cobra al confirmar el pedido. Si por algún motivo no podemos procesar el envío, te reembolsamos automáticamente.'
      },
      {
        id: 'pago_4',
        question: '¿Hay costos ocultos?',
        answer: 'No. El precio que ves en el checkout es lo que pagas. Sin sobrecostos sorpresa, sin tarifas ocultas.'
      }
    ]
  },
  {
    id: 'productos',
    name: 'Productos',
    icon: 'Package',
    items: [
      {
        id: 'prod_1',
        question: '¿Los alimentos llegan en buen estado?',
        answer: 'Sí. Los productos congelados (carnes, mariscos) viajan en cadena de frío garantizada. Los demás alimentos están empacados para resistir el viaje. Si algo llega en mal estado, lo reembolsamos.'
      },
      {
        id: 'prod_2',
        question: '¿Tienen productos sin azúcar / para diabéticos?',
        answer: 'Sí. Tenemos un Combo Mamá Diabética con productos especialmente seleccionados sin azúcar. También tenemos productos individuales aptos para diabéticos.'
      },
      {
        id: 'prod_3',
        question: '¿Las motos tienen garantía?',
        answer: 'Sí. Todas las motos eléctricas y de combustión tienen garantía del fabricante (1-2 años según el modelo). Si tienes problemas en Cuba, contáctanos y coordinamos.'
      },
      {
        id: 'prod_4',
        question: '¿Puedo armar mi propio combo?',
        answer: 'Por ahora ofrecemos combos pre-armados, pero puedes pedirle a Yumi (nuestro asistente IA) que te ayude a armar un envío personalizado con productos individuales.'
      }
    ]
  },
  {
    id: 'tracking',
    name: 'Tracking',
    icon: 'MapPin',
    items: [
      {
        id: 'track_1',
        question: '¿Cómo funciona el tracking?',
        answer: 'Cada pedido tiene tracking visual en tiempo real. Ves cada etapa del proceso: confirmación, preparación en Miami (con foto), tránsito, llegada a Cuba, almacén Matanzas, reparto y entrega final. Recibes actualizaciones por email automáticamente.'
      },
      {
        id: 'track_2',
        question: '¿Puedo compartir el tracking con mi familiar en Cuba?',
        answer: 'Sí. Cada pedido tiene un link público que puedes compartir por WhatsApp con tu familiar para que vea el progreso del envío.'
      },
      {
        id: 'track_3',
        question: '¿Recibo notificaciones cuando llega el pedido?',
        answer: 'Sí. Te avisamos por email en cada cambio de estado importante. Tu familiar recibe SMS cuando el repartidor está en camino.'
      }
    ]
  },
  {
    id: 'cuenta',
    name: 'Mi Cuenta',
    icon: 'User',
    items: [
      {
        id: 'cta_1',
        question: '¿Qué son "Mis Familias"?',
        answer: 'Es nuestro sistema único: guardas los datos de tus familiares (mamá, abuela, tíos) una sola vez y luego reordenas con un click. No tienes que volver a escribir direcciones, teléfonos o preferencias cada vez.'
      },
      {
        id: 'cta_2',
        question: '¿Puedo guardar varias direcciones de un familiar?',
        answer: 'Por ahora cada familiar tiene una dirección principal. Si tu familiar se muda, simplemente edita los datos.'
      },
      {
        id: 'cta_3',
        question: '¿Puedo eliminar mi cuenta?',
        answer: 'Sí. Desde Configuración > Eliminar cuenta. Recuerda que se borrarán también tus familias guardadas y el historial.'
      }
    ]
  },
  {
    id: 'devoluciones',
    name: 'Devoluciones',
    icon: 'RefreshCw',
    items: [
      {
        id: 'dev_1',
        question: '¿Qué pasa si mi pedido llega incompleto?',
        answer: 'Tenemos Garantía Yumury: si llega incompleto, dañado o no llega, te reembolsamos sin pelear. Solo contáctanos por email o WhatsApp con el número de pedido.'
      },
      {
        id: 'dev_2',
        question: '¿Cuánto demora un reembolso?',
        answer: 'Los reembolsos a tarjeta toman 3-5 días hábiles en aparecer en tu cuenta, dependiendo de tu banco.'
      },
      {
        id: 'dev_3',
        question: '¿Puedo cancelar un pedido?',
        answer: 'Puedes cancelar mientras esté en estado "Pendiente" o "Confirmado" (antes de empezar el empaque). Una vez en preparación o enviado, no se puede cancelar.'
      }
    ]
  }
];
```

---

## 👤 Mock User (`lib/mock-data/user.ts`)

```typescript
import { User } from '@/types/user';

export const mockUser: User = {
  id: 'user_demo',
  name: 'María García',
  email: 'maria.garcia@example.com',
  avatar: '👩🏽',
  joinedAt: '2024-01-15T10:30:00Z',
  totalOrders: 8,
  totalSpent: 2843.85
};
```

---

## 🔄 Index y Helpers (`lib/mock-data/index.ts`)

```typescript
export * from './categories';
export * from './municipalities';
export * from './products/index';
export * from './combos';
export * from './families';
export * from './orders';
export * from './tracking-events';
export * from './reviews';
export * from './testimonials';
export * from './yumi-responses';
export * from './faq';
export * from './user';

// Helpers globales
import { Product } from '@/types/product';
import { alimentos } from './products/alimentos';
import { electrodomesticos } from './products/electrodomesticos';
import { vehiculos } from './products/vehiculos';
import { combos } from './combos';

export const allProducts: Product[] = [
  ...alimentos,
  ...electrodomesticos,
  ...vehiculos,
  ...combos
];

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find(p => p.slug === slug);
}

export function getProductById(id: string): Product | undefined {
  return allProducts.find(p => p.id === id);
}

export function getProductsByCategory(category: string): Product[] {
  return allProducts.filter(p => p.category === category);
}

export function getProductsBySubcategory(subcategory: string): Product[] {
  return allProducts.filter(p => p.subcategory === subcategory);
}

export function getFeaturedProducts(limit: number = 8): Product[] {
  return allProducts.filter(p => p.featured).slice(0, limit);
}

export function getBestsellers(limit: number = 8): Product[] {
  return allProducts.filter(p => p.bestseller).slice(0, limit);
}

export function getRelatedProducts(productId: string, limit: number = 4): Product[] {
  const product = getProductById(productId);
  if (!product) return [];
  return allProducts
    .filter(p => p.id !== productId && p.subcategory === product.subcategory)
    .slice(0, limit);
}

// Búsqueda fuzzy preparada para Fuse.js
export const searchableProducts = allProducts.map(p => ({
  id: p.id,
  slug: p.slug,
  name: p.name,
  description: p.description,
  category: p.category,
  subcategory: p.subcategory,
  brand: p.brand,
  tags: p.tags
}));
```

---

## 🌐 i18n — `messages/es.json` (preview)

Estructura de claves a tener en español. El archivo completo lo construye el implementador siguiendo la misma estructura:

```json
{
  "common": {
    "buy": "Comprar",
    "addToCart": "Añadir al carrito",
    "viewDetails": "Ver detalles",
    "continue": "Continuar",
    "back": "Atrás",
    "save": "Guardar",
    "cancel": "Cancelar",
    "delete": "Eliminar",
    "edit": "Editar",
    "loading": "Cargando...",
    "search": "Buscar",
    "filter": "Filtrar",
    "sort": "Ordenar"
  },
  "header": {
    "categories": "Categorías",
    "combos": "Combos",
    "howItWorks": "Cómo funciona",
    "myAccount": "Mi cuenta",
    "cart": "Carrito"
  },
  "home": {
    "hero": {
      "eyebrow": "Envíos a Matanzas, Cuba",
      "headline": "Conecta con tu familia en {highlight}, sin distancias",
      "highlight": "Matanzas",
      "subheadline": "La forma más confiable y moderna de enviarles lo que necesitan. Comida, electrodomésticos, motos eléctricas. Todo con tracking en tiempo real.",
      "ctaPrimary": "Empezar a comprar",
      "ctaSecondary": "Ver cómo funciona"
    }
  }
}
```

---

## ✅ Checklist de Implementación de Mock Data

Cuando Claude Code esté creando los archivos, este es el orden recomendado:

- [ ] 1. `types/` — Todos los tipos TypeScript
- [ ] 2. `lib/mock-data/categories.ts`
- [ ] 3. `lib/mock-data/municipalities.ts`
- [ ] 4. `lib/mock-data/user.ts`
- [ ] 5. `lib/mock-data/products/alimentos.ts` (75 productos)
- [ ] 6. `lib/mock-data/products/electrodomesticos.ts` (36 productos)
- [ ] 7. `lib/mock-data/products/vehiculos.ts` (19 productos)
- [ ] 8. `lib/mock-data/products/index.ts`
- [ ] 9. `lib/mock-data/combos.ts` (15 combos)
- [ ] 10. `lib/mock-data/families.ts`
- [ ] 11. `lib/mock-data/tracking-events.ts` (8 arrays)
- [ ] 12. `lib/mock-data/orders.ts` (8 pedidos)
- [ ] 13. `lib/mock-data/reviews.ts` (50 reviews)
- [ ] 14. `lib/mock-data/testimonials.ts` (10 testimonios)
- [ ] 15. `lib/mock-data/yumi-responses.ts` (patterns)
- [ ] 16. `lib/mock-data/faq.ts`
- [ ] 17. `lib/mock-data/index.ts` (helpers consolidados)
- [ ] 18. `messages/es.json` y `messages/en.json`

---

> **Continúa con CLAUDE_CODE_PROMPT.md** para el prompt inicial perfecto que arranca el proyecto.
