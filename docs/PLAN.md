# Yumury Envíos & Travel — Plan Maestro del Proyecto

> **Documento maestro** para construir un demo premium frontend-only que demuestre la visión completa del producto.

---

## 🎯 Visión del Proyecto

**Yumury** es una agencia de envíos basada en Miami, USA, que conecta a la diáspora cubana con sus familiares en la provincia de **Matanzas, Cuba**. El demo debe lograr tres cosas a la vez:

1. **Comunicar visualmente** la calidad y profesionalismo de Yumury, posicionándola como agencia premium boutique frente a la competencia genérica (Katapulk, Supermarket23, DimeCuba).
2. **Validar UX** de las features diferenciadoras (Mis Familias, Tracking Visual, Asistente Yumi, Combos Inteligentes) con flujos completos navegables.
3. **Vender la idea** a stakeholders, inversores o equipo de operaciones con un demo que se sienta como producto terminado, no como prototipo.

### Categorías de productos

- **🥗 Alimentos** — carnes, granos, aceites, lácteos, conservas, aseo personal, limpieza
- **📦 Combos** — básicos, familiares, emergencia/apagón, ciclón ready, cumpleaños
- **🔌 Electrodomésticos** — refrigeración, cocina, climatización, energía (EcoFlow/paneles), pequeños
- **🛵 Vehículos** — motos eléctricas, motos de combustión, bicicletas eléctricas, repuestos

### Audiencia

- **Compradores**: Cubanos en EE.UU. (Miami principalmente), España y otros países. Tienen buen internet, dispositivos modernos, alta familiaridad con apps tipo Amazon, Uber, DoorDash. Mobile-first pero también desktop.
- **Destinatarios**: Familiares en Matanzas, Cuba. Solo necesitan ver el tracking del pedido (link público compartible).

### Posicionamiento vs Competencia

| Competidor | Su problema | Nuestra ventaja |
|------------|-------------|-----------------|
| Katapulk | UX confusa, checkout que falla, sesiones que expiran | UX premium tipo Stripe, checkout impecable |
| Supermarket23 | Inventario que dice estar disponible y al pagar no | Inventario real-time visible, transparencia total |
| DimeCuba | Diseño anticuado catálogo de los 2010s | Diseño 2026 minimalista premium |
| Todos | Sin personalización ni perfiles familiares | "Mis Familias" con un click reordenas |
| Todos | Tracking opaco "está en camino" | Tracking visual con fotos por etapa |
| Todos | Cero IA, búsqueda básica | Asistente Yumi conversacional |
| Todos | Cobertura nacional dispersa | Especialistas en Matanzas |

---

## 🚀 Alcance del MVP Demo (Frontend Only)

**Este MVP es 100% frontend con datos mock**. No hay backend real, no hay pagos reales, no hay base de datos. Es un demo navegable de calidad de producto terminado.

### ✅ Lo que SÍ incluye

- **Landing page hero premium** que cuenta la historia de Yumury con el gradiente signature
- **Catálogo completo** con datos mock realistas y abundantes (130+ productos)
- **Sistema de categorías y subcategorías** navegable con breadcrumbs
- **Búsqueda inteligente** (Cmd+K palette, autocompletado, búsquedas recientes)
- **Filtros avanzados** (precio, categoría, disponibilidad, ordenamiento)
- **Página de producto** con galería, variantes, especificaciones, productos relacionados, reviews
- **Carrito de compras** con sheet lateral premium y persistencia en localStorage
- **Checkout multi-paso** completo (destinatario → envío → pago simulado → confirmación)
- **Página de confirmación** con animación celebratoria
- **Sistema de "Mis Familias"** completo (CRUD mock con persistencia local) ⭐
- **Tracking visual** con timeline + fotos mock por etapa ⭐
- **Combos curados temáticos** (Apagón Ready, Ciclón Ready, Cumpleaños) ⭐
- **Asistente Yumi** (chat IA simulado con respuestas mock contextuales) ⭐
- **Modo oscuro/claro** con transición fluida
- **Animaciones premium** con Framer Motion en cada interacción
- **Responsive perfecto** mobile-first con bottom nav
- **i18n estructurado** (español por defecto, inglés preparado)
- **PWA básica** (instalable, manifest, splash screens)

