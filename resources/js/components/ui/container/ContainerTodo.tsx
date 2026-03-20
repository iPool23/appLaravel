import { ReactNode } from "react";

interface ContainerTodoProps {
    children?: ReactNode;
    className?: string;
}

export default function ContainerTodo({ children, className = "" }: ContainerTodoProps) {
    return (
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
            {children}
        </div>
    );
}
