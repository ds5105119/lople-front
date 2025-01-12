import { z } from "zod";

export const ProfileSchema = z.object({
  sex: z.number().int().optional(),
  birthday: z.string().refine((date) => !isNaN(Date.parse(date)), { message: "Invalid date format" }),
  profile: z.string().url().optional(),
  bio: z.string().optional(),
  link: z.string().url().optional(),
});

export const LoginRequestSchema = z.object({
  username: z.string().optional(),
  email: z.string({ required_error: "이메일을 입력해주세요." }).email("올바른 이메일 형식이 아닙니다.").optional(),
  password: z.string({ required_error: "비밀번호를 입력해주세요." }),
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
