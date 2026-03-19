import { ReactNode } from "react";

interface ContainerProps {
    children?: ReactNode;
    className?: string;
    classNameInner?: string;
}

export default function Container({ children, className, classNameInner }: ContainerProps) {
    return (
        <div className={`py-8 sm:py-12 md:py-16 ${className}`}>
            <div className={`container mx-auto px-8 sm:px-16 lg:px-0 xl:px-0 ${classNameInner}`}>
                {children}
            </div>
        </div>
    );
}
