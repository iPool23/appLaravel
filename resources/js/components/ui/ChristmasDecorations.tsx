'use client';

import { useEffect, useState } from 'react';

export const ChristmasDecorations = () => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    return (
        <>
            {/* Decoraciones fijas en las esquinas */}
            <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
                {/* Árbol de Navidad - Esquina superior izquierda */}
                <div className="absolute top-0 left-0 w-32 h-32 opacity-80">
                    <svg viewBox="0 0 100 120" className="w-full h-full">
                        {/* Estrella */}
                        <polygon points="50,5 52,15 62,15 54,21 57,31 50,25 43,31 46,21 38,15 48,15" fill="#FFD700" />
                        {/* Árbol */}
                        <polygon points="50,20 30,45 35,45 20,65 25,65 15,85 85,85 75,65 80,65 65,45 70,45" fill="#0F7C3A" />
                        <polygon points="50,25 35,45 40,45 30,60 70,60 60,45 65,45" fill="#12A150" opacity="0.8" />
                        {/* Tronco */}
                        <rect x="45" y="85" width="10" height="15" fill="#8B4513" />
                        {/* Esferas */}
                        <circle cx="40" cy="55" r="3" fill="#E20613" />
                        <circle cx="60" cy="60" r="3" fill="#FFD700" />
                        <circle cx="50" cy="70" r="3" fill="#E20613" />
                    </svg>
                </div>

                {/* Árbol de Navidad - Esquina superior derecha */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-80 scale-x-[-1]">
                    <svg viewBox="0 0 100 120" className="w-full h-full">
                        <polygon points="50,5 52,15 62,15 54,21 57,31 50,25 43,31 46,21 38,15 48,15" fill="#FFD700" />
                        <polygon points="50,20 30,45 35,45 20,65 25,65 15,85 85,85 75,65 80,65 65,45 70,45" fill="#0F7C3A" />
                        <polygon points="50,25 35,45 40,45 30,60 70,60 60,45 65,45" fill="#12A150" opacity="0.8" />
                        <rect x="45" y="85" width="10" height="15" fill="#8B4513" />
                        <circle cx="40" cy="55" r="3" fill="#E20613" />
                        <circle cx="60" cy="60" r="3" fill="#FFD700" />
                        <circle cx="50" cy="70" r="3" fill="#E20613" />
                    </svg>
                </div>

                {/* Guirnalda superior */}
                <div className="absolute top-0 left-1/4 right-1/4 h-16 opacity-70">
                    <svg viewBox="0 0 400 60" className="w-full h-full" preserveAspectRatio="none">
                        <path d="M0,30 Q50,10 100,30 T200,30 T300,30 T400,30"
                            stroke="#0F7C3A" strokeWidth="8" fill="none" />
                        <path d="M0,30 Q50,10 100,30 T200,30 T300,30 T400,30"
                            stroke="#12A150" strokeWidth="4" fill="none" opacity="0.6" />
                        {/* Esferas en la guirnalda */}
                        <circle cx="50" cy="20" r="6" fill="#E20613" />
                        <circle cx="150" cy="20" r="6" fill="#FFD700" />
                        <circle cx="250" cy="20" r="6" fill="#E20613" />
                        <circle cx="350" cy="20" r="6" fill="#FFD700" />
                    </svg>
                </div>

                {/* Esferas flotantes - Lado izquierdo - Solo en pantallas grandes */}
                <div className="hidden xl:block absolute left-4 top-1/4 space-y-8">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-500 to-red-700 opacity-70 shadow-lg animate-bounce" style={{ animationDuration: '3s' }} />
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 opacity-70 shadow-lg animate-bounce ml-4" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }} />
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-700 opacity-70 shadow-lg animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }} />
                </div>

                {/* Esferas flotantes - Lado derecho - Solo en pantallas grandes */}
                <div className="hidden xl:block absolute right-4 top-1/3 space-y-8">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 opacity-70 shadow-lg animate-bounce" style={{ animationDuration: '3.2s', animationDelay: '0.3s' }} />
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-600 opacity-70 shadow-lg animate-bounce mr-4" style={{ animationDuration: '3.8s', animationDelay: '0.8s' }} />
                    <div className="w-11 h-11 rounded-full bg-gradient-to-br from-green-500 to-green-700 opacity-70 shadow-lg animate-bounce" style={{ animationDuration: '4.2s', animationDelay: '1.2s' }} />
                </div>

                {/* Esferas cayendo - Solo en pantallas pequeñas y medianas */}
                <div className="xl:hidden absolute inset-0">
                    {[...Array(6)].map((_, i) => {
                        const colors = [
                            'from-red-500 to-red-700',
                            'from-yellow-400 to-yellow-600',
                            'from-green-500 to-green-700'
                        ];
                        const color = colors[i % 3];
                        const left = i < 3 ? `${5 + Math.random() * 10}%` : `${85 + Math.random() * 10}%`;
                        const size = 8 + Math.random() * 4;
                        const duration = 8 + Math.random() * 4;
                        const delay = Math.random() * 3;

                        return (
                            <div
                                key={`falling-ornament-${i}`}
                                className={`absolute rounded-full bg-gradient-to-br ${color} opacity-60 shadow-lg animate-fall-ornament`}
                                style={{
                                    left,
                                    top: '-50px',
                                    width: `${size * 4}px`,
                                    height: `${size * 4}px`,
                                    animation: `fallOrnament ${duration}s ease-in infinite`,
                                    animationDelay: `${delay}s`,
                                }}
                            />
                        );
                    })}
                </div>

                {/* Copos de nieve - Solo en los laterales */}
                <div className="absolute inset-0">
                    {[...Array(15)].map((_, i) => {
                        const isLeft = i % 2 === 0;
                        const left = isLeft ? `${Math.random() * 15}%` : `${85 + Math.random() * 15}%`;
                        const animationDuration = 10 + Math.random() * 10;
                        const animationDelay = Math.random() * 5;
                        const size = 8 + Math.random() * 8;

                        return (
                            <div
                                key={i}
                                className="absolute animate-fall opacity-60"
                                style={{
                                    left,
                                    top: '-20px',
                                    animation: `fall ${animationDuration}s linear infinite`,
                                    animationDelay: `${animationDelay}s`,
                                }}
                            >
                                <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
                                    <path d="M12 2L12 22M2 12L22 12M5 5L19 19M19 5L5 19"
                                        stroke="#E0F2FE" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </div>
                        );
                    })}
                </div>

                {/* Luces navideñas - Borde izquierdo */}
                <div className="absolute left-0 top-1/4 bottom-1/4 w-8">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={`left-${i}`}
                            className="absolute w-3 h-3 rounded-full animate-pulse"
                            style={{
                                top: `${i * 12.5}%`,
                                left: '8px',
                                backgroundColor: i % 3 === 0 ? '#E20613' : i % 3 === 1 ? '#FFD700' : '#0F7C3A',
                                animationDuration: `${1 + (i % 3) * 0.5}s`,
                                animationDelay: `${i * 0.2}s`,
                                boxShadow: `0 0 10px ${i % 3 === 0 ? '#E20613' : i % 3 === 1 ? '#FFD700' : '#0F7C3A'}`,
                            }}
                        />
                    ))}
                </div>

                {/* Luces navideñas - Borde derecho */}
                <div className="absolute right-0 top-1/4 bottom-1/4 w-8">
                    {[...Array(8)].map((_, i) => (
                        <div
                            key={`right-${i}`}
                            className="absolute w-3 h-3 rounded-full animate-pulse"
                            style={{
                                top: `${i * 12.5}%`,
                                right: '8px',
                                backgroundColor: i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#E20613' : '#0F7C3A',
                                animationDuration: `${1 + (i % 3) * 0.5}s`,
                                animationDelay: `${i * 0.2}s`,
                                boxShadow: `0 0 10px ${i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#E20613' : '#0F7C3A'}`,
                            }}
                        />
                    ))}
                </div>

                {/* Estrellas decorativas en las esquinas inferiores */}
                <div className="absolute bottom-8 left-8 opacity-70">
                    <svg width="40" height="40" viewBox="0 0 24 24">
                        <polygon points="12,2 15,10 23,10 17,15 19,23 12,18 5,23 7,15 1,10 9,10"
                            fill="#FFD700" stroke="#FFA500" strokeWidth="1" />
                    </svg>
                </div>
                <div className="absolute bottom-8 right-8 opacity-70">
                    <svg width="40" height="40" viewBox="0 0 24 24">
                        <polygon points="12,2 15,10 23,10 17,15 19,23 12,18 5,23 7,15 1,10 9,10"
                            fill="#FFD700" stroke="#FFA500" strokeWidth="1" />
                    </svg>
                </div>
            </div>

            {/* Estilos para animaciones */}
            <style jsx>{`
        @keyframes fall {
          0% {
            transform: translateY(-20px) rotate(0deg);
          }
          100% {
            transform: translateY(100vh) rotate(360deg);
          }
        }
        .animate-fall {
          animation: fall linear infinite;
        }
        @keyframes fallOrnament {
          0% {
            transform: translateY(-50px) rotate(0deg);
            opacity: 0.6;
          }
          10% {
            opacity: 0.7;
          }
          90% {
            opacity: 0.5;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        .animate-fall-ornament {
          animation: fallOrnament ease-in infinite;
        }
      `}</style>
        </>
    );
};
