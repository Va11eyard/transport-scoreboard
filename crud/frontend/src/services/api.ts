import axios from "axios";

// Allow dynamic baseURL for troubleshooting
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080/api", // Use env var or default
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000, // 10-second timeout
});

// Request interceptor for token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request sent:", config.method, config.url); // Debug log
    return config;
  },
  (error) => {
    console.error("Request error:", error);
    return Promise.reject(error);
  },
);

// Error interface
interface ApiError {
  isAxiosError: boolean;
  response?: {
    data?: { detail?: string };
    status?: number;
  };
  request?: any;
  message?: string;
}

// Response interceptor
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