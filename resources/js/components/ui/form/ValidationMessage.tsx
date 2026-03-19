import React from 'react';
import { IoAlertCircleOutline, IoCheckmarkCircleOutline } from 'react-icons/io5';

interface ValidationMessageProps {
    error?: string;
    success?: boolean;
    className?: string;
}

export const ValidationMessage: React.FC<ValidationMessageProps> = ({ 
    error, 
    success = false, 
    className = "" 
}) => {
    if (!error && !success) return null;

    return (
        <div className={`flex items-center gap-2 mt-1 text-sm ${className}`}>
            {error && (
                <>
                    <IoAlertCircleOutline className="h-4 w-4 text-red-500 flex-shrink-0" />
                    <span className="text-red-600 dark:text-red-400">{error}</span>
                </>
            )}
            {success && !error && (
                <>
                    <IoCheckmarkCircleOutline className="h-4 w-4 text-green-500 flex-shrink-0" />
                    <span className="text-green-600 dark:text-green-400">Campo válido</span>
                </>
            )}
        </div>
    );
};
