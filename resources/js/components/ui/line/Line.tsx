import React from "react";
import clsx from "clsx";

export type LineAlignment = "left" | "center" | "right";

export interface LineProps {
    width?: number | string;
    height?: number;
    color?: string;
    darkClassName?: string;
    className?: string;
    rounded?: boolean;
    ariaHidden?: boolean;
    alignment?: LineAlignment;
}

export default function Line({
    width = 64,
    height = 4,
    color = "bg-cr-500",
    darkClassName,
    className,
    rounded = true,
    ariaHidden = true,
    alignment = "center",
}: LineProps) {
    const isTailwindColor = typeof color === "string" && /^(bg-|from-|to-)/.test(color);

    const alignmentClasses = {
        left: "mr-auto",
        center: "mx-auto",
        right: "ml-auto",
    };

    const classes = clsx(
        alignmentClasses[alignment],
        rounded ? "rounded-full" : undefined,
        isTailwindColor ? color : undefined,
        darkClassName,
        className
    );

    const style: React.CSSProperties = {
        width: typeof width === "number" ? `${width}px` : width,
        height: `${height}px`,
        ...(isTailwindColor ? {} : { backgroundColor: color }),
    };

    return <div className={classes} style={style} aria-hidden={ariaHidden} />;
}
