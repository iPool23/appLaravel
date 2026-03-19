import type { PersonCard } from '@/data/congressman';

export default function PeopleGrid({ people }: { people: PersonCard[] }) {
    return (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {people.map((person) => (
                <article key={person.centerText} className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900">
                    <img src={person.src} alt={person.centerText} className="h-80 w-full object-cover" />
                    <div className="p-5 text-center">
                        <h3 className="text-lg font-black uppercase text-gray-900 dark:text-white">{person.centerText}</h3>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">{person.bottomText}</p>
                    </div>
                </article>
            ))}
        </div>
    );
}
