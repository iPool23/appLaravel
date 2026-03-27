import { BorderButton } from '@/components/ui/button/BorderButton';
import ALogoIcon from '@/components/svg/ALogoIcon';
import { defaultSocialLinks } from '@/components/ui/footer/data/SocialLinks';
import SocialLinks from '@/components/ui/social/SocialLinks';
import Link from 'next/link';

interface NotFoundContentProps {
    title?: string;
    number?: string;
    text?: string;
    buttonTitle?: string;
    buttonLink?: string;
}

export default function NotFoundContent({
    number = "404",
    title = "PÃGINA NO ENCONTRADA",
    text = "La pÃ¡gina que buscas no existe o ha sido movida.",
    buttonTitle = "CONOCE NUESTROS EJES",
    buttonLink = "/ejes"
}: NotFoundContentProps) {
    return (
        <div className="flex flex-col min-h-screen dark:from-cb-950 dark:to-cb-900">
            <main className="flex-1 flex items-center justify-center px-4 py-16">
                <div className="relative max-w-3xl w-full">
                    <div className="absolute inset-0 bg-white dark:bg-cb-900 rounded-2xl shadow-2xl border border-cb-200 dark:border-cb-700"></div>
                    <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cb-600 via-cb-500 to-cb-600 rounded-t-2xl"></div>
                    <div className="relative flex flex-col items-center text-center z-10 p-8 md:p-16">
                        <div className="mb-4">
                            <ALogoIcon className='w-56 h-56' />
                        </div>
                        <h2 className="text-8xl md:text-9xl font-bold text-cb-700 dark:text-cb-300 mb-4 tracking-tighter">
                            {number}
                        </h2>
                        <h3 className="text-2xl md:text-3xl font-bold text-cb-600 dark:text-cb-400 mb-6 tracking-wide">
                            {title}
                        </h3>
                        <p className="text-base text-cb-500 dark:text-cb-300 max-w-lg mb-8 leading-relaxed">
                            {text} Te invitamos a regresar al inicio para conocer mÃ¡s sobre
                            <span className="font-semibold text-cb-600 dark:text-cb-400"> Alianza Para el Progreso</span> y nuestras propuestas para el PerÃº.
                        </p>
                        <div className="flex items-center py-4 w-full max-w-md mb-8">
                            <div className="flex-1 border-t-2 border-cb-300 dark:border-cb-600"></div>
                            <div className="px-6">
                                <div className="w-8 h-8 bg-cb-600 rounded-full flex items-center justify-center">
                                    <span className="text-white font-bold text-xs">APP</span>
                                </div>
                            </div>
                            <div className="flex-1 border-t-2 border-cb-300 dark:border-cb-600"></div>
                        </div>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <BorderButton
                                text="VOLVER AL INICIO"
                                href="/"
                                className="min-w-[200px] bg-transparent hover:bg-cb-50 text-cb-600 border-cb-600 hover:border-cb-700 dark:hover:bg-cb-800 dark:text-cb-400"
                            />
                            <BorderButton
                                text={buttonTitle}
                                href={buttonLink}
                                className="min-w-[200px] bg-transparent hover:bg-cb-50 text-cb-600 border-cb-600 hover:border-cb-700 dark:hover:bg-cb-800 dark:text-cb-400"
                            />
                        </div>
                        <div className="mt-12 text-center">
                            <p className="text-sm text-cb-400 dark:text-cb-500 mb-8">
                                Â¿Necesitas ayuda? <Link href="/contacto"> ContÃ¡ctanos </Link>
                            </p>
                            <div className="flex justify-center gap-6 text-xs text-cb-500 dark:text-cb-400">
                                <SocialLinks
                                    socialLinks={defaultSocialLinks}
                                    alignment="left"
                                    className="text-cb-600"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}
