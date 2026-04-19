import Listing from "../models/Listing.js";
import Review from "../models/Review.js";
import asyncHandler from "../middleware/asyncHandler.js";

export const getListings = asyncHandler(async (req, res) => {
  const { city, type, verified } = req.query;
  const filter = {};

  if (city) {
    filter.city = new RegExp(city, "i");
  }

  if (type) {
    filter.type = type;
  }

  if (verified) {
    filter.isVerified = verified === "true";
  }

  const listings = await Listing.find(filter).populate("owner", "name email");
  res.json(listings);
});

export const getListingById = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id).populate(
    "owner",
    "name email phone"
  );

  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }

  const reviews = await Review.find({ listing: listing._id }).populate(
    "user",
    "name"
  );

  res.json({ listing, reviews });
});

export const createListing = asyncHandler(async (req, res) => {
  const listing = await Listing.create({
    ...req.body,
    owner: req.user._id
  });

  res.status(201).json(listing);
});

export const updateListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }

  if (
    req.user.role !== "admin" &&
    listing.owner.toString() !== req.user._id.toString()
  ) {
    res.status(403);
    throw new Error("Not allowed to update this listing");
  }

  const updatedListing = await Listing.findByIdAndUpdate(req.params.id, req.body, {
    new: true
  });

  res.json(updatedListing);
});

export const getOwnerListings = asyncHandler(async (req, res) => {
  const listings = await Listing.find({ owner: req.user._id });
  res.json(listings);
});

export const verifyListing = asyncHandler(async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) {
    res.status(404);
    throw new Error("Listing not found");
  }

  listing.isVerified = true;
  await listing.save();
  res.json(listing);
});
