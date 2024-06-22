import { Router } from "express";
import { getMessages, postMessage } from "../controllers/chatController";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.get("/messages", authenticateToken, getMessages);
router.post("/messages", authenticateToken, postMessage);

export default router;
