import mongoose from "mongoose";

const mealPlanSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enum: ["weekly", "monthly"],
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    mealsPerDay: {
      type: Number,
      required: true
    },
    features: [String]
  },
  { _id: false }
);

const listingSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    type: {
      type: String,
      enum: ["pg", "mess", "hybrid"],
      required: true
    },
    city: {
      type: String,
      required: true,
      trim: true
    },
    area: {
      type: String,
      required: true,
      trim: true
    },
    address: {
      type: String,
      required: true
    },
    geo: {
      lat: Number,
      lng: Number
    },
    description: {
      type: String,
      required: true
    },
    amenities: [String],
    cuisineTags: [String],
    isVerified: {
      type: Boolean,
      default: false
    },
    averageRating: {
      type: Number,
      default: 0
    },
    totalReviews: {
      type: Number,
      default: 0
    },
    weeklyMenu: {
      monday: [String],
      tuesday: [String],
      wednesday: [String],
      thursday: [String],
      friday: [String],
      saturday: [String],
      sunday: [String]
    },
    mealPlans: [mealPlanSchema]
  },
  {
    timestamps: true
  }
);

const Listing = mongoose.model("Listing", listingSchema);

export default Listing;
