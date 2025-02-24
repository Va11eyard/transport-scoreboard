// api.ts
import axios from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api", // Correct base URL
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log("Request sent:", config.method, config.url, "Token:", token || "No token found");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

interface ApiError {
  isAxiosError: boolean;
  response?: {
    data?: { detail?: string };
    status?: number;
  };
  request?: any;
  message?: string;
}

api.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    const apiError = error as ApiError;
    if (apiError.isAxiosError) {
      if (apiError.response) {
        console.error("Response error:", apiError.response.data);
        throw new Error(
          apiError.response.data?.detail || `Error ${apiError.response?.status || "unknown"}: An error occurred`,
        );
      } else if (apiError.request) {
        console.error("Network error:", apiError.request);
        throw new Error("Network error. Please check your connection or server status.");
      }
    } else {
      console.error("Unexpected error:", apiError.message);
      throw new Error("An unexpected error occurred.");
    }
  },
);

export default api;