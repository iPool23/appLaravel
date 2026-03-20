---
name: performance-auditing
description: Realizar auditorías de rendimiento, accesibilidad y SEO usando Google Lighthouse en el proyecto.
---
# Auditoría de Rendimiento con Lighthouse

Usa esta skill para evaluar y mejorar el rendimiento técnico del sitio siguiendo las mejores prácticas de Google.

## Procedimiento de Auditoría

1. **Preparación**:
   - Asegura que el servidor de desarrollo esté activo (`php artisan serve`).
   - El puerto por defecto suele ser `http://127.0.0.1:8000`.

2. **Ejecución de la Auditoría**:
   Ejecuta el siguiente comando para generar un reporte completo en formato HTML:
   ```bash
   npx lighthouse http://127.0.0.1:8000 --output html --output-path ./storage/app/public/lighthouse-report.html --chrome-flags="--headless"
   ```

3. **Interpretación de Métricas Críticas**:
   - **LCP (Largest Contentful Paint)**: Debe ser < 2.5s. Si es alto, revisa las imágenes del hero y banners.
   - **CLS (Cumulative Layout Shift)**: Debe ser < 0.1. Asegura que las imágenes tengan `width` y `height` definidos.
   - **TBT (Total Blocking Time)**: Ideal < 200ms. Si es alto, hay demasiado JavaScript ejecutándose al inicio.

4. **Acciones de Mejora**:
   - **Imágenes**: Usa `loading="lazy"` para lo que está fuera de pantalla y `fetchPriority="high"` para el LCP.
   - **Scripts**: Diferir scripts no esenciales.
   - **Build**: Siempre prueba con `npm run build` para obtener resultados reales de producción.

## Comandos Útiles

- **Auditoría rápida (solo performance)**:
  ```bash
  npx lighthouse http://127.0.0.1:8000 --only-categories=performance --view --chrome-flags="--headless"
  ```
- **Auditoría Mobile vs Desktop**:
  ```bash
  npx lighthouse http://127.0.0.1:8000 --emulated-form-factor=mobile --chrome-flags="--headless"
  ```
