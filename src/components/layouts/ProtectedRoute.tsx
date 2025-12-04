import { Navigate, Outlet } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/config/axios.config";
import type { AxiosError } from "axios";
import type { ErrorResponseApiType } from "@/types/index.types";
import type { UserType } from "@/types/auth.types";
import SpinnerUIComponent from "../ui/SpinnerUIComponent";

type UserResponseType = {
    user: UserType
}

function ProtectedRoute() {

    const { data, isLoading, isError } = useQuery<UserResponseType, AxiosError<ErrorResponseApiType>>({
        queryKey: ['user'],
        queryFn: async () => {
            const { data } = await api.get('/auth/user');

            return data;
        },
        retry: false,
        refetchOnWindowFocus: true,
    });
    
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