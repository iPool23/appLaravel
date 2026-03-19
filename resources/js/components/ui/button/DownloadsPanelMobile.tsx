"use client";

import React from "react";
import { IoFolderOutline } from "react-icons/io5";
import { Link } from '@inertiajs/react';

export default function DownloadsPanelMobile() {
    return (
        <Link href="/recursos" passHref>
            <button
                aria-label="Recursos"
                className="fixed bottom-20 right-6 z-50 p-3 rounded-full bg-cr-600 text-white shadow-lg transition-transform duration-200 hover:bg-cr-700 active:scale-95"
                style={{ boxShadow: '0 4px 16px rgba(0,0,0,0.12)' }}
            >
                <IoFolderOutline size={20} />
            </button>
        </Link>
    );
}

