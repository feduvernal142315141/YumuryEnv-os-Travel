# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

---

## Project Overview

**Yumury Envíos & Travel** is a premium frontend-only MVP demo for a shipping marketplace connecting the Cuban diaspora (Miami) with recipients in Matanzas, Cuba. It is 100% frontend with mock data — no backend, no real payments, no real auth.

The 4 differentiating features that justify the product:
1. **Mis Familias** — Reusable recipient profiles; reorder with one click
2. **Tracking Visual** — Timeline with photos at each shipping stage + shareable public link
3. **Combos Curados** — Themed bundles (Apagón Ready, Ciclón Ready, Cumpleaños, Mamá Diabética, etc.)
4. **Yumi** — Conversational AI assistant (keyword-matched mock responses, no real LLM)

---

## Current State

**This is a documentation-first project. No code has been written yet — only docs exist.**

All specifications live in `docs/`. Read them in this order before building:
1. `docs/PLAN.md` — Vision, scope, stack, architecture, roadmap
2. `docs/DESIGN_SYSTEM.md` — Colors, typography, spacing, tokens, dark mode
3. `docs/FEATURES.md` — Detailed specs for all 13 features
4. `docs/MOCK_DATA.md` — All 145 products, TypeScript types, mock data schemas
5. `docs/CLAUDE_CODE_PROMPT.md` — 7 sequential prompts to build the project phase by phase

---

## Bootstrap (Phase 1)

The frontend app does not exist yet. To initialize it, create `yumury-frontend/` at the repo root and follow Prompt 1 in `docs/CLAUDE_CODE_PROMPT.md`. The project must be initialized as:

```bash
npx create-next-app@latest yumury-frontend \
  --typescript --eslint --tailwind --app --src-dir --import-alias "@/*"
cd yumury-frontend
```

---

## Development Commands (once bootstrapped)

```bash
npm run dev       # Start dev server (http://localhost:3000)
npm run build     # Production build
npm run lint      # ESLint check
npm run type-check  # tsc --noEmit (add this script manually)
```

---

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript 5 |
| Styling | Tailwind CSS v4 + design tokens |
| Components | shadcn/ui (copied into project, not imported) |
| Icons | Lucide React |
| Animation | Framer Motion |
| State | Zustand (with localStorage persistence) |
| Data fetching | TanStack React Query (mock fetcher) |
| Forms | React Hook Form + Zod |
| Search | Fuse.js (client-side fuzzy search) |
| i18n | next-intl (Spanish default, English prepared) |
| Toasts | Sonner |
| Dark mode | next-themes |
| Command palette | cmdk |
| Carousels | embla-carousel-react |
| Bottom sheets | vaul |
| Utilities | clsx, tailwind-merge, date-fns, nanoid |

---

## Architecture

### Route Groups (Next.js App Router)

```
app/
├── (marketing)/      # Landing, /como-funciona, /preguntas-frecuentes, /sobre-nosotros, /contacto
├── (shop)/           # /categorias, /categorias/[slug]/[subSlug], /producto/[slug], /buscar, /carrito, /checkout
├── cuenta/           # /cuenta (dashboard, /familias, /pedidos, /configuracion) — auth-gated
├── yumi/             # ⭐ Fullscreen AI assistant chat
├── tracking/[publicId]/  # ⭐ Public tracking link (no auth required)
└── auth/             # /login, /registro (mock — any credentials work)
```

### Component Organization

```
components/
├── ui/           shadcn/ui primitives
├── layout/       Header, Footer, BottomNav (mobile), SearchCommand (Cmd+K), YumiFAB
├── product/      ProductCard, ProductGrid, ProductGallery, ProductReviews
├── category/     CategoryHero, Filters (sheet on mobile, sidebar on desktop), Breadcrumbs
├── cart/         CartSheet (lateral slide-in), CartItem
├── checkout/     Multi-step stepper, RecipientStep, ShippingStep, PaymentStep, SuccessPage
├── families/     ⭐ FamilyCard, FamilyForm, FamilyPicker (used in checkout)
├── tracking/     ⭐ TrackingTimeline, TrackingPhotos, LiveMapAnimation
├── yumi/         ⭐ ChatBubble, SuggestionChips, ProductCardEmbed
├── combos/       ComboCard, ComboBuilder, SavingsIndicator
└── home/         Hero, CategoryGrid, CombosSection, TestimonialsMarquee, HowItWorks
```

### State (Zustand Stores)

- `useCartStore` — items, quantities, persistence in localStorage
- `useFamiliesStore` — recipient profiles CRUD, localStorage
- `useAuthStore` — mock auth state (any email/password → success)
- `useUIStore` — search open, Yumi open, sidebar open
- `useCheckoutStore` — multi-step form state

### Mock Data (`lib/mock-data/`)

All data is static TypeScript files — no API calls. 145 products across 4 categories (alimentos, electrodomésticos, vehículos, combos), 3 pre-populated families, 8 orders in various states, 50 reviews, 10 testimonials, 14 Matanzas municipalities.

---

## Design System

**Brand colors** (derive all Tailwind tokens from these):
- Green `#15803D` — primary actions, brand
- Red `#DC2626` — accents, urgency
- Orange `#EA8A1C` — secondary accent
- Yellow `#F4B81C` — warmth

**Signature gradient**: `linear-gradient(135deg, #F4B81C 0%, #EA8A1C 50%, #DC2626 100%)` — use sparingly (hero, CTAs, success states only).

**Typography**: Plus Jakarta Sans (Google Fonts, 8 weights) everywhere. Geist Mono for prices/numbers.

**Shadows**: Brand-tinted (green hue), not pure black.

**Dark mode**: Fully implemented with warm-toned neutrals (via next-themes + CSS variables).

**Mobile-first**: Design for 375px first. Bottom nav replaces header nav on mobile. Touch targets ≥ 44×44px.

---

## Development Phasing

Follow `docs/CLAUDE_CODE_PROMPT.md` sequentially — each prompt has a scoped task and success criteria:

| Phase | What gets built |
|---|---|
| 1 | Next.js bootstrap, Tailwind tokens, TypeScript types, folder structure |
| 2 | All mock data files + Zustand stores + custom hooks |
| 3 | Layout (Header, Footer, BottomNav) + full Home page (10 sections) |
| 4 | Catalog, category pages, PDP, Fuse.js search, filters |
| 5 | Cart sheet, multi-step checkout, mock auth, success page |
| 6 | ⭐ Mis Familias + ⭐ Tracking Visual + ⭐ Yumi chat |
| 7 | Account dashboard, settings, SEO, PWA, accessibility polish |

Start each new Claude Code session with `/clear` so docs are re-read fresh. Validate visually at the end of each phase before proceeding.
