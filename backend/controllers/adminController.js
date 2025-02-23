import Admin from "../models/Admin.js";
import { hashWord } from "../service/userAuth.js";
import jwt from "jsonwebtoken";

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Enter all credentials" });
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const token = jwt.sign(
      { email: admin.email, id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, { httpOnly: true });
    res.cookie("role", "admin", { httpOnly: true });

    return res.status(200).json({ message: "Login successful" });
  } catch (error) {
    console.log("Error in admin login:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};



export { adminLogin };
