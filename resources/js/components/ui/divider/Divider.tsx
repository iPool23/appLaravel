import React from 'react';

interface DividerProps {
    leftWidth?: number;
    showCircle?: boolean;
    className?: string;
    variant?: 'white' | 'dark';
}

export const Divider: React.FC<DividerProps> = ({
    leftWidth = 35,
    showCircle = true,
    className = '',
    variant = 'dark',
}) => {
    const rightWidth = 100 - leftWidth;

    const circleColor = variant === 'white'
        ? 'bg-white dark:bg-cb-600 border border-cb-300 dark:border-cb-700'
        : 'bg-cb-600 dark:bg-white border border-cb-700 dark:border-cb-300';

    const lineColor = variant === 'white'
        ? 'bg-white dark:bg-cb-600 border-t border-cb-300 dark:border-cb-700'
        : 'bg-cb-600 dark:bg-white border-t border-cb-700 dark:border-cb-300';

    const secondaryLineColor = variant === 'white'
        ? 'bg-cb-400 dark:bg-cb-600 border-t border-cb-300 dark:border-cb-700'
        : 'bg-cb-300 dark:bg-cb-700 border-t border-cb-700 dark:border-cb-300';

    return (
        <div className={`w-full flex items-center ${className}`}>
            <div className="relative" style={{ width: `${leftWidth}%` }}>
                {showCircle && (
                    <div className={`absolute left-0 top-1/2 transform -translate-y-1/2 w-3 h-3 ${circleColor} rounded-full`}></div>
                )}
                <div className={`h-[2px] ${lineColor} w-full`}></div>
            </div>
            <div style={{ width: `${rightWidth}%` }} className={`h-[2px] ${secondaryLineColor}`}></div>
        </div>
    );
};
