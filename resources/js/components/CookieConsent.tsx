'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { acceptAllCookies, rejectAllCookies, hasConsent } from '@/lib/cookieConsent';

/**
 * Banner de consentimiento de cookies
 * Compatible con GDPR y Consent Mode de Google Analytics 4
 */
export function CookieConsent() {
    const [showBanner, setShowBanner] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Verificar si ya hay consentimiento guardado
        const alreadyConsented = hasConsent();

        if (!alreadyConsented) {
            // Mostrar el banner después de un pequeño delay para mejor UX
            setTimeout(() => {
                setShowBanner(true);
                setTimeout(() => setIsVisible(true), 100);
            }, 1000);
        }
    }, []);

    const handleAccept = () => {
        acceptAllCookies();
        closeBanner();
    };

    const handleReject = () => {
        rejectAllCookies();
        closeBanner();
    };

    const closeBanner = () => {
        setIsVisible(false);
        setTimeout(() => setShowBanner(false), 300);
    };

    if (!showBanner) return null;

    return (
        <div
            className={`fixed bottom-4 right-4 max-w-md z-50 transition-all duration-300 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
                }`}
            role="dialog"
            aria-labelledby="cookie-consent-title"
            aria-describedby="cookie-consent-description"
        >
            <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <span className="text-2xl" role="img" aria-label="cookie">
                            🍪
                        </span>
                        <h3
                            id="cookie-consent-title"
                            className="text-lg font-semibold text-gray-900 dark:text-white"
                        >
                            Cookies y Privacidad
                        </h3>
                    </div>
                    <button
                        onClick={closeBanner}
                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        aria-label="Cerrar banner"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Description */}
                <p
                    id="cookie-consent-description"
                    className="text-sm text-gray-600 dark:text-gray-300 mb-6 leading-relaxed"
                >
                    Usamos cookies para mejorar tu experiencia, analizar el tráfico del sitio y
                    personalizar el contenido. Al aceptar, nos ayudas a entender cómo usas nuestro
                    sitio web.
                </p>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3">
                    <button
                        onClick={handleReject}
                        className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200"
                    >
                        Rechazar
                    </button>
                    <button
                        onClick={handleAccept}
                        className="flex-1 px-4 py-2.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 rounded-lg transition-colors duration-200 shadow-sm"
                    >
                        Aceptar Todo
                    </button>
                </div>

                {/* Footer note */}
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-4 text-center">
                    Puedes cambiar tus preferencias en cualquier momento
                </p>
            </div>
        </div>
    );
}
