import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";

//Route for user login
const loginUser = async (req, res) => {};

//Route for user registration
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //Validating email format and password strength
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (password.length < 6) {
      return res
        .status(400)
        .json({ message: "Password must be at least 6 characters long" });
    }

    //Hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  } catch (error) {
    console.error("Error in user registration:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//Route for admin login
const adminLogin = async (req, res) => {};
export { loginUser, registerUser, adminLogin };
