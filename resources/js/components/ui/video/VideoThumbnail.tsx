"use client";

import { FaPlay } from "react-icons/fa";

interface VideoThumbnailProps {
    videoId: string;
    title: string;
    description?: string;
    className?: string;
    imageSrc?: string;
    onClick?: () => void;
    showPlayButton?: boolean;
}

export const VideoThumbnail: React.FC<VideoThumbnailProps> = ({
    videoId,
    title,
    description = "Video",
    className = "",
    imageSrc,
    onClick,
    showPlayButton = true
}) => {
    const handleClick = () => {
        if (onClick) {
            onClick();
        } else {
            window.open(`https://www.youtube.com/watch?v=${videoId}`, '_blank');
        }
    };

    const imageUrl = imageSrc ?? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;

    return (
        <div
            className={`w-full bg-gradient-to-br from-cb-600 to-cb-800 overflow-hidden cursor-pointer group transition-all duration-300 ${className}`}
            style={{ aspectRatio: '16/9' }}
            onClick={handleClick}
        >
            <div className="relative h-full flex items-center justify-center">
                <div className="absolute inset-0">
                    <img
                        src={imageUrl}
                        alt={title}
                        className="w-full h-full object-cover object-center"
                    />
                </div>

                <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300" />

                <div className="relative z-10 text-center text-white p-6 flex flex-col items-center">
                    {showPlayButton && (
                        <div className="flex items-center justify-center mb-4">
                            <div className="relative">
                                <div className="relative flex items-center justify-center">
                                    <div className="rounded-full w-14 h-14 bg-white flex items-center justify-center transition-transform group-hover:scale-105">
                                        <FaPlay size={16} className="text-cr-default" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <h3 className="text-xl font-bold mb-2">
                        {title}
                    </h3>
                    <p className="text-sm opacity-90 mb-4">
                        {description}
                    </p>

                    {!onClick && (
                        <div className="flex items-center justify-center gap-2 text-sm opacity-80">
                            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z" />
                            </svg>
                            <span>Ver en YouTube</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
