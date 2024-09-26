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

export const courseSchema = z.object({
    courseName: requiredString.min(4, 'Must be at least 4 characters')
})

export type CourseValues = z.infer<typeof courseSchema>

export const subjectSchema = z.object({
    subjectName: requiredString.min(4, 'Must be at least 4 characters')
})

export type SubjectValues = z.infer<typeof subjectSchema>

export const studentSchema = z.object({
    studentID: requiredString.length(10, "Student ID must be exactly 10 characters."),
    firstname: requiredString.min(2, 'First name must be at least 2 characters'),
    middlename: z.string().optional(),
    lastname: requiredString.min(2, "Last name must be at least 2 characters"),
    degreeProgram: requiredString,
    email: requiredString.email('Invalid email address'),
    gender: requiredString,
    yearlevel: requiredString,
    contact_no: z.string().length(11, "Contact No must be at least 11 characters"),
    birthdate: requiredString,
    status: z.string().optional(),
    avatarUrl: z.string().optional(),
    streetAddress: requiredString.min(4, 'Street Address must be at least 4 characters'),
    barangay: z.string().min(2, 'Barangay Line 2 must be at least 4 characters'),
    city: requiredString.min(4, "City must be at least 4 characters"),
    state_province: requiredString.min(4, "State Province must be at least 4 characters"),
    postal_code: requiredString.regex(/^\d{4,6}$/, { message: "Postal code must be between 4-6 digits" }),

    password: requiredString.min(8, "Password must be at least 8 characters"),
    confirm_password: requiredString.min(8, "Confirm password must be at least 8 characters")
})

export type StudentValues = z.infer<typeof studentSchema>

