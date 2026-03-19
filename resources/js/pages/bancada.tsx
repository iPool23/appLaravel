import { Title, ContentSection } from '@/components';
import BannerWithBackground from '@/components/ui/banner/BannerWithBackground';
import ContainerSingle from '@/components/ui/container/ContainerSingle';
import ContainerTodo from '@/components/ui/container/ContainerTodo';
import CongressmanGrid from '@/components/ui/grid/CongressmanGrid';
import { ImageGallery } from '@/components/gallery';
import { congressmen } from '@/data/congressman';
import AppLayout from '@/layouts/AppLayout';
import { useTranslations } from '@/lib/i18n';

interface SectionContent {
    src: string;
    imageAlt: string;
    description: string;
    imagePosition: "left" | "right";
    imgAreaPosition?: "left" | "right" | "center";
}

export default function BancadaPage() {
    const t = useTranslations('bancada');

    const images = [
        { src: "/imgs/congressman/3.jpg", alt: "Congreso de la República" },
        { src: "/imgs/congressman/4.jpg", alt: "Congreso de la República" },
        { src: "/imgs/congressman/5.jpg", alt: "Congreso de la República" },
    ];

    const content: SectionContent[] = [
        {
            src: "/imgs/congressman/1.jpg",
            imageAlt: "Bancada Alianza Para el Progreso en el Congreso",
            description: t('content1'),
            imagePosition: "left",
            imgAreaPosition: "right"
        },
        {
            src: "/imgs/congressman/2.jpg",
            imageAlt: "Eduardo Salhuana Cavides - Vocero de la Bancada",
            description: t('content2'),
            imagePosition: "right",
            imgAreaPosition: "left"
        },
    ];

    return (
        <AppLayout title={t('pageTitle')}>
            <BannerWithBackground 
                src="/imgs/fondo/FondoBancada.jpg" 
                title={t('title')} 
            />
            
            {/* Content Sections */}
            <ContainerSingle className="bg-gray-100 dark:bg-cb-950">
                <ContainerTodo>
                    <div className="space-y-16">
                        {content.map((item, index) => (
                            <ContentSection
                                key={index}
                                imageSrc={item.src}
                                imageAlt={item.imageAlt}
                                description={item.description}
                                imagePosition={item.imagePosition}
                                imgAreaPosition={item.imgAreaPosition}
                            />
                        ))}
                    </div>
                </ContainerTodo>
            </ContainerSingle>

            {/* Quote Section */}
            <ContainerSingle>
                <ContainerTodo>
                    <div className="flex items-center justify-center text-center">
                        <Title
                            title={t('quote')}
                            fontSize="2xl"
                            className="tracking-widest"
                        />
                    </div>
                </ContainerTodo>
            </ContainerSingle>

            {/* Image Gallery */}
            <ContainerSingle className="bg-gray-100 dark:bg-cb-950">
                <ContainerTodo>
                    <ImageGallery
                        images={images}
                        showTitles={true}
                        className="py-8"
                    />
                </ContainerTodo>
            </ContainerSingle>

            {/* Congressmen Grid */}
            <ContainerSingle>
                <ContainerTodo>
                    <div className="mb-12 text-center">
                        <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-gray-600 dark:text-gray-400">
                            {t('smallTitle')}
                        </p>
                        <h2 className="text-4xl font-black uppercase tracking-tight text-gray-900 dark:text-white">
                            {t('mainTitle1')} <br className="sm:hidden" />
                            {t('mainTitle2')}
                        </h2>
                    </div>
                    <CongressmanGrid congressmen={congressmen} />
                </ContainerTodo>
            </ContainerSingle>

            {/* Final Message */}
            <ContainerSingle>
                <ContainerTodo>
                    <div className="flex items-center justify-center text-center">
                        <Title
                            title={t('finalMessage')}
                            fontSize="3xl"
                            className="tracking-widest"
                        />
                    </div>
                </ContainerTodo>
            </ContainerSingle>
        </AppLayout>
    );
}
