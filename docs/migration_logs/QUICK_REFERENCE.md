# 🚀 Referencia Rápida - Laravel + React (Inertia.js)

## 📋 Comandos Esenciales

### Desarrollo
```bash
# Instalar dependencias
npm install
composer install

# Compilar assets (desarrollo)
npm run dev

# Compilar assets (producción)
npm run build

# Limpiar cache de Laravel
php artisan optimize:clear

# Iniciar servidor
php artisan serve
```

### Base de Datos
```bash
# Ejecutar migraciones
php artisan migrate

# Rollback migraciones
php artisan migrate:rollback

# Refrescar base de datos
php artisan migrate:fresh

# Seed de datos
php artisan db:seed
```

---

## 🎨 Imports Más Comunes

### Componentes UI
```tsx
// Layout
import { Container, ContainerTodo, Grid, GridItem, Row } from '@/components/ui';

// Cards
import { 
  CustomCard, 
  CustomCardImage, 
  ComunicadoCard,
  RoundedImageCard 
} from '@/components/ui/card';

// Navegación
import { Menu, ContactTopBar, Sidebar, Footer } from '@/components/ui';

// Buttons
import { 
  ArrowButton, 
  BorderButton, 
  LoadingButton 
} from '@/components/ui/button';

// Typography
import { Title, Line, Divider } from '@/components/ui';

// Loading
import { Loader, LoadingSpinner } from '@/components/ui/loading';

// Video
import { LiteYouTube, VideoThumbnail } from '@/components/ui/video';

// Sections
import { Hero, Carousel, BannerWithBackground } from '@/components/ui';
```

### Galería
```tsx
import { ImageGallery, CategoryFilter } from '@/components/gallery';
```

### Inertia & React
```tsx
import { Link, router, usePage } from '@inertiajs/react';
import { useState, useEffect } from 'react';
```

### Hooks Personalizados
```tsx
import { useTheme } from '@/hook/useTheme';
import { useLanguage } from '@/hook/useLanguage';
```

---

## 🎯 Snippets de Código

### Página Básica
```tsx
import { Container, Title } from '@/components/ui';

export default function MyPage({ data }) {
  return (
    <Container>
      <Title title="Mi Página" fontSize="4xl" />
      {/* Contenido */}
    </Container>
  );
}
```

### Grid Responsive
```tsx
<Grid>
  <GridItem colSpan={12} className="mb-8">
    <Title title="Título" />
  </GridItem>
  <GridItem colSpan={4}>Columna 1</GridItem>
  <GridItem colSpan={4}>Columna 2</GridItem>
  <GridItem colSpan={4}>Columna 3</GridItem>
</Grid>
```

### Card con Loading
```tsx
import { CustomCardImage, CustomCardImageSkeleton } from '@/components/ui/card';

{isLoading ? (
  <CustomCardImageSkeleton />
) : (
  <CustomCardImage
    src={article.image}
    centerText={article.title}
    date={article.date}
    bottomText={article.summary}
    href={`/prensa/${article.slug}`}
  />
)}
```

### Navegación con Idioma
```tsx
import { useLanguage } from '@/hook/useLanguage';

const { currentLanguage } = useLanguage();
const href = `/${currentLanguage}/ruta`;
```

### Tema Oscuro
```tsx
import { useTheme } from '@/hook/useTheme';

const { theme, setTheme, systemTheme } = useTheme();
const currentTheme = theme === 'system' ? systemTheme : theme;

// Cambiar tema
<button onClick={() => setTheme('dark')}>Dark Mode</button>
```

---

## 🎨 Clases Tailwind Comunes

### Colores de Marca
```tsx
// Azul corporativo
className="bg-cb-default text-white"
className="text-cb-600 hover:text-cb-700"
className="border-cb-500"

// Rojo corporativo
className="bg-cr-600 text-white"
className="text-cr-default hover:text-cr-700"

// Modo oscuro
className="bg-white dark:bg-cb-full"
className="text-black dark:text-white"
```

### Layout
```tsx
// Container
className="container mx-auto px-4"

// Grid
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"

// Flex
className="flex items-center justify-between"
className="flex flex-col md:flex-row gap-4"
```

### Responsive
```tsx
// Ocultar/Mostrar
className="hidden lg:block"
className="block lg:hidden"

// Tamaños
className="text-sm md:text-base lg:text-lg"
className="w-full md:w-1/2 lg:w-1/3"
```

### Animaciones
```tsx
// Hover
className="hover:scale-105 transition-transform duration-300"
className="hover:shadow-lg transition-shadow"

// Transiciones
className="transition-all duration-300 ease-in-out"
```

---

## 🐛 Troubleshooting

### Problema: Assets no se cargan
```bash
# Solución 1: Limpiar cache
npm run build
php artisan optimize:clear

# Solución 2: Verificar Vite
npm run dev
# Verificar que Vite esté corriendo en http://localhost:5173
```

### Problema: Rutas 404
```bash
# Verificar rutas en web.php
php artisan route:list

# Limpiar cache de rutas
php artisan route:clear
php artisan config:clear
```

### Problema: Componente no se encuentra
```tsx
// ❌ Mal
import Button from '@/components/ui/button/Button';

// ✅ Bien
import { Button } from '@/components/ui';
```

