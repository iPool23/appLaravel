"use client";

import { useState, useEffect, useCallback } from 'react';
import { Ad } from '@/interfaces/ad.interface';
const getAds = async (r:any) => ({ok:true, ads:[]});

interface UseAdsOptions {
    showOnHomepage?: boolean;
    showOnAllPages?: boolean;
    autoRefresh?: boolean;
    refreshInterval?: number;
}

export function useAds({
    showOnHomepage = true,
    showOnAllPages = false,
    autoRefresh = false,
    refreshInterval = 300000, // 5 minutes
}: UseAdsOptions = {}) {
    const [ads, setAds] = useState<Ad[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const loadAds = useCallback(async () => {
        try {
            setError(null);
            const result = await getAds({
                isActive: true,
                showOnHomepage,
                showOnAllPages,
            });

            if (result.success && result.data) {
                // Filtrar ads activos que están en el período correcto
                const now = new Date();
                const activeAds = result.data.filter((ad: Ad) => {
                    const startDate = ad.startDate ? new Date(ad.startDate) : null;
                    const endDate = ad.endDate ? new Date(ad.endDate) : null;

                    if (startDate && now < startDate) return false;
                    if (endDate && now > endDate) return false;

                    return true;
                });

                // Ordenar por prioridad
                activeAds.sort((a, b) => b.priority - a.priority);

                setAds(activeAds);
            } else {
                setError(result.error || 'Error al cargar anuncios');
            }
        } catch (error) {
            console.error('Error loading ads:', error);
            setError('Error al cargar anuncios');
        } finally {
            setLoading(false);
        }
    }, [showOnHomepage, showOnAllPages]);

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
