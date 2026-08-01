import { Router } from "express";
import { getTodayCheckIn, createCheckIn } from "../controllers/checkInController";
import { protect } from "../middleware/authMiddleware";
import { weeklyHistory } from "../controllers/weeklyHistory";

const router = Router()

router.post('/', protect, createCheckIn);
router.get("/today", protect, getTodayCheckIn)

router.get("/history", protect, weeklyHistory )


export default router