import { getDashboard } from "../controllers/dashboardController";
import { protect } from "../middleware/authMiddleware";
import Router from "./authRoutes";

const router = Router;

router.get("/", protect, getDashboard);


export default router