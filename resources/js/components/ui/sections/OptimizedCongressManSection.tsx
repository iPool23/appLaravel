"use client"

import React from "react";
import LazyCongressManGrid from "@/components/ui/grid/LazyCongressManGrid";
import { DirectiveMember } from "@/interfaces/member.interface";

interface OptimizedCongressManSectionProps {
    members?: DirectiveMember[];
}

/**
 * Optimized CongressMan section with:
 * - Lazy loading
 * - Image optimization
 * - Performance monitoring
 * - Reduced bundle size
 */
const OptimizedCongressManSection: React.FC<OptimizedCongressManSectionProps> = ({ members }) => {
    return (
        <section 
            className="congressman-section"
            aria-label="Lista de congresistas"
        >
            <LazyCongressManGrid members={members} />
        </section>
    );
};

export default OptimizedCongressManSection;
