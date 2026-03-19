"use client";

import { Link, usePage } from '@inertiajs/react';
import { ReactNode } from "react";

interface SidebarButtonLinkProps {
    href?: string;
    isActive?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    children?: ReactNode;
    className?: string;
    icon?: ReactNode;
    color?: string;
}

export const SidebarButtonLink: React.FC<SidebarButtonLinkProps> = ({
    href = "#",
    isActive,
    onClick,
    children,
    className = "",
    icon,
    color
}) => {
    const { url: pathname, props } = usePage();
    const locale = (props.locale as string) || 'es';

    const isLinkActive = isActive !== undefined ? isActive : pathname === href; 

    return (
        <Link
            className={`relative group flex items-center px-3 py-3 rounded-lg transition-all duration-300 overflow-hidden h-12 ${isLinkActive
                ? 'text-white bg-gradient-to-r from-cr-600 to-cr-700 shadow-sm shadow-cr-600/25'
                : 'text-cb-600 dark:text-zinc-300 bg-transparent'
                } ${className}`}
            href={href || "#"}
            onClick={onClick}
            locale={locale}
        >
            {icon && (
                <span className={`relative z-10 flex items-center justify-center w-5 h-5 mr-3 transition-all duration-300 flex-shrink-0 ${isLinkActive ? 'scale-110' : 'group-hover:scale-110'
                    }`}>
                    {icon}
                </span>
            )}
            <span className={`relative z-10 font-medium transition-all duration-300 leading-5 ${isLinkActive ? `text-white` : `group-hover:text-cb-600 dark:group-hover:text-cb-200 ${color}`
                }`}>
                {children}
            </span>
            {!isLinkActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-cr-600 to-cr-700 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out rounded-lg -z-10" />
            )}
        </Link>
    );
};

