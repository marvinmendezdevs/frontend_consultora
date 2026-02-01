import { LayoutDashboard } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router";

function Dahsboard() {

    const { pathname } = useLocation();

    return (
        <div className="bg-linear-to-br from-indigo-50 via-white to-indigo-50 min-h-screen grid gap-2 lg:grid-cols-[200px_1fr]">
            <aside className="flex flex-col gap-4 p-4">
                <Link className={`${pathname === "/dashboard" ? "bg-linear-to-br from-white via-indigo-50 to-white" : ""} p-2 rounded-lg`} to={"/dashboard"}>
                    Docentes
                </Link>
                <Link className={`${pathname === "/dashboard/secciones" ? "bg-linear-to-br from-white via-indigo-50 to-white" : ""} p-2 rounded-lg`} to={"/dashboard/secciones"}>
                    Secciones
                </Link>
                <Link className={`${pathname === "/dashboard/estudiantes" ? "bg-linear-to-br from-white via-indigo-50 to-white" : ""} p-2 rounded-lg`} to={"/dashboard/estudiantes"}>
                    Estudiantes
                </Link>
            </aside>

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
                <Outlet />
            </div>
        </div>
    )
}

export default Dahsboard