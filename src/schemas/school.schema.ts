import z from "zod";
import { SchoolSchema } from "./tutorship.schema";

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