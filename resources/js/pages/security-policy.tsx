import BannerWithBackground from '@/components/ui/banner/BannerWithBackground';
import ContainerSingle from '@/components/ui/container/ContainerSingle';
import ContainerTodo from '@/components/ui/container/ContainerTodo';
import AppLayout from '@/layouts/AppLayout';

export default function SecurityPolicyPage() {
    return (
        <AppLayout title="Política de Seguridad">
            <BannerWithBackground src="/imgs/fondo/fondo-prensa.jpg" title="POLÍTICA DE SEGURIDAD" />
            <ContainerSingle><ContainerTodo><div className="mx-auto max-w-4xl whitespace-pre-line text-base leading-8 text-gray-700 dark:text-gray-300">Aplicamos medidas razonables para proteger la información procesada por el sitio. No obstante, ningún sistema es absolutamente invulnerable, por lo que seguimos mejorando controles técnicos y operativos para reducir riesgos de acceso no autorizado o uso indebido.</div></ContainerTodo></ContainerSingle>
        </AppLayout>
    );
}