### ❌ Lo que NO incluye (decidido)

- Backend real (sin Medusa, sin API)
- Base de datos (todo desde archivos TS)
- Autenticación real (login mock con localStorage)
- Pagos reales con Stripe (UI tipo Stripe Elements + simulación de éxito)
- Emails reales (solo UI de notificaciones in-app)
- Panel admin (no necesario para demo)
- Suscripciones funcionales (UI completa, sin recurrencia real)

> **Nota crítica**: La UI de las features avanzadas debe verse y sentirse 100% funcional. Solo la lógica de servidor está mockeada. El demo no debe parecer un prototipo, debe parecer producto en producción.

---

## 🏗️ Stack Tecnológico Definitivo

### Core
```json
{
  "next": "^15.0.0",
  "react": "^19.0.0",
  "typescript": "^5.6.0",
  "tailwindcss": "^4.0.0"
}
```

### UI/UX
- **shadcn/ui** — componentes base, copiados al proyecto
- **lucide-react** — iconos (sistema completo)
- **framer-motion** — animaciones
- **next-themes** — modo oscuro/claro
- **embla-carousel-react** — carruseles touch-friendly
- **sonner** — toasts elegantes
- **vaul** — bottom sheets nativos en móvil
- **cmdk** — command palette estilo Linear
- **react-aria-components** — accesibilidad donde shadcn no llega

### Estado y formularios
- **zustand** — estado global (carrito, familias, UI)
- **@tanstack/react-query** — data fetching (con mock fetcher)
- **react-hook-form** + **zod** — formularios validados

### Internacionalización
- **next-intl** — estructura preparada, español default

### Utilidades
- **clsx** + **tailwind-merge** — helper `cn()`
- **date-fns** + **date-fns/locale/es** — fechas en español
- **nanoid** — IDs únicos
- **fuse.js** — búsqueda fuzzy en cliente para mock data

### Mock & Data
- **@faker-js/faker** — datos mock dinámicos
- **msw** (opcional) — simular API real

### DevX
- **eslint** + **prettier** + **prettier-plugin-tailwindcss**
- **typescript-eslint**

---

## 🗺️ Arquitectura de Información

```
/
├── (marketing)/                        Landing público
│   ├── /                               Home con hero + categorías + combos
│   ├── /como-funciona                  Página educativa 3 pasos
│   ├── /preguntas-frecuentes           FAQ
│   ├── /sobre-nosotros                 Historia Yumury y Matanzas
│   └── /contacto                       Formulario contacto
│
├── (shop)/                             Tienda
│   ├── /categorias                     Grid de las 4 categorías principales
│   ├── /categorias/[slug]              Categoría (con sus subcategorías)
│   ├── /categorias/[slug]/[subSlug]    Subcategoría con productos
│   ├── /producto/[slug]                Detalle de producto
│   ├── /buscar                         Resultados de búsqueda
│   ├── /carrito                        Carrito completo
│   └── /checkout                       Checkout multi-paso
│       └── /exito/[orderId]            Página de confirmación
│
├── /cuenta                             Área de usuario (auth mock)
│   ├── /                               Dashboard de cuenta
│   ├── /familias                       ⭐ Mis Familias (lista)
│   ├── /familias/nueva                 Crear familiar
│   ├── /familias/[id]                  Editar familiar
│   ├── /pedidos                        Historial
│   ├── /pedidos/[id]                   ⭐ Tracking visual
│   ├── /suscripciones                  UI mock
│   ├── /metodos-pago                   UI mock
│   └── /configuracion                  Preferencias + tema
│
├── /yumi                               ⭐ Asistente IA chat fullscreen
├── /tracking/[publicId]                Tracking público (sin login) compartible
│
└── /auth
    ├── /login                          Login mock
    └── /registro                       Registro mock
```

