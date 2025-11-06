import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import { fileURLToPath } from "url";
import { dirname } from "path";
import { config } from "dotenv";
import { errorHandler } from "./middlewares/errorHandler.js";
import indexRouter from "./routes/index.js";

// 🧩 Load .env

// Path helpers
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ⚙️ Initialize app
const app = express();

// --- Security + Performance Middlewares ---
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(compression());

// --- Parsers ---
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// --- Logger ---
app.use(morgan("dev"));

// --- Rate Limiter ---
const limiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 20,
  message: { error: "Too many requests, please try again later." },
});
app.use(limiter);

// --- Static Files ---
app.use(express.static(path.join(__dirname, "public")));

// --- Routes ---
app.use("/", indexRouter);

// --- Health Check Route ---
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "✅ Server is running smoothly!",
    uptime: process.uptime(),
  });
});

// --- Global Error Handler ---
app.use(errorHandler);

export default app;
