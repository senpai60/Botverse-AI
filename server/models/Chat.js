import mongoose from "mongoose";

/**
 * 💬 Chat Model
 * Stores all user-bot message exchanges (conversation history).
 *
 * Each chat session links to:
 *  - user (who is chatting)
 *  - bot (AI persona)
 *  - messages (user ↔ bot conversation logs)
 * 
 * MemoryVault uses this data to summarize emotional tone or recall context.
 */

const messageSchema = new mongoose.Schema(
  {
    sender: {
      type: String,
      enum: ["user", "bot", "system"],
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    emotionDetected: {
      type: String,
      enum: ["positive", "neutral", "negative"],
      default: "neutral",
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  },
  { _id: false }
);

const chatSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bot: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bot",
      required: true,
    },

    // 📚 Full message history for this conversation
    messages: [messageSchema],

    // 🧠 Chat state
    active: { type: Boolean, default: true },
    lastUserMessage: { type: String, default: "" },
    lastBotMessage: { type: String, default: "" },
    lastEmotion: { type: String, default: "neutral" },
    contextSummary: { type: String, default: "" },

    // 🕒 Time tracking
    startedAt: { type: Date, default: Date.now },
    lastUpdated: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// 🧩 Pre-save hook to auto-update timestamps
chatSchema.pre("save", function (next) {
  this.lastUpdated = new Date();
  next();
});

// 🧩 Add new message helper
chatSchema.methods.addMessage = async function (sender, text, emotion = "neutral") {
  this.messages.push({ sender, text, emotionDetected: emotion });
  if (sender === "user") this.lastUserMessage = text;
  else if (sender === "bot") this.lastBotMessage = text;
  this.lastEmotion = emotion;
  this.lastUpdated = new Date();
  await this.save();
};

export default mongoose.model("Chat", chatSchema);
