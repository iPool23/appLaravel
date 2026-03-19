import { useState, useEffect } from 'react';
import { router } from '@inertiajs/react';
import { Ad, CreateAdRequest } from '@/interfaces/ad.interface';
import { createAd, updateAd, getAdById } from '@/actions/ad';

interface AdFormProps {
    adId?: string;
    initialData?: Ad;
}

export default function AdForm({ adId, initialData }: AdFormProps) {
    
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState<CreateAdRequest>({
        title: '',
        subtitle: '',
        content: '',
        imageUrl: '',
        buttonText: '',
        buttonUrl: '',
        isActive: true,
        priority: 0,
        showOnHomepage: true,
        showOnAllPages: false,
        targetAudience: 'all',
    });

    useEffect(() => {
        if (initialData) {
            setFormData({
                title: initialData.title,
                subtitle: initialData.subtitle || '',
                content: initialData.content,
                imageUrl: initialData.imageUrl || '',
                buttonText: initialData.buttonText || '',
                buttonUrl: initialData.buttonUrl || '',
                isActive: initialData.isActive,
                priority: initialData.priority,
                showOnHomepage: initialData.showOnHomepage,
                showOnAllPages: initialData.showOnAllPages,
                targetAudience: initialData.targetAudience || 'all',
                startDate: initialData.startDate || undefined,
                endDate: initialData.endDate || undefined,
            });
        }
    }, [initialData]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            let result;

            if (adId) {
                result = await updateAd({ id: adId, ...formData });
            } else {
                result = await createAd(formData);
            }

            if (result.success) {
                router.visit('/admin/ad');
            } else {
                alert(result.error || 'Error al guardar el anuncio');
            }
        } catch (error) {
            console.error('Error saving ad:', error);
            alert('Error al guardar el anuncio');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked
                : type === 'number' ? parseInt(value) || 0
                    : value,
        }));
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                    {adId ? 'Editar Anuncio' : 'Crear Nuevo Anuncio'}
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                    {adId ? 'Modifica los datos del anuncio' : 'Completa la información para crear un nuevo anuncio'}
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Información básica */}
                <div className="bg-white dark:bg-cb-800 p-6 rounded-lg border border-gray-200 dark:border-cb-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Información Básica
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Título *
                            </label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                required
                                className="w-full px-4 py-2 border border-gray-300 dark:border-cb-600 rounded-lg focus:ring-2 focus:ring-cb-500 focus:border-cb-500 dark:bg-cb-700 dark:text-white"
                                placeholder="Título del anuncio"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Subtítulo
                            </label>
                            <input
                                type="text"
                                name="subtitle"
                                value={formData.subtitle}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-cb-600 rounded-lg focus:ring-2 focus:ring-cb-500 focus:border-cb-500 dark:bg-cb-700 dark:text-white"
                                placeholder="Subtítulo opcional"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Contenido *
                            </label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                required
                                rows={4}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-cb-600 rounded-lg focus:ring-2 focus:ring-cb-500 focus:border-cb-500 dark:bg-cb-700 dark:text-white"
                                placeholder="Contenido del anuncio"
                            />
                        </div>

                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                URL de Imagen
                            </label>
                            <input
                                type="url"
                                name="imageUrl"
                                value={formData.imageUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-cb-600 rounded-lg focus:ring-2 focus:ring-cb-500 focus:border-cb-500 dark:bg-cb-700 dark:text-white"
                                placeholder="https://ejemplo.com/imagen.jpg"
                            />
                        </div>
                    </div>
                </div>

                {/* Botón de acción */}
                <div className="bg-white dark:bg-cb-800 p-6 rounded-lg border border-gray-200 dark:border-cb-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Botón de Acción
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Texto del Botón
                            </label>
                            <input
                                type="text"
                                name="buttonText"
                                value={formData.buttonText}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-cb-600 rounded-lg focus:ring-2 focus:ring-cb-500 focus:border-cb-500 dark:bg-cb-700 dark:text-white"
                                placeholder="Ej: Leer más"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                URL del Botón
                            </label>
                            <input
                                type="url"
                                name="buttonUrl"
                                value={formData.buttonUrl}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-cb-600 rounded-lg focus:ring-2 focus:ring-cb-500 focus:border-cb-500 dark:bg-cb-700 dark:text-white"
                                placeholder="https://ejemplo.com/enlace"
                            />
                        </div>
                    </div>
                </div>

                {/* Configuración */}
                <div className="bg-white dark:bg-cb-800 p-6 rounded-lg border border-gray-200 dark:border-cb-700">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Configuración
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Prioridad
                            </label>
                            <input
                                type="number"
                                name="priority"
                                value={formData.priority}
                                onChange={handleChange}
                                min="0"
                                max="100"
                                className="w-full px-4 py-2 border border-gray-300 dark:border-cb-600 rounded-lg focus:ring-2 focus:ring-cb-500 focus:border-cb-500 dark:bg-cb-700 dark:text-white"
                            />
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                0 = Baja, 100 = Alta prioridad
                            </p>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                Audiencia Objetivo
                            </label>
                            <select
                                name="targetAudience"
                                value={formData.targetAudience}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-cb-600 rounded-lg focus:ring-2 focus:ring-cb-500 focus:border-cb-500 dark:bg-cb-700 dark:text-white"
                            >
                                <option value="all">Todos</option>
                                <option value="members">Solo miembros</option>
                                <option value="visitors">Solo visitantes</option>
                            </select>
                        </div>

                        <div className="md:col-span-2">
                            <div className="space-y-2">
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="isActive"
                                        checked={formData.isActive}
                                        onChange={handleChange}
                                        className="rounded border-gray-300 text-cb-600 focus:ring-cb-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        Anuncio activo
                                    </span>
                                </label>

                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="showOnHomepage"
                                        checked={formData.showOnHomepage}
                                        onChange={handleChange}
                                        className="rounded border-gray-300 text-cb-600 focus:ring-cb-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        Mostrar en página principal
                                    </span>
                                </label>

                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        name="showOnAllPages"
                                        checked={formData.showOnAllPages}
                                        onChange={handleChange}
                                        className="rounded border-gray-300 text-cb-600 focus:ring-cb-500"
                                    />
                                    <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                        Mostrar en todas las páginas
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Botones de acción */}
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="px-6 py-2 border border-gray-300 dark:border-cb-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-cb-700 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-cb-600 text-white rounded-lg hover:bg-cb-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? 'Guardando...' : adId ? 'Actualizar' : 'Crear'} Anuncio
                    </button>
                </div>
            </form>
        </div>
    );
}
