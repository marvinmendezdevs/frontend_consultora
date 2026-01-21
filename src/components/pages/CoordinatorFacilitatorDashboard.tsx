import { getFacilitatorDashboard } from "@/services/schoolmanagement.services";
import type { DashboardFacilitatorType } from "@/types/schoolmanagement.type";
import { useQuery } from "@tanstack/react-query";
import TeacherSectionProgress from "./TeacherSectionProgress";
import ProgressAccessPerFacilitator from "./ProgressAccessPerFacilitator";
// import AccessPerSchoolFacilitator from "./AccessPerSchoolFacilitator";

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

  return (
    <>
      <h2 className="text-2xl font-black text-indigo-600">Verificación de accesos</h2>
      <p className="mb-5">
        Seguimiento de docentes, secciones y progreso de facilitadores
      </p>

      <h2 className="text-xl font-bold">Resumen general de accesos</h2>

      <TeacherSectionProgress
        data={ data }
      />

      <h2 className="text-xl font-bold">Progreso de facilitadores</h2>

      <ProgressAccessPerFacilitator
        sectionPerFacilitator={data.sectionPerFacilitator}
      />
{/* 
      <h2 className="text-xl font-bold mt-5">Accesos por centros escolares</h2>

      <AccessPerSchoolFacilitator /> */}
    </>
  )
}

export default CoordinatorFacilitatorDashboard