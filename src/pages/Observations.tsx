import ObservationList from "@/components/pages/ObservationList";
import { getTeachersByTutors } from "@/services/tutorship.services";
import type { TeacherTutorType } from "@/types/tutorship.types";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Link, Navigate } from "react-router";
import { useParams } from "react-router"

function Observations() {
    const [addNewObservation, setAddNewObservation] = useState(false);
    const { teacherDui } = useParams();

    const { data, isLoading, isError } = useQuery<TeacherTutorType>({
        queryKey: ['teachers-by-tutor', teacherDui],
        queryFn: () => {
            if (!teacherDui) {
                throw Error('Error: faltan datos');
            }

            return getTeachersByTutors(teacherDui)
        },
        retry: false,
        refetchOnWindowFocus: false,
    });

    if (isLoading) return (
        <p className="text-xs text-slate-800 flex justify-center items-center gap-1 p-3">
            <span className="h-5 w-5 block rounded-full border-2 border-gray-300 border-t-indigo-600 animate-spin"></span>
            Cargando lista de docentes asignados...
        </p>
    );

    if (isError) return (
        <p className="text-xs text-red-600 text-center p-3">
            ¡Error inespertado! contacte con soporte.
        </p>
    );

    if (!teacherDui) {
        return <Navigate to="/tutoria" replace />
    }

    if (data) return (
        <div>
            <h2 className="text-lg font-black text-indigo-600">Observaciones de clases</h2>

            <p className="font-bold mt-2">Información del docente</p>
            <div className="flex justify-between items-center">
                <div>
                    <p className="font-semibold">{data.name}</p>
                    <p className="text-sm text-gray-600">{data.email}</p>
                </div>
                <button className="bg-indigo-600 text-sm text-white py-1 px-2 rounded-lg cursor-pointer hover:bg-indigo-700" onClick={ () => setAddNewObservation(!addNewObservation) }>
                    { !addNewObservation ? 'Nueva' : 'Cerrar' }
                </button>
            </div>

            <div className="overflow-x-auto">
                {addNewObservation && (
                    <table className="w-full mt-3">
                        <thead className="bg-gray-100 border-b-2">
                            <tr>
                                <th className="p-2">Código</th>
                                <th className="p-2">Centro escolar</th>
                                <th className="p-2">Clase</th>
                                <th className="p-2">Turno</th>
                                <th className="p-2"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {data.assignments.map(assignament => (
                                <tr key={assignament.id}>
                                    <td className="p-2">{assignament.section.school.code}</td>
                                    <td className="p-2">{assignament.section.school.name}</td>
                                    <td className="p-2">{assignament.section.grade}o. {assignament.section.track === 'none' ? '' : assignament.section.track} {assignament.section.subtrack === 'none' ? '' : assignament.section.subtrack} "{assignament.section.sectionClass}" - {assignament.subject}</td>
                                    <td className="p-2">{assignament.section.shift}</td>
                                    <td className="p-2">
                                        <Link className="bg-indigo-600 text-xs py-0.5 px-1 rounded text-white hover:bg-indigo-700" to={`/observaciones/${data.id}/${assignament.id}`}>
                                            Agregar
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>

            <ObservationList
                teacherDui={ teacherDui }
            />
        </div>
    )
}

export default Observations