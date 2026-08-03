import { generateSummary,  getSummaryHistory}  from "../controllers/summaryController"
import { Router } from "express"
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.get("/generate", protect, generateSummary )
router.get("/history", protect, getSummaryHistory)



export default router

