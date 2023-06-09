import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./config/db.js";

import productRoutes from "./routes/Product.routes.js";
import userRoutes from "./routes/User.routes.js";
import orderRoutes from "./routes/Order.routes.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";

// Load env variables
dotenv.config();

// Initialize express
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(cookieParser());

// Welcome route
app.get("/", (req, res) => {
  res.json({ message: "API is running..." });
});

// Routes
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/orders", orderRoutes);

// Error middlewares
app.use(notFound);
app.use(errorHandler);

// Start server
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `Serve is running in ${process.env.NODE_ENV} mode on port ${port}.`.yellow
  );
});
