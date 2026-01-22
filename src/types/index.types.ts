import type z from "zod";
import type { ErrorResponseApiSchema } from "@/schemas/index.schema";
import type { SectionSchema } from "@/schemas/tutorship.schema";
import type { TeacherSchema } from "@/schemas/teacher.schemas";
import type { funcionamientoCe } from "@/schemas/school.schema";

export type ErrorResponseApiType = z.infer<typeof ErrorResponseApiSchema>
export type TeacherType = z.infer<typeof TeacherSchema>
export type SectionType = z.infer<typeof SectionSchema>
export type funcionamientoCe = z.infer<typeof funcionamientoCe>
