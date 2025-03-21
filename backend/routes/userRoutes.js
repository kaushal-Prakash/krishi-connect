import express from "express";
import {getUserProfile, handleUserLogin, handleUserSignup, isLogedIn, userLogout} from "../controllers/userController.js";
import { authenticateUser, authorizeRoles } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/user-signup",handleUserSignup);
router.post("/user-login",handleUserLogin);
router.get("/get-user-profile",authenticateUser,authorizeRoles("user"),getUserProfile);
router.get("/user-logout",userLogout);
router.get("/is-loged-in",isLogedIn);

export default router;