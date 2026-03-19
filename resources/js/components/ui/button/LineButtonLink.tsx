"use client";

import { Link, usePage } from '@inertiajs/react';
import { ReactNode } from "react";

interface LineButtonLinkProps {
    href?: string;
    isActive?: boolean;
    onClick?: (e: React.MouseEvent) => void;
    children?: ReactNode;
    className?: string;
}

export const LineButtonLink: React.FC<LineButtonLinkProps> = ({
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
            className={`relative font-sans tracking-wider text-sm transition-colors pb-1 
                ${isLinkActive ? 'text-cb-600 border-b border-cb-600 hover:text-cb-600 hover:border-cb-600 dark:text-white dark:border-white dark:hover:text-white'
                : 'text-zinc-500 hover:text-cb-600 menu-link dark:text-zinc-300 dark:hover:text-white'
                } ${className}`}
            href={href}
            onClick={onClick}
        >
            {children}
        </Link>
    );
};
