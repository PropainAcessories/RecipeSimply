import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Profile() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const access = localStorage.getItem("access");
    if (!access) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      const res = await fetch(`${API_URL}/api/users/me/`, {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        navigate("/login");
      }
    };

    fetchUser();
  }, [API_URL, navigate]);

  if (!user) return <div style={{ padding: 20 }}>Loading...</div>;

  const avatarSrc =
    user.avatar_url ||
    "https://ui-avatars.com/api/?name=" +
      encodeURIComponent(user.username || "User");

  return (
    <div style={{ padding: 20 }}>
      <h1>Profile</h1>
      <img
        src={avatarSrc}
        alt="avatar"
        style={{
          width: 96,
          height: 96,
          borderRadius: "50%",
          objectFit: "cover",
          border: "3px solid #eee",
        }}
      />
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <Link to="/profile/edit" style={{ marginTop: 20, display: "inline-block" }}>
        Edit Profile
      </Link>
    </div>
  );
}

export default Profile;
