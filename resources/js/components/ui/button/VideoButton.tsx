'use client';

import { Play } from 'lucide-react';

interface VideoButtonProps {
    onClick: () => void;
    label?: string;
    className?: string;
}

export default function VideoButton({ 
    onClick, 
    label = "Ver Video", 
    className = "" 
}: VideoButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-cb-600 to-cb-700 px-8 py-4 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-4 focus:ring-cb-500/50 ${className}`}
        >
            {/* Animated background */}
            <div className="absolute inset-0 bg-gradient-to-r from-cb-700 to-cb-800 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            {/* Play icon with animation */}
            <div className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white/30">
                <Play className="h-5 w-5 fill-white text-white" />
            </div>
            
            {/* Text */}
            <span className="relative text-lg tracking-wide">{label}</span>
            
            {/* Shine effect */}
            <div className="absolute inset-0 -translate-x-full transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
        </button>
    );
}
