import { QRCodeSVG } from 'qrcode.react';

interface QRCodeGeneratorProps {
    url: string;
    size?: number;
    showLogo?: boolean;
}

export default function QRCodeGenerator({
    url,
    size = 300,
    showLogo = true
}: QRCodeGeneratorProps) {
    return (
        <div className="bg-white p-6 rounded-2xl shadow-2xl">
            <div className="relative">
                <QRCodeSVG
                    value={url}
                    size={size}
                    level="H"
                    includeMargin={true}
                    imageSettings={showLogo ? {
                        src: '/imgs/logo/logo.png',
                        height: 50,
                        width: 50,
                        excavate: true,
                    } : undefined}
                />
            </div>
            <p className="text-center mt-4 text-sm text-gray-600 font-medium">
                Escanea para visitar nuestras redes
            </p>
        </div>
    );
}
