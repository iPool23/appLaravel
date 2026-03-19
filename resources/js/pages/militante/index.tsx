import React from 'react';
import { Head, Link } from '@inertiajs/react';
import ContainerSingle from '@/components/ui/container/ContainerSingle';
import ContainerTodo from '@/components/ui/container/ContainerTodo';
import AnimatedSectionTitle from '@/components/ui/AnimatedSectionTitle';
import CustomCardImageRegion from '@/components/ui/card/CustomCardImageRegion';
import AppLayout from '@/layouts/AppLayout';
import { Militant } from '../../types/militant';
import { useLocale } from '@/lib/i18n';

interface Props {
    militants: Militant[];
}

export default function MilitanteIndex({ militants }: Props) {
    const locale = useLocale();

    return (
        <AppLayout title="Militantes" description="Construyamos el futuro de Alianza Para el Progreso. Encuentra información sobre afiliación por región.">
            <ContainerSingle className="bg-gray-50 dark:bg-cb-full pt-24 lg:pt-44 pb-16">
                <ContainerTodo>
                    <AnimatedSectionTitle
                        smallTitle="Militantes"
                        mainTitleSegments={[
                            { text: "Construyamos", breakAfter: true },
                            { text: "el futuro" },
                        ]}
                    />

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12">
                        {militants.map((militantItem) => (
                            <CustomCardImageRegion
                                key={militantItem.slug}
                                image={militantItem.image}
                                srcImage={militantItem.srcImage}
                                region={militantItem.region}
                                charge={militantItem.charge || "Recepción General"}
                                slug={`/${locale}/militante/${militantItem.slug}`}
                                schedule={militantItem.schedule}
                                location={militantItem.local}
                            />
                        ))}
                    </div>
                </ContainerTodo>
            </ContainerSingle>
        </AppLayout>
    );
}
