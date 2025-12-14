import axios, { type InternalAxiosRequestConfig } from "axios";
import { API_ROUTES } from "./apiRoutes";

const BASE_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000";

// Create ONE axios instance for your app
export const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true, // important if you use cookies
});

// Use a single refresh in-flight to avoid race conditions
let refreshPromise: Promise<any> | null = null;

api.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & {
          _retry?: boolean;
        })
      | undefined;

    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "TOKEN_EXPIRED" &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url?.includes("/auth/refresh")
    ) {
      originalRequest._retry = true;

      if (!refreshPromise) {
        refreshPromise = api
          .get(API_ROUTES.AUTH.REFRESH, { withCredentials: true })
          .finally(() => {
            refreshPromise = null;
          });
      }

      try {
        await refreshPromise;
        // retry original request with the same config
        return api(originalRequest);
      } catch (e) {
        return Promise.reject(e);
      }
    }

    return Promise.reject(error);
  }
);

export default api;