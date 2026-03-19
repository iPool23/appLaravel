import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Grid } from '@/components/ui/grid/Grid';
import { GridItem } from '@/components/ui/grid/GridItem';
import AnimatedSectionTitle from '@/components/ui/AnimatedSectionTitle';
import CustomBlogCard from '@/components/ui/card/CustomBlogCard';
import ContainerSingle from '@/components/ui/container/ContainerSingle';
import ContainerTodo from '@/components/ui/container/ContainerTodo';
import FaqAccordion from '@/components/ui/accordion/FaqAccordion';
import AppLayout from '@/layouts/AppLayout';
import { Militant } from '../../types/militant';
import { useLocale } from '@/lib/i18n';

interface Props {
    militante: Militant;
}

const Title = ({ title, fontSize = '2xl' }: { title: string; fontSize?: string }) => (
    <h2 className={`font-black uppercase tracking-tighter text-gray-900 dark:text-white leading-none text-${fontSize}`}>
        {title}
    </h2>
);

const MilitantSchedule = ({ schedule }: { schedule: Militant['schedule'] }) => (
    <div className="border-l border-cb-default dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm space-y-3">
        <Title title="Horario de atención" fontSize="xl" />
        <ul className="text-sm space-y-1 text-gray-600 dark:text-gray-300">
            <li><span className="font-medium">Lun-Vie:</span> {schedule.mondayFriday}</li>
            <li><span className="font-medium">Sáb:</span> {schedule.saturday}</li>
            <li><span className="font-medium">Dom:</span> {schedule.sunday}</li>
        </ul>
    </div>
);

const ContactInfoCard = ({ militante }: { militante: Militant }) => (
    <div className="space-y-8">
        <Grid>
            <GridItem colSpan={6}>
                <div className="space-y-6">
                    <div className="flex items-center space-x-4">
                        {militante.image && (
                            <div className="w-14 h-16 relative flex items-center justify-center bg-cr-600 border-l border-cb-default shadow-sm shrink-0 overflow-hidden">
                                <img
                                    src={militante.image}
                                    alt={militante.region}
                                    className="object-contain invert p-2 w-full h-full"
                                />
                            </div>
                        )}
                        <div className="border-l border-cb-default dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm space-y-3 w-full">
                            <Title
                                title={(militante.title || "") + " " + (militante.titleSegment || "")}
                                fontSize="xl"
                            />
                        </div>
                    </div>
                    <div className="border-l border-cb-default dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm space-y-3">
                        <p><span className="font-semibold text-cb-800 dark:text-cb-400">Cargo:</span> {militante.charge || "Sin cargo"}</p>
                    </div>
                    {militante.phone && (
                        <div className="border-l border-cb-default dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm space-y-3">
                            <p><span className="font-semibold text-cb-800 dark:text-cb-400">Teléfono:</span> {militante.phone}</p>
                        </div>
                    )}
                    {militante.local && (
                        <div className="border-l border-cb-default dark:border-gray-700 bg-white dark:bg-gray-800 p-5 shadow-sm space-y-3">
                            <p><span className="font-semibold text-cb-800 dark:text-cb-400">Dirección:</span> {militante.local}</p>
                        </div>
                    )}

                    <MilitantSchedule schedule={militante.schedule} />
                </div>
            </GridItem>
            <GridItem colSpan={6}>
                {militante.srcImage ? (
                    <div className="w-full h-full min-h-[400px] relative items-center justify-center flex">
                        <img
                            src={militante.srcImage}
                            alt={militante.region}
                            className="max-h-full object-contain transform transition-transform hover:scale-105 duration-300"
                        />
                    </div>
                ) : (
                    <div className="w-full h-full bg-gray-100 dark:bg-cb-default/5 rounded-3xl animate-pulse"></div>
                )}
            </GridItem>
        </Grid>
    </div>
);

export default function MilitanteShow({ militante }: Props) {
    return (
        <AppLayout title={militante.region} description={`Información sobre la afiliación en la región ${militante.region}. Cargo, teléfono y dirección local.`}>
            <ContainerSingle className="bg-gray-50 dark:bg-cb-full pt-24 lg:pt-44">
                <ContainerTodo>
                    <AnimatedSectionTitle
                        smallTitle="Militante"
                        mainTitleSegments={[
                            { text: militante.title, breakAfter: !!militante.titleSegment },
                            militante.titleSegment ? { text: militante.titleSegment } : undefined,
                        ].filter(Boolean) as any}
                    />

                    <ContactInfoCard militante={militante} />
                </ContainerTodo>
            </ContainerSingle>

            <ContainerSingle className="pb-16">
                <ContainerTodo>
                    <Grid>
                        <GridItem colSpan={6}>
                            <CustomBlogCard
                                titleTop="Sé parte del cambio"
                                titleCenter="Preguntas sobre como afiliarse en Alianza Para el Progreso"
                                description="Únete a nuestro partido y participa activamente en la construcción de un país con más oportunidades."
                                isImage={false}
                                className="mr-4"
                            />
                        </GridItem>

                        <GridItem colSpan={6}>
                            <FaqAccordion
                                items={[
                                    {
                                        question: "¿Hasta cuándo son las afiliaciones?",
                                        answer: "Las afiliaciones están abiertas de manera permanente, pero para postular en las próximas elecciones debes inscribirte antes del cierre del padrón electoral establecido por el JNE.",
                                    },
                                    {
                                        question: "¿Cuántos invitados puede tener el partido para participar en estas próximas elecciones?",
                                        answer: "El partido puede invitar a ciudadanos independientes, pero la cantidad y modalidad dependen de los lineamientos internos y la normativa electoral vigente.",
                                    },
                                    {
                                        question: "¿Aún me puedo afiliar al partido para participar como candidato a una alcaldía o distrito?",
                                        answer: "Sí, siempre que cumplas con los requisitos de ley y completes tu afiliación antes de la fecha límite oficial de inscripción de candidatos.",
                                    },
                                    {
                                        question: "¿Cuáles son los requisitos para afiliarme?",
                                        answer: "Debes ser mayor de 18 años, tener tu DNI vigente, no estar afiliado a otro partido y llenar la ficha oficial de afiliación.",
                                    },
                                    {
                                        question: "¿La afiliación tiene algún costo?",
                                        answer: "No, la afiliación es completamente gratuita. Solo necesitas presentar tus documentos correctamente.",
                                    },
                                    {
                                        question: "¿Cómo sé si mi afiliación fue aceptada?",
                                        answer: "Recibirás una confirmación oficial del partido y podrás verificar tu afiliación en el Registro de Organizaciones Políticas (ROP) del JNE.",
                                    },
                                ]}
                                defaultOpen={0}
                            />
                        </GridItem>
                    </Grid>
                </ContainerTodo>
            </ContainerSingle>

            {militante.html && (
                <>
                    <AnimatedSectionTitle
                        smallTitle="NUESTRA UBICACIÓN"
                        mainTitleSegments={[
                            { text: "INFORMACIÓN SOBRE LA", breakAfter: true },
                            { text: "UBICACIÓN EN " + militante.region },
                        ]}
                        className="mb-12!"
                    />

                    <div className="relative w-full overflow-hidden lg:aspect-36/9 aspect-video mb-24">
                        <iframe
                            src={militante.html}
                            className="absolute inset-0 w-full h-full border-0"
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                            allowFullScreen
                        />
                    </div>
                </>
            )}
        </AppLayout>
    );
}
