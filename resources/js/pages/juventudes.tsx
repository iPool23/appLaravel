import { Title, ContentSection } from '@/components';
import BannerWithBackground from '@/components/ui/banner/BannerWithBackground';
import ContainerSingle from '@/components/ui/container/ContainerSingle';
import ContainerTodo from '@/components/ui/container/ContainerTodo';
import { ImageGallery } from '@/components/gallery';
import SocialLinks from '@/components/ui/social/SocialLinks';
import FacebookIcon from '@/components/svg/FacebookIcon';
import InstagramIcon from '@/components/svg/InstagramIcon';
import AppLayout from '@/layouts/AppLayout';
import { useTranslations } from '@/lib/i18n';
import TikTokIcon from '@/components/svg/TikTokIcon';

const juventudesSocialLinks = [
    {
        href: "https://www.tiktok.com/@juventud.app",
        icon: (<TikTokIcon />),
        label: "TikTok",
        bgColor: "bg-black"
    },
    {
        href: "https://www.instagram.com/juventud.app/",
        icon: (<InstagramIcon />),
        label: "Instagram",
        bgColor: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
        href: "https://www.facebook.com/JuventudAPP",
        icon: (<FacebookIcon />),
        label: "Facebook",
        bgColor: "bg-blue-600"
    },
];

interface SectionContent {
    src: string;
    imageAlt: string;
    description: string;
    imagePosition: "left" | "right";
}

export default function JuventudesPage() {
    const t = useTranslations('juventudes');

    const images = [
        { src: "/imgs/juventudes/juventudes3.webp", alt: "Mitin Político San Juan de Lurigancho" },
        { src: "/imgs/juventudes/juventudes2.webp", alt: "César Acuña en evento político" },
    ];

    const content: SectionContent[] = [
        {
            src: "/imgs/juventudes/juventudes-1.webp",
            imageAlt: "César Acuña en la inauguración de Alianza Para el Progreso",
            description: `${t('content1')}\n\n${t('content1Extra')}`,
            imagePosition: "left"
        },
        {
            src: "/imgs/juventudes/juventudes1.webp",
            imageAlt: "César Acuña en la inauguración de Alianza Para el Progreso",
            description: t('content2'),
            imagePosition: "right"
        },
    ];

    return (
        <AppLayout title={t('pageTitle')}>
            <BannerWithBackground
                src="/imgs/fondo/cabecera-juventudes.webp"
                srcDark="/imgs/fondo/cabecera-juventudes.webp"
                title={t('bannerTitle')}
            />
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
                            />
                        ))}
                    </div>
                </ContainerTodo>
            </ContainerSingle>

            <ContainerSingle>
                <ContainerTodo>
                    <div className="flex items-center justify-center text-center">
                        <Title
                            title={t('finalMessage1')}
                            fontSize="2xl"
                            className="tracking-widest"
                        />
                    </div>
                </ContainerTodo>
            </ContainerSingle>

            <ContainerSingle className="bg-gray-100 dark:bg-cb-950">
                <ContainerTodo>
                    <ImageGallery
                        images={images}
                        showTitles={true}
                        className="py-8"
                    />
                </ContainerTodo>
            </ContainerSingle>

            <ContainerSingle>
                <ContainerTodo>
                    <div className="flex items-center justify-center text-center">
                        <Title
                            title={t('finalMessage2')}
                            fontSize="3xl"
                            className="tracking-widest"
                        />
                    </div>

                    <div className="pt-8">
                        <SocialLinks
                            socialLinks={juventudesSocialLinks}
                            size="lg"
                        />
                    </div>
                </ContainerTodo>
            </ContainerSingle>
        </AppLayout>
    );
}
