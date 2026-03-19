import { Link, usePage } from '@inertiajs/react';
import { useLocale } from '@/lib/i18n';

const links = [
    { label: { es: 'Inicio', qu: 'Wasi' }, path: '' },
    { label: { es: 'Historia', qu: 'Paqarina Kuy' }, path: 'historia' },
    { label: { es: 'Ejes', qu: 'Ñan Kay' }, path: 'ejes' },
    { label: { es: 'Fundador', qu: 'Yuyaychaq' }, path: 'fundador' },
    { label: { es: 'Bancada', qu: 'Tantanakuy' }, path: 'bancada' },
    { label: { es: 'Juventudes', qu: 'Waynakuna' }, path: 'juventudes' },
    { label: { es: 'Galería', qu: 'Rikchaykuna' }, path: 'galeria' },
    { label: { es: 'Prensa', qu: 'Willay' }, path: 'prensa?type=Prensa' },
    { label: { es: 'Contacto', qu: 'Willanakuy' }, path: 'contacto' },
];

export default function Menu() {
    const locale = useLocale();
    const { url } = usePage();

    const getLocalePath = (targetLocale: string) => {
        if (url === '/es' || url === '/qu' || url === '/') {
            return `/${targetLocale}`;
        }
        return url.replace(/^\/(es|qu)(\/|$)/, `/${targetLocale}$2`);
    };

    return (
        <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur dark:border-gray-800 dark:bg-gray-950/95">
            <div className="container mx-auto flex items-center justify-between gap-6 px-4 py-4">
                <Link href={`/${locale}`} className="text-xl font-black uppercase tracking-wide text-blue-700 dark:text-white">
                    APP
                </Link>
                <nav className="hidden flex-wrap items-center gap-5 lg:flex">
                    {links.map((item) => (
                        <Link
                            key={item.path}
                            href={`/${locale}/${item.path}`.replace(/\/$/, '')}
                            className="text-sm font-semibold uppercase tracking-wide text-gray-700 transition hover:text-blue-700 dark:text-gray-200 dark:hover:text-white"
                        >
                            {item.label[locale as 'es' | 'qu'] ?? item.label.es}
                        </Link>
                    ))}
                </nav>
                <div className="flex items-center gap-2 text-xs font-semibold uppercase">
                    <Link href={getLocalePath('es')} className={locale === 'es' ? 'text-blue-700' : 'text-gray-500'}>ES</Link>
                    <span className="text-gray-400">/</span>
                    <Link href={getLocalePath('qu')} className={locale === 'qu' ? 'text-blue-700' : 'text-gray-500'}>QU</Link>
                </div>
            </div>
        </header>
    );
}
