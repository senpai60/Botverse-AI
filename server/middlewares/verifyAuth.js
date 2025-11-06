import jwt from "jsonwebtoken";
import { logger } from "../utils/logger.js";
import { sendError } from "../utils/responseHandler.js";
import { config } from "../config/env.js";

export const verifyAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) {
      logger.warn("[AuthMiddleware] No token found in cookies");
      return sendError(res, 401, "Unauthorized - No token provided");
    }

    const decoded = jwt.verify(token, config.JWT_SECRET);
    req.user = decoded; // store full payload for flexibility

    next();
  } catch (err) {
    logger.error(`[AuthMiddleware] JWT verification failed: ${err.message}`);
    return sendError(res, 401, "Unauthorized - Invalid or expired token");
  }
};
