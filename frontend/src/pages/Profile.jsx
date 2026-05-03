import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Profile.css"

function Profile() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const avatarSrc =
    user?.avatar_url ||
    `https://ui-avatars.com/api/?name=${encodeURIComponent(
      user?.username || "User"
    )}`;

  return (
    <div className="max-w-lg mx-auto mt-16 p-8 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-semibold mb-6 text-center">Your Profile</h1>

      <div className="flex flex-col items-center gap-4">
        <img
          src={avatarSrc}
          alt="avatar"
          className="w-28 h-28 rounded-full border-4 border-gray-200 object-cover"
        />

        <div className="text-center">
          <p className="text-lg">
            <strong>Username:</strong> {user.username}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {user.email}
          </p>
        </div>

        <Link
          to="/profile/edit"
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Edit Profile
        </Link>
      </div>
    </div>
  );
}

export default Profile;
