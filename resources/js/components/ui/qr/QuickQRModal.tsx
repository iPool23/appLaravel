"use client";

import React, { useState } from 'react';
import { FaQrcode, FaTimes } from 'react-icons/fa';
import QRCodeDisplay from './QRCodeDisplay';
import { DirectiveMember } from '@/interfaces/member.interface';

interface QuickQRModalProps {
    member: DirectiveMember;
    trigger?: React.ReactNode;
    className?: string;
}

const QuickQRModal: React.FC<QuickQRModalProps> = ({
    member,
    trigger,
    className = ''
}) => {
    const [isOpen, setIsOpen] = useState(false);

    const defaultTrigger = (
        <button
            onClick={() => setIsOpen(true)}
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg hover:shadow-xl group"
            title={`Generar QR para ${member.centerText}`}
        >
            <FaQrcode className="w-4 h-4 group-hover:scale-110 transition-transform" />
        </button>
    );

    if (!isOpen) {
        return (
            <div className={className}>
                {trigger ? (
                    <div onClick={() => setIsOpen(true)}>
                        {trigger}
                    </div>
                ) : (
                    defaultTrigger
                )}
            </div>
        );
    }

    return (
        <>
            {/* Backdrop */}
            <div 
                className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                onClick={() => setIsOpen(false)}
            >
                {/* Modal */}
                <div 
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                        <div>
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                Códigos QR
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                                {member.centerText}
                            </p>
                        </div>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                        >
                            <FaTimes className="w-5 h-5 text-gray-500" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 space-y-6">
                        {/* Profile QR */}
                        <QRCodeDisplay 
                            member={member} 
                            type="profile" 
                            size="md"
                            showDownload={true}
                        />

                        {/* Social QRs */}
                        {member.socialLinks && member.socialLinks.length > 0 && (
                            <div>
                                <h4 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                    Redes Sociales
                                </h4>
                                <div className="space-y-4">
                                    {member.socialLinks.map((socialLink, index) => (
                                        <QRCodeDisplay
                                            key={`${socialLink.provider}-${index}`}
                                            member={member}
                                            type="social"
                                            socialLink={socialLink}
                                            size="sm"
                                            showDownload={true}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-6 py-4 bg-gray-50 dark:bg-gray-900/50 border-t border-gray-200 dark:border-gray-700 rounded-b-2xl">
                        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                            Escanea los códigos QR con tu dispositivo móvil para acceder rápidamente
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default QuickQRModal;
