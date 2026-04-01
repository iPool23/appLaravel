"use client"

import { easeOut, LazyMotion, domAnimation, m } from "framer-motion";
import React, { Suspense, lazy, useMemo } from 'react';
import { Grid, GridItem } from '@/components';
import HeroSection from '@/components/ui/sections/Hero';
import { defaultLogos } from '@/data/logos';
import AppLayout from '@/layouts/AppLayout';
import { useLocale, useTranslations } from '@/lib/i18n';

// Lazy load components with direct paths for effective code splitting
const AdModal = lazy(() => import('@/components/ui/ad/AdModal'));
const QRPopup = lazy(() => import('@/components/ui/popup/QRPopup'));
const StatisticsSection = lazy(() => import('@/components/ui/statistics/StatisticsSection'));
const EjesSection = lazy(() => import('@/components/ejes/EjesSection'));
const ScrollingBanner = lazy(() => import('@/components/ui/banner/ScrollingBanner').then(m => ({ default: m.ScrollingBanner })));
const DirectiveGrid = lazy(() => import('@/components/ui/grid/DirectiveGrid'));
const SectionLogo = lazy(() => import('@/components/ui/logo/SectionLogo'));
const SectionVideo = lazy(() => import('@/components/ui/section/SectionVideo'));
const PressCarousel = lazy(() => import('@/components/press/PressCarousel'));
const DocumentsCarousel = lazy(() => import('@/components/documents/DocumentsCarousel'));
const FaqAccordion = lazy(() => import('@/components/ui/accordion/FaqAccordion').then(m => ({ default: m.FaqAccordion })));
const AnimatedSectionTitle = lazy(() => import('@/components/ui/AnimatedSectionTitle'));
const ContainerSingle = lazy(() => import('@/components/ui/container/ContainerSingle'));
const ContainerTodo = lazy(() => import('@/components/ui/container/ContainerTodo'));
const CustomBlogCard = lazy(() => import('@/components/ui/card/CustomBlogCard'));

interface HomeProps {
    latestPress: any[];
    latestComunicados: any[];
    documents: any[];
    ads?: any[];
    popupDocuments?: any[];
}

// Reusable loader for Skeleton UI
const SectionLoader = ({ className = "" }) => (
    <div className={`w-full bg-gray-50/50 dark:bg-cb-full animate-pulse flex items-center justify-center p-20 ${className}`} />
);

export default function HomePage({ latestPress, latestComunicados, documents, ads = [], popupDocuments = [] }: HomeProps) {
    const t = useTranslations('home');
    const locale = useLocale();

    const containerVariants = useMemo(() => ({
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: easeOut,
            },
        },
    }), []);

    return (
        <LazyMotion features={domAnimation}>
            <AppLayout
                title={t('title') || 'Inicio'}
                description={t('description') || "Portal oficial de Alianza Para el Progreso con noticias, documentos públicos, ejes de gobierno y participación ciudadana."}
                image="/imgs/carousel/1.webp"
                keywords={(t('keywords') as any) || ['APP', 'Alianza Para el Progreso', 'Peru', 'prensa', 'documentos publicos', 'ejes de gobierno']}
                canonicalPath={`/${locale}`}
            >
                {/* Immediate Overlays */}
                <Suspense fallback={null}>
                    <AdModal ads={ads} />
                    <QRPopup documents={popupDocuments.map((d: any) => ({ url: d.fileUrl, title: d.title }))} />
                </Suspense>

                {/* Critical LCP: Hero stays static to avoid CLS and delay */}
                <HeroSection />

                {/* High Priority: Stats & Strategy */}
                <Suspense fallback={<SectionLoader className="h-40" />}>
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
                </Suspense>

                {/* Mid Priority: Banner and Directives */}
                <Suspense fallback={<SectionLoader />}>
                    <m.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={containerVariants}
                    >
                        <ContainerSingle>
                            <ScrollingBanner text={t('banner')} />
                        </ContainerSingle>
                    </m.div>

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
                </Suspense>

                {/* Multimedia Block */}
                <Suspense fallback={<SectionLoader />}>
                    <m.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={containerVariants}
                    >
                        <SectionLogo
                            logos={defaultLogos}
                        />
                    </m.div>

                    <m.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, amount: 0.3 }}
                        variants={containerVariants}
                    >
                        <SectionVideo />
                    </m.div>
                </Suspense>

                {/* News & Press */}
                <Suspense fallback={<SectionLoader className="h-[600px]" />}>
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
                </Suspense>

                {/* Documents & FAQ */}
                <Suspense fallback={<SectionLoader />}>
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
                </Suspense>
            </AppLayout>
        </LazyMotion>
    );
}
