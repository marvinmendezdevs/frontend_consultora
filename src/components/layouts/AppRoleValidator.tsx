import useAuth from "@/hooks/useAuth.hooks";
import { Navigate, Outlet, useLocation } from "react-router";

type AppRoleValidatorType = {
    allowedRoles: string[],
}

function AppRoleValidator({ allowedRoles }: AppRoleValidatorType) {
    const location = useLocation();
    const { data: user, isLoading, isError } = useAuth();

    if (isLoading) {
        return (
            <p className="text-xs text-slate-800 flex justify-center items-center gap-1 p-3">
                <span className="h-5 w-5 block rounded-full border-2 border-gray-300 border-t-indigo-600 animate-spin"></span>
                Verificando permisos...
            </p>
        );
    }

    if (isError) {
        return (
            <p className="text-xs text-red-600 text-center p-3">
                ¡Error inesperado! Por favor, recarga la página o contacta con soporte.
            </p>
        );
    }

    if (!user) <Navigate to="/login" state={{ from: location }} replace />;

    if (user) {
        const roleVerification = allowedRoles.includes(user.role.name) || user.role.name === "Administrador";
        if (!roleVerification) {
            return (
                <p className="text-xs text-red-600 text-center p-3">
                    No tienes permisos para estar en este sitio.
                </p>
            );
        }

        return <Outlet />
    }
}

export default AppRoleValidator;
