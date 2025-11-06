// src/components/chatroom/ChatHeader.jsx
const ChatHeader = ({ botName, botMood }) => {
  return (
    <div className="flex items-center gap-4 border-b border-white/10 pb-3 mb-4">
      <img
        src="https://i.imgur.com/Yj6vZlG.png"
        alt={botName}
        className="w-12 h-12 rounded-full border border-white/20 shadow-md"
      />
      <div>
        <h2 className="text-xl font-semibold">{botName}</h2>
        <p className="text-sm text-white/60">{botMood}</p>
      </div>
      <div className="ml-auto text-sm text-pink-300 italic">Online 🩷</div>
    </div>
  );
};

export default ChatHeader;
