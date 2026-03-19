"use client"

import { useEffect } from 'react';

interface ImagePreloaderProps {
    images: string[];
    priority?: boolean;
}

const ImagePreloader: React.FC<ImagePreloaderProps> = ({ images, priority = true }) => {
    useEffect(() => {
        if (!priority || typeof window === 'undefined') return;

        // Create preload links dynamically
        const preloadLinks: HTMLLinkElement[] = [];
        
        images.slice(0, 6).forEach((src, index) => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = src;
            
            // Set fetchPriority using setAttribute for compatibility
            const priority = index < 3 ? 'high' : 'low';
            link.setAttribute('fetchpriority', priority);
            
            document.head.appendChild(link);
            preloadLinks.push(link);
        });

        // Cleanup function to remove preload links
        return () => {
            preloadLinks.forEach(link => {
                if (document.head.contains(link)) {
                    document.head.removeChild(link);
                }
            });
        };
    }, [images, priority]);

    // This component doesn't render anything visible
    return null;
};

export default ImagePreloader;
