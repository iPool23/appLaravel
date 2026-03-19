import React from "react";
import ContainerTodo from "../container/ContainerTodo";

import { defaultSocialLinks } from "./data/SocialLinks";
import { Link } from '@inertiajs/react';
import { useLocale, useTranslations } from "@/lib/i18n";

import TextReveal from "../animation/TextReveal";

export const Footer = () => {
  const locale = useLocale();
  const t = useTranslations('footer');

  return (
    <>
      <footer className="bg-cb-default pb-12 pt-8">
        <ContainerTodo>
          <div className="flex flex-col items-center justify-center -space-y-8 sm:-space-y-12 lg:-space-y-16">
            <TextAPP text="ALIANZA" />
            <TextAPP text="PARA EL" />
            <TextAPP text="PROGRESO" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 px-0 sm:px-6 w-full">
            <FooterContent href={`/${locale}/historia`} text={t('history').toUpperCase()} image="/imgs/carousel/2.png" />
            <FooterContent href={`/${locale}/ejes`} text={t('axes').toUpperCase()} image="/imgs/ejes/6/2.jpg" />
            <Link href={"https://www.cesaracuna.pe/sobre-mi"} className="relative w-full h-48 md:h-80 group lg:h-auto lg:aspect-square rounded-3xl overflow-hidden flex items-center justify-center group border border-white/10">
              <img
                src={"/imgs/footer/bannerSobreMi.jpg"}
                width={1000}
                height={1000}
                alt={"FUNDADOR"}
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
              <span
                className={`font-gotham-bold absolute text-white text-4xl sm:text-5xl lg:text-4xl xl:text-5xl leading-none font-black tracking-[-.1em] z-10`}
              >
                {t('founder').toUpperCase()}
              </span>
            </Link>
            <FooterContent href={`/${locale}/prensa`} text={t('press').toUpperCase()} image="https://ftp.app.pe/images/prensa/ante-conductas-atribuidas-al-presidente-jose-jeri-1768920176053.jpg" />
          </div>

          <div className="p-0 py-6 sm:p-6">
            <div className="bg-white h-1 w-full"></div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-6 justify-between px-0 sm:px-6">
            <div className="font-gotham-light">
              <span className="text-white">{new Date().getFullYear()}{" "}</span>
              <span className="text-white">© {t('rights')}</span>
            </div>
            <SocialLinks />
          </div>

        </ContainerTodo>
      </footer>
    </>
  );
};

const FooterContent = ({
  text = "",
  image = "/imgs/footer/1.jpeg",
  href = "/"
}: { text?: string, image?: string, href?: string }) => {
  return (
    <Link href={href} className="relative w-full h-48 md:h-80 group lg:h-auto lg:aspect-square rounded-3xl overflow-hidden flex items-center justify-center group border border-white/10">
      <img
        src={image}
        width={1000}
        height={1000}
        alt={text}
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black/50 group-hover:bg-black/30 transition-colors duration-300" />
      <span
        className={`font-gotham-bold absolute text-white text-4xl sm:text-5xl lg:text-4xl xl:text-5xl leading-none font-black tracking-[-.1em] z-10`}
      >
        {text}
      </span>
    </Link>
  );
};

const SocialLinks = () => {
  return (
    <div className="flex space-x-2 sm:space-x-3 gap-4">
      {defaultSocialLinks.map((social, index) => (
        <Link
          key={index}
          href={social.href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-white hover:text-white/80 transition-colors duration-300"
          aria-label={social.label}
        >
          {social.icon}
        </Link>
      ))}
    </div>
  );
}

const TextAPP = ({ text }: { text: string }) => {
  return (
    <TextReveal
      text={text}
      className={`font-gotham-bold text-6xl sm:text-[115px] lg:text-[200px] xl:text-[275px] leading-tight sm:leading-tight xl:leading-none font-black text-center tracking-tighter bg-gradient-to-t from-[#006edb] to-white bg-clip-text text-transparent`}
    />
  );
}
