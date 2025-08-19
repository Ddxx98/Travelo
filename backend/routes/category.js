import express from "express";
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from "../controllers/category.js";
import { verifyTokenMiddleware } from "../middleware/auth.js";

const router = express.Router();

router.post("/", verifyTokenMiddleware, createCategory);
router.get("/", verifyTokenMiddleware, getAllCategories);
router.get("/:id", verifyTokenMiddleware, getCategoryById);
router.put("/:id", verifyTokenMiddleware, updateCategory);
router.delete("/:id", verifyTokenMiddleware, deleteCategory);

export default router;