import express from "express";
import { addProduct, getAllProducts, getFarmerProducts } from "../controllers/storeController.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/add-product",upload.array("images",6), addProduct);
router.get("/get-products", getAllProducts);
router.get("/get-farmer-products", getFarmerProducts);

export default router;