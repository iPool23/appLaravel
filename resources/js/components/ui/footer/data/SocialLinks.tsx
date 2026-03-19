import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa";
import TwitterIconOutline from "@/components/svg/TwitterIconOutline";

export interface SocialLink {
    href: string;
    icon: React.ReactNode;
    label: string;
    bgColor?: string;
    className?: string;
}

export const defaultSocialLinks: SocialLink[] = [
    {
        href: "https://www.facebook.com/PeruAPP",
        icon: (<FaFacebook className="w-5 h-5" />),
        label: "Facebook",
        bgColor: "bg-blue-600"
    },
    {
        href: "https://www.youtube.com/@AlianzaParaElProgreso",
        icon: (<FaYoutube className="w-5 h-5" />),
        label: "YouTube",
        bgColor: "bg-red-600"
    },
    {
        href: "https://www.tiktok.com/@peru_app",
        icon: (<FaTiktok className="w-5 h-5" />),
        label: "TikTok",
        bgColor: "bg-black",
    },
    {
        href: "https://x.com/peru_app",
        icon: (<TwitterIconOutline className="w-5 h-5" />),
        label: "X (Twitter)",
        bgColor: "bg-black"
    },
    {
        href: "https://whatsapp.com/channel/0029VbBDRzGJ3juyUeEEik1c",
        icon: (<FaWhatsapp className="w-5 h-5" />),
        label: "WhatsApp",
        bgColor: "bg-green-600"
    },
    {
        href: "https://www.instagram.com/peru_app",
        icon: (<FaInstagram className="w-5 h-5" />),
        label: "Instagram",
        bgColor: "bg-gradient-to-r from-purple-500 to-pink-500"
    },
];
