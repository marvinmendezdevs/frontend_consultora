import { getPublicMetrics } from "@/services/schoolmanagement.services";
import type { DashboardPublicGS } from "@/types/schoolmanagement.type";
import { useQuery } from "@tanstack/react-query"
import StatCard from "../StatCard";
import { PhoneCall } from "lucide-react";

function CallSMDashboard() {

    const { isLoading, isError, data } = useQuery<DashboardPublicGS[]>({
        queryKey: ["dashboard-school-management"],
        queryFn: getPublicMetrics
    });

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

    console.log(data);

    return (
        <div>
            <h2 className="text-xl font-black">Llamadas a Directores</h2>
            <div className="mt-3 grid gap-3 md:grid-cols-3">
                <StatCard
                    title="Llamadas"
                    value={data[0].json.directores.total}
                    color="emerald"
                    icon={PhoneCall}
                />
            </div>
        </div>
    )
}

export default CallSMDashboard