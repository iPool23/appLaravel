/**
 * SEO Configuration for Alianza Para el Progreso
 * Best Practices 2025-2026
 */

export const SEO_CONFIG = {
    siteName: 'Alianza Para el Progreso',
    siteUrl: 'https://app.pe', // Update to actual production URL
    defaultLocale: 'es_PE',
    twitterHandle: '@APP_Peru', // Update with actual handle
    organization: {
        name: 'Alianza Para el Progreso',
        logo: '/imgs/logo.png',
        founder: 'César Acuña Peralta',
        founderUrl: 'https://cesaracuna.pe',
        foundingDate: '2001-12-08',
    },
    defaultImage: '/imgs/cap.webp',
    themeColor: '#CD1A18', // APP red color
};

export const DEFAULT_KEYWORDS = [
    'Alianza Para el Progreso',
    'APP',
    'APP Perú',
    'César Acuña',
    'Perú',
    'Partido Político',
    'Progreso para todo el Perú',
    'Justicia Social',
    'Oportunidades para todos',
    'Gestión Pública',
    'Liderazgo Regional'
];

/**
 * Breadcrumbs JSON-LD helper
 */
export const getBreadcrumbsJSON = (items: { name: string, url: string }[]) => {
    return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        "itemListElement": items.map((item, index) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": `${SEO_CONFIG.siteUrl}${item.url}`
        }))
    });
};

/**
 * Organization JSON-LD helper
 */
export const getOrganizationJSON = () => {
    return JSON.stringify({
        "@context": "https://schema.org",
        "@type": "PoliticalParty",
        "name": SEO_CONFIG.siteName,
        "url": SEO_CONFIG.siteUrl,
        "logo": `${SEO_CONFIG.siteUrl}${SEO_CONFIG.organization.logo}`,
        "founder": {
            "@type": "Person",
            "name": SEO_CONFIG.organization.founder,
            "url": SEO_CONFIG.organization.founderUrl
        },
        "foundingDate": SEO_CONFIG.organization.foundingDate,
        "address": {
            "@type": "PostalAddress",
            "addressLocality": "Lima",
            "addressCountry": "PE"
        },
        "sameAs": [
            "https://www.facebook.com/valientesdeapp",
            "https://twitter.com/APP_Peru",
            "https://www.instagram.com/alianzaparaelprogreso_peru/"
        ]
    });
};
