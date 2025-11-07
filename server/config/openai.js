// server/config/openai.js
import OpenAI from "openai";
import { config } from "./env.js";

export const openai = new OpenAI({
  apiKey: config.OPENAI_API_KEY,
});

/**
 * Generate a bot reply based on conversation context
 */
export async function generateBotReply(context, userMessage, botName = "Your AI") {
  try {
    const messages = [
      {
        role: "system",
        content: `You are ${botName}, a flirty and emotionally aware companion who talks in a warm, natural tone.`,
      },
      ...context.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.text,
      })),
      { role: "user", content: userMessage },
    ];

    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini", // cheaper, fast model
      messages,
      temperature: 0.8,
      max_tokens: 200,
    });

    return response.choices[0].message.content.trim();
  } catch (err) {
    console.error("OpenAI Error:", err.message);
    return "I'm sorry love, I got a bit confused 😅";
  }
}
