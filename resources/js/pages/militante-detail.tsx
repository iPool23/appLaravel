import ContainerSingle from '@/components/ui/container/ContainerSingle';
import ContainerTodo from '@/components/ui/container/ContainerTodo';
import AppLayout from '@/layouts/AppLayout';

export default function MilitanteDetailPage({ slug }: { slug: string }) {
    return (
        <AppLayout title={slug}>
            <ContainerSingle>
                <ContainerTodo>
                    <div className="mx-auto max-w-3xl text-center text-lg text-gray-700 dark:text-gray-300">Perfil de militante: {slug}</div>
                </ContainerTodo>
            </ContainerSingle>
        </AppLayout>
    );
}
