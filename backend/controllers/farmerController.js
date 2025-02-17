import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Farmer from "../models/Farmer.js";

const handleFarmerSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phNumber, kccId } = req.body;

    if (!firstName || !lastName || !email || !password || !phNumber || !kccId) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingfarmer = await Farmer.findOne({ email });
    if (existingfarmer) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newFarmer = await Farmer.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phNumber,
      kccId,
    });

    if (!newFarmer) {
      return res.status(500).json({ message: "farmer registration failed" });
    }

    const token = jwt.sign(
      { email: newFarmer.email, id: newFarmer._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token);

    return res.status(201).json({ message: "farmer registered successfully" });
  } catch (error) {
    console.error("Error in farmer signup:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const handleFarmerLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const farmer = await Farmer.findOne({ email });
    if (!farmer) {
      return res.status(404).json({ message: "farmer not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, farmer.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: farmer.email, id: farmer._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token);

    return res.status(200).json({ message: "farmer logged in successfully" });
  } catch (error) {
    console.error("Error in farmer login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const farmerLogout = async (req,res) => {
  try {
    const token = req.cookies?.token;
    if(!token){
      return res.status(401).json({message:"Unauthorized: No token provided"});
    }

    res.clearCookie("token");

    return res.status(200).json({ message: "farmer logged out successfully" });
    
  } catch (error) {
    console.log("Error in farmer logout:",error);
    res.status(500).json({message:"Internal server error"});
  }
}

const getFarmerProfile = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const farmer = await Farmer.findById(decodedToken.id).select("-password");

    if (!farmer) {
      return res.status(404).json({ message: "farmer not found" });
    }

    return res.status(200).json({ farmer });
  } catch (error) {
    console.error("Error in getting farmer profile:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { handleFarmerSignup, handleFarmerLogin, getFarmerProfile, farmerLogout };
