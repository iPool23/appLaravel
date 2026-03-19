"use client"

import React from 'react';
import { easeOut, motion } from 'framer-motion';
import { Title } from '@/components';
import Line from './line';
import { Link } from '@inertiajs/react';

interface AnimatedSectionTitleProps {
    smallTitle: string;
    mainTitleSegments: Array<{ text: string; breakAfter?: boolean }>;
    showLine?: boolean;
    className?: string;
    href?: string;
    titleClassName?: string;
}

const AnimatedSectionTitle: React.FC<AnimatedSectionTitleProps> = ({
    smallTitle,
    mainTitleSegments,
    showLine = true,
    className = "",
    href,
    titleClassName = ""
}) => {
    // Variantes de animación para los títulos
    const titleVariants = {
        hidden: {
            opacity: 0,
            y: 30,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.8,
                ease: easeOut,
            },
        },
    };

    // Variantes para los segmentos del título principal
    const segmentVariants = {
        hidden: {
            opacity: 0,
            y: 50,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 1,
                ease: easeOut,
                delay: 0.2,
            },
        },
    };

    // Variantes para la línea
    const lineVariants = {
        hidden: {
            opacity: 0,
            scaleX: 0,
        },
        visible: {
            opacity: 1,
            scaleX: 1,
            transition: {
                duration: 0.8,
                ease: easeOut,
            },
        },
    };

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
        >
            {showLine && (
                <motion.div variants={lineVariants}>
                    <Line />
                </motion.div>
            )}

            <motion.div
                className={`flex items-center justify-center text-center pt-4 pb-6 ${titleClassName}`}
                variants={titleVariants}
            >
                {href ? (
                    <Link href={href} className="group relative">
                        <Title
                            title={smallTitle}
                            fontSize="md"
                            className="tracking-widest uppercase transition-all duration-300 group-hover:text-cr-600 dark:group-hover:text-cr-400 group-hover:scale-105"
                            color="text-cr-default dark:text-cr-500"
                        />
                        <span className="absolute -bottom-1 left-1/2 w-0 h-0.5 bg-cr-default dark:bg-cr-500 transition-all duration-300 group-hover:w-full group-hover:left-0 opacity-0 group-hover:opacity-100" />
                    </Link>
                ) : (
                    <Title
                        title={smallTitle}
                        fontSize="md"
                        className="tracking-widest uppercase"
                        color="text-cr-default dark:text-cr-500"
                    />
                )}
            </motion.div>

            <motion.div
                className="flex items-center justify-center text-center pb-12"
                variants={segmentVariants}
            >
                <Title
                    segments={mainTitleSegments}
                    fontSize="3xl"
                    className="tracking-widest uppercase"
                    color="text-cb-default dark:text-cb-200"
                />
            </motion.div>
        </motion.div>
    );
};

export default AnimatedSectionTitle;

