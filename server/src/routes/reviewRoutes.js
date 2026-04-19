import express from "express";
import { addReview } from "../controllers/reviewController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("student"), addReview);

export default router;
