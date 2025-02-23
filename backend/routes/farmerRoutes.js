import express from "express";
import {
  approveFarmers,
  farmerLogout,
  getAllFarmers,
  getAllFarmersUsername,
  getApprovedFarmers,
  getFarmerProfile,
  getNotApprovedFarmers,
  handleFarmerLogin,
  handleFarmerSignup,
} from "../controllers/farmerController.js";
import { authenticateUser, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/farmer-signup", handleFarmerSignup);
router.post("/farmer-login", handleFarmerLogin);
router.post("/approve-farmer",authenticateUser,authorizeRoles("admin"), approveFarmers);
router.get("/get-farmers",authenticateUser,authorizeRoles("admin","user","farmer"), getAllFarmers);
router.get("/get-farmers-usernames",authenticateUser,authorizeRoles("admin"), getAllFarmersUsername);
router.get("/get-farmer-profile",authenticateUser,authorizeRoles("farmer"), getFarmerProfile);
router.get("/farmer-logout", farmerLogout);
router.get("/get-approved-farmers", getApprovedFarmers);
router.get("/get-not-approved-farmers", getNotApprovedFarmers);

export default router;
