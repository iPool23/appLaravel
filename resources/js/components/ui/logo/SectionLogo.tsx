import ContainerSingle from '../container/ContainerSingle';
import ContainerTodo from '../container/ContainerTodo';
import { InteractiveLogo } from '../logo/InteractiveLogo';

export interface LogoItem {
    id: number;
    src: string;
    alt: string;
    href: string;
}

interface SectionLogoProps {
    logos: LogoItem[];
}

export default function SectionLogo({ logos }: SectionLogoProps) {
    const getGridCols = () => {
        const logoCount = logos.length;
        if (logoCount <= 2) return 'grid-cols-1 sm:grid-cols-2';
        if (logoCount <= 3) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3';
        if (logoCount <= 4) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4';
        if (logoCount <= 5) return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5';
        return 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6';
    };

    return (
        <ContainerSingle>
            <ContainerTodo>
                <div className={`grid gap-8 place-content-center justify-items-center justify-center ${getGridCols()}`}>
                    {logos.map((logo, index) => (
                        <InteractiveLogo
                            key={logo.id}
                            src={logo.src}
                            alt={logo.alt}
                            href={logo.href}
                        />
                    ))}
                </div>
            </ContainerTodo>
        </ContainerSingle>
    );
};  
