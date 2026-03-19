"use client";

import React, { forwardRef, useState } from 'react';

interface MinimalInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    value: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    type?: string;
}

export const MinimalInput = forwardRef<HTMLInputElement, MinimalInputProps>(({
    value,
    onChange,
    placeholder = "Escribir...",
    className = "",
    type = "text",
    ...props
}, ref) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className={`relative ${className}`}>
            <input
                ref={ref}
                type={type}
                value={value}
                onChange={handleChange}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                placeholder={placeholder}
                className="group w-full px-4 py-2 text-sm font-sans tracking-wider text-black bg-transparent hover:bg-gray-100 dark:text-white dark:hover:bg-black focus:outline-none focus:bg-gray-100 dark:focus:bg-black transition-colors duration-150"
                {...props}
            />
            
            <span
                className={`absolute left-0 bottom-0 w-full h-[1px] bg-black dark:bg-white transition-transform duration-300 origin-left ${
                    isFocused ? 'scale-x-100' : 'scale-x-0'
                }`}
            />
            
            <span
                className={`absolute left-0 bottom-0 w-full h-[1px] bg-gray-300 dark:bg-gray-600 transition-opacity duration-300 ${
                    isFocused ? 'opacity-0' : 'opacity-100'
                }`}
            />
        </div>
    );
});

MinimalInput.displayName = 'MinimalInput';
