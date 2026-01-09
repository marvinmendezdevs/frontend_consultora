import { api } from "@/config/axios.config";
import type { TeacherType } from "@/types/index.types";

export const setAccessTeacher = async (teacherId: TeacherType['id']) => {
    const { data } = await api.patch(`/teacher/${teacherId}/set-access`);

    return data;
}