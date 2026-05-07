# Changelog

## 1.0.0 — Demo MVP (2025-05-06)

### Phase 1: Bootstrap
- Next.js 15 + React 19 + TypeScript 5 project setup
- Tailwind CSS v4 with custom `@theme` design tokens
- Brand colors, typography scale, shadows, gradients
- Full dark mode with warm-toned neutrals
- TypeScript types for Product, Family, Order, Tracking, Yumi, Review

### Phase 2: Mock Data & State
- 160+ products across 4 categories (alimentos, electrodomésticos, vehículos, combos)
- 15 curated combo bundles
- 3 pre-populated families with Matanzas addresses
- 8 mock orders in various statuses
- Zustand stores (cart, families, auth, UI, checkout) with localStorage persistence
- Custom hooks (useCart, useFamilies, useSearch, useMediaQuery, useYumiChat)
- Fuse.js fuzzy search over product catalog

### Phase 3: Layout & Home
- Sticky header with mega-menu categories, search command (Cmd+K), theme toggle
- Footer with navigation links
- Mobile navigation drawer
- Home page with 10 premium sections: Hero, Categories, Combos, How It Works, Tracking Showcase, Bestsellers, Families Teaser, Testimonials Marquee, Guarantee, Final CTA

### Phase 4: Catalog & Search
- Category pages with hero, filters (sidebar desktop, sheet mobile), product grid
- Product detail page (PDP) with gallery, specs, reviews, variants, sticky add-to-cart
- Related products carousel
- Full-text fuzzy search with Fuse.js

### Phase 5: Cart, Checkout & Auth
- Slide-out cart drawer with quantity controls
- 4-step checkout flow (recipient, shipping, payment, confirmation)
- Mock auth (login, register, password recovery) — any credentials work
- Order confirmation with success animation
- Orders store with order history

### Phase 6: Star Features
- **Mis Familias**: CRUD for recipient profiles, reorder in one click, alerts/preferences
- **Tracking Visual**: Timeline with photo gallery at each stage, shareable public link
- **Yumi Assistant**: Floating chat panel, keyword-matched responses, product embeds, suggestion chips

### Phase 7: Polish & Documentation
- Account dashboard with stats, recent orders, quick actions
- Account settings with collapsible sections, theme toggle, delete account flow
- Static pages: Cómo Funciona, Sobre Nosotros, FAQ (searchable), Contacto, Términos, Privacidad
- Loading skeletons with brand-tinted shimmer
- Empty states with personality and contextual CTAs
- Premium 404 and 500 error pages
- Page transition animations
- Skip-to-content accessibility link
- SEO: metadata helpers, sitemap.xml, robots.txt, JSON-LD (Organization)
- Complete i18n translation files (es.json + en.json, 200+ keys)
- Updated README and CHANGELOG
