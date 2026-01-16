import express from "express";
import {
  getPendingIssues,
  verifyIssue,
  rejectIssue,
  mergeIssues
} from "../controllers/modController.js";

import { protect, authorize } from "../middleware/authMiddleware.js";

const router = express.Router();

// Moderator only routes
router.use(protect, authorize("moderator"));

// Get all pending issues
router.get("/issues/pending", getPendingIssues);

// Verify an issue
router.patch("/issues/:id/verify", verifyIssue);

// Reject an issue
router.patch("/issues/:id/reject", rejectIssue);

// Merge duplicates
router.patch("/issues/merge", mergeIssues);

export default router;
