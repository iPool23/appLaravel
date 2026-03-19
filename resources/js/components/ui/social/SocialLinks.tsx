"use client";

import React from "react";
import TikTokIcon from "@/components/svg/TikTokIcon";
import InstagramIcon from "@/components/svg/InstagramIcon";
import FacebookIcon from "@/components/svg/FacebookIcon";
import TwitterIcon from "@/components/svg/TwitterIcon";
import YouTubeIcon from "@/components/svg/YouTubeIcon";
import LinkedInIcon from "@/components/svg/LinkedInIcon";

interface SocialLink {
    href: string;
    icon: React.ReactNode;
    label: string;
    bgColor: string;
    onClick?: () => void;
}

interface SocialLinksProps {
    socialLinks?: SocialLink[];
    className?: string;
    size?: "sm" | "md" | "lg";
    showLabels?: boolean;
    alignment?: "left" | "center" | "right";
}

const defaultSocialLinks: SocialLink[] = [
    {
        href: "https://tiktok.com",
        icon: (<TikTokIcon />),
        label: "TikTok",
        bgColor: "bg-black"
    },
    {
        href: "https://instagram.com",
        icon: (<InstagramIcon />),
        label: "Instagram",
        bgColor: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
    {
        href: "https://facebook.com",
        icon: (<FacebookIcon />),
        label: "Facebook",
        bgColor: "bg-blue-600"
    },
    {
        href: "https://twitter.com",
        icon: (<TwitterIcon />),
        label: "Twitter",
        bgColor: "bg-black"
    },
    {
        href: "https://youtube.com",
        icon: (<YouTubeIcon />),
        label: "YouTube",
        bgColor: "bg-red-600"
    },
    {
        href: "https://linkedin.com",
        icon: (
            <LinkedInIcon />
        ),
        label: "LinkedIn",
        bgColor: "bg-blue-700"
    }
];

export default function SocialLinks({
    socialLinks = defaultSocialLinks,
    className = "",
    size = "md",
    showLabels = false,
    alignment = "center"
}: SocialLinksProps) {
    const getSizeClasses = () => {
        switch (size) {
            case "sm":
                return "p-2 w-8 h-8 sm:p-2 sm:w-9 sm:h-9";
            case "lg":
                return "p-2.5 w-10 h-10 sm:p-3 sm:w-12 sm:h-12 md:p-4 md:w-14 md:h-14";
            default:
                // md
                return "p-2 w-8 h-8 sm:p-2.5 sm:w-10 sm:h-10 md:p-3 md:w-12 md:h-12";
        }
    };

    const getAlignmentClasses = () => {
        switch (alignment) {
            case "left":
                return "items-start text-left";
            case "right":
                return "items-end text-right";
            default:
                return "items-center text-center";
        }
    };

    const getFlexJustify = () => {
        switch (alignment) {
            case "left":
                return "justify-start";
            case "right":
                return "justify-end";
            default:
                return "justify-center";
        }
    };

    return (
        <div className={`flex flex-col ${getAlignmentClasses()}`}>
            {showLabels && (
                <p className={`${className} font-semibold text-gray-700 dark:text-gray-300 mb-2 text-sm sm:text-base`}>SÃ­guenos en:</p>
            )}

            {/* Icons row: responsive, wraps on small screens */}
            <div className={`flex flex-wrap gap-2 sm:gap-3 ${getFlexJustify()}`}>
                {socialLinks.map((social, index) => (
                    social.onClick ? (
                        <button
                            key={index}
                            onClick={social.onClick}
                            className={`${social.bgColor} ${getSizeClasses()} rounded-lg hover:scale-105 transition-transform duration-200 shadow flex items-center justify-center`}
                            aria-label={social.label}
                        >
                            <span className="text-white flex items-center justify-center">
                                {social.icon}
                            </span>
                        </button>
                    ) : (
                        <a
                            key={index}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`${social.bgColor} ${getSizeClasses()} rounded-lg hover:scale-105 transition-transform duration-200 shadow flex items-center justify-center`}
                            aria-label={social.label}
                        >
                            <span className="text-white flex items-center justify-center">
                                {social.icon}
                            </span>
                        </a>
                    )
                ))}
            </div>
        </div>
    );
}

