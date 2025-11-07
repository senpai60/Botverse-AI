import express from "express";
import Bot from "../models/Bot.js"; 
import MemoryVault from "../models/MemoryVault.js";
import { verifyAuth } from "../middlewares/verifyAuth.js";

import { sendError, sendSuccess } from "../utils/responseHandler.js";

const router = express.Router();

// --- All Routes ---

router.get("/all", verifyAuth, async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const userBots = await Bot.find({ createdBy: userId });

    sendSuccess(res, 200, "User bots retrieved successfully", userBots);
  } catch (err) {
    next(err);
  }
});

// --- Create Route ---

router.post("/create", verifyAuth, async (req, res, next) => {
  try {
    // req.body contains the full JSON payload from your React form
    // Your client-side code already formats it perfectly (splits arrays, etc.)
    const botData = req.body;

    const newBot = new Bot({
      ...botData,
      createdBy: req.user.userId,
    });

    const savedBot = await newBot.save();
    const memoryVault = new MemoryVault.create({
        user:req.user.userId,
        bot:savedBot._id,
    })
    
    sendSuccess(res, 201, "Bot Created", savedBot);
  } catch (err) {
    // Handle validation errors (e.g., missing 'name' field)
    if (err.name === "ValidationError") {
      return sendError(res, 400, err);
    }

    next(err);
  }
});

export default router;
