import { Grid, GridItem } from "@/components";
import CustomBlogCard from "@/components/ui/card/CustomBlogCard";


interface ContentSectionProps {
    imageSrc: string;
    imageAlt: string;
    description: string;
    imagePosition?: "left" | "right";
    className?: string;
    imgAreaPosition?: "left" | "right" | "center";
}

export default function ContentSection({
    imageSrc,
    imageAlt,
    description,
    imagePosition = "left",
    className = "",
    imgAreaPosition = "left"
}: ContentSectionProps) {
    const alignmentClasses = {
        left: "justify-start",
        right: "justify-end",
        center: "justify-center",
    };

    const imageComponent = (
        <GridItem colSpan={6} className={`flex ${alignmentClasses[imgAreaPosition]} motion-translate-y-in-25 motion-duration-[2s] motion-ease-spring-smooth`}>
            <img
                src={imageSrc}
                alt={imageAlt}
                width={760}
                height={579}
                className="rounded-2xl object-cover w-full h-auto max-w-[760px]"
            />
        </GridItem>
    );

    const textComponent = (
        <GridItem colSpan={6}>
            <CustomBlogCard
                className={`!justify-center motion-duration-1000 ${imagePosition === "right" ? "sm:pr-4 pr-0 motion-preset-slide-right" : "sm:pl-4 pl-0 motion-preset-slide-left"}`}
                description={description}
                isImage={false}
                textAlignment={imagePosition === "right" ? "right" : "left"}
            />
        </GridItem>
    );

    return (
        <Grid className={className}>
            {imagePosition === "left" ? (
                <>
                    {imageComponent}
                    {textComponent}
                </>
            ) : (
                <>
                    {textComponent}
                    {imageComponent}
                </>
            )}
        </Grid>
    );
}

