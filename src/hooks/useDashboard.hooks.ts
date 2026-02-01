import type { DashboardRecord } from "@/types/dashboard.types";

type UseDashboardTypeReturn = {
    totalInfo: DashboardRecord[],
    onTimeInfo: DashboardRecord[],
    calculateTotals: (category: "total" | "demo" | "access") => number,
}

export default function useDashboard(data: DashboardRecord[], type: string): UseDashboardTypeReturn {
    const hoy = new Date().toISOString().split('T')[0];

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

    const totalInfo = datosParaMostrar.filter(item => item.type === type);
    const onTimeInfo = data.filter(item => item.type === type).sort((a, b) =>
        new Date(a.dateReported).getTime() - new Date(b.dateReported).getTime()
    );

    const calculateTotals = (category: "total" | "demo" | "access") => totalInfo.reduce((acc, item) => {
        return item[category] + acc
    }, 0);

    return {
        totalInfo,
        onTimeInfo,
        calculateTotals,
    }
}