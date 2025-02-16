import express from "express";
import {handleUserSignup} from "../controllers/userController.js";

const router = express.Router();

router.post("/user-signup",handleUserSignup);

export default router;