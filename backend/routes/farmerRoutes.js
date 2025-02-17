import express from "express";
import { farmerLogout, getFarmerProfile, handleFarmerLogin, handleFarmerSignup } from "../controllers/farmerController.js";

const router = express.Router();

router.post("/farmer-signup",handleFarmerSignup);
router.post("/farmer-login",handleFarmerLogin);
router.get("/get-farmer-profile",getFarmerProfile);
router.get("/farmer-logout",farmerLogout);

export default router;

