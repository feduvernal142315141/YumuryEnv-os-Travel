"use client";

import * as React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ProductSpecs } from "@/components/product/ProductSpecs";
import { ProductReviews } from "@/components/product/ProductReviews";
import type { Product } from "@/types";
import type { Review } from "@/types";
import { Truck, Clock, ShieldCheck } from "lucide-react";

type ProductTabsProps = {
  product: Product;
  reviews: Review[];
};

const MUNICIPALITIES = [
  "Matanzas", "Cárdenas", "Varadero", "Colón", "Jovellanos",
  "Ciego de Ávila", "Los Arabos", "Pedro Betancourt", "Perico",
  "Limonar", "Martí", "Calimete", "Jagüey Grande", "Unión de Reyes",
];

export function ProductTabs({ product, reviews }: ProductTabsProps) {
  const productReviews = reviews.filter((r) => r.productId === product.id);

  return (
    <Tabs defaultValue="descripcion" className="w-full">
      <TabsList className="mb-6 h-auto w-full justify-start gap-1 rounded-none border-b border-border-subtle bg-transparent p-0">
        <Tab value="descripcion">Descripción</Tab>
        {product.specs && product.specs.length > 0 && (
          <Tab value="specs">Especificaciones</Tab>
        )}
        <Tab value="reviews">
          Reseñas {productReviews.length > 0 && `(${productReviews.length})`}
        </Tab>
        <Tab value="envio">Envío</Tab>
      </TabsList>

      <TabsContent value="descripcion">
        <div className="prose prose-sm max-w-none text-foreground-muted">
          <p className="text-base leading-relaxed">{product.longDescription}</p>
        </div>
      </TabsContent>

      {product.specs && product.specs.length > 0 && (
        <TabsContent value="specs">
          <ProductSpecs specs={product.specs} />
        </TabsContent>
      )}

      <TabsContent value="reviews">
        {productReviews.length > 0 ? (
          <ProductReviews reviews={productReviews} productId={product.id} />
        ) : (
          <p className="text-sm text-foreground-muted">
            Este producto aún no tiene reseñas. ¡Sé el primero en opinar!
          </p>
        )}
      </TabsContent>

      <TabsContent value="envio">
        <ShippingTab product={product} />
      </TabsContent>
    </Tabs>
  );
}

function Tab({ value, children }: { value: string; children: React.ReactNode }) {
  return (
    <TabsTrigger
      value={value}
      className="rounded-none border-b-2 border-transparent px-4 py-2.5 text-sm font-medium text-foreground-muted transition-all data-[state=active]:border-primary data-[state=active]:text-primary data-[state=active]:bg-transparent data-[state=active]:shadow-none"
    >
      {children}
    </TabsTrigger>
  );
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function ShippingTab(_props: { product: Product }) {
  const methods = [
    {
      icon: <Truck className="h-5 w-5 text-primary" />,
      name: "Envío Estándar",
      time: "5–7 días hábiles",
      price: "$8.99",
      note: "Recomendado para alimentos y combos",
    },
    {
      icon: <Clock className="h-5 w-5 text-brand-orange" />,
      name: "Envío Express",
      time: "3–5 días hábiles",
      price: "$18.99",
      note: "Prioridad de envío",
    },
    {
      icon: <Truck className="h-5 w-5 text-foreground-muted" />,
      name: "Envío Marítimo",
      time: "4–7 semanas",
      price: "$4.99",
      note: "Para envíos grandes y electrodomésticos",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Shipping methods */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground-muted">
          Métodos de envío disponibles
        </h3>
        <div className="space-y-3">
          {methods.map((m) => (
            <div key={m.name} className="flex items-start gap-4 rounded-xl border border-border-subtle bg-card p-4">
              <div className="mt-0.5">{m.icon}</div>
              <div className="flex-1">
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-medium text-foreground">{m.name}</span>
                  <span className="font-mono text-sm font-semibold text-foreground">{m.price}</span>
                </div>
                <p className="mt-0.5 text-sm text-foreground-muted">{m.time}</p>
                <p className="mt-0.5 text-xs text-foreground-muted">{m.note}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery time by municipality */}
      <div>
        <h3 className="mb-4 text-sm font-semibold uppercase tracking-wide text-foreground-muted">
          Tiempos de entrega por municipio
        </h3>
        <div className="overflow-hidden rounded-xl border border-border-subtle">
          <div className="grid grid-cols-2 bg-muted/50 px-4 py-2 text-xs font-semibold text-foreground-muted">
            <span>Municipio</span>
            <span className="text-right">Días adicionales</span>
          </div>
          {MUNICIPALITIES.map((m, i) => (
            <div
              key={m}
              className={`grid grid-cols-2 px-4 py-2.5 text-sm ${i % 2 === 0 ? "bg-background" : "bg-muted/30"}`}
            >
              <span className="text-foreground">{m}</span>
              <span className="text-right text-foreground-muted">+0–2 días</span>
            </div>
          ))}
        </div>
      </div>

      {/* Returns */}
      <div className="flex gap-4 rounded-xl border border-border-subtle bg-success-subtle/50 p-4">
        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-brand-green" />
        <div>
          <p className="font-medium text-foreground">Garantía Yumury</p>
          <p className="mt-1 text-sm text-foreground-muted">
            Si tu envío no llega en las condiciones acordadas, te reembolsamos o reponemos sin costo adicional.
          </p>
        </div>
      </div>
    </div>
  );
}
