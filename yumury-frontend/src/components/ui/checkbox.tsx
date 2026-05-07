"use client";

import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

type CheckboxProps = {
  id?: string;
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  className?: string;
};

const Checkbox = React.forwardRef<HTMLButtonElement, CheckboxProps>(
  ({ id, checked, onCheckedChange, disabled, className }, ref) => {
    return (
      <button
        ref={ref}
        role="checkbox"
        id={id}
        type="button"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onCheckedChange?.(!checked)}
        className={cn(
          "flex h-4 w-4 shrink-0 items-center justify-center rounded border transition-all",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
          checked
            ? "border-primary bg-primary text-primary-foreground"
            : "border-input-border bg-background",
          disabled && "cursor-not-allowed opacity-50",
          className,
        )}
      >
        {checked && <Check className="h-3 w-3" strokeWidth={3} />}
      </button>
    );
  },
);
Checkbox.displayName = "Checkbox";

export { Checkbox };
