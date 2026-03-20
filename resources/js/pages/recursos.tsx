import { useState, useEffect } from 'react';
import { Link } from '@inertiajs/react';
import BannerWithBackground from '@/components/ui/banner/BannerWithBackground';
import ContainerSingle from '@/components/ui/container/ContainerSingle';
import ContainerTodo from '@/components/ui/container/ContainerTodo';
import AppLayout from '@/layouts/AppLayout';
import { useLocale } from '@/lib/i18n';
import { IoFolderOpenOutline, IoChevronForward, IoHome, IoSearch } from 'react-icons/io5';
import { FaFilePdf, FaFileWord, FaFileExcel, FaFilePowerpoint, FaFileImage, FaFileVideo, FaFileAudio, FaFileAlt, FaFolder } from 'react-icons/fa';
import { RiDownloadLine } from 'react-icons/ri';
import PasswordGate from '@/components/recursos/PasswordGate';

interface Category {
    id: string;
    name: string;
    description?: string;
    files?: any[];
    Files?: any[]; // Laravel may serialize as capitalized
    children?: Category[];
    Children?: Category[]; // Laravel may serialize as capitalized
    _count?: { files: number };
    files_count?: number;
    total_files_count?: number;
}

interface RecursosPageProps {
    categories: Category[];
    isAuthenticated?: boolean;
}

