"use client";

import { Title } from "../typography/Title";
import ContainerTodo from "../container/ContainerTodo";
import { useTheme } from "@/hook/useTheme";
import { useEffect, useState } from "react";

interface BannerWithBackgroundProps {
    title?: string;
    src?: string;
    srcDark?: string;
    className?: string;
    titleColor?: string;
    titleFontSize?: "sm" | "lg" | "xl" | "2xl" | "3xl" | "4xl" | "5xl" | "6xl" | "7xl" | "8xl" | "md";
}

export default function BannerWithBackground({
    title = "",
    src = "/imgs/fondo/fondo-contacto.webp",
    srcDark = "/imgs/fondo/fondo-contacto.webp",
    className = "",
    titleColor = "text-white dark:text-white",
    titleFontSize = "4xl",
}: BannerWithBackgroundProps) {
    const [mounted, setMounted] = useState(false);
    const { theme, systemTheme } = useTheme();
    const currentTheme = theme === 'system' ? systemTheme : theme;

    useEffect(() => {
        setMounted(true);
    }, []);

    const isDark = mounted ? currentTheme === 'dark' : false;
    const backgroundImage = isDark ? srcDark : src;

    return (
        <div className="relative w-full overflow-hidden pt-16 sm:pt-20 md:pt-20 lg:pt-28">
            <div className={`relative w-full overflow-hidden py-20 md:py-32 ${className}`}>
                <div className="absolute inset-0">
                    <img
                        src={backgroundImage}
                        alt="Fondo del banner"
                        fetchPriority="high"
                        className="w-full h-full object-cover object-top"
                    />
                </div>

                <div className="absolute inset-0" />

                <ContainerTodo>
                    <div className="relative z-10 flex items-center justify-center text-center">
                        <Title
                            title={title}
                            fontSize={titleFontSize}
                            className="tracking-tight font-bold max-w-4xl"
                            color={titleColor}
                        />
                    </div>
                </ContainerTodo>
            </div>
        </div>
    );
}
