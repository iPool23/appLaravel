import QRCode from 'qrcode';

export interface QRCodeOptions {
    text: string;
    logo?: string;
    logoSize?: number;
    size?: number;
    margin?: number;
    color?: {
        dark?: string;
        light?: string;
    };
}

export class QRCodeGenerator {
    /**
     * Genera un código QR simple
     */
    static async generateSimpleQR(options: QRCodeOptions): Promise<string> {
        try {
            const qrOptions = {
                width: options.size || 200,
                margin: options.margin || 2,
                color: {
                    dark: options.color?.dark || '#000000',
                    light: options.color?.light || '#FFFFFF'
                },
                errorCorrectionLevel: 'M' as const
            };

            const qrCodeDataURL = await QRCode.toDataURL(options.text, qrOptions);
            return qrCodeDataURL;
        } catch (error) {
            console.error('Error generating QR code:', error);
            throw error;
        }
    }

    /**
     * Genera un código QR con estilo personalizado basado en el proveedor
     */
    static async generateStyledQR(options: QRCodeOptions): Promise<string> {
        try {
            const qrOptions = {
                width: options.size || 200,
                margin: options.margin || 2,
                color: {
                    dark: options.color?.dark || '#000000',
                    light: options.color?.light || '#FFFFFF'
                },
                errorCorrectionLevel: 'H' as const // Higher error correction for better readability
            };

            return await QRCode.toDataURL(options.text, qrOptions);
        } catch (error) {
            console.error('Error generating styled QR code:', error);
            return this.generateSimpleQR(options);
        }
    }

    /**
     * Genera códigos QR para redes sociales con colores personalizados
     */
    static async generateSocialQR(provider: string, url: string): Promise<string> {
        const socialColors: Record<string, { dark: string; light: string }> = {
            facebook: { dark: '#000000', light: '#FFFFFF' },
            instagram: { dark: '#000000', light: '#FFFFFF' },
            twitter: { dark: '#000000', light: '#FFFFFF' },
            x: { dark: '#000000', light: '#FFFFFF' },
            youtube: { dark: '#000000', light: '#FFFFFF' },
            tiktok: { dark: '#000000', light: '#FFFFFF' },
            linkedin: { dark: '#000000', light: '#FFFFFF' }
        };

        const providerLower = provider.toLowerCase();

        return this.generateStyledQR({
            text: url,
            size: 200,
            margin: 2,
            color: socialColors[providerLower] || { dark: '#000000', light: '#FFFFFF' }
        });
    }

    /**
     * Genera un código QR para el perfil completo del miembro - URL PERMANENTE
     */
    static async generateMemberProfileQR(memberSlug: string, memberName: string): Promise<string> {
        // DOMINIO PERMANENTE: https://app.pe
        const profileUrl = `https://app.pe/member/${memberSlug}`;

        return this.generateStyledQR({
            text: profileUrl,
            size: 250,
            margin: 3,
            color: {
                dark: '#000000', // Azul del partido
                light: '#FFFFFF'
            }
        });
    }
}

/**
 * Hook personalizado para generar QR codes
 */
export const useQRGenerator = () => {
    const generateQRForSocial = async (provider: string, url: string) => {
        return QRCodeGenerator.generateSocialQR(provider, url);
    };

    const generateQRForProfile = async (memberSlug: string, memberName: string) => {
        return QRCodeGenerator.generateMemberProfileQR(memberSlug, memberName);
    };

    const generateCustomQR = async (options: QRCodeOptions) => {
        return QRCodeGenerator.generateStyledQR(options);
    };

    return {
        generateQRForSocial,
        generateQRForProfile,
        generateCustomQR
    };
};
