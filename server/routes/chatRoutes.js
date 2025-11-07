import express from "express";
const router = express.Router();

import { verifyAuth } from "../middlewares/verifyAuth.js";
import { sendError, sendSuccess } from "../utils/responseHandler.js";

import Chat from "../models/Chat.js";

/**
 * @route   GET /api/chats
 * @desc    Get all chat sessions for the logged-in user
 * @access  Private
 */
router.get("/", verifyAuth, async (req, res, next) => {
  try {
    const userId = req.user.userId;

    // FIX: Changed "Bot" to "bot" (must match the schema field name)
    const chats = await Chat.find({ user: userId })
      .populate("bot", "_id name")
      .lean();

    // FIX: `find()` returns an empty array `[]` (which is truthy), not null.
    // We must check the length.
    if (!chats || chats.length === 0) {
      // FIX: Send 200 (OK) with an empty array. This isn't an error.
      return sendSuccess(res, 200, "No chats found.", []);
    }

    // FIX: Status code for a successful GET is 200, not 201.
    sendSuccess(res, 200, "OK", chats);
  } catch (err) {
    next(err);
  }
});

/**
 * @route   GET /api/chats/bot/:botId
 * @desc    Get a specific chat session by the BOT's ID
 * @access  Private
 *
 * NOTE: Path changed from "/:botId" to "/bot/:botId" to avoid
 * conflict with the "/:chatId" route.
 */
router.get("/bot/:botId", verifyAuth, async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { botId } = req.params;

    // FIX: Added 'await' and use 'findOne' since a user has one chat per bot.
    const chat = await Chat.findOne({ bot: botId, user: userId })
      .populate("bot", "_id name")
      .lean(); // .lean() for a plain JS object if no more Mongoose methods are needed.

    // FIX: Added a check for "not found"
    if (!chat) {
      return sendError(res, 404, "No chat found with this bot.");
    }

    // FIX: Added a success response
    sendSuccess(res, 200, "Chat retrieved", chat);
  } catch (err) {
    // Handle invalid Mongo ID format
    if (err.name === 'CastError') {
      return sendError(res, 400, "Invalid Bot ID format.");
    }
    next(err);
  }
});

/**
 * @route   GET /api/chats/:chatId
 * @desc    Get a specific chat session by its OWN ID
 * @access  Private
 */
// FIX: Added 'async'
router.get("/:chatId", verifyAuth, async (req, res, next) => {
  try {
    const { chatId } = req.params;
    const userId = req.user.userId;

    // FIX: Added 'await'
    const chat = await Chat.findById(chatId)
    .populate("bot", "name _id baseMood")
    .lean();

    // FIX: Add check if chat exists
    if (!chat) {
      return sendError(res, 404, "Chat not found.");
    }

    // FIX: CRITICAL SECURITY CHECK (IDOR)
    // Ensure the person requesting the chat is the person who owns it.
    if (chat.user.toString() !== userId) {
      return sendError(res, 403, "Forbidden: You do not have access to this chat.");
    }

    // FIX: Added a success response
    sendSuccess(res, 200, "OK", chat);
  } catch (err) {
    // Handle invalid Mongo ID format
    if (err.name === 'CastError') {
      return sendError(res, 400, "Invalid Chat ID format.");
    }
    next(err);
  }
});

/**
 * @route   POST /api/chats
 * @desc    Create a new chat session (or get existing one)
 * @access  Private
 *
 * This route was already well-written. No changes needed.
 */
router.post("/", verifyAuth, async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const { botId } = req.body;

    if (!botId) {
      return sendError(res, 400, "Bot ID is required to start a chat.");
    }

    // 1. Check if a chat already exists between the user and this bot
    let existingChat = await Chat.findOne({ bot: botId, user: userId })
      .populate("bot", "_id name")
      .lean();

    if (existingChat) {
      // 2. If it exists, return the existing chat
      return sendSuccess(res, 200, "Existing chat retrieved.", { chatId: existingChat._id, botId: existingChat.bot._id, messages: existingChat.messages });
    }

    // 3. If it does not exist, create a new chat
    const newChat = await Chat.create({
      user: userId,
      bot: botId,
      messages: [
        {
          sender: "system",
          text: "Chat started. The bot will begin the conversation now.",
        },
      ],
    });

    // We fetch the new chat again to populate the bot details before sending.
    const createdChat = await newChat.populate("bot", "_id name");

    sendSuccess(res, 201, "New chat created successfully.", { chatId: createdChat._id, botId: createdChat.bot._id, messages: createdChat.messages });

  } catch (err) {
    // Handle potential Mongoose casting errors (e.g., invalid botId format)
    if (err.name === 'CastError') {
        return sendError(res, 400, "Invalid Bot ID format.");
    }
    next(err);
  }
});

export default router;