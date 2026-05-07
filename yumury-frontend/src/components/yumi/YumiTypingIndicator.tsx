"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function YumiTypingIndicator() {
  return (
    <div className="flex items-start gap-2">
      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-brand-yellow to-brand-orange">
        <Sparkles className="h-3.5 w-3.5 text-white" />
      </div>
      <div className="rounded-2xl rounded-bl-md border border-border bg-card px-4 py-3">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="h-2 w-2 rounded-full bg-foreground-muted"
              animate={{ y: [0, -6, 0] }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
