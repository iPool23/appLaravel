"use client";

import { motion } from "framer-motion";

interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
}

export const TextReveal = ({ text, className, delay = 0 }: TextRevealProps) => {
    const words = text.split(" ");

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: 0.1,
                delayChildren: delay,
            },
        },
    };

    const wordVariants = {
        hidden: {
            y: "120%",
        },
        visible: {
            y: "0%",
            transition: {
                duration: 0.6,
                ease: "easeOut" as const,
            },
        },
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-10%" }}
            className="inline-block whitespace-normal text-center"
        >
            {words.map((word, i) => (
                <span
                    key={i}
                    className="inline-block overflow-hidden align-top"
                    style={{ verticalAlign: "bottom" }}
                >
                    <motion.span
                        variants={wordVariants}
                        className={`inline-block ${className}`}
                    >
                        {word}
                    </motion.span>
                    {i < words.length - 1 && (
                        <span className={`${className} inline-block opacity-0`}>&nbsp;</span>
                    )}
                </span>
            ))}
        </motion.div>
    );
};

export default TextReveal;
