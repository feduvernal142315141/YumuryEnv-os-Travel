"use client";

import * as React from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

type Props = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
};

const ease = [0.16, 1, 0.3, 1] as const;

export function MotionReveal({ children, delay = 0, y = 16, ...props }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, ease, delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
