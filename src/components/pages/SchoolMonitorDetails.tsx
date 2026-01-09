import { getSchoolByMonitor } from "@/services/schoolmanagement.services";
import type { SchoolByMonitorType } from "@/types/schoolmanagement.type";
import { useQuery } from "@tanstack/react-query";
import { Cog, MapPin, Phone, School, User } from "lucide-react";
import { Link } from "react-router";

type SchoolMonitorDetailsType = {
    active: number | string; // ⚠️ Ojo: Asegúrate que coincida con tu DB (Suele ser string los schoolCode)
}

function SchoolMonitorDetails({ active }: SchoolMonitorDetailsType) {

    // 1. Usamos el hook para mantener la reactividad
    const { data: schoolDetails, isLoading, isError } = useQuery({
        queryKey: ["school-by-monitor"],
        queryFn: getSchoolByMonitor,
        select: (data: SchoolByMonitorType[]) =>
            data?.find((school) => school.schoolCode === active),
    });

    if (isLoading) {
        return <div className="p-3 text-center text-xs">Cargando datos...</div>;
    }

    if (isError || !schoolDetails) {
        return (
            <p className="text-xs text-red-600 text-center p-3">
                ¡Vaya! No hay información sobre este centro escolar (ID: {active}). Contacte con soporte.
            </p>
        );
    }

    return (
        <div className="mt-2 flex flex-col">
            <h3 className="font-bold text-gray-800 text-lg flex items-center gap-2">
                <School className="size-10" />
                {schoolDetails.school.name}
            </h3>

            <div className="flex items-center gap-1 text-xs my-2">
                <div className="bg-amber-100 p-0.5 px-2 rounded border border-amber-200">
                    Bloque {schoolDetails.school.block}
                </div>
                <div className="bg-blue-100 p-0.5 px-2 rounded border border-blue-200">
                    Fase {schoolDetails.school.phase}
                </div>
            </div>

            <p className="text-sm flex items-center gap-1">
                <MapPin className="size-6" />
                {schoolDetails.school.address}
            </p>

            <div className="text-sm mt-3">
                <p className="flex items-center gap-1">
                    <User className="size-4" />
                    <span className="font-bold">Nombre del director</span>
                </p>
                <p>{schoolDetails.school.directorName}</p>
            </div>
            
            <div className="text-sm mt-3">
                <p className="flex items-center gap-1">
                    <Phone className="size-4" />
                    <span className="font-bold">Tel. del director</span>
                </p>
                <p>{schoolDetails.school.directorPhone}</p>
            </div>

            <p className="mt-3 font-bold border-t border-gray-300 border-dashed pt-3">
                Datos del escolar escolar
            </p>

            <div className="space-y-2 mt-3">
                {/* <Link className="text-xs flex items-center bg-gray-100 p-2 justify-center border border-gray-300 gap-2 hover:bg-gray-300" to={`/schools/${schoolDetails.schoolCode}/update`}>
                    <Edit className="size-4" />
                    Actualización
                </Link> */}

                <Link className="text-xs flex items-center bg-gray-100 p-2 justify-center border border-gray-300 gap-2 hover:bg-gray-300" to={`/monitores/formulario/${schoolDetails.schoolCode}/optimizacion`}>
                    <Cog className="size-4" />
                    Optimización
                </Link>

                {/* <Link className="text-xs flex items-center bg-gray-100 p-2 justify-center border border-gray-300 gap-2 hover:bg-gray-300" to={`/schools/${schoolDetails.schoolCode}/remediation`}>
                <ListChecks className="size-4" />
                    Remedicación y refuerzo
                </Link>  */}
            </div>

        </div>
    );
}

export default SchoolMonitorDetails;