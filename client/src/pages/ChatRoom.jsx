import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";

import ChatHeader from "../components/chatroom/ChatHeader";
import ChatMessages from "../components/chatroom/ChatMessages";
import ChatInput from "../components/chatroom/ChatInput";
import TypingIndicator from "../components/chatroom/TypingIndicator";
import { chatApi } from "../api/chatApi";

const ChatRoom = () => {
  const { id } = useParams();
  const [bot, setBot] = useState(null)


  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hey love 💕 How are you feeling today?" },
  ]);

  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = (msg) => {
    if (!msg.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: msg }]);
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Aww, that’s so sweet 🥰 Tell me more...",
        },
      ]);
    }, 1500);
  };

  useEffect(() => {
    const fetchChatInitials = async() => {
      const response = await chatApi.get(`/${id}`)
      console.log(response.data?.data?.bot);
      
      if(response.data) setBot(response.data?.data?.bot)
    }
    fetchChatInitials()
    
  },[])
  

  return (
    <div className="flex flex-col justify-between flex-1 p-4 sm:p-8 md:p-10 w-full text-white">
      {/* Header */}
      <ChatHeader botName={`${bot?.name} 💕`} botMood={bot?.baseMood} />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto max-h-[70vh] mb-4 scrollbar-thin scrollbar-thumb-pink-400/40 scrollbar-track-transparent">
        <ChatMessages messages={messages} />
        {isTyping && <TypingIndicator />}
      </div>

      {/* Input */}
      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatRoom;
