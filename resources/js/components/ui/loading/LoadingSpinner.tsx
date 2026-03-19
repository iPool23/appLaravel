"use client";

import React from 'react';

interface LoadingSpinnerProps {
    className?: string;
    size?: 'sm' | 'md' | 'lg';
    color?: 'dark' | 'light' | 'auto';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    className = "",
    size = 'md',
    color = 'auto'
}) => {
    const sizeClasses = {
        sm: 'h-6 w-6',
        md: 'h-12 w-12',
        lg: 'h-16 w-16'
    };

    const colorClasses = {
        dark: 'border-gray-900',
        light: 'border-white',
        auto: 'border-gray-900 dark:border-white'
    };

    return (
        <div className={`flex items-center justify-center py-16 ${className}`}>
            <div 
                className={`animate-spin rounded-full border-b-2 ${sizeClasses[size]} ${colorClasses[color]}`}
            />
        </div>
    );
};
