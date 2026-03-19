"use client";

import { Grid, GridItem, Title } from "@/components";
import { useEffect, useState, useRef } from "react";
import CustomCardStatics from "../card/CustomCardStatics";

const useCountAnimation = (end: number, duration: number = 2000, delay: number = 0) => {
    const [count, setCount] = useState(0);
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const currentRef = ref.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !isVisible) {
                    setIsVisible(true);
                }
            },
            { threshold: 0.3 }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [isVisible]);

    useEffect(() => {
        if (!isVisible) return;

        const timeout = setTimeout(() => {
            let startTime: number;
            const animate = (currentTime: number) => {
                if (!startTime) startTime = currentTime;
                const progress = Math.min((currentTime - startTime) / duration, 1);
                
                const easeOutCubic = 1 - Math.pow(1 - progress, 3);
                setCount(Math.floor(easeOutCubic * end));

                if (progress < 1) {
                    requestAnimationFrame(animate);
                }
            };
            requestAnimationFrame(animate);
        }, delay);

        return () => clearTimeout(timeout);
    }, [isVisible, end, duration, delay]);

    return { count, ref, isVisible };
};

interface StatisticItem {
    value: number;
    label: string;
    duration?: number;
    delay?: number;
}

interface AnimatedStatisticsSectionProps {
    statistics: StatisticItem[];
    title?: string;
    subtitle?: string;
    description?: string;
    className?: string;
}

const AnimatedStatisticCard = ({ stat, index }: { stat: StatisticItem; index: number }) => {
    const { count, ref, isVisible } = useCountAnimation(
        stat.value, 
        stat.duration || 2500, 
        stat.delay || index * 200
    );
    
    return (
        <div 
            ref={ref}
            className={`transform transition-all duration-1000 ${
                isVisible 
                    ? 'scale-100 opacity-100 translate-y-0' 
                    : 'scale-95 opacity-0 translate-y-8'
            }`}
        >
            <CustomCardStatics
                centerText={count.toString()}
                bottomText={stat.label}
            />
        </div>
    );
};

export default function AnimatedStatisticsSection({
    statistics = [],
    title,
    subtitle,
    description,
    className = ""
}: AnimatedStatisticsSectionProps) {
    return (
        <Grid>
            <GridItem colSpan={7}>
                <div className="space-y-6">
                    <Grid>
                        <GridItem colSpan={6}>
                            <AnimatedStatisticCard 
                                stat={statistics[0]} 
                                index={0} 
                            />
                        </GridItem>
                        <GridItem colSpan={6}>
                            <AnimatedStatisticCard 
                                stat={statistics[1]} 
                                index={1} 
                            />
                        </GridItem>
                    </Grid>
                    <Grid>
                        <GridItem colSpan={6}>
                            <AnimatedStatisticCard 
                                stat={statistics[2]} 
                                index={2} 
                            />
                        </GridItem>
                        <GridItem colSpan={6}>
                            <AnimatedStatisticCard 
                                stat={statistics[3]} 
                                index={3} 
                            />
                        </GridItem>
                    </Grid>
                </div>
            </GridItem>

            <GridItem colSpan={5}>
                <div className={`pl-0 md:pl-8 flex flex-col justify-center text-center md:text-start md:justify-start h-full ${className}`}>
                    {title && (
                        <Title
                            title={title}
                            fontSize="sm"
                            className="tracking-wider mb-4 uppercase"
                        />
                    )}
                    {subtitle && (
                        <Title
                            title={subtitle}
                            fontSize="5xl"
                            fontWeight="bold"
                            className="mb-6 leading-tight"
                        />
                    )}
                    {description && (
                        <Title
                            title={description}
                            fontSize="lg"
                            fontWeight="light"
                            className="mb-8 leading-relaxed"
                        />
                    )}
                </div>
            </GridItem>
        </Grid>
    );
}
