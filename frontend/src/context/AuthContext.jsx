/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useState } from "react";
import axios from "../utils/axios";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    const access = localStorage.getItem("access");
    if (!access) {
      setLoading(false);
      return;
    }

    try {
      const res = await axios.get("/users/me/");
      setUser(res.data);
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  // Load user on first mount
  useEffect(() => {
    loadUser();
  }, []);

  const login = async (email, password) => {
    try {
      const res = await axios.post("/auth/login/", {
        email,
        password,
      });

      const { access, refresh } = res.data;
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh)

      await loadUser();

      return { success: true };
    } catch (err) {
      console.error("Login failed:", err);
      return { success: false, message: "Invalid credentials" };
    }
  };

  const register = async (username, email, password) => {
    try {
      await axios.post("/auth/register/", {
        username,
        email,
        password,
      });

      // Auto-login
      return await login(email, password);
    } catch (err) {
      console.error("Registration failed:", err);
      return { success: false, message: "Registration failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem("access");
    setUser(null);
    setIsAuthenticated(false);
  };

  const value = { user, isAuthenticated, loading, login, logout, register };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
