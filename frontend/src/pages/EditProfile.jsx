import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./EditProfile.css"

function EditProfile() {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [username, setUsername] = useState(user?.username || "");
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(
    user?.avatar_url ||
      `https://ui-avatars.com/api/?name=${encodeURIComponent(
        user?.username || "User"
      )}`
  );
  const [error, setError] = useState("");

  const API = import.meta.env.VITE_API_URL;

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const access = localStorage.getItem("access");

    const formData = new FormData();
    formData.append("username", username);
    if (avatarFile) formData.append("avatar", avatarFile);

    try {
      const res = await fetch(`${API}/auth/me/update/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${access}`,
        },
        body: formData,
      });

      if (res.ok) {
        navigate("/profile");
      } else {
        const data = await res.json();
        console.log("PROFILE UPDATE ERROR:", data);
        setError("Failed to update profile.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-16 p-8 bg-white shadow-lg rounded-xl">
      <h1 className="text-3xl font-semibold mb-6 text-center">Edit Profile</h1>

      <div className="flex flex-col items-center mb-6">
        <img
          src={preview}
          alt="preview"
          className="w-28 h-28 rounded-full border-4 border-gray-200 object-cover mb-4"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
        <div>
          <label className="block mb-1 font-medium">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Avatar</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
        </div>

        {error && (
          <p className="text-red-600 bg-red-100 border border-red-300 px-4 py-2 rounded">
            {error}
          </p>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
