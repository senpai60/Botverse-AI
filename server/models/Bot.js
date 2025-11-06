import mongoose from "mongoose";

const botSchema = new mongoose.Schema(
  {
    // 1️⃣ Identity
    name: { type: String, required: true },
    alias: { type: String },
    gender: { type: String },
    ageRange: { type: String },
    category: { type: String, required: true },
    description: { type: String },
    purpose: { type: String },
    tone: { type: String },
    voiceStyle: { type: String },
    exampleIntro: { type: String },

    // 2️⃣ Personality Core
    primaryTraits: [String],
    secondaryTraits: [String],
    likes: [String],
    dislikes: [String],
    values: [String],
    fears: [String],
    signatureBehaviors: [String],
    catchPhrases: [String],

    // 3️⃣ Emotional Engine
    baseMood: { type: String, default: "neutral" },
    emotionRange: { type: Number, default: 5 },
    moodShifts: { type: String },
    triggersPositive: [String],
    triggersNegative: [String],
    moodRecoveryStyle: { type: String },

    // 4️⃣ Interaction Logic
    speakingStyle: { type: String },
    replyFrequency: { type: String },
    engagementHooks: [String],
    responseRatio: {
      emotional: { type: Number, default: 60 },
      logical: { type: Number, default: 30 },
      randomFun: { type: Number, default: 10 },
    },
    reactionPatterns: [String],
    emojiStyle: { type: String },
    typingSimulation: { type: Boolean, default: false },

    // 5️⃣ Relationship Dynamics
    userRole: { type: String },
    attachmentLevel: { type: String, enum: ["low", "medium", "high"], default: "medium" },
    boundaries: [String],
    growthPattern: { type: String },
    jealousyLevel: { type: Number, min: 0, max: 10, default: 3 },
    memoryRetention: { type: String, default: "short-term" },

    // 6️⃣ Behavioral Modifiers
    timeBasedChanges: [String],
    eventTriggers: [String],
    keywordBias: [String],
    moodMultipliers: [String],
    personalityShiftIntensity: { type: Number, min: 0, max: 10, default: 5 },

    // 7️⃣ Data + AI Config
    promptBase: { type: String },
    temperature: { type: Number, default: 0.7 },
    topP: { type: Number, default: 0.9 },
    frequencyPenalty: { type: Number, default: 0 },
    memorySystem: { type: String },
    trainingNotes: { type: String },
    modelPreference: { type: String, default: "gpt-5" },

    // 8️⃣ Developer Notes
    createdBy: { type: String },
    createdAt: { type: Date, default: Date.now },
    version: { type: String, default: "1.0" },
    lastUpdated: { type: Date, default: Date.now },
    futureImprovements: [String],
    integrationNotes: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("Bot", botSchema);