---

## 📁 Estructura del Proyecto

```
yumury-frontend/
├── app/
│   ├── (marketing)/
│   │   ├── page.tsx                    Home
│   │   ├── como-funciona/page.tsx
│   │   ├── preguntas-frecuentes/page.tsx
│   │   ├── sobre-nosotros/page.tsx
│   │   └── contacto/page.tsx
│   ├── (shop)/
│   │   ├── categorias/
│   │   │   ├── page.tsx
│   │   │   └── [slug]/
│   │   │       ├── page.tsx
│   │   │       └── [subSlug]/page.tsx
│   │   ├── producto/[slug]/page.tsx
│   │   ├── buscar/page.tsx
│   │   ├── carrito/page.tsx
│   │   └── checkout/
│   │       ├── page.tsx
│   │       └── exito/[orderId]/page.tsx
│   ├── cuenta/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── familias/
│   │   │   ├── page.tsx
│   │   │   ├── nueva/page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── pedidos/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── suscripciones/page.tsx
│   │   ├── metodos-pago/page.tsx
│   │   └── configuracion/page.tsx
│   ├── yumi/page.tsx
│   ├── tracking/[publicId]/page.tsx
│   ├── auth/
│   │   ├── login/page.tsx
│   │   └── registro/page.tsx
│   ├── layout.tsx                      Root layout con providers
│   ├── globals.css                     Tailwind + CSS variables Yumury
│   ├── manifest.ts                     PWA manifest
│   ├── robots.ts
│   ├── sitemap.ts
│   ├── not-found.tsx                   404 ilustrado
│   └── error.tsx                       Error boundary
│
├── components/
│   ├── ui/                             shadcn/ui (button, card, dialog, etc.)
│   ├── layout/
│   │   ├── header.tsx                  Header desktop
│   │   ├── header-mobile.tsx           Header móvil compacto
│   │   ├── footer.tsx
│   │   ├── bottom-nav.tsx              Bottom nav móvil
│   │   ├── account-sidebar.tsx
│   │   ├── search-command.tsx          Cmd+K palette
│   │   └── yumi-fab.tsx                Floating button para Yumi
│   ├── product/
│   │   ├── product-card.tsx
│   │   ├── product-card-compact.tsx    Para listas en sidebars
│   │   ├── product-grid.tsx
│   │   ├── product-gallery.tsx
│   │   ├── product-info.tsx
│   │   ├── product-variants.tsx
│   │   ├── product-quantity.tsx
│   │   ├── product-specs.tsx
│   │   ├── product-related.tsx
│   │   ├── product-reviews.tsx
│   │   └── product-add-button.tsx      Con animación al carrito
│   ├── category/
│   │   ├── category-hero.tsx
│   │   ├── category-card.tsx
│   │   ├── subcategory-pills.tsx
│   │   ├── filters-sheet.tsx           Sheet móvil
│   │   ├── filters-sidebar.tsx         Desktop
│   │   ├── sort-dropdown.tsx
│   │   └── breadcrumbs.tsx
│   ├── cart/
│   │   ├── cart-sheet.tsx              Sheet lateral
│   │   ├── cart-item.tsx
│   │   ├── cart-summary.tsx
│   │   ├── cart-empty.tsx
│   │   └── cart-mini.tsx               Mini en header
│   ├── checkout/
│   │   ├── checkout-stepper.tsx        Progress horizontal
│   │   ├── step-recipient.tsx
│   │   ├── step-shipping.tsx
│   │   ├── step-payment.tsx
│   │   ├── step-review.tsx
│   │   ├── checkout-summary.tsx        Sticky sidebar
│   │   └── success-animation.tsx       Confetti + checkmark
│   ├── tracking/
│   │   ├── tracking-timeline.tsx       Timeline vertical premium
│   │   ├── tracking-event.tsx
│   │   ├── tracking-photo-modal.tsx    Lightbox
│   │   ├── tracking-map.tsx            Mapa último tramo
│   │   ├── tracking-status-badge.tsx
│   │   └── tracking-share.tsx
│   ├── families/
│   │   ├── family-card.tsx             Card grande
│   │   ├── family-card-compact.tsx     Para selectores
│   │   ├── family-form.tsx
│   │   ├── family-empty.tsx            Empty state ilustrado
│   │   ├── family-avatar.tsx           Emoji o iniciales
│   │   └── recipient-selector.tsx      Modal/sheet para checkout
│   ├── yumi/
│   │   ├── yumi-chat.tsx               Container principal
│   │   ├── yumi-message.tsx            Burbuja mensaje
│   │   ├── yumi-input.tsx              Input con sugerencias
│   │   ├── yumi-suggestions.tsx        Chips de prompts
│   │   ├── yumi-product-card.tsx       Card embebida en chat
│   │   ├── yumi-typing.tsx             Loading dots
│   │   └── yumi-welcome.tsx            Pantalla bienvenida
│   ├── home/
│   │   ├── hero-section.tsx
│   │   ├── hero-stats.tsx
│   │   ├── categories-grid.tsx
│   │   ├── combos-showcase.tsx
│   │   ├── combo-card-large.tsx
│   │   ├── popular-products.tsx
│   │   ├── how-it-works.tsx
│   │   ├── testimonials-marquee.tsx
│   │   ├── matanzas-section.tsx        Storytelling
│   │   ├── trust-badges.tsx
│   │   └── cta-section.tsx
│   ├── auth/
│   │   ├── login-form.tsx
│   │   └── register-form.tsx
│   ├── shared/
│   │   ├── price-tag.tsx
│   │   ├── price-with-compare.tsx
│   │   ├── badge-stock.tsx
│   │   ├── badge-new.tsx
│   │   ├── badge-featured.tsx
│   │   ├── empty-state.tsx
│   │   ├── error-state.tsx
│   │   ├── theme-toggle.tsx
│   │   ├── language-switcher.tsx
│   │   ├── logo.tsx                    SVG del logo Yumury
│   │   └── gradient-text.tsx           Texto con gradiente brand
│   └── animations/
│       ├── fade-in.tsx
│       ├── slide-up.tsx
│       ├── stagger-children.tsx
│       ├── scale-on-tap.tsx
│       └── confetti.tsx
│
├── lib/
│   ├── mock-data/                      ⭐ TODO el catálogo mock
│   │   ├── categories.ts
│   │   ├── products/
│   │   │   ├── alimentos.ts
│   │   │   ├── electrodomesticos.ts
│   │   │   ├── vehiculos.ts
│   │   │   └── index.ts
│   │   ├── combos.ts
│   │   ├── orders.ts                   Pedidos mock para historial
│   │   ├── families.ts                 Familias mock
│   │   ├── tracking-events.ts          Eventos de tracking mock
│   │   ├── reviews.ts                  Reviews mock
│   │   ├── testimonials.ts
│   │   ├── municipalities.ts           Municipios de Matanzas
│   │   ├── yumi-responses.ts           Respuestas mock del bot
│   │   └── index.ts                    Re-exports
│   ├── stores/
│   │   ├── cart-store.ts
│   │   ├── families-store.ts
│   │   ├── recent-searches-store.ts
│   │   ├── auth-store.ts               Mock auth
│   │   └── ui-store.ts
│   ├── hooks/
│   │   ├── use-cart.ts
│   │   ├── use-families.ts
│   │   ├── use-product-search.ts
│   │   ├── use-debounce.ts
│   │   ├── use-media-query.ts
│   │   ├── use-keyboard-shortcut.ts    Para Cmd+K
│   │   └── use-local-storage.ts
│   ├── api/                            Mock fetchers (estructura como API real)
│   │   ├── products.ts
│   │   ├── categories.ts
│   │   ├── orders.ts
│   │   └── yumi.ts
│   ├── utils.ts                        cn() + helpers
│   ├── format.ts                       formatPrice, formatDate, formatPhone
│   ├── validations.ts                  Zod schemas
│   └── constants.ts                    Constantes (rutas, config)
│
├── types/
│   ├── product.ts
│   ├── category.ts
│   ├── order.ts
│   ├── family.ts
│   ├── tracking.ts
│   ├── yumi.ts
│   └── index.ts
│
├── public/
│   ├── images/
│   │   ├── products/                   Imágenes mock productos
│   │   ├── categories/                 Imágenes hero categorías
│   │   ├── tracking/                   Fotos mock tracking
│   │   ├── illustrations/              Empty states custom
│   │   ├── home/                       Imágenes hero, secciones
│   │   ├── matanzas/                   Fotos del Valle Yumurí, Varadero
│   │   └── og/                         Open Graph images
│   ├── icons/                          Favicons + PWA icons
│   ├── logo.svg                        Logo Yumury vectorial
│   └── logo-mark.svg                   Solo el ícono (montañas + círculo)
│
├── messages/
│   ├── es.json                         Default
│   └── en.json
│
├── .env.local.example
├── .eslintrc.json
├── .prettierrc
├── tailwind.config.ts
├── components.json                     shadcn config
├── tsconfig.json
├── next.config.ts
├── package.json
└── README.md
```

