# 🎨 Yumury Design System

> Sistema de diseño completo basado en la identidad real del logo de Yumury Envíos & Travel

---

## 🎭 Identidad de Marca

El logo de Yumury contiene 4 elementos visuales clave que informan TODO el sistema de diseño:

1. **Círculo gradiente** (amarillo → naranja → rojo) — representa el viaje, la conexión internacional, el sol cubano
2. **Montañas verdes** (Valle del Yumurí en Matanzas) — naturaleza, raíces, identidad geográfica
3. **Avión rojo** — movimiento, envíos, conexión Miami → Cuba
4. **Tipografía "yumury" verde + "envíos & travel" rojo** — wordmark principal

### Personalidad de la marca

- **Cálida** (no fría corporativa)
- **Confiable** (no aburrida formal)
- **Familiar** (no impersonal)
- **Premium** (no barata)
- **Cubana** (sin ser folclórica obvia)
- **Moderna** (no tradicional/anticuada)

### Voz y tono
- Cercano pero profesional
- Optimista pero realista
- Español neutro con guiños cubanos cuando suma
- Nunca paternalista ni dramático
- Siempre con foco en la familia y la conexión

---

## 🎨 Paleta de Colores

### Colores de Marca (Brand)

```css
/* Verde Yumury - Color primario, de las montañas y wordmark */
--brand-green:        #15803D;   /* Verde principal */
--brand-green-deep:   #0F5F2E;   /* Hover, pressed states */
--brand-green-light:  #22A85A;   /* Accent vibrante, success */
--brand-green-50:     #F0FDF4;   /* Backgrounds sutiles */
--brand-green-100:    #DCFCE7;
--brand-green-200:    #BBF7D0;
--brand-green-500:    #22C55E;
--brand-green-600:    #16A34A;
--brand-green-700:    #15803D;   /* = brand-green */
--brand-green-800:    #166534;
--brand-green-900:    #14532D;

/* Rojo Yumury - Color accent, del avión y "envíos & travel" */
--brand-red:          #DC2626;   /* Rojo principal accent */
--brand-red-deep:     #B91C1C;   /* Hover */
--brand-red-light:    #EF4444;   /* Más vibrante */
--brand-red-50:       #FEF2F2;
--brand-red-100:      #FEE2E2;
--brand-red-500:      #EF4444;
--brand-red-600:      #DC2626;   /* = brand-red */
--brand-red-700:      #B91C1C;

/* Naranja Yumury - Del gradiente del círculo */
--brand-orange:       #EA8A1C;   /* Naranja principal */
--brand-orange-deep:  #C2710E;
--brand-orange-light: #F59E0B;
--brand-orange-50:    #FFF7ED;
--brand-orange-100:   #FFEDD5;

/* Amarillo Yumury - Del inicio del gradiente */
--brand-yellow:       #F4B81C;   /* Amarillo cálido */
--brand-yellow-deep:  #D49A0E;
--brand-yellow-light: #FACC15;
--brand-yellow-50:    #FEFCE8;
--brand-yellow-100:   #FEF3C7;
```

### Gradiente Signature de Marca

El gradiente del logo es **único e icónico**. Es nuestro asset visual más reconocible:

```css
/* Gradiente principal - usar en hero, CTAs hero, badges premium, success states */
--gradient-brand: linear-gradient(135deg,
  #F4B81C 0%,    /* amarillo */
  #EA8A1C 50%,   /* naranja */
  #DC2626 100%   /* rojo */
);

/* Gradiente suave - para backgrounds sutiles */
--gradient-brand-soft: linear-gradient(135deg,
  #FEF3C7 0%,
  #FED7AA 50%,
  #FECACA 100%
);

/* Gradiente con verde - para combinar verde + cálidos en momentos especiales */
--gradient-yumury: linear-gradient(135deg,
  #15803D 0%,
  #EA8A1C 60%,
  #DC2626 100%
);

/* Gradiente vertical sutil para hero overlays */
--gradient-hero-overlay: linear-gradient(180deg,
  rgba(10, 10, 11, 0) 0%,
  rgba(10, 10, 11, 0.7) 100%
);
```

