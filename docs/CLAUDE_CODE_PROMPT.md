# 🚀 Claude Code — Prompt Inicial para Yumury

> Documento final. Contiene el prompt optimizado para iniciar el proyecto en Claude Code, plus comandos de seguimiento para cada fase de construcción.

---

## 🎯 Cómo usar este documento

1. Crea una carpeta vacía para el proyecto: `mkdir yumury-frontend && cd yumury-frontend`
2. Copia los 6 documentos `.md` adentro de la carpeta `docs/`:
   ```
   yumury-frontend/
   └── docs/
       ├── README.md
       ├── PLAN.md
       ├── DESIGN_SYSTEM.md
       ├── FEATURES.md
       ├── MOCK_DATA.md
       └── CLAUDE_CODE_PROMPT.md
   ```
3. Inicia Claude Code en esa carpeta: `claude`
4. Pega el **Prompt Maestro** de la sección 1 abajo
5. Sigue los prompts de las fases 2–7 conforme avanzas

---

## 🧠 Filosofía de los Prompts

**Cada prompt tiene 3 partes**:
1. **Contexto** — qué hay y qué necesitas que Claude Code entienda
2. **Tarea** — qué quieres que haga AHORA, con scope claro
3. **Criterios de éxito** — cómo sabes que está bien hecho

**Por qué dividir en fases**: Claude Code rinde mejor con scopes acotados. Un mega-prompt "constrúyelo todo" termina en código mediocre. Iterar fase por fase + revisar antes de seguir = calidad alta.

**Trucos importantes**:
- Empieza cada nueva sesión con `/clear` para que Claude Code re-lea los docs frescos
- Usa `/init` después del prompt maestro para que escanee el proyecto y cree `CLAUDE.md`
- Si algo sale mal, dile específicamente: "esto no me gustó porque X, hazlo así Y"
- No tengas miedo de decir "borra esto y empieza de nuevo"

---

## 📋 PROMPT 1 — Setup Inicial y Bootstrap

> **Cuándo usarlo**: Sesión 1, proyecto vacío. Claude Code va a inicializar Next.js + dependencias + estructura base + tipos TypeScript + config.

```
Vas a construir Yumury Envíos & Travel — una marketplace premium frontend-only de envíos a Matanzas, Cuba.

CONTEXTO IMPORTANTE
Lee EN ESTE ORDEN los documentos en docs/ antes de hacer NADA:
1. docs/README.md (vista general)
2. docs/PLAN.md (visión, alcance MVP, stack, arquitectura, roadmap)
3. docs/DESIGN_SYSTEM.md (identidad visual, colores, tipografía, componentes)
4. docs/FEATURES.md (specs detalladas de cada feature)
5. docs/MOCK_DATA.md (catálogo, combos, familias, pedidos, tracking, Yumi)

Cuando termines de leer, confírmame con un resumen de 5 bullets de:
- Qué es Yumury
- Qué stack vas a usar
- Qué 4 features diferenciadoras hay
- Qué identidad visual tiene
- Qué fases de desarrollo hay

TAREA — FASE 1: BOOTSTRAP

Inicializa el proyecto Next.js 15 con todo lo siguiente:

1. Crear el proyecto:
   - Next.js 15 con App Router
   - TypeScript estricto
   - ESLint + Prettier
   - Tailwind CSS v4
   - src/ directory
   - Import alias: @/*

2. Instalar dependencias:
   - shadcn/ui (initialization con tema "neutral", base color stone)
   - lucide-react
   - framer-motion
   - zustand
   - @tanstack/react-query
   - next-intl (para i18n es/en)
   - clsx + tailwind-merge
   - sonner (notificaciones toast)
   - fuse.js (búsqueda fuzzy)

3. Configurar Tailwind v4 con TODOS los design tokens del DESIGN_SYSTEM.md:
   - Brand colors: green (#15803D), red (#DC2626), orange (#EA8A1C), yellow (#F4B81C)
   - Backgrounds light/dark
   - Tipografía Plus Jakarta Sans (Google Fonts)
   - Custom spacing y border-radius
   - El gradiente signature

4. Crear estructura de carpetas exacta:
   src/
   ├── app/                    (rutas Next)
   ├── components/
   │   ├── ui/                 (shadcn)
   │   ├── layout/
   │   ├── product/
   │   ├── cart/
   │   ├── checkout/
   │   ├── families/
   │   ├── tracking/
   │   ├── yumi/
   │   └── common/
   ├── lib/
   │   ├── mock-data/
   │   ├── stores/             (zustand)
   │   ├── hooks/
   │   └── utils/
   ├── types/
   ├── styles/
   └── messages/               (i18n)

5. Crear TODOS los tipos TypeScript del MOCK_DATA.md:
   - types/category.ts
   - types/product.ts
   - types/family.ts
   - types/order.ts
   - types/tracking.ts
   - types/yumi.ts
   - types/review.ts
   - types/user.ts

6. Setup de fuentes y CSS global:
   - Plus Jakarta Sans desde Google Fonts en layout.tsx
   - Variables CSS del design system en src/app/globals.css
   - Configuración dark mode

7. Crear /CLAUDE.md (usar `/init` o crearlo manualmente) con resumen del proyecto, comandos importantes, convenciones.

CRITERIOS DE ÉXITO
- npm run dev arranca sin errores
- npm run build pasa sin warnings
- npm run lint no muestra errores
- La página inicial muestra "Yumury — En construcción" con la tipografía y colores del brand correctamente aplicados
- TypeScript no se queja de ningún tipo

NO HAGAS
- No crees todavía las páginas reales (eso es Fase 2-7)
- No empieces a poblar el mock data (eso es Fase 2)
- No instales librerías extra que no estén listadas (pregúntame primero)

Empieza ya. Cuando termines, hazme un resumen de qué creaste y muéstrame el árbol de archivos final.
```

