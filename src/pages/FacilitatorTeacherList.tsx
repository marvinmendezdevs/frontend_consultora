import TeacherCardToAccess from "@/components/pages/TeacherCardToAccess";
import { getTeacherBySchool } from "@/services/school.services";
import type { TeacherTutorType } from "@/types/tutorship.types";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router"

function FacilitatorTeacherList() {
    const { schoolCode } = useParams();

    const { isLoading, isError, data: teachers } = useQuery<TeacherTutorType[]>({
        queryKey: ["teacherBySchool", schoolCode],
        queryFn: () => {

            if(!schoolCode){
                throw Error("No hay centro escolar");
            }

            return getTeacherBySchool(schoolCode);
        },
        retry: false,
    });

    if (isLoading) return (
        <p className="text-xs text-slate-800 flex justify-center items-center gap-1 p-3">
            <span className="h-5 w-5 block rounded-full border-2 border-gray-300 border-t-indigo-600 animate-spin"></span>
            Cargando lista de docentes...
        </p>
    )

    if (isError) return (
        <p className="text-xs text-red-600 text-center p-3">
            ¡Error inespertado! contacte con soporte.
        </p>
    );

    if (!teachers) return <p>No hay lista de docentes disponible. Contacte con soporte.</p>

    if (!schoolCode) {
        return <p>Centro escolar no inválido...</p>
    }

    return (
        <>
            <div className="flex justify-between items-center mb-5">
                <div>
                    <h2 className="text-xl font-bold">Lista de docentes del centro escolar</h2>
                    <p>Verifica si un docente ha accedido a la plataforma de enseñanza-aprendizaje</p>
                </div>

                <Link className="text-sm bg-indigo-100 text-indigo-600 p-2 rounded px-4" to="/facilitadores">
                    Regresar
                </Link>
            </div>

            <div className="space-y-2">
                {teachers.map(teacher => (
                    <TeacherCardToAccess
                        key={teacher.id}
                        teacher={ teacher }
                    />
                ))}
            </div>
        </>
    )
}

export default FacilitatorTeacherList