"use client"

import React, { useMemo, useState, useEffect } from "react";
import RoundedImageCard from "@/components/ui/card/RoundedImageCard";
import ImagePreloader from "@/components/ui/preload/ImagePreloader";
import { DirectiveMember } from "@/interfaces/member.interface";
import { motion, useAnimation, easeOut } from "framer-motion";
import vocerosData from "@/data/voceros-data";

// Memoized chunk function to avoid recalculation on every render
const chunk = <T,>(arr: T[], size: number): T[][] => {
    const res: T[][] = [];
    for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
    return res;
};

interface VocerosGridProps {
    members?: DirectiveMember[];
}

// Item memoizado (solo envuelve la card con motion)
const MemoizedItem = React.memo(({ member, index, cardVariants, priority = false, fixed = false }: {
    member: DirectiveMember;
    index: number;
    cardVariants: any;
    priority?: boolean;
    fixed?: boolean; // si true usamos ancho fijo para filas incompletas
}) => (
    <motion.div
        variants={cardVariants}
        custom={index}
        className={`${fixed ? "flex-none max-w-[500px]" : "flex-1"} w-full`}
    >
        <RoundedImageCard
            src={member.src}
            centerText={member.centerText}
            bottomText={member.bottomText}
            socialLinks={member.socialLinks}
            priority={priority}
            loading={priority ? "eager" : "lazy"}
        />
    </motion.div>
));
MemoizedItem.displayName = 'MemoizedItem';

const VocerosGrid: React.FC<VocerosGridProps> = React.memo(({ members = vocerosData }) => {
    const [isMobile, setIsMobile] = useState(false);
    const [mounted, setMounted] = useState(false);
    const controls = useAnimation();

    // Ensure component is mounted before checking for mobile
    useEffect(() => {
        setMounted(true);
    }, []);

    // Detect mobile devices only after mounting
    useEffect(() => {
        if (!mounted) return;

        const checkIsMobile = () => {
            const userAgent = typeof window.navigator === "undefined" ? "" : navigator.userAgent;
            const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
            setIsMobile(mobile);
        };

        checkIsMobile();
        window.addEventListener('resize', checkIsMobile);

        return () => {
            window.removeEventListener('resize', checkIsMobile);
        };
    }, [mounted]);

    // Fallback animation for mobile if viewport detection fails
    useEffect(() => {
        if (!mounted) return;

        const timer = setTimeout(() => {
            controls.start("visible");
        }, isMobile ? 300 : 100);

        return () => clearTimeout(timer);
    }, [controls, isMobile, mounted]);

    // Filas para desktop (3), tablet (2) y mobile (1 card natural)
    const rowsDesktop = useMemo(() => chunk(members, 3), [members]);
    const rowsTablet = useMemo(() => chunk(members, 2), [members]);

    // Preload primeras imágenes
    const criticalImages = useMemo(() => members.slice(0, 6).map(m => m.src || ''), [members]);

    // Memoize animation variants - use consistent values to avoid hydration issues
    const cardVariants = useMemo(() => ({
        hidden: {
            opacity: 0,
            y: 30, // Use fixed value to avoid hydration mismatch
            scale: 0.95,
        },
        visible: (index: number) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.5,
                delay: index * 0.1,
                ease: easeOut,
            },
        }),
    }), []); // Remove isMobile dependency to avoid hydration issues

    // Memoize container variants
    const containerVariants = useMemo(() => ({
        hidden: {
            opacity: 0,
        },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.1,
            },
        },
    }), []);

    // Don't render until mounted to avoid hydration mismatches
    if (!mounted) {
        // Placeholder invisible para evitar saltos de layout
        return <div className="opacity-0"><ImagePreloader images={criticalImages} priority /></div>;
    }

    return (
        <>
            <ImagePreloader images={criticalImages} priority />
            <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{
                    once: true,
                    amount: 0.2, // Use consistent value
                    margin: "0px" // Use consistent margin
                }}
                animate={controls} // Fallback animation
                variants={containerVariants}
            >
                {/* Desktop (>=lg): 3 columnas */}
                <div className="hidden lg:block">
                    {rowsDesktop.map((row, rowIndex) => {
                        const incomplete = row.length < 3;
                        return (
                            <div
                                key={rowIndex}
                                className={`flex gap-6 ${rowIndex > 0 ? "mt-8" : ""} ${incomplete ? "justify-center" : ""}`}
                            >
                                {row.map((member, memberIndex) => (
                                    <MemoizedItem
                                        key={member.centerText}
                                        member={member}
                                        index={rowIndex * 3 + memberIndex}
                                        cardVariants={cardVariants}
                                        priority={rowIndex === 0 && memberIndex < 3}
                                        fixed={incomplete}
                                    />
                                ))}
                            </div>
                        );
                    })}
                </div>

                {/* Tablet (md to lg): 2 columnas */}
                <div className="hidden md:block lg:hidden">
                    {rowsTablet.map((row, rowIndex) => {
                        const incomplete = row.length < 2;
                        return (
                            <div
                                key={rowIndex}
                                className={`flex gap-6 ${rowIndex > 0 ? "mt-8" : ""} ${incomplete ? "justify-center" : ""}`}
                            >
                                {row.map((member, memberIndex) => (
                                    <MemoizedItem
                                        key={member.centerText}
                                        member={member}
                                        index={rowIndex * 2 + memberIndex}
                                        cardVariants={cardVariants}
                                        priority={rowIndex === 0 && memberIndex < 2}
                                        fixed={incomplete}
                                    />
                                ))}
                            </div>
                        );
                    })}
                </div>

                {/* Mobile (<md): 1 columna */}
                <div className="block md:hidden">
                    <div className="flex flex-col gap-6 items-center">
                        {members.map((member, index) => (
                            <MemoizedItem
                                key={member.centerText}
                                member={member}
                                index={index}
                                cardVariants={cardVariants}
                                priority={index < 3}
                                fixed
                            />
                        ))}
                    </div>
                </div>
            </motion.div>
        </>
    );
});

VocerosGrid.displayName = 'VocerosGrid';

export default VocerosGrid;