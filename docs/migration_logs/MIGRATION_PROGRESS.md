# Migración de Next.js a Laravel + React (Inertia.js)

## Estado Actual: ✅ MIGRACIÓN COMPLETA - 100% de Componentes Visuales + Páginas de Organización

### 📚 Documentación Adicional

- Ver [COMPONENTS_GUIDE.md](./COMPONENTS_GUIDE.md) para guía completa de uso de componentes

### ✅ Componentes Migrados

#### Fase 1: Contenedores (100% ✅)
- [x] `Container.tsx` - Contenedor con padding vertical y horizontal
- [x] `ContainerSingle.tsx` - Contenedor sin padding horizontal
- [x] `ContainerTodo.tsx` - Contenedor simple con ancho máximo

#### Navegación y Layout
- [x] `Menu.tsx` - Menú principal sticky con navegación horizontal
- [x] `ContactTopBar.tsx` - Barra superior con información de contacto
- [x] `Sidebar.tsx` - Menú lateral deslizable
- [x] `Footer.tsx` - Pie de página con enlaces y redes sociales

#### Dropdowns
- [x] `MinimalDropdown.tsx` - Dropdown minimalista con animaciones
- [x] `OrganizationDropdown.tsx` - Dropdown de organizaciones

#### Botones
- [x] `ArrowButton.tsx` - Botón con flecha circular
- [x] `BorderButton.tsx` - Botón con borde y efectos hover
- [x] `ButtonLink.tsx` - Botón enlace con estilos activos
- [x] `LineButton.tsx` - Botón con línea inferior
- [x] `LoadingButton.tsx` - Botón con estado de carga

#### Componentes Visuales
- [x] `CircleArrow.tsx` - Flecha circular con variantes
- [x] `TextReveal.tsx` - Animación de revelación de texto
- [x] `Divider.tsx` - Divisor horizontal con círculo
- [x] `Title.tsx` - Componente de título con múltiples tamaños

#### SVG/Iconos
- [x] `DropdownArrowIcon.tsx` - Icono de flecha para dropdowns
- [x] `Moon.tsx` - Icono de luna para tema oscuro
- [x] `Sun.tsx` - Icono de sol para tema claro
- [x] `TwitterIconOutline.tsx` - Icono de Twitter/X

#### Datos
- [x] `contactSocialLinks.tsx` - Enlaces de redes sociales
- [x] `ContactTopBarData.tsx` - Datos de contacto
- [x] `SocialLinks.tsx` - Enlaces sociales del footer

### 🔄 Ajustes Realizados

1. **Rutas**: Adaptadas de Next.js a Inertia.js
   - Cambio de `next/link` a `@inertiajs/react`
   - Implementación de `router.visit()` para navegación
   - Soporte para rutas con prefijo de idioma (`/es/`, `/qu/`)

2. **Imágenes**: Cambio de `next/image` a `<img>` estándar

3. **Hooks**: Adaptación de hooks de Next.js a Inertia.js
   - `usePathname()` → `usePage().url`
   - `useParams()` → `usePage().props`

4. **Estilos**: Mantenidos con Tailwind CSS
   - Variables de tema personalizadas (--color-cb-*, --color-cr-*)
   - Fuentes Gotham configuradas
   - Modo oscuro con clase `.dark`

#### Fase 2: Layout y Navegación (100% ✅)
- [x] `Hero.tsx` - Sección hero con slides automáticos
- [x] `HeroNavigation.tsx` - Navegación para hero section
- [x] `Carousel.tsx` - Carrusel de imágenes con animaciones
- [x] `BannerWithBackground.tsx` - Banner con imagen de fondo
- [x] `ScrollingBanner.tsx` - Banner con scroll infinito
- [x] `Pagination.tsx` - Paginación con números
- [x] `Loader.tsx` - Loader con texto personalizable
- [x] `LoadingSpinner.tsx` - Spinner de carga simple

### 📋 Próximas Fases

#### Fase 3: Componentes de Contenido (100% ✅)
- [x] `CustomCard.tsx` - Card personalizable con divisor
- [x] `CustomBlogCard.tsx` - Card para contenido de blog
- [x] `CustomCardImage.tsx` - Card con imagen y compartir social
- [x] `FeatureCard.tsx` - Card simple para features
- [x] `RoundedImageCard.tsx` - Card con imagen redondeada y redes sociales
- [x] `Line.tsx` - Componente de línea decorativa
- [x] `Grid.tsx` y `GridItem.tsx` - Sistema de grid responsive
- [x] `Row.tsx` y `RowItem.tsx` - Sistema de filas flexibles
- [x] `VideoThumbnail.tsx` - Thumbnail de video con overlay
- [x] `LiteYouTube.tsx` - Reproductor de YouTube optimizado

