import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function EditProfile() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [error, setError] = useState("");
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
        setUsername(data.username || "");
        setPreview(
          data.avatar_url ||
            "https://ui-avatars.com/api/?name=" +
              encodeURIComponent(data.username || "User")
        );
      } else {
        navigate("/login");
      }
    };

    fetchUser();
  }, [API_URL, navigate]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setAvatarFile(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreview(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const access = localStorage.getItem("access");
    if (!access) {
      navigate("/login");
      return;
    }

    const formData = new FormData();
    if (username) formData.append("username", username);
    if (avatarFile) formData.append("avatar", avatarFile);

    try {
      const res = await fetch(`${API_URL}/api/users/me/update/`, {
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

  if (!user) return <div style={{ padding: 20 }}>Loading...</div>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Edit Profile</h1>

      {preview && (
        <img
          src={preview}
          alt="preview"
          style={{
            width: 96,
            height: 96,
            borderRadius: "50%",
            objectFit: "cover",
            border: "3px solid #eee",
            marginBottom: 16,
          }}
        />
      )}

      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div style={{ marginBottom: 12 }}>
          <label>
            Username
            <br />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ padding: 6, width: 250 }}
            />
          </label>
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>
            Avatar
            <br />
            <input type="file" accept="image/*" onChange={handleFileChange} />
          </label>
        </div>

        {error && (
          <div style={{ color: "red", marginBottom: 12 }}>{error}</div>
        )}

        <button type="submit" style={{ padding: "6px 12px" }}>
          Save
        </button>
      </form>
    </div>
  );
}

export default EditProfile;
