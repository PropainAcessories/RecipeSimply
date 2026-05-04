import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Authform.css";

function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();   // <-- use register from context

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validatePassword = (password) => {
    const hasUpper = /[A-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);

    if (!hasUpper) return "Password must contain at least one uppercase letter";
    if (!hasNumber) return "Password must contain at least one number";

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Password match check
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Password strength check
    const passwordError = validatePassword(form.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    // Call AuthContext.register()
    const result = await register(
      form.username,
      form.email,
      form.password
    );

    if (result.success) {
      navigate("/");
    } else {
      setError(result.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-semibold text-center mb-6">Create Account</h2>

      {error && (
        <p className="bg-red-100 text-red-700 border border-red-300 px-4 py-2 rounded mb-4 text-sm">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="username"
          placeholder="Username"
          value={form.username}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="password"
          type="password"
          placeholder="Password One Number, One UpperCase Letter"
          value={form.password}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />

        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={handleChange}
          required
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-300 transition"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;
