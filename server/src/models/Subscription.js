import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema(
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
    planType: {
      type: String,
      enum: ["weekly", "monthly"],
      required: true
    },
    price: {
      type: Number,
      required: true
    },
    status: {
      type: String,
      enum: ["active", "paused", "expired"],
      default: "active"
    },
    startDate: {
      type: Date,
      default: Date.now
    },
    endDate: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const Subscription = mongoose.model("Subscription", subscriptionSchema);

export default Subscription;
