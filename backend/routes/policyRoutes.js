import express from "express";
import {
  createPolicy,
  getPolicies,
  getPolicyById,
  updatePolicy,
  deletePolicy,
} from "../controllers/policyController.js";

import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/")
  .post(protect, createPolicy)
  .get(protect, getPolicies);

router.route("/:id")
  .get(protect, getPolicyById)
  .put(protect, updatePolicy)
  .delete(protect, deletePolicy);

export default router;