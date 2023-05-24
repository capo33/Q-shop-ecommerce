import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

import UserModel from "../models/User.js";

const authMiddleware = asyncHandler(async (req, res, next) => {
  let token;
  // Check if there is a token in header
  const { authorization } = req.headers;
  if (authorization && authorization.startsWith("Bearer")) {
    try {
      // Get token from header
      token = authorization.split(" ")[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from database by id from token payload (id)
      req.user = await UserModel.findById(decoded.id).select("-password");

      next();
    } catch (error) {
      console.error(error);
      res.status(401); // 401 = Unauthorized
      throw new Error("Not authorized, token failed");
    }
  }
  // Check if there is no token
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { authMiddleware };
