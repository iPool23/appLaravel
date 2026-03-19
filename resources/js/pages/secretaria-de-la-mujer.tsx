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

const secretarySocialLinks = [
    { href: 'https://www.facebook.com/SecretariaNacionaldelaMujerAPP', icon: <FacebookIcon />, label: 'Facebook', bgColor: 'bg-blue-600' },
    { href: 'https://www.instagram.com/senamuapp', icon: <InstagramIcon />, label: 'Instagram', bgColor: 'bg-gradient-to-r from-purple-500 to-pink-500' },
    { href: 'https://www.tiktok.com/@senamuapp', icon: <TikTokIcon />, label: 'tiktok', bgColor: 'bg-black'}
];

interface SectionContent {
    src: string;
    imageAlt: string;
    description: string;
    imagePosition: "left" | "right";
}

export default function SecretariaPage() {
    const t = useTranslations('secretaria');

    const images = [
        { src: "/imgs/secretaria/3.jpg", alt: "Mitin Político San Juan de Lurigancho" },
        { src: "/imgs/secretaria/4.jpg", alt: "César Acuña en evento político" },
        { src: "/imgs/secretaria/5.jpg", alt: "César Acuña en evento político" },
    ];

    const content: SectionContent[] = [
        {
            src: "/imgs/secretaria/1.jpg",
            imageAlt: "César Acuña en la inauguración de Alianza Para el Progreso",
            description: `${t('content1')}\n\n${t('content1Extra')}`,
            imagePosition: "left"
        },
        {
            src: "/imgs/secretaria/2.jpg",
            imageAlt: "César Acuña en la inauguración de Alianza Para el Progreso",
            description: `${t('content2')}\n\n${t('content2Extra')}`,
            imagePosition: "right"
        },
    ];

    return (
        <AppLayout title={t('pageTitle')}>
            <BannerWithBackground
                src="/imgs/fondo/fondo-secretaria.png"
                srcDark="/imgs/fondo/fondo-secretaria.png"
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
                            socialLinks={secretarySocialLinks}
                            size="lg"
                        />
                    </div>
                </ContainerTodo>
            </ContainerSingle>
        </AppLayout>
    );
}
