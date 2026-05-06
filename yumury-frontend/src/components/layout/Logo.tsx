import Link from "next/link";
import { cn } from "@/lib/utils";

type LogoProps = {
  className?: string;
  asLink?: boolean;
  size?: "sm" | "md" | "lg";
};

export function Logo({ className, asLink = true, size = "md" }: LogoProps) {
  const sizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const content = (
    <span className={cn("font-display font-extrabold tracking-tight", sizeClasses[size], className)}>
      <span className="text-gradient-brand">Yumury</span>
      <span className="text-foreground-muted font-medium ml-1.5 text-[0.7em] tracking-normal">
        Envíos & Travel
      </span>
    </span>
  );

  if (!asLink) return content;

  return (
    <Link
      href="/"
      aria-label="Yumury Envíos & Travel"
      className="inline-flex items-center transition-opacity hover:opacity-80"
    >
      {content}
    </Link>
  );
}
