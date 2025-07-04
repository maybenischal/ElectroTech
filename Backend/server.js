import express from "express";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import "dotenv/config";

//App Config
const app = express();
const port = process.env.PORT || 4000;

//Middleware
app.use(express.json());
app.use(cors());
connectDB();

//API Endpoints
app.get("/", (req, res) => {
  res.status(200).send("Welcome to ElectroTech Backend");
});

//Listen
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
