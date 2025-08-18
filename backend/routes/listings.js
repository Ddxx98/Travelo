import express from "express";
import listingsController from "../controllers/listings.js";
import { verifyTokenMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/listings", verifyTokenMiddleware, listingsController.getAllListings);
router.get("/listings/:id", verifyTokenMiddleware, listingsController.getListingById);
router.post("/listings", verifyTokenMiddleware, listingsController.createListing);
router.put("/listings/:id", verifyTokenMiddleware, listingsController.updateListing);
router.delete("/listings/:id", verifyTokenMiddleware, listingsController.deleteListing);

export default router;