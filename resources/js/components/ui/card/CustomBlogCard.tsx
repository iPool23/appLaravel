import { Title } from "../typography/Title";

interface CustomBlogCardProps {
    titleTop?: string;
    titleCenter?: string;
    description?: string;
    isImage?: boolean;
    imageUrl?: string;
    className?: string;
    textAlignment?: "left" | "right" | "center";
}

export default function CustomBlogCard({
    titleTop = "",
    titleCenter = "",
    description = "",
    imageUrl = "/imgs/placeholder.jpg",
    isImage = true,
    className = "",
    textAlignment = "left",
}: CustomBlogCardProps) {
    const isVerticalCenter = className.includes('!justify-center');

    const getTextAlignment = () => {
        if (textAlignment === "right") return "text-center md:text-right";
        if (textAlignment === "center") return "text-center md:text-center";
        return "text-center md:text-left";
    };

    const getDescriptionAlignment = () => {
        if (textAlignment === "right") return "text-center md:text-right";
        if (textAlignment === "center") return "text-center md:text-center";
        return "text-center md:text-left";
    };

    const baseClasses = isVerticalCenter
        ? `flex flex-col justify-center h-full ${getTextAlignment()}`
        : `flex flex-col justify-start ${getTextAlignment()}`;

    const cleanedClassName = className.replace('!justify-center', '').trim();

    return (
        <div className={`${baseClasses} ${cleanedClassName}`}>
            <div className="mb-4">
                <Title
                    title={titleTop}
                    fontSize="sm"
                    className="tracking-widest font-medium"
                    color="text-cb-default dark:text-cb-200"
                />
            </div>
            <div className="mb-6">
                <Title
                    title={titleCenter}
                    fontSize="3xl"
                    className="tracking-tight"
                    color="text-cb-default dark:text-cb-100"
                />
            </div>
            <div className="mb-7">
                <div className={`text-cb-500 dark:text-cb-300 text-2xl leading-relaxed ${getDescriptionAlignment()}`}>
                    {description.split('\n\n').map((paragraph, index) => (
                        <p key={index} className={index > 0 ? 'mt-4' : ''}>
                            {paragraph.trim()}
                        </p>
                    ))}
                </div>
            </div>

            {isImage && (
                <img
                    src={imageUrl}
                    alt="Campaign image"
                    className="w-full h-auto"
                />
            )}
        </div>
    );
}
