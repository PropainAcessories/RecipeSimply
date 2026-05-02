import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const API_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const access = localStorage.getItem("access");
    if (!access) return;

    const fetchUser = async () => {
      try {
        const res = await fetch(`${API_URL}/api/users/me/`, {
          headers: {
            Authorization: `Bearer ${access}`,
          },
        });

        if (res.ok) {
          const data = await res.json();
          console.log(data)
          setUser(data);
        } else {
          localStorage.removeItem("access");
          localStorage.removeItem("refresh");
        }
      } catch (err) {
        console.log("Error fetching user:", err);
      }
    };

    fetchUser();
  }, [API_URL]);

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
    navigate("/login");
  };

  const isLoggedIn = user && user.is_active;

  const avatarSrc =
    user?.avatar_url ||
    "https://ui-avatars.com/api/?name=" +
      encodeURIComponent(user?.username || "User");

  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="nav-logo">
          RecipeSimply
        </Link>

        <div className={`status-dot ${isLoggedIn ? "online" : "offline"}`}></div>
        <span className="status-text">
          {isLoggedIn ? "Online" : "Offline"}
        </span>
      </div>

      <div className="nav-right">
        {isLoggedIn ? (
          <>
            <Link to="/profile" className="nav-username">
              <img src={avatarSrc} alt="avatar" className="nav-avatar" />
              <span>{user.username}</span>
            </Link>
            <button onClick={handleLogout} className="nav-btn logout">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-btn">
              Login
            </Link>
            <Link to="/register" className="nav-btn">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
