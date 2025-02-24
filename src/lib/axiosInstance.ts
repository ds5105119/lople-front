import axios, { InternalAxiosRequestConfig, AxiosRequestConfig, AxiosError } from "axios";
import { useAuthStore } from "@/store/auth";
import { TokenRefreshProps, TokenRefreshSchema } from "@/@types/accounts/api";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const { access } = useAuthStore();
    if (access) {
      config.headers.Authorization = `Bearer ${access}`;
    }
    return config;
  },
  (error: AxiosError) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { updateAccess, deleteAccess } = useAuthStore();
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refresh_url = `${process.env.NEXT_PUBLIC_BACKEND_URL}${process.env.NEXT_PUBLIC_REFRESH_TOKEN_URL}`;
      const response = await axios.post<TokenRefreshProps>(refresh_url, {}, { withCredentials: true });

      if (response.status === 200) {
        const responseData = TokenRefreshSchema.parse(response);
        updateAccess(responseData.access);
        return axiosInstance(originalRequest);
      } else {
        deleteAccess();
      }
    } else if (error.response?.status === 401 && originalRequest._retry) {
      deleteAccess();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
