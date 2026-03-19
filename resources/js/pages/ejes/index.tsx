import { EjesSection } from '@/components';
import AnimatedSectionTitle from '@/components/ui/AnimatedSectionTitle';
import ContainerSingle from '@/components/ui/container/ContainerSingle';
import AppLayout from '@/layouts/AppLayout';
import { Button } from '@/components/ui/button';
import { Download, Eye } from 'lucide-react';
import { useLocale } from '@/lib/i18n';

export default function EjesPage() {
    const locale = useLocale();

    const getTitleSegments = (locale: string) => {
        if (locale === 'qu') {
            return [
                { text: "Sinchi pilareqkuna", breakAfter: true },
                { text: "ñawpaqman puriypi" },
            ];
        }
        return [
            { text: "Plan de Gobierno", breakAfter: true },
            { text: "Alianza Para el Progreso" },
        ];
    };

    return (
        <AppLayout
            title="Ejes de Gobierno - Propuestas para el Perú"
            description="Conoce los 6 ejes de gobierno de Alianza Para el Progreso: Erradicar la pobreza, Educación para el empleo, Seguridad ciudadana, Salud para todos, Desarrollo económico y Reforma del Estado."
            image="/imgs/ejes/ejes-gobierno.jpg"
            keywords={['ejes de gobierno', 'APP', 'Alianza Para el Progreso', 'propuestas políticas', 'Perú']}
            canonicalPath={`/${locale}/ejes`}
        >
            <ContainerSingle className="bg-gray-50 dark:bg-cb-full pt-36!">
                <EjesSection />
            </ContainerSingle>

            <ContainerSingle className="bg-gray-50 dark:bg-cb-full">
                <AnimatedSectionTitle
                    smallTitle="2026 - 2031"
                    mainTitleSegments={getTitleSegments(locale)}
                />

                <div className='mx-auto flex items-center justify-center'>
                    <iframe
                        src="/pdf/plan-de-gobierno.pdf"
                        width="50%"
                        height="600px"
                        title="Ejes de Gobierno - Propuestas para el Perú"
                        className="border-none rounded-xl shadow-xl dark:shadow-cb-950/30 overflow-hidden"
                    ></iframe>
                </div>

                <div className="flex flex-col sm:flex-row justify-center gap-4 mt-10 no-print px-20">
                    <Button asChild variant="default" size="lg" className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-cb hover:bg-cb-700 dark:bg-cb dark:hover:bg-cb-400 text-white">
                        <a href="/pdf/plan-de-gobierno.pdf" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <Eye className="w-5 h-5" />
                            {locale === 'qu' ? 'Plan de Gobiernota qhaway' : 'Ver Plan de Gobierno'}
                        </a>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-full shadow-md hover:shadow-lg transition-all duration-300 border-cb/20 hover:bg-cb/5 dark:border-white/20 dark:text-white dark:hover:bg-white/10 dark:bg-white/5">
                        <a href="/pdf/plan-de-gobierno.pdf" download="plan-de-gobierno-app.pdf" className="flex items-center gap-2">
                            <Download className="w-5 h-5" />
                            {locale === 'qu' ? 'PDFta uraykuchiy' : 'Descargar PDF'}
                        </a>
                    </Button>
                </div>

            </ContainerSingle>
        </AppLayout>
    );
}
