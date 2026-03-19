/**
 * EJEMPLO DE USO: Optimización de Imágenes
 * 
 * Este archivo muestra cómo usar la utilidad de optimización de imágenes
 * en diferentes escenarios.
 */

import { optimizeImage, optimizeImages, getOptimizationInfo } from './image-optimizer';
import { toast } from 'sonner';

// ============================================
// EJEMPLO 1: Optimización Simple
// ============================================
export async function simpleOptimization(file: File) {
    try {
        const optimizedFile = await optimizeImage(file);
        console.log('Imagen optimizada:', optimizedFile);
        return optimizedFile;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// ============================================
// EJEMPLO 2: Optimización con Configuración Personalizada
// ============================================
export async function customOptimization(file: File) {
    try {
        const optimizedFile = await optimizeImage(file, {
            maxSizeMB: 0.5,           // Máximo 500KB
            maxWidthOrHeight: 1280,   // Máximo 1280px
            initialQuality: 0.9,      // 90% de calidad
        });

        return optimizedFile;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// ============================================
// EJEMPLO 3: Optimización con Feedback al Usuario
// ============================================
export async function optimizationWithFeedback(file: File) {
    const loadingToast = toast.loading('Optimizando imagen...');

    try {
        const optimizedFile = await optimizeImage(file);
        const info = getOptimizationInfo(file, optimizedFile);

        toast.success(
            `Optimizada: ${info.originalSize}MB → ${info.optimizedSize}MB (${info.reduction}% reducción)`,
            { id: loadingToast }
        );

        return optimizedFile;
    } catch (error) {
        toast.error('Error al optimizar la imagen', { id: loadingToast });
        throw error;
    }
}

// ============================================
// EJEMPLO 4: Optimización de Múltiples Imágenes
// ============================================
export async function multipleImagesOptimization(files: File[]) {
    try {
        const optimizedFiles = await optimizeImages(files, {
            maxSizeMB: 0.8,
            maxWidthOrHeight: 1600,
        });

        console.log(`${optimizedFiles.length} imágenes optimizadas`);
        return optimizedFiles;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}

// ============================================
// EJEMPLO 5: Optimización en un Input de Archivo
// ============================================
export function ImageUploadWithOptimization() {
    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        // Validar tamaño antes de optimizar
        if (file.size > 10 * 1024 * 1024) {
            toast.error('Imagen muy grande (máx. 10MB)');
            return;
        }

        try {
            const loadingToast = toast.loading('Optimizando...');

            const optimizedFile = await optimizeImage(file);
            const info = getOptimizationInfo(file, optimizedFile);

            toast.success(
                `Reducción del ${info.reduction}%`,
                { id: loadingToast }
            );

            // Usar el archivo optimizado
            console.log('Archivo listo para subir:', optimizedFile);

        } catch (error) {
            toast.error('Error al optimizar');
            console.error(error);
        }
    };

    return (
        <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
        />
    );
}

// ============================================
// EJEMPLO 6: Optimización con Fallback
// ============================================
export async function optimizationWithFallback(file: File) {
    try {
        const optimizedFile = await optimizeImage(file);
        return optimizedFile;
    } catch (error) {
        console.warn('Optimización falló, usando original:', error);
        toast.warning('No se pudo optimizar, usando imagen original');
        return file; // Usar el archivo original si falla
    }
}

// ============================================
// EJEMPLO 7: Optimización para Diferentes Casos de Uso
// ============================================

// Para avatares/perfiles (pequeños y circulares)
export async function optimizeAvatar(file: File) {
    return optimizeImage(file, {
        maxSizeMB: 0.2,
        maxWidthOrHeight: 400,
        initialQuality: 0.85,
    });
}

// Para banners/headers (anchos y grandes)
export async function optimizeBanner(file: File) {
    return optimizeImage(file, {
        maxSizeMB: 1.5,
        maxWidthOrHeight: 2400,
        initialQuality: 0.9,
    });
}

// Para galerías (balance entre calidad y tamaño)
export async function optimizeGalleryImage(file: File) {
    return optimizeImage(file, {
        maxSizeMB: 0.8,
        maxWidthOrHeight: 1600,
        initialQuality: 0.85,
    });
}

// Para thumbnails (muy pequeños)
export async function optimizeThumbnail(file: File) {
    return optimizeImage(file, {
        maxSizeMB: 0.1,
        maxWidthOrHeight: 300,
        initialQuality: 0.8,
    });
}

// ============================================
// EJEMPLO 8: Mostrar Información de Optimización
// ============================================
export async function showOptimizationDetails(file: File) {
    const optimizedFile = await optimizeImage(file);
    const info = getOptimizationInfo(file, optimizedFile);

    console.log('=== Detalles de Optimización ===');
    console.log(`Formato original: ${info.originalFormat}`);
    console.log(`Formato optimizado: ${info.optimizedFormat}`);
    console.log(`Tamaño original: ${info.originalSize} MB`);
    console.log(`Tamaño optimizado: ${info.optimizedSize} MB`);
    console.log(`Reducción: ${info.reduction}%`);
    console.log('================================');

    return { optimizedFile, info };
}
