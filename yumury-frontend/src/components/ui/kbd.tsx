import * as React from "react";
import { cn } from "@/lib/utils";

export function Kbd({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <kbd
      className={cn(
        "inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-md border border-border bg-card px-1.5 font-mono text-[10px] font-semibold text-foreground-muted shadow-sm",
        className,
      )}
      {...props}
    />
  );
}
