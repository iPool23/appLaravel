import React, { useCallback, useState } from "react";
import { IoMenuOutline, IoLanguage } from "react-icons/io5";
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
  Loader2,
  UserPlus,
  FolderTree
} from "lucide-react";
import { useUIStore } from "@/store";
import Moon from "@/components/svg/Moon";
import Sun from "@/components/svg/Sun";

import { Link, router, usePage } from '@inertiajs/react';
import { MinimalDropdown } from "../dropdown/MinimalDropdown";
import { useLanguage } from '@/hook/useLanguage';
import { useTheme } from '@/hook/useTheme';
import ContainerTodo from "../container/ContainerTodo";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "@/lib/i18n";

interface MenuProps {
  className?: string;
}

export const Menu = ({ className = "" }: MenuProps) => {
  const openSideMenu = useUIStore((state) => state.openSideMenu)
  const { theme, setTheme, systemTheme } = useTheme()
  const currentTheme = theme === 'system' ? systemTheme : theme
  const [mounted, setMounted] = React.useState(false)
  const [loadingPath, setLoadingPath] = useState<string | null>(null)
  const pathname = usePage().url;
  const { currentLanguage, changeLanguage } = useLanguage();
  const t = useTranslations('menu');

  const getCurrentSection = useCallback(() => {
    const withoutLocale = pathname.replace(/^\/(es|qu)(\/|$)/, "");
    return withoutLocale;
  }, [pathname]);

  const languageOptions = [
    { value: 'es', label: t('spanish') },
    { value: 'qu', label: t('quechua') },
  ]

  const organizationOptions = [
    { value: 'efop', label: t('efop') },
    { value: 'juventudes', label: t('juventudes') },
    { value: 'secretaria-de-la-mujer', label: t('secretaria') },
  ]

  const pressOptions = [
    { value: 'prensa?type=Prensa', label: t('prensa') },
    { value: 'prensa?type=Comunicado', label: t('comunicados') },
    { value: 'documentos-publicos', label: t('documentos') },
  ]

  const handleLanguageChange = (selectedLang: string) => {
    const lang = selectedLang as 'es' | 'qu';
    changeLanguage(lang);
    
    // Cambiar la URL al nuevo idioma manteniendo la sección actual
    const currentPath = pathname; // pathname is already usePage().url
    const newPath = currentPath === '/es' || currentPath === '/qu' || currentPath === '/'
      ? `/${lang}`
      : currentPath.replace(/^\/(es|qu)(\/|$)/, `/${lang}$2`);
      
    router.visit(newPath);
  }

  const handleOrganizationChange = (value: string) => {
    const localePath = `/${currentLanguage}/${value}`;
    setLoadingPath(localePath);
    router.visit(localePath);
  }

  const handlePressChange = (value: string) => {
    const localePath = `/${currentLanguage}/${value}`;
    setLoadingPath(localePath);
    router.visit(localePath);
  }

  const handleNavigation = (path: string) => {
    // Si ya estamos en esa ruta, no mostrar carga
    const currentPathNormalized = pathname.replace(/^\/(es|qu)(\/|$)/, "/");
    if (currentPathNormalized === path || (currentPathNormalized === "/" && path === "/")) {
      return;
    }
    setLoadingPath(path);
    const localePath = path === '/' ? `/${currentLanguage}` : `/${currentLanguage}${path}`;
    router.visit(localePath);
  }

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    setLoadingPath(null);
  }, [pathname]);

  const hideLanguageSelector = React.useMemo(() => {
    const section = getCurrentSection()
    return section === 'bancada' || section.startsWith('bancada/')
  }, [getCurrentSection])

  return (
    <div className={`fixed top-0 sm:top-0 md:top-0 xl:top-8 left-0 right-0 z-50 transition-all duration-300 py-0 sm:py-0 md:py-2 lg:py-2 xl:py-4 flex justify-center border-b-2 border-cb-default bg-white dark:bg-cb-default ${className}`}>
      <nav className="bg-white dark:bg-cb-default transition-all duration-300 w-full max-w-[1920px] mx-0 sm:mx-6 lg:mx-8 rounded-none xl:rounded-2xl">
        <ContainerTodo className="container mx-auto px-4 sm:px-6 lg:px-6!">
          <div className="flex justify-between items-center py-2 sm:py-0">
            {/* Logo Section */}
            <div className="shrink-0">
              <Link href={`/${currentLanguage}`}>
                <img
                  src={mounted && currentTheme === "dark" ? "/imgs/logo/logo-white.webp" : "/imgs/logo/logo.webp"}
                  alt="Logo Alianza Para el Progreso"
                  width={140}
                  height={47}
                  className="filter transition-all duration-300 sm:w-[150px] sm:h-[50px] md:w-[160px] md:h-[53px]"
                />
              </Link>
            </div>

            {/* Main Navigation - Grouped with responsive spacing */}
            <div className="hidden sm:hidden md:hidden lg:hidden xl:flex items-center justify-center gap-x-2 2xl:gap-x-4 flex-1 mx-8">
              <MenuSectionLink
                section=""
                icon={<Home size={20} />}
                label={t('inicio')}
                onNavigate={() => handleNavigation('/')}
                isLoading={loadingPath === '/'}
              />
              <MenuSectionLink
                section="historia"
                icon={<History size={20} />}
                label={t('historia')}
                onNavigate={() => handleNavigation('/historia')}
                isLoading={loadingPath === '/historia'}
              />
              <MenuSectionLink
                section="ejes"
                icon={<Target size={20} />}
                label={t('ejes')}
                onNavigate={() => handleNavigation('/ejes')}
                isLoading={loadingPath === '/ejes'}
              />

              <MenuSectionLink
                section="afiliacion"
                icon={<UserPlus size={20} />}
                label={t('afiliacion')}
                onNavigate={() => handleNavigation('/afiliacion')}
                isLoading={loadingPath === '/afiliacion'}
              />

              <motion.div whileHover="hover" className="relative group/nav">
                <a
                  href="https://www.cesaracuna.pe/sobre-mi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center h-11 px-3 rounded-full transition-all duration-300 text-cb-default hover:bg-cb-default hover:text-white dark:text-white dark:hover:bg-white dark:hover:text-cb-default hover:shadow-lg overflow-hidden border border-transparent hover:border-cb-default/10`}
                >
                  <User size={20} className="min-w-[20px]" />
                  <motion.span
                    variants={{
                      hover: { width: "auto", opacity: 1, marginLeft: "8px" }
                    }}
                    initial={{ width: 0, opacity: 0, marginLeft: "0px" }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="whitespace-nowrap font-sans font-bold text-sm"
                  >
                    {t('fundador')}
                  </motion.span>
                </a>
              </motion.div>

              <MinimalDropdown
                options={organizationOptions}
                onChange={handleOrganizationChange}
                placeholder={t('organizacion')}
                icon={<Users size={20} />}
                expandable
                isLoading={loadingPath?.startsWith('/') && organizationOptions.some(opt => `/${opt.value}` === loadingPath)}
              />

              <MenuSectionLink
                section="bancada"
                icon={<Briefcase size={20} />}
                label={t('bancada')}
                onNavigate={() => handleNavigation('/bancada')}
                isLoading={loadingPath === '/bancada'}
              />
              <MenuSectionLink
                section="galeria"
                icon={<ImageIcon size={20} />}
                label={t('galeria')}
                onNavigate={() => handleNavigation('/galeria')}
                isLoading={loadingPath === '/galeria'}
              />

              <MenuSectionLink
                section="recursos"
                icon={<FolderTree size={20} />}
                label={t('recursos')}
                onNavigate={() => handleNavigation('/recursos')}
                isLoading={loadingPath === '/recursos'}
              />

              <MinimalDropdown
                options={pressOptions}
                onChange={handlePressChange}
                placeholder={t('prensa')}
                icon={<Newspaper size={20} />}
                expandable
                isLoading={loadingPath?.startsWith('/') && pressOptions.some(opt => `/${opt.value}` === loadingPath)}
              />

              <MenuSectionLink
                section="contacto"
                icon={<Mail size={20} />}
                label={t('contacto')}
                onNavigate={() => handleNavigation('/contacto')}
                isLoading={loadingPath === '/contacto'}
              />
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
              {!hideLanguageSelector && (
                <MinimalDropdown
                  options={languageOptions}
                  value={currentLanguage}
                  onChange={handleLanguageChange}
                  placeholder={t('language')}
                  icon={<IoLanguage size={22} />}
                  hideLabelOnMobile={true}
                  expandable
                />
              )}

              <button
                onClick={() => setTheme(currentTheme === "dark" ? "light" : "dark")}
                className="group flex items-center justify-center w-11 h-11 rounded-full text-cb-default hover:bg-cb-default hover:text-white transition-all duration-300 dark:text-white dark:hover:bg-white dark:hover:text-cb-default hover:shadow-lg border border-transparent hover:border-cb-default/20"
              >
                {mounted && (currentTheme === "dark" ? (
                  <Moon className="fill-white stroke-white group-hover:fill-cb-300 group-hover:stroke-cb-600 dark:fill-white transition-colors w-5 h-5" />
                ) : (
                  <Sun className="fill-cb-default stroke-cb-default group-hover:fill-white group-hover:stroke-white w-5 h-5 animate-rotate-sun" />
                ))}
              </button>

              <button
                onClick={openSideMenu}
                className="group flex items-center justify-center w-11 h-11 rounded-full text-cb-default hover:bg-cb-default hover:text-white transition-all duration-300 dark:text-white dark:hover:bg-white dark:hover:text-cb-default hover:shadow-lg border border-transparent hover:border-cb-default/20"
              >
                <IoMenuOutline className="fill-cb-600 stroke-cb-600 group-hover:fill-white group-hover:stroke-white dark:fill-white dark:stroke-white w-6 h-6" />
              </button>
            </div>
          </div>
        </ContainerTodo>
      </nav>
    </div>
  );
};

