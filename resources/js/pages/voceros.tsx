import BannerWithBackground from '@/components/ui/banner/BannerWithBackground';
import ContainerSingle from '@/components/ui/container/ContainerSingle';
import ContainerTodo from '@/components/ui/container/ContainerTodo';
import PeopleGrid from '@/components/ui/grid/PeopleGrid';
import { voceros } from '@/data/congressman';
import AppLayout from '@/layouts/AppLayout';

export default function VocerosPage() {
    return (
        <AppLayout title="Voceros">
            <BannerWithBackground src="/imgs/fondo/fondo-prensa.webp" title="VOCEROS" />
            <ContainerSingle>
                <ContainerTodo>
                    <PeopleGrid people={voceros} />
                </ContainerTodo>
            </ContainerSingle>
        </AppLayout>
    );
}
