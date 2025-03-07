import jwt from "jsonwebtoken";
import User from "../models/User.js";
import Farmer from "../models/Farmer.js";
import Admin from "../models/Admin.js";

const PUBLIC_ROUTES = ["/user-login","/user-signup","/farmer-signup","/farmer-login", "/admin-login", "/"];

const authenticateUser = async (req, res, next) => {
  try {
    if (PUBLIC_ROUTES.includes(req.path)) {
      return next();
    }

    const token = req.cookies?.token;
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: No token provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    const user = await User.findById(decoded.id);
    if (user) {
      req.user = user;
      req.role = "user";
      req.user = user;
      return next();
    }

    const farmer = await Farmer.findById(decoded.id);
    if (farmer) {
      req.user = farmer;
      req.role = "farmer";
      req.user = user;
      return next();
    }

    const admin = await Admin.findById(decoded.id);
    if (admin) {
      req.user = admin;
      req.role = "admin";
      req.user = user;
      return next();
    }

    return res.status(401).json({ message: "Unauthorized: Invalid user" });

  } catch (error) {
    console.error("Error in authentication middleware:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.role)) {
      return res.status(403).json({ message: "Forbidden: Access denied" });
    }
    next();
  };
};

export { authenticateUser, authorizeRoles };
