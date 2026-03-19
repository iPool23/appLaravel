'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { getStoredConsent } from '@/lib/cookieConsent';

const GA_MEASUREMENT_ID = 'G-QX9SV9GH3Q';

/**
 * Google Analytics 4 con Consent Mode V2
 * Compatible con GDPR y regulaciones de privacidad
 */
export function GoogleAnalytics() {
    useEffect(() => {
        // Verificar si ya hay consentimiento guardado
        const storedConsent = getStoredConsent();

        if (storedConsent) {
            // Si ya hay consentimiento guardado, actualizarlo
            if (window.gtag) {
                window.gtag('consent', 'update', {
                    ad_storage: storedConsent.ad_storage,
                    ad_user_data: storedConsent.ad_user_data,
                    ad_personalization: storedConsent.ad_personalization,
                    analytics_storage: storedConsent.analytics_storage,
                });
            }
        }
    }, []);

    return (
        <>
            {/* Script de inicialización de Consent Mode - DEBE ir ANTES de gtag.js */}
            <Script
                id="google-consent-mode-init"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            
            // Configuración por defecto de Consent Mode (TODO DENEGADO hasta que usuario acepte)
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'wait_for_update': 500
            });
            
            // Habilitar modo avanzado (envía pings anónimos)
            gtag('set', 'ads_data_redaction', true);
            gtag('set', 'url_passthrough', true);
          `,
                }}
            />

            {/* Google Tag (gtag.js) */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
            />

            {/* Configuración de Google Analytics 4 */}
            <Script
                id="google-analytics-config"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            
            // Configuración principal de GA4
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
              // Google Signals (datos demográficos e intereses)
              allow_google_signals: true,
              allow_ad_personalization_signals: true,
              // Opciones de privacidad
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure',
              // Debugging (remover en producción)
              debug_mode: false
            });
          `,
                }}
            />
        </>
    );
}

/**
 * Hook para enviar eventos personalizados a GA4
 */
export const sendGAEvent = (
    eventName: string,
    parameters?: Record<string, any>
) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('event', eventName, parameters);
    }
};

/**
 * Hook para rastrear vistas de página
 */
export const sendPageView = (url: string) => {
    if (typeof window !== 'undefined' && window.gtag) {
        window.gtag('config', GA_MEASUREMENT_ID, {
            page_path: url,
        });
    }
};
