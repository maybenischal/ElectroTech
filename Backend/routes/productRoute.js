import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  productDetails,
} from "../controllers/productController.js";

import upload from "../middleware/multer.js";

const productRouter = express.Router();

productRouter.post(
  "/add",
  upload.fields([{ name: "image", maxCount: 1 }]),
  addProduct
);
productRouter.get("/list", listProducts);
productRouter.post("/remove", removeProduct);
productRouter.get("/details/:id", productDetails);

export default productRouter;
