import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./app/Navbar";   // ✅ points to src/app/Navbar.tsx
import Footer from "./app/Footer";   // ✅ points to src/app/Footer.tsx
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import DashboardPage from "./features/tasks/pages/DashboardPage";
import ProtectedRoute from "./app/routes/ProtectedRoute";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
        </Route>
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App; // ✅ must be here