---

## 📋 PROMPT 2 — Mock Data y Stores

> **Cuándo usarlo**: Después de validar Fase 1 con `npm run dev`.

```
FASE 2: MOCK DATA + STORES

Lee de nuevo docs/MOCK_DATA.md completo.

TAREA

1. Crear todos los archivos de mock data en src/lib/mock-data/ siguiendo EXACTAMENTE las estructuras del MOCK_DATA.md:

   - categories.ts (4 categorías + subcategorías)
   - municipalities.ts (14 municipios de Matanzas)
   - user.ts (mock user)
   - products/alimentos.ts (75 productos COMPLETOS — no abreviar, no usar "..." — generar todos con la estructura completa siguiendo los 5 ejemplos detallados como guía)
   - products/electrodomesticos.ts (36 productos COMPLETOS)
   - products/vehiculos.ts (19 productos COMPLETOS)
   - products/index.ts
   - combos.ts (los 15 combos completos)
   - families.ts (3 familias)
   - tracking-events.ts (8 arrays completos — uno por cada pedido del orders.ts, cada uno con 8 eventos)
   - orders.ts (8 pedidos)
   - reviews.ts (50 reviews — usar los templates del doc para generar la variedad necesaria)
   - testimonials.ts (10 testimonios)
   - yumi-responses.ts (patterns completos)
   - faq.ts (categorías + items)
   - index.ts (re-exports + helpers)

   IMPORTANTE: Para las imágenes, usar URLs reales de Unsplash con queries específicos. NO usar placeholders. Para productos genéricos como "arroz", "pollo", "aceite" — usa búsquedas como `https://images.unsplash.com/photo-XXX?w=800` con fotos profesionales reales que combinen con el producto.

2. Crear stores Zustand en src/lib/stores/:

   - cart-store.ts:
     * Items del carrito con persistencia (localStorage)
     * addItem, removeItem, updateQuantity, clear
     * Selectors: total items, subtotal, etc.

   - families-store.ts:
     * Lista de familias agregadas, familia seleccionada
     * Persistencia en localStorage
     * addFamily, updateFamily, deleteFamily, selectFamily

   - ui-store.ts:
     * Modales abiertos, toasts, drawer state
     * Tema (light/dark/system)
     * Yumi chat abierto

   - checkout-store.ts:
     * Estado del checkout multi-step
     * Datos del recipient, shipping, payment

3. Crear hooks customizados básicos en src/lib/hooks/:
   - use-cart.ts (wrapper del cart store con helpers)
   - use-families.ts
   - use-search.ts (con Fuse.js + debounce)
   - use-media-query.ts

4. Configurar next-intl con messages/es.json y messages/en.json (al menos las claves del MOCK_DATA.md, el resto se completa después).

CRITERIOS DE ÉXITO
- Todos los productos compilan en TypeScript sin errores de tipo
- npm run build pasa
- Puedo importar `import { allProducts } from '@/lib/mock-data'` y obtener 145 productos (75+36+19+15)
- Los stores funcionan en una página de prueba simple

ANTES DE EMPEZAR
Confírmame que vas a generar 130 productos COMPLETOS sin abreviar nada (75 alimentos + 36 electros + 19 vehículos). Esta es la única vez que voy a aceptar que esto tome bastante tiempo de tu lado, porque el mock data es la columna vertebral del demo.

Una vez confirmado, dale.
```

---

## 📋 PROMPT 3 — Layout, Header, Footer, Home

> **Cuándo usarlo**: Después de validar que mock data + stores funcionan.

```
FASE 3: LAYOUT BASE + HOMEPAGE

