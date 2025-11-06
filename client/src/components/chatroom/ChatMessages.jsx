// src/components/chatroom/ChatMessages.jsx
const ChatMessages = ({ messages }) => {
  return (
    <div className="flex-1 overflow-y-auto space-y-4 mb-4 scrollbar-thin scrollbar-thumb-pink-400/40 scrollbar-track-transparent">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={`flex ${
            msg.sender === "user" ? "justify-end" : "justify-start"
          }`}
        >
          <div
            className={`max-w-[80%] sm:max-w-[70%] p-3 rounded-2xl text-sm sm:text-base ${
              msg.sender === "user"
                ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-br-none"
                : "bg-white/10 text-white/90 rounded-bl-none"
            }`}
          >
            {msg.text}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatMessages;
