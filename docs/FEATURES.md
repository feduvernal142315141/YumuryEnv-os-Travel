# 🌟 Yumury — Especificaciones de Features

> Specs detallados de cada feature del demo. Cada sección describe qué construir, cómo se ve, cómo se comporta y qué mock data usa.

---

## 📋 Índice

1. [Home / Landing Page](#1-home--landing-page)
2. [Catálogo y Categorías](#2-catálogo-y-categorías)
3. [Página de Producto](#3-página-de-producto)
4. [Búsqueda Inteligente](#4-búsqueda-inteligente)
5. [Carrito de Compras](#5-carrito-de-compras)
6. [Checkout Multi-paso](#6-checkout-multi-paso)
7. [Sistema "Mis Familias" ⭐](#7-sistema-mis-familias-)
8. [Tracking Visual con Fotos ⭐](#8-tracking-visual-con-fotos-)
9. [Combos Curados ⭐](#9-combos-curados-)
10. [Asistente Yumi (IA Chat) ⭐](#10-asistente-yumi-ia-chat-)
11. [Auth Mock](#11-auth-mock)
12. [Cuenta y Perfil](#12-cuenta-y-perfil)
13. [Footer y Páginas Estáticas](#13-footer-y-páginas-estáticas)

---

## 1. Home / Landing Page

**Ruta**: `/`
**Objetivo**: Comunicar la propuesta de valor de Yumury en menos de 5 segundos. Visitante entiende qué hace, para quién, y por qué es mejor que alternativas.

### Secciones (en orden)

#### 1.1 Hero Section

**Layout desktop**: Split 60/40 — texto izquierda, visual derecha
**Layout mobile**: Stack vertical — texto arriba, visual abajo

**Contenido**:
- **Eyebrow** (overline pequeño): `Envíos a Matanzas, Cuba`
- **Headline**: `Conecta con tu familia en Matanzas, sin distancias` (con la palabra "Matanzas" en gradiente brand)
- **Subheadline**: `La forma más confiable y moderna de enviarles lo que necesitan. Comida, electrodomésticos, motos eléctricas. Todo con tracking en tiempo real.`
- **CTA primario** (gradient button): `Empezar a comprar →`
- **CTA secundario** (outline): `Ver cómo funciona`
- **Trust line**: `5,000+ familias en Matanzas reciben con Yumury`
- **Visual lado derecho**: imagen lifestyle de paquetes/familia recibiendo, o ilustración custom con elementos del logo (montañas + avión)

**Animaciones**:
- Fade in + slide up con delay escalonado (eyebrow → headline → subheadline → CTAs)
- Visual con leve parallax al scroll
- Trust line fade in al final

**Background sutil**: gradiente radial muy suave del brand gradient en esquinas, casi imperceptible.

#### 1.2 Stats Bar

Tira horizontal con 4 stats con iconos:
- `📦 5,000+ familias servidas`
- `🚚 Entrega 5-7 días`
- `⭐ 4.8 calificación promedio`
- `🛡️ Garantía de entrega`

Background `bg-muted` o `bg-brand-green/5` para separar visualmente.

#### 1.3 Categories Grid

**Título**: `¿Qué necesita tu familia hoy?`
**Subtítulo**: `Todo lo que pueden necesitar, en un solo lugar`

Grid de 4 cards grandes (las 4 categorías):
- **Alimentos** — imagen de productos típicos, "+80 productos"
- **Combos** — imagen de combo familiar, "Listos para enviar"
- **Electrodomésticos** — imagen de refrigerador o EcoFlow, "Calidad garantizada"
- **Vehículos** — imagen de moto eléctrica, "Motos y bicicletas"

Cards con hover lift + cambio de imagen (imagen secundaria al hover si se quiere extra polish).

Layout:
- Mobile: 2x2 grid
- Desktop: 4 columnas

#### 1.4 Combos Showcase ⭐

**Título**: `Combos curados, listos para enviar`
**Subtítulo**: `Pensados para distintas situaciones. Tú eliges, nosotros lo armamos.`

Carrusel horizontal con 6-8 combos destacados:
- Apagón Ready ⚡
- Ciclón Ready 🌀
- Combo Familiar Básico 🍱
- Combo Cumpleaños 🎂
- Combo Mamá Diabética 💊
- Combo Premium Mensual 💎

Cada combo card muestra:
- Imagen hero
- Badge temático (Apagón Ready en orange)
- Nombre
- Descripción corta
- Precio con tachado del precio individual sumado
- "Incluye 8 productos"
- Ver detalles →

#### 1.5 Productos Populares

**Título**: `Lo más enviado esta semana`

Grid de 8 productos con `ProductCard` estándar.
Mobile: 2 cols, Desktop: 4 cols.

Botón al final: `Ver catálogo completo →`

#### 1.6 Cómo Funciona

**Título**: `Cómo funciona Yumury`
**Subtítulo**: `Tres pasos. Sin complicaciones.`

3 columnas (stack en mobile):

**Paso 1**: `🛒 Elige los productos`
"Explora nuestro catálogo o pídele a Yumi que te ayude a armar el envío perfecto."

**Paso 2**: `📍 Selecciona a tu familiar`
"Guarda los datos de tus familiares una vez. Reordena con un solo click."

**Paso 3**: `📦 Recibe en Matanzas`
"En 5-7 días tu familiar recibe en su puerta. Tú sigues todo el camino con tracking visual."

Cada paso con icono grande, número en gradient, descripción.

#### 1.7 Sección "Hecho en Matanzas"

Storytelling section que humaniza la marca:

**Layout**: Imagen del Valle del Yumurí o Varadero a la izquierda (50%), texto a la derecha.

**Contenido**:
- Título: `Somos de Matanzas, para Matanzas`
- Texto:
  > "Yumury nació de la nostalgia y la responsabilidad. El nombre lo dice todo: Yumurí, ese valle verde que abraza nuestra Matanzas natal. Por eso somos especialistas — no nos dispersamos por toda Cuba, conocemos cada municipio, cada barrio, cada calle. Cuando enviamos algo, llega rápido y llega bien. Porque para nosotros no es un envío más: es la abuela esperando, el cumpleaños de la sobrina, el aire acondicionado que necesita papá."
- CTA: `Conoce nuestra historia →`

#### 1.8 Testimonios

**Título**: `Familias que ya nos eligieron`

Marquee horizontal infinito con cards de testimonios. Cards muestran:
- Avatar (emoji o foto stock)
- Nombre + ciudad
- Rating estrellas
- Texto del testimonio (corto, 2-3 líneas)
- Producto enviado

Marquee con pausa al hover.

#### 1.9 Trust Badges Section

Tira horizontal con badges visuales:
- `🛡️ Pago seguro con Stripe`
- `📦 Garantía de entrega o reembolso`
- `🎯 Especialistas en Matanzas`
- `💬 Soporte 24/7 en español`

#### 1.10 CTA Final

Section grande con background gradient brand:
- Título: `¿Listo para enviar a tu familia?`
- Subtítulo: `Empieza con cualquier producto, o deja que Yumi te ayude a elegir.`
- Botones: `Explorar catálogo` / `Hablar con Yumi`

---

## 2. Catálogo y Categorías

### 2.1 Página `/categorias`

Grid de las 4 categorías principales con hero más grande.

**Hero superior**:
- Título: `Catálogo Yumury`
- Subtítulo: `Todo lo que tu familia necesita, en un solo lugar`
- Search bar prominente

**Grid 4 cards**:
Cada card grande con:
- Imagen hero de la categoría
- Nombre
- Descripción corta
- Subcategorías como pills clickables
- "Ver todo →"

### 2.2 Página `/categorias/[slug]`

Vista de una categoría con sus subcategorías.

**Estructura**:
1. **Hero de categoría** con imagen y título
2. **Pills de subcategorías** (chips horizontales scrolleables en móvil)
3. **Productos destacados** de la categoría (4-8)
4. **Subcategorías como sub-secciones** (cada una con 4 productos preview + "Ver todo")
5. **Filtros laterales** (desktop) o sheet bottom (móvil)

**Filtros disponibles**:
- Rango de precio (slider)
- Subcategoría (checkboxes)
- Disponibilidad (en stock / próximamente)
- Tiempo de entrega (5-7 días, 2-3 semanas)
- Rating (4+ estrellas, 4.5+ estrellas)
- Marca (donde aplique - electrodomésticos, vehículos)

**Sort dropdown**:
- Más vendidos (default)
- Precio: menor a mayor
- Precio: mayor a menor
- Mejor calificados
- Más nuevos

### 2.3 Página `/categorias/[slug]/[subSlug]`

Lista completa de productos de una subcategoría.

**Estructura**:
1. **Breadcrumbs**: `Inicio / Categorías / Alimentos / Granos`
2. **Hero pequeño** de subcategoría
3. **Filtros + Sort + total resultados**: `124 productos`
4. **Grid de productos** con paginación o infinite scroll
5. **Productos relacionados** al final

**Vista alternativa**: Toggle entre grid (default) y lista detallada.

---

## 3. Página de Producto

**Ruta**: `/producto/[slug]`

### Layout

**Desktop** (2 columnas):
```
┌─────────────────────┬──────────────────┐
│                     │  Categoría       │
│    [Galería         │  ⭐ 4.8 (124)    │
│     de imágenes]    │  Nombre Producto │
│                     │  $12.99          │
│    [Thumbnails]     │                  │
│                     │  [Variantes]     │
│                     │  [Cantidad]      │
│                     │                  │
│                     │  [Añadir]        │
│                     │  [Comprar ahora] │
│                     │                  │
│                     │  Especs          │
│                     │  Descripción     │
└─────────────────────┴──────────────────┘

[Tabs: Descripción | Especificaciones | Reviews | Cómo se entrega]

[Productos relacionados]

[Productos vistos recientemente]
```

**Mobile**:
- Galería full width arriba con dots indicator
- Info debajo
- Sticky bottom bar con precio + "Añadir al carrito"

### Componentes

#### 3.1 ProductGallery
- Imagen principal grande
- Thumbnails verticales (desktop) o horizontales (móvil)
- Navegación con flechas
- Zoom en hover (desktop) / pinch zoom (móvil)
- Lightbox al click

#### 3.2 ProductInfo
- Categoría + breadcrumbs
- Rating con estrellas + total reviews
- Nombre H1
- Precio grande (mono font)
- Si hay precio comparado: tachado al lado
- Badge stock ("En stock", "Pocas unidades", "Agotado")
- Tiempo de entrega estimado con icono Clock

#### 3.3 ProductVariants
Cards/chips para seleccionar variantes:
- **Peso/tamaño**: chips con valor (`5 lb`, `10 lb`, `20 lb`)
- **Color**: círculos de color
- **Modelo**: cards con imagen pequeña

Variante seleccionada con border verde Yumury + bg sutil.

#### 3.4 ProductQuantity
Controles `[-] [N] [+]` con stepper.
Limit: 1-10 (configurable por producto).

#### 3.5 ProductAddButton
- Botón principal: `Añadir al carrito`
- Estado loading: spinner pequeño
- Estado success: `✓ Añadido` (1.5s, vuelve a estado normal)
- Animación: el icono del producto vuela al icono del carrito (FLIP animation)

Botón secundario: `Comprar ahora` (outline) — va directo a checkout con solo este producto.

#### 3.6 ProductSpecs
Tabla limpia con clave-valor para electrodomésticos y vehículos:

```
Capacidad         300 L
Voltaje           110V / 60Hz
Eficiencia        A++
Garantía          2 años
País de origen    China
```

Para alimentos: ingredientes, peso, conservación, fecha de vencimiento estimada.

#### 3.7 ProductReviews

Sección con:
- Resumen: rating promedio gigante + breakdown por estrellas
- Filtros: por estrellas, con foto, recientes
- Cards de reviews con avatar, nombre, rating, fecha, texto, fotos opcionales
- Botón "Cargar más"

#### 3.8 ProductRelated

Grid horizontal scrolleable de 6-8 productos relacionados (misma subcategoría o tags similares).

---

## 4. Búsqueda Inteligente

### 4.1 Search Trigger

En desktop: barra de búsqueda en header con placeholder + atajo `⌘K` visible.
En mobile: ícono de lupa que abre command palette fullscreen.

### 4.2 Command Palette (Cmd+K)

**Trigger**: tecla Cmd/Ctrl + K, o click en search bar.

**Estructura**:
- Modal centrado (desktop) o fullscreen (móvil)
- Input con autofocus + placeholder `Buscar productos, categorías, combos...`
- Resultados agrupados:
  - **Productos** (top 5)
  - **Categorías** (top 3)
  - **Combos** (top 3)
  - **Búsquedas recientes** (si no hay query, mostrar las recientes)
  - **Búsquedas populares** (si no hay query y no hay recientes)
- ESC para cerrar
- ↑ ↓ navegar, Enter seleccionar
- Footer del modal con tips: `↵ ir · ⌘K cerrar`

**Implementación**:
- `cmdk` library
- Búsqueda fuzzy con `fuse.js` sobre mock data
- Typo tolerance configurado
- Highlighting de matches

**Mock searches sugeridas**:
```
- "arroz"
- "pollo"
- "moto eléctrica"
- "refrigerador"
- "combo familiar"
- "ecoflow"
- "aceite"
```

### 4.3 Página `/buscar?q=...`

Resultados completos con:
- Header con query y cantidad de resultados
- Filtros y sort (mismos que en categorías)
- Resultados agrupados por categoría
- Si no hay resultados: empty state con sugerencias

---

## 5. Carrito de Compras

### 5.1 CartSheet (Sheet Lateral)

**Trigger**: click en icono de carrito, o automáticamente al añadir un item (slide in 300ms, queda 2s, slide out o user action).

**Layout**:
```
┌──────────────────────────────┐
│  Tu carrito (3)         [×]  │
├──────────────────────────────┤
│                              │
│  [Item 1]                    │
│  [Item 2]                    │
│  [Item 3]                    │
│                              │
├──────────────────────────────┤
│  Subtotal:           $54.99  │
│  Envío estimado:      $8.50  │
│  ──────────────────────────  │
│  Total:              $63.49  │
│                              │
│  [Ir al checkout →]          │
│                              │
│  [Ver carrito completo]      │
└──────────────────────────────┘
```

**Comportamiento mobile**: bottom sheet con vaul, drag to dismiss.

### 5.2 CartItem

```
┌─────────────────────────────────┐
│ [img] Arroz grano largo         │
│       Variante: 5 lb            │
│       [- 2 +]   $17.98     [🗑] │
└─────────────────────────────────┘
```

- Imagen 64x64
- Nombre producto + variante
- Quantity stepper
- Subtotal del item
- Botón eliminar (con confirmación toast)

### 5.3 Página `/carrito`

Vista completa del carrito (más detalle que el sheet):

**Layout desktop**: 2 columnas
- Izquierda: lista de items grandes (con más info)
- Derecha sticky: resumen + cupón + botón checkout

**Funcionalidades**:
- Editar cantidades inline
- Eliminar items (con animación)
- Aplicar cupón promocional (mock - inputs `YUMURY10` da 10% descuento)
- Guardar para después
- Estimación de envío con ZIP destino (mock)

### 5.4 CartEmpty

Empty state ilustrado:
- Ilustración (carrito vacío con animación sutil)
- Título: `Tu carrito está vacío`
- Texto: `Empieza explorando nuestro catálogo o deja que Yumi te ayude a elegir`
- 2 CTAs: `Explorar productos` / `Hablar con Yumi`

### 5.5 Persistencia

- localStorage con clave `yumury-cart-v1`
- Cart store con Zustand persist middleware
- Recuperar al cargar la app
- Si el carrito tiene productos > 7 días: prompt sutil "¿Sigues interesado en estos productos?"

---

## 6. Checkout Multi-paso

**Ruta**: `/checkout`
**Auth**: Requiere usuario logueado (mock). Si no hay user, redirige a `/auth/login?redirect=/checkout`.

### 6.1 Layout General

**Desktop**: 60/40 split — pasos a la izquierda, resumen sticky a la derecha.
**Mobile**: stack vertical, resumen colapsable arriba, sticky CTA bottom.

**Header simplificado**: solo logo, sin nav (foco en completar la compra).

### 6.2 Stepper Visual

```
●──── ●──── ○──── ○────
Datos  Envío  Pago  Listo
```

- Paso completado: círculo verde con checkmark
- Paso actual: círculo verde sólido + label en bold
- Paso pendiente: círculo hueco gris

Línea conectora con animación al avanzar.

### 6.3 Step 1 — Datos del Destinatario

**Título**: `¿Para quién es el envío?`

**Si el usuario tiene familias guardadas**:
- Grid de cards de familias con radio-button al hover
- Card seleccionada con border verde + ring
- Botón "Editar datos" en cada card
- CTA: `+ Añadir nuevo destinatario`

**Si no tiene familias o crea nueva**:
- Form con campos:
  - Alias (`¿Cómo le llamas?`) — `Mamá`, `Tía Mercedes`
  - Nombre completo
  - Relación (select: Madre, Padre, Hermano/a, Tío/a, Abuelo/a, Sobrino/a, Amigo/a, Otro)
  - Teléfono cubano (formato +53 XXXX XXXX)
  - Teléfono alternativo (opcional)
  - **Dirección**:
    - Calle
    - Número
    - Entre (opcional)
    - Municipio (select con los 14 municipios de Matanzas)
    - Provincia (fija: Matanzas)
    - Referencia (textarea opcional, ej: "Casa azul a la izquierda del CUPET")
  - Cumpleaños (opcional, date picker)
  - Notas adicionales (alergias, preferencias)

- Checkbox: "Guardar para futuros envíos"

**Validación**: Zod + React Hook Form. Errores inline.

**Botones**: `← Atrás` | `Continuar →` (deshabilitado hasta validar).

### 6.4 Step 2 — Método de Envío

**Título**: `¿Cómo lo enviamos?`

**Opciones (cards radio)**:

```
○ Envío Estándar                      $8.99
   Llega en 5-7 días hábiles
   ✓ Recomendado para alimentos
   ✓ Tracking visual incluido

○ Envío Express                       $18.99
   Llega en 3-5 días hábiles
   ⚡ Prioridad de envío
   ✓ Tracking visual incluido

○ Envío Marítimo                      $4.99
   Llega en 4-7 semanas
   📦 Solo para envíos grandes
   ✓ El más económico para >50 lb
```

**Mensaje de regalo opcional**:
- Toggle: "¿Quieres incluir un mensaje?"
- Textarea: `Escribe un mensaje a tu familiar (max 200 caracteres)`

**Botones**: `← Atrás` | `Continuar →`

### 6.5 Step 3 — Pago

**Título**: `Información de pago`

**UI tipo Stripe Elements** (sin lógica real):
- Email para recibo
- Card number (input con máscara, detecta tipo de tarjeta y muestra logo)
- Fecha de vencimiento (MM/YY)
- CVC
- ZIP code (US)

**Métodos visibles** (solo Stripe en MVP):
- Tarjeta de crédito/débito (default seleccionado)
- (UI placeholder para PayPal, Apple Pay, Google Pay — mostrados pero deshabilitados con badge "Próximamente")

**Mock validation**:
- Card numbers que "funcionan":
  - `4242 4242 4242 4242` (Visa éxito)
  - `4000 0000 0000 0002` (Visa rechazada para mostrar error state)
  - Cualquier otra tarjeta válida formato → éxito

**Checkbox**:
- `Guardar tarjeta para futuras compras` (mock)
- `Acepto los términos y condiciones` (requerido)

**Botones**: `← Atrás` | `Confirmar pago →`

### 6.6 Step 4 — Procesando

**Pantalla intermedia con animación**:
- Loader animado (no spinner básico — algo elegante con el verde Yumury)
- Texto: `Procesando tu pedido...`
- Sub-texto rotativo cada 1s:
  - `Validando tarjeta...`
  - `Confirmando productos...`
  - `Notificando a Matanzas...`
  - `¡Casi listo!`

Duración total: 3-4 segundos antes de redirigir a éxito.

### 6.7 Página `/checkout/exito/[orderId]`

**Animación de entrada**: confetti + checkmark dibujándose.

**Contenido**:
- Icono grande con gradient (CheckCircle)
- Título: `¡Pedido confirmado!`
- Subtítulo: `Pedido #YUM-2025-001234`
- Resumen visual:
  - Destinatario: `Mamá Mercedes en Cárdenas, Matanzas`
  - Items: lista compacta
  - Total pagado: `$54.99`
  - Llegada estimada: `Entre el 12 y 14 de mayo`
- 2 CTAs:
  - **Primary gradient**: `Ver tracking →` (lleva a `/cuenta/pedidos/[id]`)
  - **Outline**: `Seguir comprando`
- Sección secundaria:
  - "Te enviaremos actualizaciones por email"
  - "Tu mamá recibirá un SMS cuando el pedido salga de Miami"

### 6.8 CheckoutSummary (Sticky Sidebar)

Siempre visible en desktop, colapsable en móvil:

```
┌─────────────────────────────┐
│ Resumen del pedido          │
├─────────────────────────────┤
│ [thumb] Arroz × 2    $17.98 │
│ [thumb] Pollo × 1    $24.50 │
│ [thumb] Aceite × 1   $12.50 │
│                             │
│ Subtotal:            $54.98 │
│ Envío:                $8.99 │
│ Impuestos:            $0.00 │
│ Cupón YUMURY10:      -$5.50 │
│ ─────────────────────────── │
│ Total:               $58.47 │
│                             │
│ 🛡️ Garantía Yumury           │
│ ⏱  Llega en 5-7 días        │
└─────────────────────────────┘
```

---

## 7. Sistema "Mis Familias" ⭐

**Diferenciador clave**. Este feature distingue a Yumury de toda la competencia.

### 7.1 Ruta `/cuenta/familias`

**Header**:
- Título: `Mis Familias`
- Subtítulo: `Guarda los datos de tus familiares para enviar con un click`
- CTA: `+ Añadir familiar`

**Grid de cards** (1 col móvil, 2 cols tablet, 3 cols desktop).

### 7.2 FamilyCard

```
┌────────────────────────────────┐
│   👵                           │
│   Mamá Mercedes                │
│   Madre · 67 años              │
│                                │
│   📍 Cárdenas, Matanzas        │
│   📞 +53 5234 5678             │
│                                │
│   🎂 Cumple el 12 de junio     │
│                                │
│   Último envío: hace 2 semanas │
│   Total enviado: $245.99       │
│                                │
│   [Reordenar último]           │
│   [Editar] [Eliminar]          │
└────────────────────────────────┘
```

**Detalles**:
- Avatar: emoji grande (👵, 👨, 👧) o iniciales con bg color
- Información clave visible
- Si hay cumpleaños cercano (próximos 30 días): badge especial `🎂 Cumple en 5 días`
- Si tiene alertas (diabético, alérgico): badges de info
- Stats personales del familiar
- Acciones rápidas

### 7.3 FamilyForm (Crear/Editar)

**Ruta**: `/cuenta/familias/nueva` y `/cuenta/familias/[id]`

Form completo con:

**Sección 1 — Datos personales**:
- Avatar emoji selector (grid de emojis comunes: 👵👨👧🧓👴👩🧑👦)
- Alias (`¿Cómo le llamas?`)
- Nombre completo
- Relación (select)
- Cumpleaños (date picker, opcional)

**Sección 2 — Contacto**:
- Teléfono principal (máscara +53)
- Teléfono alternativo

**Sección 3 — Dirección en Matanzas**:
- Calle
- Número
- Entre calles (opcional)
- Municipio (select de los 14)
- Referencias visibles

**Sección 4 — Preferencias y notas**:
- Productos favoritos (multi-select de tags)
- Alertas médicas/dietéticas (chips: Diabético, Hipertenso, Alérgico a..., Otro)
- Notas adicionales (textarea libre)

**Botones**: `Cancelar` | `Guardar familiar`

**Validación**: Zod schemas en `lib/validations.ts`.

**Persistencia**: Zustand store con persist middleware → localStorage.

### 7.4 FamilyEmpty

Empty state para cuando no hay familias:

```
        [Ilustración corazón con casa]

        Aún no has añadido familiares

   Guarda los datos de tu mamá, abuela, hermano
   o quien quieras enviarles con un click

        [+ Añadir mi primer familiar]

        💡 Tip: con sus datos guardados,
        reordenar es 10x más rápido
```

### 7.5 RecipientSelector (en checkout)

Modal/sheet con grid compacto de familias para seleccionar.
Cada item: avatar pequeño + nombre + ubicación + radio.
Botón "Añadir nuevo" al final.

### 7.6 Mock Data (familias del usuario logueado)

Cuando el usuario está logueado en el demo, ya tiene 3 familias precargadas:

1. **Mamá Mercedes** — 👵 — Cárdenas
2. **Tío Pedro** — 👴 — Matanzas Centro
3. **Sobrina Camila** — 👧 — Varadero

(Detalles completos en MOCK_DATA.md)

---

## 8. Tracking Visual con Fotos ⭐

**Diferenciador clave**. Resuelve el problema #1 de la competencia: tracking opaco.

### 8.1 Ruta `/cuenta/pedidos/[id]`

### 8.2 Layout

**Desktop**: 2 columnas
- Izquierda (60%): timeline visual + mapa
- Derecha (40%): info del pedido (productos, destinatario, totales)

**Mobile**: stack vertical.

### 8.3 Header del Tracking

```
┌──────────────────────────────────────────┐
│  ← Mis pedidos                           │
│                                          │
│  Pedido #YUM-2025-001234                 │
│  Para Mamá Mercedes en Cárdenas          │
│                                          │
│  [Badge: En camino · Llegada estimada    │
│   en 3 días]                             │
│                                          │
│  [Compartir tracking] [Ayuda]            │
└──────────────────────────────────────────┘
```

Badge de estado con color según fase:
- `pending` / `confirmed`: gris claro
- `preparing`: amarillo
- `shipped` / `in-customs`: naranja
- `in-warehouse` / `out-for-delivery`: verde light
- `delivered`: verde con check
- `incident`: rojo

### 8.4 TrackingTimeline

Timeline vertical premium estilo iOS Maps:

```
┌─────────────────────────────────────────────────┐
│                                                  │
│  ●  Pedido confirmado                            │
│  │  Hoy a las 10:32 AM · Miami, FL              │
│  │  Pago procesado correctamente                 │
│  │                                                │
│  ●  Preparando en almacén Miami                  │
│  │  Hoy a las 14:15 PM · Miami, FL              │
│  │  Tu pedido está siendo empacado               │
│  │  [📷 Foto de empaque]                         │
│  │                                                │
│  ◉  En tránsito hacia Cuba   ← (CURRENT)        │
│  │  Hoy a las 18:00 PM                           │
│  │  Vuelo internacional MIA → HAV                │
│  │  ◌ ◌ ◌ pulsing dots                          │
│  │                                                │
│  ○  Llegada al almacén Matanzas                  │
│  │  Estimado: mañana 11:00 AM                    │
│  │                                                │
│  ○  En reparto hacia Cárdenas                    │
│  │  Estimado: mañana 16:00 PM                    │
│  │                                                │
│  ○  Entregado a Mamá Mercedes                    │
│      Estimado: mañana 17:00 PM                   │
│                                                  │
└─────────────────────────────────────────────────┘
```

**Estados visuales**:
- **Completed** (●): círculo verde sólido con checkmark blanco interior
- **Current** (◉): círculo verde con animación pulse + dots animados
- **Pending** (○): círculo hueco gris claro

Línea conectora vertical:
- Sólida verde para completados
- Punteada gris para pendientes

**Foto de evento**:
- Thumbnail 80x80 dentro del evento
- Click abre lightbox fullscreen
- Caption con descripción y fecha

### 8.5 TrackingPhotos (Lightbox)

Modal fullscreen con:
- Imagen grande
- Caption: descripción + ubicación + fecha
- Navegación entre fotos del pedido
- Cerrar con ESC o click fuera

### 8.6 TrackingMap

Mapa visual con ruta Miami → Matanzas:

**Implementación simple para demo**:
- SVG map estilizado de la ruta (no Google Maps real)
- Línea curva animada
- Pin Miami (origen) verde
- Pin Matanzas (destino) rojo
- Avión animado moviéndose por la ruta según progreso

**Para "out-for-delivery"**:
- Mapa de Matanzas con pin del repartidor moviéndose
- Pin destino marcado
- Distancia estimada: `2.3 km · 15 min`

### 8.7 OrderInfo Sidebar

```
┌─────────────────────────────┐
│ Detalles del pedido         │
├─────────────────────────────┤
│ Productos (3)               │
│                             │
│ [thumb] Arroz × 2    $17.98 │
│ [thumb] Pollo × 1    $24.50 │
│ [thumb] Aceite × 1   $12.50 │
│                             │
│ Total:               $54.98 │
│ Envío:                $8.99 │
│ ─────────────────────────── │
│ Pagado:              $63.97 │
│                             │
├─────────────────────────────┤
│ Destinatario                │
│                             │
│ 👵 Mamá Mercedes            │
│ Madre                       │
│ 📍 Calle 12 #234            │
│    Entre 3ra y 5ta          │
│    Cárdenas, Matanzas       │
│ 📞 +53 5234 5678            │
│                             │
├─────────────────────────────┤
│ Pago                        │
│ Visa terminada en 4242      │
│ Pagado: 5 de mayo, 10:32 AM │
└─────────────────────────────┘
```

### 8.8 Botón "Compartir Tracking"

Al click:
- Genera link público: `/tracking/[publicId]` (ID hasheado para no exponer ID real)
- Copia al portapapeles
- Toast: `✓ Link copiado al portapapeles`
- También opciones: WhatsApp, Email, SMS

### 8.9 Página pública `/tracking/[publicId]`

Versión simplificada del tracking sin login:
- Solo muestra: número de pedido, destinatario (alias, no datos completos), timeline visual, mapa
- Sin productos detallados ni precios (privacidad)
- CTA: `¿Quieres enviar tú también? → Conoce Yumury`

### 8.10 Mock Data — Pedidos en distintos estados

El demo debe tener pedidos mock en TODOS los estados para mostrar el tracking en cada fase:

1. Pedido recién creado (`pending`)
2. Pedido confirmado (`confirmed`)
3. Preparando (`preparing`) con foto
4. En tránsito (`shipped`) — el más completo, current state
5. En aduana (`in-customs`)
6. Almacén Matanzas (`in-warehouse`)
7. En reparto (`out-for-delivery`) con mapa de repartidor
8. Entregado (`delivered`) con foto del destinatario recibiendo

---

## 9. Combos Curados ⭐

### 9.1 Concepto

Combos pre-armados temáticos que resuelven situaciones específicas. No es solo "comida en bulk", son pensados con propósito.

### 9.2 Combos del Demo

#### Combo Apagón Ready ⚡
- Estación EcoFlow Delta 1300
- Lámpara LED recargable × 2
- Power bank 30,000 mAh
- Ventilador USB recargable
- Linterna potente
- **Precio**: $890 (ahorro $120 vs individual)
- **Badge**: `Apagón Ready` (color naranja)
- **Imagen**: collage de productos sobre fondo oscuro con "luz" cálida

#### Combo Ciclón Ready 🌀
- Linterna × 2
- Radio AM/FM a baterías
- Velas × 10
- Fósforos
- Agua embotellada (caja)
- Conservas variadas
- Botiquín básico
- **Precio**: $145
- **Badge**: `Ciclón Ready` (color azul tormenta)

#### Combo Familiar Básico 🍱
- Arroz 10 lb
- Frijoles negros 5 lb
- Aceite 1 galón
- Pollo congelado 5 lb
- Picadillo de res 3 lb
- Azúcar 4 lb
- Sal
- Café
- **Precio**: $69.99
- **Badge**: `Más vendido`

#### Combo Familiar Premium 🍖
- Todo del Básico +
- Carne de cerdo 5 lb
- Mariscos surtidos 3 lb
- Lácteos premium
- Frutas y vegetales
- **Precio**: $129.99
- **Badge**: `Premium`

#### Combo Cumpleaños 🎂
- Caja de regalos sorpresa
- Torta dulce
- Caramelos surtidos
- Decoración (globos, sombreros)
- Mensaje personalizado
- **Precio**: $54.99
- **Badge**: `Especial cumpleaños`

#### Combo Mamá Diabética 💊
- Productos sin azúcar
- Avena
- Endulzante
- Café descafeinado
- Vegetales especiales
- **Precio**: $79.99
- **Badge**: `Cuidado especial`

#### Combo Aseo Personal 🧴
- Jabones × 12
- Pasta dental × 4
- Champú y acondicionador
- Desodorantes
- Toallas sanitarias
- Papel higiénico × 12
- **Precio**: $42.99

#### Combo Bebé 👶
- Pañales (talla seleccionable)
- Toallitas húmedas
- Talco
- Aceite mineral
- Loción
- **Precio**: $59.99

### 9.3 Página de detalle de combo

```
[Hero combo con imagen grande]

[Título del combo]
[Badge temático]
[Descripción]

Precio del combo: $69.99
Precio si compras individual: $89.50
Ahorras: $19.51 (22%)

[Añadir al carrito]

─────────────────────────────────

¿Qué incluye?

[Grid de los productos del combo]
- Cada item: imagen, nombre, cantidad

─────────────────────────────────

¿Por qué este combo?

[Storytelling section explicando para quién es y qué resuelve]

─────────────────────────────────

[Reviews del combo]

[Combos relacionados]
```

### 9.4 ComboCard (en grids)

```
┌─────────────────────────────────┐
│  [Badge: Apagón Ready ⚡]       │
│                                  │
│   [Imagen del combo]             │
│                                  │
├──────────────────────────────────┤
│  Combo Apagón Ready              │
│  Para los apagones largos        │
│  Incluye 5 productos             │
│                                  │
│  $890                            │
│  ~~$1,010~~  Ahorras $120        │
│                                  │
│  [Ver detalles]                  │
└──────────────────────────────────┘
```

---

## 10. Asistente Yumi (IA Chat) ⭐

### 10.1 Concepto

"Yumi" es el asistente personal de Yumury. Habla en español neutro con calidez cubana sutil. Su trabajo es ayudar a armar el envío perfecto rápido. **En el MVP es un chat con respuestas mock contextuales** que se sienten naturales.

### 10.2 Personalidad

- Cálida pero profesional
- Práctica, no dramática
- Conoce el catálogo
- Hace preguntas para entender bien antes de recomendar
- Si no sabe algo, lo dice (no inventa)

### 10.3 Acceso a Yumi

**Yumi FAB** (Floating Action Button) en todas las páginas excepto `/checkout`:
- Botón circular fijo bottom-right
- Icono `Sparkles` con gradient brand
- Animación sutil de "respiración" (scale 1 → 1.05 cada 3s)
- Tooltip: `Habla con Yumi · Tu asistente`
- Click abre chat en panel lateral (desktop) o fullscreen (móvil)

**Página dedicada `/yumi`**:
- Acceso directo desde el bottom nav móvil
- Vista fullscreen con todo el espacio para conversar

### 10.4 Pantalla de Bienvenida

Si nunca se ha hablado con Yumi:

```
        [Avatar Yumi - icono Sparkles con gradient]

           ¡Hola! Soy Yumi 👋

   Tu asistente para armar envíos perfectos a Matanzas.
   Cuéntame qué necesitas y te ayudo a elegir.

   [Sugerencias rápidas como chips]:
   • "Tengo $80 para mi mamá"
   • "Combo familiar para 4 personas"
   • "Necesito un refrigerador"
   • "Algo para los apagones"

   [Input: Escribe tu mensaje...]
```

### 10.5 Conversación Mock (flujos de ejemplo)

#### Flujo 1: Presupuesto + persona

**User**: "Tengo $80 y quiero enviar comida para mi mamá por 2 semanas"

**Yumi**: "¡Qué bueno! Para $80 y 2 semanas tengo algunas opciones excelentes. ¿Tu mamá tiene alguna preferencia o restricción de comida? Por ejemplo, si es diabética o vegetariana."

**User**: "Es diabética"

**Yumi**: "Perfecto. Te recomiendo el **Combo Mamá Diabética** ($79.99) que incluye productos sin azúcar, avena, café descafeinado y vegetales especiales. Le va a durar tranquilamente las 2 semanas."

[Card del combo embebida en el chat con imagen y botón "Ver combo" / "Añadir al carrito"]

"¿Te gusta o prefieres que arme algo diferente?"

#### Flujo 2: Categoría amplia

**User**: "Necesito un refrigerador"

**Yumi**: "¡Claro! Tengo varios modelos disponibles. Para recomendarte el ideal, dime:
- ¿Cuántas personas viven en la casa?
- ¿Tienes preferencia de tamaño (compacto, mediano, grande)?
- ¿Buscas el más económico, mejor calidad o algo intermedio?"

**User**: "Somos 4 personas, mediano, calidad media"

**Yumi**: "Para 4 personas con calidad media te recomiendo el **Refrigerador Royal 250L** ($580). Tiene buena eficiencia energética (importante para los apagones), garantía de 1 año, y entrega en 2-3 semanas (vía marítima por su tamaño)."

[Card del producto embebida]

"¿Quieres ver más detalles o seguir explorando opciones?"

#### Flujo 3: Apagones

**User**: "Algo para los apagones"

**Yumi**: "¡Tenemos el combo perfecto para eso! El **Combo Apagón Ready** incluye una estación EcoFlow Delta 1300 + lámparas LED + power bank + ventilador USB. Con eso tu familia tiene electricidad para iluminar, cargar celulares y refrescarse durante los cortes."

[Card del combo embebida]

"Es nuestra recomendación más popular para Matanzas en esta época. ¿Quieres ver detalles?"

#### Flujo 4: Pregunta general

**User**: "¿Cuánto demora el envío?"

**Yumi**: "Tenemos 3 opciones de envío a Matanzas:

🚀 **Express** — 3-5 días — $18.99
✓ **Estándar** — 5-7 días — $8.99
🚢 **Marítimo** — 4-7 semanas — $4.99 (solo para envíos grandes)

Para alimentos te recomiendo Estándar o Express. Para electrodomésticos grandes y motos, Marítimo es lo más económico."

#### Flujo 5: Cumpleaños

**User**: "Es el cumpleaños de mi sobrina"

**Yumi**: "¡Qué lindo detalle! 🎂 ¿Cuántos años cumple? Tengo el **Combo Cumpleaños** ($54.99) que incluye torta, caramelos, decoración y un mensaje personalizado. Si me dices la edad, puedo sugerirte algo más específico."

### 10.6 Componentes del Chat

#### YumiMessage
- **User message**: alineado derecha, bg verde Yumury sutil, texto foreground
- **Yumi message**: alineado izquierda, bg muted, con avatar circular pequeño con icono Sparkles

#### YumiTyping
Cuando Yumi "está escribiendo":
- 3 dots animados con bounce sequence
- Aparece después de 800ms de delay (simula procesamiento)

#### YumiProductCard
Cuando Yumi recomienda un producto, se embebe una card compacta:
```
┌─────────────────────────────────────┐
│ [thumb]  Combo Apagón Ready    $890 │
│          5 productos · ⭐ 4.9       │
│          [Ver] [Añadir al carrito]  │
└─────────────────────────────────────┘
```

#### YumiSuggestions
Chips horizontales con prompts sugeridos siempre visibles cuando el chat está vacío o después de respuestas largas.

#### YumiInput
- Textarea autosize
- Botón enviar con icono `Send` que se activa cuando hay texto
- Soporta Enter para enviar (Shift+Enter para nueva línea)
- Caracteres counter: 500 max

### 10.7 Lógica Mock de Respuestas

Implementación: archivo `lib/mock-data/yumi-responses.ts` con un sistema simple de keyword matching:

```typescript
type YumiPattern = {
  keywords: string[];      // ["apagón", "luz", "electricidad"]
  response: {
    text: string;
    products?: string[];   // IDs de productos a mostrar
    suggestions?: string[]; // Próximas sugerencias
  };
  contextual?: boolean;    // Si depende del contexto previo
};

export const yumiPatterns: YumiPattern[] = [
  {
    keywords: ['apagón', 'luz', 'electricidad', 'corte', 'energía'],
    response: {
      text: '¡Tenemos el combo perfecto para eso!...',
      products: ['combo-apagon-ready'],
      suggestions: ['Ver detalles', 'Necesito algo más barato', 'Tienes paneles solares?']
    }
  },
  // ... más patrones
];
```

**Fallback**: si no matchea ninguna keyword, respuesta genérica pero útil:
> "Cuéntame un poco más sobre lo que buscas. Por ejemplo: a quién le envías, qué presupuesto tienes, o si necesitas algo específico (comida, electrodoméstico, vehículo)."

### 10.8 Persistencia

- Conversación se guarda en localStorage (`yumury-yumi-history-v1`)
- Botón "Nueva conversación" para limpiar
- Última conversación se restaura al volver

---

## 11. Auth Mock

### 11.1 Páginas

`/auth/login` y `/auth/registro`

### 11.2 Comportamiento

**Sin lógica real**. Cualquier email + cualquier password de 6+ chars = éxito.

**Login form**:
- Email
- Password
- Checkbox "Recordarme"
- Link "¿Olvidaste tu contraseña?"
- Botón "Iniciar sesión"
- Divider "o continúa con"
- Botones sociales (Google, Facebook) — solo UI, no funcionales
- Link a registro

**Registro form**:
- Nombre completo
- Email
- Password (con strength indicator)
- Confirm password
- Checkbox términos
- Botón "Crear cuenta"

### 11.3 Tras login/registro exitoso

- Toast: `¡Bienvenido a Yumury, [nombre]!`
- Redirect a página anterior o home
- Auth store de Zustand actualiza estado
- Header cambia: muestra avatar + dropdown con cuenta

### 11.4 Mock User

Al registrarse o login, se crea un user mock:
```typescript
{
  id: 'user_demo',
  name: 'María García',  // o el nombre que ingresen
  email: 'demo@yumury.com',
  avatar: '👩',
  joinedAt: '2024-01-15',
  totalOrders: 8,
  totalSpent: 567.89
}
```

Y se "precargan" 3 familias mock + 5-8 pedidos mock para que el demo se vea con datos.

---

## 12. Cuenta y Perfil

### 12.1 `/cuenta` Dashboard

Layout con sidebar (desktop) o tabs (móvil):

**Sidebar items**:
- Dashboard
- Mis Familias
- Pedidos
- Suscripciones
- Métodos de pago
- Configuración
- Cerrar sesión

**Dashboard content**:
- Welcome con nombre + avatar
- Stats cards:
  - Total pedidos: `8`
  - Total enviado: `$567.89`
  - Familias guardadas: `3`
  - Próxima entrega estimada: `12 mayo`
- Pedido más reciente con tracking compacto
- CTA: `Hacer un nuevo envío`

### 12.2 `/cuenta/pedidos`

Lista de pedidos con filtros:
- Todos
- En curso (preparing, shipped, in-customs, in-warehouse, out-for-delivery)
- Entregados
- Con incidencias

Cada item muestra:
- Número de pedido
- Fecha
- Destinatario
- Items thumbs (max 3 + "+N")
- Total
- Estado badge
- Botón "Ver tracking"

### 12.3 `/cuenta/suscripciones`

UI mock de suscripciones recurrentes:
- Card: "Combo Mamá - cada 30 días"
- Próxima entrega
- Pausar / Editar / Cancelar
- Empty state: `Aún no tienes suscripciones. Convierte cualquier pedido en envío recurrente.`

### 12.4 `/cuenta/metodos-pago`

UI mock de tarjetas guardadas:
- Card visual con número masked
- Marca de tarjeta
- Default badge
- Eliminar
- Botón "Añadir tarjeta"

### 12.5 `/cuenta/configuracion`

- Datos personales (nombre, email, teléfono)
- Cambiar contraseña
- Preferencias de notificaciones (toggles)
- Idioma (selector ES/EN)
- Tema (light/dark/system)
- Eliminar cuenta (botón rojo, requiere confirmación)

---

## 13. Footer y Páginas Estáticas

### 13.1 Footer

**Estructura desktop** (4 columnas + bottom row):

**Columna 1 — Yumury**:
- Logo
- Tagline: "Conectando familias entre Miami y Matanzas"
- Datos: +1 (786) 858-7480
- yumuryenvios.com
- Iconos sociales (FB, IG, WhatsApp, YouTube)

**Columna 2 — Comprar**:
- Alimentos
- Combos
- Electrodomésticos
- Vehículos
- Ofertas
- Más vendidos

**Columna 3 — Empresa**:
- Sobre nosotros
- Cómo funciona
- Preguntas frecuentes
- Blog (placeholder)
- Trabaja con nosotros (placeholder)

**Columna 4 — Soporte**:
- Contacto
- Centro de ayuda
- Política de envíos
- Garantías
- Devoluciones

**Bottom row**:
- © 2025 Yumury Envíos & Travel
- Política de privacidad
- Términos de uso
- Aviso legal
- Selector de idioma

**Mobile**: stack vertical con accordions colapsables.

### 13.2 `/como-funciona`

Página educativa con:
- Hero
- Los 3 pasos visuales detallados
- Video explicativo (placeholder)
- FAQ corta
- CTA para empezar

### 13.3 `/preguntas-frecuentes`

Categorías de FAQ con search:
- Envíos
- Pagos
- Productos
- Tracking
- Devoluciones
- Cuenta

Items con accordion expandible.

### 13.4 `/sobre-nosotros`

Storytelling page de Yumury:
- Origen del nombre (Yumurí)
- Misión y visión
- Equipo (placeholder)
- Compromiso con Matanzas
- Imágenes de Matanzas, Varadero, el Valle

### 13.5 `/contacto`

- Form de contacto (nombre, email, asunto, mensaje)
- Datos de contacto destacados
- Mapa de ubicación Miami (mock estático)
- Horarios de atención
- WhatsApp button flotante

---

## 🎯 Checklist por Feature (resumen)

| Feature | Pages | Components | State | Mock Data |
|---------|-------|------------|-------|-----------|
| Home | 1 | 10+ | - | testimonials, featured products |
| Catálogo | 3 | 15+ | search, filters | products (130+) |
| Producto | 1 | 8 | - | product details, reviews |
| Búsqueda | 2 | 4 | recentSearches | all products |
| Carrito | 2 | 5 | cartStore | - |
| Checkout | 5 | 7 | cartStore, familiesStore | - |
| Mis Familias ⭐ | 4 | 6 | familiesStore | mock families |
| Tracking ⭐ | 2 | 8 | - | mock orders + tracking events |
| Combos ⭐ | 1 | 3 | - | 12-15 combos |
| Yumi ⭐ | 1 | 7 | yumiHistoryStore | yumi-responses patterns |
| Auth | 2 | 2 | authStore | mock user |
| Cuenta | 5 | 6 | authStore | orders, families |
| Footer/Estáticas | 4 | 4 | - | FAQ data, contact info |

---

> **Continúa con MOCK_DATA.md** para los detalles del catálogo y datos demo.