---

## 🚀 Plan de Implementación por Fases

### Fase 0 — Setup y Fundación (Día 1)

**Objetivo**: Proyecto inicializado con todos los fundamentos en su lugar.

1. Crear proyecto Next.js 15 con TypeScript
2. Configurar Tailwind v4 con tokens Yumury (ver DESIGN_SYSTEM.md)
3. Instalar y configurar shadcn/ui
4. Setup de fuentes con `next/font` (Plus Jakarta Sans + Inter)
5. Estructura completa de carpetas
6. ESLint + Prettier + prettier-plugin-tailwindcss
7. Configurar `next-intl` con archivos `es.json` y `en.json`
8. Crear `app/layout.tsx` con todos los providers
9. Componente `Logo` con SVG
10. `ThemeToggle` funcional con `next-themes`
11. Páginas placeholder de TODAS las rutas principales (con título y "En construcción")
12. PWA manifest básico

**Entregable**: Proyecto navegable con tema light/dark funcionando, fuentes cargadas, todas las rutas accesibles aunque vacías.

### Fase 1 — Mock Data + Layout Base (Día 2)

**Objetivo**: Toda la data mock lista y header/footer/navegación funcionando.

1. Crear todos los archivos en `lib/mock-data/` (ver MOCK_DATA.md)
2. Tipos TypeScript completos en `types/`
3. Header desktop con logo, búsqueda, navegación, carrito, cuenta
4. Header móvil compacto
5. Bottom navigation móvil (Inicio, Categorías, Carrito, Yumi, Cuenta)
6. Footer completo con secciones, redes, datos de contacto
7. Search command palette (Cmd+K) con búsqueda fuzzy en mock data
8. Yumi FAB (Floating Action Button) preparado

