import { createContext, useContext, useState, useEffect } from "react";

import { authApi } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    verifyUser();
  }, []);

  const verifyUser = async () => {
    try {
      const res = await authApi.get("/verifyUser");
      setUser(res.data.user);
    } catch {
      setUser(null);
    } finally {
      setLoading(false); // ✅ important here
    }
  };

  // ✅ login/signup handle their own loading locally (in component)
  const login = async (email, password) => {
    try {
      const res = await authApi.post("/login", { email, password });
      setUser(res.data.user);
      await verifyUser();
    } catch (err) {
      throw err.response?.data?.message || "Login failed";
    }
  };

  const signup = async (username, email, password) => {
    try {
      const res = await authApi.post("/signup", { username, email, password });
      setUser(res.data.user);
      await verifyUser();
    } catch (err) {
      throw err.response?.data?.message || "Signup failed";
    }
  };

  const logout = async () => {
    try {
      await authApi.post("/logout");
      setUser(null);
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const value = {
    user,
    setUser,
    loading,
    login,
    signup,
    logout,
    verifyUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
