import { ReactNode } from 'react';

interface RowProps {
    children?: ReactNode;
    className?: string;
    gap?: string;
}

export const Row = ({ children, className = '', gap = 'gap-4' }: RowProps) => {
    return (
        <div className={`flex flex-wrap items-stretch ${gap} ${className}`}>
            {children}
        </div>
    );
};

export default Row;
