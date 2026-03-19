import { useEffect, useState } from 'react';
import { X } from 'lucide-react';

interface VideoModalProps {
    videoId: string;
    isOpen: boolean;
    onClose: () => void;
    title?: string;
}

export default function VideoModal({ videoId, isOpen, onClose, title }: VideoModalProps) {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            setIsClosing(false);
            onClose();
        }, 300);
    };

    if (!isOpen && !isClosing) return null;

    return (
        <div
            className={`fixed inset-0 z-[53] flex items-center justify-center p-4 transition-all duration-300 ${
                isClosing ? 'opacity-0' : 'opacity-100'
            }`}
            onClick={handleClose}
        >
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

            {/* Modal */}
            <div
                className={`relative w-full max-w-5xl transform transition-all duration-300 ${
                    isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                {title && (
                    <div className="mb-4 flex items-center justify-between">
                        <h3 className="text-xl font-semibold text-white">{title}</h3>
                    </div>
                )}

                {/* Close Button */}
                <button
                    onClick={handleClose}
                    className="absolute -right-4 -top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-lg transition-all hover:scale-110 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-black"
                    aria-label="Cerrar video"
                >
                    <X className="h-5 w-5 text-gray-800" />
                </button>

                {/* Video Container */}
                <div className="relative overflow-hidden rounded-lg bg-black shadow-2xl">
                    <div className="relative pb-[56.25%]">
                        <iframe
                            className="absolute inset-0 h-full w-full"
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
                            title={title || 'Video'}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
