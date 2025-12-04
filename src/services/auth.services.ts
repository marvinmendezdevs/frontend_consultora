import { api } from "@/config/axios.config";
import type { LoginType } from "@/types/auth.types";

export const login = async (formData: LoginType) => {
    const { data } = await api.post('/auth/login', formData);

    return data;
}