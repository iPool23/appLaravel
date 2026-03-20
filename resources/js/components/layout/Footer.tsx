import { Link } from '@inertiajs/react';
import { useLocale, useTranslations } from '@/lib/i18n';

export default function Footer() {
    const locale = useLocale();
    const t = useTranslations('footer');

    return (
        <footer className="bg-blue-950 py-12 text-white">
            <div className="container mx-auto px-4">
                <div className="mb-10 text-center">
                    <p className="text-4xl font-black uppercase tracking-tight md:text-7xl">Alianza</p>
                    <p className="text-4xl font-black uppercase tracking-tight md:text-7xl">Para el</p>
                    <p className="text-4xl font-black uppercase tracking-tight md:text-7xl">Progreso</p>
                </div>
                <div className="grid gap-4 md:grid-cols-4">
                    <FooterCard href={`/${locale}/historia`} text={t('history')} image="/imgs/carousel/2.webp" />
                    <FooterCard href={`/${locale}/ejes`} text={t('axes')} image="/imgs/ejes/6/2.webp" />
                    <FooterCard href={`/${locale}/fundador`} text={t('founder')} image="/imgs/footer/bannerSobreMi.webp" />
                    <FooterCard href={`/${locale}/prensa?type=Prensa`} text={t('press')} image="/imgs/prensa/2025-02-17-1.webp" />
                </div>
                <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/20 pt-6 md:flex-row">
                    <p className="text-sm text-white/80">{new Date().getFullYear()} © {t('rights')}</p>
                    <div className="flex gap-4 text-sm text-white/80">
                        <a href="https://www.facebook.com/alianzaparaelprogreso" target="_blank" rel="noreferrer">Facebook</a>
                        <a href="https://www.instagram.com/alianzaparaelprogreso" target="_blank" rel="noreferrer">Instagram</a>
                        <a href="https://x.com" target="_blank" rel="noreferrer">X</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function FooterCard({ href, text, image }: { href: string; text: string; image: string }) {
    return (
        <Link href={href} className="group relative block h-48 overflow-hidden rounded-3xl border border-white/10 lg:h-64">
            <img src={image} alt={text} className="h-full w-full object-cover transition duration-300 group-hover:scale-105" />
            <div className="absolute inset-0 bg-black/45 transition group-hover:bg-black/25" />
            <span className="absolute inset-0 flex items-center justify-center text-3xl font-black uppercase tracking-tight text-white">
                {text}
            </span>
        </Link>
    );
}
