import { Routes, Route } from "react-router-dom";
import LeftMenu from "./components/layout/LeftMenu";
import HomePage from "./pages/HomePage";
import ChatRoom from "./pages/ChatRoom";
import Profile from "./pages/Profile";
import AuthPage from "./pages/AuthPage";
import ProtectedRoute from "./components/common/ProtectedRoute";
import gsap from "gsap";
import { useState,useEffect } from "react";
import { useGSAP } from "@gsap/react";
import CreateBotPage from "./pages/CreateBotPage";
import { botApi } from "./api/botApi";
import {  useAuthContext } from "./context/AuthContext";


function App() {
  const [menuOpen, setMenuOpen] = useState(true);
  const [bots, setBots] = useState([]);


const {refreshChats,chats} = useAuthContext()


  useEffect(()=>{
    const fetchBots = async () =>{
      try {
        const response = await botApi.get('/all')
        setBots(response.data?.data)
         if (verified) await refreshChats(); 
      } catch (err) {
       console.error(err) 
      }
    }
    fetchBots()
  },[])

  useGSAP(() => {
    gsap.to(".sidebar", {
      x: menuOpen ? 0 : "-100%",
      duration: 0.6,
      ease: "power3.inOut",
    });
  }, [menuOpen]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-black text-white">
      <div className="sidebar fixed top-0 left-0 h-screen w-64 z-20">
        <LeftMenu chats={chats} />
      </div>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="absolute top-4 left-4 z-30 p-2 bg-white/10 rounded-lg md:hidden backdrop-blur-md border border-white/20 hover:bg-white/20 transition"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-6 h-6 text-white"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </button>

      <main className="ml-64 flex-1 overflow-y-auto p-10 transition-all duration-500">
        <Routes>
          {/* ✅ Public route */}
          <Route path="/auth" element={<AuthPage />} />

          {/* ✅ Protected routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <HomePage bots={bots} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat/:id"
            element={
              <ProtectedRoute>
                <ChatRoom />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-bot"
            element={
              <ProtectedRoute>
                <CreateBotPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
}

export default App;
