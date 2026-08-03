import { Router } from "express";
import {  createCheckIn, getTodayCheckIn, weeklyHistory,  getStreaks , rewrite,} from "../controllers/checkInController";
import { protect } from "../middleware/authMiddleware";


const router = Router()


router.post('/', protect, createCheckIn);
router.get("/today", protect, getTodayCheckIn)
router.get("/history", protect, weeklyHistory )
router.get("/streaks", protect, getStreaks)
router.post("/rewrite", protect, rewrite)




export default router