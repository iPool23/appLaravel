
import { Grid } from "../grid/Grid";
import { GridItem } from "../grid/GridItem";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import { useTranslations } from '@/lib/i18n';

interface SectionVideoProps {
    videoId?: string;
    title?: string;
    description?: string;
    imageSrc?: string;
    quote?: string;
    author?: string;
    authorTitle?: string;
}

export default function SectionVideo({
    videoId = "BRo-JELFtek",
    title,
    description,
    imageSrc = "/imgs/webalianza.jpg",
    quote,
    author,
    authorTitle
}: SectionVideoProps) {
    const t = useTranslations('home.video');
    const [videoError, setVideoError] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);

    // Usar traducciones si no se pasan props
    const displayTitle = title ?? t('title');
    const displayDescription = description ?? t('description');
    const displayQuote = quote ?? t('quote');
    const displayAuthor = author ?? t('author');
    const displayAuthorTitle = authorTitle ?? t('authorTitle');

    const handlePlayVideo = () => {
        setIsPlaying(true);
    };

    return (
        <>
            <div className="mx-auto max-w-5xl relative z-20 mt-0 md:mt-44">
                <div className="aspect-video w-full">
                    {!isPlaying ? (
                        <div
                            className="w-full h-full bg-linear-to-br from-cb-600 to-cb-800 overflow-hidden cursor-pointer group transition-all duration-300 rounded-4xl"
                            onClick={handlePlayVideo}
                        >
                            <div className="relative h-full flex items-center justify-center">
                                <div className="absolute inset-0 bg-linear-to-br from-cb-600 to-cb-800">
                                    <img
                                        src={`./imgs/webalianza.jpg`}
                                        alt={displayTitle}
                                        className="w-full h-full object-cover object-center"
                                    />
                                </div>

                                <div className="relative z-10 text-center text-white p-6 flex flex-col items-center">
                                    <div className="flex items-center justify-center mb-4">
                                        <div className="relative">
                                            <div className="relative flex items-center justify-center">
                                                <div className="rounded-full w-14 h-14 bg-white flex items-center justify-center transition-transform group-hover:scale-105">
                                                    <svg className="w-4 h-4 text-cr-default ml-1" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M8 5v14l11-7z" />
                                                    </svg>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold mb-2">
                                        {displayTitle}
                                    </h3>
                                    <p className="text-sm opacity-90 mb-4">
                                        {displayDescription}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : !videoError ? (
                        <iframe
                            src={`https://www.youtube-nocookie.com/embed/${videoId}?rel=0&modestbranding=1&enablejsapi=1&autoplay=1&mute=0`}
                            title={displayTitle}
                            className="w-full h-full border-0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            referrerPolicy="strict-origin-when-cross-origin"
                            onError={() => setVideoError(true)}
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                            <div className="text-center p-8">
                                <p className="text-gray-600 dark:text-gray-400 mb-4">Video no disponible temporalmente</p>
                                <a
                                    href={`https://www.youtube.com/watch?v=${videoId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-block bg-red-600 text-white px-6 py-3 hover:bg-red-700 transition-colors"
                                >
                                    Ver en YouTube
                                </a>
                            </div>
                        </div>
                    )}

                </div>
            </div>

            <div className="relative -mt-72 md:-mt-96 z-10">
                <div className="bg-cb-default text-white py-8 pt-80 pb-24">
                    <div className="flex items-start gap-6 mt-8 md:mt-32 max-w-5xl mx-auto">
                        <Grid className="px-8 md:px-0">
                            <GridItem colSpan={2}>
                                <div className="flex items-center justify-center">
                                    <div className="relative w-24 h-24 rounded-full overflow-hidden">
                                        <img src="/imgs/directive/cesar-acuna.png" alt={displayAuthor} width={96} height={96} className="object-cover bg-cb-200" />
                                    </div>
                                </div>
                            </GridItem>

                            <GridItem colSpan={10}>
                                <blockquote className="text-lg md:text-xl text-center md:text-start leading-relaxed font-bold">{displayQuote}</blockquote>

                                <div className="mt-6 border-t border-white/10 pt-6 flex items-center justify-between">
                                    <div>
                                        <div className="text-lg font-bold">{displayAuthor}/ <span className="font-normal">{displayAuthorTitle}</span></div>
                                    </div>

                                    <div className="flex items-center gap-1 text-red-600">
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                        <FaStar />
                                    </div>
                                </div>
                            </GridItem>
                        </Grid>
                    </div>
                </div>
            </div>
        </>
    );
}
