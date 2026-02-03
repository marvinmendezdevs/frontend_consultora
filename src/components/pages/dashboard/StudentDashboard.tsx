import { Key, ShieldCheck, User } from "lucide-react";
import StatCard from "./StatCard";
import { getTeacherInfo } from "@/services/dashboard.services";
import type { DashboardRecord } from "@/types/dashboard.types";
import useDashboard from "@/hooks/useDashboard.hooks";
import { useQuery } from "@tanstack/react-query";
import GeneralInformation from "./GeneralInformation";

function StudentDashboard() {
  const { isLoading, isError, data } = useQuery<DashboardRecord[]>({
    queryKey: ["dashboard"],
    queryFn: getTeacherInfo,
    retry: false,
    refetchOnWindowFocus: false
  });

  const { totalInfo, calculateTotals } = useDashboard(data || [], "Estudiantes")

  if (isLoading) {
    return (
      <p className="text-xs text-slate-800 flex justify-center items-center gap-1 p-3">
        <span className="h-5 w-5 block rounded-full border-2 border-gray-300 border-t-indigo-600 animate-spin"></span>
        Cargando información...
      </p>
    );
  }

  if (isError || !data) {
    return (
      <p className="text-xs text-red-600 text-center p-3">
        ¡Error inespertado! contacte con soporte.
      </p>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 mt-5 md:grid-cols-3 gap-6">
        <StatCard
          title="Total estudiantes"
          value={calculateTotals("total")}
          icon={User}
          color="blue"
        />
        <StatCard
          title="Estudiantes con Acceso"
          value={calculateTotals("access")}
          icon={Key}
          color="emerald"
        />
        <StatCard
          title="Estudiantes con Demo"
          value={calculateTotals("demo")}
          icon={ShieldCheck}
          color="rose"
        />
      </div>

      <GeneralInformation title="Información de estudiantes" teacherData={totalInfo}  />
    </div>
  )
}

export default StudentDashboard