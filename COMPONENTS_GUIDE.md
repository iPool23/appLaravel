# Guía de Componentes Migrados - Laravel + React (Inertia.js)

## 📚 Índice de Componentes

### 🎨 UI Components

#### Buttons
```tsx
import { 
  ArrowButton, 
  BorderButton, 
  ButtonLink, 
  LineButton, 
  LoadingButton 
} from '@/components/ui/button';

// Ejemplo de uso
<ArrowButton text="Ver más" href="/historia" variant="black" />
<BorderButton text="Contactar" onClick={handleClick} />
<LoadingButton loading={isSubmitting}>Enviar</LoadingButton>
```

#### Cards
```tsx
import { 
  CustomCard,
  CustomBlogCard,
  CustomCardImage,
  FeatureCard,
  RoundedImageCard,
  ComunicadoCard
} from '@/components/ui/card';

// Card con imagen y compartir
<CustomCardImage
  src="/imgs/noticia.jpg"
  centerText="Título de la noticia"
  date="15 de marzo 2024"
  bottomText="Descripción breve..."
  href="/prensa/slug"
/>

// Card de comunicado
<ComunicadoCard
  src="/imgs/comunicado.jpg"
  bottomText="Texto del comunicado..."
  date="15 de marzo 2024"
  href="/prensa/comunicado-slug"
/>
```

#### Containers
```tsx
import { Container, ContainerSingle, ContainerTodo } from '@/components/ui';

// Contenedor con padding completo
<Container>
  <h1>Contenido</h1>
</Container>

// Contenedor simple (solo mx-auto)
<ContainerTodo>
  <nav>Menu items</nav>
</ContainerTodo>
```

#### Layout Components
```tsx
import { Grid, GridItem, Row, RowItem } from '@/components/ui';

// Sistema de Grid (12 columnas)
<Grid>
  <GridItem colSpan={6}>Columna 1</GridItem>
  <GridItem colSpan={6}>Columna 2</GridItem>
</Grid>

// Sistema de Row (Flexbox)
<Row gap="gap-6">
  <RowItem flex="flex-1">Item 1</RowItem>
  <RowItem flex="flex-2">Item 2</RowItem>
</Row>
```

#### Navigation
```tsx
import { Menu, ContactTopBar, Sidebar } from '@/components/ui';

// En tu layout
<ContactTopBar />
<Menu />
<Sidebar />
```

#### Hero & Banners
```tsx
import { 
  Hero, 
  Carousel, 
  BannerWithBackground, 
  ScrollingBanner 
} from '@/components/ui';

// Hero con slides
<Hero />

// Carousel de imágenes
<Carousel />

// Banner con fondo
<BannerWithBackground
  title="Bienvenidos"
  src="/imgs/background.jpg"
  titleFontSize="5xl"
/>

// Banner con scroll infinito
<ScrollingBanner text="ALIANZA PARA EL PROGRESO" />
```

#### Video Components
```tsx
import { LiteYouTube, VideoThumbnail } from '@/components/ui/video';

// YouTube optimizado
<LiteYouTube 
  videoid="dQw4w9WgXcQ"
  videotitle="Video Title"
/>

// Thumbnail personalizado
<VideoThumbnail
  videoId="dQw4w9WgXcQ"
  title="Ver Video"
  description="Descripción del video"
/>
```

#### Typography & Decorations
```tsx
import { Title, Line, Divider } from '@/components/ui';

// Título responsive
<Title
  title="Título Principal"
  fontSize="4xl"
  color="text-cb-default"
/>

// Línea decorativa
<Line 
  width={64} 
  height={4} 
  color="bg-cr-500" 
  alignment="center"
/>

// Divisor con círculo
<Divider 
  leftWidth={35} 
  showCircle={true} 
  variant="dark"
/>
```

#### Loading States
```tsx
import { Loader, LoadingSpinner } from '@/components/ui';

// Loader con texto
<Loader size="md" text="A" />

// Spinner simple
<LoadingSpinner size="lg" color="auto" />
```

#### Pagination
```tsx
import { Pagination } from '@/components/ui';

<Pagination 
  totalPages={10} 
  currentPage={currentPage}
/>
```

#### Dropdowns
```tsx
import { MinimalDropdown } from '@/components/ui';

<MinimalDropdown
  options={[
    { value: 'es', label: 'Español' },
    { value: 'qu', label: 'Quechua' }
  ]}
  value={currentLang}
  onChange={handleChange}
  icon={<IoLanguage size={22} />}
  expandable
/>
```

### 🖼️ Gallery Components

```tsx
import { ImageGallery, CategoryFilter } from '@/components/gallery';

// Galería con modal
<ImageGallery
  images={[
    { src: '/img1.jpg', alt: 'Imagen 1', title: 'Título' },
    { src: '/img2.jpg', alt: 'Imagen 2' }
  ]}
  showTitles={true}
/>

// Filtro de categorías
<CategoryFilter
  categories={['eventos', 'actividades', 'historia']}
  activeCategory={activeCategory}
  onCategoryChange={setActiveCategory}
  totalImages={images.length}
/>
```

