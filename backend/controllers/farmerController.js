import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Farmer from "../models/Farmer.js";

const handleFarmerSignup = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phNumber, kccId,username } = req.body;

    if (!firstName || !lastName || !email || !password || !phNumber || !kccId || !username) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingFarmer = await Farmer.findOne({
			$or: [{ email }, { username }, { kccId }],
		});
		if (existingFarmer) {
			return res
				.status(400)
				.json({ message: "Email, KCC ID, or Username already exists" });
		}

    const hashedPassword = await bcrypt.hash(password, 12);

    const newFarmer = await Farmer.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phNumber,
      username,
      kccId,
    });

    if (!newFarmer) {
      return res.status(500).json({ message: "farmer registration failed" });
    }

    const token = jwt.sign(
      { username: newFarmer.username, id: newFarmer._id },
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
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ message: "Username and password are required" });
    }

    const farmer = await Farmer.findOne({ username });
    if (!farmer) {
      return res.status(404).json({ message: "farmer not found" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, farmer.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { username: farmer.username, id: farmer._id },
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

const farmerLogout = async (req, res) => {
  try {
    const token = req.cookies?.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    res.clearCookie("token");

    return res.status(200).json({ message: "farmer logged out successfully" });
  } catch (error) {
    console.log("Error in farmer logout:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getFarmerProfile = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized: No token provided" });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const farmer = await Farmer.findById(decodedToken.username).select("-password");

    if (!farmer) {
      return res.status(404).json({ message: "farmer not found" });
    }

    return res.status(200).json({ farmer });
  } catch (error) {
    console.error("Error in getting farmer profile:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getApprovedFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find({ approved: true });
    if (!farmers) {
      return res.status(404).json({ message: "No approved farmers found" });
    }
    return res.status(200).json({ farmers });
  } catch (error) {
    console.log("Error fetching verified farmers : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getNotApprovedFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find({ approved: false });
    if (!farmers) {
      return res.status(404).json({ message: "No approved farmers found" });
    }
    return res.status(200).json({ farmers });
  } catch (error) {
    console.log("Error fetching verified farmers : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const approveFarmers = async (req, res) => {
  try {
    const { username } = req.body;
    if (!username) {
      return res.status(400).json({message : "Fill all credentials"})
    }
    const farmer = await Farmer.findOne({ username }); // admin will send email
    if (!farmer) {
      return res.status(404).json({ message: "Farmer not found" });
    }

    if (farmer.approved) {
      return res.status(400).json({ message: "Farmer already approved" });
    }
    farmer.approved = true;
    await farmer.save();
    return res.status(200).json({ message: "Farmer approved!" });
  } catch (error) {
    console.log("Error in approving farmer : ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const getAllFarmers = async (req, res) => {
  try {
    const farmers = await Farmer.find({});
    if (!farmers) {
      return res.status(404).json({ message: "No farmers found" });
    }
    return res.status(200).json({ farmers: farmers });
  } catch (error) {
    console.log("Error fetching all farmers : ", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllFarmersUsername = async (req, res) => {
  try {
    const farmer = await Farmer.find({}, "username");
    if (!farmer) {
      return res.status(404).json({ message: "Farmers not found" });
    }
    return res.status(200).json({ farmer });
  } catch (error) {
    console.log("Error in getching farmer usernames : ", error);
    return res.status(500).json({message : "Internal server error"})
  }
}

export {
  handleFarmerSignup,
  handleFarmerLogin,
  getFarmerProfile,
  farmerLogout,
  getApprovedFarmers,
  getNotApprovedFarmers,
  approveFarmers,
  getAllFarmers,
  getAllFarmersUsername
};
