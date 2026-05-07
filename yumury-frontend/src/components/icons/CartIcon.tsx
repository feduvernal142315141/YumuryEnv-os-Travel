import { cn } from "@/lib/utils";

interface CartIconProps {
  className?: string;
  filled?: boolean;
  strokeWidth?: number;
}

export function CartIcon({
  className,
  filled = false,
  strokeWidth = 1.75,
}: CartIconProps) {
  return (
    <svg
      className={cn("inline-block", className)}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Cuerpo de la bolsa con fill sutil */}
      <path
        d="M5.25 8.25h13.5l-1.125 11.25a1.5 1.5 0 0 1-1.494 1.35H7.869a1.5 1.5 0 0 1-1.494-1.35L5.25 8.25Z"
        fill={filled ? "currentColor" : "none"}
        fillOpacity={filled ? 0.12 : 0}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Asas de la bolsa */}
      <path
        d="M8.25 8.25V6a3.75 3.75 0 1 1 7.5 0v2.25"
        stroke="currentColor"
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Detalle interno: línea curva sutil que sugiere contenido */}
      {filled && (
        <path
          d="M8.5 12.5c1 .5 2.25.75 3.5.75s2.5-.25 3.5-.75"
          stroke="currentColor"
          strokeWidth={strokeWidth - 0.25}
          strokeOpacity="0.4"
          strokeLinecap="round"
        />
      )}
    </svg>
  );
}
