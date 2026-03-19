"use client";

import React from 'react';

interface EmptyStateProps {
    message?: string;
    className?: string;
    size?: 'sm' | 'md' | 'lg';
}

export const EmptyState: React.FC<EmptyStateProps> = ({
    message = "No se encontraron resultados",
    className = "",
    size = 'md'
}) => {
    const sizeClasses = {
        sm: 'py-8',
        md: 'py-16',
        lg: 'py-24'
    };

    const textSizeClasses = {
        sm: 'text-base',
        md: 'text-lg',
        lg: 'text-xl'
    };

    return (
        <div className={`text-center ${sizeClasses[size]} ${className}`}>
            <p className={`text-gray-500 dark:text-gray-300 ${textSizeClasses[size]}`}>
                {message}
            </p>
        </div>
    );
};
