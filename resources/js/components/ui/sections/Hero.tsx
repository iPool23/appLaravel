"use client"

import { useState, useEffect } from "react"
import { HeroNavigation } from "./HeroNavigation"

const slides = [
    {
        image: "/imgs/carousel/2.png",
        badge: "Trujillo",
        title: "César Acuña como Alcalde de Trujillo",
        description: "Como alcalde de Trujillo en dos periodos consecutivos (2007-2010 y 2011-2014), donde impulsó obras emblemáticas en infraestructura, educación y salud, donando el 100% de su sueldo durante sus dos periodos y enfocándose en el desarrollo regional.",
    },
    {
        image: "/imgs/carousel/1.jpeg",
        badge: "Trujillo",
        title: "César Acuña como Alcalde de Trujillo",
        description: "Lideró la ejecución de más de 320 obras públicas, priorizando la igualdad y el progreso, y renunció en 2014 para postularse como gobernador regional.",
    },
    {
        image: "/imgs/carousel/3.jpeg",
        badge: "Alianza para el Progreso",
        title: "25° Aniversario",
        description: "César Acuña fundó Alianza Para el Progreso (APP) el 8 de diciembre de 2001 en Trujillo; en 2025 se celebra el 25° aniversario, destacando su visión para el desarrollo regional y nacional, con énfasis en juventud e igualdad.",
    },
    {
        image: "/imgs/carousel/4.jpeg",
        badge: "La Libertad",
        title: "Caravana de César Acuña en La Libertad",
        description: "César Acuña ha participado en múltiples caravanas políticas en la región La Libertad, como en Ascope y Trujillo, para promover su compromiso con el progreso y el bienestar durante campañas electorales y actividades proselitistas.",
    },
    {
        image: "/imgs/carousel/5.png",
        badge: "Gobernador Libertad",
        title: "César Acuña",
        description: "Fue gobernador regional de La Libertad en dos periodos (2015-2022 y 2023-2025), renunciando en octubre de 2025 para su candidatura presidencial en 2026, con logros en obras públicas y seguridad sin corrupción.",
    }
]

export default function HeroSection() {
    const [currentSlide, setCurrentSlide] = useState(0)

    useEffect(() => {
        const timer = setTimeout(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length)
        }, 15000)
        return () => clearTimeout(timer)
    }, [currentSlide])

    const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length)
    const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)

    return (
        <div id="hero" className="relative h-[95vh] w-full overflow-hidden bg-cb-default">
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-all duration-1000 ease-in-out"
                style={{
                    backgroundImage: `url('${slides[currentSlide].image}')`,
                }}
                role="img"
                aria-label={slides[currentSlide].title}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
            </div>

            <div className="absolute inset-0 flex flex-col items-start justify-end pb-24 md:pb-36 container mx-auto text-white px-6 md:px-0">
                <span className="px-4 py-2 bg-cb-default rounded-full font-bold mb-2 text-sm md:text-base">
                    {slides[currentSlide].badge}
                </span>
                <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white font-sans mb-4 leading-tight px-4 py-2 backdrop-blur-sm rounded-lg border border-gray-400/30">
                    {slides[currentSlide].title}
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-white font-semibold max-w-2xl md:max-w-3xl lg:max-w-5xl px-4 py-3 backdrop-blur-sm rounded-lg border border-gray-400/30">
                    {slides[currentSlide].description}
                </p>
            </div>

            <HeroNavigation
                currentSlide={currentSlide}
                totalSlides={slides.length}
                nextSlide={nextSlide}
                prevSlide={prevSlide}
                setSlide={setCurrentSlide}
            />
        </div>
    )
}
