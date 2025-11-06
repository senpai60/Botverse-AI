// src/components/chatroom/TypingIndicator.jsx
const TypingIndicator = () => {
  return (
    <div className="flex items-center gap-2 mb-3">
      <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" />
      <div className="w-3 h-3 bg-pink-300 rounded-full animate-bounce delay-150" />
      <div className="w-3 h-3 bg-pink-200 rounded-full animate-bounce delay-300" />
      <span className="text-sm text-pink-200 ml-2">typing...</span>
    </div>
  );
};

export default TypingIndicator;