Re-lee docs/DESIGN_SYSTEM.md y la sección "1. Home (/)" del docs/FEATURES.md.

TAREA

1. Crear el layout principal en src/app/layout.tsx:
   - Plus Jakarta Sans aplicada
   - Theme provider (light/dark con next-themes)
   - Toaster de sonner
   - QueryClientProvider
   - NextIntlClientProvider

2. Crear src/components/layout/:
   - Header.tsx — sticky, transparente sobre hero, sólido al hacer scroll. Logo Yumury (placeholder SVG por ahora con el gradient signature), nav, search bar, account menu, cart drawer trigger. Mobile: hamburger menu.
   - Footer.tsx — 4 columnas (Empresa, Productos, Soporte, Legal), info de contacto, social icons, copyright. Diseño dark con acento del brand gradient.
   - MobileNav.tsx — drawer con animación slide-in
   - SearchCommand.tsx — Cmd+K (shadcn Command), search dentro de mock products usando Fuse.js

3. Crear src/app/page.tsx (Home) con TODAS las secciones:

   a) HeroSection.tsx
      - Headline grande con highlight "Matanzas" en color gradient
      - Subheadline
      - 2 CTAs (primario + secundario)
      - Imagen lateral o background con foto real (Unsplash de paisaje cubano)
      - Trust badges row debajo (4 stats: pedidos, familias, municipios, garantía)
      - Animaciones: fade-in stagger con framer-motion al cargar

   b) CategoriesGrid.tsx
      - Grid 2x2 (mobile: 1 col, desktop: 4 col)
      - Cards con imagen, ícono Lucide, nombre, descripción corta, productCount
      - Hover: lift + scale sutil con framer-motion
      - Click navega a /categoria/[slug]

   c) FeaturedCombosSection.tsx
      - "Combos curados con propósito"
      - Carousel horizontal en mobile, grid en desktop
      - Mostrar 6 combos featured (Apagón Ready, Familiar Básico, Cumpleaños, etc.)
      - Cada combo card con badge, imagen, name, comboItems preview, price con discount

   d) FamilySectionTeaser.tsx
      - Showcase del sistema "Mis Familias" (la feature ⭐)
      - Mockup visual de cómo se ven las cards de familia
      - CTA: "Crear cuenta y guardar familias"

   e) HowItWorksSection.tsx
      - 4 pasos con íconos: Elige > Paga > Tracking > Recibe
      - Visual horizontal scroll en mobile, grid 4 col desktop
      - Animación stagger al entrar al viewport

   f) TrackingShowcaseSection.tsx
      - Showcase del visual tracking (otra feature ⭐)
      - Mock de un timeline con 4-5 eventos visibles
      - "Ve cada paso del envío con fotos reales"

   g) TestimonialsSection.tsx
      - Carousel de testimonios (usar mock testimonials.ts)
      - Auto-advance cada 5s
      - Quote, name, location, avatar, rating estrellas

   h) BestsellersSection.tsx
      - Grid 4 productos más vendidos
      - ProductCard con badge "Bestseller"

   i) GuaranteeSection.tsx
      - "Garantía Yumury" con 3-4 puntos clave
      - Diseño card con border subtle gradient

   j) CTAFinalSection.tsx
      - Banner final full-width con gradient signature de fondo
      - "Empieza a enviar a Matanzas hoy"
      - CTA grande

4. Crear src/components/product/ProductCard.tsx:
   - Image con aspect-ratio 1:1
   - Badges (Bestseller, Featured, Nuevo)
   - Name, brand
   - Rating + reviewCount
   - Price con compare-price si aplica
   - "Añadir" button compacto
   - Hover: lift + shadow + scale
   - Skeleton loader variant

CRITERIOS DE ÉXITO
- La home se ve premium y diferenciada vs Katapulk/Supermarket23
- Todas las secciones tienen contenido real del mock data, no lorem ipsum
- Animaciones fluidas con framer-motion (sin overdose)
- Responsive perfecto: mobile, tablet, desktop
- Dark mode funciona en todas las secciones
- npm run build pasa
- Lighthouse Performance > 85 en mobile

DESIGN CHECKS
- Antes de "terminar", revisa el DESIGN_SYSTEM.md y verifica:
  * ¿Los colores brand están bien aplicados? ¿No hay colores fuera del sistema?
  * ¿La tipografía sigue la jerarquía? (display = headline, h2 = sections, etc.)
  * ¿El gradient signature se usa con moderación? (en CTAs principales, no por todos lados)
  * ¿Hay suficiente whitespace generoso?
  * ¿Las animaciones son sutiles, no exageradas?

