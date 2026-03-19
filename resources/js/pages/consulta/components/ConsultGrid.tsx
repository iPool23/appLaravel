import React from "react";
import RoundedImageCardLink from "@/components/ui/card/RoundedImageCardLink";
import { Candidate } from "@/types/candidate";
import { useLocale } from "@/lib/i18n";

interface ConsultGridProps {
    candidates?: Candidate[];
}

const ConsultGrid: React.FC<ConsultGridProps> = ({ candidates = [] }) => {
    const locale = useLocale();

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
            {candidates.map((candidate) => (
                <div key={candidate.id_candidato_anio} className="flex flex-col">
                    <RoundedImageCardLink
                        src={candidate.foto_url || '/imgs/consulta/logoA.jpg'}
                        link={`/${locale}/consulta/${candidate.id_candidato_anio}`}
                        centerText={candidate.nombre_completo || `Candidato ${candidate.id_candidato}`}
                        bottomText={`${candidate.nombre_cargo || `Cargo ${candidate.id_cargo}`}${candidate.nombre_departamento ? ` - ${candidate.nombre_departamento}` : ''}`}
                        socialLinks={[]}
                        slug={candidate.id_candidato_anio.toString()}
                    />
                </div>
            ))}
        </div>
    );
};

export default ConsultGrid;
