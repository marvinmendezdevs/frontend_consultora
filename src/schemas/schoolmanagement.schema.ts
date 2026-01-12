import z from "zod";
import { SchoolSchema } from "./school.schema";
import { UserSchema } from "./auth.schema";

export const SchoolByMonitorSchema = z.object({
    id: z.number(),
    monitorId: z.number(),
    schoolCode: z.number(),
    createdAt: z.string(),
    school: SchoolSchema
});

export const DashboardFacilitatorSchema = z.object({
    totalTeacher: z.number(),
    totalTeacherAccess: z.number(),
    totalTeacherSections: z.number(),
    totalTeacherSectionsAccess: z.number(),
    sectionPerFacilitator: z.array(UserSchema.extend({
        _count: z.object({
            teacherSectionAccess: z.number()
        }),
    })),
});