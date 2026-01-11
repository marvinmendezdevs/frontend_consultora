import { z } from "zod";

export const TeacherSchema = z.object({
    id: z.number(),
    dui: z.string(),
    name: z.string(),
    email: z.string(),
    telephone: z.string(),
    status: z.boolean(),
    teacherAccess: z.boolean(),
});