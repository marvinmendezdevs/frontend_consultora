import { api } from "@/config/axios.config"

export const getFormBySlugForMonitor = async (slug: string) => {
    const { data } = await api.get(`/schoolmanagement/${slug}`);

    return data;
}