**Entregable**: Layouts navegables, búsqueda Cmd+K funcional, header/footer pulidos.

### Fase 2 — Catálogo y Productos (Día 3-4)

**Objetivo**: Toda la experiencia de descubrimiento de productos completa.

1. Página `/categorias` — grid de las 4 categorías
2. Página `/categorias/[slug]` — vista de categoría con subcategorías
3. Página `/categorias/[slug]/[subSlug]` — productos filtrados
4. Filtros sidebar desktop + sheet móvil
5. Sort dropdown
6. `ProductCard` con todas las variantes y estados
7. `ProductGrid` con stagger animation
8. Página `/producto/[slug]` con galería, info, variantes, especs, related, reviews
9. Página `/buscar` con resultados agrupados
10. Skeleton loaders para todas las cargas
11. Empty states donde aplique

**Entregable**: Catálogo completo navegable y bonito.

### Fase 3 — Carrito y Checkout (Día 5-6)

**Objetivo**: Flujo de compra completo de principio a fin.

1. Zustand `cart-store` con persistencia
2. `CartSheet` lateral con animaciones premium
3. Add to cart con animación "fly to cart"
4. Página `/carrito` completa
5. `CheckoutStepper` con 4 pasos
6. Step 1: Selector de destinatario (con familias mock o crear nuevo)
7. Step 2: Método de envío
8. Step 3: Pago (UI tipo Stripe Elements, sin lógica real)
9. Step 4: Review final
10. Loading state al "procesar pago" (3 segundos mock)
11. Página `/checkout/exito/[orderId]` con confetti animado

