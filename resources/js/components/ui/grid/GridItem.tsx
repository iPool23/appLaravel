import React from 'react';
import { ReactNode } from 'react';

interface GridItemProps {
    children?: ReactNode;
    colSpan?: number;
    className?: string;
    mobileOrder?: number;
}

export const GridItem = ({ children, colSpan = 12, className = '', mobileOrder }: GridItemProps) => {
    const colSpanClasses = {
        1: 'sm:col-span-1 md:col-span-1',
        2: 'sm:col-span-2 md:col-span-2',
        3: 'sm:col-span-3 md:col-span-3',
        4: 'sm:col-span-3 md:col-span-6 lg:col-span-4',
        5: 'sm:col-span-5 md:col-span-5',
        6: 'sm:col-span-6 md:col-span-6',
        7: 'sm:col-span-7 md:col-span-7',
        8: 'sm:col-span-8 md:col-span-8',
        9: 'sm:col-span-9 md:col-span-9',
        10: 'sm:col-span-10 md:col-span-10',
        11: 'sm:col-span-11 md:col-span-11',
        12: 'md:col-span-12',
    };

    const isEmpty = !children ||
        (typeof children === 'string' && children.trim() === '') ||
        (React.Children.count(children) === 0);

    return (
        <div className={`
            col-span-12 
            ${colSpanClasses[colSpan as keyof typeof colSpanClasses]}
            ${isEmpty ? 'hidden sm:block' : ''}
            ${className}
            ${mobileOrder !== undefined ? `order-[${mobileOrder}]` : ''}
        `}>
            {children}
        </div>
    );
};
