"use client";

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Ad } from '@/interfaces/ad.interface';
const getAds = async (r:any) => ({ok:true, ads:[]}); const incrementAdView = async (id:string) => {}; const incrementAdClick = async (id:string) => {};
import { Link } from '@inertiajs/react';

import { BorderButton } from '@/components/ui/button/BorderButton';
import ALogoIcon from '@/components/svg/ALogoIcon';

interface AdDisplayProps {
    showOnHomepage?: boolean;
    showOnAllPages?: boolean;
    className?: string;
}

export default function AdDisplay({ showOnHomepage = true, showOnAllPages = false, className = "" }: AdDisplayProps) {
    const [ads, setAds] = useState<Ad[]>([]);
    const [currentAdIndex, setCurrentAdIndex] = useState(0);
    const [loading, setLoading] = useState(true);

    const loadAds = useCallback(async () => {
        try {
            const result = await getAds({
                isActive: true,
                showOnHomepage,
                showOnAllPages,
            });

            if (result.success && result.data) {
                const activeAds = result.data.filter((ad: Ad) => {
                    const now = new Date();
                    const startDate = ad.startDate ? new Date(ad.startDate) : null;
                    const endDate = ad.endDate ? new Date(ad.endDate) : null;
                    if (startDate && now < startDate) return false;
                    if (endDate && now > endDate) return false;
                    return true;
                });
                setAds(activeAds);
            }
        } catch (error) {
            console.error('Error loading ads:', error);
        } finally {
            setLoading(false);
        }
    }, [showOnHomepage, showOnAllPages]);

    useEffect(() => {
        loadAds();
    }, [loadAds]);

    useEffect(() => {
        if (ads.length > 1) {
            const interval = setInterval(() => {
                setCurrentAdIndex((prev) => (prev + 1) % ads.length);
            }, 10000); // Cambiar cada 10 segundos

            return () => clearInterval(interval);
        }
    }, [ads.length]);


    const handleAdView = async (adId: string) => {
        try {
            await incrementAdView(adId);
        } catch (error) {
            console.error('Error tracking ad view:', error);
        }
    };

    const handleAdClick = async (adId: string) => {
        try {
            await incrementAdClick(adId);
        } catch (error) {
            console.error('Error tracking ad click:', error);
        }
    };

    const currentAd = ads[currentAdIndex];

    useEffect(() => {
        if (currentAd) {
            handleAdView(currentAd.id);
        }
    }, [currentAdIndex, currentAd]);

    if (loading || !currentAd) {
        return null;
    }

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 ${className}`}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentAd.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="relative max-w-3xl w-full"
                >
                    <div className="absolute inset-0 bg-white dark:bg-cb-900 rounded-2xl shadow-2xl border border-cb-200 dark:border-cb-700"></div>
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cb-600 via-cb-500 to-cb-600 rounded-t-2xl"></div>

                    <div className="relative flex flex-col items-center text-center z-10 p-8">
                        {/* Close button */}
                        <button
                            onClick={() => window.history.back()}
                            className="absolute top-4 right-4 w-8 h-8 bg-gray-200 dark:bg-cb-700 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-cb-600 transition-colors"
                        >
                            <span className="text-gray-600 dark:text-gray-300 text-xl">Ã—</span>
                        </button>

                        <div className="mb-4">
                            <ALogoIcon className='w-44 h-44' />
                        </div>

                        <h2 className="text-6xl md:text-7xl font-bold text-cb-700 dark:text-cb-300 mb-4 tracking-tighter">
                            {currentAd.title}
                        </h2>

                        <h3 className="text-2xl md:text-3xl font-bold text-cb-600 dark:text-cb-400 mb-6 tracking-wide">
                            {currentAd.subtitle}
                        </h3>


                        <p className="text-base text-cb-500 dark:text-cb-300 max-w-lg mb-8 leading-relaxed">
                            {currentAd.content}
                        </p>

                        {currentAd.imageUrl && (
                            <img
                                src={currentAd.imageUrl}
                                alt={currentAd.title}
                                width={600}
                                height={200}
                                className="w-[600px] h-[200px] object-cover border-t-2 border-cb-default rounded-b-xl shadow-lg mb-8"
                                priority
                            />
                        )}

                        <p className="text-sm text-cb-400 dark:text-cb-500 mb-4">
                            MÃ¡s informaciÃ³n: <Link href="/contacto" className='underline'> ContÃ¡ctanos </Link>
                        </p>

                        <div className="flex items-center py-4 w-full max-w-md mb-4">
                            <div className="flex-1 border-t-2 border-cb-default dark:border-cb-600"></div>
                            <div className="px-6">
                                <div className="w-8 h-8 bg-cb-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-xs">APP</span>
                                </div>
                            </div>
                            <div className="flex-1 border-t-2 border-cb-default dark:border-cb-600"></div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4">
                            <BorderButton
                                text="Cerrar"
                                onClick={() => window.history.back()}
                                className="min-w-[200px] bg-transparent hover:bg-cb-50 text-cb-600 border-cb-600 hover:border-cb-700 dark:hover:bg-cb-800 dark:text-cb-400"
                            />
                            {currentAd.buttonText && currentAd.buttonUrl && (
                                <BorderButton
                                    text={currentAd.buttonText}
                                    href={currentAd.buttonUrl}
                                    onClick={() => handleAdClick(currentAd.id)}
                                    className="min-w-[200px] bg-transparent hover:bg-cb-50 text-cb-600 border-cb-600 hover:border-cb-700 dark:hover:bg-cb-800 dark:text-cb-400"
                                />
                            )}
                        </div>

                        {/* Ad indicators */}
                        {ads.length > 1 && (
                            <div className="flex space-x-2 mt-6">
                                {ads.map((_, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setCurrentAdIndex(index)}
                                        className={`w-3 h-3 rounded-full transition-colors ${index === currentAdIndex
                                            ? 'bg-cb-600'
                                            : 'bg-gray-300 dark:bg-cb-600 hover:bg-cb-400'
                                            }`}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
}

