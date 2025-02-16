import bcrypt from "bcryptjs";
import User from "../models/User.js"

const handleUserSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phNumber } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "Email, Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phNumber,
    });

    return res
      .status(201)
      .json({ message: "user registered successfully", user: newUser });
  } catch (error) {
    console.error("Error in user signup:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export { handleUserSignup };
