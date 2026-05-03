import axios from "axios";

const isDev = import.meta.env.DEV;

const instance = axios.create({
  baseURL: isDev
    ? "http://127.0.0.1:8000/api"
    : "https://recipesimply.fly.dev/api",
  withCredentials: true,
});

// Attach access token
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle expired access tokens
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If token expired AND we haven't retried yet
    if (
      error.response &&
      error.response.data &&
      error.response.data.code === "token_not_valid" &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      const refresh = localStorage.getItem("refresh");
      if (!refresh) {
        return Promise.reject(error);
      }

      try {
        // Request new access token
        const res = await instance.post("/auth/refresh/", { refresh });

        const newAccess = res.data.access;
        localStorage.setItem("access", newAccess);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccess}`;
        return instance(originalRequest);
      } catch (refreshError) {
        // Refresh token invalid → force logout
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default instance;
