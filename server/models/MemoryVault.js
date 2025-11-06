import mongoose from "mongoose";

/**
 * 🧠 BotMemoryVault Schema
 * Acts as a persistent “memory” system between a User and a Bot.
 *
 * - Stores extracted context from chat (keywords, emotions, last topics)
 * - Helps the bot recall past experiences, preferences, or emotional tone
 * - Can be updated after each chat session or periodically
 */

const botMemoryVaultSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  bot: { type: mongoose.Schema.Types.ObjectId, ref: "Bot", required: true },
      // 🧠 Core Memory Data

  contextSummary: {
    type: String,
    default: "No significant context yet.",
    trim: true,
  },
// 🗝️ Keywords & Concepts extracted from chat
    memoryKeywords: {
      type: [String],
      default: [],
    },
 // ❤️ Emotional tracking
     emotionalTrend: {
      type: String,
      enum: ["positive", "neutral", "negative"],
      default: "neutral",
    },
    emotionalCues: [
      {
        mood: { type: String, enum: ["positive", "negative", "neutral"] },
        text: { type: String },
        timestamp: { type: Date, default: Date.now },
      },
    ],

     // 🗨️ Chat Memory Snapshots
    lastUserMessage: { type: String, default: "" },
    lastBotMessage: { type: String, default: "" },
    totalMessages: { type: Number, default: 0 },

    // 📆 Temporal Memory
    lastInteraction: { type: Date, default: Date.now },
    lastMoodDetected: { type: String, default: "neutral" },

    // 🧩 Behavioral Memory
    recurringTopics: { type: [String], default: [] },
    personalityShiftDetected: { type: Boolean, default: false },

    // ☁️ AI Integration Metadata
    lastSyncedToAI: { type: Date, default: null },
    aiTokensUsed: { type: Number, default: 0 },
    aiModelUsed: { type: String, default: "gpt-5" },

    // 📋 Internal Notes (optional dev use)
    notes: { type: String, default: "" },

},{timestamps:true});

// 🧩 Utility method: update memory from chat session
botMemoryVaultSchema.methods.updateMemory = async function (sessionData) {
  if (!sessionData) return;

  this.lastUserMessage = sessionData.lastUserMessage || this.lastUserMessage;
  this.lastBotMessage = sessionData.lastBotMessage || this.lastBotMessage;
  this.totalMessages += sessionData.messageCount || 0;
  this.memoryKeywords = [
    ...new Set([...this.memoryKeywords, ...(sessionData.keywords || [])]),
  ];
  this.emotionalTrend = sessionData.moodTrend || this.emotionalTrend;
  this.contextSummary = sessionData.summary || this.contextSummary;
  this.lastInteraction = new Date();
  await this.save();
};

// 🧩 Auto decay old memories (optional future upgrade)
botMemoryVaultSchema.methods.decayMemory = async function () {
  const decayThreshold = 100; // messages
  if (this.totalMessages > decayThreshold) {
    this.memoryKeywords = this.memoryKeywords.slice(-10);
    this.emotionalCues = this.emotionalCues.slice(-5);
  }
  await this.save();
};

export default mongoose.model("BotMemoryVault", botMemoryVaultSchema);
