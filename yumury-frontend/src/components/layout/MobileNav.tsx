"use client";

import * as React from "react";
import Link from "next/link";
import { Menu, User, Package, Users, HelpCircle, MessageCircle, X } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { ThemeToggle } from "./ThemeToggle";
import { categories } from "@/lib/mock-data";

export function MobileNav() {
  const [open, setOpen] = React.useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon-sm"
          aria-label="Abrir menú"
          className="md:hidden"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" hideClose className="flex w-full flex-col p-0 sm:max-w-sm">
        <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
        <SheetDescription className="sr-only">
          Categorías, mi cuenta y atajos a Yumury
        </SheetDescription>
        <header className="flex items-center justify-between border-b border-border-subtle px-5 py-4">
          <Logo size="sm" />
          <SheetClose asChild>
            <Button variant="ghost" size="icon-sm" aria-label="Cerrar">
              <X className="h-5 w-5" />
            </Button>
          </SheetClose>
        </header>

        <div className="flex-1 overflow-y-auto px-5 pb-6 pt-2">
          <Accordion type="single" collapsible className="w-full">
            {categories.map((cat) => (
              <AccordionItem key={cat.id} value={cat.slug}>
                <AccordionTrigger>{cat.name}</AccordionTrigger>
                <AccordionContent>
                  <ul className="flex flex-col gap-2 pt-1">
                    <li>
                      <Link
                        href={`/categoria/${cat.slug}`}
                        onClick={() => setOpen(false)}
                        className="block text-sm font-medium text-primary"
                      >
                        Ver todo en {cat.name} →
                      </Link>
                    </li>
                    {cat.subcategories.map((sub) => (
                      <li key={sub.id}>
                        <Link
                          href={`/categoria/${cat.slug}/${sub.slug}`}
                          onClick={() => setOpen(false)}
                          className="block text-sm text-foreground-secondary hover:text-foreground"
                        >
                          {sub.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          <div className="mt-6 space-y-1">
            <p className="px-1 text-overline text-foreground-muted">Mi cuenta</p>
            {[
              { href: "/cuenta/pedidos", label: "Mis pedidos", icon: Package },
              { href: "/cuenta/familias", label: "Mis familias", icon: Users },
              { href: "/como-funciona", label: "Cómo funciona", icon: HelpCircle },
              { href: "/contacto", label: "Contacto", icon: MessageCircle },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-foreground-secondary hover:bg-card-hover hover:text-foreground"
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        <footer className="border-t border-border-subtle px-5 py-4">
          <div className="flex items-center gap-2">
            <Button asChild variant="default" size="sm" className="flex-1">
              <Link href="/auth/login" onClick={() => setOpen(false)}>
                <User className="h-4 w-4" /> Iniciar sesión
              </Link>
            </Button>
            <ThemeToggle />
          </div>
        </footer>
      </SheetContent>
    </Sheet>
  );
}
