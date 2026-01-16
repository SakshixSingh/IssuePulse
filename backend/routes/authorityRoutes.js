import express from "express";
import { getAreaDashboard } from "../controllers/authorityController.js";
import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(protect, authorize("authority"));

// Dashboard per area
router.get("/dashboard", getAreaDashboard);

export default router;
