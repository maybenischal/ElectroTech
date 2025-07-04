const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema(
  {
    id: {
      type: Number,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    image: {
      type: String, // Assuming the image is stored as a file path or URL
      required: true,
    },
    rating: {
      type: Number, // Optional, used for rating systems like 1-5 stars
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    specifications: {
      type: Map,
      of: String, // Store each specification as a key-value pair
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
