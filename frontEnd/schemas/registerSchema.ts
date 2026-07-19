import { z } from "zod";

export const registerSchema = z.object({
    name: z
        .string()
        .min(1, "name is required")
        .max(20, "name is too long"),

    surname: z
        .string()
        .min(1, "surname is required")
        .max(20, "surname is too long"),

    cellPhone: z
        .string()
        .min(1, "Phone number is required")
        .regex(/^0\d{9}$/, "Phone number must be 10 digits and start with 0"),

    email: z
        .string()
        .min(1, "email is required")
        .email('please enter valid email address'),

    location: z
        .string()
        .min(1, "location is required"),

    password: z
        .string()
        .min(1, "Password is required")
        .min(8, "Password must be at least 8 characters")
        .regex(/[a-z]/, "Password must contain a lowercase letter")
        .regex(/[A-Z]/, "Password must contain an uppercase letter")
        .regex(/[0-9]/, "Password must contain a number")
        .regex(
            /[!@#$%^&*(),.?":{}|<>]/,
            "Password must contain a special character"
    ),

    confirmPassword: z
        .string()
        .min(1, "Please confirm your password"),
   
})
    .refine(
    (data) => data.password === data.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export type RegisterFormData = z.infer<typeof registerSchema>;