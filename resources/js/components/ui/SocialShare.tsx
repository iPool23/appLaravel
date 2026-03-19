'use client';

import React from 'react';
import FacebookIcon from '@/components/svg/FacebookIcon';
import TwitterIcon from '@/components/svg/TwitterIcon';
import LinkedInIcon from '@/components/svg/LinkedInIcon';
import InstagramIcon from '@/components/svg/InstagramIcon';
import TikTokIcon from '@/components/svg/TikTokIcon';
import { FaWhatsapp, FaShare } from 'react-icons/fa';
import SocialLinks from './social/SocialLinks';

interface SocialShareProps {
    url?: string;
    title: string;
    description?: string;
}

export default function SocialShare({ url, title, description = '' }: SocialShareProps) {
    const [fullUrl, setFullUrl] = React.useState('');

    React.useEffect(() => {
        if (typeof window !== 'undefined' && url) {
            const baseUrl = 'https://app.pe';

            setFullUrl(url.startsWith('http') ? url : baseUrl + url);
        }
    }, [url]);

    const encodedUrl = encodeURIComponent(fullUrl);
    const encodedTitle = encodeURIComponent(title);
    const encodedDescription = encodeURIComponent(description);
    const shareTextRaw = description ? `${title} - ${description}` : title;
    const encodedShareText = encodeURIComponent(shareTextRaw);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedShareText}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedShareText}`,
        linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodedUrl}&title=${encodedTitle}&summary=${encodedDescription}`,
        whatsapp: `https://wa.me/?text=${encodedShareText}%20${encodedUrl}`,
    };

    const handleNativeShare = async () => {
        if (typeof navigator !== 'undefined' && 'share' in navigator) {
            try {
                await navigator.share({
                    title,
                    text: description,
                    url: fullUrl,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        }
    };

    const handleInstagramShare = async () => {
        if (typeof navigator !== 'undefined' && 'share' in navigator) {
            try {
                await navigator.share({ title, text: description, url: fullUrl });
                return;
            } catch (err) {
            }
        }

        if (typeof navigator !== 'undefined' && 'clipboard' in navigator) {
            try {
                await navigator.clipboard.writeText(fullUrl);
                alert('Enlace copiado al portapapeles. Abre Instagram y pÃ©galo en tu publicaciÃ³n.');
                return;
            } catch (err) {
            }
        }

        window.open(fullUrl, '_blank', 'noopener,noreferrer');
    };

    const handleTikTokShare = async () => {
        if (typeof navigator !== 'undefined' && 'share' in navigator) {
            try {
                await navigator.share({ title, text: description, url: fullUrl });
                return;
            } catch (err) {
            }
        }

        if (typeof navigator !== 'undefined' && 'clipboard' in navigator) {
            try {
                await navigator.clipboard.writeText(fullUrl);
                alert('Enlace copiado al portapapeles. Abre TikTok y pÃ©galo en tu publicaciÃ³n o bio.');
                return;
            } catch (err) {
            }
        }

        window.open(fullUrl, '_blank', 'noopener,noreferrer');
    };

    if (!url || !fullUrl) {
        return null;
    }

    return (
        <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-cb-700 dark:text-cb-300 hidden sm:inline">
                Compartir:
            </span>
            <div className="flex items-center gap-3">
                <SocialLinks
                    size="md"
                    alignment="center"
                    socialLinks={[
                        { href: '#', icon: <TikTokIcon />, label: 'TikTok', bgColor: 'bg-black', onClick: handleTikTokShare },
                        { href: '#', icon: <InstagramIcon />, label: 'Instagram', bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500', onClick: handleInstagramShare },
                        { href: shareLinks.facebook, icon: <FacebookIcon />, label: 'Facebook', bgColor: 'bg-blue-600' },
                        { href: shareLinks.twitter, icon: <TwitterIcon />, label: 'Twitter', bgColor: 'bg-black' },
                        { href: shareLinks.linkedin, icon: <LinkedInIcon />, label: 'LinkedIn', bgColor: 'bg-blue-700' },
                        { href: shareLinks.whatsapp, icon: <FaWhatsapp className="w-5 h-5 text-white" />, label: 'WhatsApp', bgColor: 'bg-green-600' },
                    ]}
                />
                {typeof navigator !== 'undefined' && 'share' in navigator && (
                    <button
                        onClick={handleNativeShare}
                        aria-label="Compartir nativo"
                        title="Compartir nativo"
                        className="ml-2 p-2 w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm hover:shadow-md transform transition duration-200 ease-out hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400"
                    >
                        <FaShare className="w-4 h-4 text-gray-700 dark:text-gray-200" />
                        <span className="sr-only">Compartir</span>
                    </button>
                )}
            </div>
        </div>
    );
}
