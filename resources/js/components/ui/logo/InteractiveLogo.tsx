"use client";

import { Link } from '@inertiajs/react';
import { useState, useEffect } from "react";

interface InteractiveLogoProps {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    href?: string;
    target?: string;
}

export const InteractiveLogo = ({ src, alt, width = 180, height = 180, href = "/", target = "_self" }: InteractiveLogoProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [mounted, setMounted] = useState(false);

    const [isDarkTheme, setIsDarkTheme] = useState(false); 
    
    useEffect(() => { 
        setIsDarkTheme(document.documentElement.classList.contains('dark') || window.matchMedia('(prefers-color-scheme: dark)').matches); 
        setMounted(true);
    }, []); 

    const lightModeBaseColor = '#95b5e4';
    const lightModeHoverColor = '#02509D';

    const darkModeBaseColor = '#02509D';
    const darkModeHoverColor = '#95b5e4';

    const isDark = mounted ? isDarkTheme : false;

    const baseColor = isDark ? darkModeBaseColor : lightModeBaseColor;
    const hoverColor = isDark ? darkModeHoverColor : lightModeHoverColor;

    const style: React.CSSProperties = {
        WebkitMaskImage: `url(${src})`,
        maskImage: `url(${src})`,
        WebkitMaskRepeat: 'no-repeat',
        maskRepeat: 'no-repeat',
        WebkitMaskPosition: 'center',
        maskPosition: 'center',
        WebkitMaskSize: 'contain',
        maskSize: 'contain',
        backgroundColor: isHovered ? hoverColor : baseColor,
        width,
        height,
        display: 'inline-block',
        transition: 'background-color .35s ease',
    };

    return (
        <Link href={href} target={target}>
            <div className="flex justify-center items-center h-full">
                <div
                    aria-label={alt}
                    role="img"
                    style={style}
                    className="cursor-pointer"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                />
                {/* @ts-ignore */}
                <img src={src} alt={alt} width={1} height={1} fetchPriority="high" className="hidden" />
            </div>
        </Link>
    );
};


