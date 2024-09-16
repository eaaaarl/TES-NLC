import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const signUpSchema = z.object({
    email: requiredString.email("Invalid email address"),
    username: requiredString.regex(
        /^[a-zA-Z0-9_-]+$/,
        "Only letters, numbers, - and _ allowed",
    ),
    password: requiredString.min(8, "Must be at least 8 characters"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
    email: requiredString.email('Invalid email address'),
    password: requiredString.min(8, 'Must be at least 8 characters')
})

export type LoginValues = z.infer<typeof loginSchema>

export const userSchema = z.object({
    studentID: z.string().min(10, "Student ID must be at least 10 characters."),
    fullname: requiredString.min(4, 'Must be at least 4 characters'),
    status: requiredString
})

export type UserValues = z.infer<typeof userSchema>

