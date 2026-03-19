import React from 'react';
import { Title } from '../typography/Title';
import { CircleArrow } from '../circle/CircleArrow';
import { Link } from '@inertiajs/react';

interface FancyBorderButtonProps {
    topText: string;
    title: string;
    onClick?: () => void;
    href?: string;
    className?: string;
}

export const FancyBorderButton: React.FC<FancyBorderButtonProps> = ({
    topText,
    title,
    onClick,
    href = '/',
    className = '',
}) => {
    return (
        <Link href={href}>
            <button
                onClick={onClick}
                className={`relative group overflow-hidden border-[1px] border-black bg-white dark:border-white dark:bg-black w-full h-[250px] sm:h-[300px] md:h-[400px] ${className}`}
            >
                <div className="px-4 py-6 flex flex-col justify-between h-full z-10 relative group-hover:text-white dark:group-hover:text-black transition-colors duration-300">
                    <div className="text-left px-1">
                        {topText}
                    </div>

                    <div className="flex justify-between items-center">
                        <Title title={title} color='group-hover:text-white dark:group-hover:text-black' className='text-left' />
                        <CircleArrow className="self-end" />
                    </div>

                    <div className="absolute inset-2 bg-black dark:bg-white scale-90 origin-center opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300 ease-out -z-10" />
                </div>
            </button>
        </Link>
    );
};
