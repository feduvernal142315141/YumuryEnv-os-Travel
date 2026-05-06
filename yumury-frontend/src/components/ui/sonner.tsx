"use client";

import { useTheme } from "next-themes";
import { Toaster as Sonner } from "sonner";

type ToasterProps = React.ComponentProps<typeof Sonner>;

export function Toaster(props: ToasterProps) {
  const { theme = "system" } = useTheme();

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      position="bottom-right"
      richColors
      closeButton
      toastOptions={{
        classNames: {
          toast:
            "group toast border-border bg-card text-foreground shadow-lg rounded-2xl",
          description: "text-foreground-secondary",
          actionButton: "bg-primary text-primary-foreground rounded-full",
          cancelButton: "bg-secondary text-secondary-foreground rounded-full",
        },
      }}
      {...props}
    />
  );
}
