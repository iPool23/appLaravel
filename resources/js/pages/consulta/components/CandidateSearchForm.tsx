import React from 'react';
import { User } from 'lucide-react';
import { MinimalDropdown } from '@/components/ui/dropdown/MinimalDropdown';
import { FormInputField } from '@/components/ui/form/FormInputField';
import ContainerTodo from '@/components/ui/container/ContainerTodo';

interface CandidateSearchFormProps {
    filters: {
        name: string;
        position: string;
        region: string;
    };
    updateFilter: (field: 'name' | 'position' | 'region', value: string) => void;
    positions: { value: string; label: string }[];
    regions: { value: string; label: string }[];
}

const CandidateSearchForm: React.FC<CandidateSearchFormProps> = ({
    filters,
    updateFilter,
    positions,
    regions
}) => {
    return (
        <ContainerTodo className='px-0! sm:px-0! lg:px-0!'>
            <div className="p-6 bg-white dark:bg-cb-full/50 rounded-3xl border border-gray-100 dark:border-cb-300/10 shadow-sm mb-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="space-y-3">
                        <label className="block text-sm font-black uppercase tracking-wider text-cb-default dark:text-cb-400">
                            Nombre del Candidato
                        </label>
                        <FormInputField 
                            id="name"
                            placeholder="Ingresa nombre o apellido..."
                            type="text"
                            icon={<User size={20} />}
                            value={filters.name}
                            onChange={(value: string) => updateFilter('name', value)}
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="block text-sm font-black uppercase tracking-wider text-cb-default dark:text-cb-400">
                            Cargo
                        </label>
                        <MinimalDropdown
                            options={positions}
                            value={filters.position}
                            onChange={(value: string) => updateFilter('position', value)}
                            placeholder="Seleccionar cargo"
                        />
                    </div>

                    <div className="space-y-3">
                        <label className="block text-sm font-black uppercase tracking-wider text-cb-default dark:text-cb-400">
                            Región/Departamento
                        </label>
                        <MinimalDropdown
                            options={regions}
                            value={filters.region}
                            onChange={(value: string) => updateFilter('region', value)}
                            placeholder="Seleccionar región"
                        />
                    </div>
                </div>
            </div>
        </ContainerTodo>
    );
};

export default CandidateSearchForm;
