'use client';

import React, { useState, useEffect } from "react";
import { Link, router, usePage } from '@inertiajs/react';
import { FaQuoteRight } from "react-icons/fa";
import { Loader2 } from "lucide-react";
import ALogoIcon from "@/components/svg/ALogoIcon";

interface ComunicadoCardProps {
    src?: string;
    bottomText?: string;
    date?: string;
    href?: string;
    logoIcon?: React.ReactNode;
}

const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
};

export default function ComunicadoCard({
    src = "/imgs/placeholder.jpg",
    bottomText = "",
    date = "",
    href = "/",
    logoIcon,
}: ComunicadoCardProps) {
    const [isLoading, setIsLoading] = useState(false);
    const { url: pathname } = usePage();

    useEffect(() => {
        setIsLoading(false);
    }, [pathname]);

    const handleNavigate = (e: React.MouseEvent) => {
        if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;

        e.preventDefault();
        setIsLoading(true);
        router.visit(href);
    };

    return (
        <div className={`relative h-full group rounded-[2rem] transition-all duration-300 ${isLoading ? 'scale-[0.98]' : ''}`}>
            <Link href={href} className="block h-full" onClick={handleNavigate}>
                <article className="bg-white dark:bg-cb-default text-black dark:text-white rounded-[2rem] h-full flex flex-col p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                    {isLoading && (
                        <div className="absolute inset-0 bg-white/80 dark:bg-cb-full/80 flex items-center justify-center z-50">
                            <Loader2 className="w-10 h-10 animate-spin text-cb-default dark:text-white" />
                        </div>
                    )}

                    <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 flex-shrink-0">
                            {logoIcon || <ALogoIcon className="w-full h-full" />}
                        </div>
                        <div className="w-24 h-24 rounded-2xl overflow-hidden relative shadow-md">
                            <img
                                src={src}
                                alt="Comunicado Image"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    <div className="flex-1 my-2 z-10 flex flex-col justify-center">
                        <p className="text-xl md:text-2xl font-medium leading-[1.4] tracking-tight text-cb-default dark:text-white line-clamp-5 min-h-[9rem] md:min-h-[10rem]">
                            &quot;{truncateText(bottomText, 150)}&quot;
                        </p>
                    </div>

                    <div className="mt-8 flex justify-between items-end z-10 relative">
                        <div className="flex flex-col">
                            <span className="text-base font-medium mb-1 text-cb-default dark:text-white">{date}</span>
                            <span className="text-sm tracking-wider opacity-80 uppercase text-cb-default dark:text-white">
                                Alianza Para el Progreso
                            </span>
                        </div>
                    </div>

                    <div className="absolute right-0 bottom-0 translate-y-6 translate-x-4 opacity-10 text-cb-default dark:text-white pointer-events-none group-hover:text-cb-500 group-hover:opacity-20 transition-all duration-300">
                        <FaQuoteRight size={140} />
                    </div>
                </article>
            </Link>
        </div>
    );
}

export function ComunicadoCardSkeleton() {
    return (
        <div className="relative h-full">
            <article className="bg-white dark:bg-cb-default rounded-[2rem] h-full flex flex-col p-8 shadow-lg relative overflow-hidden animate-pulse">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-cb-800 flex-shrink-0"></div>
                    <div className="w-24 h-24 rounded-2xl bg-gray-200 dark:bg-cb-800 shadow-md"></div>
                </div>

                <div className="flex-1 my-2 z-10 space-y-4">
                    <div className="h-7 bg-gray-200 dark:bg-cb-800 rounded-lg w-full"></div>
                    <div className="h-7 bg-gray-200 dark:bg-cb-800 rounded-lg w-full"></div>
                    <div className="h-7 bg-gray-200 dark:bg-cb-800 rounded-lg w-4/5"></div>
                </div>

                <div className="mt-12 flex justify-between items-end z-10 relative">
                    <div className="flex flex-col gap-3">
                        <div className="h-5 bg-gray-200 dark:bg-cb-800 rounded w-24"></div>
                        <div className="h-4 bg-gray-200 dark:bg-cb-800 rounded w-40"></div>
                    </div>
                </div>

                <div className="absolute right-0 bottom-0 translate-y-6 translate-x-4 opacity-5">
                    <div className="w-32 h-32 bg-gray-200 dark:bg-cb-800 rounded-full"></div>
                </div>
            </article>
        </div>
    );
}
