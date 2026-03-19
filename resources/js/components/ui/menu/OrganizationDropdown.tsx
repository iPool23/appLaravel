"use client";

import React, { useState, useRef, useEffect } from "react";
import { ButtonLink } from "../button/ButtonLink";
import DropdownArrowIcon from "@/components/svg/DropdownArrowIcon";
import { usePage } from "@inertiajs/react";
import { useTranslations } from '@/lib/i18n';

interface OrganizationDropdownProps {
    label?: string;
    className?: string;
    onNavigate?: () => void;
}

const ORG_ITEMS = [
    { href: "/juventudes", key: "juventudes" },
    { href: "/efop", key: "efop" },
    { href: "/secretaria-de-la-mujer", key: "secretaria" },
    // { href: "/voceros", key: "voceros" }
];

export const OrganizationDropdown: React.FC<OrganizationDropdownProps> = ({
    label,
    className = "",
    onNavigate
}) => {
    const [open, setOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const { url: pathname } = usePage();
    const t = useTranslations('organization');

    // Texto segÃºn idioma
    const displayLabel = label ?? t('title');

    // Cerrar al click fuera
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Determinar si alguna ruta interna estÃ¡ activa
    const isAnyActive = ORG_ITEMS.some(i => pathname === i.href);

    return (
        <div
            ref={ref}
            className={`relative h-full flex items-stretch ${className}`}
            onMouseEnter={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
        >
            <button
                type="button"
                onClick={() => setOpen(o => !o)}
                className={`relative group font-sans tracking-wider text-xs font-medium transition-all duration-300 px-4 h-full flex items-center uppercase overflow-hidden ${isAnyActive
                    ? "text-white bg-gradient-to-r from-cr-600 to-cr-700 border-cr-600 shadow-lg shadow-cr-600/25"
                    : "text-cb-default dark:text-gray-200 bg-transparent border-transparent hover:border-cr-600 hover:shadow-lg hover:shadow-cr-600/25"
                    }`}
            >
                <span className={`relative z-10 transition-all duration-300 flex items-center gap-1 ${isAnyActive ? "text-white" : "group-hover:text-white"
                    }`}>
                    {displayLabel}
                    <DropdownArrowIcon open={open} />
                </span>
                {!isAnyActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-cr-600 to-cr-700 dark:from-cr-500 dark:to-cr-600 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out -z-10" />
                )}
            </button>

            {open && (
                <div className="absolute top-full left-0 min-w-[230px] bg-white dark:bg-cb-800 shadow-xl dark:border-cb-700 z-[60] animate-fade-in">
                    {ORG_ITEMS.map(item => (
                        <div key={item.href} onClick={onNavigate}>
                            <ButtonLink
                                href={item.href}
                                className="w-full text-left justify-start !px-5 !py-4 !h-auto block"
                                isActive={pathname === item.href}
                            >
                                {t(item.key)}
                            </ButtonLink>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

