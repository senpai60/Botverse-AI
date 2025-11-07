// src/components/LeftMenu.jsx
import { useEffect, useState } from "react";
import { MessageCircle, PlusCircle, User, Settings, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {chatApi} from '../../api/chatApi'

const LeftMenu = ({chats}) => {
  const { pathname } = useLocation();

  /* 
  {   id: 1, name: "Luna 💕" },
    { id: 2, name: "Nova 🔥" },
    { id: 3, name: "Aria 🌙" },

  */


// useEffect(()=>{
//   const fetchUserChats = async () => {
//     try {
//       const response =  await chatApi.get('/')
//       setChats(response.data?.data)
//     } catch (err) {
//       console.err
//     }
//   }
//   fetchUserChats()
// },[])

  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-gradient-to-b from-pink-500/40 to-purple-800/40 backdrop-blur-2xl border-r border-white/10 flex flex-col">
      {/* Header / Logo */}
      <div className="flex items-center justify-center py-6 border-b border-white/10">
        <h1 className="text-2xl font-bold text-pink-200 tracking-wide flex items-center gap-2">
          💞 <span>LoveBot</span>
        </h1>
      </div>

      {/* Navigation */}
      <nav className="px-6 py-4 flex flex-col gap-4">
        <Link
          to="/"
          className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${
            pathname === "/"
              ? "bg-pink-500/40 text-white"
              : "text-white/70 hover:bg-pink-500/20"
          }`}
        >
          <Heart className="w-5 h-5" /> <span>Home</span>
        </Link>

        <Link
          to="/profile"
          className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${
            pathname === "/profile"
              ? "bg-pink-500/40 text-white"
              : "text-white/70 hover:bg-pink-500/20"
          }`}
        >
          <User className="w-5 h-5" /> <span>Profile</span>
        </Link>

        <Link
          to="/settings"
          className={`flex items-center gap-3 px-4 py-2 rounded-xl transition-all ${
            pathname === "/settings"
              ? "bg-pink-500/40 text-white"
              : "text-white/70 hover:bg-pink-500/20"
          }`}
        >
          <Settings className="w-5 h-5" /> <span>Settings</span>
        </Link>
      </nav>

      {/* Divider */}
      <div className="border-t border-white/10 my-2" />

      {/* Active Chats List */}
      <div className="flex-1 overflow-y-auto px-6 py-3 space-y-2">
        <div className="flex items-center justify-between text-white/60 mb-2">
          <span className="text-sm uppercase tracking-wider">Chats</span>
          <Link to={"/create-bot"}>
            <PlusCircle className="w-5 h-5 hover:text-pink-400 cursor-pointer" />
          </Link>
        </div>

        {chats.length > 0 ? (
          chats.map((chat) => ( // <-- CORRECT: Removed the inner {}
          <Link
            to={`/chat/${chat._id}`}
            key={chat._id}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
              pathname === `/chat/${chat.id}`
                ? "bg-pink-400/30 text-white"
                : "text-white/70 hover:bg-white/10"
            }`}
          >
            <MessageCircle className="w-4 h-4 text-pink-300" />
            <span className="truncate">{chat?.bot?.name}</span>
          </Link>
        ))
        ):<p>Please start new chat with bots from <a href="/" className="text-pink-400 font-bold uppercase underline underline-offset-4">home</a> sections</p>}
      
      </div>

      {/* Footer */}
      <div className="text-xs text-white/40 text-center py-3 border-t border-white/10">
        © 2025 LoveBot
      </div>
    </aside>
  );
};

export default LeftMenu;
