"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Star, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";

const ease = [0.16, 1, 0.3, 1] as const;

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Soft brand glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[900px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(244,184,28,0.35), rgba(220,38,38,0.15), transparent)",
        }}
      />

      <div className="mx-auto grid max-w-[1440px] grid-cols-1 items-center gap-10 px-6 pb-16 pt-12 md:gap-16 md:pb-24 md:pt-20 lg:grid-cols-[1.1fr_1fr]">
        <div className="flex flex-col gap-6">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-border-subtle bg-card/70 px-3.5 py-1.5 text-overline text-foreground-secondary backdrop-blur-md"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green-light opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-green" />
            </span>
            Envíos a Matanzas, Cuba
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.05 }}
            className="text-display-lg md:text-display-xl"
          >
            Conecta con tu familia en{" "}
            <span className="text-gradient-brand">Matanzas</span>, sin distancias
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.1 }}
            className="max-w-xl text-body-lg text-foreground-secondary"
          >
            La forma más confiable y moderna de enviarles lo que necesitan. Comida,
            electrodomésticos, motos eléctricas. Todo con tracking en tiempo real y
            fotos en cada etapa.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.15 }}
            className="flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <Button asChild variant="gradient" size="lg">
              <Link href="/categoria/alimentos">
                Empezar a comprar <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="ghost" size="lg">
              <Link href="/como-funciona">Ver cómo funciona</Link>
            </Button>
          </motion.div>

          <motion.ul
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: 0.22 }}
            className="mt-2 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs font-medium text-foreground-muted"
          >
            <li className="inline-flex items-center gap-1.5">
              <Truck className="h-3.5 w-3.5 text-brand-green" />
              +10,000 pedidos entregados
            </li>
            <li className="inline-flex items-center gap-1.5">
              <ShieldCheck className="h-3.5 w-3.5 text-brand-green" />
              Garantía Yumury
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Star className="h-3.5 w-3.5 fill-brand-yellow text-brand-yellow" />
              4.9 / 5 · 14 municipios
            </li>
          </motion.ul>
        </div>

        {/* Visual collage */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease, delay: 0.1 }}
          className="relative mx-auto h-[440px] w-full max-w-[520px] sm:h-[520px]"
        >
          {/* Main hero image */}
          <div className="absolute inset-0 overflow-hidden rounded-[32px] shadow-xl">
            <Image
              src="https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=1200"
              alt="Familia cubana en Matanzas"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/30 via-transparent to-transparent" />
          </div>

          {/* Floating tracking card */}
          <motion.div
            initial={{ opacity: 0, x: -20, rotate: -4 }}
            animate={{ opacity: 1, x: 0, rotate: -4 }}
            transition={{ duration: 0.5, ease, delay: 0.5 }}
            className="absolute -left-3 bottom-10 w-56 rounded-2xl border border-border-subtle bg-card/95 p-4 shadow-xl backdrop-blur md:-left-8"
          >
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-green-light opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand-green" />
              </span>
              <span className="text-overline text-foreground-muted">En tránsito</span>
            </div>
            <p className="mt-2 text-sm font-semibold">
              Combo Familiar Premium
            </p>
            <p className="text-xs text-foreground-muted">Cárdenas · Matanzas</p>
            <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-gradient-brand"
                style={{ width: "72%" }}
              />
            </div>
            <p className="mt-1.5 text-[10px] font-mono text-foreground-muted">
              ETA · 2 días
            </p>
          </motion.div>

          {/* Floating combo card */}
          <motion.div
            initial={{ opacity: 0, x: 20, rotate: 3 }}
            animate={{ opacity: 1, x: 0, rotate: 3 }}
            transition={{ duration: 0.5, ease, delay: 0.6 }}
            className="absolute -right-3 top-12 w-52 rounded-2xl border border-border-subtle bg-card/95 p-4 shadow-xl backdrop-blur md:-right-6"
          >
            <span className="inline-flex items-center gap-1 rounded-full bg-gradient-brand px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
              Apagón Ready
            </span>
            <p className="mt-2 text-sm font-semibold">EcoFlow + LEDs + Power Bank</p>
            <div className="mt-2 flex items-baseline gap-1.5">
              <span className="font-mono text-base font-bold">$890</span>
              <span className="font-mono text-xs text-foreground-muted line-through">$1,010</span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