Cuando termines, hazme un screenshot mental de cómo se ve la home y dime qué secciones quedaron mejor y cuáles podrían mejorarse en una iteración futura.
```

---

## 📋 PROMPT 4 — Catálogo, Producto, Búsqueda

> **Cuándo usarlo**: Después de validar la home.

```
FASE 4: CATÁLOGO + PRODUCT PAGE + BÚSQUEDA

Re-lee secciones 2 (Catálogo), 3 (Producto), 4 (Búsqueda) del docs/FEATURES.md.

TAREA

1. Crear /categoria/[slug]/page.tsx (Server Component):
   - Hero de categoría con imagen y descripción
   - Sidebar con filtros (subcategoría, precio range, brand, rating, availability)
   - Sort dropdown (popular, precio asc/desc, rating, newest)
   - Grid de productos responsive
   - Paginación o infinite scroll (preferido)
   - Filtros sincronizados con URL params (search params)
   - Mobile: filtros en sheet drawer

2. Crear src/components/product/ProductFilters.tsx con todos los filtros funcionales.

3. Crear /producto/[slug]/page.tsx (PDP):
   - Image gallery (carrusel + thumbnails). Mobile: swipe.
   - Badges del producto
   - Title, brand, rating + reviews count (link a sección reviews)
   - Price con compare-price y descuento %
   - Variant selector (si aplica): size, color, weight, etc.
   - Quantity selector
   - "Añadir al carrito" CTA grande
   - "Comprar ahora" CTA secundario
   - Trust badges row: envío estimado, garantía, métodos de pago
   - Tabs/Accordion: Descripción larga, Specs, Reviews, FAQ
   - Sección "Productos relacionados" (mismo subcategory)
   - Sección "Reviews" con paginación
   - Si es combo: mostrar lista de items incluidos visualmente

4. Crear src/components/product/:
   - ProductGallery.tsx (con zoom on desktop, swipe en mobile)
   - VariantSelector.tsx (radio buttons custom para tipo)
   - ProductBadges.tsx
   - ProductSpecs.tsx (tabla agrupada por groups)
   - ProductReviews.tsx (lista + estadísticas + filtros por estrellas)
   - RelatedProducts.tsx
   - StickyAddToCart.tsx (sticky bar mobile cuando se hace scroll)

5. Implementar búsqueda completa:
   - SearchCommand.tsx con Cmd+K
   - Resultados agrupados (productos, combos, categorías)
   - Highlight del query en resultados
   - Empty state con sugerencias
   - Recent searches (localStorage)
   - Mobile: full-screen overlay con teclado abierto

6. Crear /buscar/page.tsx:
   - Página dedicada de resultados con filtros
   - URL: /buscar?q=arroz

CRITERIOS DE ÉXITO
- Filtros funcionan: combinar varios reduce los resultados correctamente
- URL state sincronizado: refresh mantiene filtros
- PDP carga rápido y se ve premium
- Botón "Añadir al carrito" actualiza el contador del header con animación
- Reviews se ven creíbles, con avatares, locations, fechas
- Búsqueda fuzzy funciona ("aroz" encuentra "Arroz")
- No hay layout shift al cargar imágenes (usar next/image con dimensions)
```

---

## 📋 PROMPT 5 — Cart, Checkout, Auth

> **Cuándo usarlo**: Después de validar catálogo + producto.

```
FASE 5: CARRITO + CHECKOUT + AUTH MOCK

Re-lee secciones 5 (Cart), 6 (Checkout), 11 (Auth) del docs/FEATURES.md.

TAREA

1. Crear CartDrawer (Sheet de shadcn):
   - Trigger desde el cart icon del header (badge con count)
   - Lista de items con thumbnail, name, variant, qty selector, remove button
   - Subtotal, descuentos, envío estimado, total
   - "Ir al checkout" CTA primario
   - "Seguir comprando" link
   - Empty state ilustrado: "Tu carrito está vacío" + CTA "Ver combos"
   - Animaciones: items entran/salen con motion

2. Crear /carrito/page.tsx — versión full page del carrito:
   - Mismo contenido pero más espacioso
   - Recomendaciones cross-sell debajo

