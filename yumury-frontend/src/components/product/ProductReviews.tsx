"use client";

import * as React from "react";
import Image from "next/image";
import { Star, ThumbsUp, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import type { Review } from "@/types";
import { cn } from "@/lib/utils";

type ProductReviewsProps = {
  reviews: Review[];
  productId: string;
};

const RATING_FILTER_OPTIONS = [
  { label: "Todas", value: 0 },
  { label: "5★", value: 5 },
  { label: "4★", value: 4 },
  { label: "3★", value: 3 },
  { label: "Con fotos", value: -1 },
];

const PAGE_SIZE = 5;

export function ProductReviews({ reviews }: ProductReviewsProps) {
  const [ratingFilter, setRatingFilter] = React.useState(0);
  const [visibleCount, setVisibleCount] = React.useState(PAGE_SIZE);
  const [helpfulClicked, setHelpfulClicked] = React.useState<Set<string>>(new Set());

  const filtered = React.useMemo(() => {
    return reviews.filter((r) => {
      if (ratingFilter === -1) return r.photos && r.photos.length > 0;
      if (ratingFilter > 0) return r.rating === ratingFilter;
      return true;
    });
  }, [reviews, ratingFilter]);

  const visible = filtered.slice(0, visibleCount);

  const avg = reviews.length
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const breakdown = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews.filter((r) => r.rating === stars).length,
    pct: reviews.length
      ? Math.round((reviews.filter((r) => r.rating === stars).length / reviews.length) * 100)
      : 0,
  }));

  const toggleHelpful = (id: string) => {
    setHelpfulClicked((s) => {
      const next = new Set(s);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  return (
    <div className="space-y-8" id="reviews">
      {/* Stats header */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-10">
        {/* Average */}
        <div className="text-center sm:text-left">
          <div className="text-6xl font-bold tabular-nums text-foreground">
            {avg.toFixed(1)}
          </div>
          <div className="mt-1 flex items-center justify-center gap-0.5 sm:justify-start">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={cn(
                  "h-4 w-4",
                  s <= Math.round(avg)
                    ? "fill-brand-yellow text-brand-yellow"
                    : "fill-muted text-border",
                )}
              />
            ))}
          </div>
          <p className="mt-1 text-sm text-foreground-muted">{reviews.length} reseñas</p>
        </div>

        {/* Breakdown bars */}
        <div className="flex-1 space-y-1.5">
          {breakdown.map((b) => (
            <button
              key={b.stars}
              onClick={() => setRatingFilter(b.stars === ratingFilter ? 0 : b.stars)}
              className="flex w-full items-center gap-2.5 text-sm group"
            >
              <span className="w-3 text-right text-foreground-muted">{b.stars}</span>
              <Star className="h-3.5 w-3.5 fill-brand-yellow text-brand-yellow shrink-0" />
              <div className="h-2 flex-1 overflow-hidden rounded-full bg-muted">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${b.pct}%` }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  className="h-full rounded-full bg-brand-yellow"
                />
              </div>
              <span className="w-8 text-right text-xs text-foreground-muted">{b.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        {RATING_FILTER_OPTIONS.map((opt) => (
          <button
            key={opt.value}
            onClick={() => { setRatingFilter(opt.value); setVisibleCount(PAGE_SIZE); }}
            className={cn(
              "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all",
              ratingFilter === opt.value
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-foreground-muted hover:bg-muted/80",
            )}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Review list */}
      <div className="space-y-6">
        {visible.length === 0 ? (
          <p className="text-sm text-foreground-muted">
            No hay reseñas con ese filtro.
          </p>
        ) : (
          visible.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              helpfulActive={helpfulClicked.has(review.id)}
              onHelpful={() => toggleHelpful(review.id)}
            />
          ))
        )}
      </div>

      {/* Load more */}
      {visibleCount < filtered.length && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={() => setVisibleCount((c) => c + PAGE_SIZE)}
          >
            Ver más reseñas ({filtered.length - visibleCount} restantes)
          </Button>
        </div>
      )}
    </div>
  );
}

function ReviewCard({
  review,
  helpfulActive,
  onHelpful,
}: {
  review: Review;
  helpfulActive: boolean;
  onHelpful: () => void;
}) {
  const helpfulCount = helpfulActive ? review.helpful + 1 : review.helpful;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-3 border-b border-border-subtle pb-6 last:border-b-0"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xl">
            {review.userAvatar ?? "👤"}
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">{review.userName}</p>
            <p className="text-xs text-foreground-muted">{review.userLocation}</p>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="flex gap-0.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <Star
                key={s}
                className={cn(
                  "h-3.5 w-3.5",
                  s <= review.rating
                    ? "fill-brand-yellow text-brand-yellow"
                    : "fill-muted text-border",
                )}
              />
            ))}
          </div>
          <p className="text-xs text-foreground-muted">
            {new Date(review.date).toLocaleDateString("es-ES", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Body */}
      <div>
        <p className="mb-1 font-medium text-foreground">{review.title}</p>
        <p className="text-sm leading-relaxed text-foreground-muted">{review.content}</p>
      </div>

      {/* Photos */}
      {review.photos && review.photos.length > 0 && (
        <div className="flex gap-2">
          {review.photos.map((ph, i) => (
            <div key={i} className="relative h-16 w-16 overflow-hidden rounded-lg bg-muted">
              <Image src={ph} alt="Foto de reseña" fill sizes="64px" className="object-cover" />
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center gap-4">
        {review.verified && (
          <span className="flex items-center gap-1 text-xs text-brand-green">
            <CheckCircle className="h-3.5 w-3.5" />
            Compra verificada
          </span>
        )}
        <button
          onClick={onHelpful}
          className={cn(
            "ml-auto flex items-center gap-1.5 rounded-full px-3 py-1 text-xs transition-colors",
            helpfulActive
              ? "bg-primary/10 text-primary"
              : "text-foreground-muted hover:text-foreground",
          )}
        >
          <ThumbsUp className="h-3.5 w-3.5" />
          Útil ({helpfulCount})
        </button>
      </div>
    </motion.div>
  );
}
