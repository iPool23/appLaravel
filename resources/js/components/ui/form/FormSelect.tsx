import React from 'react';
import { IconType } from 'react-icons';
import { IoChevronDownOutline } from 'react-icons/io5';
import { ValidationMessage } from './ValidationMessage';

interface FormSelectProps {
    id: string;
    name: string;
    placeholder?: string;
    required?: boolean;
    icon?: IconType;
    className?: string;
    value?: string;
    onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
    onBlur?: (e: React.FocusEvent<HTMLSelectElement>) => void;
    disabled?: boolean;
    children: React.ReactNode;
    error?: string;
    showValidation?: boolean;
}

export const FormSelect: React.FC<FormSelectProps> = ({
    id,
    name,
    placeholder,
    required = false,
    icon: Icon,
    className = "",
    value,
    onChange,
    onBlur,
    disabled = false,
    children,
    error,
    showValidation = false
}) => {
    const hasError = error && error.length > 0;
    const isValid = showValidation && !hasError && value && value.length > 0;

    return (
        <div className="space-y-1">
            <div className="relative">
                <select
                    id={id}
                    name={name}
                    required={required}
                    disabled={disabled}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    className={`block w-full border border-gray-300 dark:border-cb-500/30 px-6 py-4 bg-white dark:bg-cb-full rounded-2xl text-zinc-900 
                        dark:text-cb-100 placeholder-zinc-500 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-cb-default/50 
                        transition-all duration-200 appearance-none ${className}`}
                >
                    {placeholder && (
                        <option value="" disabled>
                            {placeholder}
                        </option>
                    )}
                    {children}
                </select>
                <div className="absolute right-3 top-3 pointer-events-none">
                    <IoChevronDownOutline className={`h-5 w-5 ${hasError
                            ? 'text-red-400'
                            : isValid
                                ? 'text-green-400'
                                : 'text-zinc-400'
                        }`} />
                </div>
                {Icon && (
                    <div className="absolute right-10 top-3">
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