3. Crear /checkout flow multi-step:

   /checkout/page.tsx — Step 1: Recipient
   - Si tiene familias guardadas: selector cards de familias (foto, nombre, dirección preview)
   - Si no: form completo con todos los campos
   - "Editar dirección" inline si elige familia guardada
   - Botón "Continuar"

   /checkout/envio/page.tsx — Step 2: Shipping method
   - 3 cards radio: Estándar / Express / Marítimo
   - Mostrar tiempo y costo
   - Imagen ilustrativa de cada método
   - "Continuar"

   /checkout/pago/page.tsx — Step 3: Payment (mock Stripe-style)
   - Card form con todas las validaciones (número, exp, cvv)
   - Format auto del card number
   - Detección de brand (Visa/MC/Amex) con icono
   - Resumen del pedido a la derecha sticky
   - "Confirmar y pagar" — al click: simular delay 2s + redirect a confirmación

   /checkout/confirmacion/page.tsx — Step 4: Success
   - Animación de checkmark con motion
   - "¡Pedido confirmado!"
   - Número de pedido grande
   - Resumen de items
   - "Ver tracking" CTA + "Ver mis pedidos"
   - "También puedes compartir por WhatsApp"

4. Mock auth flow en /login y /registro:

   /login/page.tsx:
   - Email + password
   - "O continúa con: Google / Apple" (mock buttons)
   - Submit: mock login (cualquier email/pass funciona, redirige a /cuenta)
   - Diseño split: imagen brand a la izquierda, form a la derecha

   /registro/page.tsx:
   - Nombre, email, password, confirmar password
   - Checkbox términos
   - Submit: mock register

   /recuperar-password/page.tsx — form simple

5. Crear ProgressIndicator.tsx para el checkout (steps 1-2-3-4 con barra de progreso).

6. Implementar validaciones de formularios con react-hook-form + zod:
   - Email format
   - Phone Cuban format (+53 XXXX XXXX)
   - Card number Luhn algorithm (visualmente, no real)
   - Required fields con mensajes claros

CRITERIOS DE ÉXITO
- Todo el flujo de cart > checkout > confirmación funciona end-to-end
- En la confirmación, el pedido se "guarda" en localStorage como un nuevo orden mock
- Auth mock recuerda al usuario en localStorage
- Validaciones son rigurosas pero no molestas (solo on-blur o on-submit)
- Mobile: el checkout es perfectamente usable con un dedo
- El usuario nunca se siente perdido en el flujo (siempre sabe en qué step está)
```

---

## 📋 PROMPT 6 — Mis Familias + Tracking + Yumi (Las 3 features ⭐)

> **Cuándo usarlo**: Después del checkout. Estas son las features diferenciadoras que más impacto tienen en el demo.

```
FASE 6: LAS 3 FEATURES DIFERENCIADORAS

Re-lee secciones 7 (Mis Familias), 8 (Tracking Visual), 10 (Yumi) del docs/FEATURES.md.

ESTAS 3 FEATURES SON LAS QUE HACEN ÚNICO A YUMURY. Inviértele tiempo y cuidado.

TAREA

══════════════════════════════════════════
PARTE A — MIS FAMILIAS
══════════════════════════════════════════

1. /cuenta/familias/page.tsx:
   - Header: "Mis Familias" + CTA "Añadir familia"
   - Empty state hermoso si no hay familias
   - Grid de FamilyCards (3 col desktop, 2 tablet, 1 mobile)

2. FamilyCard.tsx:
   - Avatar grande (emoji)
   - Alias (Mamá, Tío Pedro)
   - Relationship + edad
   - Address preview (1 línea)
   - Phone
   - Alerts badges (Diabético, Hipertenso) si aplica
   - Stats footer: X pedidos, último pedido en fecha
   - Botones: "Reordenar último" (CTA), "Ver historial", "Editar"
   - Hover: subtle lift

3. /cuenta/familias/nueva/page.tsx — Form para añadir familia:
   - Steps: Info personal > Dirección > Preferencias > Avatar
   - Validaciones específicas del dominio (phone Cuban, municipios)
   - Selector de avatar emoji visual

4. /cuenta/familias/[id]/page.tsx — Detalle de familia:
   - Datos completos
   - Historial de pedidos a esa familia con fechas, totales
   - Productos favoritos (más enviados)
   - "Reordenar combo X" (sugerencias inteligentes)

5. /cuenta/familias/[id]/editar/page.tsx — Edit con mismo form

6. Integrar en checkout: el step 1 ahora puede elegir entre familias guardadas (si hay) o crear nueva al vuelo.

══════════════════════════════════════════
PARTE B — VISUAL TRACKING (FEATURE ESTRELLA)
══════════════════════════════════════════

1. /pedido/[id]/page.tsx — Tracking page para usuarios autenticados:

2. /tracking/[publicId]/page.tsx — Tracking PÚBLICO compartible:
   - Sin login requerido
   - URL bonita: /tracking/pub_a3f5g7h9
   - Para enviar a familiares en Cuba

