import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // ✅ adjust to your backend URL
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

export default api;
