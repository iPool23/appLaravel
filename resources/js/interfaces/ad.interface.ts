export interface Ad {
    id: number;
    title: string;
    number?: string;
    text?: string;
    description?: string;
    summary?: string;
    buttonTitle?: string;
    buttonLink?: string;
    imageUrl?: string;
    image_url?: string;
    src?: string;
    publishedAt?: string;
    published_at?: string;
    slug?: string;
    priority?: number;
    startDate?: string;
    endDate?: string;
    active?: boolean;
    order?: number;
}
