import StatCard from "@/components/pages/dashboard/StatCard"
import Teacher from "@/components/pages/dashboard/Teacher"
import { getTeacherInfo } from "@/services/dashboard.services";
import { useQuery } from "@tanstack/react-query"
import { Key, LayoutDashboard, ShieldCheck, Users } from "lucide-react"

type DashboardRecord = {
    id: number,
    total: number,
    demo: number,
    access: number,
    type: string,
    dateReported: string,
    group: number
}

function Dahsboard() {

    const { isLoading, isError, data } = useQuery<DashboardRecord[]>({
        queryKey: ["dashboard-teachers"],
        queryFn: getTeacherInfo,
        retry: false,
        refetchOnWindowFocus: false
    });

    const hoy = new Date().toISOString().split('T')[0];

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

    let datosParaMostrar: DashboardRecord[] = data.filter(item => {
        const fechaItem = new Date(item.dateReported).toISOString().split('T')[0];
        return fechaItem === hoy;
    });

    if (datosParaMostrar.length === 0 && data.length > 0) {
        // Ordenamos por fecha descendente y tomamos la fecha del primer elemento
        const ultimoRegistro = [...data].sort((a, b) =>
            new Date(b.dateReported).getTime() - new Date(a.dateReported).getTime()
        )[0];

        const ultimaFechaDisponible = new Date(ultimoRegistro.dateReported).toISOString().split('T')[0];

        // Filtramos todos los que pertenecen a esa última fecha encontrada
        datosParaMostrar = data.filter(item =>
            new Date(item.dateReported).toISOString().split('T')[0] === ultimaFechaDisponible
        );
    }

    const teacherInfo = datosParaMostrar.filter(item => item.type === "Docentes");

    // Obtener metricas ahora si
    const totalTeacher = (category: "total" | "demo" | "access") => teacherInfo.reduce((acc, item) => {
        return item[category] + acc
    }, 0);

    return (
        <div className="bg-linear-to-br from-indigo-50 via-white to-indigo-50 h-screen">

            <div className="w-11/12 max-w-7xl mx-auto py-3">
                <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <div className="flex items-center gap-2 text-indigo-600 mb-1">
                            <LayoutDashboard size={20} />
                            <span className="text-sm font-semibold uppercase tracking-wider">Sistema de Gestión</span>
                        </div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Informe de progresos</h1>
                    </div>
                </header>
                <div className="grid grid-cols-1 mt-5 md:grid-cols-3 gap-6">
                    <StatCard
                        title="Total Docentes"
                        value={totalTeacher("total")}
                        icon={Users}
                        color="blue"
                    />
                    <StatCard
                        title="Docentes con Acceso"
                        value={totalTeacher("access")}
                        icon={Key}
                        color="emerald"
                    />
                    <StatCard
                        title="Docentes Demo"
                        value={totalTeacher("demo")}
                        icon={ShieldCheck}
                        color="rose"
                    />
                </div>

                <Teacher teacherData={teacherInfo} />
            </div>
        </div>
    )
}

export default Dahsboard