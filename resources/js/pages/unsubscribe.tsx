import React, { useState, useEffect } from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, CheckCircle2, ArrowRight, Home, LayoutPanelLeft, UserMinus, ShieldCheck } from 'lucide-react';
import AppLayout from '@/layouts/AppLayout';
import ContainerSingle from '@/components/ui/container/ContainerSingle';
import ContainerTodo from '@/components/ui/container/ContainerTodo';
import { InteractiveLogo } from '@/components/ui/logo/InteractiveLogo';
import { useLocale } from '@/lib/i18n';

interface UnsubscribeProps {
    email?: string;
}

export default function UnsubscribePage({ email = '' }: UnsubscribeProps) {
    const locale = useLocale();
    const { props } = usePage<{ flash?: { success?: boolean } }>();
    const [showSuccess, setShowSuccess] = useState(!!props.flash?.success);

    const { data, setData, post, processing, errors } = useForm({
        email: email || '',
    });

    useEffect(() => {
        if (props.flash?.success) setShowSuccess(true);
    }, [props.flash?.success]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(window.location.pathname, {
            preserveScroll: true,
            onSuccess: () => setShowSuccess(true),
        });
    };

    return (
        <AppLayout 
            title="Gestionar Suscripción" 
            robots="noindex,nofollow"
            description="Gestiona tus preferencias de suscripción al boletín informativo de Alianza Para el Progreso."
        >
            <div className='pt-24'></div>
            <ContainerSingle className="relative bg-white dark:bg-cb-full min-h-[90vh] flex items-center justify-center pt-16 pb-24 overflow-hidden">
                {/* Background Decorative Blobs */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-cb-default/5 dark:bg-cb-default/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cb-400/5 dark:bg-cb-default/10 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />

                <ContainerTodo className="relative z-10">
                    <AnimatePresence mode="wait">
                        {!showSuccess ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                                className="relative bg-white/70 dark:bg-cb-default/10 backdrop-blur-2xl border border-gray-100 dark:border-cb-300/10 rounded-[3rem] shadow-[0_32px_128px_-32px_rgba(0,0,0,0.15)] dark:shadow-none overflow-hidden max-w-2xl mx-auto"
                            >
                                <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-red-500 via-orange-400 to-red-500" />

                                <div className="p-8 md:p-16 flex flex-col items-center">
                                    <div className="mb-12">
                                        <InteractiveLogo src="/imgs/logo/logo.png" alt="Logo APP" width={120} height={120} href={`/${locale}`} />
                                    </div>

                                    <div className="text-center mb-12">
                                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-sm font-bold mb-6">
                                            <UserMinus size={16} />
                                            Gestionar Baja
                                        </div>
                                        <h1 className="text-3xl md:text-4xl font-black uppercase tracking-tighter text-gray-900 dark:text-white leading-none">
                                            ¿Deseas dejar de recibir <br />
                                            <span className="text-cb-default dark:text-cb-400">nuestro boletín?</span>
                                        </h1>
                                        <p className="mt-6 text-gray-500 dark:text-gray-400 font-medium">
                                            Sentimos que te vayas. Ingresa tu correo para confirmar la desuscripción.
                                        </p>
                                    </div>

                                    <form onSubmit={handleSubmit} className="w-full space-y-8">
                                        <div className="relative group">
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-cb-default transition-colors">
                                                <Mail size={24} />
                                            </div>
                                            <input
                                                type="email"
                                                required
                                                placeholder="Tu correo electrónico"
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                className="w-full pl-16 pr-6 py-6 rounded-3xl border border-gray-200 dark:border-cb-300/10 bg-white dark:bg-cb-full text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-cb-default/10 focus:border-red-500/50 transition-all text-xl shadow-inner"
                                            />
                                        </div>

                                        {errors.email && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="p-4 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 rounded-2xl text-red-600 dark:text-red-400 text-sm font-bold text-center"
                                            >
                                                {errors.email}
                                            </motion.div>
                                        )}

                                        <button
                                            disabled={processing}
                                            className="w-full bg-gray-900 dark:bg-white dark:text-gray-900 hover:bg-red-600 hover:text-white dark:hover:bg-red-600 dark:hover:text-white text-white font-black uppercase tracking-[0.15em] py-7 rounded-3xl flex items-center justify-center gap-4 transition-all duration-500 shadow-xl active:scale-[0.98] disabled:opacity-50 group/btn relative overflow-hidden"
                                        >
                                            {processing ? (
                                                <div className="flex gap-2">
                                                    <div className="w-2.5 h-2.5 bg-current rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                    <div className="w-2.5 h-2.5 bg-current rounded-full animate-bounce [animation-delay:-0.15s]" />
                                                    <div className="w-2.5 h-2.5 bg-current rounded-full animate-bounce" />
                                                </div>
                                            ) : (
                                                <>
                                                    Confirmar Baja
                                                    <ArrowRight size={24} className="group-hover/btn:translate-x-2 transition-transform duration-300" />
                                                </>
                                            )}
                                        </button>
                                    </form>

                                    <div className="mt-12 text-center">
                                        <Link href={`/${locale}/boletin`} className="text-gray-400 dark:text-gray-500 text-sm font-semibold hover:text-cb-default transition-colors flex items-center gap-2 justify-center">
                                            <ShieldCheck size={16} />
                                            Prefiero mantener mi suscripción
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className="relative bg-white/70 dark:bg-cb-default/10 backdrop-blur-2xl border border-gray-100 dark:border-cb-300/10 rounded-[3rem] shadow-[0_32px_128px_-32px_rgba(2,80,157,0.15)] text-center overflow-hidden max-w-2xl mx-auto"
                            >
                                <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-cb-default via-cb-400 to-cb-default" />
                                
                                <div className="p-8 md:p-16 flex flex-col items-center">
                                    <div className="mb-12">
                                        <InteractiveLogo src="/imgs/logo/logo.png" alt="Logo APP" width={100} height={100} href={`/${locale}`} />
                                    </div>

                                    <motion.div
                                        initial={{ scale: 0, rotate: -45 }}
                                        animate={{ scale: 1, rotate: 0 }}
                                        transition={{ type: 'spring', damping: 12, stiffness: 200, delay: 0.3 }}
                                        className="mb-10 w-24 h-24 bg-cb-default rounded-4xl flex items-center justify-center text-white shadow-[0_20px_40px_-10px_rgba(2,80,157,0.5)]"
                                    >
                                        <CheckCircle2 size={48} />
                                    </motion.div>

                                    <h3 className="text-3xl md:text-5xl font-black uppercase text-cb-default dark:text-cb-400 tracking-tighter mb-6 px-4">
                                        Suscripción Cancelada
                                    </h3>

                                    <p className="text-xl text-gray-600 dark:text-gray-300 max-w-md mb-12 leading-relaxed font-medium">
                                        Tu correo ha sido removido de nuestra lista. Siempre serás bienvenido de vuelta.
                                    </p>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full text-left">
                                        <Link href={`/${locale}`} className="group p-6 bg-white dark:bg-cb-full/40 border border-gray-100 dark:border-cb-300/10 rounded-3xl hover:bg-cb-default hover:text-white transition-all duration-300 flex flex-col items-center text-center">
                                            <Home size={24} className="mb-4 text-cb-default group-hover:text-white" />
                                            <span className="font-bold text-sm uppercase tracking-wider">Ir al Inicio</span>
                                        </Link>
                                        
                                        <Link href={`/${locale}/boletin`} className="group p-6 bg-white dark:bg-cb-full/40 border border-gray-100 dark:border-cb-300/10 rounded-3xl hover:bg-red-600 hover:text-white transition-all duration-300 flex flex-col items-center text-center">
                                            <LayoutPanelLeft size={24} className="mb-4 text-red-500 group-hover:text-white" />
                                            <span className="font-bold text-sm uppercase tracking-wider">Re-suscribirme</span>
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </ContainerTodo>
            </ContainerSingle>
        </AppLayout>
    );
}
