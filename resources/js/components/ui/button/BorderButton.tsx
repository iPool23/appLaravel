import React, { ReactNode } from 'react';
import { Link } from '@inertiajs/react';

interface BorderButtonProps {
    text: string;
    className?: string;
    onClick?: () => void;
    href?: string;
    type?: 'button' | 'submit' | 'reset';
    disabled?: boolean;
    fullWidth?: boolean;
    icon?: ReactNode;
}

export const BorderButton: React.FC<BorderButtonProps> = ({
    text,
    className = '',
    onClick,
    href,
    type = 'button',
    disabled = false,
    fullWidth = false,
    icon
}) => {
    const baseClasses = `
        relative group overflow-hidden rounded-full border-[1.5px] transition-all duration-300
        ${disabled 
            ? 'border-zinc-300 dark:border-zinc-700 cursor-not-allowed' 
            : 'border-cb-600 hover:border-cb-700 dark:border-cb-500 dark:hover:border-cb-400 cursor-pointer hover:shadow-lg hover:shadow-cb-600/25'
        }
        ${fullWidth ? 'w-full' : 'inline-block'}
        ${className}
    `;

    const content = (
        <div className={`
            relative z-10 flex items-center justify-center px-8 py-3 rounded-full
            ${disabled
                ? 'text-zinc-400 dark:text-zinc-600'
                : 'text-cb-600 dark:text-cb-400 group-hover:text-white dark:group-hover:text-white'
            }
            transition-all duration-300 font-medium
        `}>
            {icon && <span className="mr-2">{icon}</span>}
            <span className="font-sans text-sm tracking-wider uppercase font-semibold">{text}</span>
            {!disabled && (
                <div className={`
                    absolute inset-0 rounded-full
                    bg-cb-default dark:from-cb-500 dark:to-cb-600
                    scale-0 opacity-0
                    group-hover:scale-100 group-hover:opacity-100
                    transition-all duration-300 ease-out -z-10
                `} />
            )}
        </div>
    );

    if (href) {
        return (
            <Link href={href} onClick={onClick} className={baseClasses}>
                {content}
            </Link>
        );
    }

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={baseClasses}
        >
            {content}
        </button>
    );
};
