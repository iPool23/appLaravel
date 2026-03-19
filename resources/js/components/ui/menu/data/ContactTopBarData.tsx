export interface ContactTopBarTexts {
    phoneLabel: string;
    addressLabel: string;
    followUs: string;
}

export interface ContactTopBarInfo {
    contactInfo: {
        phone: string;
        address: string;
    };
    texts: ContactTopBarTexts;
}

export const getContactTopBarData = (language: string): ContactTopBarInfo => {
    const contactInfo = {
        phone: "(01) 202 4600",
        address: "Av. de la Policía 643, Jesús María"
    };

    const texts: Record<string, ContactTopBarTexts> = {
        'es-PE': {
            phoneLabel: "Teléfono:",
            addressLabel: "Dirección:",
            followUs: "Síguenos:"
        },
        'qu-PE': {
            phoneLabel: "Telefono:",
            addressLabel: "Maypi:",
            followUs: "Rikuykuwayku:"
        },
    };

    return {
        contactInfo,
        texts: texts[language] || texts['es-PE']
    };
};
