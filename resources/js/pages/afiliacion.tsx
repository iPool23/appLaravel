import { motion } from "framer-motion";
import { Download, MapPin, Info, RefreshCw, Users, HelpCircle, AlertTriangle } from "lucide-react";
import BannerWithBackground from "@/components/ui/banner/BannerWithBackground";
import ContainerSingle from "@/components/ui/container/ContainerSingle";
import ContainerTodo from "@/components/ui/container/ContainerTodo";
import AppLayout from '@/layouts/AppLayout';
import { useTranslations } from "@/lib/i18n";

export default function AfiliacionPage() {
    const t = useTranslations('afiliacion');

    const downloadUrl = "https://drive.google.com/drive/folders/1iK-Ndxvkz_znpUCdbuxsV3f2mZHQwpQh?usp=sharing";

    return (
        <AppLayout
            title={t('title') || "Afiliación"}
            description="Únete a Alianza Para el Progreso. Conoce los pasos y modalidades para afiliarte formalmente al partido."
            image="/imgs/fondo/fondo-contacto.webp"
            keywords={['afiliación', 'partido político', 'APP', 'inscripción', 'militante']}
        >
            <BannerWithBackground
                src="/imgs/fondo/fondo-contacto.webp"
                title={t('bannerTitle')}
            />

            <ContainerSingle className="bg-white dark:bg-cb-full py-16">
                <ContainerTodo>
                    <div className="max-w-5xl mx-auto">
                        {/* Intro Section */}
                        <div className="bg-cb-50 dark:bg-cb-900/30 border-l-4 border-cb-600 p-8 rounded-r-2xl mb-12 shadow-sm">
                            <div className="flex gap-4">
                                <Info className="text-cb-600 shrink-0 mt-1" size={28} />
                                <p className="text-lg text-gray-800 dark:text-gray-200 leading-relaxed font-medium">
                                    {t('intro')}
                                </p>
                            </div>
                        </div>

                        {/* Steps Section */}
                        <div className="mb-20">
                            <h2 className="text-3xl font-black text-cb-default dark:text-white mb-10 flex items-center gap-3">
                                <span className="bg-cb-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl">1</span>
                                {t('stepsTitle')}
                            </h2>
                            <div className="grid md:grid-cols-3 gap-6">
                                {(t('steps') as string[] || []).map((step, index) => (
                                    <motion.div 
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="flex flex-col items-center text-center gap-4 bg-gray-50 dark:bg-white/5 p-8 rounded-2xl border border-gray-100 dark:border-white/10"
                                    >
                                        <div className="bg-cb-600 text-white w-12 h-12 rounded-full flex items-center justify-center font-bold">
                                            {index + 1}
                                        </div>
                                        <span className="text-gray-700 dark:text-gray-300 font-medium">{step}</span>
                                    </motion.div>
                                ))}
                            </div>

                            <div className="mt-10 flex justify-center">
                                <a 
                                    href={downloadUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="group flex items-center gap-3 bg-cb-600 hover:bg-cb-700 text-white px-10 py-5 rounded-full font-black text-lg transition-all shadow-xl hover:shadow-cb-600/20 hover:-translate-y-1"
                                >
                                    <Download size={24} className="group-hover:animate-bounce" />
                                    {t('downloadButton')}
                                </a>
                            </div>
                        </div>

                        {/* Modalities Section */}
                        <div className="mb-20">
                            <h2 className="text-3xl font-black text-cb-default dark:text-white mb-10 flex items-center gap-3">
                                <span className="bg-cb-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-xl">2</span>
                                {t('modalitiesTitle')}
                            </h2>
                            
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Lima */}
                                <div className="bg-white dark:bg-cb-900 border border-gray-200 dark:border-white/10 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-cb-100 dark:bg-cb-800 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                        <MapPin className="text-cb-600" size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-cb-default dark:text-white mb-4">
                                        {t('limaTitle')}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {t('limaDesc')}
                                    </p>
                                </div>

                                {/* Provincias */}
                                <div className="bg-white dark:bg-cb-900 border border-gray-200 dark:border-white/10 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-cb-100 dark:bg-cb-800 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                        <MapPin className="text-cb-600" size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-cb-default dark:text-white mb-4">
                                        {t('provTitle')}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {t('provDesc')}
                                    </p>
                                </div>

                                {/* Reafiliacion */}
                                <div className="bg-white dark:bg-cb-900 border border-gray-200 dark:border-white/10 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-cb-100 dark:bg-cb-800 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                        <RefreshCw className="text-cb-600" size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-cb-default dark:text-white mb-4">
                                        {t('reafiliacionTitle')}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {t('reafiliacionDesc')}
                                    </p>
                                </div>

                                {/* Multiple */}
                                <div className="bg-white dark:bg-cb-900 border border-gray-200 dark:border-white/10 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                                    <div className="bg-cb-100 dark:bg-cb-800 w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
                                        <Users className="text-cb-600" size={32} />
                                    </div>
                                    <h3 className="text-xl font-bold text-cb-default dark:text-white mb-4">
                                        {t('multipleTitle')}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                                        {t('multipleDesc')}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Extra Info Section */}
                        <div className="bg-cb-full dark:bg-cb-900 text-white p-12 rounded-4xl shadow-2xl">
                            <h2 className="text-3xl font-black mb-10 text-center">
                                {t('extraInfoTitle')}
                            </h2>
                            <div className="grid md:grid-cols-2 gap-12">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-cb-400">
                                        <HelpCircle size={28} />
                                        <h3 className="text-xl font-bold">{t('consultasTitle')}</h3>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">
                                        {t('consultasDesc')}
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3 text-cb-400">
                                        <AlertTriangle size={28} />
                                        <h3 className="text-xl font-bold">{t('renunciasTitle')}</h3>
                                    </div>
                                    <p className="text-gray-300 leading-relaxed">
                                        {t('renunciasDesc')}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </ContainerTodo>
            </ContainerSingle>
        </AppLayout>
    );
}