### 🎭 Animation Components

```tsx
import { TextReveal } from '@/components/ui';

<TextReveal
  text="ALIANZA PARA EL PROGRESO"
  className="text-6xl font-bold"
  delay={0.2}
/>
```

## 🎨 Temas y Colores

### Colores Principales
```css
/* Azul (CB) */
--color-cb-default: #02509D
--color-cb-50 a --color-cb-950

/* Rojo (CR) */
--color-cr-default: #E20613
--color-cr-50 a --color-cr-950
```

### Uso en Tailwind
```tsx
// Colores de marca
className="bg-cb-default text-white"
className="bg-cr-600 hover:bg-cr-700"

// Modo oscuro
className="bg-white dark:bg-cb-full"
className="text-cb-default dark:text-white"
```

## 🔧 Hooks Personalizados

### useTheme
```tsx
import { useTheme } from '@/hook/useTheme';

const { theme, setTheme, systemTheme } = useTheme();
const currentTheme = theme === 'system' ? systemTheme : theme;

// Cambiar tema
setTheme('dark'); // 'light' | 'dark' | 'system'
```

### useLanguage
```tsx
import { useLanguage } from '@/hook/useLanguage';

const { currentLanguage, changeLanguage } = useLanguage();

// Cambiar idioma
changeLanguage('qu'); // 'es' | 'qu'
```

## 📱 Responsive Design

### Breakpoints
```tsx
// Tailwind breakpoints
sm: 640px   // sm:
md: 768px   // md:
lg: 1024px  // lg:
xl: 1280px  // xl:
2xl: 1536px // 2xl:

// Custom
laptop: 1366px
```

### Ejemplos
```tsx
// Ocultar en móvil
className="hidden lg:block"

// Tamaños responsive
className="text-sm md:text-base lg:text-lg"

// Grid responsive
className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

## 🚀 Mejores Prácticas

### 1. Importaciones
```tsx
// ✅ Bueno - Usar índices
import { Button, Card, Grid } from '@/components/ui';

// ❌ Evitar - Importaciones directas
import Button from '@/components/ui/button/Button';
```

### 2. Navegación
```tsx
// ✅ Usar Link de Inertia
import { Link } from '@inertiajs/react';
<Link href="/ruta">Enlace</Link>

// ✅ Para externos usar <a>
<a href="https://external.com" target="_blank" rel="noopener noreferrer">
  Externo
</a>
```

### 3. Imágenes
```tsx
// ✅ Usar img estándar
<img src="/imgs/photo.jpg" alt="Descripción" className="w-full" />

// ✅ Con loading lazy
<img src="/imgs/photo.jpg" alt="Descripción" loading="lazy" />
```

### 4. Estados de Carga
```tsx
// ✅ Usar skeletons incluidos
import { CustomCardImageSkeleton } from '@/components/ui/card';

{isLoading ? (
  <CustomCardImageSkeleton />
) : (
  <CustomCardImage {...props} />
)}
```

### 5. Modo Oscuro
```tsx
// ✅ Siempre incluir variante dark
className="bg-white dark:bg-cb-full text-black dark:text-white"
```

## 🎯 Ejemplos Completos

### Página de Prensa
```tsx
import { Container, CustomCardImage, Pagination } from '@/components/ui';

export default function PressPage({ articles, currentPage, totalPages }) {
  return (
    <Container>
      <h1 className="text-4xl font-bold mb-8">Prensa</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles.map(article => (
          <CustomCardImage
            key={article.id}
            src={article.image}
            centerText={article.title}
            date={article.date}
            bottomText={article.summary}
            href={`/prensa/${article.slug}`}
          />
        ))}
      </div>
      
      <Pagination 
        totalPages={totalPages} 
        currentPage={currentPage}
      />
    </Container>
  );
}
```

### Galería
```tsx
import { Container, ImageGallery, CategoryFilter } from '@/components';
import { useState } from 'react';

export default function GalleryPage({ images, categories }) {
  const [activeCategory, setActiveCategory] = useState(null);
  
  const filteredImages = activeCategory
    ? images.filter(img => img.category === activeCategory)
    : images;
  
  return (
    <Container>
      <h1 className="text-4xl font-bold mb-8">Galería</h1>
      
      <CategoryFilter
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
        totalImages={images.length}
      />
      
      <ImageGallery images={filteredImages} />
    </Container>
  );
}
```

## 📝 Notas Importantes

1. **Rutas con Idioma**: Todas las rutas internas deben incluir el prefijo de idioma (`/es/` o `/qu/`)
2. **Inertia.js**: Usar `router.visit()` para navegación programática
3. **Fuentes**: Gotham está configurada globalmente, usar `font-gotham-bold` para negrita
4. **Animaciones**: Framer Motion está disponible para animaciones complejas
5. **Icons**: Usar `lucide-react` y `react-icons` según necesidad

## 🔗 Enlaces Útiles

- [Inertia.js Docs](https://inertiajs.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)