3. TrackingTimeline.tsx — EL COMPONENTE ESTRELLA:
   - Vertical timeline en mobile, horizontal en desktop wide
   - Cada evento con:
     * Ícono dentro de círculo (estado)
     * Connector line entre eventos (verde si completado, gris si pendiente)
     * Title prominente
     * Description en gris
     * Location + timestamp
     * Photo expandible (si hay) — clickear abre lightbox
     * Badge "Estimado" si es fecha futura
   - Estado actual: pulse animation en el círculo
   - Color del current event: brand gradient
   - Eventos completados: verde
   - Eventos pendientes: gris

4. ShipmentMap.tsx (opcional pero impactante):
   - Mapa estilizado del recorrido Miami → La Habana → Matanzas
   - SVG de mapa simplificado del Caribe
   - Path animado del envío
   - Marker actual con pulse

5. ShareTrackingButton.tsx:
   - Genera link de tracking público
   - Botones de compartir: WhatsApp (con mensaje pre-armado), Email, Copy link, SMS
   - WhatsApp message: "Hola! Te envié algo desde Yumury. Sigue el envío aquí: {link}"

6. TrackingHeader.tsx:
   - Número de pedido grande
   - Status badge prominente (color según estado)
   - ETA destacado: "Llega el 12 de mayo"
   - Recipient info preview

7. Notification component:
   - Banner con foto y mensaje cuando hay un evento nuevo
   - "📸 ¡Nueva actualización! Tu pedido está en camino a Cárdenas"

══════════════════════════════════════════
PARTE C — YUMI ASSISTANT
══════════════════════════════════════════

1. YumiButton.tsx — Floating action button:
   - Bottom-right, sticky
   - Avatar IA con animación sutil de pulse cuando hay sugerencias activas
   - Badge "Pregúntale a Yumi" en hover
   - Click: abre el chat panel

2. YumiChatPanel.tsx:
   - Slide-in desde la derecha en desktop, full-screen sheet en mobile
   - Header: Avatar, "Yumi", "Tu asistente IA", close button
   - Messages area scrollable
   - Welcome message inicial con suggestion chips
   - Input fijo abajo con send button
   - Empty state si nunca habló: "Hola! Soy Yumi, te ayudo a armar el envío perfecto"

3. YumiMessage.tsx:
   - User message: bubble derecha, fondo brand suave
   - Assistant message: bubble izquierda, fondo neutro
   - Si message tiene productSlugs: render mini ProductCards embebidas
   - Si tiene comboSlugs: render mini ComboCards
   - Si tiene suggestions: chips clicables debajo
   - Typing indicator (3 dots animados) mientras "responde"

4. Lógica de respuestas:
   - Usar el `findYumiResponse(text)` de mock-data/yumi-responses.ts
   - Simular delay de typing 800-1500ms
   - Si no matchea ningún pattern: fallback genérico
   - Mantener historial en sesión (sin persistencia entre sesiones, eso es V2)

5. Suggestion chips:
   - Click en chip: envía ese mensaje automáticamente
   - Animación de chips entrando

CRITERIOS DE ÉXITO

Mis Familias:
- Se siente como una feature top-tier que justifica crear cuenta
- "Reordenar último" tarda 2 clicks máximo
- Editar familia es instantáneo
- Las cards se ven bonitas, con personalidad

Visual Tracking:
- El timeline se ve como en apps tier-1 (Stripe, Linear)
- Las fotos en cada etapa son una sorpresa positiva visible
- El share por WhatsApp funciona en mobile (abre WhatsApp con mensaje)
- Public tracking se puede acceder sin login

Yumi:
- Las respuestas se sienten contextualmente útiles
- Los productos embebidos en chat son clicables y llevan a /producto/[slug]
- Es divertido de probar — invita a explorar
- No bloquea la navegación cuando está abierto

ANTES DE EMPEZAR
Confírmame que entiendes que estas 3 features son las que diferencian a Yumury. Si algo en mis specs te parece poco claro o te parece que se puede mejorar, dímelo ANTES de implementar, no después.
```

---

## 📋 PROMPT 7 — Cuenta, Settings, Pulido Final

> **Cuándo usarlo**: Última fase. Cierra el loop.

```
FASE 7: CUENTA + PULIDO FINAL

Re-lee sección 12 (Mi Cuenta) del docs/FEATURES.md.

TAREA

1. /cuenta/page.tsx — Dashboard:
   - Bienvenida con nombre del usuario
   - Stats cards: Total pedidos, Total enviado, Familias guardadas, Pedidos activos
   - Sección "Pedidos recientes" con 3 últimos
   - Acciones rápidas: "Reordenar último", "Añadir familia", "Ver tracking"
   - Sidebar de navegación (perfil, pedidos, familias, direcciones, métodos de pago, configuración)

