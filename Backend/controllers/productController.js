// Backend/controllers/productController.js

//Function to add a new product
const addProduct = async (req, res) => {
  try {
    const { name, price, description } = req.body;
    const image = req.files.image[0].path; // Assuming you're using multer for file uploads

    // Here you would typically save the product to your database
    // For example:
    // const newProduct = await Product.create({ name, price, description, image });

    res.status(201).json({
      message: "Product added successfully",
      product: {
        name,
        price,
        description,
        image,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding product",
      error: error.message,
    });
  }
};

//Function for listing all products
const listProducts = async (req, res) => {
  // You'll eventually fill this with logic
};

//Function to remove product
const removeProduct = async (req, res) => {
  // You'll eventually fill this with logic
};

//Function to single product details
const productDetails = async (req, res) => {
  // You'll eventually fill this with logic
};

export { addProduct, listProducts, removeProduct, productDetails };
