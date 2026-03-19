import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { router } from '@inertiajs/react';
import Ad from './Ad';

interface AdItem {
    id: string;
    title: string;
    subtitle?: string | null;
    content: string;
    imageUrl?: string | null;
    buttonText?: string | null;
    buttonUrl?: string | null;
    priority: number;
    startDate?: string | null;
    endDate?: string | null;
}

interface AdModalProps {
    ads?: AdItem[];
    showOnHomepage?: boolean;
    className?: string;
}

const STORAGE_KEY = 'ad_modal_dismissed';
const AD_DURATION = 10000;

export default function AdModal({ ads = [], className = "" }: AdModalProps) {
    const [showAd, setShowAd] = useState(false);
    const [currentAdIndex, setCurrentAdIndex] = useState(0);
    const [progress, setProgress] = useState(0);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const progressIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    // Filter by date range on client
    const activeAds = ads.filter((ad) => {
        const now = new Date();
        if (ad.startDate && now < new Date(ad.startDate)) return false;
        if (ad.endDate && now > new Date(ad.endDate)) return false;
        return true;
    }).sort((a, b) => b.priority - a.priority);

    const clearIntervals = () => {
        if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
        if (progressIntervalRef.current) { clearInterval(progressIntervalRef.current); progressIntervalRef.current = null; }
    };

    const startAdCycle = useCallback(() => {
        clearIntervals();
        setProgress(0);
        progressIntervalRef.current = setInterval(() => {
            setProgress((prev) => prev >= 100 ? 0 : prev + (100 / (AD_DURATION / 100)));
        }, 100);
        intervalRef.current = setInterval(() => {
            setCurrentAdIndex((prev) => (prev + 1) % activeAds.length);
            setProgress(0);
        }, AD_DURATION);
    }, [activeAds.length]);

    useEffect(() => {
        if (typeof localStorage !== 'undefined' && localStorage.getItem(STORAGE_KEY)) return;
        const timer = setTimeout(() => setShowAd(true), 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (activeAds.length > 1 && showAd) startAdCycle();
        return () => clearIntervals();
    }, [activeAds.length, startAdCycle, showAd]);

    const currentAd = activeAds[currentAdIndex];

    useEffect(() => {
        if (currentAd && showAd) {
            router.post(`/es/ads/${currentAd.id}/view`, {}, { preserveState: true, preserveScroll: true });
        }
    }, [currentAdIndex, currentAd?.id, showAd]);

    const handleNext = () => {
        setCurrentAdIndex((prev) => (prev + 1) % activeAds.length);
        setProgress(0);
        if (activeAds.length > 1) startAdCycle();
    };

    const handlePrevious = () => {
        setCurrentAdIndex((prev) => (prev - 1 + activeAds.length) % activeAds.length);
        setProgress(0);
        if (activeAds.length > 1) startAdCycle();
    };

    const handleAdClick = () => {
        if (currentAd) {
            router.post(`/es/ads/${currentAd.id}/click`, {}, { preserveState: true, preserveScroll: true });
        }
    };

    const handleClose = () => {
        setShowAd(false);
        try { localStorage.setItem(STORAGE_KEY, 'true'); } catch { /* ignore */ }
    };

    if (!showAd || !currentAd || activeAds.length === 0) return null;

    return (
        <AnimatePresence>
            {showAd && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={className}
                >
                    <Ad
                        number={currentAd.title}
                        title={currentAd.subtitle || ""}
                        text={currentAd.content}
                        src={currentAd.imageUrl || undefined}
                        buttonTitle={currentAd.buttonText || undefined}
                        buttonLink={currentAd.buttonUrl || undefined}
                        onAdClick={handleAdClick}
                        progress={progress}
                        onNext={handleNext}
                        onPrevious={handlePrevious}
                        hasNext={activeAds.length > 1}
                        hasPrevious={activeAds.length > 1}
                        onClose={handleClose}
                    />
                </motion.div>
            )}
        </AnimatePresence>
    );
}
