# Smart PG & Mess Finder

A MERN stack starter project for a student-focused platform that helps users discover PG and mess providers, subscribe to meal plans, track daily meals, and manage listings across student, owner, and admin roles.

## Tech Stack

- React + Vite frontend
- Node.js + Express backend
- MongoDB with Mongoose
- JWT authentication
- Google Maps API placeholder for geolocation-based discovery

## Project Structure

- `client/`: React app for landing page and future dashboards
- `server/`: Express API with auth, listings, subscriptions, reviews, meals, and admin analytics

## Backend Features

- User registration and login with role support: `student`, `owner`, `admin`
- Listing creation, owner management, and admin verification
- Subscription creation for weekly and monthly meal plans
- Ratings and reviews
- Meal tracking endpoints
- Admin dashboard analytics endpoint

## Frontend Features

- Startup-style landing page for the Smart PG & Mess Finder concept
- Sections for discovery, meal plans, AI recommendations, and role-based dashboards
- Reusable card and section components

## Setup

1. Install dependencies:

```bash
npm run install:all
```

2. Create `server/.env` from `server/.env.example`.

3. Start MongoDB locally.

4. Run the app:

```bash
npm run dev
```

Frontend runs on `http://localhost:5173` and backend on `http://localhost:5000`.

## Seed Demo Data

```bash
npm run seed --prefix server
```

Demo users:

- `admin@example.com` / `admin123`
- `owner@example.com` / `owner123`
- `student@example.com` / `student123`

## Next Improvements

- Replace mock frontend data with live API integration
- Add React Router and separate role dashboards
- Integrate Google Maps and geolocation search
- Add online payments and notifications
- Add test coverage and form validation
