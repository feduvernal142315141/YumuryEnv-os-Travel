# Yumury Envíos & Travel — Frontend

> Master spec lives in `../docs/`. Read `PLAN.md`, `DESIGN_SYSTEM.md`, `FEATURES.md`, `MOCK_DATA.md` before working.

This is the Next.js 15 / React 19 / Tailwind v4 frontend for Yumury — a premium frontend-only demo for a shipping marketplace from Miami to Matanzas, Cuba. **No backend, no real payments, no real auth — everything is mock.**

---

## Commands

```bash
npm run dev          # Dev server → http://localhost:3000
npm run build        # Production build (must pass without warnings)
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
```

> **Node**: needs ≥ 18.18. The repo was bootstrapped against Node 22 — if `npm run build` fails with a native-binding error from `@tailwindcss/oxide`, reinstall `node_modules` from a Node ≥ 20 shell.

---

## The 4 differentiating features (the "why" of the project)

1. **Mis Familias** — Reusable recipient profiles, reorder in one click.
2. **Tracking Visual** — Photo-rich timeline + shareable public tracking URL.
3. **Combos Curados** — Themed bundles (Apagón Ready, Ciclón Ready, Mamá Diabética, Cumpleaños…).
4. **Yumi** — Conversational assistant; **mock keyword-matched responses, NOT a real LLM call.**

---

## Stack

| Layer | Library |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript 5 |
| Styling | Tailwind CSS v4 with `@theme` tokens in `src/app/globals.css` |
| Components | shadcn/ui (copied into `src/components/ui/`, not imported) |
| Icons | `lucide-react` (always import individually for tree-shaking) |
| Animation | `framer-motion` |
| State | `zustand` (with `persist` → localStorage) |
| Data fetching | `@tanstack/react-query` (mock fetchers under `src/lib/mock-data`) |
| Forms | `react-hook-form` + `zod` (resolvers from `@hookform/resolvers`) |
| Search | `fuse.js` (client-side fuzzy over mock data) |
| i18n | `next-intl` (Spanish default, English ready in `src/messages/`) |
| Toasts | `sonner` |
| Dark mode | `next-themes` (configured in `src/components/common/theme-provider.tsx`) |
| Utilities | `clsx` + `tailwind-merge` → `cn()` in `src/lib/utils.ts` |

---

## Folder layout

```
src/
├── app/                  # Next.js routes (App Router)
├── components/
│   ├── ui/               # shadcn primitives
│   ├── layout/           # Header, Footer, BottomNav, SearchCommand, YumiFAB
│   ├── product/          # ProductCard, ProductGallery, ProductReviews…
│   ├── cart/             # CartSheet, CartItem
│   ├── checkout/         # Stepper, RecipientStep, ShippingStep, PaymentStep
│   ├── families/         # FamilyCard, FamilyForm, FamilyPicker  ⭐
│   ├── tracking/         # TrackingTimeline, TrackingPhotos, LiveMapAnimation  ⭐
│   ├── yumi/             # ChatBubble, SuggestionChips, ProductCardEmbed  ⭐
│   └── common/           # ThemeProvider, generic shared bits
├── lib/
│   ├── mock-data/        # All static catalogs / fixtures
│   ├── stores/           # Zustand stores (cart, families, auth, ui, checkout)
│   ├── hooks/            # Reusable hooks
│   └── utils.ts          # cn()
├── types/                # TS types (Product, Family, Order, Tracking, Yumi…)
├── styles/               # Extra CSS chunks if needed
└── messages/             # next-intl es.json / en.json
```

Empty folders (cart, checkout, families, etc.) are scaffolded for upcoming phases.

---

## Design tokens

All brand tokens live in `src/app/globals.css` under `@theme`. Use semantic Tailwind classes (`bg-primary`, `text-foreground`, `border-border`, `shadow-md`, etc.) — they map to the right value in light vs dark mode automatically.

Brand colors:
- `--color-brand-green: #15803D` (montañas, primary)
- `--color-brand-red: #DC2626` (avión, accent)
- `--color-brand-orange: #EA8A1C`
- `--color-brand-yellow: #F4B81C`

Gradient classes (utilities, not theme tokens):
- `.bg-gradient-brand` → `linear-gradient(135deg, #F4B81C → #EA8A1C → #DC2626)` (use sparingly: hero, single CTA, success)
- `.bg-gradient-yumury` → adds the brand green
- `.text-gradient-brand` → for headline accents
- `.bg-gradient-brand-soft` / `.bg-gradient-hero-overlay`

Typography utilities (also in `globals.css`): `.text-display-{lg,xl,2xl}`, `.text-h{1-6}`, `.text-body{,-lg,-sm}`, `.text-label`, `.text-caption`, `.text-overline`.

Fonts loaded via `next/font` in `src/app/layout.tsx`: **Plus Jakarta Sans** (display + body) and **Geist Mono** (prices, tabular nums).

Dark mode: class-based via `next-themes` (`<html class="dark">`). Tokens flip automatically inside `.dark { ... }` in `globals.css`.

---

## Conventions

- **Mobile-first** always. Design at 375px first, then expand. Touch targets ≥ 44×44.
- **No `text-black` / `text-white` hard-coded** — use semantic tokens.
- **Mock data must look real.** No "Producto 1" or lorem ipsum. Cuban names, real Matanzas municipalities, Unsplash images with specific queries.
- Animations use `framer-motion` with `cubic-bezier(0.16, 1, 0.3, 1)` (≈ `--ease-out-soft`). Default duration 250ms; never above 400ms for interactions.
- Import Lucide icons individually: `import { ShoppingCart } from "lucide-react"`.
- Use `cn()` from `@/lib/utils` to merge class lists.
- Spanish is the default language; copy in code/UI is Spanish unless noted.
- Path alias `@/*` resolves to `src/*` (set in `tsconfig.json`).

---

## Build phases (per `docs/CLAUDE_CODE_PROMPT.md`)

| Phase | Scope | Status |
|---|---|---|
| 1 | Bootstrap, tokens, types, folder structure | ✅ done |
| 2 | All mock data + Zustand stores + custom hooks | ✅ done |
| 3 | Layout (Header, Footer, BottomNav) + Home page | ✅ done |
| 4 | Catalog, category pages, PDP, Fuse.js search, filters | ✅ done |
| 5 | CartSheet, multi-step checkout, mock auth, success | ✅ done |
| 6 | Mis Familias ⭐ + Tracking Visual ⭐ + Yumi chat ⭐ | ✅ done |
| 7 | Account dashboard, settings, SEO, a11y polish | ✅ done |

---

## Notes for future iterations

- Components still use hardcoded Spanish strings — to fully leverage i18n, wrap text in `useTranslations()` calls using the keys from `src/messages/`.
- The `createMetadata()` helper in `src/lib/metadata.ts` can generate per-page SEO metadata.
- JSON-LD for individual products can be added to PDP pages using `createProductJsonLd()`.
- For production: replace mock auth with real OAuth, replace mock data with API calls, integrate Stripe for payments.
- Yumi currently uses keyword matching — swap `yumi-responses.ts` logic for real LLM calls in V2.
