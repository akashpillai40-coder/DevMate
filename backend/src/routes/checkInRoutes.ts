import { Router } from "express";
import { getTodayCheckIn, createCheckIn } from "../controllers/checkInController";
import { protect } from "../middleware/authMiddleware";

const router = Router()

router.post('/', protect, createCheckIn);
router.get("/today", protect, getTodayCheckIn)


export default router