**Entregable**: Usuario puede completar una orden mock end-to-end.

### Fase 4 — Cuenta + Mis Familias + Tracking (Día 7-8)

**Objetivo**: Diferenciadores principales funcionando.

1. Login mock que solo guarda usuario fake en localStorage
2. Layout de cuenta con sidebar
3. Dashboard con stats personales mock
4. ⭐ Página `/cuenta/familias` con grid de familias
5. ⭐ Formulario crear/editar familia con validación Zod
6. Avatares con emoji + selector
7. Empty state ilustrado para familias
8. Página `/cuenta/pedidos` con lista de pedidos
9. ⭐ Página `/cuenta/pedidos/[id]` con tracking visual completo
10. Timeline vertical con eventos
11. Lightbox de fotos del tracking
12. Mapa mock para último tramo
13. Botón "Compartir tracking" que copia link a portapapeles

**Entregable**: Sistema de familias y tracking visual brillando como diferenciadores.

### Fase 5 — Yumi + Combos + Home Premium (Día 9-10)

**Objetivo**: Las features wow factor del demo.

1. ⭐ Página `/yumi` con chat fullscreen
2. Pantalla de bienvenida con sugerencias rápidas
3. Lógica mock de respuestas contextuales (ver YUMI_RESPONSES en MOCK_DATA.md)
4. Productos embebidos en mensajes con CTA "Añadir"
5. Yumi FAB en todas las páginas (excepto checkout)
6. ⭐ Página de detalle de combo con lista de productos incluidos
7. Sección destacada de combos en home
8. Hero section premium con gradiente Yumury
9. Sección "Cómo funciona" con 3 pasos animados
10. Sección "Hecho en Matanzas" (storytelling)
11. Testimonios marquee infinito
12. Trust badges (envíos seguros, garantía, etc.)
13. CTA final con gradiente

**Entregable**: Home premium que vende la marca, Yumi funcional, combos curados.

### Fase 6 — Pulido Final + PWA (Día 11)

**Objetivo**: Detalles que hacen la diferencia entre prototipo y producto.

1. Microinteracciones en todos los botones
2. Page transitions con Framer Motion
3. Animaciones de scroll (intersection observer)
4. Optimización de imágenes (next/image properly)
5. Open Graph + meta tags por página
6. PWA install prompt
7. Splash screens iOS/Android
8. Favicon set completo
9. Sitemap + robots
10. Error boundaries elegantes
11. 404 page ilustrada
12. Tour guiado opcional para primer uso (con `react-joyride` o custom)
13. Performance audit (Lighthouse > 95)
14. Accesibilidad audit (WCAG AA)

**Entregable**: Demo listo para presentar, indistinguible de un producto en producción.

---

## 🎨 Principios Rectores del Proyecto

