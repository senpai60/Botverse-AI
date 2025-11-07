import express from "express";
import BotMemoryVault from "../models/MemoryVault.js";
import { verifyAuth } from "../middlewares/verifyAuth.js";
import { sendError, sendSuccess } from "../utils/responseHandler.js";

const router = express.Router();

// get all memories for logged user
router.get("/", verifyAuth, async (req, res, next) => {
  try {
    const userId = req.user.userId;
    const memories = await BotMemoryVault.find({ user: userId })
      .populate("bot", "name baseMood");
    sendSuccess(res, 200, "Memories fetched", memories);
  } catch (err) {
    next(err);
  }
});

export default router;
