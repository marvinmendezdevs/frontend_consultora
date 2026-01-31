import { api } from "@/config/axios.config"

export const getTeacherInfo = async () => {
    const { data } = await api.get("/dashboard");

    return data;
}