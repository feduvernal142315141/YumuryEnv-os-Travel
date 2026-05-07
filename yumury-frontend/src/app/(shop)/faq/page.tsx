"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Search,
  Truck,
  CreditCard,
  Package,
  MapPin,
  User,
  RefreshCw,
  MessageCircle,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqCategories } from "@/lib/mock-data/faq";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Truck,
  CreditCard,
  Package,
  MapPin,
  User,
  RefreshCw,
};

export default function FAQPage() {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState(faqCategories[0].id);

  const filteredCategories = useMemo(() => {
    if (!search.trim()) return faqCategories;
    const q = search.toLowerCase();
    return faqCategories
      .map((cat) => ({
        ...cat,
        items: cat.items.filter(
          (item) =>
            item.question.toLowerCase().includes(q) ||
            item.answer.toLowerCase().includes(q),
        ),
      }))
      .filter((cat) => cat.items.length > 0);
  }, [search]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="text-center"
      >
        <h1 className="text-h1 md:text-display-lg">Preguntas frecuentes</h1>
        <p className="mt-2 text-foreground-secondary">
          Todo lo que necesitas saber sobre Yumury
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease, delay: 0.1 }}
        className="mx-auto mt-8 max-w-xl relative"
      >
        <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-foreground-muted" />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Buscar en preguntas frecuentes..."
          className="w-full rounded-2xl border border-border bg-card py-3 pl-11 pr-4 text-sm text-foreground placeholder:text-foreground-muted focus:outline-none focus:ring-2 focus:ring-primary/50"
        />
      </motion.div>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[220px_1fr]">
        {/* Sidebar (desktop) / Horizontal tabs (mobile) */}
        <div>
          {/* Desktop sidebar */}
          <nav className="hidden lg:block sticky top-24 space-y-1">
            {faqCategories.map((cat) => {
              const Icon = iconMap[cat.icon];
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    document
                      .getElementById(`faq-${cat.id}`)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={cn(
                    "flex w-full items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm font-medium transition-all text-left",
                    activeCategory === cat.id
                      ? "bg-primary/10 text-primary"
                      : "text-foreground-secondary hover:bg-card-hover",
                  )}
                >
                  {Icon && <Icon className="h-4 w-4 shrink-0" />}
                  {cat.name}
                </button>
              );
            })}
          </nav>

          {/* Mobile tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar lg:hidden">
            {faqCategories.map((cat) => {
              const Icon = iconMap[cat.icon];
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setActiveCategory(cat.id);
                    document
                      .getElementById(`faq-${cat.id}`)
                      ?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }}
                  className={cn(
                    "flex shrink-0 items-center gap-1.5 rounded-full border px-3.5 py-2 text-xs font-medium transition-all",
                    activeCategory === cat.id
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-foreground-secondary",
                  )}
                >
                  {Icon && <Icon className="h-3.5 w-3.5" />}
                  {cat.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* FAQ content */}
        <div className="space-y-10">
          {filteredCategories.length === 0 ? (
            <div className="py-16 text-center">
              <Search className="mx-auto h-10 w-10 text-foreground-muted" />
              <p className="mt-4 text-foreground-secondary">
                No encontramos preguntas que coincidan con &ldquo;{search}&rdquo;
              </p>
            </div>
          ) : (
            filteredCategories.map((cat) => {
              const Icon = iconMap[cat.icon];
              return (
                <motion.div
                  key={cat.id}
                  id={`faq-${cat.id}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, ease }}
                  className="scroll-mt-24"
                >
                  <div className="flex items-center gap-2 mb-4">
                    {Icon && <Icon className="h-5 w-5 text-primary" />}
                    <h2 className="text-h4">{cat.name}</h2>
                  </div>
                  <Accordion type="single" collapsible>
                    {cat.items.map((item) => (
                      <AccordionItem
                        key={item.id}
                        value={item.id}
                        className="border-b border-border"
                      >
                        <AccordionTrigger className="text-left text-sm font-medium py-4">
                          {item.question}
                        </AccordionTrigger>
                        <AccordionContent className="text-sm text-foreground-secondary pb-4">
                          {item.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </motion.div>
              );
            })
          )}
        </div>
      </div>

      {/* Bottom CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease }}
        className="mt-16 rounded-2xl border border-border bg-card p-8 text-center"
      >
        <h3 className="text-h4">¿No encuentras tu respuesta?</h3>
        <p className="mt-2 text-sm text-foreground-secondary">
          Nuestro equipo está listo para ayudarte.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild>
            <Link href="/contacto">
              <Mail className="h-4 w-4" />
              Contáctanos
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/yumi">
              <MessageCircle className="h-4 w-4" />
              Pregúntale a Yumi
            </Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
