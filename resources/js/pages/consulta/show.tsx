import React from 'react';
import AppLayout from '@/layouts/AppLayout';
import ContainerSingle from '@/components/ui/container/ContainerSingle';
import ContainerTodo from '@/components/ui/container/ContainerTodo';
import AnimatedSectionTitle from '@/components/ui/AnimatedSectionTitle';
import BannerWithBackground from '@/components/ui/banner/BannerWithBackground';
import { Candidate } from '@/types/candidate';
import { Download, Facebook, Twitter, Instagram, Linkedin, MessageCircle, MapPin, Briefcase, Award } from 'lucide-react';

interface Props {
    candidate: Candidate;
}

const SocialIcon = ({ iconClass }: { iconClass: string }) => {
    const icon = iconClass.toLowerCase();
    if (icon.includes('facebook')) return <Facebook size={20} />;
    if (icon.includes('twitter') || icon.includes('x')) return <Twitter size={20} />;
    if (icon.includes('instagram')) return <Instagram size={20} />;
    if (icon.includes('linkedin')) return <Linkedin size={20} />;
    if (icon.includes('whatsapp')) return <MessageCircle size={20} />;
    return <Award size={20} />;
};

export default function ConsultaShow({ candidate }: Props) {
    return (
        <AppLayout title={candidate.nombre_completo || 'Detalle del Candidato'} description={`Consulta el perfil completo de ${candidate.nombre_completo}, sus propuestas para las elecciones presidenciales 2026 y su hoja de vida.`}>
            <BannerWithBackground
                src="/imgs/consulta/elecciones-internas.webp"
                srcDark="/imgs/consulta/elecciones-internas.webp"
                title='Perfil del Candidato'
                className="brightness-50"
            />
            
            <ContainerSingle className="bg-white dark:bg-cb-full pt-16 pb-24">
                <ContainerTodo>
                    <div className="relative z-10 -mt-40 md:-mt-56 mb-16">
                        <div className="flex flex-col items-center">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-cb-default rounded-full blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                                <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-8 border-white dark:border-cb-full shadow-2xl overflow-hidden bg-white">
                                    <img
                                        src={candidate.foto_url || '/imgs/consulta/logoA.webp'}
                                        alt={candidate.nombre_completo}
                                        className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                                    />
                                </div>
                            </div>

                            <div className="mt-8 text-center bg-white/70 dark:bg-cb-default/10 backdrop-blur-xl p-8 rounded-[3rem] border border-gray-100 dark:border-cb-300/10 shadow-lg max-w-2xl w-full">
                                <h1 className="text-3xl md:text-5xl font-black uppercase tracking-tighter text-cb-default dark:text-white mb-4">
                                    {candidate.nombre_completo || `Candidato ${candidate.id_candidato}`}
                                </h1>
                                <div className="flex flex-wrap justify-center gap-4 text-sm font-black uppercase tracking-[0.15em]">
                                    <span className="px-4 py-2 bg-cb-default/5 dark:bg-cb-400/10 text-cb-default dark:text-cb-400 rounded-full border border-cb-default/10">
                                        {candidate.nombre_cargo || `Cargo ${candidate.id_cargo}`}
                                    </span>
                                    {candidate.nombre_departamento && (
                                        <span className="px-4 py-2 bg-gray-50 dark:bg-white/5 text-gray-500 dark:text-gray-400 rounded-full border border-gray-100 dark:border-white/5 flex items-center gap-2">
                                            <MapPin size={14} />
                                            {candidate.nombre_departamento}
                                        </span>
                                    )}
                                    <span className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full">
                                        {candidate.condicion_candidato === 'afiliado' ? 'Afiliado' : 'Designado'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mt-16">
                        <div className="space-y-12">
                            <AnimatedSectionTitle
                                smallTitle="Información Personal"
                                mainTitleSegments={[{ text: "Sobre el Candidato" }]}
                                className="mb-6!"
                            />

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {candidate.ocupacion && (
                                    <div className="p-6 bg-gray-50 dark:bg-cb-default/10 rounded-3xl border border-gray-100 dark:border-cb-300/10">
                                        <Briefcase className="text-cb-default mb-4" />
                                        <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-1">Ocupación</h4>
                                        <p className="text-gray-900 dark:text-white font-bold">{candidate.ocupacion}</p>
                                    </div>
                                )}
                                {candidate.correo && (
                                    <div className="p-6 bg-gray-50 dark:bg-cb-default/10 rounded-3xl border border-gray-100 dark:border-cb-300/10">
                                        <div className="w-6 h-6 rounded-full bg-cb-default flex items-center justify-center text-white mb-4 font-black">@</div>
                                        <h4 className="text-xs font-black uppercase tracking-wider text-gray-400 mb-1">Correo Electrónico</h4>
                                        <p className="text-gray-900 dark:text-white font-bold break-all">{candidate.correo}</p>
                                    </div>
                                )}
                            </div>

                            {candidate.cv_url && (
                                <div className="p-8 bg-cb-default rounded-[2.5rem] text-white flex flex-col items-center justify-center gap-6 shadow-xl shadow-cb-default/20 transform hover:-translate-y-1 transition-all">
                                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                                        <Download size={32} />
                                    </div>
                                    <div className="text-center">
                                        <h4 className="text-xl font-black uppercase tracking-tighter">Hoja de Vida</h4>
                                        <p className="text-white/70 text-sm font-medium mt-1 uppercase tracking-wider">Documento Oficial JNE</p>
                                    </div>
                                    <a
                                        href={`https://portal-intranet.app.pe/${candidate.cv_url}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="w-full py-4 bg-white text-cb-default font-black uppercase tracking-widest text-sm rounded-2xl text-center hover:bg-gray-100 transition-colors"
                                    >
                                        Descargar PDF
                                    </a>
                                </div>
                            )}

                            {candidate.redes_sociales && candidate.redes_sociales.length > 0 && (
                                <div className="space-y-6">
                                    <h4 className="text-sm font-black uppercase tracking-widest text-cb-default dark:text-cb-400">Canales Oficiales</h4>
                                    <div className="flex flex-wrap gap-4">
                                        {candidate.redes_sociales.map((red, index) => (
                                            <a
                                                key={index}
                                                href={red.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="px-6 py-4 bg-white dark:bg-cb-default/10 border border-gray-100 dark:border-cb-300/10 rounded-2xl flex items-center gap-3 hover:bg-cb-default hover:text-white dark:hover:bg-cb-default transition-all duration-300 group shadow-sm hover:shadow-md"
                                            >
                                                <div className="text-cb-default group-hover:text-white transition-colors">
                                                    <SocialIcon iconClass={red.icono_class} />
                                                </div>
                                                <span className="font-bold uppercase tracking-wider text-sm">{red.nombre}</span>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="space-y-12">
                            <AnimatedSectionTitle
                                smallTitle="Propuestas de Trabajo"
                                mainTitleSegments={[{ text: "Plan de Gobierno" }]}
                                className="mb-6!"
                            />

                            {candidate.propuestas_detalladas && candidate.propuestas_detalladas.length > 0 ? (
                                <div className="space-y-8">
                                    {candidate.propuestas_detalladas.map((propuesta, index) => (
                                        <div key={index} className="p-8 bg-white dark:bg-cb-full border border-gray-100 dark:border-cb-300/10 rounded-[3rem] shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden group">
                                            {propuesta.imagen_referencia_url && (
                                                <div className="mb-8 -mx-8 -mt-8 overflow-hidden aspect-video">
                                                    <img
                                                        src={propuesta.imagen_referencia_url}
                                                        alt={propuesta.titulo}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                                    />
                                                </div>
                                            )}
                                            <h3 className="text-2xl font-black uppercase tracking-tighter text-gray-900 dark:text-white mb-4 group-hover:text-cb-default transition-colors">
                                                {propuesta.titulo}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-400 font-medium leading-relaxed">
                                                {propuesta.descripcion_completa}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="p-12 text-center bg-gray-50 dark:bg-cb-default/5 rounded-[3rem] border-2 border-dashed border-gray-200 dark:border-cb-300/10">
                                    <p className="text-gray-400 font-bold uppercase tracking-widest text-sm">Propuestas en Proceso de Registro</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {(candidate.nombre_provincia || candidate.nombre_distrito || candidate.nombre_centro_poblado) && (
                        <div className="mt-24">
                            <AnimatedSectionTitle
                                smallTitle="Ubicación Electoral"
                                mainTitleSegments={[{ text: "Jurisdicción a la que Postula" }]}
                                className="mb-12!"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {candidate.nombre_provincia && (
                                    <div className="p-8 bg-white dark:bg-cb-default/10 rounded-[2.5rem] border border-gray-100 dark:border-cb-300/10 text-center flex flex-col items-center group hover:-translate-y-2 transition-transform">
                                        <div className="w-12 h-12 bg-cb-default/5 text-cb-default rounded-2xl flex items-center justify-center mb-6 font-black group-hover:bg-cb-default group-hover:text-white transition-colors">P</div>
                                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Provincia</h3>
                                        <p className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">{candidate.nombre_provincia}</p>
                                    </div>
                                )}
                                {candidate.nombre_distrito && (
                                    <div className="p-8 bg-white dark:bg-cb-default/10 rounded-[2.5rem] border border-gray-100 dark:border-cb-300/10 text-center flex flex-col items-center group hover:-translate-y-2 transition-transform">
                                        <div className="w-12 h-12 bg-cb-default/5 text-cb-default rounded-2xl flex items-center justify-center mb-6 font-black group-hover:bg-cb-default group-hover:text-white transition-colors">D</div>
                                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Distrito</h3>
                                        <p className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">{candidate.nombre_distrito}</p>
                                    </div>
                                )}
                                {candidate.nombre_centro_poblado && (
                                    <div className="p-8 bg-white dark:bg-cb-default/10 rounded-[2.5rem] border border-gray-100 dark:border-cb-300/10 text-center flex flex-col items-center group hover:-translate-y-2 transition-transform">
                                        <div className="w-12 h-12 bg-cb-default/5 text-cb-default rounded-2xl flex items-center justify-center mb-6 font-black group-hover:bg-cb-default group-hover:text-white transition-colors">CP</div>
                                        <h3 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400 mb-2">Centro Poblado</h3>
                                        <p className="text-xl font-black text-gray-900 dark:text-white uppercase tracking-tighter">{candidate.nombre_centro_poblado}</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </ContainerTodo>
            </ContainerSingle>
        </AppLayout>
    );
}
