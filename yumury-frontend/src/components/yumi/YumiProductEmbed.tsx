"use client";

import Link from "next/link";
import { ShoppingCart } from "lucide-react";

type Props = {
  slug: string;
  name?: string;
  price?: number;
  image?: string;
};

export function YumiProductEmbed({ slug, name, price, image }: Props) {
  return (
    <Link
      href={`/producto/${slug}`}
      className="flex items-center gap-3 rounded-lg border border-border bg-card p-2.5 transition-colors hover:bg-card-hover"
    >
      {image && (
        <img
          src={image}
          alt={name || slug}
          className="h-10 w-10 rounded-md object-cover"
        />
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-foreground truncate">
          {name || slug}
        </p>
        {price && (
          <p className="text-xs font-semibold text-brand-green font-mono">
            ${price.toFixed(2)}
          </p>
        )}
      </div>
      <ShoppingCart className="h-3.5 w-3.5 text-foreground-muted shrink-0" />
    </Link>
  );
}
