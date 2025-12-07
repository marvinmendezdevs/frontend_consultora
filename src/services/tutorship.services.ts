import { api } from "@/config/axios.config"

export const getMetricsTutorship = async () => {
    const { data } = await api.get('/tutorship');
    return data;
}