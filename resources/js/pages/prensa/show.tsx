'use client';

import { Link } from '@inertiajs/react';
import { useState, useEffect, useCallback } from 'react';
import { FaArrowLeft, FaWhatsapp, FaShare, FaChevronLeft, FaChevronRight, FaTimes, FaSearchPlus } from 'react-icons/fa';
import FacebookIcon from '@/components/svg/FacebookIcon';
import InstagramIcon from '@/components/svg/InstagramIcon';
import LinkedInIcon from '@/components/svg/LinkedInIcon';
import TikTokIcon from '@/components/svg/TikTokIcon';
import TwitterIcon from '@/components/svg/TwitterIcon';
import ContainerTodo from '@/components/ui/container/ContainerTodo';
import AppLayout from '@/layouts/AppLayout';
import { useLocale } from '@/lib/i18n';

const formatDateTime = (date: string): string => {
    const months = [
        'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
        'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
    ];
    const d = new Date(date);
    const hours = d.getHours();
    const minutes = d.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'p. m.' : 'a. m.';
    const displayHours = hours % 12 || 12;
    return `${d.getDate()} de ${months[d.getMonth()]} de ${d.getFullYear()} - ${displayHours}:${minutes} ${ampm}`;
};

const extractImages = (content: string, mainImage: string): string[] => {
    const images = mainImage ? [mainImage] : [];
    const imageRegex = /\[IMAGE:(.*?)\]/g;
    let match;
    while ((match = imageRegex.exec(content)) !== null) {
        if (match[1] && !images.includes(match[1])) images.push(match[1]);
    }
    return images;
};

// ─────────────────────────────────────────────
// Lightbox modal
// ─────────────────────────────────────────────
interface LightboxProps {
    images: string[];
    index: number;
    onClose: () => void;
    onNavigate: (idx: number) => void;
    alt?: string;
}

function Lightbox({ images, index, onClose, onNavigate, alt }: LightboxProps) {
    const hasPrev = index > 0;
    const hasNext = index < images.length - 1;

    // Keyboard navigation
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose();
            if (e.key === 'ArrowLeft'  && hasPrev) onNavigate(index - 1);
            if (e.key === 'ArrowRight' && hasNext) onNavigate(index + 1);
        };
        window.addEventListener('keydown', handleKey);
        // Lock body scroll
        document.body.style.overflow = 'hidden';
        return () => {
            window.removeEventListener('keydown', handleKey);
            document.body.style.overflow = '';
        };
    }, [index, hasPrev, hasNext, onClose, onNavigate]);

    return (
        <div
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            role="dialog"
            aria-modal="true"
            aria-label="Visor de imagen"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/90 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Close button */}
            <button
                onClick={onClose}
                aria-label="Cerrar visor"
                className="absolute top-4 right-4 z-10 w-11 h-11 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-all duration-200"
            >
                <FaTimes className="w-5 h-5" />
            </button>

            {/* Image counter */}
            {images.length > 1 && (
                <span className="absolute top-4 left-1/2 -translate-x-1/2 z-10 text-white/70 text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
                    {index + 1} / {images.length}
                </span>
            )}

            {/* Prev arrow */}
            {hasPrev && (
                <button
                    onClick={() => onNavigate(index - 1)}
                    aria-label="Imagen anterior"
                    className="absolute left-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-all duration-200 hover:scale-110"
                >
                    <FaChevronLeft className="w-5 h-5" />
                </button>
            )}

            {/* Image */}
            <div className="relative z-10 max-w-[90vw] max-h-[90vh] flex items-center justify-center">
                <img
                    src={images[index]}
                    alt={alt ?? `Imagen ${index + 1}`}
                    className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl select-none"
                    draggable={false}
                />
            </div>

            {/* Next arrow */}
            {hasNext && (
                <button
                    onClick={() => onNavigate(index + 1)}
                    aria-label="Imagen siguiente"
                    className="absolute right-4 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white transition-all duration-200 hover:scale-110"
                >
                    <FaChevronRight className="w-5 h-5" />
                </button>
            )}

            {/* Thumbnail strip (only if multiple images) */}
            {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 max-w-[90vw] overflow-x-auto px-2">
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={(e) => { e.stopPropagation(); onNavigate(i); }}
                            className={`flex-shrink-0 w-14 h-10 rounded overflow-hidden transition-all duration-200 ${
                                i === index
                                    ? 'ring-2 ring-white scale-110'
                                    : 'ring-1 ring-white/40 opacity-60 hover:opacity-100'
                            }`}
                        >
                            <img src={img} alt="" className="w-full h-full object-cover" draggable={false} />
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}

