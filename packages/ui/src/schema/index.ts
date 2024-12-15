import { z } from "zod";

export const ProfileSchema = z.object({
  displayName: z.string().min(1, {
    message: "Display name is required",
  }),
});

export const SignUpSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(30, { message: "Password can only be 30 characters long" }),
  displayName: z.string().min(1, {
    message: "Display name is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});

export type LoginType = z.infer<typeof LoginSchema>;
export type SignUpType = z.infer<typeof SignUpSchema>;
export type ProfileType = z.infer<typeof ProfileSchema>;
