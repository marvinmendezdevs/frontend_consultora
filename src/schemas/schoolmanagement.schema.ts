import z from "zod";
import { SchoolSchema } from "./school.schema";

export const SchoolByMonitorSchema = z.object({
    id: z.number(),
    monitorId: z.number(),
    schoolCode: z.number(),
    createdAt: z.string(),
    school: SchoolSchema
});

export const SubdirectorForm = z.object ({
  email: z.string(),
  name: z.string(),
  dui: z.string(),
  telephone: z.string(),
});

export const UpdateSubdirectorPayload = z.object ({
  schoolCode: z.number(),
  roleId: z.number(),
  email: z.string(),
  name: z.string(),
  dui: z.string(),
  telephone: z.string()
});