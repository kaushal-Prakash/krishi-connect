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

const router = express.Router();

router.post("/farmer-signup", handleFarmerSignup);
router.post("/farmer-login", handleFarmerLogin);
router.post("/approve-farmer", approveFarmers);
router.get("/get-farmers", getAllFarmers);
router.get("/get-farmers-usernames", getAllFarmersUsername);
router.get("/get-farmer-profile", getFarmerProfile);
router.get("/farmer-logout", farmerLogout);
router.get("/get-approved-farmers", getApprovedFarmers);
router.get("/get-not-approved-farmers", getNotApprovedFarmers);

export default router;
