'use client';

import { Link } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import { FaArrowLeft, FaWhatsapp, FaShare } from 'react-icons/fa';
import FacebookIcon from '@/components/svg/FacebookIcon';
import InstagramIcon from '@/components/svg/InstagramIcon';
import LinkedInIcon from '@/components/svg/LinkedInIcon';
import TikTokIcon from '@/components/svg/TikTokIcon';
import TwitterIcon from '@/components/svg/TwitterIcon';
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
    const images = [mainImage];
    const imageRegex = /\[IMAGE:(.*?)\]/g;
    let match;

    while ((match = imageRegex.exec(content)) !== null) {
        if (match[1] && !images.includes(match[1])) {
            images.push(match[1]);
        }
    }

    return images;
};

interface VerticalSocialShareProps {
    url: string;
    title: string;
    description: string;
}

function VerticalSocialShare({ url, title, description }: VerticalSocialShareProps) {
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

    const encodedUrl = encodeURIComponent(fullUrl);
    const shareTextRaw = description ? `${title} - ${description}` : title;
    const encodedShareText = encodeURIComponent(shareTextRaw);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedShareText}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedShareText}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
        whatsapp: `https://wa.me/?text=${encodedShareText}%20${encodedUrl}`,
    };

    const handleNativeShare = async () => {
        if (supportsShare) {
            try {
                await navigator.share({ title, text: description, url: fullUrl });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        }
    };

    const handleInstagramShare = async () => {
        if (supportsShare) {
            try {
                await navigator.share({ title, text: description, url: fullUrl });
                return;
            } catch {
                /* fallback */
            }
        }
        if (typeof navigator !== 'undefined' && 'clipboard' in navigator) {
            try {
                await navigator.clipboard.writeText(fullUrl);
                alert('Enlace copiado al portapapeles. Abre Instagram y pégalo en tu publicación.');
                return;
            } catch {
                /* fallback */
            }
        }
        window.open(fullUrl, '_blank', 'noopener,noreferrer');
    };

    const handleTikTokShare = async () => {
        if (supportsShare) {
            try {
                await navigator.share({ title, text: description, url: fullUrl });
                return;
            } catch {
                /* fallback */
            }
        }
        if (typeof navigator !== 'undefined' && 'clipboard' in navigator) {
            try {
                await navigator.clipboard.writeText(fullUrl);
                alert('Enlace copiado al portapapeles. Abre TikTok y pégalo en tu publicación o bio.');
                return;
            } catch {
                /* fallback */
            }
        }
        window.open(fullUrl, '_blank', 'noopener,noreferrer');
    };

    const socialButtons = [
        { onClick: handleTikTokShare, icon: <TikTokIcon />, label: 'TikTok', bgColor: 'bg-black' },
        { onClick: handleInstagramShare, icon: <InstagramIcon />, label: 'Instagram', bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500' },
        { href: shareLinks.facebook, icon: <FacebookIcon />, label: 'Facebook', bgColor: 'bg-blue-600' },
        { href: shareLinks.twitter, icon: <TwitterIcon />, label: 'Twitter', bgColor: 'bg-black' },
        { href: shareLinks.linkedin, icon: <LinkedInIcon />, label: 'LinkedIn', bgColor: 'bg-blue-700' },
        { href: shareLinks.whatsapp, icon: <FaWhatsapp className="w-5 h-5 text-white" />, label: 'WhatsApp', bgColor: 'bg-green-600' },
    ];

    return (
        <div className="flex flex-col gap-3 items-center">
            <span className="text-xs font-medium text-cb-700 dark:text-cb-300 text-center mb-2">
                Compartir
            </span>
            <div className='flex flex-row flex-wrap gap-3 mx-4 lg:mx-auto lg:flex-col lg:flex-nowrap justify-center items-center'>
                {socialButtons.map((button, index) => (
                    button.onClick ? (
                        <button
                            key={index}
                            onClick={button.onClick}
                            aria-label={button.label}
                            title={button.label}
                            className={`p-2 w-10 h-10 ${button.bgColor} rounded-full flex items-center justify-center shadow-sm hover:shadow-md transform transition duration-200 ease-out hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2`}
                        >
                            {button.icon}
                        </button>
                    ) : (
                        <a
                            key={index}
                            href={button.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={button.label}
                            title={button.label}
                            className={`p-2 w-10 h-10 ${button.bgColor} rounded-full flex items-center justify-center shadow-sm hover:shadow-md transform transition duration-200 ease-out hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2`}
                        >
                            {button.icon}
                        </a>
                    )
                ))}
                {mounted && supportsShare && (
                    <button
                        onClick={handleNativeShare}
                        aria-label="Compartir nativo"
                        title="Compartir nativo"
                        className="p-2 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transform transition duration-200 ease-out hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                    >
                        <FaShare className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                    </button>
                )}
            </div>
        </div>
    );
}

export default function PressShowPage({ article }: { article: any }) {
    const locale = useLocale();
    const images = extractImages(article.content || '', article.imageUrl);
    const [selectedImage, setSelectedImage] = useState(images[0]);

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
            <div className="min-h-screen bg-white dark:bg-cb-full text-gray-900 dark:text-white">
                <div className="max-w-7xl mx-auto px-4 md:px-8 py-8 pt-36">
                    <div className="mb-8">
                        <Link
                            href={`/${locale}/prensa`}
                            className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-cb-600 dark:text-gray-400 dark:hover:text-cb-300 transition-colors duration-300"
                        >
                            <FaArrowLeft className="text-xs" />
                            <span>Volver a Prensa</span>
                        </Link>
                    </div>

                    <div className="flex flex-col lg:flex-row gap-8">
                        <div className="flex-1 max-w-4xl">
                            <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight text-gray-900 dark:text-white">
                                {article.title}
                            </h1>

                            <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base mb-6">
                                {article.category}
                            </p>

                            <p className="text-gray-700 dark:text-gray-300 text-base md:text-lg mb-8 leading-relaxed italic">
                                {article.summary}
                            </p>

                            <div className="mb-6 rounded-lg overflow-hidden">
                                <img
                                    src={selectedImage}
                                    alt={article.imageAlt || article.title}
                                    className="w-full h-auto object-cover"
                                />
                            </div>

                            {images.length > 1 && (
                                <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
                                    {images.map((img, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(img)}
                                            className={`flex-shrink-0 w-32 h-24 rounded overflow-hidden transition-all duration-300 ${selectedImage === img
                                                ? 'ring-4 ring-cb-500 dark:ring-cb-400'
                                                : 'ring-2 ring-gray-300 dark:ring-gray-600 hover:ring-cb-300'
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

                            <p className="text-gray-500 dark:text-gray-400 text-sm mb-8">
                                {formatDateTime(article.publishedAt)}
                            </p>

                            <article className="prose prose-lg dark:prose-invert max-w-none">
                                <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4 text-justify whitespace-pre-line">
                                    {cleanContent}
                                </div>
                            </article>

                            <div className="mt-16 text-center">
                                <Link
                                    href={`/${locale}/prensa`}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-cb-600 text-white hover:bg-cb-700 transition-all duration-300 rounded"
                                >
                                    <span>Ver más noticias</span>
                                    <FaArrowLeft className="rotate-180 text-sm" />
                                </Link>
                            </div>
                        </div>

                        <aside className="lg:w-20 flex-shrink-0">
                            <div className="lg:sticky lg:top-44">
                                <VerticalSocialShare
                                    url={`/${locale}/prensa/${article.slug}`}
                                    title={article.title}
                                    description={article.summary}
                                />
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
