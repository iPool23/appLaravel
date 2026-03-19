import React from "react";

interface StatisticItem {
    value?: string;
    label?: string;
}

interface StatisticsSectionProps {
    statistics?: StatisticItem[];
    className?: string;
}

export default function StatisticsSection({
    statistics = [],
    className = ""
}: StatisticsSectionProps) {
    // Duplicamos los items para el efecto de scroll infinito
    const marqueeItems = [...statistics, ...statistics];

    return (
        <div className={`relative w-full overflow-hidden bg-contain bg-center h-[6vh] flex items-center ${className}`}>
            <div className="relative z-10 flex whitespace-nowrap animate-marquee-infinite">
                {/* Renderizamos dos sets idénticos para que el scroll sea continuo y suave */}
                {[0, 1].map((set) => (
                    <div key={`set-${set}`} className="flex">
                        {statistics.map((stat, index) => (
                            <div key={`stat-${set}-${index}`} className="shrink-0 flex items-center">
                                <span className="text-white text-2xl sm:text-3xl font-bold whitespace-nowrap font-sans mx-8 flex items-center gap-2">
                                    <span className="inline-block tabular-nums">
                                        {parseInt(stat.value || "0").toLocaleString()}
                                    </span> 
                                    <span className="font-bold">{stat.label}</span>
                                </span>
                                <div className="w-16 sm:w-32 h-px bg-white/30" />
                            </div>
                        ))}
                    </div>
                ))}
            </div>

            <style>{`
                @keyframes marquee-infinite {
                   0% { transform: translate3d(0, 0, 0); }
                   100% { transform: translate3d(-50%, 0, 0); }
                }
                .animate-marquee-infinite {
                    display: flex;
                    width: max-content;
                    animation: marquee-infinite 120s linear infinite;
                    will-change: transform;
                    backface-visibility: hidden;
                    perspective: 1000;
                }
                .animate-marquee-infinite:hover {
                    animation-play-state: paused;
                }
            `}</style>
        </div>
    );
}
