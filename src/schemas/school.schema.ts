import z from "zod";
import { SchoolSchema } from "./tutorship.schema";

export const SectionSchema = z.object({
    grade: z.number(),
    id: z.number(),
    schoolCode: z.number(),
    sectionClass: z.string(),
    shift: z.string(),
    subtrack: z.string(),
    track: z.string(),
    school: SchoolSchema
});