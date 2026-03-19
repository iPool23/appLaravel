"use client"

import React, { Suspense } from "react";
import { useIntersectionObserver } from "@/hook/useIntersectionObserver";
import CongressManSkeleton from "@/components/ui/skeleton/CongressManSkeleton";
import { DirectiveMember } from "@/interfaces/member.interface";

// Lazy load the CongressManGrid component
const CongressManGrid = React.lazy(() => import("./CongressManGrid"));

interface LazyCongressManGridProps {
    members?: DirectiveMember[];
}

const LazyCongressManGrid: React.FC<LazyCongressManGridProps> = ({ members }) => {
    const { ref, isIntersecting } = useIntersectionObserver({
        threshold: 0.1,
        rootMargin: '100px',
        triggerOnce: true
    });

    return (
        <div ref={ref}>
            {isIntersecting ? (
                <Suspense fallback={<CongressManSkeleton count={members?.length || 17} />}>
                    <CongressManGrid members={members} />
                </Suspense>
            ) : (
                <CongressManSkeleton count={members?.length || 17} />
            )}
        </div>
    );
};

export default LazyCongressManGrid;