// ─────────────────────────────────────────────
// Floating social panel
// ─────────────────────────────────────────────
interface FloatingSocialPanelProps {
    url: string;
    title: string;
    description: string;
}

function FloatingSocialPanel({ url, title, description }: FloatingSocialPanelProps) {
    const [open, setOpen] = useState(true);
    const [mounted, setMounted] = useState(false);
    const [supportsShare, setSupportsShare] = useState(false);

    const baseUrl = 'https://app.pe';
    const fullUrl = url.startsWith('http') ? url : baseUrl + url;

    useEffect(() => {
        const handle = requestAnimationFrame(() => {
            setMounted(true);
            setSupportsShare(typeof navigator !== 'undefined' && 'share' in navigator);
        });
        return () => cancelAnimationFrame(handle);
    }, []);

    const encodedUrl         = encodeURIComponent(fullUrl);
    const shareTextRaw       = description ? `${title} - ${description}` : title;
    const encodedShareText   = encodeURIComponent(shareTextRaw);
    const encodedTitle       = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedShareText}`,
        twitter:  `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedShareText}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
        whatsapp: `https://wa.me/?text=${encodedShareText}%20${encodedUrl}`,
    };

    const handleNativeShare = async () => {
        if (supportsShare) {
            try { await navigator.share({ title, text: description, url: fullUrl }); } catch { /* silent */ }
        }
    };

    const copyAndAlert = async (msg: string) => {
        if (supportsShare) {
            try { await navigator.share({ title, text: description, url: fullUrl }); return; } catch { /* fallback */ }
        }
        if (typeof navigator !== 'undefined' && 'clipboard' in navigator) {
            try { await navigator.clipboard.writeText(fullUrl); alert(msg); return; } catch { /* fallback */ }
        }
        window.open(fullUrl, '_blank', 'noopener,noreferrer');
    };

    const socialButtons = [
        { onClick: () => copyAndAlert('Enlace copiado. Abre TikTok y pégalo en tu publicación.'),   icon: <TikTokIcon />,                              label: 'TikTok',     bg: 'bg-black' },
        { onClick: () => copyAndAlert('Enlace copiado. Abre Instagram y pégalo en tu publicación.'), icon: <InstagramIcon />,                            label: 'Instagram',  bg: 'bg-gradient-to-b from-purple-500 to-pink-500' },
        { href: shareLinks.facebook,  icon: <FacebookIcon />,                                        label: 'Facebook',   bg: 'bg-blue-600' },
        { href: shareLinks.twitter,   icon: <TwitterIcon />,                                         label: 'X / Twitter',bg: 'bg-black' },
        { href: shareLinks.linkedin,  icon: <LinkedInIcon />,                                        label: 'LinkedIn',   bg: 'bg-blue-700' },
        { href: shareLinks.whatsapp,  icon: <FaWhatsapp className="w-5 h-5 text-white" />,           label: 'WhatsApp',   bg: 'bg-green-500' },
    ];

    return (
        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-50 flex items-center" aria-label="Panel de compartir en redes sociales">
            <div className={`overflow-hidden transition-all duration-300 ease-in-out ${open ? 'max-w-[4rem]' : 'max-w-0'}`}>
                <div
                    className="flex flex-col gap-3 py-4 px-2 bg-white dark:bg-cb-900 shadow-xl border border-gray-200 dark:border-cb-700 rounded-r-2xl"
                    style={{ maxHeight: 'calc(100vh - 120px)' }}
                >
                    {socialButtons.map((btn, i) =>
                        btn.onClick ? (
                            <button key={i} onClick={btn.onClick} aria-label={btn.label} title={btn.label}
                                className={`w-10 h-10 ${btn.bg} rounded-full flex items-center justify-center shadow hover:shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none`}>
                                {btn.icon}
                            </button>
                        ) : (
                            <a key={i} href={btn.href} target="_blank" rel="noopener noreferrer" aria-label={btn.label} title={btn.label}
                                className={`w-10 h-10 ${btn.bg} rounded-full flex items-center justify-center shadow hover:shadow-lg hover:scale-110 active:scale-95 transition-all duration-200 focus:outline-none`}>
                                {btn.icon}
                            </a>
                        )
                    )}
                    {mounted && supportsShare && (
                        <button onClick={handleNativeShare} aria-label="Compartir nativo" title="Compartir"
                            className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center shadow hover:shadow-lg hover:scale-110 active:scale-95 transition-all duration-200">
                            <FaShare className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                        </button>
                    )}
                </div>
            </div>

            <button
                onClick={() => setOpen(prev => !prev)}
                aria-label={open ? 'Ocultar opciones de compartir' : 'Mostrar opciones de compartir'}
                title={open ? 'Ocultar' : 'Compartir'}
                className="flex items-center justify-center w-6 h-14 bg-white dark:bg-cb-900 border border-gray-200 dark:border-cb-700 rounded-r-xl shadow-md text-gray-500 dark:text-gray-400 hover:text-cb-600 dark:hover:text-cb-300 transition-colors duration-200"
            >
                {open ? <FaChevronLeft className="w-3 h-3" /> : <FaChevronRight className="w-3 h-3" />}
            </button>
        </div>
    );
}

