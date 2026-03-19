import ContainerSingle from '@/components/ui/container/ContainerSingle';
import ContainerTodo from '@/components/ui/container/ContainerTodo';
import AppLayout from '@/layouts/AppLayout';

export default function MilitantePage() {
    return (
        <AppLayout title="Militante">
            <ContainerSingle className="bg-gray-50 dark:bg-gray-950">
                <ContainerTodo>
                    <div className="mx-auto max-w-3xl rounded-3xl border border-dashed border-gray-300 bg-white p-10 text-center shadow-sm dark:border-gray-700 dark:bg-gray-900">
                        <h1 className="text-3xl font-black uppercase text-gray-900 dark:text-white">Recurso no encontrado</h1>
                        <p className="mt-4 text-base text-gray-600 dark:text-gray-300">No hemos encontrado el recurso que estás buscando.</p>
                    </div>
                </ContainerTodo>
            </ContainerSingle>
        </AppLayout>
    );
}
