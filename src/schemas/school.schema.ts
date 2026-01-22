import z from "zod";

export const SchoolSchema = z.object({
    code: z.string(),
    name: z.string(),
    directorName: z.string(),
    address: z.string(),
    block: z.number(),
    phase: z.number(),
    directorPhone: z.string(),
    districtId: z.number()
});

export const SectionSchema = z.object({
    grade: z.string(),
    id: z.number(),
    schoolCode: z.string(),
    sectionClass: z.string(),
    shift: z.string(),
    subtrack: z.string(),
    track: z.string(),
    school: SchoolSchema
});

export const funcionamientoCe = z.object({
    userId: z.number(),
    funcInfrastructure: z.boolean(),
    basicServices: z.object({
        electricidad: z.boolean(),
        aguaPotable: z.boolean(),
    }),
    internetStatus: z.string(),
    teacherAssistance: z.object({
        asisten: z.number(),
        noAsisten: z.number()
    }),
    date: z.date()
})