"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export type CheckoutStep = 1 | 2 | 3 | 4;

const STEPS = [
  { n: 1, label: "Destinatario" },
  { n: 2, label: "Envío" },
  { n: 3, label: "Pago" },
  { n: 4, label: "Confirmación" },
] as const;

type ProgressIndicatorProps = {
  current: CheckoutStep;
};

export function ProgressIndicator({ current }: ProgressIndicatorProps) {
  return (
    <nav aria-label="Progreso del checkout">
      <ol className="flex items-center">
        {STEPS.map((step, idx) => {
          const done = current > step.n;
          const active = current === step.n;
          const isLast = idx === STEPS.length - 1;

          return (
            <React.Fragment key={step.n}>
              <li className="flex flex-col items-center gap-1.5">
                <motion.div
                  animate={{
                    scale: active ? 1.1 : 1,
                  }}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  className={cn(
                    "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold transition-all duration-300",
                    done
                      ? "bg-primary text-primary-foreground"
                      : active
                        ? "bg-gradient-brand text-white shadow-md"
                        : "border-2 border-border bg-background text-foreground-muted",
                  )}
                  aria-current={active ? "step" : undefined}
                >
                  {done ? <Check className="h-4 w-4" /> : step.n}
                </motion.div>
                <span
                  className={cn(
                    "hidden text-[11px] font-medium sm:block",
                    active ? "text-foreground" : done ? "text-primary" : "text-foreground-muted",
                  )}
                >
                  {step.label}
                </span>
              </li>

              {!isLast && (
                <div className="relative mx-1 h-0.5 flex-1 sm:mx-2">
                  <div className="absolute inset-0 rounded-full bg-border" />
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-primary"
                    animate={{ width: done ? "100%" : "0%" }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
}
