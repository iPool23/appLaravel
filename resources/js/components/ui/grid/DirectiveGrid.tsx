"use client"

import React from "react";
import RoundedImageCardLink from "@/components/ui/card/RoundedImageCardLink";
import directiveMembers from "@/data/members/directiveMembers";
import directiveMembersQu from "@/data/members/directiveMembersQu";
import { DirectiveMember } from "@/interfaces/member.interface";
import { motion, easeOut } from "framer-motion";
import { useLocale } from '@/lib/i18n';

const chunk = <T,>(arr: T[], size: number): T[][] => {
    const res: T[][] = [];
    for (let i = 0; i < arr.length; i += size) res.push(arr.slice(i, i + size));
    return res;
};

interface DirectiveGridProps {
    members?: DirectiveMember[];
}

const DirectiveGrid: React.FC<DirectiveGridProps> = ({ members }) => {
    const locale = useLocale();
    const defaultMembers = locale === "qu" ? directiveMembersQu : directiveMembers;
    const displayMembers = members ?? defaultMembers;
    const rowsDesktop = chunk(displayMembers, 3);
    const rowsTablet = chunk(displayMembers, 2);

    // Variantes de animación para las cards
    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.9,
        },
        visible: (index: number) => ({
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 0.6,
                delay: index * 0.15,
                ease: easeOut,
            },
        }),
    };

    return (
        <>
            {/* Desktop Layout - 3 columnas */}
            <div className="hidden lg:block">
                {rowsDesktop.map((row, rowIndex) => {
                    const incomplete = row.length < 3;
                    return (
                        <div
                            key={rowIndex}
                            className={`flex gap-6 ${rowIndex > 0 ? "mt-8" : ""} ${incomplete ? "justify-center" : ""}`}
                        >
                            {row.map((member, memberIndex) => (
                                <motion.div
                                    key={member.centerText}
                                    variants={cardVariants}
                                    custom={rowIndex * 3 + memberIndex}
                                    className={`${incomplete ? "flex-none" : "flex-1"} w-fit ${incomplete ? "max-w-[500px]" : ""}`}
                                >
                                    <RoundedImageCardLink
                                        src={member.src}
                                        link={`/${locale}/member/${member.slug}`}
                                        centerText={member.centerText}
                                        bottomText={member.bottomText}
                                        socialLinks={member.socialLinks}
                                        slug={member.slug}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    );
                })}
            </div>

            {/* Tablet Layout - 2 columnas */}
            <div className="hidden md:block lg:hidden">
                {rowsTablet.map((row, rowIndex) => {
                    const incomplete = row.length < 2;
                    return (
                        <div
                            key={rowIndex}
                            className={`flex gap-6 ${rowIndex > 0 ? "mt-8" : ""} ${incomplete ? "justify-center" : ""}`}
                        >
                            {row.map((member, memberIndex) => (
                                <motion.div
                                    key={member.centerText}
                                    variants={cardVariants}
                                    custom={rowIndex * 2 + memberIndex}
                                    className={`${incomplete ? "flex-none" : "flex-1"} w-fit ${incomplete ? "max-w-[500px]" : ""}`}
                                >
                                    <RoundedImageCardLink
                                        src={member.src}
                                        link={`/${locale}/member/${member.slug}`}
                                        centerText={member.centerText}
                                        bottomText={member.bottomText}
                                        socialLinks={member.socialLinks}
                                        slug={member.slug}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    );
                })}
            </div>

            {/* Mobile Layout - 1 columna */}
            <div className="block md:hidden">
                <div className="flex flex-col gap-6 items-center">
                    {displayMembers.map((member, index) => (
                        <div
                            key={member.centerText}
                            className="w-fit"
                        >
                            <RoundedImageCardLink
                                src={member.src}
                                link={`/${locale}/member/${member.slug}`}
                                centerText={member.centerText}
                                bottomText={member.bottomText}
                                socialLinks={member.socialLinks}
                                slug={member.slug}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DirectiveGrid;

