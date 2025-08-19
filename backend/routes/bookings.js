import express from "express";
import { getBookings, getBookingById, createBooking, updateBooking, deleteBooking, approveBooking, rejectBooking, getBookingHistory, getUserBookings } from "../controllers/bookings.js";
import { verifyTokenMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyTokenMiddleware, getBookings);
router.get("/user", verifyTokenMiddleware, getUserBookings);
router.get("/:id", verifyTokenMiddleware, getBookingById);
router.post("/", verifyTokenMiddleware, createBooking);
router.put("/:id", verifyTokenMiddleware, updateBooking);
router.delete("/:id", verifyTokenMiddleware, deleteBooking);

router.post("/:id/approve", verifyTokenMiddleware, approveBooking);
router.post("/:id/reject", verifyTokenMiddleware, rejectBooking);

router.get("/history", verifyTokenMiddleware, getBookingHistory);

export default router;