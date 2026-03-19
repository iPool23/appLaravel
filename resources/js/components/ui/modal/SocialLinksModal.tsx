import React from "react";
import { motion, AnimatePresence, easeInOut } from "framer-motion";
import { defaultSocialLinks } from "@/components/ui/footer/data/SocialLinks";

const SocialLinksModal = () => {
    const bannerVariants = {
        closed: {
            x: "-100%",
            opacity: 0,
            transition: {
                duration: 0.5,
                ease: easeInOut
            }
        },
        open: {
            x: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: easeInOut
            }
        }
    };

    return (
        <div className="relative z-50">
            {/* Social Links Banner */}
            <AnimatePresence>
                <motion.div
                    initial="closed"
                    animate="open"
                    exit="closed"
                    variants={bannerVariants}
                    className="absolute top-6 left-8 bg-gradient-to-b from-cr-600 via-cr-700 to-cr-800 shadow-2xl rounded-b-xl"
                >
                    <div className="px-4 min-h-[300px] flex flex-col items-center justify-center">
                        {/* Banner Header */}
                        {/* <div className="mb-4 text-center">
                                <h3 className="text-white font-bold text-sm mb-1">
                                    Síguenos
                                </h3>
                                <div className="h-0.5 bg-white/50 w-12 mx-auto rounded"></div>
                            </div> */}

                        {/* Social Links - Vertical Layout */}
                        <div className="flex flex-col space-y-3">
                            {defaultSocialLinks.map((social, index) => (
                                <motion.a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`${social.bgColor} p-2 rounded-lg hover:scale-110 transition-all duration-200 shadow-md flex items-center justify-center w-10 h-10`}
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{
                                        delay: index * 0.1,
                                        duration: 0.3
                                    }}
                                    whileHover={{
                                        scale: 1.1,
                                        rotate: 5,
                                        transition: { duration: 0.2 }
                                    }}
                                    aria-label={social.label}
                                >
                                    <span className="text-white text-sm">
                                        {social.icon}
                                    </span>
                                </motion.a>
                            ))}
                        </div>

                        {/* Banner Footer */}
                        {/* <div className="mt-4 text-center">
                                <div className="h-0.5 bg-white/50 w-12 mx-auto rounded mb-2"></div>
                                <p className="text-white/80 text-xs font-medium">
                                    APP Perú
                                </p>
                            </div> */}
                    </div>

                    {/* Decorative elements */}
                    <div className="absolute top-2 left-2 w-2 h-2 bg-white/30 rounded-full"></div>
                    <div className="absolute top-4 left-6 w-1 h-1 bg-white/20 rounded-full"></div>
                    <div className="absolute bottom-4 right-2 w-1.5 h-1.5 bg-white/25 rounded-full"></div>
                </motion.div>
            </AnimatePresence>
        </div>
    );
};

export default SocialLinksModal;
