import React, { useState, useEffect, useCallback } from 'react';
import { Link, router, usePage } from '@inertiajs/react';

import clsx from "clsx";
import { IoCloseOutline } from "react-icons/io5";
import { useUIStore } from "@/store";
import { defaultSocialLinks } from "../menu/data/contactSocialLinks";
import { useTheme } from '@/hook/useTheme';
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from '@/lib/i18n';
import { useLanguage } from '@/hook/useLanguage';
import {
  Home,
  History,
  Target,
  User,
  Users,
  Briefcase,
  Image as ImageIcon,
  Newspaper,
  Mail,
  GraduationCap,
  Heart,
  Files,
  UserPlus,
  FolderTree,
  LayoutDashboard,
  MessageSquare,
  Download,
  Tv,
  LogOut,
  Loader2
} from "lucide-react";

export const Sidebar = () => {
  const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  const { theme, systemTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme
  const [mounted, setMounted] = React.useState(false)
  const t = useTranslations('menu');
  const { currentLanguage } = useLanguage();

  const { auth } = usePage<any>().props;
  const user = auth?.user;
  const isAuthenticated = !!user;
  // Note: Adjust these checks based on your actual role implementation in Laravel
  const isAdmin = user?.role === 'admin';
  const isSubAdmin = user?.role === 'subadmin';

  const handleLogout = React.useCallback(() => {
    router.post('/logout');
  }, []);

  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div>
      {isSideMenuOpen && (
        <div
          onClick={closeMenu}
          className="fixed top-0 left-0 w-screen h-screen z-55 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
        />
      )}

      <nav
        className={clsx(
          "fixed right-0 top-0 w-[280px] h-screen z-60 transform transition-all duration-500 ease-in-out",
          {
            "translate-x-0": isSideMenuOpen,
            "translate-x-full": !isSideMenuOpen,
          }
        )}
      >
        <div className="h-full flex flex-col bg-white dark:bg-cb-full relative">
          <div className="relative py-4 px-6 border-b border-zinc-200 dark:border-white/10 flex items-center justify-between">
            <Link href={`/${currentLanguage}`} onClick={closeMenu} className="flex items-center">
              <img
                src={mounted && currentTheme === "dark" ? "/imgs/logo/logo-white.webp" : "/imgs/logo/logo.webp"}
                alt="Logo APP"
                width={120}
                height={40}
                // @ts-ignore
                fetchPriority="high"
                className="object-contain"
              />
            </Link>
            <button
              onClick={closeMenu}
              className="p-2 text-zinc-600 dark:text-white/80 hover:text-zinc-900 dark:hover:text-white transition-colors rounded-full hover:bg-zinc-100 dark:hover:bg-white/10"
            >
              <IoCloseOutline size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto pt-5 pb-4">
            <nav className="space-y-2 px-4 w-full flex flex-col items-start">

              {!isAuthenticated && (
                <>
                  <SidebarSectionLink section="" label={t('inicio')} icon={<Home size={20} />} />
                  <SidebarSectionLink section="historia" label={t('historia')} icon={<History size={20} />} />
                  <motion.div className="relative group/nav w-full">
                    <a
                      href="https://www.cesaracuna.pe/sobre-mi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`flex items-center h-12 px-4 rounded-xl transition-all duration-300 text-cb-default dark:text-white hover:bg-cb-default hover:text-white dark:hover:bg-white/10 dark:hover:text-white hover:shadow-lg overflow-hidden border border-transparent w-full`}
                      onClick={closeMenu}
                    >
                      <User size={20} className="min-w-[22px]" />
                      <span className="ml-3 whitespace-nowrap font-sans font-bold text-sm">
                        {t('fundador')}
                      </span>
                    </a>
                  </motion.div>

                  <SidebarSectionLink section="ejes" label={t('ejes')} icon={<Target size={20} />} />
                  <SidebarSectionLink section="bancada" label={t('bancada')} icon={<Briefcase size={20} />} />
                  <SidebarSectionLink section="juventudes" label={t('juventudes')} icon={<Users size={20} />} />
                  <SidebarSectionLink section="efop" label={t('efop')} icon={<GraduationCap size={20} />} />
                  <SidebarSectionLink section="secretaria-de-la-mujer" label={t('secretaria')} icon={<Heart size={20} />} />
                   <SidebarSectionLink section="prensa" label={t('prensa')} icon={<Newspaper size={20} />} />
                  <SidebarSectionLink section="recursos" label={t('recursos')} icon={<FolderTree size={20} />} />
                  <SidebarSectionLink section="afiliacion" label={t('afiliacion')} icon={<UserPlus size={20} />} />
                  <SidebarSectionLink section="documentos-publicos" label={t('documentos')} icon={<Files size={20} />} />
                  <SidebarSectionLink section="galeria" label={t('galeria')} icon={<ImageIcon size={20} />} />
                  <SidebarSectionLink section="contacto" label={t('contacto')} icon={<Mail size={20} />} />
                </>
              )}

              {
                isAdmin && (
                  <>
                    <SidebarSectionLink section="admin" label="Panel" icon={<LayoutDashboard size={20} />} />
                  </>
                )
              }

              {isAuthenticated && (
                <>
                  <SidebarSectionLink section="profile" label="Perfil" icon={<User size={20} />} />
                </>
              )}

              {(isSubAdmin || isAdmin) && (
                <>
                  <SidebarSectionLink section="admin/prensa" label="Prensa" icon={<Newspaper size={20} />} />
                  <SidebarSectionLink section="admin/documentos" label="Documentos Públicos" icon={<Files size={20} />} />
                  <SidebarSectionLink section="admin/recursos-subadmin" label="Recursos" icon={<Files size={20} />} />
                  <SidebarSectionLink section="admin/recursos" label="G. Recursos" icon={<Files size={20} />} />
                </>
              )}

              {
                isAdmin && (
                  <>
                    <SidebarSectionLink section="admin/users" label="Usuarios" icon={<Users size={20} />} />
                    <SidebarSectionLink section="admin/contact" label="Comentarios" icon={<MessageSquare size={20} />} />
                    <SidebarSectionLink section="admin/downloads" label="Descargas" icon={<Download size={20} />} />
                    <SidebarSectionLink section="admin/ad" label="Anuncios" icon={<Tv size={20} />} />
                  </>
                )
              }

              {isAuthenticated && (
                <SidebarSectionLink
                  section=""
                  label="Cerrar Sesión"
                  icon={<LogOut size={20} />}
                  onClick={handleLogout}
                />
              )}

            </nav>
          </div>

          <div className="py-4 px-6 border-t border-zinc-200 dark:border-white/10">
            <div className="flex justify-center space-x-2 mb-3">
              {defaultSocialLinks.map((social, index) => (
                <SidebarButtonFooterLink key={index} icon={social.icon} href={social.href} />
              ))}
            </div>
            <p className="text-center text-xs text-cb-400 dark:text-white/50">
              © {new Date().getFullYear()} Alianza Para el Progreso
            </p>
          </div>
        </div>
      </nav>
    </div>
  );
};

