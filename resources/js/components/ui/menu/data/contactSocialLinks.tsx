import { FaFacebook, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa";
import TwitterIconOutline from "@/components/svg/TwitterIconOutline";

export interface SocialLink {
    href: string;
    icon: React.ReactNode;
    label: string;
}

export const defaultSocialLinks: SocialLink[] = [
    {
        href: "https://www.facebook.com/PeruAPP",
        icon: (<FaFacebook className="w-4 h-4" />),
        label: "Facebook"
    },
    {
        href: "https://www.youtube.com/@AlianzaParaElProgreso",
        icon: (<FaYoutube className="w-4 h-4" />),
        label: "YouTube"
    },
    {
        href: "https://www.tiktok.com/@peru_app",
        icon: (<FaTiktok className="w-4 h-4" />),
        label: "TikTok"
    },
    {
        href: "https://x.com/peru_app",
        icon: (<TwitterIconOutline className="w-4 h-4" />),
        label: "X (Twitter)"
    },
    {
        href: "https://whatsapp.com/channel/0029VbBDRzGJ3juyUeEEik1c",
        icon: (<FaWhatsapp className="w-4 h-4" />),
        label: "WhatsApp"
    },
    {
        href: "https://www.instagram.com/peru_app",
        icon: (<FaInstagram className="w-4 h-4" />),
        label: "Instagram"
    },
];
