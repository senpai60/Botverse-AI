import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ChatHeader from "../components/chatroom/ChatHeader";
import ChatMessages from "../components/chatroom/ChatMessages";
import ChatInput from "../components/chatroom/ChatInput";
import TypingIndicator from "../components/chatroom/TypingIndicator";
import { chatApi } from "../api/chatApi";

const ChatRoom = () => {
  const { id } = useParams(); // chatId
  const [bot, setBot] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // 🧩 Fetch existing chat
  useEffect(() => {
    const fetchChatInitials = async () => {
      const res = await chatApi.get(`/${id}`);
      if (res.data?.data) {
        setBot(res.data.data.bot);
        setMessages(res.data.data.messages);
      }
    };
    fetchChatInitials();

    // 🕒 Polling every 5s
    const interval = setInterval(fetchChatInitials, 5000);
    return () => clearInterval(interval);
  }, [id]);

  // ✉️ Send message
  const handleSendMessage = async (msg) => {
    if (!msg.trim()) return;

    // show user message instantly
    setMessages((prev) => [...prev, { sender: "user", text: msg }]);
    setIsTyping(true);

    try {
      // send user message to backend
      const res = await chatApi.post(`/${id}/message`, { text: msg });
      const botReply = res.data?.data?.botReply;

      // show bot reply
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (err) {
      console.error(err);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col justify-between flex-1 p-4 sm:p-8 md:p-10 w-full text-white">
      <ChatHeader botName={`${bot?.name} 💕`} botMood={bot?.baseMood} />

      <div className="flex-1 overflow-y-auto max-h-[70vh] mb-4 scrollbar-thin scrollbar-thumb-pink-400/40 scrollbar-track-transparent">
        <ChatMessages messages={messages} />
        {isTyping && <TypingIndicator />}
      </div>

      <ChatInput onSend={handleSendMessage} />
    </div>
  );
};

export default ChatRoom;
