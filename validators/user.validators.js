import { z } from "zod";

export const password_change_validator = z.object({
    old_password: z.string()
        .min(1, "Current password is required"),
    new_password: z.string()
        .min(1, "New password is required")
}).refine(data => data.old_password !== data.new_password, {
    message: "New password must be different from current password",
    path: ["new_password"]
});

export const name_change_validator = z.object({
    name: z.string()
        .min(1, "Name cannot be empty")
        .regex(/^[a-zA-Z\s\-]+$/, "Name can only contain letters, spaces, and hyphens")
        .trim()
});