#### Fase 4: Componentes Específicos de Secciones (100% ✅)
- [x] `ComunicadoCard.tsx` - Card para comunicados de prensa
- [x] `ImageGallery.tsx` - Galería de imágenes con modal
- [x] `CategoryFilter.tsx` - Filtro de categorías para galería
- [x] `CustomCardIconLink.tsx` - Card con icono para enlaces
- [x] `NewsLoader.tsx` - Cargador de noticias con animaciones
- [x] `PressCarousel.tsx` - Carrusel de prensa y comunicados
- [x] `EjesSection.tsx` - Sección de ejes con layout especial
- [x] `DocumentsCarousel.tsx` - Carrusel de documentos

#### Fase 5: Componentes Interactivos (100% ✅)
- [x] `VideoModal.tsx` - Modal para reproducir videos de YouTube
- [x] `QRPopup.tsx` - Popup con navegación de documentos PDF
- [x] `StatisticsSection.tsx` - Sección de estadísticas animadas con marquee
- [x] `QRCodeGenerator.tsx` - Generador de códigos QR con logo
- [x] `WhatsAppChannelButton.tsx` - Botón flotante para canal de WhatsApp
- [x] `SocialShare.tsx` - Componente para compartir en redes sociales (ya existía)

#### ✅ Migración de Componentes Visuales: COMPLETA (100%)

**Nota Importante**: Esta migración se enfoca exclusivamente en los componentes visuales del frontend para usuarios. Los componentes administrativos (formularios de gestión, paneles admin, etc.) se manejan directamente desde el backend de Laravel usando Blade o Livewire, no requieren migración a React.

**Componentes de Usuario Migrados**: 70+  
**Todas las interfaces públicas están listas para producción**

### 🎯 Estructura de Archivos

