import { Link } from "react-router-dom";
import { useAuth } from "./hooks/useAuth"; // adjust if your hook is in src/app/hooks

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
      <h1 className="font-bold text-lg">Task Manager</h1>
      <div className="flex gap-4 items-center">
        <Link to="/dashboard">Dashboard</Link>
        {!user ? (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <span>{user.name || user.email}</span>
            <button
              onClick={logout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;