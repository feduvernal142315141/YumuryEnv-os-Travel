# 📚 Yumury Envíos & Travel — Documentación del Proyecto

> Documentación completa para construir el frontend MVP demo de Yumury Envíos & Travel — una marketplace premium de envíos a Matanzas, Cuba.

---

## 🗺️ Índice de documentos

Lee EN ESTE ORDEN para entender el proyecto completo:

### 1. 📖 [PLAN.md](./PLAN.md) — Master Plan
Visión, alcance MVP, stack tecnológico, arquitectura, las 4 features diferenciadoras y roadmap dividido en 6 fases.

**Cuándo leer**: Primero. Da el contexto global.

### 2. 🎨 [DESIGN_SYSTEM.md](./DESIGN_SYSTEM.md) — Identidad Visual
Paleta de colores basada en el logo real, tipografía (Plus Jakarta Sans), spacing, animaciones, components, tokens de diseño.

**Cuándo leer**: Antes de empezar a construir cualquier UI.

### 3. ⚙️ [FEATURES.md](./FEATURES.md) — Especificaciones de Features
Specs detalladas de las 13 features del MVP: home, catálogo, producto, búsqueda, cart, checkout, **Mis Familias ⭐**, **Tracking Visual ⭐**, combos, **Yumi (IA) ⭐**, auth, mi cuenta, footer.

**Cuándo leer**: Para entender CÓMO funciona cada parte.

### 4. 📦 [MOCK_DATA.md](./MOCK_DATA.md) — Datos del Demo
Catálogo completo de 145 productos (75 alimentos + 36 electrodomésticos + 19 vehículos + 15 combos), 3 familias mock, 8 pedidos en distintos estados, 50 reviews, 10 testimonios, FAQ, response patterns de Yumi, todos los tipos TypeScript.

**Cuándo leer**: Antes de poblar el catálogo y datos.

### 5. 🚀 [CLAUDE_CODE_PROMPT.md](./CLAUDE_CODE_PROMPT.md) — Prompts para Claude Code
7 prompts secuenciales optimizados (Bootstrap → Mock data → Layout → Catálogo → Cart/Checkout → Features estrella → Pulido) para alimentar a Claude Code y construir el proyecto fase por fase.

**Cuándo leer**: Cuando estés listo para empezar a construir.

---

## 🎯 Qué es Yumury

Una marketplace premium frontend-only (demo MVP) para envíos desde Miami a la provincia de Matanzas, Cuba. Compite visualmente y en UX con Katapulk, Supermarket23, DimeCuba y demás agencias actuales — pero superándolas con:

1. **🏠 Mis Familias** — Perfiles reusables de destinatarios con un click para reordenar
2. **📍 Tracking Visual** — Timeline con fotos en cada etapa del envío
3. **🎁 Combos Curados** — Apagón Ready, Mamá Diabética, Cumpleaños y más, con propósito real
4. **🤖 Yumi** — Asistente IA conversacional para armar el pedido perfecto

---

## 🛠️ Stack tecnológico

```
Next.js 15 (App Router)
+ React 19
+ TypeScript 5
+ Tailwind CSS v4
+ shadcn/ui
+ Lucide React
+ Framer Motion
+ Zustand
+ TanStack Query
+ Fuse.js (búsqueda)
+ next-intl (i18n)
+ react-hook-form + zod
```

---

## 🚀 Cómo arrancar el proyecto

```bash
# 1. Crear carpeta del proyecto
mkdir yumury-frontend && cd yumury-frontend

# 2. Copiar estos 6 docs a docs/
mkdir docs
cp /ruta/a/yumury-docs/*.md docs/

# 3. Iniciar Claude Code
claude

# 4. Pegar el "Prompt 1 — Setup Inicial" del CLAUDE_CODE_PROMPT.md
# 5. Seguir prompts 2-7 fase por fase
```

---

## 📋 Las 7 fases de construcción

| Fase | Qué se construye | Prompt |
|------|------------------|--------|
| 1 | Setup, dependencias, types, design tokens | Prompt 1 |
| 2 | Mock data completo + stores Zustand | Prompt 2 |
| 3 | Layout, Header, Footer, Home | Prompt 3 |
| 4 | Catálogo, PDP, Búsqueda | Prompt 4 |
| 5 | Cart, Checkout, Auth mock | Prompt 5 |
| 6 | **Las 3 features estrella** ⭐ | Prompt 6 |
| 7 | Cuenta, settings, pulido final | Prompt 7 |

---

## 📞 Datos del cliente

- **Empresa**: Yumury Envíos & Travel
- **Ubicación**: Miami, FL, USA
- **Sitio actual**: yumuryenvios.com
- **Teléfono**: +1 (786) 858-7480
- **Cobertura**: Provincia de Matanzas, Cuba (14 municipios)

---

## 🎨 Identidad visual rápida

- **Verde brand**: `#15803D` (montañas del Yumurí)
- **Rojo brand**: `#DC2626` (avión, "envíos & travel")
- **Naranja brand**: `#EA8A1C` (sol cubano)
- **Amarillo brand**: `#F4B81C` (luz)
- **Gradient signature**: `linear-gradient(135deg, #F4B81C 0%, #EA8A1C 50%, #DC2626 100%)`
- **Tipografía**: Plus Jakarta Sans

---

> 💡 **Tip**: Lee TODO el README.md y el PLAN.md antes de empezar a construir. Esos 30 minutos te ahorran horas de iteración.
