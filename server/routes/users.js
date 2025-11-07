import express from "express";
const router = express.Router();

import bcrypt from "bcrypt";
import { config } from "../config/env.js";
import { verifyAuth } from "../middlewares/verifyAuth.js";
import { generateToken } from "../utils/generateToken.js";
import { setAuthCookie } from "../utils/setAuthCookie.js";
import { sendError, sendSuccess } from "../utils/responseHandler.js";

// --- Database Models ---
import User from "../models/User.js";

/* ======================
 ✅ Verify Authenticated User
====================== */
router.get("/verifyUser", verifyAuth, (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      return sendError(res, 401, "Unauthorized - Invalid or missing token");
    }
    return sendSuccess(res, 200, "User verified successfully", { user });
  } catch (err) {
    next(err);
  }
});

/* ======================
 ✅ Signup Route
====================== */
router.post("/signup", async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    // 1️⃣ Basic validation
    if (!username || !email || !password)
      return sendError(res, 400, "Please fill all required fields");

    // 2️⃣ Check for existing user
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return sendError(res, 409, "User already exists with this email");

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4️⃣ Create new user
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    // 5️⃣ Generate JWT
    const token = generateToken(newUser);

    // 6️⃣ Set cookie
    setAuthCookie(res, token);

    // 7️⃣ Respond success
    return sendSuccess(res, 201, "User created successfully", {
      user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    next(err);
  }
});

/* ======================
 ✅ Login Route
====================== */
router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("🧠 LOGIN BODY:", req.body);

    if (!email || !password)
      return sendError(res, 400, "Please fill all required fields");

    const user = await User.findOne({ email });
    if (!user) return sendError(res, 404, "No account found with this email");

    console.log("🧠 USER FOUND:", user);
    console.log("🧠 PASSWORD FROM BODY:", password);
    console.log("🧠 HASH FROM DB:", user.password);

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) return sendError(res, 401, "Invalid email or password");

    const token = generateToken(user);
    setAuthCookie(res, token);

    return sendSuccess(res, 200, "Login successful", {
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (err) {
    console.error("❌ LOGIN ERROR:", err.message);
    next(err);
  }
});


/* ======================
 ✅ Logout Route
====================== */
router.post("/logout", (req, res, next) => {
  try {
    res.clearCookie("authToken", {
      httpOnly: true,
      secure: config.NODE_ENV === "production",
      sameSite: "strict",
    });

    return sendSuccess(res, 200, "Logged out successfully");
  } catch (err) {
    next(err);
  }
});

export default router;
