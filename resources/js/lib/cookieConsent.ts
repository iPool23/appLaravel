/**
 * Utilidades para gestionar el consentimiento de cookies
 */

export type ConsentStatus = 'granted' | 'denied';

export interface CookieConsent {
    ad_storage: ConsentStatus;
    ad_user_data: ConsentStatus;
    ad_personalization: ConsentStatus;
    analytics_storage: ConsentStatus;
    timestamp: number;
}

const CONSENT_KEY = 'cookie_consent';

export const getStoredConsent = (): CookieConsent | null => {
    if (typeof window === 'undefined') return null;
    try {
        const stored = localStorage.getItem(CONSENT_KEY);
        if (!stored) return null;
        return JSON.parse(stored);
    } catch (error) {
        console.error('Error reading consent from localStorage:', error);
        return null;
    }
};

export const saveConsent = (consent: Omit<CookieConsent, 'timestamp'>): void => {
    if (typeof window === 'undefined') return;
    try {
        const consentData: CookieConsent = {
            ...consent,
            timestamp: Date.now(),
        };
        localStorage.setItem(CONSENT_KEY, JSON.stringify(consentData));
    } catch (error) {
        console.error('Error saving consent to localStorage:', error);
    }
};

export const hasConsent = (): boolean => {
    return getStoredConsent() !== null;
};

export const updateGoogleConsent = (consent: Omit<CookieConsent, 'timestamp'>): void => {
    if (typeof window === 'undefined' || !window.gtag) return;
    window.gtag('consent', 'update', {
        ad_storage: consent.ad_storage,
        ad_user_data: consent.ad_user_data,
        ad_personalization: consent.ad_personalization,
        analytics_storage: consent.analytics_storage,
    });
};

export const acceptAllCookies = (): void => {
    const consent = {
        ad_storage: 'granted' as ConsentStatus,
        ad_user_data: 'granted' as ConsentStatus,
        ad_personalization: 'granted' as ConsentStatus,
        analytics_storage: 'granted' as ConsentStatus,
    };
    saveConsent(consent);
    updateGoogleConsent(consent);
};

export const rejectAllCookies = (): void => {
    const consent = {
        ad_storage: 'denied' as ConsentStatus,
        ad_user_data: 'denied' as ConsentStatus,
        ad_personalization: 'denied' as ConsentStatus,
        analytics_storage: 'denied' as ConsentStatus,
    };
    saveConsent(consent);
    updateGoogleConsent(consent);
};
