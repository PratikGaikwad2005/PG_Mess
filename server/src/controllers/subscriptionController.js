import Subscription from "../models/Subscription.js";
import Listing from "../models/Listing.js";
import asyncHandler from "../middleware/asyncHandler.js";

const addDays = (days) => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

export const createSubscription = asyncHandler(async (req, res) => {
  const { listingId, planType } = req.body;

  const listing = await Listing.findById(listingId);
  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }

  const selectedPlan = listing.mealPlans.find((plan) => plan.type === planType);
  if (!selectedPlan) {
    res.status(400);
    throw new Error("Meal plan not available");
  }

  const subscription = await Subscription.create({
    user: req.user._id,
    listing: listing._id,
    planType,
    price: selectedPlan.price,
    endDate: addDays(planType === "weekly" ? 7 : 30)
  });

  res.status(201).json(subscription);
});

export const getMySubscriptions = asyncHandler(async (req, res) => {
  const subscriptions = await Subscription.find({ user: req.user._id }).populate(
    "listing",
    "name city area type"
  );
  res.json(subscriptions);
});

export const getOwnerSubscriptions = asyncHandler(async (req, res) => {
  const ownerListings = await Listing.find({ owner: req.user._id }).select("_id");
  const listingIds = ownerListings.map((item) => item._id);

  const subscriptions = await Subscription.find({
    listing: { $in: listingIds }
  })
    .populate("user", "name email city")
    .populate("listing", "name");

  res.json(subscriptions);
});