const MenuSectionLink = ({ section, label, icon, onNavigate, isLoading }: { section: string, label: string, icon?: React.ReactNode, onNavigate: () => void, isLoading?: boolean }) => {
  const pathname = usePage().url;
  const t = useTranslations('menu');
  const cleanPath = pathname === "/es" || pathname === "/qu" || pathname === "/"
    ? ""
    : pathname.replace(/^\/(es|qu)(\/|$)/, "").replace(/^\/+|\/+$/g, "");

  const isActive = cleanPath === section;

  return (
    <motion.div whileHover={!isLoading ? "hover" : ""} className="relative text-inherit group/nav">
      <button
        onClick={onNavigate}
        disabled={isLoading}
        className={`flex items-center h-11 px-3 transition-all duration-300 rounded-full hover:shadow-lg overflow-hidden border border-transparent ${isActive
          ? 'bg-cb-default text-white dark:bg-white dark:text-cb-default shadow-md'
          : 'text-cb-default hover:bg-cb-default hover:text-white dark:text-white dark:hover:bg-white/10 dark:hover:text-white hover:border-cb-default/10'
          } ${isLoading ? 'opacity-70 cursor-not-allowed scale-95' : ''}`}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="min-w-[20px] flex items-center justify-center"
            >
              <Loader2 size={18} className="animate-spin" />
            </motion.div>
          ) : (
            <motion.div
              key="icon"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="min-w-[20px] flex items-center justify-center"
            >
              {icon}
            </motion.div>
          )}
        </AnimatePresence>

        <motion.span
          animate={(isActive || isLoading) ? { width: "auto", opacity: 1, marginLeft: "8px" } : {}}
          variants={{
            hover: { width: "auto", opacity: 1, marginLeft: "8px" }
          }}
          initial={{ width: 0, opacity: 0, marginLeft: "0px" }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="whitespace-nowrap font-sans font-bold text-sm"
        >
          {isLoading ? t('loading') : label}
        </motion.span>
      </button>
    </motion.div>
  )
}


