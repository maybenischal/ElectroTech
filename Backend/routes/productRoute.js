import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  productDetails,
} from "../controllers/productController.js";

import upload from "../middleware/multer.js";
import adminAuth from "../middleware/adminAuth.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  upload.fields([{ name: "image", maxCount: 1 }]),
  adminAuth,
  addProduct
);
productRouter.get("/list", listProducts);
productRouter.post("/remove", adminAuth, removeProduct);
productRouter.get("/details/:id", productDetails);

export default productRouter;
