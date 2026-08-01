import { z } from "zod";

export const editJobSchema = z.object({
    jobTitle: z
        .string()
        .min(1, "job title is required"),

    jobDescription: z
        .string()
        .min(1, "description is required"),
    
    location: z
        .string()
        .min(1, "location is required"),

    jobPay: z
        .string()
        .min(1, "enter job pay")
        .regex(/^[1-9]\d+$/, "Job pay must be a number with at least 2 digits and cannot start with 0"),
})

export type EditJobFormData = z.infer<typeof editJobSchema>;