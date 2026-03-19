export function getCurrentLanguage(pathname: string, mounted: boolean = true): string {
    if (!mounted) return 'es-PE';
    if (pathname.startsWith('/qu-PE')) return 'qu-PE';
    return 'es-PE';
}
