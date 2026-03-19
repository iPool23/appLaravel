import { usePage } from '@inertiajs/react';

type TranslationValue = string | Record<string, unknown>;
type TranslationDict = Record<string, TranslationValue>;

function getNestedValue(obj: TranslationDict, path: string): any {
    const parts = path.split('.');
    let current: any = obj;
    for (const part of parts) {
        if (current === null || typeof current !== 'object') return path;
        current = current[part];
        if (current === undefined) return path;
    }
    return current;
}

/**
 * Hook that mimics next-intl's useTranslations(namespace).
 * Usage: const t = useTranslations('home'); t('statistics.militants')
 */
export function useTranslations(namespace: string) {
    const { translations } = usePage<{ translations: TranslationDict }>().props;

    return function t(key: string): any {
        const namespacedKey = namespace ? `${namespace}.${key}` : key;
        return getNestedValue(translations, namespacedKey);
    };
}

/**
 * Returns the current locale from Inertia shared props.
 */
export function useLocale(): string {
    const { locale } = usePage<{ locale: string }>().props;
    return locale ?? 'es';
}

export function useMessages<T extends TranslationDict = TranslationDict>(): T {
    const { translations } = usePage<{ translations: T }>().props;
    return translations;
}
