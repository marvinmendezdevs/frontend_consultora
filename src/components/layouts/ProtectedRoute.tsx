import { Navigate, Outlet } from "react-router";
import SpinnerUIComponent from "../ui/SpinnerUIComponent";
import useAuth from "@/hooks/useAuth.hooks";


function ProtectedRoute() {

    const { data, isLoading, isError } = useAuth();
    
    if(isLoading) return (
        <div className="h-screen flex flex-col justify-center items-center">
            <SpinnerUIComponent />
            <p>Cargando, por favor espere...</p>
        </div>
    );

    if(isError) return <Navigate to="/login" replace />

    if(data) return <Outlet />
}

export default ProtectedRoute