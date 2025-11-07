// services/aiEngine.js
import OpenAI from "openai";
import Groq from "groq-sdk";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// 🚨 Basic moderation (safe filter)
function moderate(text) {
  const blocked = /(nsfw|violence|hate|explicit)/i;
  if (blocked.test(text)) throw new Error("⚠️ Unsafe message detected");
}

// 🧠 Try OpenAI first, fallback to Groq
export async function generateAIReply(messages, systemPrompt) {
  const combined = [{ role: "system", content: systemPrompt }, ...messages];

  try {
    const res = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: combined,
      temperature: 0.8,
      max_tokens: 250,
    });
    return res.choices[0].message.content.trim();
  } catch (err) {
    console.warn("⚠️ OpenAI failed → fallback to Groq");
    const res = await groq.chat.completions.create({
      model: "mixtral-8x7b-32768",
      messages: combined,
    });
    return res.choices[0].message.content.trim();
  }
}