2. /cuenta/pedidos/page.tsx:
   - Tabla/lista de pedidos
   - Filtros por status (Todos, En tránsito, Entregados, Cancelados)
   - Search por número de pedido o destinatario
   - Click navega a /pedido/[id]

3. /cuenta/perfil/page.tsx — edit profile básico

4. /cuenta/configuracion/page.tsx:
   - Notificaciones email (toggles)
   - Idioma (es/en)
   - Tema (light/dark/system)
   - Eliminar cuenta (con confirmation modal)

5. PULIDO FINAL — IMPORTANTE:

   a) Loading states:
      - Skeleton para todas las páginas que cargan data
      - Spinners suaves en buttons cuando hay acción async
      - Page transitions con motion (fade/slide subtle)

   b) Error states:
      - 404 page personalizada con ilustración
      - 500 page con CTA de contacto
      - Empty states ilustrados en todas las listas vacías

   c) Animaciones de pulido:
      - Confetti al confirmar primer pedido (canvas-confetti)
      - Heart animation al añadir a wishlist (futuro, ahora skip)
      - Toast notifications con sonner para todas las acciones

   d) SEO básico:
      - Metadata por página (title, description, og:image)
      - sitemap.ts
      - robots.txt
      - JSON-LD para products

   e) Performance pass:
      - Audit con Lighthouse
      - Optimizar imágenes con next/image
      - Lazy loading donde aplique
      - Bundle analyzer check

   f) Accesibilidad:
      - Audit con axe DevTools
      - Focus visible en todos los interactivos
      - aria-labels donde falten
      - Contraste verificado en todos los textos

   g) Responsive final:
      - Probar en 375px (iPhone SE), 768px (iPad), 1024px, 1440px, 1920px
      - Fixar todo lo que se vea raro

   h) Dark mode pass:
      - Verificar TODAS las páginas en dark mode
      - Ajustar colores que no se vean bien

   i) i18n pass:
      - Completar messages/es.json y messages/en.json para 100% de strings UI
      - Probar el toggle de idioma

6. Crear página /como-funciona/page.tsx con:
   - Hero "Cómo funcionan los envíos a Matanzas con Yumury"
   - 4 pasos detallados con ilustraciones
   - FAQ
   - CTA final

7. Crear /sobre-nosotros/page.tsx con:
   - Misión
   - Valores: Confianza, Transparencia, Rapidez, Cuidado
   - Historia (mock pero creíble)
   - Equipo (placeholder photos)

CRITERIOS DE ÉXITO FINALES
- Lighthouse Performance > 90 mobile, > 95 desktop
- Lighthouse Accessibility > 95
- Lighthouse Best Practices > 95
- Lighthouse SEO > 90
- 0 errores en consola en cualquier página
- Responsive perfecto en todos los breakpoints
- Dark mode impecable
- npm run build sin warnings

ENTREGABLE FINAL
Cuando termines, hazme:
1. Un README.md actualizado con instrucciones de instalación, scripts, y screenshots
2. Un CHANGELOG.md documentando lo construido
3. Un resumen de bullets de cada fase ejecutada y qué quedó pendiente para una V2

Y opcionalmente un deploy a Vercel — si tienes la CLI configurada, hazlo.
```

---

## 🎁 PROMPTS BONUS

Estos los puedes usar en cualquier momento si quieres añadir algo después.

### Prompt para refinar una feature específica

```
Estoy revisando [FEATURE]. Quiero que mejores [ASPECTO ESPECÍFICO].

Lo que NO me gusta: [DESCRIBIR]
Lo que quiero: [DESCRIBIR]

Referencias visuales:
- [URL o nombre de app que admiras]

No toques nada más. Solo este aspecto.
```

### Prompt para agregar una feature post-MVP

```
Quiero añadir [NUEVA FEATURE] al proyecto.

Descripción: [QUÉ ES]
Por qué la necesito: [USE CASE]
Cómo se integra con lo existente: [INTEGRACIÓN]

Antes de programar, propóneme:
1. Cómo encajaría arquitectónicamente
2. Qué archivos crearías o modificarías
3. Qué riesgos hay para lo que ya funciona

Espero tu propuesta antes de hacer cambios.
```

### Prompt para fix de bugs

```
Encontré este bug:

Pasos para reproducir:
1. [PASO]
2. [PASO]

Resultado esperado: [QUÉ DEBERÍA PASAR]
Resultado actual: [QUÉ PASA]

Investiga la causa raíz antes de arreglar. No quiero parches superficiales.
```

### Prompt para refactor

```
Quiero refactorizar [ÁREA]. Razón: [POR QUÉ — DRY, performance, legibilidad].

Antes de tocar código:
1. Hazme un análisis de qué patrones repetidos hay
2. Propóneme cómo refactorizar
3. Qué podría romperse

