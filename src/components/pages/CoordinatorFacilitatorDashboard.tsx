import { getFacilitatorDashboard } from "@/services/schoolmanagement.services";
import type { DashboardFacilitatorType } from "@/types/schoolmanagement.type";
import { useQuery } from "@tanstack/react-query"
import { GraduationCap, NotebookText } from "lucide-react";

function CoordinatorFacilitatorDashboard() {

  const { isLoading, isError, data } = useQuery<DashboardFacilitatorType>({
    queryKey: ["facilitator-dashboard"],
    queryFn: getFacilitatorDashboard,
    retry: false,
  });

  if (isLoading) return (
    <p className="text-xs text-slate-800 flex justify-center items-center gap-1 p-3">
      <span className="h-5 w-5 block rounded-full border-2 border-gray-300 border-t-indigo-600 animate-spin"></span>
      Cargando información...
    </p>
  )

  if (isError || !data) return (
    <p className="text-xs text-red-600 text-center p-3">
      ¡Error inespertado! contacte con soporte.
    </p>
  );

  const calculatePercentage = (total: number, access: number) => {
    return ((access/total)*100).toFixed(2);
  }

  return (
    <>
      <h2 className="text-2xl font-black text-indigo-600">Verificación de accesos</h2>
      <p className="mb-5">
        Seguimiento de docentes, secciones y progreso de facilitadores
      </p>

      <h2 className="text-xl font-bold">Resumen general de accesos</h2>

      <div className="my-3 grid gap-4 md:grid-cols-2">
        <div className="p-3 rounded-lg bg-gray-100 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="bg-indigo-200 p-3 text-indigo-600 rounded-lg">
                <GraduationCap size={30} />
              </div>
              <div>
                <p className="uppercase text-xs text-slate-600">Docentes registrados</p>
                <p className="text-xl font-bold">{data.totalTeacherAccess}/{data.totalTeacher} con acceso</p>
              </div>
            </div>

            <div className="mt-3">
              <div className="h-3 bg-gray-300 rounded-lg overflow-hidden">
                <div className="h-3 bg-indigo-600 rounded-lg" style={{ width: `${calculatePercentage(data.totalTeacher, data.totalTeacherAccess)}%` }}></div>
              </div>
              <p className="text-sm mt-1 text-slate-600">
                {calculatePercentage(data.totalTeacher, data.totalTeacherAccess)}% verificados {" "}
                ({data.totalTeacher - data.totalTeacherAccess} pendientes)
              </p>
            </div>
        </div>
        
        <div className="p-3 rounded-lg bg-gray-100 shadow-inner">
            <div className="flex items-center gap-3">
              <div className="bg-green-200 p-3 text-green-600 rounded-lg">
                <NotebookText size={30} />
              </div>
              <div>
                <p className="uppercase text-xs text-slate-600">Secciones registradas</p>
                <p className="text-xl font-bold">{data.totalTeacherSectionsAccess}/{data.totalTeacherSections} con acceso</p>
              </div>
            </div>

            <div className="mt-3">
              <div className="h-3 bg-gray-300 rounded-lg">
                <div className="h-3 bg-green-600 rounded-lg" style={{ width: `${calculatePercentage(data.totalTeacherSections, data.totalTeacherSectionsAccess)}%` }}></div>
              </div>
              <p className="text-sm mt-1 text-slate-600">
                {calculatePercentage(data.totalTeacherSections, data.totalTeacherSectionsAccess)}% verificados {" "}
                ({data.totalTeacherSections - data.totalTeacherSectionsAccess} pendientes)
              </p>
            </div>
        </div>
      </div>

      <h2 className="text-xl font-bold">Progreso de facilitadores</h2>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-200 border-b-2">
            <tr>
              <th className="p-2">Nombre</th>
              <th className="p-2 max-w-14">Secciones</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200">
            {data.sectionPerFacilitator.map(facilitator => (
              <tr key={facilitator.id}>
                <td className="p-2">
                  {facilitator.name}
                </td>
                <td className="text-center p-2">
                  {facilitator._count.teacherSectionAccess}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default CoordinatorFacilitatorDashboard