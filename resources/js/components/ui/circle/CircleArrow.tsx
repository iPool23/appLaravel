import React from "react";
import { IoArrowForward } from "react-icons/io5";

interface CircleArrowProps {
    variant?: 'black' | 'white';
    className?: string;
    size?: number;
}

export const CircleArrow: React.FC<CircleArrowProps> = ({
    variant = 'black',
    className = "",
    size = 16
}) => {
    const variantStyles = {
        black: {
            circleBg: "bg-cb-600 dark:bg-white",
            circleHover: "group-hover:bg-white dark:group-hover:bg-cb-600",
            iconColor: "text-white dark:text-cb-600",
            iconHover: "group-hover:text-cb-600 dark:group-hover:text-white"
        },
        white: {
            circleBg: "bg-white dark:bg-cb-600",
            circleHover: "group-hover:bg-cb-600 dark:group-hover:bg-white",
            iconColor: "text-cb-600 dark:text-white",
            iconHover: "group-hover:text-white dark:group-hover:text-cb-600"
        }
    };

    const styles = variantStyles[variant];

    return (
        <div className={`${styles.circleBg} ${styles.circleHover} rounded-full p-1 flex justify-center items-center transition-colors duration-300 ${className}`}>
            <IoArrowForward size={size} className={`${styles.iconColor} ${styles.iconHover}`} />
        </div>
    );
};
