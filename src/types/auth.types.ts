import type z from "zod";
import type { InfoTutorCountResponseSchema, LoginResponseSchema, LoginSchema, UserSchema } from "@/schemas/auth.schema";

export type UserType = z.infer<typeof UserSchema>
export type LoginType = z.infer<typeof LoginSchema>
export type LoginResponseType = z.infer<typeof LoginResponseSchema>

export type TutorCountType = z.infer<typeof InfoTutorCountResponseSchema>