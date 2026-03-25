import { useState, useMemo } from "react";
import { ImageGallery } from "@/components/gallery";
import { getAllImages } from "@/data/gallery-data";

export default function GalleryContent() {
    const [activeCategory] = useState<string | null>(null);
    const allImages = getAllImages();

    const filteredImages = useMemo(() => {
        if (!activeCategory) return allImages;
        return allImages.filter(image => image.category === activeCategory);
    }, [allImages, activeCategory]);

    return (
        <>
            <ImageGallery
                images={filteredImages.map(img => ({
                    src: img.src,
                    alt: img.alt,
                    title: img.title
                }))}
                showTitles={true}
                className="mb-16"
                imageClassName="rounded-lg"
            />

            {filteredImages.length === 0 && (
                <div className="text-center py-16">
                    <div className="text-gray-400 dark:text-gray-600 text-6xl mb-4">📸</div>
                    <h3 className="text-xl font-medium text-gray-600 dark:text-gray-400 mb-2">
                        No hay imágenes en esta categoría
                    </h3>
                    <p className="text-gray-500 dark:text-gray-500">
                        Selecciona otra categoría o ve todas las imágenes
                    </p>
                </div>
            )}
        </>
    );
}
