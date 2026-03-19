import React from 'react';

interface FormLabelProps {
    htmlFor: string;
    children: React.ReactNode;
    required?: boolean;
    className?: string;
}

export const FormLabel: React.FC<FormLabelProps> = ({ 
    htmlFor, 
    children, 
    required = false, 
    className = "" 
}) => {
    return (
        <label 
            htmlFor={htmlFor}
            className={`block text-sm font-medium text-cb-700 dark:text-cb-300 mb-2 ${className}`}
        >
            {children}
            {required && <span className="text-cr-500 ml-1">*</span>}
        </label>
    );
};
