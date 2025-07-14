import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const { token } = req.headers;
    if (!token) {
      return res
        .status(401)
        .json({ success: false, message: "No Authorization. Login Again" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const expectedPayload =
      process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD;

    if (decoded !== expectedPayload) {
      return res
        .status(403)
        .json({ success: false, message: "Access Denied. Admins Only" });
    }

    next();
  } catch (error) {
    console.error("Error in admin authentication:", error);

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

export default adminAuth;
