"use client";

import React, { useState, useEffect, useCallback } from 'react';

import { QRCodeGenerator } from '@/utils/qrGenerator';
import { FaDownload, FaQrcode, FaSpinner } from 'react-icons/fa';
import { DirectiveMember } from '@/interfaces/member.interface';

interface QRCodeDisplayProps {
    member: DirectiveMember;
    type?: 'profile' | 'social';
    socialLink?: { provider: string; href: string };
    size?: 'sm' | 'md' | 'lg';
    showDownload?: boolean;
    className?: string;
}

const QRCodeDisplay: React.FC<QRCodeDisplayProps> = ({
    member,
    type = 'profile',
    socialLink,
    size = 'md',
    showDownload = true,
    className = ''
}) => {
    const [qrDataUrl, setQrDataUrl] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string>('');

    const sizeClasses = {
        sm: 'w-32 h-32',
        md: 'w-48 h-48',
        lg: 'w-64 h-64'
    };

    const generateQRCode = useCallback(async () => {
        if (isGenerating) return;
        
        setIsGenerating(true);
        setError('');

        try {
            let qrCode: string;

            if (type === 'social' && socialLink) {
                qrCode = await QRCodeGenerator.generateSocialQR(socialLink.provider, socialLink.href);
            } else {
                if (!member.slug || !member.centerText) {
                    throw new Error('Member slug and centerText are required');
                }
                qrCode = await QRCodeGenerator.generateMemberProfileQR(member.slug, member.centerText);
            }

            setQrDataUrl(qrCode);
        } catch (err) {
            console.error('Error generating QR code:', err);
            setError('Error al generar el código QR');
        } finally {
            setIsGenerating(false);
        }
    }, [isGenerating, type, socialLink, member.slug, member.centerText]);

    useEffect(() => {
        generateQRCode();
    }, [generateQRCode]);

    const downloadQR = () => {
        if (!qrDataUrl) return;

        const link = document.createElement('a');
        const filename = type === 'social' && socialLink 
            ? `${member.slug}-${socialLink.provider}-qr.png`
            : `${member.slug}-profile-qr.png`;
        
        link.download = filename;
        link.href = qrDataUrl;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const getDisplayTitle = () => {
        if (type === 'social' && socialLink) {
            return `${socialLink.provider.charAt(0).toUpperCase() + socialLink.provider.slice(1)} - ${member.centerText}`;
        }
        return `Perfil de ${member.centerText}`;
    };

    return (
        <div className={`flex flex-col items-center space-y-4 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-lg ${className}`}>
            <div className="flex items-center space-x-2 mb-2">
                <FaQrcode className="text-gray-600 dark:text-gray-300" />
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-200">
                    {getDisplayTitle()}
                </h4>
            </div>

            <div className={`${sizeClasses[size]} bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center border-2 border-gray-200 dark:border-gray-600`}>
                {isGenerating ? (
                    <div className="flex flex-col items-center space-y-2">
                        <FaSpinner className="animate-spin text-2xl text-gray-500" />
                        <span className="text-xs text-gray-500">Generando QR...</span>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center space-y-2 text-red-500">
                        <span className="text-xs text-center px-2">{error}</span>
                        <button 
                            onClick={generateQRCode}
                            className="text-xs bg-red-100 hover:bg-red-200 px-2 py-1 rounded"
                        >
                            Reintentar
                        </button>
                    </div>
                ) : qrDataUrl ? (
                    <img 
                        src={qrDataUrl} 
                        alt={`QR Code - ${getDisplayTitle()}`}
                        width={size === 'sm' ? 128 : size === 'md' ? 192 : 256}
                        height={size === 'sm' ? 128 : size === 'md' ? 192 : 256}
                        className="w-full h-full object-contain rounded"
                        unoptimized
                    />
                ) : (
                    <div className="text-gray-400 text-center">
                        <FaQrcode className="text-2xl mx-auto mb-1" />
                        <span className="text-xs">No QR disponible</span>
                    </div>
                )}
            </div>

            {showDownload && qrDataUrl && !isGenerating && (
                <button
                    onClick={downloadQR}
                    className="flex items-center space-x-2 px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors text-sm"
                >
                    <FaDownload className="w-3 h-3" />
                    <span>Descargar QR</span>
                </button>
            )}
        </div>
    );
};

export default QRCodeDisplay;

