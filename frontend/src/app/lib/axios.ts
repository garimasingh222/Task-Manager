import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // ✅ localhost in dev, Render in prod
  withCredentials: true, // allows sending cookies (refresh token)
});

// ✅ Attach access token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ✅ Handle expired tokens automatically
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If 401 Unauthorized and not already retried
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Call refresh endpoint
        const res = await api.post("/api/auth/refresh");

        // Save new token
        const newToken = res.data.accessToken;
        localStorage.setItem("token", newToken);

        // Update header and retry original request
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
        // Redirect to login if refresh fails
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;