import React from 'react';

interface FormCheckboxProps {
    id: string;
    name: string;
    required?: boolean;
    className?: string;
    checked?: boolean;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

export const FormCheckbox: React.FC<FormCheckboxProps> = ({ 
    id, 
    name, 
    required = false, 
    className = "",
    checked,
    onChange,
    disabled = false
}) => {
    return (
        <input
            id={id}
            name={name}
            type="checkbox"
            required={required}
            disabled={disabled}
            checked={checked}
            onChange={onChange}
            className={`mt-1 h-4 w-4 text-cb-600 border-gray-300 rounded focus:ring-cb-500 focus:ring-2 ${className}`}
        />
    );
};
