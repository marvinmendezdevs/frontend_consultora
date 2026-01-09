import { api } from "@/config/axios.config"
import type { UpdateDirectorPayload, UpdateSubdirectorPayload, DeleteUserSchool } from "@/types/schoolmanagement.type";

export const getAllSchools = async () => {
    const { data } = await api.get("/school/schools");

    return data;
}

export const getSchoolByCode = async (schoolCode: string) => {
    const { data } = await api.get(`/school/${schoolCode}/school`);

    return data;
}
export const upsertSchoolUser = async (payload: UpdateDirectorPayload) => {
    const { data } = await api.post(`/school/user`, payload);

    return data;
}
export const upsertSubdirector = async (payload: UpdateSubdirectorPayload) => {
    const { data } = await api.post(`/school/user`, payload);

    return data;
}
export const deleteUserSchool = async (payload: DeleteUserSchool) => {
    const { data } = await api.delete(`/school/user`, { data: payload });

    return data;
}
export const remediacionSchool = async (schoolCode: string) => {
    const { data } = await api.get(`/school/${schoolCode}/training-offer`);

    return data;
}

export const setAdditionalInformation = async (schoolCode: string, formData: unknown) => {
    const { data } = await api.post(`/school/${schoolCode}/additional-information`, formData);

    return data;
}

export const getTeacherBySchool = async (schoolCode: string) => {
    const { data } = await api.get(`/school/${schoolCode}/teachers`);

    return data;
}