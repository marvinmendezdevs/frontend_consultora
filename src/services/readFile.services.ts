import { api } from "@/config/axios.config";


export const readFileCsvToText = (file: File) : Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onload = (e) => resolve(e.target?.result as string);

        reader.onerror = (e) => reject(e);
        reader.readAsText(file);
    });
}

export const syncTeacherData = async (csvContent: string) => {
    const { data } = await api.post("/admin/sync-teachers", {
        csvContent
    });

    return data;
}