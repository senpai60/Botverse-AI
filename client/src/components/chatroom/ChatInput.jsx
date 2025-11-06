// src/components/chatroom/ChatInput.jsx
import { useState } from "react";
import { SendHorizonal } from "lucide-react";

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(message);
    setMessage("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center bg-white/10 border border-white/20 rounded-2xl px-4 py-2 backdrop-blur-md"
    >
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Say something flirty... 💞"
        className="flex-1 bg-transparent outline-none text-white placeholder-white/40 text-sm sm:text-base"
      />
      <button
        type="submit"
        className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-xl ml-3 hover:brightness-110 transition"
      >
        <SendHorizonal className="w-5 h-5 text-white" />
      </button>
    </form>
  );
};

export default ChatInput;
