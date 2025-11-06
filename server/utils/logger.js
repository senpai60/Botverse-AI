import winston from "winston";

export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.colorize(), // ✅ parentheses lagaye
    winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), // ✅ parentheses lagaye
    winston.format.printf(
      ({ timestamp, level, message }) => `[${timestamp}] ${level}: ${message}`
    )
  ),
  transports: [new winston.transports.Console()],
});


