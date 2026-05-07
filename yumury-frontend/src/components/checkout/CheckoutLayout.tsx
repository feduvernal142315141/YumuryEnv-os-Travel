"use client";

import * as React from "react";
import Link from "next/link";
import { Lock } from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { ProgressIndicator, type CheckoutStep } from "./ProgressIndicator";
import { OrderSummary } from "./OrderSummary";

type CheckoutLayoutProps = {
  step: CheckoutStep;
  children: React.ReactNode;
};

export function CheckoutLayout({ step, children }: CheckoutLayoutProps) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Minimal header */}
      <header className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-30">
        <div className="mx-auto flex h-14 max-w-[1280px] items-center justify-between px-4 md:px-6">
          <Logo size="sm" />
          <div className="flex items-center gap-1.5 text-xs text-foreground-muted font-medium">
            <Lock className="h-3.5 w-3.5 text-primary" />
            Compra segura
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="border-b border-border bg-card/50 py-4">
        <div className="mx-auto max-w-[1280px] px-4 md:px-6">
          <ProgressIndicator current={step} />
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 py-8 md:py-12">
        <div className="mx-auto grid max-w-[1280px] gap-8 px-4 md:px-6 lg:grid-cols-[1fr_380px]">
          {/* Left: step content */}
          <div>{children}</div>

          {/* Right: sticky order summary */}
          <div className="hidden lg:block">
            <OrderSummary className="sticky top-[calc(theme(spacing.14)+theme(spacing.16)+theme(spacing.8))]" />
          </div>
        </div>

        {/* Mobile order summary at bottom */}
        <div className="mx-auto mt-8 max-w-[1280px] px-4 md:px-6 lg:hidden">
          <OrderSummary />
        </div>
      </main>

      {/* Minimal footer */}
      <footer className="border-t border-border py-4 text-center text-xs text-foreground-muted">
        <div className="flex items-center justify-center gap-4">
          <Link href="/terminos" className="hover:text-foreground transition-colors">Términos</Link>
          <Link href="/privacidad" className="hover:text-foreground transition-colors">Privacidad</Link>
          <Link href="/contacto" className="hover:text-foreground transition-colors">Soporte</Link>
        </div>
      </footer>
    </div>
  );
}
