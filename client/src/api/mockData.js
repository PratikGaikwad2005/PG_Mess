export const featuredListings = [
  {
    id: 1,
    name: "Sunrise Student Mess",
    type: "Mess",
    location: "Kothrud, Pune",
    price: "INR 2,499/month",
    rating: 4.6,
    verified: true,
    distance: "0.8 km away",
    vibe: "Best for budget-friendly daily meals"
  },
  {
    id: 2,
    name: "Urban Nest PG + Meals",
    type: "Hybrid",
    location: "Baner, Pune",
    price: "INR 8,999/month",
    rating: 4.4,
    verified: true,
    distance: "1.5 km away",
    vibe: "Stay and food plans bundled together"
  },
  {
    id: 3,
    name: "Campus Tiffin Circle",
    type: "Mess",
    location: "Wakad, Pune",
    price: "INR 699/week",
    rating: 4.3,
    verified: false,
    distance: "2.1 km away",
    vibe: "Fast subscription for working students"
  }
];

export const weeklyMenu = [
  { day: "Mon", meals: "Poha, Dal Rice, Roti Sabzi" },
  { day: "Tue", meals: "Upma, Rajma Chawal, Paneer Bhurji" },
  { day: "Wed", meals: "Idli, Sambar Rice, Mix Veg Curry" },
  { day: "Thu", meals: "Paratha, Chole Rice, Dal Fry" },
  { day: "Fri", meals: "Dosa, Veg Pulao, Aloo Matar" },
  { day: "Sat", meals: "Sandwich, Khichdi, Kadhi Rice" },
  { day: "Sun", meals: "Puri Bhaji, Special Thali, Jeera Rice" }
];

export const subscriptions = [
  {
    name: "Weekly Student Saver",
    price: "INR 699",
    detail: "2 meals/day, flexible pause, student support"
  },
  {
    name: "Monthly Unlimited Comfort",
    price: "INR 2,499",
    detail: "2 meals/day, Sunday specials, priority delivery"
  }
];

export const ownerMetrics = [
  { label: "Active Subscribers", value: "182" },
  { label: "Renewal Rate", value: "74%" },
  { label: "Average Rating", value: "4.7/5" }
];

export const adminStats = [
  { label: "Verified Providers", value: "84" },
  { label: "Monthly Orders", value: "12.4k" },
  { label: "Top City", value: "Pune" }
];

export const mealLogs = [
  { time: "08:15", meal: "Breakfast", items: "Poha + chai" },
  { time: "13:05", meal: "Lunch", items: "Dal rice + salad" },
  { time: "20:10", meal: "Dinner", items: "Roti, paneer, rice" }
];

export const aiTips = [
  "Recommend lighter dinners on high-study-load days.",
  "Suggest nearby verified mess options within 2 km.",
  "Highlight protein-rich plans for gym-going students."
];
