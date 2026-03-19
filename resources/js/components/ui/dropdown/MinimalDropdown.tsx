"use client";

import React, { useState, useRef, useEffect } from 'react';
import DropdownArrowIcon from '@/components/svg/DropdownArrowIcon';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2 } from 'lucide-react';

interface DropdownOption {
    value: string;
    label: string;
}

interface MinimalDropdownProps {
    options: DropdownOption[];
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    className?: string;
    icon?: React.ReactNode;
    hideLabelOnMobile?: boolean;
    onlyIcon?: boolean;
    expandable?: boolean;
    isLoading?: boolean;
}

export const MinimalDropdown: React.FC<MinimalDropdownProps> = ({
    options,
    value,
    onChange,
    placeholder = "Seleccionar",
    className = "",
    icon,
    hideLabelOnMobile = false,
    onlyIcon = false,
    expandable = false,
    isLoading = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const selectedOption = options.find(option => option.value === value);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleOptionClick = (optionValue: string) => {
        onChange(optionValue);
        setIsOpen(false);
    };

    return (
        <motion.div ref={dropdownRef} className={`relative ${className}`} whileHover={expandable && !isLoading ? "hover" : ""}>
            <button
                type="button"
                onClick={() => !isLoading && setIsOpen(!isOpen)}
                disabled={isLoading}
                className={`flex items-center justify-center text-cb-default font-sans font-bold transition-all duration-300 dark:text-white dark:hover:bg-white dark:hover:text-cb-default rounded-full hover:shadow-lg overflow-hidden ${expandable || onlyIcon ? 'h-11 px-3' : 'px-4 py-3 hover:bg-cb-default hover:text-white dark:hover:bg-cb-500'
                    } ${isLoading ? 'opacity-70 cursor-not-allowed scale-95' : ''}`}
            >
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loader"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="min-w-[20px] flex items-center justify-center"
                        >
                            <Loader2 size={18} className="animate-spin" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="icon"
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.5 }}
                            className="min-w-[20px] flex items-center justify-center"
                        >
                            {icon && <span>{icon}</span>}
                        </motion.div>
                    )}
                </AnimatePresence>

                {expandable ? (
                    <motion.span
                        animate={isLoading ? { width: "auto", opacity: 1, marginLeft: "8px" } : {}}
                        variants={{
                            hover: { width: "auto", opacity: 1, marginLeft: "8px" }
                        }}
                        initial={{ width: 0, opacity: 0, marginLeft: "0px" }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="whitespace-nowrap text-sm"
                    >
                        {isLoading ? 'Cargando...' : (selectedOption ? selectedOption.label : placeholder)}
                        {!isLoading && (
                            <div className="inline-block ml-1">
                                <DropdownArrowIcon open={isOpen} width={16} />
                            </div>
                        )}
                    </motion.span>
                ) : !onlyIcon && (
                    <>
                        <span className={`truncate ml-2 ${hideLabelOnMobile ? 'hidden sm:block' : ''}`}>
                            {isLoading ? 'Cargando...' : (selectedOption ? selectedOption.label : placeholder)}
                        </span>
                        {!isLoading && (
                            <div className={hideLabelOnMobile ? 'hidden sm:block' : ''}>
                                <DropdownArrowIcon open={isOpen} width={20} />
                            </div>
                        )}
                    </>
                )}
            </button>

            {isOpen && !isLoading && (
                <div className="absolute top-full left-0 mt-1 bg-white border border-cb-200 dark:bg-cb-700 dark:border-white shadow-lg z-50 max-h-60 overflow-y-auto rounded-lg min-w-full w-max max-w-[90vw] sm:max-w-xs transition-all duration-300">
                    {options.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => handleOptionClick(option.value)}
                            className={`w-full text-left font-sans font-semibold px-4 py-3 rounded-md transition-all duration-300 ${value === option.value
                                ? 'bg-cb-default text-white dark:bg-cb-500'
                                : 'text-cb-default hover:bg-cb-default hover:text-white dark:text-white dark:hover:bg-cb-500 dark:hover:text-white'
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </motion.div>
    );
};