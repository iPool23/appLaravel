"use client";

import { BorderButton } from '@/components/ui/button/BorderButton';
import { Link } from '@inertiajs/react';
import ALogoIcon from '@/components/svg/ALogoIcon';

import SocialLinksModal from '@/components/ui/modal/SocialLinksModal';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface AdProps {
    title?: string;
    number?: string;
    text?: string;
    buttonTitle?: string;
    buttonLink?: string;
    src?: string;
    progress?: number;
    onNext?: () => void;
    onPrevious?: () => void;
    hasNext?: boolean;
    hasPrevious?: boolean;
    onAdClick?: () => void;
    onClose?: () => void;
}

const Ad = ({
    src = "/imgs/prensa/2025-02-21-1.webp",
    number = "Â¡Noticia!",
    title = "Gobernador de La Libertad, CÃ©sar AcuÃ±a lidera acciones ante lluvias en la regiÃ³n",
    text = "Se coordina activamente la respuesta ante las intensas lluvias que afectan la regiÃ³n. Su gestiÃ³n ha dispuesto maquinaria pesada, apoyo logÃ­stico y asistencia a las familias damnificadas, en lÃ­nea con el compromiso de APP con el bienestar ciudadano.",
    buttonTitle = "",
    buttonLink = "",
    progress = 0,
    onNext,
    onPrevious,
    hasNext = false,
    hasPrevious = false,
    onAdClick,
    onClose
}: AdProps) => {
    const [showAd, setShowAd] = useState(true);

    const handleInternalClose = () => {
        setShowAd(false);
        if (onClose) onClose();
    };

    if (!showAd) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[99] p-4 sm:p-4">
            <div className="flex flex-col w-full max-h-[90vh] sm:h-auto sm:max-h-[95vh] dark:from-cb-950 dark:to-cb-900">
                <main className="flex items-center justify-center overflow-hidden">
                    <div className="relative w-full max-w-[95vw] sm:max-w-md md:max-w-lg lg:max-w-4xl xl:max-w-5xl flex items-center">
                        {/* Fondo del modal */}
                        <div className="absolute inset-0 bg-white dark:bg-cb-900 rounded-lg sm:rounded-2xl shadow-2xl border border-cb-200 dark:border-cb-700"></div>

                        {/* Barra de progreso */}
                        <div className="absolute top-0 left-0 w-full h-4 sm:h-4 bg-zinc-300 dark:bg-cb-700 rounded-t-lg sm:rounded-t-2xl overflow-hidden z-20">
                            <div
                                className="h-full bg-gradient-to-r from-cb-600 via-cb-500 to-cb-600 transition-all duration-300 ease-linear"
                                style={{ width: `${progress}%` }}
                            ></div>
                        </div>

                        {/* BotÃ³n anterior */}
                        {hasPrevious && (
                            <button
                                onClick={onPrevious}
                                className="absolute left-1 sm:left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-30 w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white dark:bg-cb-800 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-cb-700 transition-colors border border-cb-200 dark:border-cb-600"
                                aria-label="Anuncio anterior"
                            >
                                <FaChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-cb-600" />
                            </button>
                        )}

                        {/* BotÃ³n siguiente */}
                        {hasNext && (
                            <button
                                onClick={onNext}
                                className="absolute right-1 sm:right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-30 w-7 h-7 sm:w-9 sm:h-9 md:w-10 md:h-10 bg-white dark:bg-cb-800 rounded-full flex items-center justify-center hover:bg-gray-100 dark:hover:bg-cb-700 transition-colors border border-cb-200 dark:border-cb-600"
                                aria-label="Siguiente anuncio"
                            >
                                <FaChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-cb-600" />
                            </button>
                        )}

                        {/* Contenido principal */}
                        <div className="relative flex flex-col items-center text-center justify-center z-10 w-full overflow-y-auto py-6 px-4 sm:!py-6 sm:px-4 md:py-8 md:px-6 max-h-[85vh] sm:max-h-none">
                            {/* Logo */}
                            <div className="mb-2 sm:mb-3 md:mb-4 flex-shrink-0">
                                <ALogoIcon className='w-12 h-12 sm:w-20 sm:h-20 md:w-28 md:h-28 lg:w-36 lg:h-36' />
                            </div>

                            {/* NÃºmero/CategorÃ­a */}
                            <h2 className="text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-cb-700 dark:text-cb-300 mb-1 sm:mb-2 md:mb-3 tracking-tighter flex-shrink-0">
                                {number}
                            </h2>

                            {/* TÃ­tulo */}
                            <h3 className="text-sm sm:text-lg md:text-xl lg:text-2xl font-bold text-cb-600 dark:text-cb-400 mb-2 sm:mb-3 md:mb-4 tracking-wide px-2 leading-tight flex-shrink-0">
                                {title.length > (typeof window !== 'undefined' && window.innerWidth >= 640 ? 70 : 50)
                                    ? `${title.slice(0, (typeof window !== 'undefined' && window.innerWidth >= 640 ? 70 : 90))}...`
                                    : title}
                            </h3>

                            {/* Texto descriptivo */}
                            <p className="text-xs sm:text-sm md:text-base text-cb-500 dark:text-cb-300 max-w-xs sm:max-w-md md:max-w-4xl mb-3 sm:mb-4 md:mb-6 leading-relaxed px-2 flex-shrink-0">
                                {text.length > (typeof window !== 'undefined' && window.innerWidth >= 640 ? 200 : 50)
                                    ? `${text.slice(0, (typeof window !== 'undefined' && window.innerWidth >= 640 ? 200 : 90))}...`
                                    : text}
                            </p>

                            {/* Imagen */}
                            <div
                                className="relative w-full max-w-[280px] sm:max-w-[350px] md:max-w-[450px] lg:max-w-[550px] mb-3 sm:mb-4 md:mb-6 cursor-pointer flex-shrink-0"
                                role="button"
                                onClick={() => {
                                    if (onAdClick) onAdClick();
                                    if (buttonLink) {
                                        try {
                                            window.location.href = buttonLink;
                                        } catch (e) {
                                            /* ignore navigation errors */
                                        }
                                    }
                                }}
                            >
                                <img
                                    src={src}
                                    alt={title}
                                    width={600}
                                    height={200}
                                    className="w-full h-[120px] sm:h-[140px] md:h-[180px] lg:h-[200px] object-cover rounded-lg sm:rounded-xl shadow-lg border-t-2 border-cb-default"
                                    priority
                                />
                            </div>

                            {/* InformaciÃ³n de contacto */}
                            <p className="hidden sm:block text-[10px] sm:text-xs md:text-sm text-cb-400 dark:text-cb-500 mb-2 sm:mb-3 md:mb-4 px-2 flex-shrink-0">
                                MÃ¡s informaciÃ³n: <Link href="/contacto" className='underline hover:text-cb-700 transition-colors duration-300'> ContÃ¡ctanos </Link>
                            </p>

                            {/* Separador decorativo - Solo en pantallas medianas y grandes */}
                            <div className="hidden sm:flex items-center py-1 w-full max-w-xs md:max-w-md mb-2 md:mb-4 flex-shrink-0">
                                <div className="flex-1 border-t border-cb-default dark:border-cb-600"></div>
                                <div className="px-3 sm:px-4 md:px-6">
                                    <div className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 bg-cb-600 rounded-full flex items-center justify-center">
                                        <span className="text-white font-bold text-[10px] sm:text-xs">APP</span>
                                    </div>
                                </div>
                                <div className="flex-1 border-t border-cb-default dark:border-cb-600"></div>
                            </div>

                            {/* Botones de acciÃ³n */}
                            <div className="flex flex-row gap-2 sm:gap-3 md:gap-4 px-2 flex-shrink-0 w-full max-w-xs sm:max-w-md justify-center items-center">
                                <button
                                    onClick={handleInternalClose}
                                    className="w-fit px-4 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base font-medium text-cb-600 dark:text-cb-400 bg-transparent border-2 border-cb-600 dark:border-cb-400 rounded-lg hover:bg-cb-50 dark:hover:bg-cb-800 hover:border-cb-700 dark:hover:border-cb-300 transition-all duration-300"
                                >
                                    Cerrar
                                </button>
                                {buttonTitle && (
                                    <Link
                                        href={buttonLink || '#'}
                                        onClick={() => { if (onAdClick) onAdClick(); }}
                                        className="w-fit px-4 py-2 sm:px-6 sm:py-2.5 text-sm sm:text-base font-medium text-white bg-cb-600 dark:bg-cb-500 border-2 border-cb-600 dark:bg-cb-500 rounded-lg hover:bg-cb-700 dark:hover:bg-cb-600 hover:border-cb-700 dark:hover:border-cb-600 transition-all duration-300 text-center"
                                    >
                                        {buttonTitle}
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Ad;
