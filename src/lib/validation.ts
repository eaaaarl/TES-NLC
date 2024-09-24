import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const signUpSchema = z.object({
    email: requiredString.email("Invalid email address"),
    password: requiredString.min(8, "Must be at least 8 characters"),
    Role: z.string().optional(),
    avatarUrl: z.string().optional(),
    adminID: requiredString.min(4, 'Must be at least 4 characters'),
    fullname: requiredString.min(4, 'Must be at least 4 characters')
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

export const courseSchema = z.object({
    courseName: requiredString.min(4, 'Must be at least 4 characters')
})

export type CourseValues = z.infer<typeof courseSchema>

export const subjectSchema = z.object({
    subjectName: requiredString.min(4, 'Must be at least 4 characters')
})

export type SubjectValues = z.infer<typeof subjectSchema>