### Cuándo usar el gradiente
✅ Hero principal de home
✅ Botón CTA único más importante de cada página
✅ Badges "Premium", "Bestseller", "Edición Limitada"
✅ Iconos de momentos clave (success page, milestone tracking)
✅ Logo accents
✅ Loading bars destacadas

❌ NO usar en botones genéricos (sería ruido)
❌ NO usar en backgrounds grandes saturados
❌ NO usar en texto extenso (problemas de legibilidad)

### Sistema de Neutrales (warm-toned)

```css
/* LIGHT MODE */
--background:           #FAFAF9;   /* Off-white cálido (no blanco puro) */
--background-secondary: #F4F4F2;
--foreground:           #0F1419;   /* Texto principal */
--foreground-secondary: #4B5563;
--foreground-muted:     #6B7280;
--card:                 #FFFFFF;
--card-hover:           #FAFAF9;
--border:               #E5E5E2;
--border-subtle:        #EFEFEC;
--input:                #FFFFFF;
--input-border:         #D1D5DB;
--ring:                 #15803D;   /* Focus ring = brand green */

/* DARK MODE */
--background-dark:           #0A0A0B;   /* Casi negro con tinte cálido */
--background-secondary-dark: #131315;
--foreground-dark:           #FAFAF9;
--foreground-secondary-dark: #D1D5DB;
--foreground-muted-dark:     #9CA3AF;
--card-dark:                 #131315;
--card-hover-dark:           #1A1A1C;
--border-dark:               #27272A;
--border-subtle-dark:        #1F1F22;
--input-dark:                #131315;
--input-border-dark:         #3F3F46;
--ring-dark:                 #22C55E;
```

### Tokens Funcionales (Semantic)

```css
/* LIGHT MODE */
--primary:               var(--brand-green);          /* #15803D */
--primary-foreground:    #FFFFFF;
--primary-hover:         var(--brand-green-deep);
--primary-subtle:        var(--brand-green-50);

--accent:                var(--brand-red);            /* #DC2626 */
--accent-foreground:     #FFFFFF;
--accent-hover:          var(--brand-red-deep);
--accent-subtle:         var(--brand-red-50);

--highlight:             var(--brand-orange);         /* #EA8A1C */
--highlight-foreground:  #FFFFFF;

--success:               #15803D;
--success-foreground:    #FFFFFF;
--success-subtle:        #F0FDF4;

--warning:               var(--brand-yellow);         /* #F4B81C */
--warning-foreground:    #422006;
--warning-subtle:        #FEFCE8;

--destructive:           #DC2626;
--destructive-foreground: #FFFFFF;
--destructive-subtle:    #FEF2F2;

--info:                  #2563EB;
--info-foreground:       #FFFFFF;
--info-subtle:           #EFF6FF;

/* DARK MODE - mismas variables, valores adaptados */
--primary-dark:          #22C55E;     /* Verde más luminoso */
--accent-dark:           #EF4444;
--highlight-dark:        #F59E0B;
--success-dark:          #22C55E;
--warning-dark:          #FBBF24;
--destructive-dark:      #EF4444;
--info-dark:             #3B82F6;
```

### Mapeo a `globals.css` (Tailwind v4)

