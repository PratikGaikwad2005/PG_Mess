import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Listing from "../models/Listing.js";
import User from "../models/User.js";

dotenv.config();

const seed = async () => {
  await connectDB();

  await Promise.all([User.deleteMany(), Listing.deleteMany()]);

  const users = await Promise.all([
    {
      name: "Admin User",
      email: "admin@example.com",
      password: "admin123",
      role: "admin",
      city: "Pune"
    },
    {
      name: "Owner One",
      email: "owner@example.com",
      password: "owner123",
      role: "owner",
      city: "Pune"
    },
    {
      name: "Student Demo",
      email: "student@example.com",
      password: "student123",
      role: "student",
      city: "Pune"
    }
  ].map((user) => User.create(user)));

  await Listing.insertMany([
    {
      owner: users[1]._id,
      name: "Sunrise Student Mess",
      type: "mess",
      city: "Pune",
      area: "Kothrud",
      address: "Near MIT Corner, Pune",
      geo: { lat: 18.5074, lng: 73.8077 },
      description: "Affordable homemade meals for students with flexible subscriptions.",
      amenities: ["North Indian", "South Indian", "Tiffin Delivery"],
      cuisineTags: ["veg", "student-budget"],
      isVerified: true,
      averageRating: 4.6,
      totalReviews: 28,
      weeklyMenu: {
        monday: ["Poha", "Dal Rice", "Roti Sabzi"],
        tuesday: ["Upma", "Rajma Chawal", "Chapati Paneer"],
        wednesday: ["Idli", "Sambar Rice", "Mix Veg"],
        thursday: ["Paratha", "Chole Rice", "Dal Fry"],
        friday: ["Dosa", "Veg Pulao", "Aloo Matar"],
        saturday: ["Sandwich", "Khichdi", "Kadhi Rice"],
        sunday: ["Puri Bhaji", "Special Thali", "Jeera Rice"]
      },
      mealPlans: [
        {
          type: "weekly",
          price: 699,
          mealsPerDay: 2,
          features: ["Lunch and dinner", "One free sweet dish"]
        },
        {
          type: "monthly",
          price: 2499,
          mealsPerDay: 2,
          features: ["Priority delivery", "Sunday special meal"]
        }
      ]
    }
  ]);

  console.log("Seed data inserted");
  await mongoose.connection.close();
};

seed().catch(async (error) => {
  console.error(error);
  await mongoose.connection.close();
  process.exit(1);
});
