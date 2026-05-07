import * as React from "react";
import type { ProductSpec } from "@/types";

type ProductSpecsProps = {
  specs: ProductSpec[];
};

export function ProductSpecs({ specs }: ProductSpecsProps) {
  // Group by group field — called before any conditional return
  const groups = React.useMemo(() => {
    const map = new Map<string, ProductSpec[]>();
    for (const spec of specs) {
      const key = spec.group ?? "General";
      const arr = map.get(key) ?? [];
      arr.push(spec);
      map.set(key, arr);
    }
    return map;
  }, [specs]);

  if (specs.length === 0) {
    return (
      <p className="text-sm text-foreground-muted">
        Sin especificaciones técnicas disponibles.
      </p>
    );
  }

  return (
    <div className="space-y-6">
      {Array.from(groups.entries()).map(([group, items]) => (
        <div key={group}>
          <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-foreground-muted">
            {group}
          </h3>
          <div className="overflow-hidden rounded-xl border border-border-subtle">
            {items.map((spec, i) => (
              <div
                key={spec.label}
                className={`flex items-start gap-4 px-4 py-3 text-sm ${
                  i % 2 === 0 ? "bg-background" : "bg-muted/40"
                }`}
              >
                <span className="w-1/2 shrink-0 font-medium text-foreground-muted">
                  {spec.label}
                </span>
                <span className="text-foreground">{spec.value}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
