"use client";

import { useState } from "react";

interface ImageGalleryItem {
    src: string;
    alt: string;
    title?: string;
}

interface ImageGalleryProps {
    images: ImageGalleryItem[];
    className?: string;
    imageClassName?: string;
    showTitles?: boolean;
}

export default function ImageGallery({
    images,
    className = "",
    imageClassName = "",
    showTitles = false
}: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<ImageGalleryItem | null>(null);
    const totalImages = images.length;
    const remainder = totalImages % 3;

    const getLastRowClass = () => {
        if (remainder === 0) return "";
        if (remainder === 1) return "md:col-start-2";
        if (remainder === 2) return "md:col-start-1 md:col-end-3";
        return "";
    };

    const openModal = (image: ImageGalleryItem) => {
        setSelectedImage(image);
    };

    const closeModal = () => {
        setSelectedImage(null);
    };

    return (
        <>
            <div className={`w-full ${className}`}>
                <div className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 ${getLastRowClass()}`}>
                    {images.map((image, index) => {
                        const isInLastRow = index >= Math.floor(totalImages / 3) * 3;
                        const isLastRowIncomplete = remainder > 0;
                        const shouldCenter = isInLastRow && isLastRowIncomplete;

                        let itemClasses = "";
                        if (shouldCenter) {
                            if (remainder === 1 && index === totalImages - 1) {
                                itemClasses = "sm:col-span-2 md:col-span-1 md:col-start-2";
                            } else if (remainder === 2) {
                                if (index === totalImages - 2) {
                                    itemClasses = "md:col-start-1";
                                } else if (index === totalImages - 1) {
                                    itemClasses = "md:col-start-2";
                                }
                            }
                        }

                        return (
                            <div
                                key={index}
                                className={`group cursor-pointer ${itemClasses}`}
                                onClick={() => openModal(image)}
                            >
                                <div className="relative overflow-hidden rounded-lg shadow-md bg-white dark:bg-cb-900 transition-transform duration-300 ease-in-out group-hover:scale-105">
                                    <div className="aspect-square relative">
                                        <img
                                            src={image.src}
                                            alt={image.alt}
                                            className={`w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110 ${imageClassName}`}
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <div className="bg-white/20 backdrop-blur-sm rounded-full p-3">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {showTitles && image.title && (
                                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                                            <h3 className="text-white text-sm md:text-base font-medium">
                                                {image.title}
                                            </h3>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {selectedImage && (
                <div
                    className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                    onClick={closeModal}
                >
                    <div className="relative max-w-7xl max-h-full w-full h-full flex items-center justify-center">
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm rounded-full p-2 text-white hover:bg-white/30 transition-colors"
                        >
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="m18 6-12 12M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </button>

                        <div className="relative w-full h-full max-w-5xl max-h-[90vh]">
                            <img
                                src={selectedImage.src}
                                alt={selectedImage.alt}
                                className="w-full h-full object-contain"
                            />
                        </div>

                        {selectedImage.title && (
                            <div className="absolute bottom-4 left-4 right-4 text-center">
                                <div className="bg-black/60 backdrop-blur-sm rounded-lg px-6 py-3 inline-block">
                                    <h3 className="text-white text-lg md:text-xl font-medium">
                                        {selectedImage.title}
                                    </h3>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </>
    );
}
