import { Link } from '@inertiajs/react';
import { CircleArrow } from "../circle/CircleArrow";

interface ArrowButtonProps {
    text: string;
    href: string;
    className?: string;
    variant?: 'black' | 'white';
    onClick?: () => void;
}

export const ArrowButton: React.FC<ArrowButtonProps> = ({
    text,
    href,
    className = "",
    variant = 'black',
    onClick
}) => {
    const buttonStyles = {
        black: {
            border: "border-cb-600 dark:border-white",
            textColor: "text-cb-600 dark:text-white",
            textHover: "group-hover:text-white dark:group-hover:text-cb-600",
            bgHover: "group-hover:bg-cb-600 dark:group-hover:bg-white",
        },
        white: {
            border: "border-white dark:border-cb-600",
            textColor: "text-white dark:text-cb-600",
            textHover: "group-hover:text-cb-600 dark:group-hover:text-white",
            bgHover: "group-hover:bg-white dark:group-hover:bg-cb-600",
        }
    };

    const styles = buttonStyles[variant];

    return (
        <Link href={href} className={`group ${className}`} onClick={onClick}>
            <div className={`flex items-center justify-between border rounded-full ${styles.border}`}>
                <span className={`px-4 py-2 font-sans text-sm tracking-wider ${styles.textColor} ${styles.textHover} ${styles.bgHover} group-hover:rounded-full transition-all duration-300`}>
                    {text}
                </span>
                <CircleArrow variant={variant} className="mr-2" />
            </div>
        </Link>
    );
};
