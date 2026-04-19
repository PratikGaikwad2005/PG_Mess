import mongoose from "mongoose";

const mealLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    listing: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Listing",
      required: true
    },
    mealType: {
      type: String,
      enum: ["breakfast", "lunch", "dinner"],
      required: true
    },
    mealDate: {
      type: String,
      required: true
    },
    items: [String]
  },
  {
    timestamps: true
  }
);

const MealLog = mongoose.model("MealLog", mealLogSchema);

export default MealLog;
