#!/bin/bash

# ==============================================
# Script para actualizar proyecto Laravel desde Git
# y aplicar permisos/caches necesarios
# ==============================================

set -e  # Salir si algun comando falla

PROJECT_DIR="$(pwd)"
echo "Actualizando proyecto en: $PROJECT_DIR"
echo "Fecha/hora: $(date '+%Y-%m-%d %H:%M:%S')"
echo "----------------------------------------"

# 1. Verificar que estamos en un repositorio git
if [ ! -d ".git" ]; then
    echo "ERROR: No se encontro carpeta .git en $PROJECT_DIR"
    echo "Asegurate de estar en la raiz del proyecto clonado."
    exit 1
fi

# 2. Pull desde el remoto (rama main o master)
echo "Haciendo git pull..."
git pull origin sandbox

# Si usas otra rama, cmbialo aqu:
# git pull origin tu-rama

echo "----------------------------------------"

# 3. Actualizar dependencias PHP (si hay cambios en composer.json/lock)
echo "Actualizando dependencias Composer..."
composer install --no-dev --optimize-autoloader --prefer-dist

echo "----------------------------------------"

# 4. Permisos estandar Laravel (muy importante en shared hosting)
echo "Aplicando permisos correctos..."

find . -type f -exec chmod 644 {} \;
find . -type d -exec chmod 755 {} \;

chmod -R 775 storage
chmod -R 775 bootstrap/cache

# Si usas storage:link y existe la carpeta
if [ -d "public/storage" ]; then
    chmod -R 775 public/storage
fi

echo "Permisos aplicados."
echo "----------------------------------------"

# 5. Limpiar y regenerar caches (evita errores extraos despus de pull)
echo "Limpiando y regenerando caches de Laravel..."

php artisan config:clear
php artisan cache:clear
php artisan route:clear
php artisan view:clear
php artisan event:clear     # si usas events
php artisan optimize:clear

# Regenerar cachs (opcional, pero recomendado en produccion)
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "Caches actualizados."
echo "----------------------------------------"

# 6. Storage link (por si acaso se perdio)
echo "Creando symlink storage si es necesario..."
php artisan storage:link || echo "Symlink ya existe o no se pudo crear (revisa manualmente)"

echo "----------------------------------------"
echo "Actualizacion finalizada!"
echo "Revisa tu sitio. Si hay errores 500, mira storage/logs/laravel.log"