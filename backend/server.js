import express from "express";
import dotenv from "dotenv";
import colors from "colors";
import cors from "cors";

import connectDB from "./config/db.js";
import products from "./data/products.js";

// Load env variables
dotenv.config();

// Initialize express
const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is ready");
});

app.get("/api/v1/products", (req, res) => {
  res.json(products);
});

app.get("/api/v1/products/:id", (req, res) => {
  const product = products.find((p) => p._id === req.params.id);
  res.json(product);
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(
    `Serve is running in ${process.env.NODE_ENV} mode on port ${port}.`.yellow
  );
});
