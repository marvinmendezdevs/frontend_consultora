import { getAllSchools } from "@/services/school.services";
import type { SchoolInfo } from "@/types/schoolmanagement.type";
import { useQuery } from "@tanstack/react-query"
import SchoolCardComponent from "./SchoolCardComponent";
import { usePagination } from "@/hooks/usePagination";
import { cleanSearchTerm } from "@/utils/index.utils";


function FacilitatorSchoolList() {
    const { isLoading, isError, data: schools } = useQuery<SchoolInfo[]>({
        queryKey: ["allSchools"],
        queryFn: getAllSchools,
        retry: false,
    });

    const schoolFiltered = (school: SchoolInfo, searchTerm: string) => {
        return school.code.includes(searchTerm) || cleanSearchTerm(school.name).includes(cleanSearchTerm(searchTerm))
    }

    const {
        handleSetSearchTerm,
        totalPage,
        itemsPage: schoolsPage,
        setPage,
        page
    } = usePagination<SchoolInfo>({
        data: schools ?? [],
        perPage: 5,
        fn: schoolFiltered
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
    return (
        <>
            <input
                className="p-2 border border-gray-300 block mb-3 outline-0 w-full md:ms-auto"
                type="search"
                placeholder="Digita el código o nombre del centro escolar"
                onChange={handleSetSearchTerm}
            />

            <div className="space-y-2">
                {schoolsPage.map(school => (
                    <SchoolCardComponent
                        key={school.code}
                        school={school}
                    />
                ))}
                <div className="flex justify-between">
                    {schoolsPage.length !== 0 && page > 1 ? (
                        <button onClick={() => setPage(page - 1)} className="inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-200 shadow-sm px-4 py-2.5 text-sm rounded-xl gap-2 cursor-pointer">anterior</button>
                    ) : (
                        <button className="inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-200 shadow-sm px-4 py-2.5 text-sm rounded-xl gap-2 cursor-not-allowed ">anterior</button>
                    )}
                    {schoolsPage.length !== 0 && page < totalPage ? (
                        <button onClick={() => setPage(page + 1)} className="inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-200 shadow-sm px-4 py-2.5 text-sm rounded-xl gap-2 cursor-pointer">siguiente</button>
                    ) : (
                        <button className="inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] bg-white text-slate-700 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 focus:ring-slate-200 shadow-sm px-4 py-2.5 text-sm rounded-xl gap-2 cursor-not-allowed">siguiente</button>
                    )}
                </div>
            </div>
        </>
    )
}

export default FacilitatorSchoolList