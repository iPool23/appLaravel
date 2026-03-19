'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { getStoredConsent, updateGoogleConsent } from '@/lib/cookieConsent';
import { measurementId } from './GoogleAnalytics.server';

/**
 * Componente cliente: actualiza el estado de consentimiento desde localStorage
 * y envía vistas de página cuando cambie la ruta.
 */
export default function GoogleAnalyticsClient() {
    const pathname = usePathname();

    useEffect(() => {
        // Actualizar el consentimiento en gtag si existe en localStorage
        const stored = getStoredConsent();
        if (stored && typeof window !== 'undefined' && window.gtag) {
            // Actualiza el estado del modo de consentimiento en la página actual
            updateGoogleConsent({
                ad_storage: stored.ad_storage,
                ad_user_data: stored.ad_user_data,
                ad_personalization: stored.ad_personalization,
                analytics_storage: stored.analytics_storage,
            });
        }
    }, []);

    // Enrutamiento / pageview: enviar config para actualizar page_path al cambiar ruta
    useEffect(() => {
        if (typeof window === 'undefined' || !window.gtag) return;
        try {
            window.gtag('config', measurementId, {
                page_path: pathname,
            });
        } catch (e) {
            // Silencioso
        }
    }, [pathname]);

    return null;
}
