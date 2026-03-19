import { useState, useEffect } from 'react';

export const useTheme = () => {
    const [theme, setThemeState] = useState<'light' | 'dark' | 'system'>(
        (localStorage.getItem('theme') as 'light' | 'dark' | 'system') || 'system'
    );
    const [systemTheme, setSystemTheme] = useState<'light' | 'dark'>('light');

    useEffect(() => {
        const mql = window.matchMedia('(prefers-color-scheme: dark)');
        setSystemTheme(mql.matches ? 'dark' : 'light');

        const handler = (e: MediaQueryListEvent) => {
            setSystemTheme(e.matches ? 'dark' : 'light');
        };
        mql.addEventListener('change', handler);
        return () => mql.removeEventListener('change', handler);
    }, []);

    const setTheme = (newTheme: 'light' | 'dark' | 'system') => {
        setThemeState(newTheme);
        localStorage.setItem('theme', newTheme);
        
        const root = window.document.documentElement;
        root.classList.remove('light', 'dark');

        if (newTheme === 'system') {
            const system = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
            root.classList.add(system);
        } else {
            root.classList.add(newTheme);
        }
    };

    // Apply theme on mount
    useEffect(() => {
        const currentTheme = theme === 'system' 
            ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
            : theme;
        
        window.document.documentElement.classList.remove('light', 'dark');
        window.document.documentElement.classList.add(currentTheme);
    }, [theme]);

    return { theme, setTheme, systemTheme };
};
