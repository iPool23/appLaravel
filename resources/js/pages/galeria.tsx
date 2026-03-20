import BannerWithBackground from '@/components/ui/banner/BannerWithBackground';
import ContainerSingle from '@/components/ui/container/ContainerSingle';
import ContainerTodo from '@/components/ui/container/ContainerTodo';
import GalleryContent from '@/components/gallery/GalleryContent';
import AppLayout from '@/layouts/AppLayout';

export default function GaleriaPage() {
    return (
        <AppLayout title="Galería de Imágenes - Eventos y Actividades">
            <BannerWithBackground 
                src="/imgs/fondo/fondo-historia.webp" 
                title="GALERÍA" 
            />
            <ContainerSingle className="py-16">
                <ContainerTodo>
                    <GalleryContent />
                </ContainerTodo>
            </ContainerSingle>
        </AppLayout>
    );
}
