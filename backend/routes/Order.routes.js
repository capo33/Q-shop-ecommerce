import express from "express";
import { addOrderItems, getOrderById } from "../controllers/OrderController.js";
import { authMiddleware  } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, addOrderItems);
router.get("/:id", authMiddleware, getOrderById);

export default router;