import bcrypt from "bcryptjs";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

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

    if(!newUser){
      return res.status(400).json({message:"User registration failed"});
    }

    const token = jwt.sign({email:newUser.email,id:newUser._id},process.env.JWT_SECRET,{expiresIn:"7d"});



    return res
      .status(201)
      .json({ message: "user registered successfully", token });
  } catch (error) {
    console.error("Error in user signup:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const handleUserLogin = async (req,res) => {
  try{
    const {email,password} = req.body;

    const existing = await User.findOne({email});
    if(!existing){
      return res.status(404).json({message:"User not found"});
    }

    const isPasswordCorrect = await bcrypt.compare(password,existing.password);
    if(!isPasswordCorrect){
      return res.status(400).json({message:"Invalid Credentials"});
    }

    const token = jwt.sign({email:existing.email,id:existing._id},process.env.JWT_SECRET,{expiresIn:"7d"});

    return res.status(200).json({message:"User logged in succeddfuly",token});

  }
  catch(error){
    console.error("Error in usere login :",error);
    return res.status(500).json({message:"Internal Server Error"});
  }
}

export { handleUserSignup, handleUserLogin };
