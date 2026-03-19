import { Link } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaArrowLeft, FaSpotify, FaWhatsapp } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { TbWorld } from "react-icons/tb";
import { Title } from '@/components';
import MemberBack from '@/components/svg/MemberBack';
import TwitterIconOutline from '@/components/svg/TwitterIconOutline';
import Container from '@/components/ui/container/Container';
import directiveMembers from '@/data/members/directiveMembers';
import AppLayout from '@/layouts/AppLayout';

export default function MemberPage({ slug }: { slug: string }) {
    const member = directiveMembers.find((m) => m.slug === slug);

    if (!member) {
        return (
            <AppLayout title="Miembro no encontrado">
                <div className="flex h-screen items-center justify-center">
                    <p className="text-2xl font-bold font-gotham-bold text-cb-default">Miembro no encontrado</p>
                </div>
            </AppLayout>
        );
    }

    const getSocialIcon = (provider: string) => {
        switch (provider.toLowerCase()) {
            case "facebook": return FaFacebook;
            case "twitter":
            case "x": return TwitterIconOutline;
            case "instagram": return FaInstagram;
            case "youtube": return FaYoutube;
            case "tiktok": return SiTiktok;
            case "linkedin": return FaLinkedin;
            case "spotify": return FaSpotify;
            case "whatsapp": return FaWhatsapp;
            case "website": return TbWorld;
            default: return null;
        }
    };

    return (
        <AppLayout 
            title={`${member.centerText} - ${member.bottomText}`}
            description={`Conoce más sobre ${member.centerText}, ${member.bottomText} de Alianza para el Progreso.`}
        >
            {/* Mobile Design */}
            <div className="lg:hidden pt-24 pb-12 overflow-hidden">
                <Container>
                    <div className="group">
                        <div className="mb-6">
                            <Link
                                href="/"
                                className="inline-flex items-center gap-2 text-cb-600 hover:text-cb-700 transition-colors font-medium font-gotham-bold"
                            >
                                <FaArrowLeft className="w-4 h-4" />
                                Volver a la Directiva
                            </Link>
                        </div>

                        <div className="h-full flex flex-col items-center">
                            <div className="flex justify-center mb-8 relative">
                                <div className="absolute inset-0 bg-cr-600/20 blur-3xl rounded-full scale-150 -z-10"></div>
                                <div className="rounded-t-none rounded-b-full bg-white dark:bg-transparent shadow-2xl shadow-cb-default/30 overflow-hidden border-t-8 border-cr-600 transform transition-transform duration-500 group-hover:scale-105">
                                    <div className="rounded-t-none rounded-b-full w-[280px] h-[280px]">
                                        <img
                                            src={member.src}
                                            alt={member.centerText}
                                            className="rounded-t-none rounded-b-full w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="px-4 text-center">
                                <motion.h3 
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="text-4xl font-black text-cb-default dark:text-cb-50 leading-tight uppercase font-gotham-bold"
                                >
                                    {member.centerText}
                                </motion.h3>

                                <div className="flex justify-center my-6">
                                    <div className="w-24 h-2 bg-cr-600 dark:bg-cr-500 rounded-full"></div>
                                </div>

                                <motion.p 
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="text-cb-default dark:text-cb-100 leading-relaxed text-xl mb-8 italic font-gotham-bold uppercase tracking-widest"
                                >
                                    {member.bottomText}
                                </motion.p>

                                {member.socialLinks && member.socialLinks.length > 0 && (
                                    <div className="flex justify-center flex-wrap gap-4 mb-10">
                                        {member.socialLinks.map((social, index) => {
                                            const Icon = getSocialIcon(social.provider);
                                            if (!Icon) return null;
                                            return (
                                                <a
                                                    key={index}
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="p-4 bg-cb-default text-white rounded-2xl transition-all shadow-lg hover:bg-cr-600 hover:scale-110 active:scale-95"
                                                    title={social.provider}
                                                >
                                                    <Icon className="w-6 h-6" />
                                                </a>
                                            );
                                        })}
                                    </div>
                                )}

                                <p className="text-cb-600 dark:text-cb-300 leading-relaxed text-lg mb-10 max-w-sm mx-auto font-gotham-light drop-shadow-sm">
                                    Comprometido con el desarrollo y fortalecimiento de Alianza para el Progreso,
                                    trabajando cada día por un mejor futuro para el Perú.
                                </p>

                                {member.signature && (
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="flex justify-center mt-6"
                                    >
                                        <img
                                            src={member.signature}
                                            alt="Firma"
                                            className="w-56 h-auto opacity-100 drop-shadow-xl dark:invert"
                                        />
                                    </motion.div>
                                )}
                            </div>
                        </div>
                    </div>
                </Container>
            </div>

            <div className="hidden lg:block min-h-screen bg-white dark:bg-cb-full">
                <Container>
                    <div className="relative z-10 mx-auto px-4 lg:px-8 pt-32 pb-40">
                        <div className="relative overflow-hidden rounded-[3rem] pt-60 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] min-h-[850px]">
                            <div className="absolute inset-0 -z-10 bg-cb-950">
                                <MemberBack className="w-full h-full object-cover opacity-100 grayscale-[0.2] contrast-125" />
                                <div className="absolute inset-0 bg-linear-to-t from-cb-950/80 via-transparent to-cb-950/20"></div>
                            </div>
                            
                            <div className="absolute top-10 left-10 z-20">
                                <Link
                                    href="/"
                                    className="inline-flex items-center gap-3 text-white/80 hover:text-white transition-all font-gotham-bold group"
                                >
                                    <div className="bg-white/10 backdrop-blur-md p-3 rounded-full border border-white/20 group-hover:-translate-x-2 transition-transform">
                                        <FaArrowLeft className="w-4 h-4" />
                                    </div>
                                    <span className="text-lg">Volver a la Directiva</span>
                                </Link>
                            </div>

                            <div className="relative z-10 grid lg:grid-cols-2 items-stretch h-full">
                                <div className="pl-28 pb-20 flex flex-col justify-end h-full">
                                    <div className="animate-in slide-in-from-left duration-1000">
                                        <Title
                                            segments={
                                                [
                                                    { text: member.centerText.split(" ")[0] || "", color: "text-white", breakAfter: true, },
                                                    { text: member.centerText.split(" ").slice(1).join(" ") || "", color: "text-cb-300" },
                                                ]
                                            }
                                            fontSize="8xl"
                                            className="leading-[0.85] font-black font-gotham-bold drop-shadow-[0_10px_10px_rgba(0,0,0,0.5)]"
                                        />
                                        
                                        <div className="w-40 h-2 bg-white rounded-full my-10 shadow-lg shadow-white/20"></div>
                                        
                                        <Title
                                            title={member.bottomText}
                                            fontSize="3xl"
                                            fontWeight="light"
                                            color="text-white/90"
                                            className="mb-14 italic uppercase tracking-[0.2em] font-gotham-bold"
                                        />

                                        <p className="text-white text-2xl leading-relaxed max-w-lg font-gotham-light drop-shadow-md">
                                            Comprometido con el desarrollo y fortalecimiento de Alianza para el Progreso,
                                            trabajando cada día por un mejor futuro para el Perú.
                                        </p>
                                    </div>
                                </div>

                                <div className="relative h-full flex items-end justify-center pr-28 pb-0">
                                    <div className="relative group animate-in zoom-in duration-1200 ease-out">
                                        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-[120%] h-40 bg-cb-600/30 blur-[120px] rounded-full -z-10"></div>
                                        
                                        <img
                                            src={member.src}
                                            alt={member.centerText}
                                            className="relative z-10 h-[750px] w-auto object-contain transform scale-110 translate-y-4 transition-all duration-700 group-hover:scale-[1.12] group-hover:translate-y-2 drop-shadow-[0_45px_45px_rgba(0,0,0,0.6)]"
                                        />
                                        
                                        {member.signature && (
                                            <div className="absolute bottom-20 -right-20 z-20 animate-in fade-in slide-in-from-right-20 duration-1000 delay-700">
                                                <img
                                                    src={member.signature}
                                                    alt="Firma"
                                                    className="w-80 h-auto drop-shadow-[0_20px_20px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-110 hover:-rotate-3 dark:invert opacity-100"
                                                />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {member.socialLinks && member.socialLinks.length > 0 && (
                                <div className="absolute top-10 right-10 z-20 flex flex-col items-center bg-cb-default/90 backdrop-blur-xl py-10 px-5 rounded-3xl shadow-2xl border border-white/10 animate-in slide-in-from-top duration-700 delay-300">
                                    <p className="text-white text-xs font-black mb-12 tracking-[0.4em] uppercase transform rotate-90 whitespace-nowrap opacity-60">
                                        Síguenos
                                    </p>
                                    <div className="flex flex-col gap-6 mt-10">
                                        {member.socialLinks.map((social, index) => {
                                            const Icon = getSocialIcon(social.provider);
                                            if (!Icon) return null;
                                            return (
                                                <a
                                                    key={index}
                                                    href={social.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="group flex items-center justify-center p-4 bg-white/5 hover:bg-cr-600 text-white rounded-2xl transition-all duration-300 hover:scale-115 hover:shadow-[0_0_20px_rgba(227,43,54,0.4)] border border-white/5"
                                                    title={social.provider}
                                                >
                                                    <Icon className="w-7 h-7" />
                                                </a>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </Container>
            </div>
        </AppLayout>
    );
}