```css
@import "tailwindcss";

@theme {
  /* Colores brand */
  --color-brand-green: #15803D;
  --color-brand-green-deep: #0F5F2E;
  --color-brand-green-light: #22A85A;
  --color-brand-red: #DC2626;
  --color-brand-red-light: #EF4444;
  --color-brand-orange: #EA8A1C;
  --color-brand-yellow: #F4B81C;

  /* Gradientes */
  --gradient-brand: linear-gradient(135deg, #F4B81C 0%, #EA8A1C 50%, #DC2626 100%);
  --gradient-brand-soft: linear-gradient(135deg, #FEF3C7 0%, #FED7AA 50%, #FECACA 100%);
  --gradient-yumury: linear-gradient(135deg, #15803D 0%, #EA8A1C 60%, #DC2626 100%);

  /* Colores semánticos light por defecto */
  --color-background: #FAFAF9;
  --color-foreground: #0F1419;
  --color-primary: #15803D;
  --color-primary-foreground: #FFFFFF;
  --color-accent: #DC2626;
  --color-accent-foreground: #FFFFFF;
  --color-muted: #F4F4F2;
  --color-muted-foreground: #6B7280;
  --color-card: #FFFFFF;
  --color-card-foreground: #0F1419;
  --color-border: #E5E5E2;
  --color-input: #FFFFFF;
  --color-ring: #15803D;
  --color-success: #15803D;
  --color-warning: #F4B81C;
  --color-destructive: #DC2626;

  /* Sombras con tinte verde sutil */
  --shadow-sm: 0 1px 2px 0 rgba(21, 128, 61, 0.04);
  --shadow-md: 0 4px 12px -2px rgba(21, 128, 61, 0.08);
  --shadow-lg: 0 12px 32px -8px rgba(21, 128, 61, 0.12);
  --shadow-xl: 0 24px 48px -12px rgba(21, 128, 61, 0.18);
  --shadow-glow-green: 0 0 32px rgba(21, 128, 61, 0.25);
  --shadow-glow-warm: 0 0 48px rgba(234, 138, 28, 0.3);

  /* Border radius */
  --radius-sm: 0.5rem;     /* 8px - badges, chips */
  --radius: 0.75rem;       /* 12px - botones, inputs */
  --radius-md: 1rem;       /* 16px - cards */
  --radius-lg: 1.25rem;    /* 20px - cards grandes */
  --radius-xl: 1.5rem;     /* 24px - modales, sheets */
  --radius-2xl: 2rem;      /* 32px - hero containers */

  /* Tipografía */
  --font-sans: 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-display: 'Plus Jakarta Sans', system-ui, sans-serif;
  --font-mono: 'Geist Mono', monospace;

  /* Transiciones */
  --transition-fast: 150ms cubic-bezier(0.16, 1, 0.3, 1);
  --transition-base: 250ms cubic-bezier(0.16, 1, 0.3, 1);
  --transition-slow: 400ms cubic-bezier(0.16, 1, 0.3, 1);
}

/* Dark mode override */
.dark {
  --color-background: #0A0A0B;
  --color-foreground: #FAFAF9;
  --color-primary: #22C55E;
  --color-primary-foreground: #0A0A0B;
  --color-accent: #EF4444;
  --color-accent-foreground: #FFFFFF;
  --color-muted: #18181A;
  --color-muted-foreground: #9CA3AF;
  --color-card: #131315;
  --color-card-foreground: #FAFAF9;
  --color-border: #27272A;
  --color-input: #131315;
  --color-ring: #22C55E;
  --color-success: #22C55E;
  --color-warning: #FBBF24;
  --color-destructive: #EF4444;

  --shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.4);
  --shadow-md: 0 4px 12px -2px rgba(0, 0, 0, 0.5);
  --shadow-lg: 0 12px 32px -8px rgba(0, 0, 0, 0.6);
  --shadow-glow-green: 0 0 48px rgba(34, 197, 94, 0.4);
}
```

---

## ✍️ Tipografía

### Familia tipográfica

**Plus Jakarta Sans** — para todo el sitio

Razones de la elección:
- Las curvas suaves matchean perfecto con el wordmark "yumury" del logo
- Tiene 8 weights (200-800) para jerarquía rica
- Excelente legibilidad en mobile
- Optimizada para web
- Variable font (un solo archivo, todos los pesos)

Para precios y números: **Geist Mono** (tabular-nums, premium feeling)

### Carga con next/font

