import express from "express";
const router = express.Router();

import usersRoute from "./users.js";
import botRoute from "./botRoutes.js";
import chatsRoute from "./chatRoutes.js";
import memoryRoutes from "./memoryRoutes.js";

router.get("/", function (req, res, next) {
  res.render("index", { title: "Express" });
});

router.use("/users", usersRoute);
router.use("/bot", botRoute);
router.use("/chats", chatsRoute);
router.use("/memory", memoryRoutes);


export default router;
