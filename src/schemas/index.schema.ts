import z from "zod";

export const ErrorResponseApiSchema = z.object({
    msg: z.string(),
})