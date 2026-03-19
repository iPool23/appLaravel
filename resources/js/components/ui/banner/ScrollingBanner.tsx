"use client";

import React from "react";
import { motion, easeOut } from "framer-motion";

interface ScrollingBannerProps {
    text?: string;
    icon?: React.ReactNode;
}

export const ScrollingBanner = ({ text = "", icon }: ScrollingBannerProps) => {
    const containerVariants = {
        hidden: {
            opacity: 0,
            y: 50,
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

    const itemVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
        },
        visible: (index: number) => ({
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                delay: index * 0.1,
                ease: easeOut,
            },
        }),
    };

    return (
        <motion.div
            className="w-full overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
        >
            <div className="flex animate-scroll whitespace-nowrap">
                {[...Array(6)].map((_, index) => (
                    <motion.div
                        key={index}
                        className="flex items-center text-cb-600 dark:text-cb-100 mx-12 flex-shrink-0"
                        variants={itemVariants}
                        custom={index}
                    >
                        <div className="flex items-center justify-center space-x-4">
                            {icon && (
                                <motion.div
                                    className="flex items-center justify-center"
                                    whileHover={{
                                        scale: 1,
                                        transition: { duration: 0.3 }
                                    }}
                                >
                                    {icon}
                                </motion.div>
                            )}
                            <motion.h2
                                className="font-gotham-bold text-[100px] font-bold tracking-[-0.4rem] uppercase leading-none"
                                whileHover={{
                                    scale: 1.02,
                                    transition: { duration: 0.3 }
                                }}
                            >
                                {text}
                            </motion.h2>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};
