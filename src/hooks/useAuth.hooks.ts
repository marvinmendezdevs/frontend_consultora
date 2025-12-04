import { api } from "@/config/axios.config";
import type { UserType } from "@/types/auth.types";
import type { ErrorResponseApiType } from "@/types/index.types";
import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

export default function useAuth(){
    return useQuery<UserType, AxiosError<ErrorResponseApiType>>({
        queryKey: ['user'],
        queryFn: async () => {
            const { data } = await api.get('/auth/user');

            return data;
        },
        retry: false,
        refetchOnWindowFocus: true,
    });
}