import express from "express";
import {
  createClaim,
  getMyClaims,
  getAllClaims,
  updateClaimStatus,
} from "../controllers/claimController.js";

import { protect, authorize } from "../middlewares/authMiddleware.js";

const router = express.Router();

// User
router.post("/", protect, createClaim);
router.get("/", protect, getMyClaims);

// Admin
router.get("/admin", protect, authorize("admin"), getAllClaims);
router.put("/:id", protect, authorize("admin"), updateClaimStatus);

export default router;