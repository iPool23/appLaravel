# Migración Next.js → Laravel + React (Inertia.js)

## 🎯 Resumen Ejecutivo

**Estado**: 50% Completado  
**Componentes Migrados**: 56+  
**Fases Completadas**: 3 de 6  

## 📊 Progreso por Fase

| Fase | Descripción | Estado | Componentes |
|------|-------------|--------|-------------|
| 1 | UI Base | ✅ 100% | 25+ |
| 2 | Layout y Navegación | ✅ 100% | 8 |
| 3 | Contenido (Cards, Grid, Video) | ✅ 100% | 13 |
| 4 | Secciones Específicas | 🔄 40% | 3 |
| 5 | Interactivos | ⏳ 0% | 0 |
| 6 | Admin | ⏳ 0% | 0 |

## 🚀 Inicio Rápido

### Instalación
```bash
# Instalar dependencias
npm install

# Compilar assets
npm run build

# Modo desarrollo
npm run dev
```

### Uso Básico
```tsx
// En tu componente de página
import { Container, CustomCardImage, Title } from '@/components/ui';

export default function MyPage({ data }) {
  return (
    <Container>
      <Title title="Mi Página" fontSize="4xl" />
      <CustomCardImage {...data} />
    </Container>
  );
}
```

## 📁 Estructura del Proyecto

```
app/
├── resources/
│   ├── js/
│   │   ├── components/
│   │   │   ├── gallery/        # Componentes de galería
│   │   │   ├── svg/            # Iconos SVG
│   │   │   └── ui/             # Componentes UI principales
│   │   │       ├── animation/
│   │   │       ├── banner/
│   │   │       ├── button/
│   │   │       ├── card/
│   │   │       ├── carousel/
│   │   │       ├── container/
│   │   │       ├── dropdown/
│   │   │       ├── footer/
│   │   │       ├── grid/
│   │   │       ├── line/
│   │   │       ├── loading/
│   │   │       ├── menu/
│   │   │       ├── pagination/
│   │   │       ├── row/
│   │   │       ├── sections/
│   │   │       ├── sidebar/
│   │   │       ├── typography/
│   │   │       ├── video/
│   │   │       └── index.ts
│   │   ├── hook/              # Hooks personalizados
│   │   ├── layouts/           # Layouts de página
│   │   ├── lib/               # Utilidades
│   │   ├── pages/             # Páginas Inertia
│   │   └── store/             # Estado global (Zustand)
│   └── css/
│       └── app.css            # Estilos globales + Tailwind
├── routes/
│   └── web.php                # Rutas Laravel
└── COMPONENTS_GUIDE.md        # Guía de componentes
```

## 🎨 Sistema de Diseño

### Colores de Marca
```css
/* Azul Corporativo (CB) */
--color-cb-default: #02509D
--color-cb-50 → --color-cb-950

/* Rojo Corporativo (CR) */
--color-cr-default: #E20613
--color-cr-50 → --color-cr-950
```

### Tipografía
- **Fuente Principal**: Gotham
- **Variantes**: Light (300), Book (400), Bold (700)
- **Condensed**: GothamCondensed Bold

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px
- `laptop`: 1366px (custom)

## 🔧 Tecnologías

### Frontend
- **React 18** - UI Library
- **Inertia.js** - SPA sin API
- **Tailwind CSS** - Utility-first CSS
- **Framer Motion** - Animaciones
- **Zustand** - Estado global
- **TypeScript** - Type safety

### Backend
- **Laravel 11** - Framework PHP
- **Inertia.js** - Server-side adapter

### Herramientas
- **Vite** - Build tool
- **ESLint** - Linting
- **Prettier** - Code formatting

## 📚 Documentación

- [MIGRATION_PROGRESS.md](./MIGRATION_PROGRESS.md) - Estado detallado de migración
- [COMPONENTS_GUIDE.md](./COMPONENTS_GUIDE.md) - Guía completa de componentes
- Este archivo - Resumen ejecutivo

## 🎯 Componentes Clave Migrados

