import MealLog from "../models/MealLog.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const logMeal = asyncHandler(async (req, res) => {
  const meal = await MealLog.create({
    ...req.body,
    user: req.user._id
  });

  res.status(201).json(meal);
});

export const getMyMeals = asyncHandler(async (req, res) => {
  const meals = await MealLog.find({ user: req.user._id })
    .populate("listing", "name")
    .sort({ createdAt: -1 });

  res.json(meals);
});
