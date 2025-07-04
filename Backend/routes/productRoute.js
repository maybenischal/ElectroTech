import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  productDetails,
} from "../controllers/productController.js";

const productRouter = express.Router();

productRouter.post("/add", addProduct);
productRouter.get("/list", listProducts);
productRouter.delete("/remove/:id", removeProduct);
productRouter.get("/details/:id", productDetails);

export default productRouter;
