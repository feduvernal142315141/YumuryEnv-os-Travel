"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/lib/mock-data";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { cn } from "@/lib/utils";

const AUTO_INTERVAL = 6000;

export function TestimonialsSection() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const perView = isDesktop ? 3 : 1;
  const total = testimonials.length;
  const maxIndex = Math.max(0, total - perView);

  const [index, setIndex] = React.useState(0);
  const [paused, setPaused] = React.useState(false);

  React.useEffect(() => {
    setIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  React.useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, AUTO_INTERVAL);
    return () => clearInterval(id);
  }, [paused, maxIndex]);

  const visible = testimonials.slice(index, index + perView);

  return (
    <section className="bg-background-secondary/40 py-16 md:py-24">
      <div className="mx-auto max-w-[1440px] px-6">
        <div className="mb-12 flex flex-col gap-3 text-center md:mb-16">
          <span className="text-overline text-brand-orange">Testimonios reales</span>
          <h2 className="mx-auto text-h1">
            Familias que ya confían en Yumury
          </h2>
          <p className="mx-auto max-w-xl text-body-lg text-foreground-secondary">
            Más de 5,000 familias en Miami, Tampa, Madrid y más, conectando con sus
            seres queridos en Matanzas.
          </p>
        </div>

        <div
          className="relative"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6"
            >
              {visible.map((t) => (
                <article
                  key={t.id}
                  className="flex h-full flex-col rounded-3xl border border-border-subtle bg-card p-6 shadow-md md:p-8"
                >
                  <Quote className="h-6 w-6 text-brand-orange opacity-60" />
                  <p className="mt-4 flex-1 text-base leading-relaxed text-foreground">
                    “{t.quote}”
                  </p>
                  <div className="mt-6 flex items-center gap-3 border-t border-border-subtle pt-5">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-brand-soft text-2xl">
                      {t.avatar}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold">{t.name}</p>
                      <p className="text-xs text-foreground-muted">
                        {t.location} · enviado a {t.sentTo}
                      </p>
                    </div>
                    <div className="flex items-center gap-0.5 text-brand-yellow">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-current" />
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-3">
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Anterior"
              onClick={() => setIndex((p) => Math.max(0, p - 1))}
              disabled={index === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <div className="flex items-center gap-1.5">
              {Array.from({ length: maxIndex + 1 }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={`Ir al testimonio ${i + 1}`}
                  className={cn(
                    "h-2 rounded-full transition-all",
                    i === index ? "w-8 bg-gradient-brand" : "w-2 bg-border",
                  )}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Siguiente"
              onClick={() => setIndex((p) => Math.min(maxIndex, p + 1))}
              disabled={index >= maxIndex}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
