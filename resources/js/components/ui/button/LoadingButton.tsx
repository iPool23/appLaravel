import React from "react";

interface LoadingButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    children?: React.ReactNode;
    loadingText?: string;
    iconLeft?: React.ReactNode;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
    loading = false,
    children,
    loadingText = "Enviando...",
    className = "",
    iconLeft,
    ...props
}) => {
    return (
        <button
            type="submit"
            disabled={loading || props.disabled}
            className={
                `bg-cr-default hover:bg-cr-800 disabled:bg-gray-400 rounded-3xl disabled:cursor-not-allowed text-white px-6 py-3 font-medium transition-colors duration-200 flex items-center justify-center min-w-[100px] ${className}`
            }
            {...props}
        >
            {!loading && iconLeft && (
                <span className="mr-2 flex items-center self-center">{iconLeft}</span>
            )}
            {loading ? (
                <>
                    <div className="relative mr-2">
                        <div className="h-4 w-4 border-2 border-white/30 rounded-full"></div>
                        <div className="absolute top-0 left-0 h-4 w-4 border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    </div>
                    {loadingText}
                </>
            ) : (
                children
            )}
        </button>
    );
};

export default LoadingButton;
