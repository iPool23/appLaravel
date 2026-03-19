export interface DirectiveMember {
    qr?: string;
    src: string;
    signature?: string;
    centerText: string;
    description?: string;
    bottomText: string;
    slug?: string;
    socialLinks?: { provider: string; href: string }[];
}
