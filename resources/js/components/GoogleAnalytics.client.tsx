import { usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { measurementId } from './GoogleAnalytics.server';

/**
 * Componente cliente: actualiza el estado de consentimiento desde localStorage
 * y envía vistas de página cuando cambie la ruta.
 */
export default function GoogleAnalyticsClient() {
    const { url: pathname } = usePage();

    // Enrutamiento / pageview: enviar config para actualizar page_path al cambiar ruta
    useEffect(() => {
        if (typeof window === 'undefined' || !(window as any).gtag) return;
        try {
            (window as any).gtag('config', measurementId, {
                page_path: pathname,
            });
        } catch {
            // Silencioso
        }
    }, [pathname]);

    return null;
}
