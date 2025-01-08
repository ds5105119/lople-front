import axiosInstance from "@/lib/axiosInstance";
import { LoginRequestProps, LoginResponseSchema, LoginRequestSchema, RegistrationSchema, LoginResponseProps, RegistrationProps } from "@/types/accounts/api";

export const login = async (credentials: LoginRequestProps) => {
  try {
    LoginRequestSchema.parse(credentials);
    const response = await axiosInstance.post<LoginResponseProps>(`${process.env.NEXT_PUBLIC_LOGIN_URL}`, credentials);
    const responseData = LoginResponseSchema.parse(response.data);
    return responseData;
  } catch (error) {
    throw error;
  }
};

export const registration = async (credentials: RegistrationProps) => {
  try {
    RegistrationSchema.parse(credentials);
    const response = await axiosInstance.post<LoginResponseProps>(`${process.env.NEXT_PUBLIC_REGISTRATION_URL}`, credentials);
    const responseData = LoginResponseSchema.parse(response.data);
    return responseData;
  } catch (error) {
    throw error;
  }
};
