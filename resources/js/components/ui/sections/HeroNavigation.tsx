"use client"

import { ChevronLeft, ChevronRight } from "lucide-react"

interface HeroNavigationProps {
    currentSlide: number
    totalSlides: number
    nextSlide: () => void
    prevSlide: () => void
    setSlide: (index: number) => void
}

export function HeroNavigation({
    currentSlide,
    totalSlides,
    nextSlide,
    prevSlide,
    setSlide
}: HeroNavigationProps) {
    return (
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
            <div className="flex items-center space-x-4">
                <button
                    onClick={prevSlide}
                    className="text-white hover:text-gray-300 transition-colors p-2"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={24} />
                </button>

                <div className="flex space-x-2">
                    {Array.from({ length: totalSlides }).map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index ? "bg-cr-600" : "bg-white/40 hover:bg-white/60"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>

                <button
                    onClick={nextSlide}
                    className="text-white hover:text-gray-300 transition-colors p-2"
                    aria-label="Next slide"
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </div>
    )
}
