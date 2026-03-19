"use client";


import React, { useEffect, useState } from 'react';
const STORAGE_KEY = 'convocatorias_popup_dismissed_at';

export default function ConvocatoriasPopup() {
    const [visible, setVisible] = useState(false);
    const [pdfUrl, setPdfUrl] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Obtener la URL del PDF activo desde la API
        fetch('/api/convocatoria-info')
            .then(res => res.json())
            .then(data => {
                if (data.fileUrl) {
                    setPdfUrl(data.fileUrl);
                }
            })
            .catch(err => console.error('Error al cargar PDF:', err))
            .finally(() => setLoading(false));

        const timer = setTimeout(() => {
            setVisible(true);
        }, 0);
        return () => clearTimeout(timer);
    }, []);

    const dismiss = () => {
        try {
            localStorage.setItem(STORAGE_KEY, String(Date.now()));
        } catch (e) {
            /* ignore */
        }
        setVisible(false);
    };

    if (!visible || loading || !pdfUrl) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black bg-opacity-50" onClick={dismiss} />

            <div className="relative z-10 w-full max-w-md bg-white dark:bg-cb-900 rounded-lg shadow-xl overflow-hidden">
                <div className="p-4 flex flex-col items-center gap-4">
                    <img
                        src="/imgs/logo/logo.png"
                        alt="Alianza para el Progreso Logo"
                        width={300}
                        height={300}
                    />
                    <h3 className="text-lg font-bold text-cb-700 dark:text-cb-200">Comunicado</h3>
                    <div className='max-w-xl'>
                        <p className="text-sm text-cb-500 dark:text-cb-400 mt-1 text-center">
                            Elecciones de delegados por afiliados
                        </p>
                    </div>
                    <div className="flex flex-col gap-2 items-center">
                        <a
                            href={pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-2 bg-cb-600 text-white rounded hover:bg-cb-700 transition-colors text-sm"
                        >
                            Descargar PDF
                        </a>

                        <button
                            onClick={dismiss}
                            className="px-3 py-2 bg-transparent border border-cb-200 rounded text-cb-600 hover:bg-cb-50 transition-colors text-sm"
                        >
                            Cerrar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

