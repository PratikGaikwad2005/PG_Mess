import express from "express";
import { getMyMeals, logMeal } from "../controllers/mealController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, authorize("student"), logMeal);
router.get("/mine", protect, authorize("student"), getMyMeals);

export default router;
