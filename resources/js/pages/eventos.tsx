import BannerWithBackground from '@/components/ui/banner/BannerWithBackground';
import ContainerSingle from '@/components/ui/container/ContainerSingle';
import ContainerTodo from '@/components/ui/container/ContainerTodo';
import AppLayout from '@/layouts/AppLayout';

const eventImages = ['/imgs/gallery/7.jpg', '/imgs/gallery/8.jpg', '/imgs/gallery/9.jpg'];

export default function EventosPage() {
    return (
        <AppLayout title="Eventos">
            <BannerWithBackground src="/imgs/fondo/fondo-prensa.jpg" title="EVENTOS" />
            <ContainerSingle>
                <ContainerTodo>
                    <div className="grid gap-8 lg:grid-cols-3">
                        {eventImages.map((image, index) => (
                            <article key={image} className="rounded-3xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                                <img src={image} alt={`Evento ${index + 1}`} className="h-56 w-full rounded-2xl object-cover" />
                                <h2 className="mt-4 text-xl font-black uppercase text-gray-900 dark:text-white">Evento {index + 1}</h2>
                                <p className="mt-2 text-sm leading-7 text-gray-600 dark:text-gray-300">Cobertura institucional y actividades públicas del partido.</p>
                            </article>
                        ))}
                    </div>
                </ContainerTodo>
            </ContainerSingle>
        </AppLayout>
    );
}
