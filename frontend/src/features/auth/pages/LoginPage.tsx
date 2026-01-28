import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import api from "../../../app/lib/axios";
import { useAuth } from "../../../app/hooks/useAuth";
import GoogleAuthLogin from "../../../components/GoogleAuthLogin";

export default function LoginPage() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // 👈 toggle state
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const res = await api.post("/api/auth/login", { email, password });
      login(res.data.token, res.data.user);
      navigate("/dashboard");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Login failed.");
      } else {
        setError("Unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <div className="flex items-center border rounded">
          <input
            type={showPassword ? "text" : "password"} // 👈 toggle type
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 p-2 rounded outline-none"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="px-3 text-sm text-blue-600"
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <div className="mt-4">
        <GoogleAuthLogin />
      </div>

      <p className="mt-4 text-sm">
        Don’t have an account?{" "}
        <Link to="/register" className="text-blue-600 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
}