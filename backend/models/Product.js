import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productId: { type: String },
    farmerId: { type: mongoose.Schema.Types.ObjectId,ref: "Farmer", required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    category: { type: String, required: true },
    manufacturedDate: { type: Date, required: true },
    images: [{ type: String }],
    soldCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