export default function RecursosPage({ categories, isAuthenticated: serverAuth }: RecursosPageProps) {
    const locale = useLocale();
    const [currentCategoryId, setCurrentCategoryId] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [breadcrumbs, setBreadcrumbs] = useState<{ id: string | null; name: string }[]>([]);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);

    // Check authentication on mount
    useEffect(() => {
        const checkAuth = () => {
            // Check if authenticated from server
            if (serverAuth) {
                setIsAuthenticated(true);
                setIsCheckingAuth(false);
                return;
            }

            // Check sessionStorage
            const sessionAuth = sessionStorage.getItem('recursos_authenticated');
            if (sessionAuth === 'true') {
                setIsAuthenticated(true);
            }
            setIsCheckingAuth(false);
        };

        checkAuth();
    }, [serverAuth]);

    const handleAuthenticated = () => {
        setIsAuthenticated(true);
    };

    const getCategoryIcon = (name: string) => {
        const lowerName = name.toLowerCase();
        if (lowerName.includes('documento') || lowerName.includes('pdf')) return FaFilePdf;
        if (lowerName.includes('imagen') || lowerName.includes('foto')) return FaFileImage;
        if (lowerName.includes('video')) return FaFileVideo;
        if (lowerName.includes('audio')) return FaFileAudio;
        return FaFolder;
    };

    const getFileIcon = (fileName: string) => {
        const ext = fileName.split('.').pop()?.toLowerCase();
        switch (ext) {
            case 'pdf': return FaFilePdf;
            case 'doc':
            case 'docx': return FaFileWord;
            case 'xls':
            case 'xlsx': return FaFileExcel;
            case 'ppt':
            case 'pptx': return FaFilePowerpoint;
            case 'jpg':
            case 'jpeg':
            case 'png':
            case 'gif': return FaFileImage;
            case 'mp4':
            case 'avi':
            case 'mov': return FaFileVideo;
            case 'mp3':
            case 'wav': return FaFileAudio;
            default: return FaFileAlt;
        }
    };

    const findCategoryById = (cats: Category[], id: string): Category | null => {
        for (const cat of cats) {
            if (cat.id === id || cat.id.toString() === id) return cat;
            const childList = cat.Children || cat.children;
            if (childList) {
                const found = findCategoryById(childList, id);
                if (found) return found;
            }
        }
        return null;
    };

    const buildBreadcrumbs = (cats: Category[], targetId: string, path: { id: string | null; name: string }[] = []): { id: string | null; name: string }[] | null => {
        for (const cat of cats) {
            if (cat.id === targetId) {
                return [...path, { id: cat.id, name: cat.name }];
            }
            const childList = cat.Children || cat.children;
            if (childList) {
                const result = buildBreadcrumbs(childList, targetId, [...path, { id: cat.id, name: cat.name }]);
                if (result) return result;
            }
        }
        return null;
    };

    useEffect(() => {
        if (currentCategoryId) {
            const crumbs = buildBreadcrumbs(categories, currentCategoryId);
            setBreadcrumbs(crumbs || []);
        } else {
            setBreadcrumbs([]);
        }
    }, [currentCategoryId, categories]);

    const getCurrentCategories = (): Category[] => {
        if (!currentCategoryId) return categories;
        const current = findCategoryById(categories, currentCategoryId);
        // Handle both 'children' and 'Children' keys
        return (current as any)?.Children || current?.children || [];
    };

    const getCurrentFiles = () => {
        if (!currentCategoryId) return [];
        const current = findCategoryById(categories, currentCategoryId);
        // Handle both 'files' and 'Files' keys (Laravel serialization)
        return (current as any)?.Files || current?.files || [];
    };

    const currentCategories = getCurrentCategories();
    const currentFiles = getCurrentFiles();

    const filteredCategories = searchTerm
        ? currentCategories.filter(cat => cat.name.toLowerCase().includes(searchTerm.toLowerCase()))
        : currentCategories;

    const filteredFiles = searchTerm
        ? currentFiles.filter((file: any) => file.name?.toLowerCase().includes(searchTerm.toLowerCase()) || file.originalName?.toLowerCase().includes(searchTerm.toLowerCase()))
        : currentFiles;

    const getTotalResourceCount = (category: Category): number => {
        if (category.total_files_count !== undefined) {
            return category.total_files_count;
        }
        const directCount = category._count?.files || category.files_count || category.files?.length || (category as any).Files?.length || 0;
        const childList = category.Children || category.children;
        const subcategoryCount = childList?.reduce((total, sub) => total + getTotalResourceCount(sub), 0) || 0;
        return directCount + subcategoryCount;
    };

    // Show password gate if not authenticated
    if (!isCheckingAuth && !isAuthenticated) {
        return (
            <AppLayout
                title="Recursos - Acceso Protegido"
                description="Accede a recursos institucionales, archivos descargables y material informativo de Alianza Para el Progreso."
                image="/imgs/fondo/fondo-prensa.webp"
                keywords={['recursos', 'descargas', 'APP', 'archivos']}
            >
                <BannerWithBackground src="/imgs/fondo/fondo-prensa.webp" title="RECURSOS" />
                <ContainerSingle>
                    <ContainerTodo>
                        <PasswordGate onAuthenticated={handleAuthenticated} />
                    </ContainerTodo>
                </ContainerSingle>
            </AppLayout>
        );
    }

    return (
        <AppLayout
            title="Recursos"
            description="Accede a recursos institucionales, archivos descargables y material informativo de Alianza Para el Progreso."
            image="/imgs/fondo/fondo-prensa.webp"
            keywords={['recursos', 'descargas', 'APP', 'archivos']}
        >
            <BannerWithBackground src="/imgs/fondo/fondo-prensa.webp" title="RECURSOS" />
            
            <ContainerSingle>
                <ContainerTodo>
                    <div className="space-y-8">
                        {/* Search Bar */}
                        <div className="flex gap-4">
                            <div className="relative flex-1">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    placeholder="Buscar recursos..."
                                    className="w-full px-4 py-3 pl-12 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-cb-600 dark:bg-gray-800 dark:text-white"
                                />
                                <IoSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
                            </div>
                        </div>

                        {/* Breadcrumbs */}
                        {breadcrumbs.length > 0 && (
                            <nav className="flex items-center space-x-2 text-sm">
                                <button
                                    onClick={() => setCurrentCategoryId(null)}
                                    className="flex items-center text-cb-600 hover:text-cb-700 dark:text-cb-400 dark:hover:text-cb-300"
                                >
                                    <IoHome className="text-lg" />
                                </button>
                                {breadcrumbs.map((crumb, index) => (
                                    <div key={crumb.id} className="flex items-center space-x-2">
                                        <IoChevronForward className="text-gray-400" />
                                        {index === breadcrumbs.length - 1 ? (
                                            <span className="text-gray-900 dark:text-white font-medium">{crumb.name}</span>
                                        ) : (
                                            <button
                                                onClick={() => setCurrentCategoryId(crumb.id)}
                                                className="text-cb-600 hover:text-cb-700 dark:text-cb-400 dark:hover:text-cb-300"
                                            >
                                                {crumb.name}
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </nav>
                        )}

                        {/* Categories Grid */}
                        {filteredCategories.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredCategories.map((category) => {
                                    const IconComponent = getCategoryIcon(category.name);
                                    const resourceCount = getTotalResourceCount(category);

                                    return (
                                        <button
                                            key={category.id}
                                            onClick={() => {
                                                console.log('Clicking category:', category.id, category.name);
                                                console.log('Category data:', category);
                                                setCurrentCategoryId(category.id);
                                            }}
                                            className="bg-white dark:bg-cb-900 hover:bg-cb-50 dark:hover:bg-gray-700 border border-cb-600 dark:border-gray-600 shadow-md hover:shadow-lg p-8 flex flex-col items-center text-center transition-all duration-300 transform hover:scale-105"
                                        >
                                            <div className="text-cb-600 dark:text-cb-400 p-4 rounded-2xl">
                                                <IconComponent className="text-7xl" />
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 leading-tight">
                                                {category.name}
                                            </h3>
                                            <p className="text-gray-600 dark:text-gray-300 text-sm">
                                                {category.description || `${resourceCount} recurso${resourceCount !== 1 ? 's' : ''}`}
                                            </p>
                                        </button>
                                    );
                                })}
                            </div>
                        )}

                        {/* Files Grid */}
                        {filteredFiles.length > 0 && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                {filteredFiles.map((file: any) => {
                                    const IconComponent = getFileIcon(file.originalName || file.name);

                                    return (
                                        <div
                                            key={file.id}
                                            className="bg-white dark:bg-cb-900 border border-cb-600 dark:border-gray-600 shadow-md hover:shadow-lg p-6 flex flex-col items-center justify-center transition-all duration-200"
                                        >
                                            <div className="text-7xl mb-4">
                                                <IconComponent className="text-cr-600" />
                                            </div>
                                            <h3 className="text-md font-medium text-gray-900 dark:text-white text-center mb-4 line-clamp-2">
                                                {file.originalName || file.name}
                                            </h3>
                                            <Link
                                                href={`/${locale}/descarga/${file.fileName || file.id}`}
                                                className="inline-flex items-center justify-center w-full px-4 py-2 bg-cb-600 hover:bg-cb-700 text-white transition-colors duration-200 text-sm font-medium"
                                            >
                                                <RiDownloadLine className="mr-2" />
                                                Descargar
                                            </Link>
                                        </div>
                                    );
                                })}
                            </div>
                        )}

                        {/* Empty State */}
                        {filteredCategories.length === 0 && filteredFiles.length === 0 && (
                            <div className="text-center py-12">
                                <div className="text-6xl mb-4 text-gray-400 flex justify-center">
                                    <IoFolderOpenOutline />
                                </div>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                                    {searchTerm ? 'No se encontraron resultados' : 'No hay recursos disponibles'}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {searchTerm ? 'Intenta con otros términos de búsqueda' : 'Vuelve pronto para ver nuevos recursos'}
                                </p>
                            </div>
                        )}
                    </div>
                </ContainerTodo>
            </ContainerSingle>
        </AppLayout>
    );
}
