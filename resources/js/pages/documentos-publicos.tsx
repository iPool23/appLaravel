import { RiFile2Fill } from "react-icons/ri";
import { DocumentCard } from '@/components/documents/DocumentsCarousel';
import BannerWithBackground from '@/components/ui/banner/BannerWithBackground';
import ContainerSingle from '@/components/ui/container/ContainerSingle';
import ContainerTodo from '@/components/ui/container/ContainerTodo';
import { Pagination } from '@/components/ui/pagination/Pagination';
import AppLayout from '@/layouts/AppLayout';
import { useLocale } from '@/lib/i18n';

interface Props {
    documents: any[];
    currentPage: number;
    totalPages: number;
}

export default function DocumentosPublicosPage({ documents, currentPage, totalPages }: Props) {
    const locale = useLocale();
    const isComunicado = true;

    return (
        <AppLayout
            title="Documentos Públicos y Convocatorias - Alianza Para el Progreso"
            description="Accede de manera transparente a los documentos oficiales, reglamentos, comunicados y convocatorias de Alianza Para el Progreso. Información actualizada para todos los ciudadanos."
            image="/imgs/fondo/fondo-historia.webp"
            keywords={['documentos publicos', 'APP', 'archivos', 'convocatorias', 'transparencia']}
        >
            <BannerWithBackground
                src="/imgs/fondo/fondo-historia.webp"
                title="DOCUMENTOS PÚBLICOS"
            />
            <ContainerSingle className="bg-gray-100 dark:bg-cb-900 border-t border-cb-100 dark:border-cb-800">
                <ContainerTodo>
                    <div className="mb-8 flex gap-3">
                        <a href={`/${locale}/prensa?type=Prensa`} className={`rounded-full px-4 py-2 text-sm font-semibold ${!isComunicado ? 'bg-cb-default text-white' : 'bg-white text-cb-default dark:bg-cb-900 dark:text-white'}`}>
                            Prensa
                        </a>
                        <a href={`/${locale}/prensa?type=Comunicado`} className={`rounded-full px-4 py-2 text-sm font-semibold ${!isComunicado ? 'bg-cb-default text-white' : 'bg-white text-cb-default dark:bg-cb-900 dark:text-white'}`}>
                            Comunicados
                        </a>
                        <a href={`/${locale}/prensa?type=Comunicado`} className={`rounded-full px-4 py-2 text-sm font-semibold bg-cb-default text-white`}>
                            Documentos
                        </a>
                    </div>

                    {documents.length === 0 ? (
                        <div className="text-center py-20 bg-white dark:bg-cb-800 rounded-3xl shadow-sm border border-cb-100 dark:border-cb-700">
                            <RiFile2Fill className="w-20 h-20 text-cb-200 dark:text-cb-600 mx-auto mb-6" />
                            <h3 className="text-2xl font-bold text-cb-800 dark:text-white mb-2">No hay documentos disponibles</h3>
                            <p className="text-cb-500 dark:text-cb-400">Vuelve pronto para ver las últimas actualizaciones.</p>
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {documents.map((doc: any) => (
                                    <DocumentCard key={doc.id ?? doc.slug} doc={doc} locale={locale} />
                                ))}
                            </div>
                            {totalPages > 1 && (
                                <Pagination totalPages={totalPages} currentPage={currentPage ?? 1} />
                            )}
                        </>
                    )}
                </ContainerTodo>
            </ContainerSingle>
        </AppLayout>
    );
}
