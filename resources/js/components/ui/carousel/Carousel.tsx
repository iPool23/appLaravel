"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence, easeOut } from "framer-motion"

interface Slide {
    id: number
    image: string
    alt?: string
    title?: string
    description?: string
    buttonText: string
}

const slides: Slide[] = [
    {
        id: 1,
        image: "/imgs/carousel/1.jpeg",
        alt: "César Acuña junto a militantes de Alianza para el Progreso en un encuentro político",
        title: "COMPROMETIDOS CON EL PERÚ",
        description: "COMPROMETIDOS CON EL PERÚ",
        buttonText: "Conócenos",
    },
    {
        id: 2,
        image: "/imgs/carousel/2.jpeg",
        alt: "Fotografía grupal de César Acuña y simpatizantes de APP",
        title: "COMPROMETIDOS CON EL PERÚ",
        description: "TRABAJANDO POR UN PERÚ MEJOR",
        buttonText: "Descubre Más",
    },
    {
        id: 3,
        image: "/imgs/carousel/3.jpeg",
        alt: "César Acuña y su equipo de campaña en Alianza para el Progreso",
        title: "COMPROMETIDOS CON EL PERÚ",
        description: "UNIDOS SOMOS MEJORES",
        buttonText: "Descubre Más",
    },
    {
        id: 4,
        image: "/imgs/carousel/4.jpeg",
        alt: "Militantes de APP junto al líder del partido, César Acuña",
        title: "COMPROMETIDOS CON EL PERÚ",
        description: "TU ACTITUD DEFINE TU CAMINO",
        buttonText: "Hazlo con Pasión",
    },
    {
        id: 5,
        image: "/imgs/carousel/5.jpeg",
        alt: "Encuentro de César Acuña con jóvenes militantes de Alianza para el Progreso",
        title: "COMPROMETIDOS CON EL PERÚ",
        description: "UNIDOS HACIA EL FUTURO",
        buttonText: "Únete Ahora",
    },
]

export default function Carousel() {
    const [currentSlide, setCurrentSlide] = useState<number>(0)
    const [isPlaying, setIsPlaying] = useState<boolean>(true)
    const [imageLoaded, setImageLoaded] = useState<boolean[]>(new Array(slides.length).fill(false))

    const totalSlides: number = slides.length
    const intervalRef = useRef<NodeJS.Timeout | null>(null)

    useEffect(() => {
        if (isPlaying) {
            intervalRef.current = setInterval(() => {
                setCurrentSlide((prev) => (prev + 1) % totalSlides)
            }, 5000)
        } else {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current)
                intervalRef.current = null
            }
        }
    }, [isPlaying, totalSlides])

    const nextSlide = (): void => {
        setCurrentSlide((prev) => (prev + 1) % totalSlides)
    }

    const prevSlide = (): void => {
        setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
    }

    const handleMouseEnter = () => setIsPlaying(false)
    const handleMouseLeave = () => setIsPlaying(true)

    const handleImageLoad = (index: number) => {
        setImageLoaded((prev) => {
            const newState = [...prev]
            newState[index] = true
            return newState
        })
    }

    return (
        <div
            className="relative w-full h-screen md:h-[90dvh] overflow-hidden group bg-cb-default"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <AnimatePresence initial={false} mode="wait">
                {slides.map((slide: Slide, index: number) =>
                    index === currentSlide ? (
                        <motion.div
                            key={slide.id}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="absolute inset-0"
                        >
                            <motion.div
                                className="absolute inset-0"
                                initial={{ scale: 0.98 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 1 }}
                                transition={{ duration: 0.6, ease: easeOut }}
                            >
                                <img
                                    src={slide.image || "/imgs/placeholder.jpg"}
                                    alt={slide.alt || `Cesar Acuña ${index + 1}`}
                                    onLoad={() => handleImageLoad(index)}
                                    className="w-full h-full object-cover"
                                    style={{ display: "block" }}
                                />
                            </motion.div>
                        </motion.div>
                    ) : null,
                )}
            </AnimatePresence>

            <div className="absolute inset-0 z-10 pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-b from-cb-950/50 via-cb-full/30 to-cb-950/20" />
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse at center, rgba(0,0,0,0.45) 0%, rgba(2,80,157,0.15) 40%, transparent 70%)',
                        mixBlendMode: 'multiply',
                    }}
                />
            </div>

            <div className="relative z-20 flex items-center justify-center h-full">
                <motion.div
                    key={slides[currentSlide].id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6 }}
                    className="text-center text-white px-8 max-w-4xl"
                >
                    <motion.p
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.15, duration: 0.6 }}
                        className="text-sm md:text-base font-light mb-4 tracking-wider uppercase opacity-90"
                    >
                        {slides[currentSlide].description}
                    </motion.p>

                    <motion.h1
                        initial={{ y: 36, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.25, duration: 0.7 }}
                        className="font-gotham-bold text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-8 leading-tight tracking-tighter"
                    >
                        {slides[currentSlide].title}
                    </motion.h1>
                </motion.div>
            </div>

            <div className="absolute inset-y-0 left-0 right-0 flex items-center justify-between px-6 z-30">
                <motion.button
                    onClick={prevSlide}
                    initial={{ x: -24, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.45 }}
                    aria-label="Diapositiva anterior"
                    className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                    <ChevronLeft size={28} />
                </motion.button>

                <motion.button
                    onClick={nextSlide}
                    initial={{ x: 24, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.15, duration: 0.45 }}
                    aria-label="Siguiente diapositiva"
                    className="p-3 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white/50"
                >
                    <ChevronRight size={28} />
                </motion.button>
            </div>
        </div>
    )
}
