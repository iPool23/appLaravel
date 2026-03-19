"use client";


import { usePage, router } from '@inertiajs/react';
import { useLanguage } from '@/hook/useLanguage';


export function LanguageSwitcher() {
    const { language: locale } = useLanguage();
    
    const { url: pathname } = usePage();

    const switchLanguage = (newLocale: string) => {
        router.replace(pathname, { locale: newLocale });
    };

    const getLanguageName = (loc: string) => {
        switch (loc) {
            case 'es':
                return 'Español';
            case 'qu':
                return 'Quechua';
            default:
                return loc;
        }
    };

    return (
        <div className="flex gap-2">
            {routing.locales.map((loc) => (
                <button
                    key={loc}
                    onClick={() => switchLanguage(loc)}
                    className={`px-3 py-1 rounded transition-colors ${locale === loc
                        ? 'bg-cr-default text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                        }`}
                    aria-label={`Cambiar idioma a ${getLanguageName(loc)}`}
                >
                    {getLanguageName(loc)}
                </button>
            ))}
        </div>
    );
}

