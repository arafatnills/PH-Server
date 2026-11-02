import { z } from "zod";

const MAX_FILE = 5 * 1024 * 1024; // 5MB
export const ApplyAsDoctorValidationZodSchema = z.object({
  name: z.string().min(3, "Name is required"),
  email: z.email("Invalid email"),
  address: z.string().min(5, "Address is required"),
  specialization: z.string().min(2, "Specialization is required"),
  licenseNumber: z.string().min(3, "License number is required"),
  qualifications: z.string().min(2, "Qualifications are required"),
  experienceYears: z.coerce.number().min(0, "Must be 0 or more").max(70),
  bio: z.string().min(20, "Bio must be at least 20 characters"),
  consultationFee: z.coerce.number().min(0, "Must be 0 or more"),
  contactNumber: z.string().regex(/^(?:\+8801|01)[3-9]\d{8}$/, {
    message: "Invalid phone number",
  }),
  resume: z
    .instanceof(File, { message: "Resume is required" })
    .refine((f) => f.type === "application/pdf", "Only PDF allowed")
    .refine((f) => f.size <= MAX_FILE, "Max size is 5MB"),
  additionalFiles: z
    .array(z.instanceof(File))
    .max(5, "Max 5 files")
    .refine(
      (files) => files.every((f) => f.size <= MAX_FILE),
      "Each file max 5MB",
    ),
});

export const UpdateDoctorProfileValidationZodSchema = z.object({
  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters long")
    .optional(),

  bio: z
    .string()
    .trim()
    .max(1000, "Bio cannot exceed 1000 characters")
    .optional(),

  consultationFee: z
    .number()
    .min(0, "Consultation fee cannot be negative")
    .optional(),

  contactNumber: z
    .string()
    .trim()
    .min(5, "Contact number is invalid")
    .optional(),
});
