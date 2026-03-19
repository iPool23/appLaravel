import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaSpotify, FaWhatsapp } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import { TbWorld } from "react-icons/tb";

interface CongressmanCardProps {
    src: string;
    name: string;
    region: string;
    socialLinks?: { provider: string; href: string }[];
}

export default function CongressmanCard({ src, name, region, socialLinks }: CongressmanCardProps) {
    const getSocialIcon = (provider: string) => {
        switch (provider.toLowerCase()) {
            case 'facebook':
                return <FaFacebook className="w-5 h-5" />;
            case 'instagram':
                return <FaInstagram className="w-5 h-5" />;
            case 'twitter':
            case 'x':
                return (
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                );
            case 'tiktok':
                return <SiTiktok className="w-5 h-5" />;
            case 'youtube':
                return <FaYoutube className="w-5 h-5" />;
            case 'linkedin':
                return <FaLinkedin className="w-5 h-5" />;
            case 'spotify':
                return <FaSpotify className="w-5 h-5" />;
            case 'whatsapp':
                return <FaWhatsapp className="w-5 h-5" />;
            case 'website':
            case 'web':
                return <TbWorld className="w-5 h-5" />;
            default:
                return null;
        }
    };

    return (
        <div className="group">
            <div className="h-full flex flex-col">
                {/* Circular Image with Red Border on Top */}
                <div className="flex justify-center mb-4">
                    <div className="rounded-t-none rounded-b-full bg-white dark:bg-transparent shadow-2xl shadow-gray-900/20 overflow-hidden border-t-4 border-red-600">
                        <div className="rounded-t-none rounded-b-full w-[220px] h-[220px]">
                            <img
                                src={src}
                                alt={name}
                                className="rounded-t-none rounded-b-full w-[220px] h-[220px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
                            />
                        </div>
                    </div>
                </div>

                {/* Info Section */}
                <div className="px-8">
                    <h3 className="text-2xl text-center font-bold text-blue-900 dark:text-white leading-tight uppercase">
                        {name}
                    </h3>

                    {/* Divider Line */}
                    <div className="flex justify-center my-2">
                        <div className="w-16 h-1 bg-red-500 dark:bg-red-400"></div>
                    </div>

                    <p className="text-blue-800 dark:text-white text-center leading-relaxed text-base mb-4 italic">
                        {region}
                    </p>

                    {/* Social Links */}
                    {socialLinks && socialLinks.length > 0 && (
                        <div className="flex justify-center space-x-3 mb-6">
                            {socialLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-900 hover:text-blue-900 dark:text-white dark:hover:text-blue-200 transition-colors"
                                >
                                    {getSocialIcon(link.provider)}
                                </a>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
