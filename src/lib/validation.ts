import { defaultRatingScale } from "@/app/admin/(main)/evaluations/_components/QuestionForm";
import { z } from "zod";

const requiredString = z.string().trim().min(1, "Required");

export const signUpSchema = z.object({
  email: requiredString.email("Invalid email address"),
  password: requiredString.min(8, "Must be at least 8 characters"),
  Role: z.string().optional(),
  avatarUrl: z.string().optional(),
  adminID: requiredString.min(4, "Must be at least 4 characters"),
  fullname: requiredString.min(4, "Must be at least 4 characters"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  email: requiredString.email("Invalid email address"),
  password: requiredString.min(8, "Must be at least 8 characters"),
});

export type LoginValues = z.infer<typeof loginSchema>;

export const courseSchema = z.object({
  courseName: requiredString.min(4, "Must be at least 4 characters"),
  departmentId: requiredString,
});

export type CourseValues = z.infer<typeof courseSchema>;

export const subjectSchema = z.object({
  subject_code: z.string().min(2, "Must be at least 2 characters").optional(),
  subjectName: requiredString.min(4, "Must be at least 4 characters"),
});

export type SubjectValues = z.infer<typeof subjectSchema>;

export const sectionSchema = z.object({
  sectionName: requiredString.min(2, "Must be at least 2 characters"),
  yearLevelId: requiredString,
  departmentId: requiredString,
});

export type SectionValues = z.infer<typeof sectionSchema>;

export const studentSchema = z
  .object({
    studentID: z
      .string()
      .min(1, "Required")
      .regex(/^\d{4}-\d{5}$/, {
        message:
          "Student ID must follow the format YYYY-NNNNN (e.g., 2024-01133).",
      }),
    firstname: requiredString.min(
      2,
      "First name must be at least 2 characters"
    ),
    middlename: z.string().optional(),
    lastname: requiredString.min(2, "Last name must be at least 2 characters"),
    email: z
      .string()
      .email("Invalid email address") // Validates if it's a valid email format
      .optional() // Makes the field optional
      .refine((val) => val === undefined || val.trim() !== "", {
        message: "Email cannot be empty if provided",
      }),

    contact_no: z
      .string()
      .optional()
      .refine((val) => !val || val.length === 11, {
        message: "Contact No must be exactly 11 characters",
      }),
    gender: requiredString,
    yearlevel: requiredString,
    departmentId: requiredString,
    sectionId: requiredString,
    courseId: requiredString,
    birthdate: z
      .string()
      .min(10, "Birthdate is required must follow the format YYYY-MM-DD")
      .regex(
        /^\d{4}-\d{2}-\d{2}$/,
        "Birthdate must follow the format YYYY-MM-DD"
      ),
    status: z.string().optional(),
    avatarUrl: z.string().optional(),
    streetAddress: requiredString.min(
      4,
      "Street Address must be at least 4 characters"
    ),
    barangay: z
      .string()
      .min(2, "Barangay Line 2 must be at least 4 characters"),
    city: requiredString.min(4, "City must be at least 4 characters"),
    state_province: requiredString.min(
      4,
      "State Province must be at least 4 characters"
    ),
    postal_code: z.string().regex(/^\d{4,6}$/, {
      message: "Postal code must be between 4-6 digits",
    }),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirm_password: z
      .string()
      .min(8, "Confirm password must be at least 8 characters"),
  })
  .refine((data) => data.password === data.confirm_password, {
    path: ["confirm_password"], // Point to the confirm_password field
    message: "Passwords do not match", // Custom error message
  });

export type StudentValues = z.infer<typeof studentSchema>;

export const studentLoginSchema = z.object({
  studentID: z
    .string()
    .min(1, "Required")
    .regex(/^\d{4}-\d{5}$/, { message: "Invalid Student ID" }),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type StudentLoginValues = z.infer<typeof studentLoginSchema>;

export const ChangePasswordSchema = z
  .object({
    currentPassword: requiredString.min(
      8,
      "Current Password must be at least 8 characters"
    ),
    newPassword: requiredString.min(
      8,
      "New Password must be at least 8 characters"
    ),
    confirmPassword: requiredString.min(
      8,
      "Confirm Password must be at least 8 characters"
    ),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

export type ChangePasswordValues = z.infer<typeof ChangePasswordSchema>;

export const StudentEditSchema = z.object({
  studentID: z
    .string()
    .min(1, "Required")
    .regex(/^\d{4}-\d{5}$/, {
      message:
        "Student ID must follow the format YYYY-NNNNN (e.g., 2024-01133).",
    }),
  firstname: z
    .string()
    .trim()
    .min(1, "Required")
    .min(2, "First name must be at least 2 characters"),
  middlename: z.string().optional(),
  lastname: z
    .string()
    .trim()
    .min(1, "Required")
    .min(2, "Last name must be at least 2 characters"),
  courseId: z.string().trim().min(1, "Required"),
  departmentId: z.string().trim().min(1, "Required"),
  gender: z.string().trim().min(1, "Required"),
});

export type StudentEditValues = z.infer<typeof StudentEditSchema>;

export const AcademicYearSchema = z.object({
  year: requiredString.regex(
    /^\d{4}-\d{4}$/,
    "Academic year must be in the format 'YYYY-YYYY'"
  ),
  semester: requiredString,
  isActive: z.boolean().optional(),
});

export type academicYearValues = z.infer<typeof AcademicYearSchema>;

export const CategorySchema = z.object({
  categoryName: requiredString.min(
    4,
    "Category name must be at least 4 characters"
  ),
});

export type categoryValues = z.infer<typeof CategorySchema>;

export const QuestionSchema = z.object({
  categoryName: requiredString,
  question: requiredString,
  description: z.string().optional(),
  required: z.boolean().default(true),
  allowComments: z.boolean().default(true),
  ratingScale: z
    .array(
      z.object({
        id: z.string(),
        rating: z.number(),
        description: z.string(),
      })
    )
    .default(defaultRatingScale),
});

export type questionValues = z.infer<typeof QuestionSchema>;
