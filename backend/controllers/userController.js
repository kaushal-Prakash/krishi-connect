import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const handleUserSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phNumber } = req.body;

    if (!firstName || !lastName || !email || !password || !phNumber) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phNumber,
    });

    if (!newUser) {
      return res.status(500).json({ message: "User registration failed" });
    }

    const token = jwt.sign(
      { email: newUser.email, id: newUser._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error in user signup:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const handleUserLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token);

    return res.status(200).json({ message: "User logged in successfully" });
  } catch (error) {
    console.error("Error in user login:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const userLogout = async (req,res) => {
  try {
    const token = req.cookies?.token;
    if(!token){
      return res.status(401).json({message:"Unauthorized: No token provided"});
    }

    res.clearCookie("token");

    return res.status(200).json({ message: "User logged out successfully" });
    
  } catch (error) {
    console.log("Error in user logout:",error);
    res.status(500).json({message:"Internal server error"});
  }
}

const getUserProfile = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodedToken.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getting user profile:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { handleUserSignup, handleUserLogin, getUserProfile,userLogout };
