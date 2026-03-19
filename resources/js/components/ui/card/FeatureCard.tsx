import { Link } from '@inertiajs/react';

interface FeatureCardProps {
    href?: string;
    title?: string;
    description?: string;
}

export default function FeatureCard({
    href = "",
    title = "",
    description = "",
}: FeatureCardProps) {
    return (
        <div>
            <Link 
                href={href} 
                className="text-2xl font-semibold text-cb-default dark:text-cb-100 mb-2 hover:text-cr-600 dark:hover:text-cr-600 duration-300 transition-colors"
            >
                {title}
            </Link>
            <p className="text-cb-default dark:text-cb-200">{description}</p>
        </div>
    );
}
