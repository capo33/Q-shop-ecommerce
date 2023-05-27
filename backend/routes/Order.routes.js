import express from "express";
import { addOrderItems } from "../controllers/OrderController.js";
import { authMiddleware  } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.route("/").post(authMiddleware, addOrderItems);