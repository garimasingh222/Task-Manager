import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function ProtectedRoute() {
  const { token } = useAuth();

  // If no token, redirect to login
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Otherwise, render the nested route
  return <Outlet />;
}