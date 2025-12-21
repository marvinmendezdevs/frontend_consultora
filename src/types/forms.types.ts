import type { FormGeneralSchema, SchemaFormShema } from "@/schemas/forms.schema";
import type z from "zod";

export type SchemaFormType = z.infer<typeof SchemaFormShema>
export type FormGeneralType = z.infer<typeof FormGeneralSchema>