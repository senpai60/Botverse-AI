import dotenv from "dotenv";
dotenv.config();

export const config = {
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || 3000,
  MONGO_URI: process.env.MONGO_URI,

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_ISSUER: process.env.JWT_ISSUER || "FlirtAI",
  JWT_AUDIENCE: process.env.JWT_AUDIENCE || "FlirtAI-users",
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN || "7d",
  CLIENT_URI: process.env.CLIENT_URI || "http://localhost:5173",
  OPENAI_API_KEY:process.env.OPENAI_API_KEY,
  GROQ_API_KEY:process.env.GROQ_API_KEY,
};
