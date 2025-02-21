import Product from "../models/Product.js";
import { deleteImagesFromCloud, uploadOnCloudinary } from "../service/cloudinary.js";
import { getUser } from "../service/userAuth.js";

const generateUniqueProductId = async () => {
  let isUnique = false;
  let productId;

  while (!isUnique) {
    productId = `P${Math.floor(100000 + Math.random() * 900000)}`; // Generate a 6-digit number with "P" prefix
    const existingProduct = await Product.findOne({ productId });
    if (!existingProduct) {
      isUnique = true; // If not found in DB, it's unique
    }
  }

  return productId;
};

const addProduct = async (req, res) => {
  try {
    const { name, description, price, stock, category, manufacturedDate } =
      req.body;

    // Check if required fields are provided
    if (!name || !price || !stock || !category || !manufacturedDate) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const productId = await generateUniqueProductId();

    const imageUrls = [];
    if (req.files && req.files.length > 0) {
      for (const file of req.files) {
        const cloudinaryUrl = await uploadOnCloudinary(file.path);
        if (cloudinaryUrl) {
          imageUrls.push(cloudinaryUrl);
        }
      }
    }

    const farmer = await getUser(req.cookies?.token);
    const farmerId = farmer.id;

    const newProduct = new Product({
      productId,
      farmerId,
      name,
      description,
      price,
      stock,
      category,
      manufacturedDate,
      images: imageUrls,
    });

    await newProduct.save();

    res
      .status(201)
      .json({ message: "Product added successfully", product: newProduct });
  } catch (error) {
    console.error("❌ Error in addProduct:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ products });
  } catch (error) {
    console.log("Error fetching products : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getFarmerProducts = async (req, res) => {
  try {
    const userId = getUser(req.cookies?.token).id;
    const products = await Product.find({ farmerId: userId });

    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }

    return res.status(200).json({ products });
  } catch (error) {
    console.log("Error in getting farmer products : ", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProductById = async (req, res) => {
  try {
    const id = req.body.id;
    const product = await Product.findOne({ productId: id });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    return res.status(200).json({ product });
  } catch (error) {
    console.error("Error in fetching product by id : ", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const updateProduct = async (req, res) => {
    try {
      const { productId, name, description, price, stock, category, manufacturedDate } = req.body;
  
      if (!productId || !name || !price || !stock || !category || !manufacturedDate) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      const product = await Product.findOne({productId : productId});
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      const response = await deleteImagesFromCloud(product.images);
      if (!response.success) {
        return res.status(500).json({ message: "Failed to delete old images" });
        }
        

  
      let newImages = [];
      if (req.files && req.files.length > 0) {
        for (const file of req.files) {
          const result = await uploadOnCloudinary(file.path);
          newImages.push(result);
        }
      }
  
      product.name = name;
      product.description = description || product.description;
      product.price = price;
      product.stock = stock;
      product.category = category;
      product.manufacturedDate = manufacturedDate;
      product.images = newImages.length > 0 ? newImages : product.images;
  
      await product.save();
  
      res.json({ message: "Product updated successfully", product });
    } catch (error) {
      console.error("❌ Error in updateProduct:", error);
      res.status(500).json({ message: "Internal server error" });
    }
};
  
const getAllAvailaibleProducts = async (req, res) => {
  try {
    const products = await Product.find({ stock: { $gt: 0 } }).sort({ soldCount: -1 });
    if (!products) {
      return res.status(404).json({ message: "No products found" });
    }
    return res.status(200).json({products})
  } catch (error) {
    console.error("Error fetching available pproducts");
    return res.status(500).json({message : "Internal server error"})
  }
}
  
export {
  addProduct,
  getAllProducts,
  getFarmerProducts,
  getProductById,
  updateProduct,
  getAllAvailaibleProducts,
};
