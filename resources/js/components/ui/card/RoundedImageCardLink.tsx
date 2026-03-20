
import Line from "@/components/ui/line";
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin, FaSpotify, FaWhatsapp } from "react-icons/fa";
import { SiTiktok } from "react-icons/si";
import TwitterIconOutline from "@/components/svg/TwitterIconOutline";
import React from "react";
import { imageSizes } from "@/utils/imageOptimization";
import { Link } from '@inertiajs/react';
import { TbWorld } from "react-icons/tb";

interface RoundedImageCardLinkProps {
  src?: string
  link?: string;
  centerText?: string;
  bottomText?: string;
  colorCard?: string;
  textCenterColor?: string;
  textBottomColor?: string;
  socialLinks?: { provider: string; href: string }[];
  priority?: boolean;
  loading?: "eager" | "lazy";
  showQR?: boolean;
  slug?: string;
}

export default React.memo(function RoundedImageCardLink({
  src = "/imgs/placeholder.webp",
  link = "/",
  centerText = "",
  bottomText = "",
  colorCard = "bg-white dark:bg-transparent",
  textCenterColor = "text-cb-default dark:text-cb-100",
  textBottomColor = "text-cb-default dark:text-cb-300",
  socialLinks,
  loading = "lazy",
  slug = "",
}: RoundedImageCardLinkProps) {
  const memberData = {
    src,
    centerText,
    bottomText,
    socialLinks,
    slug,
  };
  return (
    <div className="group">
      <div
        className={`h-full flex flex-col`}
      >
        <Link href={link} className="flex justify-center mb-4">
          <div className={`rounded-t-none rounded-b-full ${colorCard} shadow-2xl shadow-cb-default/20 overflow-hidden border-t-4 border-cr-600`} style={{ backgroundImage: "url('/imgs/bg-cap.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
            <div className="rounded-t-none rounded-b-full w-[220px] h-[220px]">
              <img
                src={src}
                alt={centerText || 'Profile image'}
                width={imageSizes.congressman.width}
                height={imageSizes.congressman.height}
                loading={loading}
                className="rounded-t-none rounded-b-full w-[220px] h-[220px] object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
              />
            </div>
          </div>
        </Link>
        <div className="px-8">

          <Link href={link}>
            <h3
              className={`text-2xl text-center font-bold ${textCenterColor} uppercase leading-tight`}
            >
              {centerText}
            </h3>
          </Link>

          <div className="flex justify-center my-2">
            <Line width={64} height={4} color="bg-cr-500" darkClassName="dark:bg-cr-400" />
          </div>

          <Link href={link}>
            <p className={`${textBottomColor} text-center leading-relaxed text-base mb-4 italic dark:text-cb-50`}>
              {bottomText}
            </p>
          </Link>

          {socialLinks && socialLinks.length > 0 && (
            <div className="flex justify-center space-x-3 mb-6">
              {socialLinks.map((s, i) => {
                let Icon: any = null;
                switch (s.provider?.toLowerCase()) {
                  case "facebook":
                    Icon = FaFacebook;
                    break;
                  case "twitter":
                  case "x":
                    Icon = TwitterIconOutline;
                    break;
                  case "instagram":
                    Icon = FaInstagram;
                    break;
                  case "youtube":
                    Icon = FaYoutube;
                    break;
                  case "tiktok":
                    Icon = SiTiktok;
                    break;
                  case "linkedin":
                    Icon = FaLinkedin;
                    break;
                  case "spotify":
                    Icon = FaSpotify;
                    break;
                  case "whatsapp":
                    Icon = FaWhatsapp;
                    break;
                  case "website":
                    Icon = TbWorld;
                    break;
                  default:
                    Icon = null;
                }

                return (
                  <a key={i} href={s.href} target="_blank" rel="noopener noreferrer" className="text-cb-default hover:text-cb-300 dark:text-cb-100 dark:hover:text-cb-300">
                    {Icon ? <Icon className="w-5 h-5" /> : null}
                  </a>
                );
              })}
            </div>
          )}

          {/* QR Code Button */}
          {/* {showQR && slug && (
            <div className="flex justify-center mb-4">
              <QuickQRModal 
                member={memberData}
                trigger={
                  <button className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl group">
                    <FaQrcode className="w-4 h-4 group-hover:rotate-12 transition-transform" />
                    <span className="text-sm font-medium">Generar QR</span>
                  </button>
                }
              />
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
});

