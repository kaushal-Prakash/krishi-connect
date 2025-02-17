import express from "express";
import {handleUserLogin, handleUserSignup} from "../controllers/userController.js";

const router = express.Router();

router.post("/user-signup",handleUserSignup);
router.post("/user-login",handleUserLogin);

export default router;