import { z } from "zod";

export const createJobSchema = z.object({
    jobTitle: z
        .string()
        .min(1, "job title is required"),

    jobDescription: z
        .string()
        .min(1, "description is required"),
    
    location: z
        .string()
        .min(1, "location is required"),
    
    cellPhone: z
        .string()
        .min(1, "Phone number is required")
        .regex(/^0\d{9}$/, "Phone number must be 10 digits and start with 0"),

    jobPay: z
        .string()
        .min(1, "enter job pay")
        .regex(/^[1-9]\d+$/, "Job pay must be a number with at least 2 digits and cannot start with 0"),
})

export type CreateJobFormData = z.infer<typeof createJobSchema>;