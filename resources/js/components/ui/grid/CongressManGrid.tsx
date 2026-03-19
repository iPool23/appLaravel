import CongressmanCard from '@/components/ui/card/CongressmanCard';
import type { PersonCard } from '@/data/congressman';

interface CongressmanGridProps {
    congressmen: PersonCard[];
}

export default function CongressmanGrid({ congressmen }: CongressmanGridProps) {
    return (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {congressmen.map((person) => (
                <CongressmanCard
                    key={person.centerText}
                    src={person.src}
                    name={person.centerText}
                    region={person.bottomText}
                    socialLinks={person.socialLinks}
                />
            ))}
        </div>
    );
}
