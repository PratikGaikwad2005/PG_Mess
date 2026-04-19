import Listing from "../models/Listing.js";
import Review from "../models/Review.js";
import asyncHandler from "../middleware/asyncHandler.js";

const refreshListingRating = async (listingId) => {
  const reviews = await Review.find({ listing: listingId });
  const total = reviews.reduce((sum, item) => sum + item.rating, 0);
  const average = reviews.length ? total / reviews.length : 0;

  await Listing.findByIdAndUpdate(listingId, {
    averageRating: Number(average.toFixed(1)),
    totalReviews: reviews.length
  });
};

export const addReview = asyncHandler(async (req, res) => {
  const { listingId, rating, comment } = req.body;

  const review = await Review.create({
    user: req.user._id,
    listing: listingId,
    rating,
    comment
  });

  await refreshListingRating(listingId);
  res.status(201).json(review);
});