```typescript
// app/layout.tsx
import { Plus_Jakarta_Sans, Geist_Mono } from 'next/font/google';

const sans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const mono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});
```

### Escala tipográfica

```css
/* Display - solo hero */
.text-display-2xl  → font-size: clamp(3rem, 8vw, 5.5rem); line-height: 1.05; letter-spacing: -0.04em; font-weight: 800;
.text-display-xl   → font-size: clamp(2.5rem, 6vw, 4.5rem); line-height: 1.05; letter-spacing: -0.04em; font-weight: 800;
.text-display-lg   → font-size: clamp(2rem, 5vw, 3.5rem); line-height: 1.1; letter-spacing: -0.03em; font-weight: 700;

/* Headings */
.text-h1           → font-size: clamp(2rem, 4vw, 2.75rem); line-height: 1.15; letter-spacing: -0.02em; font-weight: 700;
.text-h2           → font-size: clamp(1.5rem, 3vw, 2.25rem); line-height: 1.2; letter-spacing: -0.02em; font-weight: 700;
.text-h3           → font-size: 1.5rem; line-height: 1.3; letter-spacing: -0.01em; font-weight: 600;
.text-h4           → font-size: 1.25rem; line-height: 1.35; font-weight: 600;
.text-h5           → font-size: 1.125rem; line-height: 1.4; font-weight: 600;
.text-h6           → font-size: 1rem; line-height: 1.5; font-weight: 600;

/* Body */
.text-body-lg      → font-size: 1.125rem; line-height: 1.6; font-weight: 400;
.text-body         → font-size: 1rem; line-height: 1.6; font-weight: 400;
.text-body-sm      → font-size: 0.875rem; line-height: 1.5; font-weight: 400;

/* Labels y small */
.text-label        → font-size: 0.875rem; line-height: 1.4; font-weight: 500;
.text-caption      → font-size: 0.75rem; line-height: 1.4; font-weight: 500; letter-spacing: 0.01em;
.text-overline     → font-size: 0.75rem; line-height: 1.4; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em;
```

### Reglas de uso

- **Hero principal (home)**: `text-display-xl` con weight 800
- **Títulos de página**: `text-h1`
- **Secciones dentro de página**: `text-h2`
- **Cards y bloques**: `text-h3` o `text-h4`
- **Body principal**: `text-body` con `text-foreground`
- **Texto secundario**: `text-body-sm` con `text-foreground-muted`
- **Precios**: usar fuente mono con `tabular-nums`
- **Labels en formularios**: `text-label`

### Texto con gradiente (uso especial)

Para frases impactantes específicas (1-2 por página máximo):

```tsx
<span className="bg-gradient-brand bg-clip-text text-transparent">
  conexión sin distancia
</span>
```

---

## 📐 Sistema de Espaciado

Basado en grid de 4px. Solo usar estos valores:

| Token | Valor | Uso |
|-------|-------|-----|
| `space-1` | 4px | Gaps internos pequeños |
| `space-2` | 8px | Padding de chips, badges |
| `space-3` | 12px | Padding interno botones |
| `space-4` | 16px | Padding de cards, gaps base |
| `space-6` | 24px | Separación de elementos relacionados |
| `space-8` | 32px | Separación entre secciones cercanas |
| `space-12` | 48px | Separación entre bloques |
| `space-16` | 64px | Separación entre secciones |
| `space-20` | 80px | Separación grande |
| `space-24` | 96px | Hero padding |
| `space-32` | 128px | Solo casos especiales |

### Container widths

```css
.container-sm  → max-width: 640px;   /* Lectura cómoda, formularios */
.container-md  → max-width: 768px;   /* Contenido medio */
.container-lg  → max-width: 1024px;  /* Default catálogo */
.container-xl  → max-width: 1280px;  /* Páginas amplias */
.container-2xl → max-width: 1440px;  /* Layouts amplios */
```

Padding lateral responsive:
- Mobile (<640px): `px-4` (16px)
- Tablet (640-1024px): `px-6` (24px)
- Desktop (>1024px): `px-8` (32px)

