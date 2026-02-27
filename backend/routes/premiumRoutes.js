import express from "express";
import { calculatePremium } from "../controllers/premiumController.js";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/calculate", protect, calculatePremium);

export default router;