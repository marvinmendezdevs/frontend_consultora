import z from "zod";

export const SchemaFormShema = z.object({
    id: z.number(),
    answer_options: z.array(z.string()),
    statement: z.string(),
    type: z.enum(['unique', 'text']),
    required: z.boolean(),
});

export const FormGeneralSchema = z.object({
    id: z.number(),
    permission: z.array(z.number()),
    slug: z.string(),
    type: z.string(),
    schema: z.array(SchemaFormShema),
});