---

## 🔘 Border Radius

```css
rounded-sm  → 8px    /* badges, chips, etiquetas pequeñas */
rounded     → 12px   /* botones, inputs, controls */
rounded-md  → 16px   /* cards de productos */
rounded-lg  → 20px   /* cards grandes, paneles */
rounded-xl  → 24px   /* modales, sheets */
rounded-2xl → 32px   /* hero containers, secciones especiales */
rounded-full         /* avatares, botones circulares, FABs */
```

**Regla**: dentro de un mismo componente, los radios se reducen hacia adentro. Ej: card con `rounded-lg` (20px) tiene una imagen interna con `rounded-md` (16px).

---

## 🌑 Sombras

Sombras con **tinte verde sutil** (no negras puras) para coherencia con la marca:

```css
shadow-sm   → 0 1px 2px 0 rgba(21, 128, 61, 0.04)        /* Botones, inputs */
shadow-md   → 0 4px 12px -2px rgba(21, 128, 61, 0.08)    /* Cards */
shadow-lg   → 0 12px 32px -8px rgba(21, 128, 61, 0.12)   /* Cards hover, modales */
shadow-xl   → 0 24px 48px -12px rgba(21, 128, 61, 0.18)  /* Hero, dropdowns */
shadow-glow-green → 0 0 32px rgba(21, 128, 61, 0.25)     /* Focus state primary */
shadow-glow-warm  → 0 0 48px rgba(234, 138, 28, 0.3)     /* CTAs gradiente */
```

En dark mode: sombras más oscuras y profundas.

---

## ⚡ Animaciones y Transiciones

### Curvas de animación (easings)

```css
--ease-out:        cubic-bezier(0.16, 1, 0.3, 1);    /* Default - smooth out */
--ease-in-out:     cubic-bezier(0.65, 0, 0.35, 1);   /* Transiciones simétricas */
--ease-spring:     cubic-bezier(0.34, 1.56, 0.64, 1); /* Bounce sutil */
--ease-anticipate: cubic-bezier(0.68, -0.55, 0.27, 1.55); /* Movimiento dramático */
```

### Duraciones

```css
--duration-fast:    150ms   /* Hover, focus simples */
--duration-base:    250ms   /* Default - mayoría de transiciones */
--duration-slow:    400ms   /* Page transitions, sheets */
--duration-slower:  600ms   /* Animaciones de scroll, reveals */
```

### Patterns de animación con Framer Motion

#### 1. Fade + Slide Up (default reveal)
```tsx
<motion.div
  initial={{ opacity: 0, y: 16 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
/>
```

#### 2. Stagger children (grids)
```tsx
const container = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0 }
};
```

#### 3. Tap scale (botones)
```tsx
<motion.button
  whileTap={{ scale: 0.97 }}
  transition={{ duration: 0.15 }}
/>
```

#### 4. Hover lift (cards)
```tsx
<motion.div
  whileHover={{ y: -4 }}
  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
/>
```

#### 5. Page transition
```tsx
<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  exit={{ opacity: 0 }}
  transition={{ duration: 0.2 }}
/>
```

#### 6. Add to cart animation
Producto vuela del catálogo al icono del carrito con FLIP animation.

---

## 🧩 Componentes Clave

### Button (variantes)

```tsx
// Primary - acción principal de la página (1 por pantalla)
<Button>Comprar ahora</Button>
// → bg verde Yumury, text blanco, sombra sutil

// Accent - CTAs secundarios urgentes
<Button variant="accent">Ver tracking</Button>
// → bg rojo Yumury

// Gradient - el CTA más importante (hero, success)
<Button variant="gradient">Empezar</Button>
// → bg con gradient-brand, sombra glow-warm

// Outline
<Button variant="outline">Cancelar</Button>

// Ghost
<Button variant="ghost">Más detalles</Button>

// Destructive
<Button variant="destructive">Eliminar</Button>
```

