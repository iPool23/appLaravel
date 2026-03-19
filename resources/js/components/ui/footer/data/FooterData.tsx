export interface ContactInfo {
    address: string;
    phone: string;
}

export interface MenuItem {
    href: string;
    label: string;
}

// Datos por idioma (usando códigos cortos: 'es', 'qu')
export const getFooterData = (language: string) => {
    // Normalizar el código de idioma (soportar tanto 'es' como 'es-PE')
    const lang = language.startsWith('qu') ? 'qu' : 'es';

    const contactInfo: ContactInfo = {
        address: "Av. de la Policía 643, Jesús María",
        phone: "(01) 202 4600"
    };

    const menuItems: Record<string, MenuItem[]> = {
        'es': [
            { href: "/historia", label: "Historia" },
            { href: "/ejes", label: "Ejes" },
            { href: "/fundador", label: "Fundador" },
            { href: "/juventudes", label: "Juventudes" },
            { href: "/efop", label: "EFOP" },
            { href: "/secretaria-de-la-mujer", label: "Secretaría de la mujer" },
            { href: "/galeria", label: "Galería" },
            { href: "/prensa", label: "Prensa" },
            { href: "/contacto", label: "Contacto" }
        ],
        'qu': [
            { href: "/historia", label: "Willakuy" },
            { href: "/ejes", label: "Ejes" },
            { href: "/fundador", label: "Kamachiq" },
            { href: "/juventudes", label: "Waynakuna" },
            { href: "/efop", label: "EFOP" },
            { href: "/secretaria-de-la-mujer", label: "Warmikunaq qillqana" },
            { href: "/galeria", label: "Siq'ikuna" },
            { href: "/prensa", label: "Willakuy" },
            { href: "/contacto", label: "Rimanakuy" }
        ],
    };

    const texts: Record<string, any> = {
        'es': {
            sitemap: "Alianza Para el Progreso",
            press: "Prensa",
            direction: "Dirección:",
            phone: "Teléfono:",
            copyright: "Alianza para el Progreso. © Todos los derechos reservados",
            terms: "Términos de uso",
            privacy: "Política de privacidad",
            sitemap_link: "Mapa del sitio",
            resources: "Recursos",
            logoAlt: "Alianza Para el Progreso"
        },
        'qu': {
            sitemap: "Alianza Para el Progreso",
            press: "Willakuy",
            direction: "Maypi:",
            phone: "Telefono:",
            copyright: "Ñawpaqman Purinapaq Huñunakuy. © Tukuy derechokuna waqaychasqa",
            terms: "Llamkay kamachikuna",
            privacy: "Pakana politica",
            sitemap_link: "Web mapa",
            resources: "Urqhuy",
            logoAlt: "Ñawpaqman Purinapaq Huñunakuy"
        },
    };

    return {
        contactInfo,
        menuItems: menuItems[lang] || menuItems['es'],
        texts: texts[lang] || texts['es']
    };
};
