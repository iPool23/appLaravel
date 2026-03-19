"use client";

import React, { useState } from "react";
import { IoFolderOutline } from "react-icons/io5";
import { Link } from '@inertiajs/react';

export default function DownloadsPanel() {
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className="fixed right-0 top-1/2 -translate-y-1/2 z-50 flex items-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <Link href="/recursos" passHref>
                <div className="relative flex items-center h-16 cursor-pointer">
                    <div
                        className={`absolute right-16 top-0 h-16 flex items-center bg-cb-default transition-all duration-300 ${hovered ? "w-36 opacity-100" : "w-0 opacity-0"}`}
                        style={{ zIndex: 1 }}
                    >
                        <span className={`px-6 text-white font-semibold text-base tracking-wide transition-opacity duration-200 ${hovered ? "opacity-100" : "opacity-0"}`} style={{ whiteSpace: "nowrap" }}>
                            RECURSOS
                        </span>
                    </div>
                    <div className="bg-cr-600 h-16 w-16 flex items-center justify-center relative z-10" style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}>
                        <IoFolderOutline size={32} className={`text-white transition-transform duration-200 ${hovered ? 'scale-110' : ''}`} />
                    </div>
                </div>
            </Link>
        </div>
    );
}

