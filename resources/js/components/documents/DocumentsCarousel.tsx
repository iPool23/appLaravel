import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { RiFilePdf2Fill, RiMegaphoneFill, RiFile2Fill } from "react-icons/ri";
import { FaDownload } from "react-icons/fa";
import { Link, router, usePage } from "@inertiajs/react";
import { Loader2 } from "lucide-react";
import ALogoIcon from "@/components/svg/ALogoIcon";

interface Document {
    id: string;
    title: string;
    slug: string;
    description?: string | null;
    category: string;
    iconType: string;
    publishedAt?: Date | string | null;
}

function getIcon(iconType: string, className = "w-14 h-14") {
    switch (iconType) {
        case "megaphone":
            return <RiMegaphoneFill className={className} />;
        case "file":
            return <RiFile2Fill className={`${className} text-cb-500`} />;
        default:
            return <RiFilePdf2Fill className={`${className} text-red-600`} />;
    }
}

export function DocumentCard({ doc, locale }: { doc: Document; locale: string }) {
    const [isLoading, setIsLoading] = useState(false);
    const { url: pathname } = usePage();

    useEffect(() => {
        setIsLoading(false);
    }, [pathname]);

    const formatDate = (d: Date | string | null | undefined) => {
        if (!d) return "";
        const date = typeof d === "string" ? new Date(d) : d;
        if (!date || isNaN(date.getTime())) return "";
        return date.toLocaleDateString("es-PE", {
            day: "numeric",
            month: "long",
            year: "numeric",
        });
    };

    const href = `/${locale}/descarga/${doc.slug}`;

    const handleNavigate = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsLoading(true);
        router.visit(href);
    };

    return (
        <div className={`relative h-full group rounded-4xl transition-all duration-300 ${isLoading ? 'scale-[0.98]' : ''}`}>
            <Link href={href} className="block h-full" onClick={handleNavigate}>
                <article className="bg-white dark:bg-cb-default text-black dark:text-white rounded-4xl h-full flex flex-col p-8 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden">
                    {isLoading && (
                        <div className="absolute inset-0 bg-white/80 dark:bg-cb-full/80 flex items-center justify-center z-50">
                            <Loader2 className="w-10 h-10 animate-spin text-cb-default dark:text-white" />
                        </div>
                    )}

                    <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 shrink-0">
                            <ALogoIcon className="w-full h-full" />
                        </div>
                        <div className="w-24 h-24 rounded-2xl overflow-hidden relative shadow-md flex items-center justify-center bg-cr-50 dark:bg-cb-800">
                            <div className="text-cr-600 dark:text-cr-400">
                                {getIcon(doc.iconType, "w-12 h-12")}
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 my-2 z-10 flex flex-col justify-center">
                        <p className="text-xl md:text-2xl font-medium leading-[1.4] tracking-tight text-cb-default dark:text-white line-clamp-5 min-h-36 md:min-h-40">
                            {doc.title}
                        </p>
                    </div>

                    <div className="mt-8 flex justify-between items-end z-10 relative">
                        <div className="flex flex-col">
                            <span className="text-base font-medium mb-1 text-cb-default dark:text-white">{formatDate(doc.publishedAt)}</span>
                            <span className="text-sm tracking-wider opacity-80 uppercase text-cb-default dark:text-white">
                                {doc.category}
                            </span>
                        </div>
                    </div>

                    <div className="absolute right-0 bottom-0 translate-y-6 translate-x-4 opacity-10 text-cb-default dark:text-white pointer-events-none group-hover:text-cb-500 group-hover:opacity-20 transition-all duration-300">
                        <FaDownload size={140} />
                    </div>
                </article>
            </Link>
        </div>
    );
}

function DocumentCardSkeleton() {
    return (
        <div className="relative h-full">
            <article className="bg-white dark:bg-cb-default rounded-4xl h-full flex flex-col p-8 shadow-lg relative overflow-hidden animate-pulse">
                <div className="flex justify-between items-start mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-cb-800 shrink-0"></div>
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
            </article>
        </div>
    );
}

interface DocumentsCarouselProps {
    title?: string;
    documents?: Document[];
}

export default function DocumentsCarousel({ title, documents }: DocumentsCarouselProps) {
    const [items, setItems] = useState<Document[]>([]);
    const [isLoading, setIsLoading] = useState(!documents);
    const { props } = usePage();
    const locale = (props as any).locale || 'es';

    useEffect(() => {
        if (documents) {
            setItems(documents);
            setIsLoading(false);
        }
    }, [documents]);

    if (isLoading) {
        return (
            <div className="py-8">
                {title && (
                    <div className="flex items-center gap-4 mb-8">
                        <div className="h-8 w-4 bg-cb-default rounded-sm" />
                        <h3 className="text-2xl md:text-3xl font-bold text-cb-default dark:text-white uppercase tracking-tight">
                            {title}
                        </h3>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {Array.from({ length: 3 }).map((_, i) => (
                        <DocumentCardSkeleton key={i} />
                    ))}
                </div>
            </div>
        );
    }

    if (!items || items.length === 0) return null;

    return (
        <div className="py-2">
            {title && (
                <div className="flex items-center gap-4 mb-8">
                    <div className="h-8 w-4 bg-cb-default rounded-sm" />
                    <h3 className="text-2xl md:text-3xl font-bold text-cb-default dark:text-white uppercase tracking-tight">
                        {title}
                    </h3>
                </div>
            )}
            <Swiper
                modules={[Navigation, Autoplay]}
                spaceBetween={24}
                slidesPerView={1}
                navigation
                autoplay={{ delay: 5000, disableOnInteraction: false }}
                breakpoints={{
                    640: { slidesPerView: 2 },
                    1024: { slidesPerView: 3 },
                }}
                className="pb-8 pt-4 px-4"
            >
                {items.map((doc, index) => (
                    <SwiperSlide key={`doc-${doc.id || doc.slug || index}`} className="h-auto! flex pb-2">
                        <DocumentCard doc={doc} locale={locale} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
