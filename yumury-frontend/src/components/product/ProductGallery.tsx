"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, ZoomIn, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import type { ProductImage } from "@/types";
import { cn } from "@/lib/utils";

type ProductGalleryProps = {
  images: ProductImage[];
  productName: string;
};

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [selected, setSelected] = React.useState(0);
  const [lightboxOpen, setLightboxOpen] = React.useState(false);
  const [hovering, setHovering] = React.useState(false);

  // Mobile carousel
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  React.useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi]);

  const scrollTo = (idx: number) => {
    emblaApi?.scrollTo(idx);
    setSelected(idx);
  };

  const allImages = images.length > 0 ? images : [
    { url: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=800", alt: productName, width: 800, height: 800 },
  ];

  return (
    <>
      {/* Desktop gallery */}
      <div className="hidden md:flex gap-4">
        {/* Thumbnails sidebar */}
        {allImages.length > 1 && (
          <div className="flex flex-col gap-2 w-16 shrink-0">
            {allImages.slice(0, 5).map((img, i) => (
              <button
                key={i}
                onClick={() => setSelected(i)}
                className={cn(
                  "relative aspect-square overflow-hidden rounded-lg border-2 transition-all",
                  selected === i
                    ? "border-primary shadow-md"
                    : "border-border-subtle opacity-60 hover:opacity-100",
                )}
              >
                <Image src={img.url} alt={img.alt} fill sizes="64px" className="object-cover" />
              </button>
            ))}
          </div>
        )}

        {/* Main image */}
        <div
          className="relative flex-1 overflow-hidden rounded-2xl bg-muted cursor-zoom-in group"
          onMouseEnter={() => setHovering(true)}
          onMouseLeave={() => setHovering(false)}
          onClick={() => setLightboxOpen(true)}
        >
          <div className="aspect-square relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-0"
              >
                <Image
                  src={allImages[selected].url}
                  alt={allImages[selected].alt}
                  fill
                  priority
                  sizes="(max-width: 1280px) 50vw, 600px"
                  className={cn(
                    "object-cover transition-transform duration-500",
                    hovering && "scale-105",
                  )}
                />
              </motion.div>
            </AnimatePresence>

            {/* Zoom hint */}
            <div className="absolute bottom-3 right-3 flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1.5 text-xs text-foreground opacity-0 shadow backdrop-blur-sm transition-opacity group-hover:opacity-100">
              <ZoomIn className="h-3.5 w-3.5" />
              Ver ampliado
            </div>

            {/* Nav arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); setSelected((s) => (s - 1 + allImages.length) % allImages.length); }}
                  className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 shadow backdrop-blur-sm transition-all hover:bg-background opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setSelected((s) => (s + 1) % allImages.length); }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 shadow backdrop-blur-sm transition-all hover:bg-background opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile carousel */}
      <div className="md:hidden">
        <div className="overflow-hidden rounded-2xl bg-muted" ref={emblaRef}>
          <div className="flex">
            {allImages.map((img, i) => (
              <div
                key={i}
                className="relative min-w-0 flex-[0_0_100%] aspect-square"
                onClick={() => setLightboxOpen(true)}
              >
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  sizes="100vw"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            ))}
          </div>
        </div>
        {/* Dots */}
        {allImages.length > 1 && (
          <div className="mt-3 flex justify-center gap-1.5">
            {allImages.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollTo(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all",
                  selected === i ? "w-4 bg-primary" : "w-1.5 bg-border",
                )}
              />
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-background/95 backdrop-blur">
          <div className="relative">
            <button
              onClick={() => setLightboxOpen(false)}
              className="absolute right-3 top-3 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-background/80 shadow backdrop-blur"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="relative aspect-square">
              <Image
                src={allImages[selected].url}
                alt={allImages[selected].alt}
                fill
                sizes="90vw"
                className="object-contain"
              />
            </div>
            {allImages.length > 1 && (
              <>
                <button
                  onClick={() => setSelected((s) => (s - 1 + allImages.length) % allImages.length)}
                  className="absolute left-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 shadow backdrop-blur"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={() => setSelected((s) => (s + 1) % allImages.length)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full bg-background/80 shadow backdrop-blur"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-foreground-muted">
                  {selected + 1} / {allImages.length}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
