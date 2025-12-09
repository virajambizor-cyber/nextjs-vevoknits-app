import { z } from "zod";

export const zSchema = z
  .object({
    name: z
      .string({ required_error: "Name is required" })
      .trim()
      .min(2, { message: "Name must be at least 2 characters long" })
      .max(50, { message: "Name must be less than 50 characters" })
      .regex(/^[a-zA-Z\s]+$/, { message: "Name must contain only letters" }),

    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .email({ message: "Invalid email address" }),

    mobile: z
      .string({ required_error: "Mobile number is required" })
      .trim()
      .regex(/^[6-9]\d{9}$/, { message: "Enter a valid 10-digit mobile number" }),

    password: z
      .string({ required_error: "Password is required" })
      .min(8, { message: "Password must be at least 8 characters long" })
      .max(64, { message: "Password must be at most 64 characters long" })
      .regex(/[a-z]/, { message: "Include at least one lowercase letter" })
      .regex(/[A-Z]/, { message: "Include at least one uppercase letter" })
      .regex(/\d/, { message: "Include at least one number" })
      .regex(/[^A-Za-z0-9]/, { message: "Include at least one special character" })
      .refine((s) => !/\s/.test(s), { message: "No spaces allowed" }),

    confirmPassword: z
      .string({ required_error: "Please confirm your password" }),

    gstin: z
      .string({ required_error: "GSTIN is required" })
      .trim()
      .toUpperCase()
      .regex(
        /^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$/,
        { message: "Enter a valid GSTIN" }
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default zSchema;