Estos principios deben gobernar TODAS las decisiones de implementación:

### 1. Mobile-First, sin compromisos
Todo se diseña primero para móvil 375px de ancho. Desktop es una mejora, no la base.

### 2. Performance es UX
- Lazy load todo lo que se pueda
- Skeleton loaders, nunca spinners genéricos
- Imágenes con `next/image` siempre
- Suspense boundaries estratégicos
- Bundle pequeño (lucide-react importado por íconos individuales)

### 3. Animar con propósito
Cada animación debe tener una razón. Nunca animar por animar. Las animaciones premium son sutiles, rápidas y comunican estado.

### 4. Tipografía como protagonista
Headlines grandes y confiados. Jerarquía clara siempre. El texto comunica antes que la imagen.

### 5. Espaciado generoso
Más blanco que apretado. Aire para respirar. Stripe-tier breathing room.

### 6. Color con propósito
Verde Yumury para acciones primarias, rojo para destacar/urgencia, gradiente reservado para momentos especiales (hero, combos premium, success).

### 7. Datos mock realistas
Nada de "Producto de prueba 1" o "Lorem ipsum". Todo el mock data debe parecer real. Nombres de productos creíbles, precios coherentes, imágenes reales de Unsplash.

### 8. Consistencia obsesiva
Si un botón primario es de cierto tamaño y radio en una página, es igual en TODAS. Sistema de diseño respetado siempre.

### 9. Accesibilidad no negociable
- Contraste WCAG AA mínimo
- Focus states visibles
- Aria labels donde corresponde
- Navegación por teclado funcional
- Touch targets 44x44px mínimo

### 10. El demo se vende solo
Cada pantalla debe vender la idea de Yumury sin necesidad de explicación. Si necesitas explicar algo, el diseño falló.

---

## 📦 Mock Data: Cantidades Mínimas

Para que el demo se sienta real:

| Tipo | Cantidad mínima |
|------|----------------|
| Categorías principales | 4 |
| Subcategorías totales | ~22 |
| Productos alimentos | 80-100 |
| Productos electrodomésticos | 30-40 |
| Productos vehículos | 15-20 |
| Combos curados | 12-15 |
| Familias en demo logueado | 3-4 |
| Pedidos en historial | 5-8 (varios estados) |
| Reviews por producto | 5-15 |
| Testimonios | 8-10 |
| Municipios de Matanzas | 14 (los reales) |

Detalle completo en **MOCK_DATA.md**.

---

## 🎯 Definition of Done

El demo está terminado cuando:

✅ Se puede navegar el sitio completo sin errores
✅ Mobile y desktop se ven y funcionan perfecto
✅ Light y dark mode funcionan en TODAS las páginas
✅ Se puede completar una compra mock end-to-end
✅ Se puede crear/editar/eliminar familias
✅ Se puede ver el tracking visual de un pedido mock
✅ Yumi responde a las queries de ejemplo de forma contextual
✅ Búsqueda Cmd+K funciona
✅ Animaciones se sienten premium, no robóticas
✅ Lighthouse Performance > 90
✅ Lighthouse Accessibility > 95
✅ Cero `console.error` en producción
✅ El demo es indistinguible de un producto real para usuarios no técnicos

---

## 🚦 Próximos Pasos Después del MVP Demo

Cuando el demo esté listo y se valide la dirección:

1. **Backend real con Medusa.js v2** (manteniendo el frontend)
2. **Stripe Connect** para pagos reales
3. **Auth real** con Clerk o Auth.js
4. **Panel admin** para Yumury Miami
5. **App de operaciones** para almacén Matanzas
6. **Yumi real** con OpenAI/Claude API + RAG sobre catálogo
7. **Notificaciones reales** push + email + SMS
8. **Analytics** con Posthog
9. **Tests E2E** con Playwright

---

> **Continúa con DESIGN_SYSTEM.md** para entender la identidad visual completa.