export const SidebarSectionLink = ({ section, label, icon, onClick, isLoading }: { section: string, label: string, icon?: React.ReactNode, onClick?: () => void, isLoading?: boolean }) => {
  const { url: pathname } = usePage();
  const { currentLanguage } = useLanguage();
  
  const cleanPath = pathname === "/es" || pathname === "/qu" || pathname === "/"
    ? ""
    : pathname.replace(/^\/(es|qu)(\/|$)/, "").replace(/^\/+|\/+$/g, "");

  const isActive = cleanPath === section;
  const closeMenu = useUIStore((state) => state.closeSideMenu);

  const handleClick = (e: React.MouseEvent) => {
    if (isLoading) {
      e.preventDefault();
      return;
    }
    if (onClick) {
      onClick();
    }
    closeMenu();
  };

  const href = section ? `/${currentLanguage}/${section}` : `/${currentLanguage}`;

  return (
    <motion.div className="relative group/nav w-full">
      <Link
        href={href}
        className={`flex items-center h-12 px-4 transition-all duration-300 rounded-xl overflow-hidden border border-transparent w-full ${isActive
          ? 'bg-cb-default text-white dark:bg-white dark:text-cb-default shadow-md'
          : 'text-cb-default dark:text-white/80 hover:bg-cb-default hover:text-white dark:hover:bg-white/10 dark:hover:text-white hover:border-white/10'
          } ${isLoading ? 'opacity-70 cursor-not-allowed scale-95' : ''}`}
        onClick={handleClick}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="min-w-[22px] flex items-center justify-center"
            >
              <Loader2 size={18} className="animate-spin" />
            </motion.div>
          ) : (
            <div className="min-w-[22px] flex items-center justify-center">
              {icon}
            </div>
          )}
        </AnimatePresence>

        <span className="ml-3 whitespace-nowrap font-sans font-bold text-sm">
          {isLoading ? (useTranslations('menu')('loading')) : label}
        </span>
      </Link>
    </motion.div>
  )
}

const SidebarButtonFooterLink = ({ icon, href }: { icon: React.ReactNode, href: string }) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-cb-400 dark:text-white/70 hover:text-cb-600 dark:hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-100 dark:hover:bg-white/10"
    >
      {icon}
    </a>
  )
}