### Navegación
- ✅ Menu principal responsive
- ✅ ContactTopBar con redes sociales
- ✅ Sidebar deslizable
- ✅ Footer con enlaces

### Layout
- ✅ Hero con slides automáticos
- ✅ Carousel de imágenes
- ✅ Banners (con fondo, scrolling)
- ✅ Grid system (12 columnas)
- ✅ Row system (flexbox)

### Cards
- ✅ CustomCard - Card básico
- ✅ CustomBlogCard - Blog posts
- ✅ CustomCardImage - Con imagen y share
- ✅ FeatureCard - Features simples
- ✅ RoundedImageCard - Perfiles
- ✅ ComunicadoCard - Comunicados

### Multimedia
- ✅ LiteYouTube - YouTube optimizado
- ✅ VideoThumbnail - Thumbnails personalizados
- ✅ ImageGallery - Galería con modal

### Utilidades
- ✅ Pagination - Paginación numérica
- ✅ LoadingSpinner - Estados de carga
- ✅ Loader - Loader con texto
- ✅ Line - Líneas decorativas
- ✅ Divider - Divisores con círculo

## 🔄 Cambios Principales de Next.js a Laravel

### Navegación
```tsx
// Next.js
import Link from 'next/link';
import { useRouter } from 'next/navigation';

// Laravel + Inertia
import { Link, router } from '@inertiajs/react';
```

### Imágenes
```tsx
// Next.js
import Image from 'next/image';
<Image src="/img.jpg" alt="..." fill />

// Laravel
<img src="/img.jpg" alt="..." className="w-full h-full object-cover" />
```

### Rutas
```tsx
// Next.js
href="/about"

// Laravel (con idioma)
href="/es/about"  // o /qu/about
```

### Hooks
```tsx
// Next.js
import { usePathname } from 'next/navigation';
const pathname = usePathname();

// Laravel + Inertia
import { usePage } from '@inertiajs/react';
const { url: pathname } = usePage();
```

## 🐛 Problemas Resueltos

1. ✅ Menu no respetaba contenedor → Ajustado con max-w y márgenes
2. ✅ Botón fundador no redirigía → Cambiado a `<a>` con target="_blank"
3. ✅ Rutas sin prefijo de idioma → Agregado currentLanguage
4. ✅ Modales en navegación → Corregido con rutas completas

## 📝 Próximos Pasos

### Fase 4 (Completar 60% restante)
- [ ] NewsLoader component
- [ ] PressCarousel component
- [ ] History components
- [ ] Ejes components
- [ ] Documents components

### Fase 5 (Componentes Interactivos)
- [ ] Modal components
- [ ] Popup components
- [ ] QR components
- [ ] Statistics components
- [ ] Social components

### Fase 6 (Admin)
- [ ] Admin guards
- [ ] Press article forms
- [ ] Subscription manager
- [ ] Ad management

## 🤝 Contribución

### Agregar Nuevo Componente

1. Crear archivo en `resources/js/components/ui/[categoria]/`
2. Exportar en `index.ts` de la categoría
3. Agregar a `resources/js/components/ui/index.ts`
4. Documentar en `COMPONENTS_GUIDE.md`
5. Actualizar `MIGRATION_PROGRESS.md`

### Ejemplo
```tsx
// resources/js/components/ui/button/MyButton.tsx
export const MyButton = ({ text, onClick }) => (
  <button onClick={onClick}>{text}</button>
);

// resources/js/components/ui/button/index.ts
export { MyButton } from './MyButton';

// resources/js/components/ui/index.ts
export * from './button';
```

## 📞 Soporte

Para preguntas sobre la migración:
1. Revisar [COMPONENTS_GUIDE.md](./COMPONENTS_GUIDE.md)
2. Revisar [MIGRATION_PROGRESS.md](./MIGRATION_PROGRESS.md)
3. Consultar documentación de [Inertia.js](https://inertiajs.com/)

## 📄 Licencia

Este proyecto mantiene la misma licencia que el proyecto original.

---

**Última actualización**: Fase 4 en progreso (40%)  
**Progreso total**: 50% completado  
**Componentes**: 56+ migrados
