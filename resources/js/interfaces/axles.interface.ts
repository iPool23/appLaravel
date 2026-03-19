export interface Eje {
    id: string;
    slug: string;
    icon?: React.ComponentType<React.SVGProps<SVGSVGElement>> | any;
    category: string;
    imageUrl: string;
    order: number;
    title: string;
    shortDescription: string;
    fullContent: string;
}
