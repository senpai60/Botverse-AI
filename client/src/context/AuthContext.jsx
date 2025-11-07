import { createContext, useContext, useState, useEffect } from "react";
import { authApi } from "../api/authApi";
import { chatApi } from "../api/chatApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]); // ✅ FIX added this

   useEffect(() => {
    (async () => {
      const verified = await verifyUser();
      if (verified) await refreshChats(); // <-- 🔥 This line does the magic
    })();
  }, []);

  const verifyUser = async () => {
    try {
      const res = await authApi.get("/verifyUser");
      const verifiedUser = res.data?.data?.user || res.data?.user;
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
      const loggedInUser = res.data?.data?.user || res.data?.user;
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
      const newUser = res.data?.data?.user || res.data?.user;
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
      setChats([]); // ✅ clear chats on logout
    } catch (err) {
      console.error("Logout error:", err);
    }
  };

  const refreshChats = async () => {
    try {
      const res = await chatApi.get("/");
      const chatList = res.data?.data || [];
      setChats(chatList); // ✅ now this works
      console.log("✅ chats updated:", chatList);
      return chatList;
    } catch (err) {
      console.error("❌ refreshChats failed:", err.response?.data || err.message);
      return [];
    }
  };

  const value = {
    user,
    setUser,
    chats,       // ✅ exposed globally
    setChats,    // ✅ exposed globally
    loading,
    login,
    signup,
    logout,
    verifyUser,
    refreshChats,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
