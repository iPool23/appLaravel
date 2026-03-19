import React, { useState, useEffect } from 'react';
import { useForm, usePage, Link } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Newspaper, CheckCircle2, ArrowRight, Home, LayoutPanelLeft, Share2, Sparkles, BellRing } from 'lucide-react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import AppLayout from '@/layouts/AppLayout';
import ContainerSingle from '@/components/ui/container/ContainerSingle';
import ContainerTodo from '@/components/ui/container/ContainerTodo';
import { InteractiveLogo } from '@/components/ui/logo/InteractiveLogo';
import { useTranslations, useLocale } from '@/lib/i18n';

export default function BoletinPage() {
    const t = useTranslations('bulletin');
    const locale = useLocale();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const { props } = usePage<{ flash?: { success?: boolean } }>();
    const [showSuccess, setShowSuccess] = useState(!!props.flash?.success);

    const { data, setData, post, processing, errors, reset, transform } = useForm({
        email: '',
        terms: true,
        recaptchaToken: '',
    });

    useEffect(() => {
        if (props.flash?.success) setShowSuccess(true);
    }, [props.flash?.success]);

    const handleReset = () => {
        setShowSuccess(false);
        reset('email');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!data.terms || processing) return;

        if (executeRecaptcha) {
            const token = await executeRecaptcha('boletin_submit');
            // Use transform to inject the token into the request data
            transform((data) => ({
                ...data,
                recaptchaToken: token,
            }));
        }

        post(window.location.pathname, {
            preserveScroll: true,
            onSuccess: () => {
                setShowSuccess(true);
                reset('email');
            }
        });
    };

    const benefits = [
        { text: "Recibe las últimas noticias y actualizaciones políticas", icon: Newspaper },
        { text: "Entérate de eventos y actividades en tu región", icon: BellRing },
        { text: "Conoce nuestras propuestas y planes de gobierno", icon: Sparkles },
        { text: "Acceso exclusivo a nuevos recursos y documentos", icon: LayoutPanelLeft }
    ];

    return (
        <AppLayout
            title={t('title') || "Suscríbete al Boletín"}
            description="Mantente informado con las últimas noticias, propuestas y eventos de Alianza Para el Progreso."
            keywords={['boletín', 'newsletter', 'APP', 'suscripción', 'noticias']}
        >
            <div className='pt-24'></div>
            <ContainerSingle className="relative bg-white dark:bg-cb-full min-h-[90vh] flex items-center justify-center pt-16 pb-24 overflow-hidden">
                <ContainerTodo className="relative z-10">
                    <AnimatePresence mode="wait">
                        {!showSuccess ? (
                            <motion.div
                                key="form"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                                transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
                                className="relative bg-white/70 dark:bg-cb-default/10 backdrop-blur-2xl border border-gray-100 dark:border-cb-300/10 rounded-[3rem] shadow-[0_32px_128px_-32px_rgba(0,0,0,0.15)] dark:shadow-none overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-cb-default via-cb-400 to-cb-default" />

                                <div className="p-8 md:p-16 flex flex-col items-center">
                                    <InteractiveLogo src="/imgs/logo/logo.png" alt="Logo APP" width={160} height={160} href={`/${locale}`} />

                                    <div className="text-center mb-12">
                                        <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-gray-900 dark:text-white  leading-none">
                                            <span className="block text-cb-default dark:text-cb-400">{t('textBottom')}</span>
                                        </h1>
                                    </div>

                                    <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-8">
                                        <div className="relative group">
                                            <div className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-cb-default transition-colors">
                                                <Mail size={24} />
                                            </div>
                                            <input
                                                type="email"
                                                required
                                                placeholder={t('placeholder')}
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                className="w-full pl-16 pr-6 py-6 rounded-3xl border border-gray-200 dark:border-cb-300/10 bg-white dark:bg-cb-full text-gray-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-cb-default/10 focus:border-cb-default transition-all text-xl shadow-inner"
                                            />
                                        </div>

                                        <div className="flex items-start gap-4 p-4 rounded-2xl bg-cb-default/5 dark:bg-cb-default/10 border border-cb-default/10 group/terms cursor-pointer">
                                            <div className="flex items-center h-6 mt-0.5">
                                                <input
                                                    id="terms"
                                                    type="checkbox"
                                                    checked={data.terms}
                                                    onChange={e => setData('terms', e.target.checked)}
                                                    className="w-5 h-5 rounded-lg border-cb-200 text-cb-default focus:ring-cb-default cursor-pointer transition-transform active:scale-90"
                                                    required
                                                />
                                            </div>
                                            <label htmlFor="terms" className="text-sm text-gray-500 dark:text-gray-400 cursor-pointer select-none leading-relaxed">
                                                {t('terms')}
                                                <Link href={`/${locale}/privacidad`} className="text-cb-default dark:text-cb-400 font-bold hover:underline ml-1">
                                                    {t('termsHighlight')}
                                                </Link>.
                                            </label>
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
                                            disabled={processing || !data.terms}
                                            className="w-full bg-cb-default hover:bg-cb-700 text-white font-black uppercase tracking-[0.15em] py-7 rounded-3xl flex items-center justify-center gap-4 transition-all duration-500 shadow-[0_20px_40px_-12px_rgba(2,80,157,0.4)] active:scale-[0.98] disabled:opacity-50 group/btn relative overflow-hidden"
                                        >
                                            <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                                            {processing ? (
                                                <div className="flex gap-2">
                                                    <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                    <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                                                    <div className="w-2.5 h-2.5 bg-white rounded-full animate-bounce" />
                                                </div>
                                            ) : (
                                                <>
                                                    {t('button')}
                                                    <ArrowRight size={24} className="group-hover/btn:translate-x-2 transition-transform duration-300" />
                                                </>
                                            )}
                                        </button>
                                    </form>

                                    <div className="mt-16 text-center space-y-4">
                                        <div className="flex items-center justify-center gap-8">
                                            <Link href={`/${locale}/unsubscribe`} className="text-gray-400 dark:text-gray-500 text-sm font-semibold hover:text-cb-default transition-colors">Gestionar suscripción</Link>
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-200 dark:bg-cb-300/10" />
                                            <Link href={`/${locale}/contacto`} className="text-gray-400 dark:text-gray-500 text-sm font-semibold hover:text-cb-default transition-colors">Contacto</Link>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ) : (
                            <motion.div
                                key="success"
                                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                className="relative bg-white/70 dark:bg-cb-default/10 backdrop-blur-2xl border border-gray-100 dark:border-cb-300/10 rounded-[3rem] shadow-[0_32px_128px_-32px_rgba(2,80,157,0.15)] text-center overflow-hidden"
                            >
                                <div className="absolute top-0 left-0 w-full h-2 bg-linear-to-r from-cb-default via-cb-400 to-cb-default" />

                                <div className="p-8 md:p-16 flex flex-col items-center">
                                    <InteractiveLogo src="/imgs/logo/logo.png" alt="Logo APP" width={160} height={160} href={`/${locale}`} />

                                    <h3 className="text-4xl md:text-6xl font-black uppercase text-cb-default dark:text-cb-400 tracking-tighter mb-8 px-4">
                                        {t('success')}
                                    </h3>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-2xl text-left">
                                        <Link href={`/${locale}/recursos`} className="group p-8 bg-white dark:bg-cb-full/40 border border-gray-100 dark:border-cb-300/10 rounded-4xl hover:bg-cb-default hover:text-white hover:border-cb-default transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-2">
                                            <div className="mb-6 w-14 h-14 rounded-2xl bg-cb-default/10 flex items-center justify-center text-cb-default group-hover:bg-white/20 group-hover:text-white transition-colors">
                                                <LayoutPanelLeft size={30} />
                                            </div>
                                            <h4 className="font-black text-xl mb-2 uppercase tracking-tight">Explorar</h4>
                                            <p className="opacity-60 text-base">Descarga recursos exclusivos.</p>
                                        </Link>

                                        <Link href={`/${locale}`} className="group p-8 bg-white dark:bg-cb-full/40 border border-gray-100 dark:border-cb-300/10 rounded-4xl hover:bg-cb-default hover:text-white hover:border-cb-default transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-2">
                                            <div className="mb-6 w-14 h-14 rounded-2xl bg-cb-default/10 flex items-center justify-center text-cb-default group-hover:bg-white/20 group-hover:text-white transition-colors">
                                                <Home size={30} />
                                            </div>
                                            <h4 className="font-black text-xl mb-2 uppercase tracking-tight">Inicio</h4>
                                            <p className="opacity-60 text-base">Vuelve a lo más relevante.</p>
                                        </Link>
                                    </div>

                                    <button
                                        onClick={handleReset}
                                        className="mt-16 flex items-center gap-3 px-10 py-5 rounded-full bg-gray-100 dark:bg-cb-full/40 text-gray-600 dark:text-gray-300 font-bold hover:bg-cb-default hover:text-white transition-all duration-300 shadow-sm active:scale-95"
                                    >
                                        <Share2 size={24} />
                                        {t('anotherEmail')}
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </ContainerTodo>
            </ContainerSingle>
        </AppLayout>
    );
}
