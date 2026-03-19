import imageCompression from "browser-image-compression";

export interface ImageOptimizationOptions {
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  useWebWorker?: boolean;
  fileType?: string;
  initialQuality?: number;
}

/**
 * Optimiza y convierte una imagen a formato JPEG
 * Se usa JPEG en lugar de WebP para mejor compatibilidad con Twitter/Open Graph
 * @param file - Archivo de imagen original
 * @param options - Opciones de optimización
 * @returns Archivo optimizado en formato JPEG
 */
export async function optimizeImage(
  file: File,
  options: ImageOptimizationOptions = {}
): Promise<File> {
  const {
    maxSizeMB = 1, // Máximo 1MB por defecto
    maxWidthOrHeight = 1920, // Máximo 1920px de ancho/alto
    useWebWorker = true,
    fileType = "image/jpeg", // JPEG para compatibilidad con Twitter/OG
    initialQuality = 0.85, // 85% de calidad para mantener buena calidad visual
  } = options;

  try {
    // Si ya es JPEG y es pequeño, solo comprimir si es necesario
    if (
      (file.type === "image/jpeg" || file.type === "image/jpg") &&
      file.size <= maxSizeMB * 1024 * 1024
    ) {
      return file;
    }

    // Opciones de compresión
    const compressionOptions = {
      maxSizeMB,
      maxWidthOrHeight,
      useWebWorker,
      fileType,
      initialQuality,
    };

    // Comprimir y convertir la imagen
    const compressedFile = await imageCompression(file, compressionOptions);

    // Crear un nuevo archivo con extensión .jpg
    const originalName = file.name.replace(/\.[^/.]+$/, "");
    const jpegFile = new File([compressedFile], `${originalName}.jpg`, {
      type: "image/jpeg",
      lastModified: Date.now(),
    });

    return jpegFile;
  } catch (error) {
    console.error("Error optimizando imagen:", error);
    throw new Error("No se pudo optimizar la imagen");
  }
}

/**
 * Optimiza múltiples imágenes en paralelo
 * @param files - Array de archivos de imagen
 * @param options - Opciones de optimización
 * @returns Array de archivos optimizados
 */
export async function optimizeImages(
  files: File[],
  options: ImageOptimizationOptions = {}
): Promise<File[]> {
  const promises = files.map((file) => optimizeImage(file, options));
  return Promise.all(promises);
}

/**
 * Obtiene información sobre la optimización realizada
 * @param originalFile - Archivo original
 * @param optimizedFile - Archivo optimizado
 * @returns Información de la optimización
 */
export function getOptimizationInfo(originalFile: File, optimizedFile: File) {
  const originalSizeMB = (originalFile.size / (1024 * 1024)).toFixed(2);
  const optimizedSizeMB = (optimizedFile.size / (1024 * 1024)).toFixed(2);
  const reductionPercent = (
    ((originalFile.size - optimizedFile.size) / originalFile.size) *
    100
  ).toFixed(1);

  return {
    originalSize: originalSizeMB,
    optimizedSize: optimizedSizeMB,
    reduction: reductionPercent,
    originalFormat: originalFile.type,
    optimizedFormat: optimizedFile.type,
  };
}
