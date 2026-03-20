import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoClose, IoChevronBack, IoChevronForward } from 'react-icons/io5';

const SHOW_DELAY = 1000; // 1 second delay

interface PopupDocument {
    url: string;
    title: string;
}

interface QRPopupProps {
    documents?: PopupDocument[];
}

export default function QRPopup({ documents }: QRPopupProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [currentPdfIndex, setCurrentPdfIndex] = useState(0);
    const [pdfFiles, setPdfFiles] = useState<PopupDocument[]>([]);

    useEffect(() => {
        if (documents && documents.length > 0) {
            setPdfFiles(documents);
            setTimeout(() => {
                setIsOpen(true);
            }, SHOW_DELAY);
        }
    }, [documents]);

    const handleDismiss = () => {
        setIsOpen(false);
    };

    const handlePrevious = () => {
        setCurrentPdfIndex((prev) => (prev > 0 ? prev - 1 : prev));
    };

    const handleNext = () => {
        setCurrentPdfIndex((prev) => (prev < pdfFiles.length - 1 ? prev + 1 : prev));
    };

    if (!isOpen || pdfFiles.length === 0) return null;

    const currentPdf = pdfFiles[currentPdfIndex];
    const hasPrevious = currentPdfIndex > 0;
    const hasNext = currentPdfIndex < pdfFiles.length - 1;

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                        onClick={handleDismiss}
                    />

                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3 }}
                        className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden h-[85vh] sm:h-[90vh] lg:h-[95vh] flex flex-col"
                    >
                        {/* Header */}
                        <div className="bg-cb-default p-3 sm:p-4 flex items-center justify-between flex-shrink-0">
                            <div className="flex items-center gap-2 sm:gap-3">
                                <img
                                    src="/imgs/logo/logo-white.webp"
                                    alt="Alianza Para El Progreso"
                                    width={100}
                                    height={32}
                                    className="opacity-90 sm:w-[120px] sm:h-[40px]"
                                />
                                <div className="text-white">
                                    <h2 className="text-base sm:text-lg font-bold">Documentos Importantes</h2>
                                    <p className="text-xs text-white/80">
                                        {currentPdfIndex + 1} de {pdfFiles.length}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleDismiss}
                                className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors flex-shrink-0"
                            >
                                <IoClose size={20} className="sm:w-6 sm:h-6" />
                            </button>
                        </div>

                        {/* PDF Viewer with Navigation */}
                        <div className="flex-1 flex items-center justify-center bg-gray-100 relative overflow-hidden min-h-0">
                            {/* Previous Button */}
                            {hasPrevious && (
                                <button
                                    onClick={handlePrevious}
                                    className="absolute left-2 sm:left-4 z-10 p-2 sm:p-3 bg-cb-default hover:bg-cb-light text-white rounded-full shadow-lg transition-all hover:scale-110"
                                    aria-label="PDF anterior"
                                >
                                    <IoChevronBack size={20} className="sm:w-7 sm:h-7" />
                                </button>
                            )}

                            {/* PDF Content */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={currentPdfIndex}
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ duration: 0.3 }}
                                    className="w-full h-full flex flex-col"
                                >
                                    <iframe
                                        src={currentPdf.url}
                                        className="w-full h-full border-0 touch-auto"
                                        title={currentPdf.title}
                                        style={{
                                            minHeight: '400px',
                                            WebkitOverflowScrolling: 'touch'
                                        }}
                                    />
                                </motion.div>
                            </AnimatePresence>

                            {/* Next Button */}
                            {hasNext && (
                                <button
                                    onClick={handleNext}
                                    className="absolute right-2 sm:right-4 z-10 p-2 sm:p-3 bg-cb-default hover:bg-cb-light text-white rounded-full shadow-lg transition-all hover:scale-110"
                                    aria-label="Siguiente PDF"
                                >
                                    <IoChevronForward size={20} className="sm:w-7 sm:h-7" />
                                </button>
                            )}
                        </div>

                        {/* Footer with PDF Title */}
                        <div className="bg-cb-default p-2 sm:p-3 text-center flex-shrink-0">
                            <p className="text-white font-medium text-xs sm:text-sm truncate">{currentPdf.title}</p>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
}