Sizes: `sm`, `default`, `lg`, `xl` (hero only), `icon`.

### ProductCard

```
┌─────────────────────────┐
│  [Badge stock]    [♥]  │
│                         │
│       [Imagen]          │
│                         │
├─────────────────────────┤
│  Categoría · 4.8 ★      │
│  Nombre del producto    │
│  con dos líneas máx     │
│                         │
│  $12.99   [+ Añadir]   │
└─────────────────────────┘
```

- Border radius: `rounded-md` (16px)
- Imagen: aspect-square con `rounded-sm` (8px)
- Hover: `y: -4` lift + sombra `shadow-lg`
- Badge stock: top-left
- Wishlist: top-right (heart icon)
- Padding: `p-3` o `p-4`
- Ratio mínimo de imagen: 1:1
- En dark mode: bg-card más oscuro

### Tracking Timeline

Vertical, eventos con:
- Círculo a la izquierda (estado: completed = verde sólido, current = verde con pulse animation, pending = gris hueco)
- Línea conectora vertical
- A la derecha: título, descripción, ubicación, fecha
- Foto del evento (si hay) como thumbnail clickeable

```
●━━━━━━ Tu pedido fue confirmado
│       Miami, FL · Hoy 10:32 AM
│
●━━━━━━ Preparando en almacén Miami
│       [Foto thumbnail]
│       Miami, FL · Hoy 14:15 PM
│
◉━━━━━━ En tránsito hacia Cuba ← (current, pulsing)
│       Vuelo internacional
│       Hoy 18:00 PM
│
○ ─ ─ ─ Llegada al almacén Matanzas
○ ─ ─ ─ En reparto
○ ─ ─ ─ Entregado
```

### Family Card

```
┌──────────────────────────┐
│  [Avatar]  Mamá Mercedes │
│            🤍 Madre       │
│                          │
│  📍 Cárdenas, Matanzas   │
│  📞 +53 5234 5678        │
│                          │
│  Último envío: hace 2sem │
│                          │
│  [Reordenar] [Editar]    │
└──────────────────────────┘
```

---

## 🎯 Iconografía

**Sistema completo: lucide-react**

Importar individualmente para tree-shaking:
```tsx
import { ShoppingCart, Heart, MapPin } from 'lucide-react';
```

### Tamaños estándar

```css
icon-xs  → w-3 h-3   (12px)  /* Badges */
icon-sm  → w-4 h-4   (16px)  /* Inline en texto, botones pequeños */
icon-md  → w-5 h-5   (20px)  /* Default - botones, headers */
icon-lg  → w-6 h-6   (24px)  /* Iconos destacados */
icon-xl  → w-8 h-8   (32px)  /* Iconos hero, empty states */
icon-2xl → w-12 h-12 (48px)  /* Empty states grandes */
```

### Iconos clave del proyecto

| Contexto | Icono Lucide |
|----------|--------------|
| Carrito | `ShoppingCart` |
| Buscar | `Search` |
| Familias | `Users` o `HeartHandshake` |
| Tracking | `MapPin` o `Truck` |
| Yumi (chat) | `Sparkles` o `MessageCircle` |
| Combos | `Package` o `Gift` |
| Apagón ready | `Zap` o `Lightbulb` |
| Ciclón ready | `CloudRain` |
| Cumpleaños | `Cake` |
| Envío | `Truck` o `Plane` |
| Garantía | `ShieldCheck` |
| Tiempo entrega | `Clock` |
| Theme toggle | `Sun` / `Moon` |
| Idioma | `Languages` |
| Cuenta | `User` o `CircleUser` |
| Configuración | `Settings` |
| Alimentos | `Apple` o `UtensilsCrossed` |
| Electrodomésticos | `Refrigerator` o `Microwave` |
| Vehículos | `Bike` o `Car` |
| Pago | `CreditCard` |
| Éxito | `CheckCircle2` |
| Error | `XCircle` |
| Info | `Info` |
| Warning | `AlertTriangle` |

