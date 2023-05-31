import express from "express";
import { addOrderItems, getOrderById } from "../controllers/OrderController.js";
import { protect  } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/:id", protect, getOrderById);
router.post("/", protect, addOrderItems);

export default router;