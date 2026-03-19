import { categoryEmail } from '@/data/categoryEmail';

export const getCategoryTitle = (categoryId: string): string => {
    const category = categoryEmail.find(cat => cat.id === categoryId);
    return category ? category.title : categoryId;
};
