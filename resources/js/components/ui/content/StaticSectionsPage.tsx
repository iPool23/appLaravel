import AppLayout from '@/layouts/AppLayout';
import BannerWithBackground from '@/components/ui/banner/BannerWithBackground';
import ContainerSingle from '@/components/ui/container/ContainerSingle';
import ContainerTodo from '@/components/ui/container/ContainerTodo';
import ContentSection from '@/components/ui/content/ContentSection';
import AnimatedSectionTitle from '@/components/ui/AnimatedSectionTitle';
import { useMessages, useTranslations } from '@/lib/i18n';

type SectionRecord = Record<string, string>;

type NamespaceObject = {
    title?: string;
    pageTitle?: string;
    description?: string;
    smallTitle?: string;
    mainTitle?: string;
    finalMessage?: string;
    sections?: SectionRecord;
};

type MessagesShape = Record<string, NamespaceObject>;

interface Props {
    namespace: keyof MessagesShape & string;
    bannerImage: string;
    sectionImages: string[];
}

export default function StaticSectionsPage({ namespace, bannerImage, sectionImages }: Props) {
    const t = useTranslations(namespace);
    const messages = useMessages<MessagesShape>();
    const content = messages[namespace] ?? {};
    const sections = Object.values(content.sections ?? {});

    return (
        <AppLayout
            title={content.pageTitle ?? content.title}
            description={content.description}
            image={bannerImage}
        >
            <BannerWithBackground src={bannerImage} title={content.title ?? ''} />
            <ContainerSingle>
                <ContainerTodo>
                    <AnimatedSectionTitle
                        smallTitle={content.smallTitle ?? content.title}
                        mainTitleSegments={[{ text: content.mainTitle ?? content.title ?? '' }]}
                    />
                    <div className="space-y-16">
                        {sections.map((section, index) => (
                            <ContentSection
                                key={index}
                                imageSrc={sectionImages[index % sectionImages.length]}
                                imageAlt={content.title ?? namespace}
                                description={section}
                                reverse={index % 2 === 1}
                            />
                        ))}
                    </div>
                    {content.finalMessage ? (
                        <div className="mt-16 text-center text-xl font-semibold text-gray-800 dark:text-white">
                            {content.finalMessage}
                        </div>
                    ) : null}
                </ContainerTodo>
            </ContainerSingle>
        </AppLayout>
    );
}
