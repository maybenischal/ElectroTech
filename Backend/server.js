import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import "dotenv/config";
import connectCloudinary from "./config/cloudinary.js";
import userRouter from "./routes/userRoute.js";
import productRouter from "./routes/productRoute.js";
import paymentRouter from "./routes/paymentRoute.js";

//App Config
const app = express();
const port = process.env.PORT || 4000;

//Middleware
app.use(express.json());
app.use(cors());
connectDB();
connectCloudinary();

//API Endpoints
app.use("/api/payment", paymentRouter);
app.use("/api/user", userRouter);
app.use("/api/product", productRouter);

app.get("/", (req, res) => {
  res.status(200).send("Welcome to ElectroTech Backend");
});

//Listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
