import React from 'react';
import { useForm, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/AppLayout';
import ContainerSingle from '@/components/ui/container/ContainerSingle';
import ContainerTodo from '@/components/ui/container/ContainerTodo';
import { useTranslations } from '@/lib/i18n';
import { FormInput } from '@/components/ui/form/FormInput';
import { FormSelect } from '@/components/ui/form/FormSelect';
import { FormTextarea } from '@/components/ui/form/FormTextarea';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, Info } from 'lucide-react';
import AnimatedSectionTitle from '@/components/ui/AnimatedSectionTitle';

export default function ContactoPage() {
    const t = useTranslations('contact');
    const { props } = usePage<{ flash?: { success?: boolean } }>();

    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        email: '',
        phone: '',
        region: '',
        category: '',
        message: '',
        terms: false,
        newsletter: true,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(window.location.pathname, {
            onSuccess: () => reset(),
        });
    };

    const regions = [
        "Amazonas", "Ancash", "Apurímac", "Arequipa", "Ayacucho", "Cajamarca", "Callao", "Cusco",
        "Huancavelica", "Huánuco", "Ica", "Junín", "La Libertad", "Lambayeque", "Lima", "Loreto",
        "Madre de Dios", "Moquegua", "Pasco", "Piura", "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali"
    ];

    const categories = [
        "Consulta General", "Afiliación", "Prensa", "Sugerencias", "Otros"
    ];

    const contactInfo = [
        {
            icon: <Phone size={24} />,
            title: t('phone'),
            value: "(01) 202 4600",
            link: "tel:+51012024600"
        },
        {
            icon: <Mail size={24} />,
            title: t('email'),
            value: "app@app.pe",
            link: "mailto:app@app.pe"
        },
        {
            icon: <MapPin size={24} />,
            title: t('location'),
            value: "Av. de la Policía 643, Jesús María",
            link: "https://maps.app.goo.gl/zvNCX53H8EvNBWNV6"
        }
    ];

    return (
        <AppLayout
            title={t('pageTitle')}
            description={t('description')}
            keywords={['contacto', 'APP', 'Alianza Para el Progreso', 'atencion al ciudadano']}
        >
            <ContainerSingle className="bg-white dark:bg-cb-full pt-12 pb-16 mt-8 md:mt-24">
                <ContainerTodo>
                    <AnimatedSectionTitle
                        smallTitle={t('title')}
                        mainTitleSegments={[{ text: t('title'), breakAfter: false }]}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12 items-stretch">
                        <div className="flex flex-col gap-8 h-full">
                            <div className="bg-gray-50 dark:bg-cb-default/20 border border-gray-100 dark:border-cb-300/10 rounded-3xl p-8 shadow-sm relative overflow-hidden group">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-cb-default/5 rounded-full -mr-16 -mt-16 blur-3xl group-hover:bg-cb-default/10 transition-all duration-700" />

                                <h3 className="text-xl font-black uppercase text-cb-default dark:text-white mb-8 flex items-center gap-3">
                                    <span className="w-1.5 h-6 bg-cb-default rounded-full" />
                                    {t('location')}
                                </h3>

                                <div className="space-y-8">
                                    {contactInfo.map((info, i) => (
                                        <motion.a
                                            key={i}
                                            href={info.link}
                                            target={info.link.startsWith('http') ? '_blank' : undefined}
                                            initial={{ opacity: 0, y: 10 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: i * 0.1 }}
                                            className="flex items-center gap-5 group/item"
                                        >
                                            <div className="w-14 h-14 shrink-0 rounded-2xl bg-white dark:bg-cb-full flex items-center justify-center text-cb-default dark:text-cb-300 shadow-sm border border-gray-100 dark:border-cb-400/10 group-hover/item:bg-cb-default group-hover/item:text-white transition-all duration-300 transform group-hover/item:scale-105">
                                                {info.icon}
                                            </div>
                                            <div className="flex-1">
                                                <p className="text-[10px] font-black uppercase tracking-[0.15em] text-cb-400 dark:text-cb-400 mb-1">{info.title}</p>
                                                <p className="text-cb-800 dark:text-cb-100 font-bold text-lg leading-tight group-hover/item:text-cb-default dark:group-hover/item:text-white transition-colors">
                                                    {info.value}
                                                </p>
                                            </div>
                                        </motion.a>
                                    ))}
                                </div>
                            </div>

                            <div className="flex-1 bg-cb-default dark:bg-cb-default rounded-3xl p-10 text-white shadow-2xl relative overflow-hidden group flex flex-col">
                                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition-all duration-700" />

                                <h3 className="text-2xl font-black uppercase mb-10 flex items-center gap-3 shrink-0">
                                    <span className="w-2 h-8 bg-white/30 rounded-full" />
                                    {t('schedule')}
                                </h3>

                                <div className="flex-1 flex flex-col justify-center space-y-6 relative z-10">
                                    <div className="flex justify-between items-center border-b border-white/10 pb-6">
                                        <span className="text-white/70 text-lg font-medium">{t('mondayFriday')}</span>
                                        <span className="font-black text-xl">09:00 - 18:00</span>
                                    </div>
                                    <div className="flex justify-between items-center border-b border-white/10 pb-6">
                                        <span className="text-white/70 text-lg font-medium">{t('saturday') || 'Sábado - Domingo'}</span>
                                        <span className="font-black text-xl">{t('closed')}</span>
                                    </div>
                                </div>

                            </div>
                        </div>

                        <div className="lg:col-span-2">
                            <div className="bg-white dark:bg-cb-default/10 backdrop-blur-xl border border-gray-100 dark:border-cb-300/10 rounded-[2.5rem] p-8 md:p-10 shadow-2xl relative overflow-hidden h-full">
                                <div className="absolute top-0 right-0 w-96 h-96 bg-cb-default/5 rounded-full -mr-48 -mt-48 blur-3xl pointer-events-none" />

                                <div className="relative z-10">
                                    <div className="flex items-center gap-4 mb-8">
                                        <div className="w-12 h-1 bg-cb-default rounded-full" />
                                        <h3 className="text-2xl text-cb-default md:text-3xl font-black uppercase dark:text-white tracking-tighter">
                                            {t('sendMessage')}
                                        </h3>
                                    </div>

                                    <form onSubmit={handleSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <FormInput
                                                id="name"
                                                name="name"
                                                type="text"
                                                placeholder={t('form.namePlaceholder')}
                                                value={data.name}
                                                onChange={e => setData('name', e.target.value)}
                                                error={errors.name}
                                                required
                                            />
                                            <FormInput
                                                id="email"
                                                name="email"
                                                type="email"
                                                placeholder={t('form.emailPlaceholder')}
                                                value={data.email}
                                                onChange={e => setData('email', e.target.value)}
                                                error={errors.email}
                                                required
                                            />
                                        </div>

                                        <div className="grid md:grid-cols-2 gap-6">
                                            <FormInput
                                                id="phone"
                                                name="phone"
                                                type="tel"
                                                placeholder={t('form.phonePlaceholder')}
                                                value={data.phone}
                                                onChange={e => setData('phone', e.target.value)}
                                                error={errors.phone}
                                                required
                                            />
                                            <FormSelect
                                                id="region"
                                                name="region"
                                                placeholder={t('form.regionPlaceholder')}
                                                value={data.region}
                                                onChange={e => setData('region', e.target.value)}
                                                error={errors.region}
                                            >
                                                {regions.map(r => <option key={r} value={r}>{r}</option>)}
                                            </FormSelect>
                                        </div>

                                        <FormSelect
                                            id="category"
                                            name="category"
                                            placeholder={t('form.categoryPlaceholder')}
                                            value={data.category}
                                            onChange={e => setData('category', e.target.value)}
                                            error={errors.category}
                                        >
                                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                        </FormSelect>

                                        <FormTextarea
                                            id="message"
                                            name="message"
                                            placeholder={t('form.messagePlaceholder')}
                                            value={data.message}
                                            onChange={e => setData('message', e.target.value)}
                                            error={errors.message}
                                            required
                                            rows={5}
                                        />

                                        <div className="flex items-start gap-3">
                                            <div className="flex items-center h-5 mt-0.5">
                                                <input
                                                    id="terms"
                                                    type="checkbox"
                                                    checked={data.terms}
                                                    onChange={e => setData('terms', e.target.checked)}
                                                    className="w-4 h-4 rounded border-gray-300 text-cb-default focus:ring-cb-default cursor-pointer bg-white dark:bg-cb-full"
                                                    required
                                                />
                                            </div>
                                            <label htmlFor="terms" className="text-cb-500 dark:text-cb-400 cursor-pointer select-none leading-relaxed">
                                                {t('form.terms')}
                                                <a href="/es/privacidad" className="text-cb-default dark:text-cb-400 hover:underline mx-1 font-bold">{t('form.termsLink1')}</a>
                                                {t('form.termsAnd') || 'y'}
                                                <a href="/es/terminos" className="text-cb-default dark:text-cb-400 hover:underline mx-1 font-bold">{t('form.termsLink2')}</a>
                                            </label>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <div className="flex items-center h-5 mt-0.5">
                                                <input
                                                    id="newsletter"
                                                    type="checkbox"
                                                    checked={data.newsletter}
                                                    onChange={e => setData('newsletter', e.target.checked)}
                                                    className="w-4 h-4 rounded border-gray-300 text-cb-default focus:ring-cb-default cursor-pointer bg-white dark:bg-cb-full"
                                                />
                                            </div>
                                            <label htmlFor="newsletter" className="text-cb-500 dark:text-cb-400 cursor-pointer select-none leading-relaxed">
                                                {t('form.subscribe')}
                                            </label>
                                        </div>

                                        {props.flash?.success && (
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                className="p-4 bg-green-500/10 border border-green-500/20 rounded-xl text-green-600 dark:text-green-400 font-bold flex items-center justify-center gap-3 text-sm"
                                            >
                                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                                {t('messageSent')}
                                            </motion.div>
                                        )}

                                        <button
                                            type="submit"
                                            disabled={processing || !data.terms}
                                            className="w-full bg-cb-default hover:bg-cb-700 dark:bg-cb-default dark:hover:bg-cb-600 text-white font-black uppercase tracking-widest py-5 rounded-xl flex items-center justify-center gap-4 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-[0_10px_40px_-10px_rgba(2,110,221,0.4)] active:scale-[0.98] group/btn text-sm"
                                        >
                                            {processing ? (
                                                <span className="flex items-center gap-2">
                                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce" />
                                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.15s]" />
                                                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                                                </span>
                                            ) : (
                                                <>
                                                    {t('form.submit')}
                                                    <Send className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" size={20} />
                                                </>
                                            )}
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </ContainerTodo>
            </ContainerSingle>

            {/* Google Maps Section */}
            <div className="w-full h-[500px] bg-gray-100 relative overflow-hidden border-t border-gray-100 dark:border-cb-400/10">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3901.4429944645224!2d-77.0543265240212!3d-12.081827442525746!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9105c8fe220e8b35%3A0x6291a82f3272506e!2sAv.%20de%20la%20Polic%C3%ADa%20643%2C%20Jes%C3%BAs%20Mar%C3%ADa%2015072!5e0!3m2!1ses-419!2spe!4v1710950000000!5m2!1ses-419!2spe"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Ubicación APP"
                />
            </div>
        </AppLayout>
    );
}
