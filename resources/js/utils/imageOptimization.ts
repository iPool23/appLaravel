// Utility function to generate optimized blur data URLs
export const generateBlurDataURL = (width: number = 220, height: number = 220): string => {
    // Simple base64 encoded SVG placeholder - compatible with all environments
    const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#f3f4f6;stop-opacity:1" />
          <stop offset="100%" style="stop-color:#e5e7eb;stop-opacity:1" />
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#grad)" />
    </svg>`;
    
    // Use encodeURIComponent consistently for both server and client
    // This ensures hydration consistency and avoids btoa compatibility issues
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
};

// Optimized image sizes for responsive design
export const imageSizes = {
    congressman: {
        width: 220,
        height: 220,
        sizes: '(max-width: 768px) 180px, (max-width: 1024px) 200px, 220px'
    }
};

// Image optimization utilities
export const imageOptimization = {
    quality: 85, // Good balance between quality and file size
    format: ['image/webp', 'image/avif', 'image/jpeg'],
    placeholder: 'blur' as const,
    loading: 'lazy' as const,
    priority: false
};
