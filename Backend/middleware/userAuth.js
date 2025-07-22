import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No Authorization. Login required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Find the user by ID from the token
    const user = await userModel.findById(decoded.id).select('-password');
    
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token. User not found" });
    }

    // Add user info to request object
    req.user = user;
    next();
    
  } catch (error) {
    console.error("Error in user authentication:", error);

    // Handle specific JWT errors
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ success: false, message: "Token expired. Please login again" });
    }
    if (error.name === "JsonWebTokenError") {
      return res
        .status(401)
        .json({ success: false, message: "Invalid token. Please login again" });
    }

    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export default userAuth;
