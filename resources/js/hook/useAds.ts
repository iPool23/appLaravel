"use client";

import { useState, useEffect, useCallback } from 'react';
import type { Ad } from '@/interfaces/ad.interface';
const getAds = async (): Promise<{ success: boolean; data: Ad[]; error?: string }> => ({ success: true, data: [], error: undefined });

interface UseAdsOptions {
    showOnHomepage?: boolean;
    showOnAllPages?: boolean;
    autoRefresh?: boolean;
    refreshInterval?: number;
}

export function useAds({
    autoRefresh = false,
    refreshInterval = 300000, // 5 minutes
}: UseAdsOptions = {}) {
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadAds = useCallback(async () => {
        try {
            setError(null);
            const result = await getAds();

            if (result.success && result.data) {
                const now = new Date();
                const activeAds = result.data.filter((ad: Ad) => {
                    const sd = ad.startDate ? new Date(ad.startDate) : null;
                    const ed = ad.endDate ? new Date(ad.endDate) : null;

                    if (sd && now < sd) return false;
                    if (ed && now > ed) return false;

                    return true;
                });

                activeAds.sort((a, b) => (b.priority || 0) - (a.priority || 0));
                setAds(activeAds);
            } else {
                setError(result.error || 'Error al cargar anuncios');
            }
        } catch (err: any) {
            console.error('Error loading ads:', err);
            setError('Error al cargar anuncios');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        loadAds();
    }, [loadAds]);

    useEffect(() => {
        if (autoRefresh) {
            const interval = setInterval(loadAds, refreshInterval);
            return () => clearInterval(interval);
        }
    }, [autoRefresh, refreshInterval, loadAds]);

    const refreshAds = () => {
        setLoading(true);
        loadAds();
    };

    return {
        ads,
        loading,
        error,
        refreshAds,
    };
}
