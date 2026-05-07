"use client";

import { cn } from "@/lib/utils";
import { useUIStore } from "@/lib/stores/ui-store";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles } from "lucide-react";
import { usePathname } from "next/navigation";

export function YumiButton() {
  const pathname = usePathname();
  const toggleYumi = useUIStore((s) => s.toggleYumi);
  const yumiOpen = useUIStore((s) => s.yumiOpen);

  // Don't show on checkout or yumi fullscreen page
  if (pathname.startsWith("/checkout") || pathname === "/yumi") return null;

  return (
    <AnimatePresence>
      {!yumiOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          onClick={toggleYumi}
          className={cn(
            "fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full",
            "bg-gradient-to-br from-brand-yellow via-brand-orange to-brand-red",
            "shadow-lg shadow-brand-orange/25 hover:shadow-xl hover:shadow-brand-orange/30",
            "transition-all duration-300 hover:scale-110",
            "sm:h-14 sm:w-14 h-12 w-12"
          )}
          aria-label="Pregúntale a Yumi"
          title="Pregúntale a Yumi"
        >
          <Sparkles className="h-6 w-6 text-white" />

          {/* Breathing pulse */}
          <span className="absolute inset-0 animate-pulse rounded-full bg-brand-orange/20" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
