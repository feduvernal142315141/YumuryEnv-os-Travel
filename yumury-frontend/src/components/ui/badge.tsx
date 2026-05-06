import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        outline: "border border-border text-foreground",
        success: "bg-success-subtle text-success",
        warning: "bg-warning-subtle text-warning-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        gradient: "bg-gradient-brand text-white",
        soft: "bg-card text-foreground border border-border-subtle backdrop-blur-md",
        bestseller: "bg-brand-orange text-white",
        featured: "bg-brand-yellow text-foreground",
        new: "bg-brand-green text-white",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant }), className)} {...props} />;
}

export { badgeVariants };
