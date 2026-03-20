import { Grid, GridItem, Title, Line } from "@/components/ui";
import CustomCardIconLink from "@/components/ui/card/CustomCardIconLink";
import { motion } from "framer-motion";
import { easeOut } from "framer-motion";
import { usePage } from "@inertiajs/react";
import { getEjesIzquierda, getEjesDerecha } from "@/data/ejes/ejes-data";
import AnimatedSectionTitle from "../ui/AnimatedSectionTitle";

interface EjesSectionProps {
    className?: string;
    imageUrl?: string;
    imageAlt?: string;
}

// Arrays de segmentos de título por idioma
const getTitleSegments = (locale: string) => {
    if (locale === 'qu') {
        return [
            { text: "Sinchi pilareqkuna", breakAfter: true },
            { text: "ñawpaqman puriypi" },
        ];
    }
    return [
        { text: "Pilares sólidos", breakAfter: true },
        { text: "del progreso" },
    ];
};

export default function EjesSection({
    className = "",
    imageUrl = "/imgs/ejes/ejescapweb.webp",
    imageAlt = "Bandera del Perú"
}: EjesSectionProps) {
    const { props } = usePage();
    const locale = (props as any).locale || 'es';

    // Obtener datos de ejes
    const ejesIzquierda = getEjesIzquierda();
    const ejesDerecha = getEjesDerecha();
    const baseUrl = `/${locale}/ejes/`;

    // Variants for central image (expansion from center)
    const imageVariants = {
        hidden: {
            opacity: 0,
            scale: 0,
        },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 1.2,
                delay: 0.3,
                ease: easeOut,
            },
        },
    };

    // Container variants for stagger children
    const containerVariants = {
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2,
            },
        },
    };

    return (
        <motion.section
            className={`${className}`}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={containerVariants}
        >

            <AnimatedSectionTitle
                smallTitle="EJES"
                mainTitleSegments={getTitleSegments(locale)}
            />

            <div className="container mx-auto px-4">
                <Grid className="items-center">
                    <GridItem colSpan={3} className="flex flex-col gap-12 text-center md:text-end">
                        {ejesIzquierda.map((eje, index) => (
                            <div key={`left-${index}`}>
                                <CustomCardIconLink
                                    href={`${baseUrl}${eje.slug}`}
                                    centerText={eje.title}
                                    bottomText={eje.shortDescription}
                                    icon={eje.icon ? <eje.icon className="w-16 h-16" fill="currentColor" /> : undefined}
                                />
                            </div>
                        ))}
                    </GridItem>

                    <GridItem colSpan={6} className="flex justify-center">
                        <motion.div
                            className="overflow-hidden"
                            variants={imageVariants}
                        >
                            <img
                                src={imageUrl}
                                alt={imageAlt}
                                width={550}
                                height={800}
                                loading="lazy"
                                className="object-cover transition-transform duration-300 ease-in-out hover:scale-110"
                            />
                        </motion.div>
                    </GridItem>

                    <GridItem colSpan={3} className="flex flex-col gap-12 text-center md:text-start">
                        {ejesDerecha.map((eje, index) => (
                            <motion.div
                                key={`right-${index}`}
                                custom={index}
                            >
                                <CustomCardIconLink
                                    href={`${baseUrl}${eje.slug}`}
                                    centerText={eje.title}
                                    bottomText={eje.shortDescription}
                                    icon={eje.icon ? <eje.icon className="w-16 h-16" fill="currentColor" /> : undefined}
                                />
                            </motion.div>
                        ))}
                    </GridItem>
                </Grid>
            </div>
        </motion.section>
    );
}
