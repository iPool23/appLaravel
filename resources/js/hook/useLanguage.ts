import { useState } from 'react';

export const useLanguage = () => {
    const [currentLanguage, setCurrentLanguage] = useState<'es' | 'qu'>(
        (localStorage.getItem('language') as 'es' | 'qu') || 'es'
    );

    const changeLanguage = (lang: 'es' | 'qu') => {
        setCurrentLanguage(lang);
        localStorage.setItem('language', lang);
    };

    return { 
        currentLanguage, 
        changeLanguage, 
        language: currentLanguage // for backward compatibility
    };
};

