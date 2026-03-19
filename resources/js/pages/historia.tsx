import { useState, useEffect } from 'react';
import AppLayout from '@/layouts/AppLayout';
import { Title } from "@/components";
import ContentSection from "@/components/ui/content/ContentSection";
import BannerWithBackground from "@/components/ui/banner/BannerWithBackground";
import ContainerSingle from "@/components/ui/container/ContainerSingle";
import ContainerTodo from "@/components/ui/container/ContainerTodo";
import ImageGallery from "@/components/gallery/ImageGallery";
import AnimatedSectionTitle from "@/components/ui/AnimatedSectionTitle";
import VideoModal from "@/components/ui/modal/VideoModal";
import { useTranslations } from "@/lib/i18n";

export default function HistoriaPage() {
    const [isVideoOpen, setIsVideoOpen] = useState(false);
    const t = useTranslations('history');

    useEffect(() => {
        // Abrir el modal automáticamente al cargar la página
        setIsVideoOpen(true);
    }, []);

    const images = [
        { src: "/imgs/gallery/mitin-politico-san-juan-de-lurigancho.jpg", alt: "Mitin Político San Juan de Lurigancho", title: "Mitin Político San Juan de Lurigancho" },
        { src: "/imgs/carousel/3.jpeg", alt: "César Acuña en evento político", title: "César Acuña en evento político" },
        { src: "/imgs/gallery/mitin-politico-2.jpg", alt: "Evento político APP", title: "Evento político APP" },
        { src: "/imgs/gallery/mitin-politico-3.jpg", alt: "Evento político APP", title: "Evento político APP" },
        { src: "/imgs/gallery/caminata.jpg", alt: "Caminata APP", title: "Caminata APP" },
        { src: "/imgs/gallery/mitin-politico-4.jpg", alt: "Evento político APP", title: "Evento político APP" },
        { src: "/imgs/gallery/mitin-politico-5.jpg", alt: "Evento político APP", title: "Evento político APP" },
    ];

    const content = [
        {
            src: "/imgs/carousel/2.png",
            imageAlt: "César Acuña en la inauguración de Alianza Para el Progreso",
            imagePosition: "left" as const,
            imgAreaPosition: "right" as const
        },
        {
            src: "/imgs/history/cesar-acuna-liderando-en-chiclayo-la-gran-caminata-de-la-amistad.jpg",
            imageAlt: "César Acuña liderando en Chiclayo la Gran Caminata de la Amistad",
            imagePosition: "right" as const,
            imgAreaPosition: "left" as const
        },
        {
            src: "/imgs/history/cesar-acuna-recorre-region-loreto-para-apoyar-a-sus-candidatos.jpg",
            imageAlt: "César Acuña recorre la región Loreto para apoyar a sus candidatos",
            imagePosition: "left" as const,
            imgAreaPosition: "right" as const
        },
        {
            src: "/imgs/history/gran-caravana-en-loreto.jpg",
            imageAlt: "Gran Caravana en Loreto",
            imagePosition: "right" as const,
            imgAreaPosition: "left" as const
        }
    ];

    const sections = [
        t('sections.section1'),
        t('sections.section2'),
        t('sections.section3'),
        t('sections.section4'),
    ];

    return (
        <AppLayout
            title={t('title') || "Historia"}
            description="Conoce la historia de Alianza Para el Progreso."
            image="/imgs/fondo/fondo-historia.jpg"
            keywords={['historia', 'Alianza Para el Progreso', 'APP', 'fundación']}
        >
            <BannerWithBackground
                src="/imgs/fondo/fondo-historia.jpg"
                srcDark="/imgs/fondo/fondo-historia.jpg"
                title={t('title')}
            />
            <ContainerSingle className="bg-gray-50 dark:bg-cb-full">
                <ContainerTodo>
                    <AnimatedSectionTitle
                        smallTitle={t('smallTitle')}
                        mainTitleSegments={[
                            { text: (t('mainTitle') || "").split(' ').slice(0, 2).join(' '), breakAfter: true },
                            { text: (t('mainTitle') || "").split(' ').slice(2).join(' ') }
                        ]}
                        className="mb-12"
                    />

                    <div className="space-y-16">
                        {content.map((item, index) => (
                            <ContentSection
                                key={index}
                                imageSrc={item.src}
                                imageAlt={item.imageAlt}
                                description={sections[index] || ''}
                                imagePosition={item.imagePosition}
                                imgAreaPosition={item.imgAreaPosition}
                            />
                        ))}
                    </div>

                </ContainerTodo>
            </ContainerSingle>

            <ContainerSingle>
                <ContainerTodo>
                    <div className="flex items-center justify-center text-center">
                        <Title
                            title={t('finalMessage')}
                            fontSize="2xl"
                            className="tracking-widest"
                        />
                    </div>
                </ContainerTodo>
            </ContainerSingle>

            <ContainerSingle className="bg-gray-50 dark:bg-cb-full">
                <ContainerTodo>
                    <ImageGallery
                        images={images}
                        showTitles={true}
                        className="py-8"
                    />
                </ContainerTodo>
            </ContainerSingle>

            {/* Video Modal */}
            <VideoModal
                videoId="hoY3wtKhMx4"
                isOpen={isVideoOpen}
                onClose={() => setIsVideoOpen(false)}
                title="César Acuña - Historia y Trayectoria"
            />
        </AppLayout>
    );
}
