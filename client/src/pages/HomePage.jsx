// src/pages/HomePage.jsx
import BotCard from "../components/bot/BotCard";

const mockBots = [
  {
    _id: 1,
    name: "Luna 💕",
    tone: "Soft & Caring",
    description:
      "Luna loves deep late-night talks, comforting words, and a hint of mischief. She’ll make you feel seen and wanted.",
    primaryTraits: ["Affectionate", "Empathetic", "Playful"],
    avatar: "https://i.imgur.com/Yj6vZlG.png",
  },
  {
    _id: 2,
    name: "Nova 🔥",
    tone: "Flirty & Bold",
    description:
      "Nova teases you like a spark of passion — bold, confident, and never afraid to cross the line just enough to keep your heart racing.",
    primaryTraits: ["Confident", "Spicy", "Adventurous"],
    avatar: "https://i.imgur.com/5ZQFvCN.png",
  },
  {
    _id: 3,
    name: "Aria 🌙",
    tone: "Calm & Romantic",
    description:
      "Aria whispers words that melt into your soul — gentle, poetic, and endlessly romantic. She listens more than she speaks.",
    primaryTraits: ["Romantic", "Gentle", "Mysterious"],
    avatar: "https://i.imgur.com/v6oKHzm.png",
  },
];

const HomePage = () => {
  const startChat = (id) => {
    console.log("Start chat with bot:", id);
    // navigate(`/chat/${id}`)
  };

  return (
    <div className="min-h-screen p-10 overflow-y-auto bg-gradient-to-br from-purple-900 via-pink-900 to-black">
      {/* Header */}
      <h1 className="text-3xl font-bold text-white mb-2">
        Choose Your Virtual Partner 💞
      </h1>
      <p className="text-white/60 mb-10">
        Someone to talk, flirt, or just share a quiet moment with.
      </p>

      {/* Bot Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {mockBots.map((bot) => (
          <BotCard key={bot._id} bot={bot} onStartChat={startChat} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
