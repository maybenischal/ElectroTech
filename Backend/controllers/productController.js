import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

//Function to add a new product
const addProduct = async (req, res) => {
  try {
    const { name, type, brand, price, description, specifications } = req.body;

    const image = req.files.image[0].path;

    const cloudinaryResponse = await cloudinary.uploader.upload(image, {
      folder: "electro_tech_products",
    });
    const imageUrl = cloudinaryResponse.secure_url;

    const specificationsParsed = JSON.parse(specifications);
    const productData = {
      name,
      type,
      brand,
      price: Number(price),
      description,
      specifications: specificationsParsed,
      image: imageUrl, // Use the URL from Cloudinary
      date: Date.now(),
    };
    console.log(productData);

    // Create a new product instance and save it to the database
    const product = new productModel(productData);
    await product.save();
  } catch (error) {
    res.status(500).json({
      message: "Error adding product",
      error: error.message,
    });
  }
};

//Function for listing all products
const listProducts = async (req, res) => {
  try {
    const products = await productModel.find({});
    res.json({
      message: "Products fetched successfully",
      products,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Function to remove product
const removeProduct = async (req, res) => {
  try {
    await productModel.findByIdAndDelete(req.body.id);
    res.json({ success: true, message: "Product removed successfully" });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

//Function to single product details
const productDetails = async (req, res) => {
  try {
    const { productID } = req.body;
    const product = await productModel.findById(productID);
    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.log(error), res.json({ success: false, message: error.message });
  }
};

export { addProduct, listProducts, removeProduct, productDetails };
