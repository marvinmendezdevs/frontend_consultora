import useDashboard from "@/hooks/useDashboard.hooks";
import { getTeacherInfo } from "@/services/dashboard.services";
import type { DashboardRecord } from "@/types/dashboard.types";
import { useQuery } from "@tanstack/react-query";
import StatCard from "./StatCard";
import { Key, ShieldCheck, User } from "lucide-react";
import GeneralInformation from "./GeneralInformation";
import TeachersOnTime from "./TeachersOnTime";

function SectionDashboard() {
    const { isLoading, isError, data } = useQuery<DashboardRecord[]>({
        queryKey: ["dashboard"],
        queryFn: getTeacherInfo,
        retry: false,
        refetchOnWindowFocus: false
    });

    const { totalInfo, onTimeInfo, calculateTotals } = useDashboard(data || [], "Secciones")

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
                    title="Total secciones"
                    value={calculateTotals("total")}
                    icon={User}
                    color="blue"
                />
                <StatCard
                    title="Secciones con Acceso"
                    value={calculateTotals("access")}
                    icon={Key}
                    color="emerald"
                />
                <StatCard
                    title="Secciones con Demo"
                    value={calculateTotals("demo")}
                    icon={ShieldCheck}
                    color="rose"
                />
            </div>

            <GeneralInformation title="Información de secciones" teacherData={totalInfo} />

            <TeachersOnTime title="Histórico de secciones" teacherData={onTimeInfo} />
        </div>
    )
}

export default SectionDashboard