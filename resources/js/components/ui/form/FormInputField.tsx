import React from 'react';
import clsx from 'clsx';
import { IoInformationOutline } from "react-icons/io5";

interface FormInputFieldProps {
    id: string;
    label?: string;
    placeholder: string;
    type: string;
    icon: React.ReactElement<{ className?: string }>;
    error?: string;
    className?: string;
    defaultValue?: string;
    value?: string;
    onChange?: (value: string) => void;

    name?: string;
    autoComplete?: string;
    autoFocus?: boolean;
    required?: boolean;

    register?: any;
    registerOptions?: Record<string, any>;
}

export const FormInputField = ({
    id,
    label,
    placeholder,
    defaultValue,
    value,
    onChange,
    required = true,
    type,
    icon,
    error,
    className = '',
    name,
    autoComplete,
    autoFocus,
    register,
    registerOptions
}: FormInputFieldProps) => {
    const hasError = !!error;

    const inputProps = register
        ? register(name || id, registerOptions)
        : {
            name: name || id,
            id,
            autoComplete,
            autoFocus
        };

    return (
        <div className={className}>
            {label && (
                <label
                    htmlFor={id}
                    className="block font-medium text-black dark:text-white mb-1"
                >
                    {label}
                </label>
            )}

            <div className="relative group">
                <input
                    className={clsx(
                        "block w-full pl-10 pr-3 py-2.5 border-b bg-transparent shadow-sm",
                        "focus:outline-none transition-colors text-black placeholder-zinc-400 dark:text-white dark:placeholder-zinc-600",
                        {
                            'border-cb-default/50 focus:border-cb-default dark:border-white': !hasError,
                            'border-red-300 focus:border-red-500 dark:border-red-500': hasError
                        }
                    )}
                    type={type}
                    id={id}
                    placeholder={placeholder}
                    defaultValue={defaultValue}
                    value={value}
                    onChange={onChange ? (e) => onChange(e.target.value) : undefined}
                    required={required}
                    {...inputProps}
                />

                <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                    {React.cloneElement(icon, {
                        className: clsx(
                            "h-4 w-4 transition-colors",
                            hasError
                                ? "text-red-400"
                                : "text-cb-400 group-focus-within:text-cb-default"
                        )
                    })}
                </div>
            </div>

            {hasError && (
                <p className="mt-1 text-red-600 flex items-center">
                    <IoInformationOutline className="h-4 w-4 mr-1 flex-shrink-0" />
                    {error}
                </p>
            )}
        </div>
    );
};
