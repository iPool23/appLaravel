import { ReactNode } from 'react';

interface RowItemProps {
    children?: ReactNode;
    className?: string;
    flex?: string;
}

export const RowItem = ({ children, className = '', flex = 'flex-1' }: RowItemProps) => {
    return (
        <div className={`${flex} ${className}`}>
            {children}
        </div>
    );
};

export default RowItem;
