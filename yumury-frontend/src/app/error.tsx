"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, Mail, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-16 text-center bg-background">
      <div
        aria-hidden
        className="pointer-events-none absolute top-1/3 left-1/2 h-[300px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(220,38,38,0.2), rgba(234,138,28,0.15), transparent)",
        }}
      />

      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-destructive-subtle">
        <AlertTriangle className="h-10 w-10 text-destructive" />
      </div>

      <h1 className="mt-6 text-h2 font-bold text-foreground">
        Algo salió mal
      </h1>
      <p className="mt-2 max-w-md text-body text-foreground-secondary">
        Estamos trabajando en arreglarlo. Puedes intentar de nuevo o contactarnos
        si el problema persiste.
      </p>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row">
        <Button onClick={reset}>
          <RotateCcw className="h-4 w-4" />
          Intentar de nuevo
        </Button>
        <Button asChild variant="outline">
          <Link href="/contacto">
            <Mail className="h-4 w-4" />
            Reportar problema
          </Link>
        </Button>
        <Button asChild variant="ghost">
          <Link href="/">
            <Home className="h-4 w-4" />
            Ir al inicio
          </Link>
        </Button>
      </div>

      {error.digest && (
        <p className="mt-6 text-xs text-foreground-muted font-mono">
          Error ID: {error.digest}
        </p>
      )}
    </div>
  );
}
