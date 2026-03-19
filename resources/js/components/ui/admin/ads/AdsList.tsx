"use client";

import { useState, useEffect, useCallback } from 'react';

import { Ad } from '@/interfaces/ad.interface';
import { getAds, deleteAd, toggleAdStatus } from '@/actions/ad';
import { Link } from '@inertiajs/react';
import { FormSelect } from '../../form';
import { LineButton } from '../../button/LineButton';
import { IoCalendarClearOutline, IoEyeOutline, IoFingerPrintOutline, IoReload } from 'react-icons/io5';
import { LineButtonLink } from '../../button/LineButtonLink';
import Loader from '../../Loader/Loader';

interface AdsListProps {
    initialAds?: Ad[];
}

export default function AdsList({ initialAds = [] }: AdsListProps) {
    const [ads, setAds] = useState<Ad[]>(initialAds);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState('all'); // all, active, inactive

    const loadAds = useCallback(async () => {
        setLoading(true);
        try {
            const result = await getAds({
                isActive: filter === 'all' ? undefined : filter === 'active'
            });
            if (result.success) {
                setAds(result.data || []);
            }
        } catch (error) {
            console.error('Error loading ads:', error);
        } finally {
            setLoading(false);
        }
    }, [filter]);

    useEffect(() => {
        loadAds();
    }, [loadAds]);

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de que deseas eliminar este anuncio?')) {
            return;
        }

        try {
            const result = await deleteAd(id);
            if (result.success) {
                setAds(ads.filter(ad => ad.id !== id));
            } else {
                alert(result.error || 'Error al eliminar el anuncio');
            }
        } catch (error) {
            console.error('Error deleting ad:', error);
            alert('Error al eliminar el anuncio');
        }
    };

    const handleToggleStatus = async (id: string) => {
        try {
            const result = await toggleAdStatus(id);
            if (result.success) {
                setAds(ads.map(ad =>
                    ad.id === id ? { ...ad, isActive: !ad.isActive } : ad
                ));
            } else {
                alert(result.error || 'Error al cambiar el estado del anuncio');
            }
        } catch (error) {
            console.error('Error toggling ad status:', error);
            alert('Error al cambiar el estado del anuncio');
        }
    };

    const getStatusColor = (isActive: boolean) => {
        return isActive
            ? 'bg-cb-100 text-cb-800 dark:bg-cb-900 dark:text-cb-200'
            : 'bg-cr-100 text-cr-800 dark:bg-cr-900 dark:text-cr-200';
    };

    const getPriorityColor = (priority: number) => {
        if (priority >= 10) return 'bg-red-100 text-red-800';
        if (priority >= 5) return 'bg-yellow-100 text-yellow-800';
        return 'bg-gray-100 text-gray-800';
    };

    if (loading) return <Loader />

    return (
        <div className="space-y-6">
            {/* Header with filters and actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center space-x-4">
                    <FormSelect
                        id="category"
                        name="category"
                        required
                        placeholder="Seleccione"
                        value={filter}
                        onChange={(e) => setFilter(e.target.value)}
                    >
                        <option value="all">Todos</option>
                        <option value="active">Activos</option>
                        <option value="inactive">Inactivos</option>
                    </FormSelect>

                    <LineButton
                        onClick={loadAds}
                        ariaLabel="Actualizar"
                    >
                        <IoReload className="fill-cb-600 stroke-cb-600 hover:fill-cb-300 hover:stroke-cb-600 dark:stroke-white w-5 h-5 sm:w-6 sm:h-6" />
                    </LineButton>
                </div>

                <LineButtonLink
                    href="/admin/ad/create"
                    className='bg-white p-2'
                >
                    + Nuevo Anuncio
                </LineButtonLink>
            </div>

            {/* Ads count */}
            <div className="text-sm text-gray-600 dark:text-gray-400">
                {ads.length} anuncio{ads.length !== 1 ? 's' : ''} encontrado{ads.length !== 1 ? 's' : ''}
            </div>

            {/* Ads list */}
            {ads.length === 0 ? (
                <div className="text-center py-12">
                    <div className="text-gray-500 dark:text-gray-400 mb-4">
                        No hay anuncios disponibles
                    </div>
                    <Link
                        href="/admin/ad/create"
                        className="px-6 py-2 bg-cb-600 text-white font-medium rounded-lg hover:bg-cb-700 focus:ring-2 focus:ring-cb-500 transition-colors"
                    >
                        Crear primer anuncio
                    </Link>
                </div>
            ) : (
                <div className="grid gap-6">
                    {ads.map((ad) => (
                        <div
                            key={ad.id}
                            className="bg-white dark:bg-cb-800 border border-gray-200 dark:border-cb-700 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow"
                        >
                            <div className="flex flex-col lg:flex-row gap-6">
                                {/* Ad preview */}
                                <div className="aspect-video lg:w-1/3">
                                    {ad.imageUrl ? (
                                        <img
                                            src={ad.imageUrl}
                                            alt={ad.title}
                                            width={400}
                                            height={128}
                                            className="w-full h-full object-cover aspect-video"
                                        />
                                    ) : (
                                        <div className="w-full h-32 bg-cb-100 dark:bg-cb-700 rounded-lg flex items-center justify-center">
                                            <span className="text-cb-500 dark:text-cb-400 text-sm">Sin imagen</span>
                                        </div>
                                    )}
                                </div>

                                {/* Ad details */}
                                <div className="lg:w-2/3 space-y-3">
                                    <div className="flex flex-wrap items-start justify-between gap-2">
                                        <h3 className="text-lg font-semibold text-cb-900 dark:text-white line-clamp-2">
                                            {ad.title}
                                        </h3>
                                        <div className="flex flex-wrap gap-2">
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(ad.isActive)}`}>
                                                {ad.isActive ? 'Activo' : 'Inactivo'}
                                            </span>
                                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(ad.priority)}`}>
                                                Prioridad: {ad.priority}
                                            </span>
                                        </div>
                                    </div>

                                    {ad.subtitle && (
                                        <p className="text-sm text-cb-600 dark:text-cb-300">
                                            {ad.subtitle}
                                        </p>
                                    )}

                                    <p className="text-sm text-cb-500 dark:cb-gray-400 line-clamp-2">
                                        {ad.content}
                                    </p>

                                    {/* Metrics */}
                                    <div className="flex flex-wrap gap-4 text-xs text-cb-500 dark:text-cb-400">
                                        <span><IoEyeOutline className="inline mr-1" /> {ad.viewsCount} vistas</span>
                                        <span><IoFingerPrintOutline className="inline mr-1" /> {ad.clicksCount} clicks</span>
                                        <span><IoCalendarClearOutline className="inline mr-1" /> {new Date(ad.createdAt).toLocaleDateString()}</span>
                                    </div>

                                    {/* Display settings */}
                                    <div className="flex flex-wrap gap-2">
                                        {ad.showOnHomepage && (
                                            <span className="px-2 py-1 text-xs bg-blue-50 text-blue-800">
                                                Página principal
                                            </span>
                                        )}
                                        {ad.showOnAllPages && (
                                            <span className="px-2 py-1 text-xs bg-purple-50 text-purple-800">
                                                Todas las páginas
                                            </span>
                                        )}
                                        {ad.targetAudience && ad.targetAudience !== 'all' && (
                                            <span className="px-2 py-1 text-xs bg-orange-50 text-orange-800">
                                                Target: {ad.targetAudience}
                                            </span>
                                        )}
                                    </div>

                                    {/* Actions */}
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        <Link
                                            href={`/admin/ad/edit/${ad.id}`}
                                            className="px-2 sm:px-3 py-1 text-xs border-b border-cb-700 sm:text-sm bg-cb-100 dark:bg-cb-700 text-cb-700 dark:text-cb-300 hover:bg-cb-200 dark:hover:bg-cb-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1  transition-colors"
                                        >
                                            Editar
                                        </Link>
                                        <button
                                            onClick={() => handleToggleStatus(ad.id)}
                                            className="px-2 sm:px-3 py-1 text-xs border-b border-cb-700 sm:text-sm bg-cb-100 dark:bg-cb-700 text-cb-700 dark:text-cb-300 hover:bg-cb-200 dark:hover:bg-cb-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1  transition-colors"
                                        >
                                            {ad.isActive ? 'Desactivar' : 'Activar'}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(ad.id)}
                                            className="px-2 sm:px-3 py-1 text-xs border-b border-cb-700 sm:text-sm bg-cb-100 dark:bg-cb-700 text-cb-700 dark:text-cb-300 hover:bg-cb-200 dark:hover:bg-cb-600 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1  transition-colors"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

