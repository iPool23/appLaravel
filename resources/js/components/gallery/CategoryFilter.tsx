"use client";

interface CategoryFilterProps {
    categories: string[];
    onCategoryChange: (category: string | null) => void;
    activeCategory: string | null;
    totalImages: number;
}

export default function CategoryFilter({ categories, onCategoryChange, activeCategory, totalImages }: CategoryFilterProps) {
    const categoryLabels: Record<string, string> = {
        'eventos': 'Eventos',
        'actividades': 'Actividades',
        'historia': 'Historia',
        'directiva': 'Directiva',
        'oficial': 'Oficial',
        'simbolos': 'Símbolos',
        'general': 'General'
    };

    return (
        <div className="flex flex-wrap justify-center gap-3 mb-8 p-4 rounded-xl">
            <button
                onClick={() => onCategoryChange(null)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    activeCategory === null
                        ? 'bg-cb-600 text-white shadow-md'
                        : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-cb-100 dark:hover:bg-cb-900/50'
                }`}
            >
                Todas ({totalImages})
            </button>
            
            {categories.map((category) => (
                <button
                    key={category}
                    onClick={() => onCategoryChange(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                        activeCategory === category
                            ? 'bg-cb-600 text-white shadow-md'
                            : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-cb-100 dark:hover:bg-cb-900/50'
                    }`}
                >
                    {categoryLabels[category] || category}
                </button>
            ))}
        </div>
    );
}
