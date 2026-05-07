# Yumury Envíos & Travel

Premium shipping marketplace connecting the Cuban diaspora in Miami with their families in Matanzas, Cuba. **Frontend-only demo MVP** — no backend, no real payments, no real auth.

## Key Features

- **Mis Familias** — Reusable recipient profiles; reorder with one click
- **Tracking Visual** — Timeline with photos at each shipping stage + shareable public link
- **Combos Curados** — Themed bundles (Apagón Ready, Ciclón Ready, Mamá Diabética, etc.)
- **Yumi** — Conversational AI assistant (keyword-matched mock responses)

## Tech Stack

| Layer | Library |
|---|---|
| Framework | Next.js 15 (App Router) + React 19 + TypeScript 5 |
| Styling | Tailwind CSS v4 + design tokens |
| Components | shadcn/ui (copied locally) |
| Icons | Lucide React |
| Animation | Framer Motion |
| State | Zustand (localStorage persistence) |
| Data Fetching | TanStack React Query (mock fetchers) |
| Forms | React Hook Form + Zod |
| Search | Fuse.js (client-side fuzzy) |
| i18n | next-intl (es default, en ready) |
| Toasts | Sonner |
| Dark Mode | next-themes |

## Getting Started

### Prerequisites

- Node.js >= 18.18 (recommended: 22)
- npm

### Install & Run

```bash
cd yumury-frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

```bash
npm run dev          # Dev server (http://localhost:3000)
npm run build        # Production build
npm run lint         # ESLint
npm run type-check   # tsc --noEmit
```

## Project Structure

```
src/
├── app/                    # Next.js routes (App Router)
│   ├── (shop)/             # Main shop pages (home, catalog, PDP, search, cart, account)
│   ├── auth/               # Login, register, password recovery
│   ├── checkout/           # Multi-step checkout flow
│   └── tracking/           # Public tracking pages
├── components/
│   ├── ui/                 # shadcn/ui primitives
│   ├── layout/             # Header, Footer, MobileNav, SearchCommand
│   ├── product/            # ProductCard, Gallery, Filters, Grid
│   ├── cart/               # CartDrawer, CartItem
│   ├── checkout/           # Stepper, OrderSummary
│   ├── families/           # FamilyCard, FamilyForm
│   ├── tracking/           # TrackingTimeline, TrackingPhotos
│   ├── yumi/               # YumiButton, YumiChatPanel
│   ├── home/               # Hero, CategoriesGrid, Combos, Testimonials
│   └── common/             # Providers, PageTransition, skeletons, empty states
├── lib/
│   ├── mock-data/          # All static data (160+ products, 15 combos, 8 orders)
│   ├── stores/             # Zustand stores (cart, families, auth, ui, checkout)
│   ├── hooks/              # Custom hooks (cart, search, media queries, yumi)
│   ├── metadata.ts         # SEO metadata helpers
│   └── utils.ts            # cn() utility
├── types/                  # TypeScript type definitions
├── messages/               # i18n translation files (es.json, en.json)
└── i18n/                   # next-intl configuration
```

## Mock Data

All data is static TypeScript — no API calls:

- **160+ products** across 4 categories (alimentos, electrodomésticos, vehículos, combos)
- **15 curated combos** (Apagón Ready, Ciclón Ready, Mamá Diabética, Cumpleaños, etc.)
- **3 pre-populated families** with Matanzas addresses
- **8 orders** in various statuses (pending through delivered)
- **14 Matanzas municipalities** as delivery zones
- **50 product reviews** and **10 testimonials**

## Design System

- **Brand colors**: Green (#15803D), Red (#DC2626), Orange (#EA8A1C), Yellow (#F4B81C)
- **Typography**: Plus Jakarta Sans (body/display) + Geist Mono (prices)
- **Dark mode**: Fully implemented with warm-toned neutrals
- **Mobile-first**: Designed for 375px first, responsive to 1920px

## Auth

Mock authentication — any email/password combination works. User data persists in localStorage.

## Roadmap (V2)

- [ ] Real backend (API + database)
- [ ] Stripe payment integration
- [ ] Real authentication (OAuth, email verification)
- [ ] Yumi powered by actual LLM
- [ ] Push notifications for tracking
- [ ] PWA / offline support
- [ ] Admin dashboard

## License

Private — all rights reserved.
