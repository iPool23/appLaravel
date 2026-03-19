import { ReactNode } from "react";

interface ContainerSingleProps {
    children?: ReactNode;
    className?: string;
}

export default function ContainerSingle({ children, className }: ContainerSingleProps) {
    return (
        <div className={`py-8 sm:py-12 md:py-16 ${className}`}>
            {children}
        </div>
    );
}
