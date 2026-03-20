import { Link } from '@inertiajs/react';
import ContainerSingle from '@/components/ui/container/ContainerSingle';
import ContainerTodo from '@/components/ui/container/ContainerTodo';
import AppLayout from '@/layouts/AppLayout';
import { Title } from '@/components';
import { FaArrowLeft, FaTag } from 'react-icons/fa';
import { useLocale, useMessages } from '@/lib/i18n';

export default function EjeShowPage({ slug }: { slug: string }) {
    const locale = useLocale();
    const messages = useMessages<any>();
    const eje = messages.axes?.[slug] ?? {};
    const content = (eje.fullContent ?? '') as string;

    if (!eje.title) {
        return (
            <AppLayout title="Eje no encontrado">
                <div className="min-h-screen flex items-center justify-center">
                    <p className="text-xl text-gray-600 dark:text-gray-400">Eje no encontrado</p>
                </div>
            </AppLayout>
        );
    }

    return (
        <AppLayout
            title={`${eje.title} | APP Ejes`}
            description={eje.shortDescription}
            image="/imgs/ejes/ejes-gobierno.webp"
            keywords={['ejes de gobierno', 'APP', eje.category, 'Perú']}
            canonicalPath={`/${locale}/ejes/${slug}`}
        >
            <div className="pt-24 sm:pt-28 md:pt-32 lg:pt-36">
                <ContainerSingle>
                    <ContainerTodo>
                        <div className="max-w-3xl mx-auto">
                            <div className="mb-8">
                                <Link
                                    href={`/${locale}/ejes`}
                                    className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-cb-600 dark:text-gray-400 dark:hover:text-cb-300 transition-colors duration-300"
                                >
                                    <FaArrowLeft className="text-xs" />
                                    <span>Ejes</span>
                                </Link>
                            </div>

                            <header className="mb-12">
                                <Title
                                    title={eje.title}
                                    fontSize="4xl"
                                    className="tracking-tight mb-6 leading-tight"
                                    color="text-gray-900 dark:text-white"
                                    fontWeight="bold"
                                />

                                <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 pb-6 border-b border-gray-200 dark:border-gray-700">
                                    <div className="flex items-center gap-2">
                                        <FaTag className="text-xs text-cb-500" />
                                        <span className="px-2 py-1 bg-cb-100 dark:bg-cb-900 text-cb-700 dark:text-cb-300 rounded-full text-xs">
                                            {eje.category}
                                        </span>
                                    </div>
                                </div>
                            </header>

                            <article className="prose prose-lg prose-gray dark:prose-invert max-w-none">
                                <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                    {content.split('\n\n').map((paragraph: string, index: number) => {
                                        if (paragraph.startsWith('[IMAGE:') && paragraph.endsWith(']')) {
                                            const imageUrl = paragraph.replace('[IMAGE:', '').replace(']', '');
                                            return (
                                                <div key={index} className="my-8 flex justify-center">
                                                    <div className="relative w-full max-w-2xl aspect-video rounded-lg overflow-hidden shadow-lg">
                                                        <img
                                                            src={imageUrl}
                                                            alt={`${eje.title} - Imagen ilustrativa`}
                                                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                                                        />
                                                    </div>
                                                </div>
                                            );
                                        }

                                        if (paragraph.startsWith('## ')) {
                                            return (
                                                <h2 key={index} className="text-2xl font-bold text-cb-700 dark:text-cb-300 mt-8 mb-4">
                                                    {paragraph.replace('## ', '')}
                                                </h2>
                                            );
                                        }

                                        if (paragraph.includes('- **')) {
                                            const items = paragraph.split('\n- ');
                                            return (
                                                <ul key={index} className="mb-6 space-y-3">
                                                    {items.map((item, itemIndex) => {
                                                        if (item.trim()) {
                                                            const processedItem = item
                                                                .replace(/\*\*(.*?)\*\*/g, '<strong class="text-cb-700 dark:text-cb-300">$1</strong>')
                                                                .replace(/^- /, '');

                                                            return (
                                                                <li
                                                                    key={itemIndex}
                                                                    className="text-lg leading-8"
                                                                    dangerouslySetInnerHTML={{ __html: processedItem }}
                                                                />
                                                            );
                                                        }
                                                        return null;
                                                    })}
                                                </ul>
                                            );
                                        }

                                        if (paragraph.trim()) {
                                            const processedParagraph = paragraph.replace(
                                                /\*\*(.*?)\*\*/g,
                                                '<strong class="text-cb-700 dark:text-cb-300">$1</strong>'
                                            );

                                            return (
                                                <p
                                                    key={index}
                                                    className="mb-6 text-lg leading-8 first:text-xl first:leading-9 first:text-gray-800 dark:first:text-gray-200"
                                                    dangerouslySetInnerHTML={{ __html: processedParagraph }}
                                                />
                                            );
                                        }
                                        return null;
                                    })}
                                </div>
                            </article>

                            <div className="mt-16 flex items-center justify-center">
                                <div className="w-12 h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-600 to-transparent"></div>
                            </div>

                            <div className="text-center">
                                <Link
                                    href={`/${locale}/ejes`}
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-cb-600 text-white rounded-lg hover:bg-cb-700 transition-all duration-300 transform hover:scale-105"
                                >
                                    <span>Ver todos los ejes</span>
                                    <FaArrowLeft className="rotate-180 text-sm" />
                                </Link>
                            </div>
                        </div>
                    </ContainerTodo>
                </ContainerSingle>
            </div>
        </AppLayout>
    );
}
