import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LeftMenu from "./components/layout/LeftMenu";
import HomePage from "./pages/HomePage";
import ChatRoom from "./pages/ChatRoom";
import Profile from "./pages/Profile";
import gsap from "gsap";
import { useState } from "react";
import { useGSAP } from "@gsap/react";

function App() {
  const [menuOpen, setMenuOpen] = useState(true);

  useGSAP(() => {
    gsap.to(".sidebar", {
      x: menuOpen ? 0 : "-100%",
      duration: 0.6,
      ease: "power3.inOut",
    });
  }, [menuOpen]);

  return (
    <Router>
      <div className="flex min-h-screen bg-gradient-to-br from-purple-900 via-pink-900 to-black text-white">
        {/* Sidebar */}
        <div className="sidebar fixed top-0 left-0 h-screen w-64 z-20">
          <LeftMenu />
        </div>

        {/* Mobile toggle */}
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

        {/* Main Area */}
        <main className="ml-64 flex-1 overflow-y-auto p-10 transition-all duration-500">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/chat/:id" element={<ChatRoom />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
