import BannerWithBackground from '@/components/ui/banner/BannerWithBackground';
import ComunicadoCard from '@/components/ui/card/ComunicadoCard';
import CustomCardImage from '@/components/ui/card/CustomCardImage';
import ContainerSingle from '@/components/ui/container/ContainerSingle';
import ContainerTodo from '@/components/ui/container/ContainerTodo';
import { Pagination } from '@/components/ui/pagination/Pagination';
import AppLayout from '@/layouts/AppLayout';
import { useLocale, useTranslations } from '@/lib/i18n';

interface Props {
    articles: any[];
    type: 'Prensa' | 'Comunicado';
    currentPage: number;
    totalPages: number;
}

function formatDate(dateValue: string) {
    const date = new Date(dateValue);
    const monthKeys = ['january', 'february', 'march', 'april', 'may', 'june', 'july', 'august', 'september', 'october', 'november', 'december'];
    return { day: date.getDate(), monthKey: monthKeys[date.getMonth()], year: date.getFullYear() };
}

export default function PressPage({ articles, type, currentPage, totalPages }: Props) {
    const t = useTranslations('press');
    const locale = useLocale();
    const isComunicado = type === 'Comunicado';

    return (
        <AppLayout
            title={isComunicado ? 'Comunicados' : t('title')}
            description={isComunicado ? 'Comunicados oficiales y pronunciamientos institucionales de Alianza Para el Progreso.' : 'Ultimas noticias, comunicados y actividades de Alianza Para el Progreso.'}
            image="/imgs/prensa/2025-02-17-1.jpg"
            keywords={['prensa', 'noticias', 'APP', 'Alianza Para el Progreso', type]}
            canonicalPath={`/${locale}/prensa?type=${encodeURIComponent(type)}`}
        >
            <BannerWithBackground src="/imgs/fondo/fondo-prensa.jpg" title={isComunicado ? 'Comunicados' : t('title')} />
            <ContainerSingle className="bg-gray-100 dark:bg-gray-950">
                <ContainerTodo>
                    <div className="mb-8 flex gap-3">
                        <a href={`/${locale}/prensa?type=Prensa`} className={`rounded-full px-4 py-2 text-sm font-semibold ${!isComunicado ? 'bg-cb-default text-white' : 'bg-white text-cb-default dark:bg-cb-900 dark:text-white'}`}>
                            Prensa
                        </a>
                        <a href={`/${locale}/prensa?type=Comunicado`} className={`rounded-full px-4 py-2 text-sm font-semibold ${isComunicado ? 'bg-cb-default text-white' : 'bg-white text-cb-default dark:bg-cb-900 dark:text-white'}`}>
                            Comunicados
                        </a>
                        <a href={`/${locale}/prensa?type=Comunicado`} className={`rounded-full px-4 py-2 text-sm font-semibold bg-white text-cb-default dark:bg-cb-900 dark:text-white`}>
                            Documentos
                        </a>
                    </div>
                    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                        {articles.map((article) => {
                            const formatted = formatDate(article.publishedAt);
                            const date = `${formatted.day} ${t(`months.${formatted.monthKey}`)} ${formatted.year}`;
                            const articleUrl = `/${locale}/prensa/${article.slug}`;
                            return isComunicado ? (
                                <ComunicadoCard key={article.id} src={article.imageUrl} date={date} bottomText={article.content || article.summary} href={articleUrl} />
                            ) : (
                                <CustomCardImage key={article.id} src={article.imageUrl} centerText={article.title} date={date} bottomText={article.summary} href={articleUrl} socialLink={articleUrl} />
                            );
                        })}
                    </div>
                    <Pagination totalPages={totalPages} currentPage={currentPage} type={type} />
                </ContainerTodo>
            </ContainerSingle>
        </AppLayout>
    );
}
