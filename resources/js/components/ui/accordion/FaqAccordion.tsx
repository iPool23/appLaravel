"use client";

import { useState } from "react";
import clsx from "clsx";
import { HiMinus, HiPlus } from "react-icons/hi2";

export interface FaqItem {
    question: string;
    answer: string;
}

interface FaqAccordionProps {
    items: FaqItem[];
    className?: string;
    defaultOpen?: number;
}

export const FaqAccordion = ({ items, className, defaultOpen = 0 }: FaqAccordionProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);

    const toggle = (idx: number) => {
        setOpenIndex(prev => prev === idx ? null : idx);
    };

    return (
        <div className={clsx("w-full max-w-xl mx-auto divide-y divide-cb-100", className)}>
            {items.map((item, idx) => {
                const open = openIndex === idx;
                return (
                    <div key={idx} className="py-8">
                        <button
                            type="button"
                            onClick={() => toggle(idx)}
                            className="w-full flex items-start justify-between gap-4 text-left group"
                            aria-expanded={open}
                        >
                            <span className={clsx("font-semibold text-cb-700 group-hover:text-cb-800 dark:text-cb-200 dark:group-hover:text-cb-100 transition-colors", open && "text-cb-800")}>{item.question}</span>
                            <span className="text-cb-500 group-hover:text-cb-700 dark:text-cb-200 dark:group-hover:text-cb-100 text-xl leading-none select-none">
                                {open ? <HiMinus /> : <HiPlus />}
                            </span>
                        </button>
                        <div
                            className={clsx(
                                "grid transition-all duration-300 ease-in-out",
                                open ? "grid-rows-[1fr] opacity-100 mt-2" : "grid-rows-[0fr] opacity-0"
                            )}
                        >
                            <div className="overflow-hidden">
                                <p className="text-sm text-cb-600 dark:text-cb-300 leading-relaxed pr-4">
                                    {item.answer}
                                </p>
                            </div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default FaqAccordion;
