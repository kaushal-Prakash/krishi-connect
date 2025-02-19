import express from "express";
import { addProduct, getAllProducts, getFarmerProducts, getProductById, updateProduct } from "../controllers/storeController.js";
import { upload } from "../middlewares/multer.js";

const router = express.Router();

router.post("/add-product", upload.array("images", 6), addProduct);
router.post("/update-product", upload.array("images", 6), updateProduct);
router.get("/get-products", getAllProducts);
router.get("/get-farmer-products", getFarmerProducts);
router.get("/get-productBy-id", getProductById);

export default router;