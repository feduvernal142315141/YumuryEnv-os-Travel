"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "lucide-react";
import { CartIcon } from "@/components/icons/CartIcon";
import { useCartStore, selectTotalItems } from "@/lib/stores/cart-store";
import { useUIStore } from "@/lib/stores/ui-store";
import { useAuthStore } from "@/lib/stores/auth-store";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";
import { MegaMenuCategories } from "./MegaMenuCategories";
import { MobileNav } from "./MobileNav";
import { SearchCommand, SearchTrigger } from "./SearchCommand";
import { ThemeToggle } from "./ThemeToggle";
import { UserMenu } from "./UserMenu";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { cn } from "@/lib/utils";

export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const cartCount = useCartStore(selectTotalItems);
  const { toggleCart } = useUIStore();
  const user = useAuthStore((s) => s.user);

  React.useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrolled(window.scrollY > 80);
          ticking = false;
        });
        ticking = true;
      }
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300",
          scrolled
            ? "border-b border-border bg-background/85 backdrop-blur-md"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <div className="mx-auto flex h-14 max-w-[1440px] items-center gap-3 px-4 md:h-16 md:px-6">
          <MobileNav />

          <div className="flex flex-1 items-center justify-center gap-8 md:flex-none md:justify-start">
            <Logo size="md" />
          </div>

          <nav className="hidden flex-1 items-center justify-center gap-7 text-foreground-secondary md:flex">
            <MegaMenuCategories />
            <Link
              href="/categoria/combos"
              className="text-label hover:text-foreground transition-colors"
            >
              Combos
            </Link>
            <Link
              href="/como-funciona"
              className="text-label hover:text-foreground transition-colors"
            >
              Cómo funciona
            </Link>
            <Link
              href="/cuenta/familias"
              className="text-label hover:text-foreground transition-colors"
            >
              Mis familias
            </Link>
          </nav>

          <div className="hidden md:block md:w-[280px] lg:w-[320px]">
            <SearchTrigger className="w-full" />
          </div>

          <div className="ml-auto flex items-center gap-1 md:gap-2">
            <SearchTrigger variant="compact" className="md:hidden" />
            <div className="hidden sm:block">
              <ThemeToggle />
            </div>

            {/* User — auth-aware */}
            {user ? (
              <div className="hidden sm:block">
                <UserMenu />
              </div>
            ) : (
              <Button
                asChild
                variant="ghost"
                size="icon-sm"
                aria-label="Mi cuenta"
                className="hidden sm:inline-flex"
              >
                <Link href="/auth/login">
                  <User className="h-4 w-4" />
                </Link>
              </Button>
            )}

            {/* Cart button */}
            <Button
              variant="ghost"
              size="icon-sm"
              aria-label={`Carrito${cartCount ? ` (${cartCount})` : ""}`}
              className="relative"
              onClick={toggleCart}
            >
              <CartIcon
                className="h-[22px] w-[22px]"
                filled={cartCount > 0}
                strokeWidth={cartCount > 0 ? 2 : 1.75}
              />
              <AnimatePresence>
                {cartCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="absolute -right-0.5 -top-0.5 flex h-4 min-w-[16px] items-center justify-center rounded-full bg-gradient-brand px-1 text-[10px] font-bold text-white shadow-md"
                  >
                    {cartCount > 99 ? "99+" : cartCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>
      </motion.header>

      <SearchCommand />
      <CartDrawer />
    </>
  );
}