### Problema: Estilos no se aplican
```bash
# Recompilar Tailwind
npm run build

# Verificar que la clase existe en Tailwind
# Revisar tailwind.config.js
```

### Problema: Dark mode no funciona
```tsx
// Verificar que el HTML tenga la clase dark
<html class="dark">

// Usar el hook useTheme
const { theme } = useTheme();
```

### Problema: Imágenes no cargan
```tsx
// Verificar ruta (debe ser relativa a public/)
<img src="/imgs/photo.jpg" alt="..." />

// NO usar /public/imgs/photo.jpg
```

---

## 📝 Checklist de Nuevo Componente

- [ ] Crear archivo en carpeta apropiada
- [ ] Exportar en index.ts de la carpeta
- [ ] Agregar a ui/index.ts principal
- [ ] Incluir TypeScript types
- [ ] Agregar variantes dark mode
- [ ] Hacer responsive (mobile-first)
- [ ] Agregar skeleton si aplica
- [ ] Documentar en COMPONENTS_GUIDE.md
- [ ] Actualizar MIGRATION_PROGRESS.md
- [ ] Probar en diferentes tamaños
- [ ] Probar en modo oscuro

---

## 🔍 Debugging

### Ver props de Inertia
```tsx
import { usePage } from '@inertiajs/react';

const { props } = usePage();
console.log('Props:', props);
```

### Ver ruta actual
```tsx
import { usePage } from '@inertiajs/react';

const { url } = usePage();
console.log('Current URL:', url);
```

### Ver errores de validación
```tsx
const { errors } = usePage().props;
console.log('Validation errors:', errors);
```

---

## 🎯 Patrones Comunes

### Formulario con Loading
```tsx
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  
  router.post('/ruta', data, {
    onFinish: () => setIsSubmitting(false)
  });
};

return (
  <form onSubmit={handleSubmit}>
    <LoadingButton loading={isSubmitting}>
      Enviar
    </LoadingButton>
  </form>
);
```

### Lista con Paginación
```tsx
export default function ListPage({ items, pagination }) {
  return (
    <Container>
      <Grid>
        {items.map(item => (
          <GridItem key={item.id} colSpan={4}>
            <CustomCardImage {...item} />
          </GridItem>
        ))}
      </Grid>
      
      <Pagination
        totalPages={pagination.last_page}
        currentPage={pagination.current_page}
      />
    </Container>
  );
}
```

### Modal Simple
```tsx
const [isOpen, setIsOpen] = useState(false);

return (
  <>
    <button onClick={() => setIsOpen(true)}>Abrir</button>
    
    {isOpen && (
      <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg max-w-md">
          <h2>Modal</h2>
          <button onClick={() => setIsOpen(false)}>Cerrar</button>
        </div>
      </div>
    )}
  </>
);
```

---

## 📚 Recursos Útiles

### Documentación
- [Inertia.js](https://inertiajs.com/)
- [Laravel](https://laravel.com/docs)
- [React](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Framer Motion](https://www.framer.com/motion/)

### Iconos
- [Lucide Icons](https://lucide.dev/)
- [React Icons](https://react-icons.github.io/react-icons/)

### Herramientas
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [ES7+ React Snippets](https://marketplace.visualstudio.com/items?itemName=dsznajder.es7-react-js-snippets)

---

## 🎨 Paleta de Colores Rápida

```tsx
// Azul (CB)
bg-cb-50   #f3f6fc  // Muy claro
bg-cb-100  #e6ecf8
bg-cb-200  #c7d7f0
bg-cb-300  #95b5e4
bg-cb-400  #5c8ed4
bg-cb-500  #376fc0
bg-cb-600  #2756a1  // Principal
bg-cb-700  #214583
bg-cb-800  #1f3d6d
bg-cb-900  #1f355b
bg-cb-950  #14223d  // Muy oscuro
bg-cb-full #061744  // Negro azulado

// Rojo (CR)
bg-cr-50   #fef2f3  // Muy claro
bg-cr-100  #ffe1e3
bg-cr-200  #ffc8cb
bg-cr-300  #ffa2a7
bg-cr-400  #fc6d75
bg-cr-500  #f43f49
bg-cr-600  #e32b35  // Principal
bg-cr-700  #be1720
bg-cr-800  #9d171e
bg-cr-900  #821a20
bg-cr-950  #47080b  // Muy oscuro
```

---

## ⚡ Tips de Performance

### Lazy Loading de Imágenes
```tsx
<img src="/imgs/photo.jpg" alt="..." loading="lazy" />
```

### Code Splitting
```tsx
// Inertia hace code splitting automático por página
// No necesitas React.lazy() para páginas
```

### Optimizar Bundle
```bash
# Analizar bundle size
npm run build -- --analyze

# Verificar tamaño
ls -lh public/build/assets/
```

---

## 🔐 Seguridad

### CSRF Token
```tsx
// Inertia maneja CSRF automáticamente
// No necesitas agregar tokens manualmente
```

### XSS Protection
```tsx
// ✅ React escapa HTML automáticamente
<div>{userInput}</div>

// ⚠️ Solo usa dangerouslySetInnerHTML si es necesario
<div dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
```

---

**Última actualización**: Diciembre 2024  
**Versión**: 1.0  
**Mantenido por**: Equipo de Desarrollo
