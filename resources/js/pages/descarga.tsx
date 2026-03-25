import { useForm } from '@inertiajs/react';
import AnimatedSectionTitle from '@/components/ui/AnimatedSectionTitle';
import ContainerSingle from '@/components/ui/container/ContainerSingle';
import ContainerTodo from '@/components/ui/container/ContainerTodo';
import AppLayout from '@/layouts/AppLayout';

interface FileData {
    id: string | number;
    name: string;
    originalName: string;
    filePath: string;
    description?: string;
    isPublicDocument?: boolean;
}

export default function DescargaPage({ file }: { file: FileData }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        subscribeToBulletin: false,
    });

    const isDirectDownload = file.isPublicDocument || !file.filePath.includes('descarga-protegida');

    return (
        <AppLayout title={file.name} robots="noindex,nofollow">
            <ContainerSingle className="pt-20">
                <ContainerTodo>
                    <AnimatedSectionTitle
                        smallTitle="Archivos Públicos"
                        mainTitleSegments={[
                            { text: file.name.toUpperCase(), breakAfter: false },
                        ]}
                    />

                    {file.description && (
                        <p className="text-cb-600 dark:text-cb-300 text-center mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
                            {file.description}
                        </p>
                    )}

                    <div className="flex flex-col items-center w-full max-w-5xl mx-auto space-y-12">
                        {/* Preview Iframe */}
                        <div className="w-full aspect-[4/3] md:aspect-video rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-cb-800 bg-white dark:bg-cb-900">
                            <iframe
                                src={file.filePath}
                                width="100%"
                                height="100%"
                                className="w-full h-full"
                                title={file.name}
                            />
                        </div>

                        {/* Download Section / Form */}
                        <div className="w-full max-w-xl">
                            {!isDirectDownload ? (
                                <div className="rounded-[2.5rem] border border-gray-200 bg-white p-10 shadow-xl dark:border-gray-800 dark:bg-cb-default">
                                    <h2 className="text-2xl font-black uppercase text-cb-default dark:text-white mb-6 text-center">Formulario de Descarga</h2>
                                    <form onSubmit={(e) => { e.preventDefault(); post(window.location.pathname); }} className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-cb-default dark:text-gray-300 ml-4">Correo electrónico</label>
                                            <input 
                                                value={data.email} 
                                                onChange={(e) => setData('email', e.target.value)} 
                                                type="email" 
                                                placeholder="tu@correo.com" 
                                                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-6 py-4 focus:bg-white focus:ring-2 focus:ring-cb-default dark:border-gray-700 dark:bg-cb-950 outline-none transition-all" 
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold text-cb-default dark:text-gray-300 ml-4">Contraseña de descarga</label>
                                            <input 
                                                value={data.password} 
                                                onChange={(e) => setData('password', e.target.value)} 
                                                type="password" 
                                                placeholder="••••••••" 
                                                className="w-full rounded-2xl border border-gray-200 bg-gray-50 px-6 py-4 focus:bg-white focus:ring-2 focus:ring-cb-default dark:border-gray-700 dark:bg-cb-950 outline-none transition-all" 
                                            />
                                        </div>
                                        <label className="flex items-center gap-3 text-sm text-cb-600 dark:text-gray-300 ml-4 cursor-pointer">
                                            <input 
                                                className="w-5 h-5 rounded-md border-gray-300 text-cb-default focus:ring-cb-default transition-all"
                                                checked={data.subscribeToBulletin} 
                                                onChange={(e) => setData('subscribeToBulletin', e.target.checked)} 
                                                type="checkbox" 
                                            />
                                            Suscribirme al boletín informativo
                                        </label>
                                        
                                        {(errors.email || errors.password) && (
                                            <div className="p-4 bg-red-50 dark:bg-red-900/20 rounded-2xl border border-red-100 dark:border-red-900/30">
                                                {errors.email && <p className="text-sm text-red-600 dark:text-red-400 font-medium">{errors.email}</p>}
                                                {errors.password && <p className="text-sm text-red-600 dark:text-red-400 font-medium">{errors.password}</p>}
                                            </div>
                                        )}

                                        <button 
                                            disabled={processing} 
                                            className="w-full rounded-full bg-cb-default py-5 font-black uppercase text-white shadow-lg shadow-cb-default/30 transition-all hover:bg-cb-700 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 text-lg tracking-wider"
                                        >
                                            {processing ? 'Validando...' : 'Descargar Archivo'}
                                        </button>
                                    </form>
                                </div>
                            ) : (
                                <div className="text-center">
                                    <a
                                        href={file.filePath}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center rounded-full bg-cr-600 px-12 py-5 text-xl font-black uppercase text-white shadow-xl shadow-cr-600/30 transition-all hover:bg-cr-700 hover:scale-105 active:scale-95 tracking-widest"
                                    >
                                        Descargar {file.name}
                                    </a>
                                    <p className="mt-6 text-gray-500 dark:text-gray-400 font-medium italic">
                                        Haga clic en el botón superior para descargar el documento original.
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                </ContainerTodo>
            </ContainerSingle>
        </AppLayout>
    );
}
