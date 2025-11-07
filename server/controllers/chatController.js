// controllers/chatController.js
import Chat from "../models/Chat.js";
import { updateBotMemory } from "../services/memoryService.js";
import { buildPrompt } from "../services/aiPromptBuilder.js";
import { generateAIReply } from "../services/aiEngine.js";
import { sendSuccess, sendError } from "../utils/responseHandler.js";

export const handleChatMessage = async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const { text } = req.body;
    const userId = req.user.userId;

    const chat = await Chat.findById(chatId).populate("bot", "name baseMood");
    if (!chat) return sendError(res, 404, "Chat not found");

    await chat.addMessage("user", text);
    const systemPrompt = await buildPrompt(userId, chat.bot._id, chat.bot.name);

    const context = chat.messages.slice(-10).map(m => ({
      role: m.sender === "user" ? "user" : "assistant",
      content: m.text,
    }));

    const aiReply = await generateAIReply(context, systemPrompt);
    await chat.addMessage("bot", aiReply);

    await updateBotMemory(chat);

    sendSuccess(res, 200, "Bot replied", { reply: aiReply });
  } catch (err) {
    console.error(err);
    next(err);
  }
};
