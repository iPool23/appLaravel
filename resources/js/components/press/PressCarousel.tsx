import { usePage } from "@inertiajs/react";
import React from "react";
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { CustomCardImage, ComunicadoCard } from "@/components/ui";
import { ComunicadoCardSkeleton } from "@/components/ui/card/ComunicadoCard";
import { CustomCardImageSkeleton } from "@/components/ui/card/CustomCardImage";

import 'swiper/css';
import 'swiper/css/navigation';

interface PressCarouselProps {
    type: 'Prensa' | 'Comunicado';
    title: string;
    items?: any[];
}

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

const truncateText = (text: string, maxLength: number = 150): string => {
    if (!text) return "";
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength).trim() + '...';
};

export default function PressCarousel({ type, title, items: articles }: PressCarouselProps) {
    const { props } = usePage();
    const locale = (props as any).locale || 'es';

    const items = articles || [];
    const isLoading = !articles;

    if (isLoading) {
        return (
            <div className="py-8">
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-8 w-4 bg-cb-default rounded-sm"></div>
                    <h3 className="text-2xl md:text-3xl font-bold text-cb-default dark:text-white uppercase tracking-tight">{title}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                        type === 'Comunicado' ? <ComunicadoCardSkeleton key={i} /> : <CustomCardImageSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (!items || items.length === 0) return null;

    return (
        <div className="py-8">
            <div className="flex items-center gap-4 mb-8">
                <div className="h-8 w-4 bg-cb-default rounded-sm"></div>
                <h3 className="text-2xl md:text-3xl font-bold text-cb-default dark:text-white uppercase tracking-tight">{title}</h3>
            </div>
            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                navigation
                autoplay={{ delay: 5000 + (type === 'Comunicado' ? 1000 : 0), disableOnInteraction: false }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="pb-8 pt-4 px-4"
            >
                {items.map((item, index) => {
                    const articleUrl = `/${locale}/prensa/${item.slug}`;
                    const uniqueKey = `${type}-${item.id || item.slug || index}`;
                    
                    return (
                        <SwiperSlide key={uniqueKey} className="h-auto! flex pb-2">{type === 'Comunicado' ? (
                                <ComunicadoCard
                                    src={item.imageUrl || item.image_url}
                                    date={item.publishedAt || item.published_at ? formatDateForCard(item.publishedAt || item.published_at) : ""}
                                    bottomText={truncateText(item.content || item.summary || item.description || "", 150)}
                                    href={articleUrl}
                                />
                            ) : (
                                <CustomCardImage
                                    src={item.imageUrl || item.image_url}
                                    centerText={item.title}
                                    date={item.publishedAt || item.published_at ? formatDateForCard(item.publishedAt || item.published_at) : ""}
                                    bottomText={truncateText(item.summary || item.description || "", 150)}
                                    href={articleUrl}
                                    socialLink={articleUrl}
                                />
                            )}
                        </SwiperSlide>
                    );
                })}
            </Swiper>
        </div>
    );
}
