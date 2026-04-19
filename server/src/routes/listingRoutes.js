import express from "express";
import {
  createListing,
  getListingById,
  getListings,
  getOwnerListings,
  updateListing,
  verifyListing
} from "../controllers/listingController.js";
import { authorize, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getListings);
router.get("/owner", protect, authorize("owner"), getOwnerListings);
router.get("/:id", getListingById);
router.post("/", protect, authorize("owner", "admin"), createListing);
router.put("/:id", protect, authorize("owner", "admin"), updateListing);
router.patch("/:id/verify", protect, authorize("admin"), verifyListing);

export default router;
