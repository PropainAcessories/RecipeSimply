import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const avatarSrc =
    user?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.username || "User"
    )}`;

  return (
    <nav className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      {/* Left side */}
      <div className="flex items-center gap-3">
        <Link to="/" className="text-xl font-bold text-blue-600">
          RecipeSimply
        </Link>

        {/* Status dot */}
        <div
          className={`h-3 w-3 rounded-full ${
            isAuthenticated ? "bg-green-500" : "bg-gray-400"
          }`}
        ></div>

        <span className="text-sm text-gray-600">
          {isAuthenticated ? "Online" : "Offline"}
        </span>
      </div>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="flex items-center gap-2">
              <img
                src={avatarSrc}
                alt="avatar"
                className="h-8 w-8 rounded-full border"
              />
              <span className="font-medium">{user?.username}</span>
            </Link>

            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
