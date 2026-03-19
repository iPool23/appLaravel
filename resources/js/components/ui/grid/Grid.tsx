import { ReactNode } from 'react';

interface GridProps {
    children?: ReactNode;
    className?: string;
}

export const Grid = ({ children, className = '' }: GridProps) => {
    return (
        <div className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-12 gap-y-4 sm:gap-x-2 md:gap-x-3 ${className}`}>
            {children}
        </div>
    );
};
