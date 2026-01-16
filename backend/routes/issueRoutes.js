import express from "express";
import {
  reportIssue,
  getNearbyIssues,
  getIssueById,
  updateIssueStatus
} from "../controllers/issueController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";
import upload from "../middleware/upload.js"; // <-- Multer middleware

const router = express.Router();

// Citizen reports issue (with optional image)
router.post("/report", protect, upload.single("image"), reportIssue);

// Get issues near a location
router.get("/nearby", protect, getNearbyIssues);

// Get issue by ID
router.get("/:id", protect, getIssueById);

// Authority updates status
router.patch("/:id/status", protect, authorize("authority"), updateIssueStatus);

export default router;