---

## 🖼️ Imágenes

### Fuentes para mock data

- **Productos**: Unsplash (`source.unsplash.com/featured/?{query}`)
- **Hero/lifestyle**: Unsplash + Pexels
- **Tracking fotos**: Pexels (almacenes, mensajería, paquetes)
- **Matanzas/Varadero**: Wikimedia Commons + Unsplash
- **Avatares emoji**: emojis Unicode directo (`👵`, `👨`, `👧`)
- **Ilustraciones**: unDraw (con color brand verde)

### Optimización

Siempre usar `next/image` con:
- `sizes` apropiado
- `priority` para imágenes above the fold
- `placeholder="blur"` con blurDataURL
- `quality={85}` (default 75 es muy bajo para producto)

```tsx
<Image
  src={product.image}
  alt={product.name}
  width={400}
  height={400}
  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
  className="rounded-sm object-cover"
  placeholder="blur"
  blurDataURL={product.blurDataURL}
/>
```

### Aspect ratios estándar

- Producto card: `1:1` (square)
- Producto detalle: `4:5` (vertical) o `1:1`
- Hero: `16:9` desktop, `4:5` mobile
- Banner secciones: `21:9`
- Categoría hero: `16:9`
- Combo card: `4:3`

---

## 📱 Responsive Breakpoints

```
sm:  640px    /* Tablet pequeña */
md:  768px    /* Tablet */
lg:  1024px   /* Desktop pequeño */
xl:  1280px   /* Desktop */
2xl: 1536px   /* Desktop grande */
```

### Filosofía mobile-first

```tsx
// ❌ Mal: pensar desktop primero
<div className="text-3xl md:text-base" />

// ✅ Bien: mobile base, desktop expansion
<div className="text-base md:text-3xl" />
```

### Layouts típicos

**Grid de productos**:
- Mobile: 2 columnas (`grid-cols-2`)
- Tablet: 3 columnas (`md:grid-cols-3`)
- Desktop: 4 columnas (`lg:grid-cols-4`)
- Desktop XL: 5 columnas en algunos casos (`xl:grid-cols-5`)

**Page con sidebar**:
- Mobile: stack vertical
- Desktop: `lg:grid-cols-[280px_1fr]`

**Hero**:
- Mobile: imagen arriba, texto abajo
- Desktop: split 50/50 o 60/40

---

## 🌗 Modo Oscuro

Implementación con `next-themes`:

```tsx
// app/layout.tsx
import { ThemeProvider } from 'next-themes';

<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
  disableTransitionOnChange
>
```

### Reglas para dark mode

1. Nunca usar `text-black` o `text-white` directos. Usar tokens.
2. Imágenes con fondo blanco necesitan `dark:bg-card` border o un wrapper
3. Sombras se vuelven más profundas en dark
4. El gradiente brand es legible en ambos modos
5. Los colores brand (verde, rojo) se aclaran ligeramente en dark
6. Usar `dark:` modifier solo cuando los tokens no resuelven

### Toggle UX

- Icono `Sun` en light, `Moon` en dark
- Animación de rotación al cambiar
- Transición suave de colores (excepto en cambio inicial)
- Persistencia automática en localStorage

---

## 🎭 Estados Visuales

### Loading
- **Skeleton loaders** siempre, nunca spinners genéricos en contenido principal
- Skeleton con shimmer gradient sutil
- Mantener el layout final (mismo tamaño que el contenido real)

### Empty states
- Ilustración custom o emoji grande
- Título descriptivo (no "Sin datos")
- Descripción que explica qué pasa y qué hacer
- CTA claro
- Ejemplo: "Aún no has agregado familiares 👵 — agrega a tu mamá, abuela o tíos para enviarles regalos en un click"

### Error states
- Icono `AlertTriangle` o `XCircle` en `text-destructive`
- Mensaje claro y humano (no "Error 500")
- Botón de reintentar o acción alternativa

