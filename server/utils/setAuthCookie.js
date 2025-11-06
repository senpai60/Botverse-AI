// utils/setAuthCookie.js
export const setAuthCookie = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true, // 🧠 prevents JS access (security)
    secure: process.env.NODE_ENV === "production", // ✅ true only in prod (HTTPS)
    sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
    maxAge: 3 * 24 * 60 * 60 * 1000, // 🕒 7 days
  });
};
