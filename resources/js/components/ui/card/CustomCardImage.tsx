'use client';

import { useState, useEffect } from "react";
import { Link, router, usePage } from '@inertiajs/react';
import { FaArrowRight, FaClock } from "react-icons/fa";
import { IoShareSocial } from "react-icons/io5";
import { Loader2 } from "lucide-react";
import SocialShare from "@/components/ui/SocialShare";

interface CustomCardImageProps {
  src?: string
  centerText?: string;
  date?: string;
  bottomText?: string;
  href?: string;
  socialLink?: string;
  colorCard?: string;
  textCenterColor?: string;
  textBottomColor?: string;
}

const truncateText = (text: string, maxLength: number) => {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
};

export default function CustomCardImage({
  src = "/imgs/placeholder.webp",
  centerText = "",
  bottomText = "",
  date = "",
  href = "/",
  socialLink = "/",
  colorCard = "bg-white dark:bg-cb-default",
  textCenterColor = "text-cb-default dark:text-white",
  textBottomColor = "text-cb-default dark:text-slate-300",
}: CustomCardImageProps) {
  const [showShare, setShowShare] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { url: pathname } = usePage();

  useEffect(() => {
    setIsLoading(false);
  }, [pathname]);

  const handleNavigate = (e: React.MouseEvent) => {
    if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('tel')) return;

    e.preventDefault();
    setIsLoading(true);
    router.visit(href);
  };

  return (
    <div className={`relative h-full group transition-all duration-300 ${isLoading ? 'scale-[0.98]' : ''}`}>
      <Link href={href} className="block h-full" onClick={handleNavigate}>
        <article
          className={`${colorCard} h-full flex flex-col overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 rounded-4xl ease-out transform ${isLoading ? '' : 'hover:-translate-y-2'}`}
        >
          {isLoading && (
            <div className="absolute inset-0 bg-white/80 dark:bg-cb-default/80 flex items-center justify-center z-50">
              <Loader2 className="w-10 h-10 animate-spin text-cb-default dark:text-white" />
            </div>
          )}

          <div className="relative overflow-hidden h-56 md:h-64">
            <img
              src={src}
              alt={centerText}
              loading="lazy"
              className="object-cover w-full h-full transition-transform duration-700 ease-out group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

            <div className="absolute top-4 left-4 z-10">
              <div className="bg-cr-600 text-white px-4 py-2 shadow-lg backdrop-blur-sm bg-opacity-95 flex items-center gap-2">
                <FaClock className="w-3 h-3" />
                <span className="text-sm font-semibold">{date}</span>
              </div>
            </div>

            <button
              type="button"
              aria-label="Share"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setShowShare(true);
              }}
              className="absolute top-4 right-4 z-10 transition-all duration-300"
            >
              <div className="bg-white/90 dark:bg-cb-default/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg hover:scale-110 transition-all duration-300">
                <IoShareSocial className="w-5 h-5 text-cb-default dark:text-white transition-colors" />
              </div>
            </button>
          </div>

          <div className="flex-1 flex flex-col p-6">
            <h3 className={`text-xl md:text-2xl font-bold ${textCenterColor} mb-3 leading-tight line-clamp-2 transition-colors duration-300 min-h-14 md:min-h-16`}>
              {centerText}
            </h3>

            <div className="w-20 h-1 bg-cr-600 mb-4 transition-all duration-300 group-hover:w-12"></div>

            <p className={`${textBottomColor} text-sm md:text-base leading-relaxed line-clamp-3 mb-4 flex-1 min-h-18 md:min-h-22`}>
              {truncateText(bottomText, 150)}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-cb-700">
              <span className={`text-xs uppercase tracking-wider font-semibold ${textBottomColor}`}>
                Leer más
              </span>
              <div className="flex items-center gap-2 text-cr-600 group-hover:gap-4 transition-all duration-300">
                <FaArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        </article>
      </Link>

      {showShare && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4" onClick={() => setShowShare(false)}>
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          <div
            className="relative z-50 p-6 bg-white dark:bg-cb-default shadow-2xl max-w-md w-full rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowShare(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-slate-300 transition-colors"
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <SocialShare
              url={socialLink}
              title={centerText}
              description={bottomText}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export function CustomCardImageSkeleton({ colorCard = "bg-white dark:bg-cb-800" }: { colorCard?: string }) {
  return (
    <div className="relative h-full">
      <article className={`${colorCard} h-full flex flex-col overflow-hidden shadow-md animate-pulse`}>
        <div className="relative overflow-hidden h-56 md:h-64 bg-gray-200 dark:bg-cb-700">
          <div className="absolute top-4 left-4 z-10">
            <div className="w-24 h-8 bg-gray-300 dark:bg-cb-600 backdrop-blur-sm"></div>
          </div>
        </div>

        <div className="flex-1 flex flex-col p-6">
          <div className="h-7 bg-gray-200 dark:bg-cb-700 rounded w-full mb-3"></div>
          <div className="h-7 bg-gray-200 dark:bg-cb-700 rounded w-4/5 mb-3"></div>
          <div className="w-20 h-1 bg-cr-600/20 mb-4"></div>

          <div className="space-y-3 mb-4 flex-1">
            <div className="h-4 bg-gray-200 dark:bg-cb-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-cb-700 rounded w-full"></div>
            <div className="h-4 bg-gray-200 dark:bg-cb-700 rounded w-3/4"></div>
          </div>

          <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-cb-700">
            <div className="h-4 bg-gray-200 dark:bg-cb-700 rounded w-20"></div>
            <div className="w-4 h-4 bg-gray-200 dark:bg-cb-700 rounded-full"></div>
          </div>
        </div>
      </article>
    </div>
  );
}
