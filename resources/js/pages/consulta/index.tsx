import React, { useState, useMemo } from 'react';
import AppLayout from '@/layouts/AppLayout';
import ContainerSingle from '@/components/ui/container/ContainerSingle';
import ContainerTodo from '@/components/ui/container/ContainerTodo';
import AnimatedSectionTitle from '@/components/ui/AnimatedSectionTitle';
import BannerWithBackground from '@/components/ui/banner/BannerWithBackground';
import { Grid } from '@/components/ui/grid/Grid';
import { GridItem } from '@/components/ui/grid/GridItem';
import CandidateSearchForm from './components/CandidateSearchForm';
import ConsultGrid from './components/ConsultGrid';
import { Candidate } from '@/types/candidate';
import { ChevronLeft, ChevronRight, SearchX } from 'lucide-react';

interface Props {
    candidates: Candidate[];
    positions: { value: string; label: string }[];
    regions: { value: string; label: string }[];
}

const NoResultsMessage = () => (
    <div className="text-center py-20 bg-gray-50/50 dark:bg-cb-default/5 rounded-[2.5rem] border border-dashed border-gray-200 dark:border-cb-300/10 mt-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
        <div className="mb-6 flex justify-center">
            <div className="p-5 bg-white dark:bg-cb-full rounded-2xl shadow-sm text-gray-400 dark:text-cb-400">
                <SearchX size={48} strokeWidth={1.5} />
            </div>
        </div>
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
            No se encontraron resultados
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-sm max-w-xs mx-auto">
            Ajusta los filtros o intenta con términos más generales.
        </p>
    </div>
);

const Pagination = ({ currentPage, totalPages, onPageChange }: {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}) => {
    if (totalPages <= 1) return null;

    const getVisiblePages = () => {
        const delta = 1;
        const range = [];
        const rangeWithDots: (number | string)[] = [];

        for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
            range.push(i);
        }

        if (currentPage - delta > 2) {
            rangeWithDots.push(1, '...');
        } else {
            rangeWithDots.push(1);
        }

        rangeWithDots.push(...range);

        if (currentPage + delta < totalPages - 1) {
            rangeWithDots.push('...', totalPages);
        } else {
            rangeWithDots.push(totalPages);
        }

        return rangeWithDots;
    };

    return (
        <div className="flex justify-center items-center gap-2">
            <button
                onClick={() => onPageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="w-12 h-12 rounded-xl bg-white dark:bg-cb-full border border-gray-100 dark:border-cb-300/10 text-gray-500 dark:text-cb-400 hover:border-cb-default hover:text-cb-default transition-all disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center group"
            >
                <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
            </button>

            <div className="flex gap-1.5">
                {getVisiblePages().map((page, index) => (
                    <button
                        key={index}
                        onClick={() => typeof page === 'number' && onPageChange(page)}
                        disabled={typeof page !== 'number'}
                        className={`min-w-[48px] h-12 rounded-xl text-sm font-bold transition-all ${page === currentPage
                            ? 'bg-cb-default text-white shadow-xl shadow-cb-default/20 scale-110 z-10'
                            : typeof page === 'number'
                                ? 'bg-white dark:bg-cb-full border border-gray-100 dark:border-cb-300/10 text-gray-600 dark:text-gray-300 hover:border-gray-300 dark:hover:border-cb-300/30'
                                : 'bg-transparent text-gray-400 cursor-default px-1'
                            }`}
                    >
                        {page}
                    </button>
                ))}
            </div>

            <button
                onClick={() => onPageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="w-12 h-12 rounded-xl bg-white dark:bg-cb-full border border-gray-100 dark:border-cb-300/10 text-gray-500 dark:text-cb-400 hover:border-cb-default hover:text-cb-default transition-all disabled:opacity-20 disabled:cursor-not-allowed flex items-center justify-center group"
            >
                <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
            </button>
        </div>
    );
};

export default function ConsultaIndex({ candidates, positions, regions }: Props) {
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        name: '',
        position: '',
        region: '',
    });

    const ITEMS_PER_PAGE = 12; // Adjusted for better grid balance

    const filteredCandidates = useMemo(() => {
        return candidates.filter((c) => {
            const nameMatch =
                !filters.name ||
                c.nombre_completo?.toLowerCase().includes(filters.name.toLowerCase()) ||
                c.id_candidato.toString().includes(filters.name);

            const positionMatch = !filters.position || c.id_cargo.toString() === filters.position;
            const regionMatch = !filters.region || c.id_departamento?.toString() === filters.region;

            return nameMatch && positionMatch && regionMatch;
        });
    }, [candidates, filters]);

    const totalPages = Math.ceil(filteredCandidates.length / ITEMS_PER_PAGE);

    const paginatedCandidates = useMemo(() => {
        const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
        const endIndex = startIndex + ITEMS_PER_PAGE;
        return filteredCandidates.slice(startIndex, endIndex);
    }, [filteredCandidates, currentPage]);

    const updateFilter = (field: 'name' | 'position' | 'region', value: string) => {
        setFilters((prev) => ({ ...prev, [field]: value }));
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        window.scrollTo({ top: 400, behavior: 'smooth' });
    };

    return (
        <AppLayout title="Consulta de Candidatos" description="Busca y consulta los candidatos a las elecciones presidenciales 2026 de Alianza Para el Progreso.">
            <BannerWithBackground
                src="/imgs/consulta/elecciones-internas.webp"
                srcDark="/imgs/consulta/elecciones-internas.webp"
                title='Consulta de Candidatos'
            />
            
            <ContainerSingle className="bg-white dark:bg-cb-full pt-16 pb-32">
                <ContainerTodo>
                    <AnimatedSectionTitle
                        smallTitle="Consulta de Candidatos"
                        mainTitleSegments={[
                            { text: "Candidatos Elecciones", breakAfter: true },
                            { text: "Presidenciales 2026" }
                        ]}
                        className="mb-12"
                    />

                    <CandidateSearchForm
                        filters={filters}
                        updateFilter={updateFilter}
                        positions={positions}
                        regions={regions}
                    />

                    {filteredCandidates.length === 0 ? (
                        <NoResultsMessage />
                    ) : (
                        <div className="mt-16 space-y-16">
                            <div className="flex flex-col md:flex-row justify-between items-center gap-6 py-8 border-b border-gray-100 dark:border-cb-300/10">
                                <div className="space-y-1">
                                    <h2 className="text-3xl font-black uppercase tracking-tighter text-cb-default dark:text-white">
                                        Nuestros Candidatos
                                    </h2>
                                    <p className="text-xs font-bold uppercase tracking-widest text-cb-default/60 dark:text-cb-400">
                                        Encontrados: {filteredCandidates.length} personas
                                    </p>
                                </div>
                                <div className="px-5 py-2.5 bg-gray-50 dark:bg-cb-default/10 rounded-full border border-gray-100 dark:border-cb-300/10 text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-cb-400 shadow-sm">
                                    Página {currentPage} de {totalPages}
                                </div>
                            </div>

                            <div className="animate-in fade-in zoom-in-95 duration-700">
                                <ConsultGrid candidates={paginatedCandidates} />
                            </div>

                            <Pagination
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    )}
                </ContainerTodo>
            </ContainerSingle>
        </AppLayout>
    );
}
