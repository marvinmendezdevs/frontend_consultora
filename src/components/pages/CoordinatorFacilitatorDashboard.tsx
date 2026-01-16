import { usePagination } from "@/hooks/usePagination";
import { getFacilitatorDashboard } from "@/services/schoolmanagement.services";
import type { DashboardFacilitatorType } from "@/types/schoolmanagement.type";
import { useQuery } from "@tanstack/react-query"
import { GraduationCap, NotebookText } from "lucide-react";
import Pagination from "../ui/Pagination";
import { cleanSearchTerm, formatDate, getHours } from "@/utils/index.utils";

type sectionPerFacilitatorType = {
  id: number;
  name: string;
  email: string;
  username: string;
  telephone: string;
  dui: string;
  roleId: number;
  createdAt: string;
  verified: boolean;
  lastLogin?: string;
  _count: {
    teacherSectionAccess: number;
  };
}

function CoordinatorFacilitatorDashboard() {

  const { isLoading, isError, data } = useQuery<DashboardFacilitatorType>({
    queryKey: ["facilitator-dashboard"],
    queryFn: getFacilitatorDashboard,
    retry: false,
  });

  const sectionPerFacilitator = data?.sectionPerFacilitator ?? [];

  const filterByName = (facilitator: sectionPerFacilitatorType, searchTerm: string) => {
    return cleanSearchTerm(facilitator.name).includes(cleanSearchTerm(searchTerm))
  }

  const {
    handleSetSearchTerm,
    totalPage,
    itemsPage,
    setPage,
    page
  } = usePagination<sectionPerFacilitatorType>({
    data: sectionPerFacilitator,
    perPage: 5,
    fn: filterByName,
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
    if (total === 0) return "0.00";
    return ((access / total) * 100).toFixed(2);
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

      <div className="mt-5">
        <input
          className="p-2 border border-gray-300 block mb-3 outline-0 w-full md:ms-auto"
          type="search"
          placeholder="Digita el código o nombre del centro escolar"
          onChange={handleSetSearchTerm}
        />
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200 border-b-2">
              <tr>
                <th className="p-2">Nombre</th>
                <th>Últ. conexión</th>
                <th className="p-2 max-w-14">Secciones</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200">
              {itemsPage.map(facilitator => (
                <tr key={facilitator.id}>
                  <td className="p-2">
                    {facilitator.name}
                  </td>
                  <td>
                    <p className="text-xs text-gray-700 text-center">
                      {formatDate(facilitator.lastLogin as string)}, {" "}
                      {getHours(facilitator.lastLogin as string)}
                    </p>
                  </td>
                  <td className="text-center p-2">
                    {facilitator._count.teacherSectionAccess}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          setPage={setPage}
          totalPage={totalPage}
          page={page}
        />
      </div>

    </>
  )
}

export default CoordinatorFacilitatorDashboard