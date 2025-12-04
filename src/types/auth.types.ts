import type z from "zod";
import type { LoginResponseSchema, LoginSchema } from "@/schemas/auth.schema";

export type LoginType = z.infer<typeof LoginSchema>
export type LoginResponseType = z.infer<typeof LoginResponseSchema>