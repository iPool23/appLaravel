import { Head } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import type { PropsWithChildren, ReactNode } from 'react';
import { Footer } from '@/components/ui/footer/Footer';
import { ContactTopBar } from '@/components/ui/menu/ContactTopBar';
import { Menu } from '@/components/ui/menu/Menu';
import { Sidebar } from '@/components/ui/sidebar/Sidebar';

interface AppLayoutProps extends PropsWithChildren {
    title?: string;
    description?: string;
    hero?: ReactNode;
    image?: string;
    keywords?: string[];
    type?: 'website' | 'article';
    canonicalPath?: string;
    robots?: string;
    publishedTime?: string;
}

type SharedPageProps = {
    appUrl?: string;
    locale?: string;
    url: string;
    name?: string;
};

export default function AppLayout({
    children,
    title,
    description,
    hero,
    image,
    keywords,
    type = 'website',
    canonicalPath,
    robots = 'index,follow',
    publishedTime,
}: AppLayoutProps) {
    const defaultKeywords = ['APP', 'Alianza Para el Progreso', 'Perú', 'César Acuña', 'partido político', 'progreso'];
    const { props, url } = usePage<SharedPageProps>();
    const appUrl = props.appUrl ?? 'http://localhost:8000';
    const locale = props.locale ?? 'es';
    const siteName = props.name ?? 'Alianza Para el Progreso';
    const resolvedPath = canonicalPath ?? url;
    const absoluteUrl = new URL(resolvedPath, appUrl).toString();
    const finalImage = image || '/imgs/cap.webp';
    const absoluteImage = new URL(finalImage, appUrl).toString();
    const finalKeywords = keywords 
        ? (Array.isArray(keywords) ? keywords.join(', ') : keywords) 
        : defaultKeywords.join(', ');
    const ogLocale = locale === 'qu' ? 'qu_PE' : 'es_PE';

    return (
        <>
            <Head title={title}>
                {description ? <meta name="description" content={description} /> : null}
                <meta name="keywords" content={finalKeywords} />
                <meta name="robots" content={robots} />
                <link rel="canonical" href={absoluteUrl} />
                <meta property="og:site_name" content={siteName} />
                <meta property="og:locale" content={ogLocale} />
                <meta property="og:type" content={type} />
                <meta property="og:url" content={absoluteUrl} />
                {title ? <meta property="og:title" content={title} /> : null}
                {description ? <meta property="og:description" content={description} /> : null}
                {absoluteImage ? <meta property="og:image" content={absoluteImage} /> : null}
                <meta name="twitter:card" content={absoluteImage ? 'summary_large_image' : 'summary'} />
                {title ? <meta name="twitter:title" content={title} /> : null}
                {description ? <meta name="twitter:description" content={description} /> : null}
                {absoluteImage ? <meta name="twitter:image" content={absoluteImage} /> : null}
                {publishedTime ? <meta property="article:published_time" content={publishedTime} /> : null}
            </Head>
            <div className="relative min-h-screen bg-white dark:bg-cb-full">
                <div className="hidden sm:hidden md:hidden lg:hidden xl:flex">
                    <ContactTopBar />
                </div>
                <Menu />
                <Sidebar />

                {/* Optional DownloadsPanel can be added here if ported */}
                
                {hero}

                <main className="min-h-screen bg-white dark:bg-cb-full">
                    {children}
                </main>

                <div className="relative z-20 bg-white dark:bg-cb-full">
                    <Footer />
                </div>
            </div>
        </>
    );
}
