export interface Militant {
    id: number;
    image?: string;
    srcImage?: string;
    region: string;
    title: string;
    titleSegment?: string;
    slug?: string;
    charge: string;
    phone: string;
    local: string;
    html?: string;
    schedule: {
        mondayFriday: string;
        saturday: string;
        sunday: string;
    };
}
