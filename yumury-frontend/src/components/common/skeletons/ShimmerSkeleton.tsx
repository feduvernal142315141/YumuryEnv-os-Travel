import { cn } from "@/lib/utils";

/** Brand-tinted shimmer skeleton — uses green-hued gradient instead of generic gray */
export function ShimmerSkeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-lg bg-muted/50",
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-brand-green-50/40 to-transparent dark:via-brand-green-900/20" />
    </div>
  );
}
