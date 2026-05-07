"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

type Photo = {
  url: string;
  caption?: string;
  location?: string;
  date?: string;
};

type Props = {
  photos: Photo[];
  onClose: () => void;
};

export function TrackingPhotos({ photos, onClose }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  if (!photos.length) return null;
  const photo = photos[0];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-2xl w-full"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <X className="h-5 w-5" />
          </button>

          <img
            src={photo.url}
            alt={photo.caption || "Foto del envío"}
            className="w-full rounded-xl object-cover shadow-2xl"
          />

          {photo.caption && (
            <p className="mt-3 text-center text-sm text-white/80">
              {photo.caption}
            </p>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
