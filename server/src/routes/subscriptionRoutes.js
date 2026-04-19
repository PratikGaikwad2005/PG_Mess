import express from "express";
import {
  createSubscription,
  getMySubscriptions,
  getOwnerSubscriptions
} from "../controllers/subscriptionController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("student"), createSubscription);
router.get("/mine", protect, authorize("student"), getMySubscriptions);
router.get("/owner", protect, authorize("owner"), getOwnerSubscriptions);

export default router;
