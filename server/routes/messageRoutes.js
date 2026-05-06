import express from "express";
import { protectRoute } from "../middleware/auth.js";
import { getMessages, getUsersforSidebar, markMessageAsSeen, sendMessage, clearMessages, deleteChat } from "../controllers/messageController.js";

const messageRouter = express.Router();

messageRouter.get("/users", protectRoute, getUsersforSidebar);
messageRouter.get("/:id", protectRoute, getMessages);
messageRouter.put("/mark/:id", protectRoute, markMessageAsSeen);
messageRouter.post("/send/:id", protectRoute, sendMessage);
messageRouter.delete("/clear/:id",protectRoute, clearMessages);
messageRouter.delete("/delete/:id",protectRoute, deleteChat);


export default messageRouter;