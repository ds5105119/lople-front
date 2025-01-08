import { z } from "zod";

export const ProfileSchema = z.object({
  sex: z.number().int().optional(),
  birthday: z.string().optional(),
  profile: z.string().url().optional(),
  bio: z.string().optional(),
  link: z.string().url().optional(),
});

export const LoginRequestSchema = z.object({
  username: z.string().optional(),
  email: z.string().email().optional(),
  password: z.string(),
});

export const LoginResponseSchema = z.object({
  access: z.string(),
  refresh: z.string().optional(),
});

export const RegistrationSchema = z.object({
  username: z.string(),
  email: z.string().email(),
  password1: z.string(),
  password2: z.string(),
  profile: ProfileSchema,
});

export const TokenRefreshSchema = z.object({
  access: z.string(),
  refresh: z.string().optional(),
});

export type ProfileProps = z.infer<typeof ProfileSchema>;
export type LoginRequestProps = z.infer<typeof LoginRequestSchema>;
export type LoginResponseProps = z.infer<typeof LoginResponseSchema>;
export type RegistrationProps = z.infer<typeof RegistrationSchema>;
export type TokenRefreshProps = z.infer<typeof TokenRefreshSchema>;