Espero tu plan antes de ejecutar.
```

### Prompt para deploy

```
Quiero hacer deploy a Vercel.

Antes de deploy:
1. Verifica que npm run build pasa sin warnings
2. Corre lint y arregla cualquier issue
3. Verifica que las variables de entorno están bien
4. Asegúrate que .env.local NO está en el repo
5. Revisa el bundle size con next-bundle-analyzer

Después de deploy:
1. Verifica que la URL funciona
2. Lighthouse pass en producción
3. Reportame cualquier diferencia entre dev y prod
```

---

## 💡 Tips para trabajar con Claude Code

### Buenas prácticas

✅ **Empieza nueva sesión con `/clear`** entre fases para que re-lea los docs.

✅ **Usa `/init`** después del prompt 1 para que cree el `CLAUDE.md` del proyecto. Este archivo le da contexto persistente.

✅ **Pídele que revise antes de commit**: "Antes de cerrar, verifica que npm run build pasa, npm run lint pasa, y no hay errores de TypeScript".

✅ **Sé específico con feedback**: en vez de "no me gusta", di "el header se ve muy genérico, quiero que el logo tenga el gradient signature como fondo y la nav use border-bottom sutil al hover".

✅ **Pídele que pregunte**: "Si algo no está claro en mis specs, pregúntame ANTES de implementar, no después".

### Red flags que te dirán cuándo parar y corregir

🚩 Si genera código con TODOs o `// implementar después`
🚩 Si usa `any` en TypeScript sin justificación
🚩 Si crea componentes con > 200 líneas (debe partirlos)
🚩 Si no usa el sistema de tipos del proyecto y crea tipos inline
🚩 Si ignora el design system y usa colores hardcoded fuera de Tailwind config
🚩 Si rompe convenciones de naming (PascalCase componentes, camelCase funciones)

### Comandos útiles dentro de Claude Code

- `/clear` — Limpia contexto, empieza fresco
- `/init` — Inicializa CLAUDE.md (ejecutar una vez al principio)
- `/help` — Ver todos los comandos
- `/cost` — Ver consumo de tokens (útil para optimizar)
- `/review` — Pedir review de cambios recientes
- `Esc` — Cancelar una respuesta en curso si va por mal camino

---

## 🏁 Checklist Final del Demo

Antes de mostrarle el demo a alguien, verifica:

- [ ] Home se ve premium en mobile y desktop
- [ ] Categorías navegables con filtros funcionando
- [ ] PDP completo con galería, variantes, reviews
- [ ] Cart > Checkout > Confirmación end-to-end funciona
- [ ] Mock auth funciona (cualquier email/pass)
- [ ] Mis Familias: añadir, editar, ver detalle, reordenar
- [ ] Tracking visual con timeline + fotos + share button
- [ ] Yumi responde a las preguntas comunes
- [ ] FAQ + Sobre nosotros + Cómo funciona páginas existen
- [ ] Dark mode funciona en TODAS las páginas
- [ ] Responsive perfecto desde 375px hasta 1920px
- [ ] No hay errores en consola
- [ ] Lighthouse > 90 mobile y desktop
- [ ] Animaciones suaves, no exageradas
- [ ] Empty states bonitos
- [ ] Loading states en todas las páginas async
- [ ] El demo se siente "vivo", no estático

---

## 🎯 Después del MVP

Cuando termines el MVP demo y quieras evolucionar a producto real, aquí están los siguientes pasos:

### V2 — Backend real
- Supabase o Convex para BD
- Auth real (Clerk, Auth.js o Supabase Auth)
- Stripe payments reales
- Imagenes en Cloudinary o Uploadthing

### V3 — Operaciones
- Panel admin de Yumury Miami
- Gestión de pedidos manual
- Inventario real
- Notificaciones por email (Resend) y SMS (Twilio)

### V4 — Optimización growth
- Analytics (Posthog)
- Email marketing (lifecycle campaigns)
- Programa de referidos
- Suscripciones para combos recurrentes

### V5 — Expansión
- Otras provincias de Cuba (La Habana, Pinar del Río, etc.)
- App nativa iOS/Android (React Native)
- Marketplace abierto (otros vendedores en plataforma)

---

> 🎉 **¡Listo!** Con estos 6 documentos tienes todo lo necesario para construir un demo premium de Yumury que compita con cualquier marketplace tier-1 del mundo.
>
> Recuerda: el éxito está en la **iteración cuidadosa**, no en intentar hacerlo todo de una. Fase por fase, validando cada paso. Si algo no se ve premium, párate y arréglalo antes de seguir.
>
> **Ahora ve y construye algo increíble.** 🚀