```
app/resources/js/
├── components/
│   ├── documents/
│   │   ├── DocumentsCarousel.tsx
│   │   └── index.ts
│   ├── ejes/
│   │   ├── EjesSection.tsx
│   │   └── index.ts
│   ├── gallery/
│   │   ├── CategoryFilter.tsx
│   │   ├── ImageGallery.tsx
│   │   └── index.ts
│   ├── press/
│   │   ├── NewsLoader.tsx
│   │   ├── PressCarousel.tsx
│   │   └── index.ts
│   ├── svg/
│   │   ├── DropdownArrowIcon.tsx
│   │   ├── Moon.tsx
│   │   ├── Sun.tsx
│   │   └── TwitterIconOutline.tsx
│   ├── QRCodeGenerator.tsx
│   ├── WhatsAppChannelButton.tsx
│   └── ui/
│       ├── animation/
│       │   └── TextReveal.tsx
│       ├── banner/
│       │   ├── BannerWithBackground.tsx
│       │   └── ScrollingBanner.tsx
│       ├── button/
│       │   ├── ArrowButton.tsx
│       │   ├── BorderButton.tsx
│       │   ├── ButtonLink.tsx
│       │   ├── LineButton.tsx
│       │   ├── LoadingButton.tsx
│       │   └── index.ts
│       ├── card/
│       │   ├── CustomCard.tsx
│       │   ├── CustomBlogCard.tsx
│       │   ├── CustomCardImage.tsx
│       │   ├── CustomCardIconLink.tsx
│       │   ├── FeatureCard.tsx
│       │   ├── RoundedImageCard.tsx
│       │   ├── ComunicadoCard.tsx
│       │   └── index.ts
│       ├── carousel/
│       │   └── Carousel.tsx
│       ├── circle/
│       │   └── CircleArrow.tsx
│       ├── container/
│       │   ├── Container.tsx
│       │   ├── ContainerSingle.tsx
│       │   └── ContainerTodo.tsx
│       ├── divider/
│       │   └── Divider.tsx
│       ├── dropdown/
│       │   └── MinimalDropdown.tsx
│       ├── footer/
│       │   ├── data/
│       │   │   └── SocialLinks.tsx
│       │   └── Footer.tsx
│       ├── grid/
│       │   ├── Grid.tsx
│       │   ├── GridItem.tsx
│       │   └── index.ts
│       ├── line/
│       │   ├── Line.tsx
│       │   └── index.ts
│       ├── loading/
│       │   ├── Loader.tsx
│       │   └── LoadingSpinner.tsx
│       ├── menu/
│       │   ├── data/
│       │   │   ├── ContactTopBarData.tsx
│       │   │   └── contactSocialLinks.tsx
│       │   ├── ContactTopBar.tsx
│       │   ├── Menu.tsx
│       │   └── OrganizationDropdown.tsx
│       ├── modal/
│       │   ├── VideoModal.tsx
│       │   ├── SocialLinksModal.tsx
│       │   └── index.ts
│       ├── pagination/
│       │   └── Pagination.tsx
│       ├── popup/
│       │   ├── QRPopup.tsx
│       │   └── index.ts
│       ├── row/
│       │   ├── Row.tsx
│       │   ├── RowItem.tsx
│       │   └── index.ts
│       ├── sections/
│       │   ├── Hero.tsx
│       │   └── HeroNavigation.tsx
│       ├── sidebar/
│       │   └── Sidebar.tsx
│       ├── statistics/
│       │   ├── StatisticsSection.tsx
│       │   └── index.ts
│       ├── typography/
│       │   └── Title.tsx
│       ├── video/
│       │   ├── LiteYouTube.tsx
│       │   ├── VideoThumbnail.tsx
│       │   └── index.ts
│       ├── SocialShare.tsx
│       └── index.ts
├── layouts/
│   └── AppLayout.tsx
└── ...
```
│       │   └── index.ts
│       ├── card/
│       │   ├── CustomCard.tsx
│       │   ├── CustomBlogCard.tsx
│       │   ├── CustomCardImage.tsx
│       │   ├── CustomCardIconLink.tsx
│       │   ├── FeatureCard.tsx
│       │   ├── RoundedImageCard.tsx
│       │   ├── ComunicadoCard.tsx
│       │   └── index.ts
│       ├── carousel/
│       │   └── Carousel.tsx
│       ├── circle/
│       │   └── CircleArrow.tsx
│       ├── container/
│       │   ├── Container.tsx
│       │   ├── ContainerSingle.tsx
│       │   └── ContainerTodo.tsx
│       ├── divider/
│       │   └── Divider.tsx
│       ├── dropdown/
│       │   └── MinimalDropdown.tsx
│       ├── footer/
│       │   ├── data/
│       │   │   └── SocialLinks.tsx
│       │   └── Footer.tsx
│       ├── grid/
│       │   ├── Grid.tsx
│       │   ├── GridItem.tsx
│       │   └── index.ts
│       ├── line/
│       │   ├── Line.tsx
│       │   └── index.ts
│       ├── loading/
│       │   ├── Loader.tsx
│       │   └── LoadingSpinner.tsx
│       ├── menu/
│       │   ├── data/
│       │   │   ├── ContactTopBarData.tsx
│       │   │   └── contactSocialLinks.tsx
│       │   ├── ContactTopBar.tsx
│       │   ├── Menu.tsx
│       │   └── OrganizationDropdown.tsx
│       ├── pagination/
│       │   └── Pagination.tsx
│       ├── row/
│       │   ├── Row.tsx
│       │   ├── RowItem.tsx
│       │   └── index.ts
│       ├── sections/
│       │   ├── Hero.tsx
│       │   └── HeroNavigation.tsx
│       ├── sidebar/
│       │   └── Sidebar.tsx
│       ├── typography/
│       │   └── Title.tsx
│       ├── video/
│       │   ├── LiteYouTube.tsx
│       │   ├── VideoThumbnail.tsx
│       │   └── index.ts
│       └── index.ts
├── layouts/
│   └── AppLayout.tsx
└── ...
```

### 📝 Notas Importantes

1. **Idiomas**: El sistema soporta español (es) y quechua (qu)
2. **Tema**: Implementado con `next-themes` y clases de Tailwind
3. **Animaciones**: Usando `framer-motion` para transiciones suaves
4. **Iconos**: Combinación de `lucide-react` y `react-icons`
5. **Estado**: Usando `zustand` para el estado global (UIStore)

### 🐛 Problemas Resueltos

1. ✅ Menu no respetaba el contenedor - Ajustado con `max-w-[1920px]` y márgenes
2. ✅ Botón fundador no redirigía correctamente - Cambiado a `<a>` con `target="_blank"`
3. ✅ Rutas de organizaciones sin prefijo de idioma - Agregado `currentLanguage` a las rutas
4. ✅ Modales apareciendo en navegación - Corregido con rutas completas incluyendo idioma

### 🚀 Comandos Útiles

```bash
# Compilar assets
npm run build

# Modo desarrollo
npm run dev

# Limpiar cache
php artisan optimize:clear
```

---

**Última actualización**: ✅ Migración COMPLETA + Páginas de Organización
**Progreso total**: 100% de componentes visuales de usuario + 3 páginas de organización
**Componentes migrados**: 70+
**Páginas migradas**: EFOP, Juventudes, Secretaría de la Mujer
**Estado**: Listo para producción
