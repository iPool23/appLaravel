"use client";

import { useEffect, useState } from "react";
import { IoIosArrowUp } from "react-icons/io";

export default function BackTop() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setVisible(window.scrollY > 300);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <button
            aria-label="Volver arriba"
            onClick={scrollToTop}
            className={`fixed animate-bounce !bottom-6 sm:bottom-20 right-6 z-50 p-3 rounded-full bg-cr-600 text-white shadow-lg transition-opacity duration-700 hover:bg-cr-800 ${visible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
            <IoIosArrowUp />
        </button>
    );
}
