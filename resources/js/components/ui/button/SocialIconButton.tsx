import React from 'react';
import { IconType } from 'react-icons';

interface SocialIconButtonProps {
    href: string;
    icon: IconType;
    label?: string;
    className?: string;
}

export const SocialIconButton: React.FC<SocialIconButtonProps> = ({
    href,
    icon: Icon,
    label,
    className = '',
}) => {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label || 'Social media link'}
            className={`w-10 h-10 rounded-full border border-cb-600 dark:border-white flex items-center justify-center hover:bg-cb-600 dark:hover:bg-white transition-colors group duration-300 ${className}`}
        >
            <Icon size={20} className="text-cb-600 dark:text-white group-hover:text-white dark:group-hover:text-cb-600 transition-colors duration-300" />
        </a>
    );
};
