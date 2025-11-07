// src/pages/HomePage.jsx
import { useEffect, useState } from "react";
import BotCard from "../components/bot/BotCard";

import { botApi } from "../api/botApi";
import { chatApi } from "../api/chatApi";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [bots, setBots] = useState([]);
  const navigate = useNavigate();

  const startChat = async (botId) => {
    try {
      const response = await chatApi.post("/", { botId: botId });
      const chatId =  response.data?.data?.chatId
      
      console.log("Start chat with bot:", chatId);
      navigate(`/chat/${chatId}`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchBots = async () => {
      try {
        const response = await botApi.get("/all");
        setBots(response.data?.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBots();
  }, []);

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
      {bots.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {bots.map((bot) => (
            <BotCard key={bot._id} bot={bot} onStartChat={startChat} />
          ))}
        </div>
      ) : (
        <p>Please Create Some Bots To Continue</p>
      )}
    </div>
  );
};

export default HomePage;
