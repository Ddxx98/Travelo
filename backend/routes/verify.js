import express from "express";
import verifyController from "../controllers/verify.js";

const router = express.Router();

router.post("/verify", verifyController.verifyToken);

export default router;