import { z } from "zod";

export const AuthCredentialsValidator = z
  .object({
    email: z.string().email({ message: "Email invalido" }),
    password: z
      .string()
      .min(8, { message: "El password debe tener minimo 8 caracteres" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type TAuthCredentialsValidator = z.infer<
  typeof AuthCredentialsValidator
>;
