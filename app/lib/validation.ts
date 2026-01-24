import { z } from 'zod';

export const genderSchema = z.object({
  gender: z.string().refine((val) => val === 'male' || val === 'female', {
    message: "Please select a character!"
  })
});

export const personalInfoSchema = z.object({
  studentId: z.string()
    .regex(/^\d{7}$/, "Student ID must be exactly 7 digits"),
  name: z.string()
    .min(2, "Name must be at least 2 characters"),
  email: z.string()
    .email("Invalid email address"),
  phone: z.string()
    .regex(/^01\d{9}$/, "Must be 11 digits starting with 01"),
  facebook: z.string()
    .min(1, "Facebook link/username is required")
});

export const academicInfoSchema = z.object({
  major: z.string()
    .min(1, "Major is required"),
  semester: z.string()
    .min(1, "Semester is required")
});

export const skillsSchema = z.object({
  skills: z.array(z.string())
    .min(1, "Choose at least one skill or 'None'!")
});

export const fullRegistrationSchema = z.object({
  ...genderSchema.shape,
  ...personalInfoSchema.shape,
  ...academicInfoSchema.shape,
  ...skillsSchema.shape,
  timestamp: z.string()
});
