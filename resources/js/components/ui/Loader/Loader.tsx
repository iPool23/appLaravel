import React from 'react';

interface LoaderProps {
    size?: 'sm' | 'md' | 'lg';
    text?: string;
}

const Loader: React.FC<LoaderProps> = ({
    size = 'md',
    text = 'A'
}) => {
    const sizeClasses = {
        sm: 'h-6 w-6',
        md: 'h-8 w-8',
        lg: 'h-12 w-12'
    };

    return (
        <div className="p-4 flex items-center justify-center">
            <div className="relative flex items-center justify-center">
                <div className={`motion-preset-spin rounded-full ${sizeClasses[size]} border-b-2 border-red-600`}></div>
                {text && <span className="absolute text-cb-600 font-bold">{text}</span>}
            </div>
        </div>
    );
};

export default Loader;
