import z from "zod";

export const LoginSchema = z.object({
    email: z.string().min(1, "El correo es obligatorio").email("Correo inválido (ej: usuario@dominio.com)"),
    password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres").max(10, "La contraseña debe tener menos de 10 caracteres"),
});

export const LoginResponseSchema = z.object({
    msg: z.string(),
    token: z.string(),
});