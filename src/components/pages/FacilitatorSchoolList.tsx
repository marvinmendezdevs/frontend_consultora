import { getAllSchools } from "@/services/school.services";
import type { SchoolInfo } from "@/types/schoolmanagement.type";
import { useQuery } from "@tanstack/react-query"
import SchoolCardComponent from "./SchoolCardComponent";
import { useState } from "react";
import { cleanSearchTerm } from "@/utils/index.utils"


function FacilitatorSchoolList() {
    const [searchTerm, setSearchTerm] = useState("");

    const { isLoading, isError, data: schools } = useQuery<SchoolInfo[]>({
        queryKey: ["allSchools"],
        queryFn: getAllSchools,
        retry: false,
    });

    if (isLoading) return (
        <p className="text-xs text-slate-800 flex justify-center items-center gap-1 p-3">
            <span className="h-5 w-5 block rounded-full border-2 border-gray-300 border-t-indigo-600 animate-spin"></span>
            Cargando centros escolares...
        </p>
    )

    if (isError) return (
        <p className="text-xs text-red-600 text-center p-3">
            ¡Error inespertado! contacte con soporte.
        </p>
    );

    if (!schools) return <p>No hay lista de centro escolares disponible. Contacte con soporte.</p>

    // Filtro de escuelas
    const schoolFiltered = schools.filter(school => school.code.includes(searchTerm) || cleanSearchTerm(school.name).includes(cleanSearchTerm(searchTerm)));

    return (
        <>
            <input
                className="p-2 border border-gray-300 block mb-3 outline-0 w-full md:ms-auto"
                type="search"
                placeholder="Digita el código o nombre del centro escolar"
                onChange={ e => setSearchTerm(e.target.value) }
            />

            <div className="space-y-2">
                {schoolFiltered.map(school => (
                    <SchoolCardComponent
                        key={school.code}
                        school={ school }
                    />
                ))}
            </div>
        </>
    )
}

export default FacilitatorSchoolList