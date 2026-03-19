import React, { useEffect, useState } from "react";
import { usePage } from "@inertiajs/react";
import { CustomCardImage } from "@/components/ui";
import { motion } from "framer-motion";
import { easeOut } from "framer-motion";

interface PressNewsItem {
    id: string;
    src?: string;
    centerText?: string;
    date?: string;
    bottomText?: string;
    slug?: string;
}

function NewsCardSkeleton() {
    return (
        <div className="bg-white dark:bg-white shadow-xl shadow-cb-200/20 animate-pulse">
            <div className="relative h-40 md:h-44 lg:h-48 bg-gray-200">
                <div className="absolute left-4 top-4 z-10 bg-gray-300 w-16 h-16" />
                <div className="absolute left-4 top-20 z-10 bg-gray-200 w-16 h-6" />
            </div>
            <div className="p-4 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-5/6" />
            </div>
        </div>
    );
}

interface NewsLoaderProps {
    limit?: number;
    articles?: any[];
}

export default function NewsLoader({ limit = 3, articles }: NewsLoaderProps) {
    const { url: pathname } = usePage();
    const [items, setItems] = useState<PressNewsItem[]>([]);
    const [isLoading, setIsLoading] = useState(!articles);

    const formatDateForCard = (dateValue: Date | string): string => {
        const date = typeof dateValue === 'string' ? new Date(dateValue) : dateValue;
        if (isNaN(date.getTime())) return "";

        const day = date.getDate();
        const months = [
            'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
            'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
        ];
        const month = months[date.getMonth()];
        const year = date.getFullYear();

        return `${day} de ${month} ${year}`;
    };

    useEffect(() => {
        if (articles) {
            const mappedItems: PressNewsItem[] = articles.map((article) => ({
                id: article.id,
                src: article.imageUrl || article.image_url,
                centerText: article.title,
                date: article.publishedAt || article.published_at
                    ? formatDateForCard(article.publishedAt || article.published_at)
                    : "",
                bottomText: article.summary,
                slug: article.slug,
            }));
            setItems(mappedItems);
            setIsLoading(false);
        }
    }, [articles]);

    // Animation variants for news cards
    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 60,
            scale: 0.95,
        },
        visible: (index: number) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.7,
                delay: index * 0.1,
                ease: easeOut,
            },
        }),
    };

    // Container variants
    const containerVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    if (isLoading) {
        return (
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Array.from({ length: limit }).map((_, index) => (
                        <NewsCardSkeleton key={index} />
                    ))}
                </div>
            </div>
        );
    }

    if (!items || items.length === 0) return null;

    return (
        <motion.div
            className="container mx-auto px-4"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {items.map((item, index) => (
                    <motion.div
                        key={item.id}
                        variants={cardVariants}
                        custom={index}
                        whileHover={{
                            scale: 1.02,
                            y: -5,
                            transition: { duration: 0.3 }
                        }}
                    >
                        <CustomCardImage
                            src={item.src}
                            centerText={item.centerText ?? ""}
                            date={item.date ?? ""}
                            bottomText={item.bottomText ?? ""}
                            href={item.slug ? `/prensa/${item.slug}` : "/prensa"}
                        />
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
}
