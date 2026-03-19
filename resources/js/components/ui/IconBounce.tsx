"use client";

import React from 'react';
import { motion, easeInOut } from 'framer-motion';

interface IconBounceProps {
    children: React.ReactNode;
    className?: string;
    infinite?: boolean;
    size?: number | string;
    delay?: number;
}

const IconBounce: React.FC<IconBounceProps> = ({ children, className = '', infinite = true, delay = 0 }) => {
    return (
        <motion.span
            initial={{ y: 0 }}
            animate={{ y: [0, -4, 0] }}
            transition={{
                duration: 1.2,
                ease: easeInOut,
                repeat: infinite ? Infinity : 0,
                repeatType: 'loop',
                delay: delay,
                repeatDelay: 0.08,
            }}
            className={`inline-flex items-center justify-center ${className}`}
            aria-hidden={true}
        >
            {children}
        </motion.span>
    );
};

export default IconBounce;
