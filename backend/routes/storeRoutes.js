import express from "express";
import {
  addProduct,
  getAllAvailaibleProducts,
  getAllProducts,
  getFarmerProducts,
  getProductById,
  updateProduct,
} from "../controllers/storeController.js";
import { upload } from "../middlewares/multer.js";
import {
  authenticateUser,
  authorizeRoles,
} from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post(
  "/add-product",
  authenticateUser,
  authorizeRoles("farmer"),
  upload.array("images", 6),
  addProduct
);
router.post(
  "/update-product",
  authenticateUser,
  authorizeRoles("farmer"),
  upload.array("images", 6),
  updateProduct
);
router.get(
  "/get-products",
  authenticateUser,
  authorizeRoles("farmer", "admin", "user"),
  getAllProducts
);
router.get(
  "/get-farmer-products",
  authenticateUser,
  authorizeRoles("farmer", "admin", "user"),
  getFarmerProducts
);
router.get(
  "/get-productBy-id",
  authenticateUser,
  authorizeRoles("farmer", "admin", "user"),
  getProductById
);
router.get(
  "/get-all-available-products",
  authenticateUser,
  authorizeRoles("farmer", "admin", "user"),
  getAllAvailaibleProducts
);

export default router;
