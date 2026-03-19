"use client";

import { ReactNode } from "react";

interface LineButtonProps {
    onClick?: (e: React.MouseEvent) => void;
    children?: ReactNode;
    className?: string;
    ariaLabel?: string;
}

export const LineButton: React.FC<LineButtonProps> = ({
    onClick,
    children,
    className = "",
    ariaLabel = ""
}) => {
    return (
        <button
            className={`relative font-sans tracking-wider text-sm transition-colors pb-1 text-zinc-500 hover:text-black menu-link dark:text-zinc-300 dark:hover:text-white ${className}`}
            onClick={onClick}
            aria-label={ariaLabel}
        >
            {children}
        </button>
    );
};
