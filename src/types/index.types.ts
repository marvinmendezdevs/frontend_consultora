import type z from "zod";
import type { ErrorResponseApiSchema } from "@/schemas/index.schema";

export type ErrorResponseApiType = z.infer<typeof ErrorResponseApiSchema>