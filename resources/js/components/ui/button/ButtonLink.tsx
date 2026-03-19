"use client";

import { Link, usePage } from '@inertiajs/react';
import { ReactNode } from "react";

interface ButtonLinkProps {
    href?: string;
    isActive?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    children?: ReactNode;
    className?: string;
}

export const ButtonLink: React.FC<ButtonLinkProps> = ({
    href = "#",
    isActive,
    onClick,
    children,
    className = ""
}) => {
    const { url: pathname } = usePage();

    const isLinkActive = isActive !== undefined ? isActive : pathname === href;

    return (
        <Link
            className={`relative group font-sans tracking-wider text-xs font-medium transition-all duration-300 px-4 h-full flex items-center uppercase overflow-hidden ${isLinkActive
                ? 'text-white bg-gradient-to-r from-cr-600 to-cr-700 border-cr-600 shadow-lg shadow-cr-600/25'
                : 'text-cb-default dark:text-gray-200 bg-transparent border-transparent hover:border-cr-600 hover:shadow-lg hover:shadow-cr-600/25'
                } ${className}`}
            href={href}
            onClick={onClick}
        >
            <span className={`relative z-10 transition-all duration-300 ${isLinkActive ? 'text-white' : 'group-hover:text-white'
                }`}>
                {children}
            </span>
            {!isLinkActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-cr-600 to-cr-700 dark:from-cr-500 dark:to-cr-600 scale-0 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out -z-10" />
            )}
        </Link>
    );
};
