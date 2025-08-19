import express from "express";
import listingsController from "../controllers/listings.js";
import { verifyTokenMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyTokenMiddleware, listingsController.getAllListings);
router.get("/:id", verifyTokenMiddleware, listingsController.getListingById);
router.post("/", verifyTokenMiddleware, listingsController.createListing);
router.put("/:id", verifyTokenMiddleware, listingsController.updateListing);
router.delete("/:id", verifyTokenMiddleware, listingsController.deleteListing);

export default router;