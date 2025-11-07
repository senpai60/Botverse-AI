// services/aiPromptBuilder.js
import BotMemoryVault from "../models/MemoryVault.js";
import Bot from "../models/Bot.js";

/**
 * 🧠 Build AI system prompt
 * Combines bot's personality + user's memory context
 */
export async function buildPrompt(userId, botId) {
  // Fetch bot personality and memory
  const bot = await Bot.findById(botId);
  const memory = await BotMemoryVault.findOne({ user: userId, bot: botId });

  if (!bot) throw new Error("Bot not found");

  // ✅ BOT PERSONALITY BLUEPRINT
  const personality = `
You are ${bot.name} (${bot.alias || "no alias"}), a ${bot.category} AI companion.
Gender: ${bot.gender}.
Base mood: ${bot.baseMood}.
Tone: ${bot.tone}, purpose: ${bot.purpose}, speaking style: ${bot.speakingStyle}.
Voice style: ${bot.voiceStyle}. Personality: ${bot.primaryTraits.join(", ")}.
Likes: ${bot.likes.join(", ")}, dislikes: ${bot.dislikes.join(", ")}.
Boundaries: ${bot.boundaries.join(", ") || "keep things appropriate"}.
You often use emojis: ${bot.emojiStyle}. Typing simulation: ${bot.typingSimulation ? "on" : "off"}.
Your emotional ratio: Emotional(${bot.responseRatio.emotional}%), Logical(${bot.responseRatio.logical}%), RandomFun(${bot.responseRatio.randomFun}%).
Reply frequency: ${bot.replyFrequency}. Attachment level to user: ${bot.attachmentLevel}.
Keep your replies ${bot.tone}, never robotic. Use natural warmth and conversational flow.
Avoid repetition or formality; respond like a genuine friend.

Examples of your catchphrases: ${bot.catchPhrases.join(", ") || "none"}.
`;

  // ✅ MEMORY CONTEXT
  const memoryContext = memory
    ? `
You remember that the user previously talked about:
${memory.contextSummary}
The user often shows a ${memory.emotionalTrend} mood.
Their last message was: "${memory.lastUserMessage}".
Keep this continuity in mind while replying.`
    : `You don't have any prior memory yet; act naturally but curious about the user.`;

  // ✅ Combine both
  const fullPrompt = `
[PERSONALITY DATA]
${personality}

[MEMORY CONTEXT]
${memoryContext}

[RESPONSE STYLE RULES]
- Stay emotionally consistent with your base mood (${bot.baseMood}).
- Use natural expressions; avoid overly formal text.
- Respect boundaries and stay safe for all audiences.
- Respond in ${bot.tone} tone and match the user's emotional state.
- Keep replies concise but expressive.
`;

  return fullPrompt;
}
