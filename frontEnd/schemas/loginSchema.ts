import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .min(1, "email is required")
        .email('please enter valid email address'),
    
    password: z
        .string()
        .min(1, "Password is required")
        .min(8,'Password must be at least 8 characters')
        .regex(/[a-z]/, "Password must contain a lowercase letter")
        .regex(/[A-Z]/, "Password must contain an uppercase letter")
        .regex(/[0-9]/, "Password must contain a number")
        .regex(/[!@#$%^&*(),.?":{}|<>]/,"Password must contain a special character"),
        // make sure the password includes a number, special character, capital and small letter
})

export type LoginFormData = z.infer<typeof loginSchema>;