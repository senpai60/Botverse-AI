import jwt from "jsonwebtoken";
import { config } from "../config/env.js";

export const generateToken = (user) => {
  const payload = {
    userId: user._id,
    username: user.username,
    email: user.email,
    role: user.role || "user",
  };

  const options = {
    expiresIn: config.JWT_EXPIRES_IN,
    issuer: config.JWT_ISSUER,
    audience: config.JWT_AUDIENCE,
    subject: user._id.toString(),
    algorithm: "HS256",
  }
  return jwt.sign(payload,config.JWT_SECRET,options)
};
