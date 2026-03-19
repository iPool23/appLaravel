"use client";

import React from "react";
import { useTranslations } from "@/lib/i18n";
import { Link } from '@inertiajs/react';
import { FaPhoneAlt } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { defaultSocialLinks, SocialLink } from "./data/contactSocialLinks";
import ContainerTodo from "../container/ContainerTodo";

interface ContactInfo {
    phone?: string;
    address?: string;
}

interface ContactTopBarProps {
    contactInfo?: ContactInfo;
    socialLinks?: SocialLink[];
    className?: string;
}

export const ContactTopBar: React.FC<ContactTopBarProps> = ({
    contactInfo,
    socialLinks = defaultSocialLinks,
    className = "",
}) => {
    const t = useTranslations('topbar');
    const finalContactInfo = contactInfo || {
        phone: "(01) 202 4600",
        address: t('address')
    };

    return (
        <div className={`fixed top-0 left-0 right-0 z-[51] bg-cb-default dark:bg-cb-full text-white py-6 xl:py-2 sm:py-3 ${className}`}>
            <ContainerTodo>
                <div className="flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm gap-2 sm:gap-0">
                    <div className="flex flex-col sm:flex-row items-center space-y-1 sm:space-y-0 sm:space-x-4 lg:space-x-6">{finalContactInfo.phone && (
                        <div className="flex items-center space-x-2">
                            <FaPhoneAlt />
                            <span className="whitespace-nowrap font-bold">{t('phoneLabel')} {finalContactInfo.phone}</span>
                        </div>
                    )}

                        <Link href="https://maps.app.goo.gl/zvNCX53H8EvNBWNV6" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-2 hover:text-white/80 transition-colors duration-300">
                            <IoLocation />
                            <span className="whitespace-nowrap font-bold">{t('addressLabel')} {finalContactInfo.address}</span>
                        </Link>
                    </div>

                    <div className="flex items-center gap-5">
                        {socialLinks.map((social: any, index: number) => (
                            <Link
                                key={index}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-white/80 transition-colors duration-300"
                                aria-label={social.label}
                            >
                                {social.icon}
                            </Link>
                        ))}
                    </div>
                </div>
            </ContainerTodo>
        </div>
    );
};

