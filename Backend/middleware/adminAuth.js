// const adminAuth = async (req, res, next) => {
//   try {
//     const { token } = req.headers;
//     if (!token) {
//       return res
//         .status(401)
//         .json({ success: false, message: "No Authorization. Login Again" });
//     }
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decoded !== process.env.ADMIN_EMAIL + process.env.ADMIN_PASSWORD) {
//       return res
//         .status(403)
//         .json({ success: false, message: "Access Denied. Admins Only" });
//     }
//   } catch (error) {
//     console.error("Error in admin authentication:", error);
//     res.status(500).json({ success: false, message: "Internal Server Error" });
//   }
//   next();
// };
