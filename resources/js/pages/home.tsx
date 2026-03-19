import { Link } from '@inertiajs/react';
import DocumentsCarousel from '@/components/documents/DocumentsCarousel';
import { EjesSection, FaqAccordion, Grid, GridItem, ScrollingBanner,  AdModal } from '@/components';
import { CustomBulletin } from '@/components/ui/bulletin/CustomBulletin';
import PressCarousel from '@/components/press/PressCarousel';
import AnimatedSectionTitle from '@/components/ui/AnimatedSectionTitle';
import ContainerSingle from '@/components/ui/container/ContainerSingle';
import ContainerTodo from '@/components/ui/container/ContainerTodo';
import CustomBlogCard from '@/components/ui/card/CustomBlogCard';
import SectionLogo from '@/components/ui/logo/SectionLogo';
import SectionVideo from '@/components/ui/section/SectionVideo';
import DirectiveGrid from '@/components/ui/grid/DirectiveGrid';
import QRPopup from '@/components/ui/popup/QRPopup';
import HeroSection from '@/components/ui/sections/Hero';
import StatisticsSection from '@/components/ui/statistics/StatisticsSection';
import AppLayout from '@/layouts/AppLayout';
import { defaultLogos } from '@/data/logos';
import { useLocale, useTranslations } from '@/lib/i18n';
import { motion, easeOut } from "framer-motion";

interface HomeProps {
    latestPress: any[];
    latestComunicados: any[];
    documents: any[];
    ads?: any[];
    popupDocuments?: any[];
}

export default function HomePage({ latestPress, latestComunicados, documents, ads = [], popupDocuments = [] }: HomeProps) {
    const t = useTranslations('home');
    const locale = useLocale();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                ease: easeOut,
            },
        },
    };

    return (
        <AppLayout
            title={t('title') || 'Inicio'}
            description={t('description') || "Portal oficial de Alianza Para el Progreso con noticias, documentos públicos, ejes de gobierno y participación ciudadana."}
            image="/imgs/carousel/3.jpeg"
            keywords={(t('keywords') as any) || ['APP', 'Alianza Para el Progreso', 'Peru', 'prensa', 'documentos publicos', 'ejes de gobierno']}
            canonicalPath={`/${locale}`}
        >
            <AdModal ads={ads} />
            <QRPopup documents={popupDocuments.map((d: any) => ({ url: d.fileUrl, title: d.title }))} />
            
            <HeroSection />

            <div className="bg-cb-default dark:bg-cb-full">
                <StatisticsSection
                    statistics={[
                        { value: "370300", label: t('statistics.militants') },
                        { value: "17", label: t('statistics.congressmen') },
                        { value: "5", label: t('statistics.governors') },
                        { value: "24", label: t('statistics.provincialMayors') },
                        { value: "241", label: t('statistics.districtMayors') },
                    ]}
                />
            </div>

            <ContainerSingle className="bg-gray-50 dark:bg-cb-full">
                <ContainerTodo>
                    <EjesSection />
                </ContainerTodo>
            </ContainerSingle>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.5 }}
                variants={containerVariants}
            >
                <ContainerSingle>
                    <ScrollingBanner text={t('banner')} />
                </ContainerSingle>
            </motion.div>

            <ContainerSingle>
                <ContainerTodo>
                    <AnimatedSectionTitle
                        smallTitle={t('directive.smallTitle')}
                        mainTitleSegments={[
                            { text: (t('directive.mainTitle') || "").split(' ').slice(0, 2).join(' '), breakAfter: true },
                            { text: (t('directive.mainTitle') || "").split(' ').slice(2).join(' ') },
                        ]}
                    />

                    <DirectiveGrid />
                </ContainerTodo>
            </ContainerSingle>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                <SectionLogo
                    logos={defaultLogos}
                />
            </motion.div>

            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                <SectionVideo />
            </motion.div>

            <ContainerSingle className="bg-gray-50 dark:bg-cb-full">
                <ContainerTodo>
                    <AnimatedSectionTitle
                        smallTitle={t('news.smallTitle')}
                        mainTitleSegments={[
                            { text: t('news.mainTitle'), breakAfter: false },
                        ]}
                    />

                    <div className="flex flex-col gap-4">
                        <PressCarousel
                            type="Prensa"
                            items={latestPress}
                            title={t('news.pressNotes')}
                        />
                        <PressCarousel
                            type="Comunicado"
                            items={latestComunicados}
                            title={t('news.comunicados')}
                        />
                    </div>
                </ContainerTodo>
            </ContainerSingle>

            <ContainerSingle className="bg-gray-50 dark:bg-cb-full overflow-hidden">
                <ContainerTodo>
                    <AnimatedSectionTitle
                        smallTitle={t('documents.smallTitle')}
                        mainTitleSegments={[
                            { text: t('documents.mainTitle'), breakAfter: false },
                        ]}
                    />

                    <div className="relative group/section pb-10">
                        <DocumentsCarousel documents={documents} />
                    </div>
                </ContainerTodo>
            </ContainerSingle>

            <ContainerSingle>
                <ContainerTodo>
                    <Grid>
                        <GridItem colSpan={6}>
                            <CustomBlogCard
                                titleTop={t('faq.title')}
                                titleCenter={t('faq.subtitle')}
                                description={t('faq.description')}
                                isImage={false}
                                className="mr-4"
                            />
                        </GridItem>

                        <GridItem colSpan={6}>
                            <FaqAccordion
                                items={[
                                    { question: t('faq.questions.q1.question'), answer: t('faq.questions.q1.answer') },
                                    { question: t('faq.questions.q2.question'), answer: t('faq.questions.q2.answer') },
                                    { question: t('faq.questions.q3.question'), answer: t('faq.questions.q3.answer') },
                                    { question: t('faq.questions.q4.question'), answer: t('faq.questions.q4.answer') },
                                    { question: t('faq.questions.q5.question'), answer: t('faq.questions.q5.answer') },
                                    { question: t('faq.questions.q6.question'), answer: t('faq.questions.q6.answer') },
                                ]}
                                defaultOpen={0}
                            />
                        </GridItem>
                    </Grid>
                </ContainerTodo>
            </ContainerSingle>

            {/* <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                variants={containerVariants}
            >
                <ContainerSingle className="bg-gray-50">
                    <ContainerTodo>
                        <CustomBulletin />
                    </ContainerTodo>
                </ContainerSingle>
            </motion.div> */}
        </AppLayout>
    );
}