### Success states
- Icono `CheckCircle2` en verde Yumury
- Confetti en éxitos clave (compra completada)
- Animación de check dibujándose

---

## 🎯 Patrones de UI Específicos

### Header Desktop

```
┌─────────────────────────────────────────────────────────────────┐
│  [Logo Yumury]  [Cat ▾] [Combos] [Cómo funciona]   🔍 ⌘K  ❤  🛒 👤 │
└─────────────────────────────────────────────────────────────────┘
```

- Logo a la izquierda
- Nav center
- Search trigger + iconos a la derecha
- Sticky con backdrop-blur al scroll
- Border bottom sutil

### Header Mobile

```
┌────────────────────────────┐
│  ☰  [Logo]    🔍   🛒 (2) │
└────────────────────────────┘
```

### Bottom Navigation Mobile

```
┌────────────────────────────┐
│   🏠      📦     ⭐    👤  │
│  Inicio  Cat   Yumi  Mí   │
└────────────────────────────┘
```

5 items máximo, item activo con color brand verde + scale leve.

### CartSheet

Lateral derecho desktop, bottom sheet móvil (vaul).
- Header: "Tu carrito" + cerrar
- Items scrolleables
- Resumen sticky bottom
- CTA "Ir al checkout" prominente

### Product Detail Layout

**Desktop**:
```
┌─────────────────────────────────────────┐
│ [Galería 60%]    [Info 40%]            │
│                  Categoría · ★ 4.8      │
│                  Nombre del producto    │
│                  $12.99                 │
│                                         │
│                  [Variantes]            │
│                  [Quantity]             │
│                  [Añadir al carrito]    │
│                                         │
│                  Descripción            │
│                  Especificaciones       │
└─────────────────────────────────────────┘
```

**Mobile**:
- Galería full width arriba (con dots)
- Info debajo
- Sticky bottom bar con precio + add to cart

---

## ✨ Detalles Premium

Pequeños toques que separan un demo común de uno premium:

1. **Cursor pointer** consistente en todo lo clickeable
2. **Focus visible** con ring verde Yumury (no el azul default del browser)
3. **Selection color** custom (`::selection { background: rgba(21, 128, 61, 0.2) }`)
4. **Scrollbar customizada** sutil
5. **Animación de número** en contador del carrito (no salto, count animation)
6. **Tooltip en iconos sin label** con delay de 500ms
7. **Keyboard shortcuts visibles** donde aplique (Cmd+K, ESC para cerrar modales)
8. **Haptic feedback en mobile** donde el navegador lo permita
9. **Smooth scroll** entre secciones de la home
10. **View transitions** entre páginas (Next 15 lo soporta nativamente)
11. **Sticky sections** con offset correcto del header
12. **Badge "Nuevo" con animación** sutil (pulse o shimmer)

---

## 🚫 Anti-patrones (NO HACER)

❌ Usar emojis dentro de UI seria (excepto avatares de familias)
❌ Usar más de 3 colores no-neutrales en una sola pantalla
❌ Botones con sombras genéricas negras
❌ Bordes de 1px grises tristes en cards (usar sombras sutiles)
❌ Tipografía con muchos pesos diferentes (más de 3 weights = caos)
❌ Centrar texto largo (solo headings cortos)
❌ Justify text (genera ríos de espacios feos)
❌ Hover effects agresivos (scale 1.1, color flash, etc.)
❌ Animaciones lentas (>500ms en interacciones simples = se siente roto)
❌ Modal sobre modal sobre modal
❌ Sticky headers transparentes que no leen sobre cualquier fondo
❌ Botones con estado disabled gris muerto sin razón clara
❌ Loading spinners de pantalla completa para acciones rápidas
❌ Tablas no responsive en móvil
❌ Texto con `text-shadow` (eso era 2010)
❌ Gradientes puestos por todas partes (el brand gradient es premium, no tema general)

---

> **Continúa con FEATURES.md** para ver las especificaciones detalladas de cada feature.