// ─────────────────────────────────────────────
// Main page
// ─────────────────────────────────────────────
export default function PressShowPage({ article }: { article: any }) {
    const locale = useLocale();
    const images = extractImages(article.content || '', article.imageUrl);
    const [selectedImage, setSelectedImage] = useState(images[0]);
    const [currentIndex, setCurrentIndex] = useState(0);

    // Lightbox state
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

    const openLightbox = useCallback((idx: number) => setLightboxIndex(idx), []);
    const closeLightbox = useCallback(() => setLightboxIndex(null), []);
    const navigateLightbox = useCallback((idx: number) => setLightboxIndex(idx), []);

    // Carousel Logic: Auto-play every 5s
    useEffect(() => {
        if (images.length <= 1 || lightboxIndex !== null) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [images.length, lightboxIndex]);

    // Sync selectedImage with currentIndex
    useEffect(() => {
        setSelectedImage(images[currentIndex]);
    }, [currentIndex, images]);

    const handlePrev = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    const handleNext = useCallback((e?: React.MouseEvent) => {
        e?.stopPropagation();
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const cleanContent = article.content?.replace(/\[IMAGE:(.*?)\]/g, '') || '';

    return (
        <AppLayout
            title={article.metaTitle ?? article.title}
            description={article.metaDescription ?? article.summary}
            image={article.imageUrl}
            keywords={[article.category, 'APP', 'Alianza Para el Progreso', 'prensa', article.author].filter(Boolean)}
            type="article"
            canonicalPath={`/${locale}/prensa/${article.slug}`}
            publishedTime={new Date(article.publishedAt).toISOString()}
        >
            {/* Lightbox */}
            {lightboxIndex !== null && (
                <Lightbox
                    images={images}
                    index={lightboxIndex}
                    onClose={closeLightbox}
                    onNavigate={navigateLightbox}
                    alt={article.imageAlt || article.title}
                />
            )}

            {/* Floating share panel */}
            <FloatingSocialPanel
                url={`/${locale}/prensa/${article.slug}`}
                title={article.title}
                description={article.summary ?? ''}
            />

            <div className="min-h-screen bg-white dark:bg-cb-full text-gray-900 dark:text-white pb-20">
                <ContainerTodo className="pt-36">
                    {/* Back link */}
                    <div className="mb-8">
                        <Link
                            href={`/${locale}/prensa`}
                            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-cb-600 dark:text-gray-400 dark:hover:text-cb-300 transition-colors duration-300"
                        >
                            <FaArrowLeft className="text-xs" />
                            <span>Volver a Prensa</span>
                        </Link>
                    </div>

                    <div className="flex flex-col gap-10">
                        {/* Header side: Title & Category & Summary */}
                        <div className="w-full">
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight text-gray-900 dark:text-white">
                                {article.title}
                            </h1>

                            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mb-8 border-l-4 border-cb-500 pl-4">
                                <span className="text-cb-600 dark:text-cb-400 font-bold uppercase tracking-wider text-sm">
                                    {article.category}
                                </span>
                                <span className="text-gray-400 dark:text-gray-600">•</span>
                                <span className="text-gray-500 dark:text-gray-400 text-sm">
                                    {formatDateTime(article.publishedAt)}
                                </span>
                            </div>

                            <p className="text-gray-700 dark:text-gray-300 text-xl md:text-2xl leading-relaxed italic opacity-90">
                                {article.summary}
                            </p>
                        </div>

                        {/* Visual block: Carousel with navigation */}
                        <div className="w-full flex flex-col items-center">
                            <div
                                className="w-full max-w-full mb-6 rounded-2xl overflow-hidden relative group shadow-2xl bg-gray-100 dark:bg-gray-900 flex justify-center h-[400px] md:h-[600px]"
                                role="region"
                                aria-label="Carrusel de imágenes"
                            >
                                {/* Main Image */}
                                <img
                                    src={selectedImage}
                                    alt={article.imageAlt || article.title}
                                    className="h-full w-full object-contain transition-all duration-700 opacity-100 scale-100"
                                    key={selectedImage} // Force transition on source change
                                />

                                {/* Overlays: Navigation Arrows (Only if >1 images) */}
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={handlePrev}
                                            className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                                            aria-label="Imagen anterior"
                                        >
                                            <FaChevronLeft className="w-5 h-5" />
                                        </button>
                                        <button
                                            onClick={handleNext}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 flex items-center justify-center rounded-full bg-black/30 hover:bg-black/60 text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                                            aria-label="Imagen siguiente"
                                        >
                                            <FaChevronRight className="w-5 h-5" />
                                        </button>
                                    </>
                                )}

                                {/* Bottom Overlay: Zoom & Counter */}
                                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex justify-between items-end">
                                    <button
                                        onClick={() => openLightbox(currentIndex)}
                                        className="bg-white/20 backdrop-blur-md text-white px-6 py-3 rounded-full text-sm font-medium flex items-center gap-2 hover:bg-white/40 transition-colors"
                                    >
                                        <FaSearchPlus className="w-4 h-4" />
                                        Ver en pantalla completa
                                    </button>
                                    {images.length > 1 && (
                                        <span className="text-white/80 text-sm font-medium bg-black/40 px-3 py-1 rounded-full">
                                            {currentIndex + 1} / {images.length}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Thumbnail strip */}
                            {images.length > 1 && (
                                <div className="w-full flex gap-3 overflow-x-auto pb-4 custom-scrollbar scroll-smooth justify-center">
                                    {images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setCurrentIndex(index)}
                                            aria-label={`Ver imagen ${index + 1}`}
                                            className={`flex-shrink-0 w-32 h-24 md:w-40 md:h-28 rounded-xl overflow-hidden transition-all duration-300 relative group ${
                                                currentIndex === index
                                                    ? 'ring-4 ring-cb-500 scale-105 shadow-lg opacity-100 grayscale-0'
                                                    : 'opacity-60 hover:opacity-100 hover:scale-105 grayscale hover:grayscale-0'
                                            }`}
                                        >
                                            <img
                                                src={img}
                                                alt={`Imagen ${index + 1}`}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Article Content */}
                        <div className="w-full">
                            <article className="prose dark:prose-invert max-w-none">
                                <div className="
                                    text-gray-800 dark:text-gray-200
                                    leading-[2]
                                    space-y-8
                                    text-justify
                                    whitespace-pre-line
                                    text-[1.15rem] md:text-[1.25rem]
                                    w-full
                                ">
                                    {cleanContent}
                                </div>
                            </article>

                            {/* Bottom CTA */}
                            <div className="mt-20 border-t border-gray-100 dark:border-cb-800 pt-10">
                                <Link
                                    href={`/${locale}/prensa`}
                                    className="group inline-flex items-center gap-3 px-8 py-4 bg-cb-default text-white hover:bg-cb-700 transition-all duration-300 rounded-xl font-bold shadow-lg shadow-cb-500/20"
                                >
                                    <FaArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                                    <span>Explorar más noticias</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </ContainerTodo>
            </div>
        </AppLayout>
    );
}
