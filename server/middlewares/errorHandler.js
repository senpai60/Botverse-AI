import {logger} from "../utils/logger.js";

export const errorHandler = (err, req, res, next) => {
  // Check if statusCode is not set or is still in success range
  let statusCode = res.statusCode;

  if (!statusCode || (statusCode >= 200 && statusCode < 300)) {
    statusCode = 500; // default for unhandled server errors
  }

  // 🧩 Log error details
  const errorDetails = `[${req.method}] ${req.originalUrl} → ${statusCode} | ${err.message}`;
  logger.error(errorDetails);

  // Optional: include stack in logs (only in dev)
  if (process.env.NODE_ENV !== "production" && err.stack) {
    logger.debug(err.stack);
  }

  // 🧱 Send clean response
  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};
