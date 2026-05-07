"use client";

import * as React from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Package, RotateCcw, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import { useCartStore } from "@/lib/stores/cart-store";
import { useCheckoutStore } from "@/lib/stores/checkout-store";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Logo } from "@/components/layout/Logo";

const NEXT_STEPS = [
  {
    step: 1,
    title: "Confirmación por email",
    description: "Te enviamos los detalles de tu pedido.",
  },
  {
    step: 2,
    title: "Preparación en Miami",
    description: "Empezamos a armar tu pedido en nuestro almacén.",
  },
  {
    step: 3,
    title: "Actualizaciones con fotos",
    description: "Recibirás fotos en cada etapa del envío.",
  },
  {
    step: 4,
    title: "Entrega a tu familiar",
    description: "Tu familia recibe el envío directamente en su casa.",
  },
];

function ConfirmacionContent() {
  const params = useSearchParams();
  const orderId = params.get("orderId") ?? "YUM-2025-000001";
  const eta = params.get("eta") ?? "pronto";
  const total = params.get("total") ?? "0.00";
  const recipient = params.get("recipient") ?? "tu familiar";

  // Clear cart & checkout state now that the order is confirmed.
  // Done here (destination) instead of pago's cleanup (source) to avoid
  // synchronous Zustand updates racing with React 19 transitions.
  React.useEffect(() => {
    useCartStore.getState().clear();
    useCheckoutStore.getState().reset();
  }, []);

  // Fire confetti — load module first, then delay until after paint
  React.useEffect(() => {
    const colors = ["#15803D", "#F4B81C", "#EA8A1C", "#DC2626", "#ffffff"];
    let raf: number;
    let timeouts: ReturnType<typeof setTimeout>[] = [];

    import("canvas-confetti").then((mod) => {
      const confetti = mod.default;

      // Initial big burst from center after first paint
      const t0 = setTimeout(() => {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { x: 0.5, y: 0.55 },
          colors,
          scalar: 1.1,
        });
      }, 100);

      // Sustained side-cannons for ~3 s
      const end = Date.now() + 3000;

      const frame = () => {
        confetti({
          particleCount: 6,
          angle: 60,
          spread: 65,
          origin: { x: 0 },
          colors,
        });
        confetti({
          particleCount: 6,
          angle: 120,
          spread: 65,
          origin: { x: 1 },
          colors,
        });
        if (Date.now() < end) {
          raf = requestAnimationFrame(frame);
        }
      };

      // Start side-cannons 150 ms after mount so they overlap the big burst
      const t1 = setTimeout(() => {
        raf = requestAnimationFrame(frame);
      }, 150);

      timeouts = [t0, t1];
    });

    return () => {
      timeouts.forEach(clearTimeout);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const whatsappMsg = encodeURIComponent(
    `¡Hola! Te hice un envío a través de Yumury 🎁\nPedido: ${orderId}\nLlega el: ${eta}\nTotal: $${total}`,
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Minimal header */}
      <header className="border-b border-border py-4">
        <div className="mx-auto flex max-w-[1280px] justify-center px-4">
          <Logo size="sm" />
        </div>
      </header>

      <main className="flex flex-1 items-start justify-center py-12 px-4">
        <div className="w-full max-w-lg text-center">
          {/* Animated checkmark */}
          <motion.div
            initial={{ scale: 0, rotate: -15 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20, delay: 0.1 }}
            className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-brand shadow-lg"
          >
            <CheckCircle2 className="h-10 w-10 text-white" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h1 className="text-display-lg font-bold text-foreground">¡Pedido confirmado!</h1>
            <p className="mt-2 text-foreground-muted">
              Tu pedido{" "}
              <span className="font-mono font-semibold text-foreground">#{orderId}</span> está en
              camino
            </p>
          </motion.div>

          {/* Order summary card */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
            className="mt-8 rounded-2xl border border-border bg-card p-6 text-left shadow-sm"
          >
            <div className="grid gap-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-foreground-muted">Destinatario</span>
                <span className="font-semibold capitalize">{recipient}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-foreground-muted">Llegada estimada</span>
                <span className="font-semibold text-primary">{eta}</span>
              </div>
              <Separator />
              <div className="flex items-center justify-between text-base font-bold">
                <span>Total pagado</span>
                <span className="font-mono tabular-nums">${total}</span>
              </div>
            </div>
          </motion.div>

          {/* What's next */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-8 rounded-2xl border border-border bg-card p-6 text-left"
          >
            <h2 className="text-sm font-bold uppercase tracking-wide text-foreground-muted mb-4">
              ¿Qué sigue?
            </h2>
            <div className="space-y-4">
              {NEXT_STEPS.map((s, i) => (
                <div key={s.step} className="flex items-start gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                    {s.step}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{s.title}</p>
                    <p className="text-xs text-foreground-muted">{s.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
            className="mt-8 flex flex-col gap-3"
          >
            <Button
              asChild
              size="lg"
              className="w-full bg-gradient-brand text-white hover:opacity-90 shadow-md"
            >
              <Link href="/cuenta/pedidos">
                <Package className="mr-2 h-4 w-4" /> Ver tracking del pedido
              </Link>
            </Button>

            <Button asChild size="lg" variant="outline" className="w-full">
              <Link href="/">
                <RotateCcw className="mr-2 h-4 w-4" /> Seguir comprando
              </Link>
            </Button>

            <Button
              asChild
              size="lg"
              variant="ghost"
              className="w-full text-[#25D366] hover:bg-[#25D366]/10"
            >
              <a
                href={`https://wa.me/?text=${whatsappMsg}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Share2 className="mr-2 h-4 w-4" /> Compartir por WhatsApp
              </a>
            </Button>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="mt-6 text-xs text-foreground-muted"
          >
            Te enviamos una confirmación y updates con fotos a cada etapa del envío.
          </motion.p>
        </div>
      </main>
    </div>
  );
}

export default function CheckoutConfirmacion() {
  return (
    <React.Suspense fallback={<div className="flex min-h-screen items-center justify-center"><div className="animate-spin h-8 w-8 rounded-full border-4 border-primary border-t-transparent" /></div>}>
      <ConfirmacionContent />
    </React.Suspense>
  );
}
