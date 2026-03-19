import React from 'react';
import { IconType } from 'react-icons';
import { ValidationMessage } from './ValidationMessage';

interface FormTextareaProps {
    id: string;
    name: string;
    rows?: number;
    placeholder?: string;
    required?: boolean;
    icon?: IconType;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
    disabled?: boolean;
    error?: string;
    showValidation?: boolean;
}

export const FormTextarea: React.FC<FormTextareaProps> = ({
    id,
    name,
    rows = 4,
    placeholder,
    required = false,
    icon: Icon,
    className = "",
    value,
    onChange,
    onBlur,
    disabled = false,
    error,
    showValidation = false
}) => {
    const hasError = error && error.length > 0;
    const isValid = showValidation && !hasError && value && value.length > 0;

    return (
        <div className="space-y-1">
            <div className="relative">
                <textarea
                    id={id}
                    name={name}
                    rows={rows}
                    required={required}
                    disabled={disabled}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`block w-full px-6 py-4 border border-gray-300 dark:border-cb-500/30 bg-white dark:bg-cb-full rounded-2xl text-zinc-900 dark:text-cb-100 
                        placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-cb-default/50 
                        transition-all duration-200 ${className}`}
                    placeholder={placeholder}
                />
                {Icon && (
                    <div className="absolute right-3 top-3">
                        <Icon className={`h-5 w-5 ${hasError
                                ? 'text-red-400'
                                : isValid
                                    ? 'text-green-400'
                                    : 'text-zinc-400'
                            }`} />
                    </div>
                )}
            </div>
            <ValidationMessage error={error} success={isValid ? true : undefined} />
        </div>
    );
};
