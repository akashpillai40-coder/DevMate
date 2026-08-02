import { Router } from "express";
import { getTodayCheckIn, createCheckIn, rewrite } from "../controllers/checkInController";
import { protect } from "../middleware/authMiddleware";
import { weeklyHistory } from "../controllers/weeklyHistory";

const router = Router()

router.get("/today", protect, getTodayCheckIn)
router.post('/', protect, createCheckIn);


router.get("/history", protect, weeklyHistory )

router.post("/rewrite", protect, rewrite)


export default router