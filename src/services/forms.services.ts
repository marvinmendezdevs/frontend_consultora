import { api } from "@/config/axios.config"

type AnswersType = Record<string, string>

export const getFormBySlugForMonitor = async (slug: string) => {
    const { data } = await api.get(`/schoolmanagement/${slug}`);

    return data;
}

export const getAnswerOptimizationBySchoolCode = async (schoolCode: string) => {
    const { data } = await api.get(`/schoolmanagement/optimization-form-answer?schoolCode=${schoolCode}`);
    return data;
}

export const setOptimizationForm = async (answer: AnswersType, schoolCode: string, slug: string) => {

    const formData = {
        schoolCode,
        slug,
        payload: answer,
    }

    const { data } = await api.post('/schoolmanagement/optimization-form', formData)
    return data;
}