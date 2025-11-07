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
      const verifiedUser = res.data?.data?.user || res.data?.user; // ✅ FIX
      console.log("✅ verifyUser response:", verifiedUser);
      setUser(verifiedUser);
      return verifiedUser;
    } catch (err) {
      console.error("❌ verifyUser failed:", err.response?.data || err.message);
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const res = await authApi.post("/login", { email, password });
      const loggedInUser = res.data?.data?.user || res.data?.user; // ✅ FIX
      console.log("✅ login response:", loggedInUser);
      setUser(loggedInUser);
      await verifyUser();
      return loggedInUser;
    } catch (err) {
      throw err.response?.data?.message || "Login failed";
    }
  };

  const signup = async (username, email, password) => {
    try {
      const res = await authApi.post("/signup", { username, email, password });
      const newUser = res.data?.data?.user || res.data?.user; // ✅ FIX
      console.log("✅ signup response:", newUser);
      setUser(newUser);
      await verifyUser();
      return newUser;
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
