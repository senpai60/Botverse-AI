// services/memoryService.js
import BotMemoryVault from "../models/MemoryVault.js";
import { detectEmotion } from "../utils/emotionAnalysis.js";

// ✨ Simple keyword extractor
function extractKeywords(text) {
  return [...new Set(text.toLowerCase().match(/\b[a-z]{4,}\b/g))].slice(0, 10);
}

// 🧠 Create a summary of the chat context
function summarizeContext(messages) {
  const lastMsgs = messages.slice(-5)
    .map(m => `${m.sender}: ${m.text}`)
    .join(" | ");
  return `Summary of recent chat: ${lastMsgs}`;
}

// 🔄 Update memory vault after chat changes
export async function updateBotMemory(chat) {
  const { user, bot, messages } = chat;
  const lastUserMessage = messages.filter(m => m.sender === "user").at(-1);
  const lastBotMessage = messages.filter(m => m.sender === "bot").at(-1);
  const emotion = detectEmotion(lastUserMessage?.text || "");

  let memory = await BotMemoryVault.findOne({ user, bot });
  if (!memory) memory = await BotMemoryVault.create({ user, bot });

  const text = messages.map(m => m.text).join(" ");
  const keywords = extractKeywords(text);
  const summary = summarizeContext(messages);

  const sessionData = {
    lastUserMessage: lastUserMessage?.text || "",
    lastBotMessage: lastBotMessage?.text || "",
    messageCount: messages.length,
    keywords,
    moodTrend: emotion,
    summary,
  };

  await memory.updateMemory(sessionData);
  await memory.decayMemory();

  console.log(`✅ Memory updated for user ${user} & bot ${bot}`);
  return memory;
}
