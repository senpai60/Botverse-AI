// src/components/BotCard.jsx
import { Sparkles } from "lucide-react";

const BotCard = ({ bot, onStartChat }) => {
  return (
    <div className="relative bg-gradient-to-br from-pink-300/30 to-purple-500/20 rounded-3xl border border-white/20 backdrop-blur-md shadow-xl p-5 transition-all hover:scale-[1.03] hover:shadow-pink-500/20 group">
      {/* Avatar */}
      <div className="flex items-center gap-4">
        <img
          src={bot.avatar || "https://i.imgur.com/ylXKf2N.png"}
          alt={bot.name}
          className="w-16 h-16 rounded-full border border-white/30 shadow-md"
        />
        <div>
          <h3 className="text-lg font-semibold text-white">{bot.name}</h3>
          <p className="text-sm text-pink-100/70 italic">{bot.tone}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-sm text-white/70 mt-3 line-clamp-3">{bot.description}</p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mt-3">
        {bot.primaryTraits?.slice(0, 3).map((trait, i) => (
          <span
            key={i}
            className="px-3 py-1 bg-white/10 text-xs text-pink-200 rounded-full border border-pink-300/20"
          >
            {trait}
          </span>
        ))}
      </div>

      {/* CTA Button */}
      <button
        onClick={() => onStartChat(bot._id)}
        className="mt-4 w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white py-2 rounded-xl flex items-center justify-center gap-2 font-medium transition-all hover:brightness-110 hover:shadow-pink-400/50"
      >
        <Sparkles className="w-4 h-4" /> Start Chat
      </button>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-pink-400/10 to-purple-400/10 opacity-0 group-hover:opacity-100 blur-xl transition-all" />
    </div>
  );
};

export default BotCard;
