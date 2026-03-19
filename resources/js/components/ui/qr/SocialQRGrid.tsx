"use client";

import React, { useState } from 'react';
import QRCodeDisplay from './QRCodeDisplay';
import { DirectiveMember } from '@/interfaces/member.interface';
import { FaQrcode, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface SocialQRGridProps {
    member: DirectiveMember;
    showProfileQR?: boolean;
    className?: string;
}

const SocialQRGrid: React.FC<SocialQRGridProps> = ({
    member,
    showProfileQR = true,
    className = ''
}) => {
    const [isExpanded, setIsExpanded] = useState(false);

    if (!member.socialLinks || member.socialLinks.length === 0) {
        return showProfileQR ? (
            <div className={className}>
                <QRCodeDisplay member={member} type="profile" size="md" />
            </div>
        ) : null;
    }

    const totalQRs = member.socialLinks.length + (showProfileQR ? 1 : 0);

    return (
        <div className={`bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 ${className}`}>
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <FaQrcode className="w-5 h-5 text-cb-600 dark:text-cb-400" />
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Códigos QR
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            {totalQRs} código{totalQRs !== 1 ? 's' : ''} disponible{totalQRs !== 1 ? 's' : ''}
                        </p>
                    </div>
                </div>
                
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center space-x-2 px-3 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        {isExpanded ? 'Contraer' : 'Expandir'}
                    </span>
                    {isExpanded ? (
                        <FaChevronUp className="w-4 h-4 text-gray-500" />
                    ) : (
                        <FaChevronDown className="w-4 h-4 text-gray-500" />
                    )}
                </button>
            </div>

            {/* QR Codes Grid */}
            <div className={`transition-all duration-300 overflow-hidden ${
                isExpanded ? 'max-h-none opacity-100' : 'max-h-40 opacity-75'
            }`}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {/* Profile QR */}
                    {showProfileQR && (
                        <QRCodeDisplay 
                            member={member} 
                            type="profile" 
                            size="sm" 
                            showDownload={isExpanded}
                        />
                    )}

                    {/* Social Media QRs */}
                    {/* {member.socialLinks.map((socialLink, index) => (
                        <QRCodeDisplay
                            key={`${socialLink.provider}-${index}`}
                            member={member}
                            type="social"
                            socialLink={socialLink}
                            size="sm"
                            showDownload={isExpanded}
                        />
                    ))} */}
                </div>
            </div>
        </div>
    );
};

export default SocialQRGrid;
