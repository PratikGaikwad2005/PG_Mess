import Listing from "../models/Listing.js";
import Subscription from "../models/Subscription.js";
import User from "../models/User.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const getDashboardStats = asyncHandler(async (req, res) => {
  const [users, listings, activeSubscriptions, verifiedListings] = await Promise.all([
    User.countDocuments(),
    Listing.countDocuments(),
    Subscription.countDocuments({ status: "active" }),
    Listing.countDocuments({ isVerified: true })
  ]);

  const popularListings = await Listing.find()
    .sort({ averageRating: -1, totalReviews: -1 })
    .limit(5)
    .select("name city averageRating totalReviews");

  res.json({
    overview: {
      users,
      listings,
      activeSubscriptions,
      verifiedListings
    },
    popularListings
  });
});
