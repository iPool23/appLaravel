import Script from 'next/script';

const GA_MEASUREMENT_ID = 'G-QX9SV9GH3Q';

/**
 * Server component: inyecta los scripts críticos en el <head>.
 * - Define gtag y el consentimiento por defecto (beforeInteractive)
 * - Carga gtag.js
 * - Añade la configuración básica de gtag (afterInteractive)
 */
export default function GoogleAnalytics() {
    return (
        <>
            {/* Inicialización del modo de consentimiento - debe ejecutarse ANTES de cualquier config/event */}
            <Script
                id="google-consent-mode-default"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} 

            // Consent Mode v2: valores por defecto DENIED hasta que el usuario acepte
            gtag('consent', 'default', {
              'ad_storage': 'denied',
              'ad_user_data': 'denied',
              'ad_personalization': 'denied',
              'analytics_storage': 'denied',
              'wait_for_update': 500
            });

            // Recomendaciones de privacidad avanzadas
            gtag('set', 'ads_data_redaction', true);
            gtag('set', 'url_passthrough', true);
          `,
                }}
            />

            {/* Google tag (gtag.js) - se carga después que el default consent */}
            <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
                strategy="afterInteractive"
            />

            {/* Config básica de GA4 - se ejecuta tras la carga del script */}
            <Script
                id="google-analytics-config"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);} 
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure',
              allow_google_signals: true,
              allow_ad_personalization_signals: true
            });
          `,
                }}
            />
        </>
    );
}

export const measurementId = GA_MEASUREMENT_ID;
