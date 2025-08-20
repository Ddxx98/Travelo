import express from "express";
import profileController from "../controllers/profile.js";
import { verifyTokenMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyTokenMiddleware, profileController.getProfile);
router.put("/", verifyTokenMiddleware, profileController.updateProfile);

export default router;